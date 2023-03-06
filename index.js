const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { default: Choice } = require("inquirer/lib/objects/choice");



// TODO: Write Code to gather information about the development team members, and render the HTML file.

const listOfId=[];
const Teams=[];

const Menu= ()=>{

    function buildTeam(){
        if(!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(Teams), 'utf-8');

    }

    function addEngineer(){
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'what is engineer name?'
            },
            {
                type: 'input',
                name: 'engineerId',
                message: 'what is engineer Id'
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: 'what is engineer Email?'
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: 'what is engineer Github link?'
            }
        ]).then(response=>{
            const engineer= new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
            Teams.push(engineer);
            listOfId.push(response.engineerId)
            createTeam();
        })

    }

    function addIntern(){
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: 'what is intern name?'
            },
            {
                type: 'input',
                name: 'internId',
                message: 'what is intern Id'
            },
            {
                type: 'input',
                name: 'internEmail',
                message: 'what is intern Email?'
            },
            {
                type: 'input',
                name: 'internSchool',
                message: 'what is intern School name?'
            }
        ]).then(response=>{
            const intern= new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
            Teams.push(intern);
            listOfId.push(response.internId)
            createTeam();
        })

    }


    function createTeam(){
        inquirer.prompt([
            {
                type: 'list',
                name: 'memberchoice',
                message: " Type of team member to be added?",
                choices:['Engineer', 'intern', 'no additional team member']
            }
        ]).then(userClick=>{
            if(userClick.memberchoice ==='Engineer'){
                //adding engineer
                addEngineer();
            }else if(userClick.memberchoice === 'intern') {
                //adding intern
                addIntern();
            } else{
                //build team function
                buildTeam();
            }

        })
    }

    
    function createManager(){
        inquirer.prompt([
            {
                type: 'input',
                name: 'managerName',
                message: " what is your team manager name?",
                validate: answer =>{
                    if (answer !== ""){
                        return true;
                    }
                    else{
                        return "Please enter Name"
                    }
                }
            },
            {
                type: 'input',
                name: "managerId",
                message: "Give your Team manager Id"
            },
            {
                type: 'input',
                name: "managerEmail",
                message: "Give your Team manager Email"
            },
            {
                type: 'input',
                name: "managerOfficeNumber",
                message: " Give your team manager office number?"
            }
        ]).then(response =>{
            const manager= new Manager (response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);
            Teams.push(manager);
            listOfId.push(response.managerId);
            createTeam();
        })
    }
    createManager();
}

Menu();