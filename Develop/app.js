const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");

const collaborators = [];
const collaboratorID = [];

const questionary = [
    {
        type: "input",
        name: "managerName",
        message: "Please, type here the manager's name"
    },
    {
        type: "input",
        name: "managerId",
        message: "Please, type here the the manager's ID"
    },
    {
        type: "input",
        name: "managerEmail",
        message: "Please, type here the manager's email address"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Please, type here the office phone number"
    }
];


function manager() {
    console.log("Is time to build your team!");
    inquirer.prompt(questionary).then(function(data){
        const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.officeNumber);
        collaborators.push(manager);
        collaboratorID.push(data.managerId);
        team();
    });
};

function team() {
    inquirer.prompt([
        {
            type: "list",
            name: "teamMembers",
            message: "What is the position that you want to fill?",
            choices: [
                "Engineer",
                "Intern",
                "no more team members today."
            ]
        }
    ]).then(function(data){
        if (data.teamMembers === "Engineer"){
            engineer();
        } else if (data.teamMembers === "Intern"){
            intern();
        } else (outputTeam());
    });
};

function engineer() {
    inquirer.prompt([
        {
            type: "input",
            name:"engineerName",
            message: "Please, type here the name of the engineer?"
        },
        {
            type: "input",
            name:"engineerId",
            message: "Please, type here the engineer's ID"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "Please, type here the engineer's email"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "Please, type here the GitHub username of the engineer"
        }
    ]). then(function(data){
        const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
        collaborators.push(engineer);
        collaboratorID.push(data.engineerId);
        team();
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
