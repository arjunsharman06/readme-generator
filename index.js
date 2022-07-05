// TODO: Include packages needed for this application
const { rejects } = require('assert');
const fs = require('fs');
const inquirer = require('inquirer');
const { resolve } = require('path');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    "Enter your Project Title (Required)\n",
    "Provide a short description explaining the what, why, and how of your project.\n",
    "Table of Contents",
    "What are the steps required to install your project? \n",    
    "Write steps so that the other developers can contribute \n",
    "Write Test Cases for your application \n",
    "Enter your Email address \n",
    "Enter your Github username \n",
    "Provide instructions for usage of the application. \n",
];

const [title, description, , installation, contribution, testcase , email , github,usage] = questions;

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, rejects) => {
        fs.writeFile(fileName, data, err => {
            if (err) {
                rejects(err);
                return;
            }
            resolve({
                ok: true,
                message: "File Created !!!"
            })
        });
    });
}

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt([

        // Title
        {
            type: 'input',
            name: 'Title',
            message: title,
            validate: projectTitle => {
                if (projectTitle) {
                    return true;
                } else {
                    console.log("Input your project title \n");
                    return false;
                }
            }
        },

        // Description
        {
            type: 'input',
            name: 'Description',
            message: description,
        },

        // Table of Content is directly rendered

        // Installation
        {
            type: 'editor',
            name: 'Installation',
            message: installation,
        },
        
        // Contribution
        {
            type: 'input',
            name: 'Contribution',
            message: contribution,
        },

        // Test Case
        {
            type: 'editor',
            name: 'TestCase',
            message: testcase,
        },

        // License
        {
            type: 'list',
            name: "License",
            message: "Select the License from the below list",
            choices: ["None", "MIT", "GPLv3", "AGPL"]
        },

        // Questions
        {
            type: 'input',
            name: 'Email',
            message: email,
        },
        {
            type: 'input',
            name: 'Github',
            message: github,
        },

        // Usage
        {
            type: 'input',
            name: 'Usage',
            message: usage,
        },
        {
            type:'confirm',
            name: 'confirmScreenShot',
            message:"Do you want to include screen-shot for the usage \n",           
        },
        {
            type:'input',
            name: 'ScreenShot',
            message:"Add your screen-shot in folder assets/images and provide the file name with format i.e image.png",
            when:({confirmScreenShot}) =>{
                if(confirmScreenShot)
                    return true;
                else 
                    return false;
            }
        },
    ]);
}

// Function call to initialize app
init()
    .then((result) => {
        return generateMarkdown(result);
    }).then(markDownData => {   
        writeToFile('./README.md', markDownData);
    })
    .catch((err) => {
        console.error(err.message);
    });