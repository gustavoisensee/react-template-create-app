#!/usr/bin/env/ node

const inquirer = require('inquirer');
const fs = require('fs');

const Questionkeys = {
  PROJECT_NAME: 'project-name',
};

const QUESTIONS = [
  {
    name: Questionkeys.PROJECT_NAME,
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

const CURR_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath) => {
    const filesToCreate = fs.readdirSync(templatePath);
  
    filesToCreate.forEach(file => {
      const origFilePath = `${templatePath}/${file}`;
      const fileStats = fs.statSync(origFilePath);
  
      if (fileStats.isFile()) {
        const contents = fs.readFileSync(origFilePath, 'utf8');
        
        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, 'utf8');
      } else if (fileStats.isDirectory()) {
        fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
        
        // recursive call
        createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
      }
    });
  }

inquirer
  .prompt(QUESTIONS)
  .then(answers => {
    const projectName = answers[Questionkeys.PROJECT_NAME];
    const templatePath = `${__dirname}/template`;
  
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createDirectoryContents(templatePath, projectName);
  });

