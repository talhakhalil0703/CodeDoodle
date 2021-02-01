const express = require("express");
const app = express();
const fs = require("fs").promises;
const spawn = require("child_process").spawn;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  console.log("CALLED");
  console.log(req.body);
  const filename = Date.now();
  await fs.writeFile(`${filename}.cpp`, req.body.code);
  let compilier_child = spawn(`g++`, [`-g`, `-o`, filename, `-w`, `${filename}.cpp`]);
  compilier_child.on("close", (code) => {
    if (code === 0) {
      let child = spawn(`gdb`, [
        `${filename}`,
        `-silent`,
        `-ex`,
        `source main.py`,
        `-ex`,
        `b ${req.body.line}`,
        `-ex`,
        `r`,
        `-ex`,
        `stack`,
      ]);
      let output_string = "";
      child.stderr.setEncoding("utf8");
      child.stderr.on("data", (data) => {
        console.log("stderr: " + data);
      });
      child.stdout.setEncoding("utf8");
      child.stdout.on("data", (data) => {
        console.log(data);
        output_string += data.toString();
      });
      child.on("close", (code) => {
        console.log(output_string);
        if (code === 0) {
          if (output_string.includes("(JSONDUMPSTART)")) {
            let json_string = output_string
              .toString()
              .substring(
                output_string.indexOf("(JSONDUMPSTART)") + "(JSONDUMPSTART)".length,
                output_string.lastIndexOf("(JSONDUMPEND)")
              );
            if (json_string) {
              console.log(json_string);
              res.header("Content-Type", "application/json");
              res.status(200).send(json_string).end();
            } else {
              res.status(500).send({ error: "Could not process program" });
            }
          } else if (output_string.includes("(ERROR)")) {
            res.status(500).send({ error: "The program could not run: Try a different line break" });
          }
        }
      });
    } else {
      res.status(500).send({ error: "There was an error compiling your program" });
    }
  });
});

app.listen(3000, () => {
  console.log("server started");
});
