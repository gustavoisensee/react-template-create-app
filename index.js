#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');

const Questionkeys = {
  PROJECT_NAME: 'project-name'
};

const QUESTIONS = [
  {
    name: Questionkeys.PROJECT_NAME,
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z-_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

const CURR_DIR = process.cwd();

const createContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const encoding = 'utf8';
    const originFilePath = `${templatePath}/${file}`;
    const fileStats = fs.statSync(originFilePath);

    if (fileStats.isFile()) {
      const contents = fs.readFileSync(originFilePath, encoding);
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, encoding);
    } else if (fileStats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      createContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
};

inquirer
  .prompt(QUESTIONS)
  .then(answers => {
    const projectName = answers[Questionkeys.PROJECT_NAME];
    const templatePath = `${__dirname}/template`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createContents(templatePath, projectName);
  });
