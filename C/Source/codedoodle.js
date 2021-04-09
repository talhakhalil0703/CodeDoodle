const kill_process = (process) => {
  process.kill("SIGINT");
};

module.exports = kill_process;
