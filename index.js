// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

// TODO: Include packages needed for this application
const { rejects } = require('assert');
const fs = require('fs');
const inquirer = require('inquirer');
const { resolve } = require('path');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    "Enter your Project Title (Required)",
    "Provide a short description explaining the what, why, and how of your project.",
    "Table of Contents (Optional)",
    "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
    "Provide instructions and examples for use.",
    "Write steps so that the other developers can contribute",
    "Write Test Cases for your application"
];

const [ title, description, content, installation, usage, contribution, testcase ] = questions;

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, rejects) => {
        fs.writeFile(fileName, data, err => {
            if (err) {
                rejects(err);
                return;
            }
            resolve({
                ok : true,
                message : "File Created !!!"
            })
        });
    });
}

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: title,
            validate: projectTitle => {
                if (projectTitle) {
                    return true;
                } else {
                    console.log("Input your project title")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'Description',
            message: description,            
        }
    ]);
}

// Function call to initialize app
init()
    .then((result) => {       
        return generateMarkdown(result);
    }).then(markDownData => {     
        console.log(markDownData);
        //writeToFile('./README.md',markDownData);
    })
    .catch((err) => {
        console.error(err.message);
    });
