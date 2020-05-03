const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

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

// 
function addSquad() {
    return inquirer.prompt([
        {
            type: "list",
            name: "memberType",
            message: "Which member do you want to add to the squad?",
            choices: ["Engineer", "Intern", "Squad assembled!"],
        },
    ])
        .then(() => {
            if (addSquad.memberType = "Engineer") {
                addEngineer()
            } else if (addSquad.memberType = "Intern") {
                addIntern()
            } else { squadComplete(); }
        }
        )
};

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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
