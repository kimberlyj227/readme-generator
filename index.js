// inquirer var
// fs far
// create question prompts

var inquirer = require("inquirer");
var fs = require("fs");

// array of questions for user
const questions = [
    {
        type: "input",
        message: "Enter the project title.",
        name: "title"
    },
    {
        type: "input",
        message: "Enter the project description.",
        name: "description"
    },
    {
        type: "input",
        message: "Enter the installation instructions.",
        name: "instructions"
    },
    {
        type: "input",
        message: "Enter the usage information.",
        name: "usageInfo"
    },
    {
        type: "input",
        message: "Enter the contribution guidelines.",
        name: "contGuide"
    },
    {
        type: "input",
        message: "Enter the test instructions.",
        name: "testInst"
    },
    {
        type: "list",
        message: "What is the license type?",
        name: "license",
        choices: ["a", "b", "c"]
    },
    {
        type: "input",
        message: "Enter your Github username",
        name: "username"
    },
    {
        type: "input",
        message: "Enter your email address.",
        name: "email"
    }
    

];

// function to write README file
function writeToFile(fileName, answers) {
    fs.writeFile(fileName, createMarkdown(answers), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Success!");
    })
}

// function to initialize program
function init() {
    inquirer.prompt(questions).then(function(answers) {
        console.log(answers);
        writeToFile("README.md", answers);
    })

}

function createMarkdown(answers) {
return (`# ${answers.title}
## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contribution Guidelines](#contribution-guidelines)
6. [Test Instructions](#test-instructions)
7. [Questions](#questions)
## Description {#description}
${answers.description}
## Installation {#installation}
${answers.instructions}
## Usage {#usage}
${answers.usageInfo}
## License {#license}
${answers.license}
## Contribution Guidelines {#contribution-guidelines}
${answers.contGuide}
## Test Instructions {#test-instructions}
${answers.testInst}
## Questions {#questions}
[Github](https://github.com/${answers.username})
[Email](${answers.email})
`);
}

// function call to initialize program
init();
