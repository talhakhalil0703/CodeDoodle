const express = require("express");
const app = express();
const fs = require("fs").promises;
const spawn = require("child_process").spawn;
const bodyParser = require("body-parser");
const kill_process = require("./codedoodle");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post("/123", async (req, res) => {
//   console.log("CALLED");
//   console.log(req.body);
//   const filename = Date.now();
//   await fs.writeFile(`${filename}.cpp`, req.body.code);
//   let compilier_child = spawn(`g++`, [`-g`, `-o`, filename, `-w`, `${filename}.cpp`]);
//   compilier_child.on("close", (code) => {
//     if (code === 0) {
//       let child = spawn(`gdb`, [
//         `${filename}`,
//         `-silent`,
//         `-ex`,
//         `source main.py`,
//         `-ex`,
//         `b ${req.body.line}`,
//         `-ex`,
//         `r`,
//         `-ex`,
//         `stack`,
//       ]);
//       let output_string = "";
//       child.stderr.setEncoding("utf8");
//       child.stderr.on("data", (data) => {
//         console.log("stderr: " + data);
//       });
//       child.stdout.setEncoding("utf8");
//       child.stdout.on("data", (data) => {
//         console.log(data);
//         output_string += data.toString();
//       });
//       child.on("close", (code) => {
//         console.log(output_string);
//         if (code === 0) {
//           if (output_string.includes("(JSONDUMPSTART)")) {
//             let json_string = output_string
//               .toString()
//               .substring(
//                 output_string.indexOf("(JSONDUMPSTART)") + "(JSONDUMPSTART)".length,
//                 output_string.lastIndexOf("(JSONDUMPEND)")
//               );
//             if (json_string) {
//               console.log(json_string);
//               res.header("Content-Type", "application/json");
//               res.status(200).send(json_string).end();
//             } else {
//               res.status(500).send({ error: "Could not process program" });
//             }
//           } else if (output_string.includes("(ERROR)")) {
//             res.status(500).send({ error: "The program could not run: Try a different line break" });
//           }
//         }
//       });
//     } else {
//       res.status(500).send({ error: "There was an error compiling your program" });
//     }
//   });
// });

app.post("/", async (req, res) => {
  console.log("CALLED");
  const filename = Date.now() + "CSOURCE";
  await fs.writeFile(`${filename}.cpp`, req.body.code);
  let compilier_child = spawn(`g++`, [`-g`, `-o`, filename, `-w`, `${filename}.cpp`]);
  console.log("Spawned G++");
  compilier_child.on("close", (exit_code) => {
    console.log("Exiting G++");
    if (exit_code === 0) {
      let valgrind_child = spawn(`valgrind`, [
        "--vgdb-error=0",
        "--tool=memcheck",
        "--leak-check=full",
        `./${filename}`,
      ]);
      console.log("Spawned valgrind");
      setTimeout(kill_process, 30000, valgrind_child);
      valgrind_child.stdout.setEncoding("utf-8");
      valgrind_child.stderr.setEncoding("utf-8");
      v_out = "";
      reg_pid = "==(.*?)==";
      let bGDBIsOn = false;

      valgrind_child.stderr.on("data", (v_data) => {
        console.log(v_data);
        v_out += v_data.toString();
        pid = v_out.match(reg_pid)[1];
        if (pid && !bGDBIsOn) {
          bGDBIsOn = true;
          console.log(pid);
          gdb_out = "";
          let GDB_child = spawn(`gdb`, [
            `./${filename}`,
            "-ex",
            `python filename = '${filename}'`,
            "-ex",
            `target remote | vgdb --pid=${pid}`,
            "-ex",
            "source memory_analyzer.py",
            "-ex",
            `python vpid = ${pid}`,
            "-ex",
            "memparse",
          ]);
          setTimeout(kill_process, 30000, GDB_child);
          GDB_child.stdout.setEncoding("utf-8");
          GDB_child.stdout.on("data", (g_data) => {
            console.log(g_data);
            gdb_out += g_data.toString();
          });

          GDB_child.stderr.setEncoding("utf-8");
          GDB_child.stderr.on("data", (g_data) => {
            console.log(g_data);
            gdb_out += g_data.toString();
          });

          GDB_child.on("close", (GDB_exit_code) => {
            fs.unlink(`./${filename}`);
            fs.unlink(`./${filename}.cpp`);
            console.log("Closing GDB");
            if (GDB_exit_code === 0) {
              if (gdb_out.includes("(JSONDUMPSTART)")) {
                let json_string = gdb_out
                  .toString()
                  .substring(
                    gdb_out.indexOf("(JSONDUMPSTART)") + "(JSONDUMPSTART)".length,
                    gdb_out.lastIndexOf("(JSONDUMPEND)")
                  );
                if (json_string) {
                  console.log(json_string);
                  res.header("Content-Type", "application/json");
                  res.status(200).send(json_string).end();
                } else {
                  res.status(500).send({ error: "Could not process program" });
                }
              } else if (gdb_out.includes("(ERROR)")) {
                res.status(500).send({ error: "The program could not run: Try a different line break" });
              }
            }
          });
        }
      });
    } else {
      fs.unlink(`./${filename}.cpp`);
      res.status(500).send({ error: "The program could not compile your code" });
    }
  });
});

app.listen(3000, () => {
  console.log("server started");
});
