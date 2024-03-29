#!/usr/bin/env node

const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");
const program = require("commander");
const replace = require("replace-in-file");

async function run(
  appPath,
  componentName,
) {
  const templatePath = path.resolve(__dirname, "../lib", "templates");
  const baseComponentName = componentName.replace(/(\b|\s)\w/g, char => char.toUpperCase()).replace(/-/g, "");
  const baseComponentPath = path.join(appPath, `${baseComponentName}.jsx`);
  const mainComponentName = `${baseComponentName}Main`;
  const mainComponentPath = path.join(appPath, `${mainComponentName}.jsx`);
  const mainContainerName = `${mainComponentName}Container`;
  const mainContainerPath = path.join(appPath, `${mainContainerName}.jsx`);
  const reducerPath = path.join(appPath, "Reducers.js");

  if (fs.existsSync(templatePath)) {
    try {
      fs.copySync(templatePath, appPath);

      await Promise.all([
        fs.rename(path.join(appPath, "BASE_COMPONENT_NAME.jsx"), baseComponentPath),
        fs.rename(path.join(appPath, "MAIN_CONTAINER_NAME.jsx"), mainContainerPath),
        fs.rename(path.join(appPath, "MAIN_COMPONENT_NAME.jsx"), mainComponentPath),
      ])

      await replace({
        files: [baseComponentPath, mainComponentPath, mainContainerPath, reducerPath],
        from: [
          /BASE_COMPONENT_NAME/g,
          /MAIN_COMPONENT_NAME/g,
          /MAIN_CONTAINER_NAME/g,
          /MainContainerName/g,
        ],
        to: [
          baseComponentName,
          mainComponentName,
          mainContainerName,
          mainContainerName,
        ],
      });
    } catch (err) {
      console.log(err);
      console.error(
        "Error during creation of templates...",
      );
    }
  } else {
    console.error(
      "Error! Couldn't locate template files",
    );
    return;
  }

  console.log("🎊  🎊  Success! 🎊  🎊");
  console.log("Your components are available at");
  console.log(`${chalk.blue.underline(`${appPath.substring(appPath.indexOf("app"))}`)}`);
  console.log();
}


async function createComponent(
  directoryPath,
  directoryName,
  componentName = undefined,
) {
  const dirPath = path.resolve(directoryPath);
  const root = path.join(dirPath, directoryName);
  const appName = (componentName || path.basename(root)).replace(/(\b|\s)\w/g, char => char.toUpperCase()).replace(/-/g, "");

  fs.ensureDirSync(root);

  const files = await (fs.readdir(root));
  if (files.length) {
    console.log(`${chalk.red("The specified directory already exists ⚠️")}`);
    console.log(`${chalk.cyan("Please try using different name")}`);
    console.log();

    process.exit(1);
  }

  console.log(`⚛️  Creating a new Redux component ${chalk.blue.bold(appName)} in ${chalk.green(root)} ⚛️`);
  console.log();

  run(
    root,
    appName,
  );
}

let directoryName;

program
  .name("create_redux_component")
  .arguments("<directory-name>")
  .action((name, path) => {
    directoryPath = path;
    directoryName = name;
  })
  .option("-p, --path <path>", "Specify path to the component's directory")
  .option("-n, --root_name <name>", "Specify name of the root component")
  .allowUnknownOption()
  .on("--help", () => {
    console.log();
    console.log(`    ${chalk.red("<directory-name>")} is required.`);
    console.log();
    console.log(`${chalk.magentaBright("Please report bugs and other issues here:")}`)
    console.log("https://github.com/weronikaviola/create-redux-component/issues");
    console.log();
  })
  .parse(process.argv);

if (typeof directoryName === "undefined") {
  console.error(`${chalk.bgMagentaBright.black.bold("Please specify the project directory name")}`);
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green("<directory-name>")}`,
  );
  console.log();
  console.log("options:");
  console.log(
    `${chalk.yellow("--root_name")} or ${chalk.yellow("-n")}\t${chalk.gray("Specify name of the root component")}`,
  );
  console.log(
    `${chalk.yellow("--path")} or ${chalk.yellow("-p")}\t\t${chalk.gray("Specify path to the root component")}`
  )
  console.log();
  process.exit(1);
}

createComponent(
  program.path || ".",
  directoryName,
  program.root_name,
);
