const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs").promises;

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//array for squad
const squadArray = []

//squad assembly with inquirer; starts with beginBuilder that gets manager info
function squadStart() {
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "Hello, manager! What's your name?",
        },
        {
            type: "input",
            name: "id",
            message: "And your ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your work email?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Finally, what is your office number?",
        },
    ])
        .then((answers) => {
            let manager = new Manager(
                answers.managerName,
                answers.id,
                answers.email,
                answers.officeNumber
            );
            squadArray.push(manager);
            addSquad();
        });
};

//function that loops back to add either intern or engineer
function addSquad() {
    return inquirer.prompt([
        {
            type: "list",
            name: "memberType",
            message: "Which member do you want to add to the squad?",
            choices: ["Engineer", "Intern", "Squad assembled!"],
        },
    ])
        .then((answers) => {
            if (answers.memberType === "Engineer") {
                addEngineer();
            } else if (answers.memberType === "Intern") {
                addIntern();
            } else { squadComplete(squadArray); }
        }
        )
};
//function to add new engineers
function addEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "An engineer! Nice. What's their name?",
        },
        {
            type: "input",
            name: "id",
            message: "And their ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What about their email?",
        },
        {
            type: "input",
            name: "gitHub",
            message: "What's their GitHub username?",
        },
    ])
        .then((answers) => {
            let engineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.gitHub
            );
            squadArray.push(engineer);
            addSquad();
        });
};

//function add interns
function addIntern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "An intern! The future! What's their name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is their ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What about their email?",
        },
        {
            type: "input",
            name: "school",
            message: "And what school is your intern from?",
        },
    ])
        .then((answers) => {
            let intern = new Intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school
            );
            squadArray.push(intern);
            addSquad();
        });
};

function squadComplete(squadArray) {
    fs.writeFile(outputPath, render(squadArray));
    console.log(squadArray)
}


async function init() {
    try {
        squadStart();
    } catch (err) {
        console.log(err);
    };
};

init();

