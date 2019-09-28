require("child_process").exec("npx ganache-cli", (err, stdout) => {
  require("fs").writeFileSync("./test", stdout)
})

