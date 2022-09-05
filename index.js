const mysql = require('mysql2');
const inquirer= require('inquirer');
const cTable = require('console.table');


const db = mysql.createConnection(
    {

    host: 'localhost',
      user: 'root',
      password: 'Ivan001!',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)

)


const init = () => {
    inquirer.prompt([
        {
            name: "start",
            message: "Welcome! Press Enter to begin!",
            type: "input",
        },
        {
            name: "task",
            message: "What would you like to do?",
            type: "list",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]
        }
    ]).then(ans=> {
        if(ans.task==="View all departments"){
            viewDepartments();
        } else if (ans.task==="View all roles"){
            viewRoles();
        } else if (ans.task==="View all employees"){
            viewEmployees();
        } else if (ans.task==="Add a department"){
            addDepartment();
        } else if (ans.task==="Add a role"){
            addRole();
        } else if (ans.task==="Add an employee"){
            addEmployee();
        } else if (ans.task==="Update an employee role"){
            updateRole();
        } else {
            quitApp();
        }
    })
}

const viewDepartments = () => {
    db.query("SELECT * FROM department", (err,results)=>{
        if(err)
            throw err
        console.table('\n', results);
    })
    console.log('Press Enter to return to the task list');
    init();
}
const viewRoles = () => {
    db.query('SELECT * FROM roles', (err,results)=>{
        if(err)
            throw err
        console.table('\n', results);
    })
    init();
}
const viewEmployees = () => {
    db.query('SELECT employees.id, first_name, last_name, manager_id, roles.title, roles.salary, department.name    FROM employees JOIN roles on employees.role_id = roles.id    JOIN department on department_id = department.id', (err,results)=>{
        if(err)
            throw err
        console.table('\n', results);
    })
    init();
}
const addDepartment = () => {
    inquirer.prompt([
        {
            name: "name",
            message: "What department do you want to add?",
            type: "input",
        }
    ]).then(ans=>{
        db.query('INSERT INTO department(name) VALUES(?)', [ans.name], (err,results)=>{
            if(err)
                throw err
            db.query('SELECT * FROM department', (err,results)=>{
                if(err)
                    throw err
                console.table('\n', results);
            })
        })
        init();
    })
};
const addRole = () => {
    db.query('SELECT id AS value, name FROM department', (err,results)=>{
        if(err)
            throw err
        inquirer.prompt([
            {
                name: "title",
                message: "What role do you want to add?",
                type: "input",
            },
            {
                name: "salary",
                message: "What is the salary for this role?",
                type: "number",
            },
            {
                name: "department_id",
                message: "What department is this role in?",
                type: "list",
                choices: results,
            }
        ]).then(ans=>{
            console.log(ans);
            db.query('INSERT INTO roles(title, salary, department_id) VALUES(?,?,?)', [ans.title, ans.salary, ans.department_id], (err,results)=>{
                if(err)
                    throw err
                db.query('SELECT * FROM roles', (err,results)=>{
                    if(err)
                        throw err
                    console.table('\n', results);
                })
                init();
        })
    })
});
    
}
const addEmployee = () => {
    db.query('SELECT id AS value, title AS name FROM roles', (err,results)=>{
        if(err)
            throw err
        inquirer.prompt([
            {
                name: "first_name",
                message: "What is their first name?",
                type: "input",
            },
            {
                name: "last_name",
                message: "What is their last name?",
                type: "input",
            },
            {
                name: "manager_id",
                message: "Who is their manager? (by manager ID number)",
                type: "number",
            },
            {
                name: "role_id",
                message: "What is their role?",
                type: "list",
                choices: results,
            }
        ]).then(ans=>{
            console.log(ans);
            db.query('INSERT INTO employees(first_name, last_name, manager_id, role_id) VALUES(?,?,?,?)', [ans.first_name, ans.last_name, ans.manager_id, ans.role_id], (err,results)=>{
                if(err)
                    throw err
                db.query('SELECT * FROM employees', (err,results)=>{
                    if(err)
                        throw err
                    console.table('\n', results);
                })
                init();
            })
        })
    });

}
const updateRole = () => {
db.query('SELECT id AS value, first_name AS name from employees', (err,results)=>{
    if (err)
        throw err
    inquirer.prompt([
        {
            name: "name",
            message: "Which employee do you want to update?",
            type: "list",
            choices: results,
        }
    ]).then(ans=>{
        updateEmployee();
    })
});
}

const updateEmployee = () => {
db.query('SELECT id AS value, title AS name', (err,results)=>{
    if (err)
        throw err
    inquirer.prompt([
        {
            name: "role",
            message: "Which role do you want to move them to?",
            type: "list",
            choices: results,
        }
    ]) .then(ans=>{
        db.query('UPDATE employees SET title WHERE id (?)', results, (err,results)=>{
            if (err)
                throw err
            console.table('\n',results)
        })
    })
});
}

const quitApp = () => {
console.log("Have a great day!")
}

init();