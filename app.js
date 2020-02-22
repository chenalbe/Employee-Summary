const inquirer = require("inquirer");
const fs = require("fs");

async function start(){
    let teamHTML = '';
    let teamSize;

    await inquirer.prompt(
        {
        type: "number",
        message: "How many people are in your team?",
        name: "teamSize"
        }
    ).then((data)=>{
        let teamSize = data.teamSize;
        if (teamSize === 0){
            console.log("You have no one on your team.")
        }
        else {
            for (let i = 0; i<teamSize;i++){
                let name;
                let id;
                let title;
                let email;
                await inquirer.prompt(
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
                        type: "input",
                        message: `What is employee (${i})'s title?`,
                        name: "title"
                    }
                ).then((data)=>{
                    name = data.name;
                    id = data.ID;
                    email = data.email;
                    title = data.title;
                });
                switch(title){
                    case "Manager" :
                        await.prompt(
                            {
                                type: "input",
                                message: "What is your Manager's Office Number?",
                                name: "officeNo"
                            }
                        ).then((data)=>{
                            
                        })
                }
            }
        }
    })
}