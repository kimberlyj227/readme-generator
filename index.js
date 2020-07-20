
const inquirer = require("inquirer");
const fs = require("fs");
let license;


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
        message: "Enter the test information.",
        name: "tests"
    },
    {
        type: "list",
        message: "What is the license type?",
        name: "license",
        choices: ["MIT", "ODbL", "Apache License 2.0", "ISC", "GPL v3"]
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
    },
    {
        type: "input",
        message: "Enter all of the authors of the project.",
        name: "authors"
    }
];

// function to write README file
const writeToFile =(fileName, answers) => {
    fs.writeFile(fileName, createMarkdown(answers), (err) => {
        if(err)  console.log(err);
        
        console.log("Success!");
    })
}

// function to set license icon
const getLicense = (answers) => {
    const licenseData = answers.license

    if (licenseData === "MIT") {
        license= 
        "(https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    } else if (licenseData === "ODbL") {
        license =
        "(https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)"
    } else if (licenseData === "ISC") {
        license =
        "(https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
    } else if (licenseData === "Apache License 2.0") {
        license = 
        "(https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    } else {
        license = 
        "(https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
    }

}


// function to initialize program
const init = () => {
    inquirer.prompt(questions).then((answers) => {
        getLicense(answers)
        writeToFile("README.md", answers);
    })
}

// function creates markdown
const createMarkdown = (answers) => {
return (`# ${answers.title}
[![Github License]${license}
## Table of Contents
[Description](#description)<br>
[Installation](#installation)<br>
[Usage](#usage)  <br>
[License](#license)  <br>
[Contribution Guidelines](#contribution-guidelines) <br> 
[Test Instructions](#tests)  <br>
[Authors](#authors)  <br>
[Questions](#questions)  
## Description
${answers.description}
## Installation
${answers.instructions}
## Usage
${answers.usageInfo}
## License
Licensed under the ${answers.license} license.
## Contribution Guidelines
${answers.contGuide}
## Tests
${answers.tests}
## Authors
${answers.authors}
## Questions
[Github](https://github.com/${answers.username})<br>
[Email](${answers.email})
`);
}

// function call to initialize program
init();
