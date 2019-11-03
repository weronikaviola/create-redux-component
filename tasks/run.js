const path = require("path");
const cp = require("child_process");
const chalk = require("chalk");

const rootDir = path.join(__dirname, "..");
const args = process.argv.slice(2);
const scriptPath = path.join(__dirname, "index.js");
cp.execSync(
  `node ${scriptPath} ${args.join(' ')}`,
  {
    cwd: rootDir,
    stdio: "inherit",
  }
);

