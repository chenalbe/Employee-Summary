const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

async function init(){
    let teamHTML = '';
    let teamSize;

    await inquirer.prompt(
        {
        type: "number",
        message: "How many people are on your team?",
        name: "teamSize"
        }
    ).then((data)=>{
        teamSize = data.teamSize;
    })
        if (teamSize === 0){
            console.log("You have no one on your team.");
            return;
        }
            for (let i = 0; i<teamSize;i++){
                let name;
                let id;
                let title;
                let email;
                await inquirer.prompt([
                    {
                        type: "input",
                        message: `What is employee (${i})'s name?`,
                        name: "name"
                    },
                    {
                        type: "input",
                        message: `What is employee (${i})'s ID?`,
                        name: "ID"
                    },
                    {
                        type: "input",
                        message: `What is employee (${i})'s email?`,
                        name: "email"
                    },
                    {
                        type: "list",
                        message: `What is employee (${i})'s title?`,
                        name: "title",
                        choices: ["Manager", "Engineer", "Intern"]
                    }]
                ).then((data)=>{
                    name = data.name;
                    id = data.ID;
                    email = data.email;
                    title = data.title;
                });
                switch(title){
                    case "Manager" :
                        await inquirer.prompt([
                            {
                                type: "input",
                                message: "What is your Manager's Office Number?",
                                name: "officeNumber"
                            }]
                        ).then((data)=>{
                            const manager = new Manager (name, id, email, data.officeNumber);
                            teamList = fs.readFileSync("templates/manager.html");
                            teamHTML = teamHTML + "\n" + eval('`'+ teamList +'`');
                        });
                        break;
                    case "Engineer" :
                        await inquirer.prompt([
                            {
                                type: "input",
                                message: "What is your GitHub email?",
                                name: "github"
                            }]
                        ).then((data)=>{
                            const engineer = new Engineer (name, id, email, data.github);
                            teamList = fs.readFileSync("templates/engineer.html");
                            teamHTML = teamHTML + "\n" + eval('`'+ teamList +'`');
                        });
                        break;
                    case "Intern" :
                        await inquirer.prompt([
                            {
                                type: "input",
                                message: "What is your school?",
                                name: "school"
                            }]
                        ).then((data)=>{
                            const intern = new Intern (name, id, email, data.school);
                            teamList = fs.readFileSync("templates/intern.html");
                            teamHTML = teamHTML + "\n" + eval('`'+ teamList +'`');   
                        });
                        
                }
            }
        
    
    const indexHTML = fs.readFileSync("templates/main.html");
    teamHTML = eval('`'+ indexHTML +'`');
    fs.writeFile("output/team.html", teamHTML, function(err) {
    if (err){
        return console.log(err);
    }
    console.log("Success");
    });
}
init();