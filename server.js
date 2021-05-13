const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");


// Connection Properties
const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_DB"
}

// Creating Connection
const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: 'PAPAwanje@1987',
    database: 'employeedb',
  });

  connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    mainMenu();
  });

// Main menu function
function mainMenu(){

    // Prompt user to choose an option
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "MAIN MENU",
      choices: [
        "View all employees",
        "View all employees by role",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Add role",
        "Add department",
        "Update employee role",
        "Update employee manager",
        "Delete employee",
        "Delete role",
        "Delete department",
        "View department budgets"
      ]
    })
    .then((answer) => {

        // Switch case depending on user option
        switch (answer.action) {
            case "View all employees":
                renderAllEmp();
                break;

            case "View all employees by department":
                renderAllEmpByDept();
                break;

            case "View all employees by role":
                renderAllEmpByRole();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "Add department":
                addDepartment();
                break;
            case "Add role":
                addRole();
                break;
            case "Update employee role":
                updateEmployeeRole();
                break;
            case "Update employee manager":
                updateEmployeeMngr();
                break;
            case "View all employees by manager":
                viewAllEmployeeByMngr();
                break;
            case "Delete employee":
                deleteEmployee();
                break;
            case "View department budgets":
                viewDepartmenttBudget();
                break;
            case "Delete role":
                deleteRole();
                break;
            case "Delete department":
                deleteDepartment();
                break;
        }
    });
}

// View all employees 
function renderAllEmp(){

    // Query to view all employees
    let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

    // Query from connection
    connection.query(query, function(err, res) {
        if(err) return err;
        console.log("\n");

        // Display query results using console.table
        console.table(res);

        //Back to main menu
        mainMenu();
    });
}

// View all employees by department
function renderAllEmpByDept(){

    // Set global array to store department names
    let deptArr = [];
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
          .prompt(
            {
              name: 'department',
              type: 'rawlist',
              choices() {
                 
                results.forEach(({ name }) => {
                  deptArr.push(name);
                });
                return deptArr;
              },
              message: "Which department would you like to search?",
            }
          )   
        .then((answer) => {

            // Query all employees depending on selected department
            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = '${answer.department}' ORDER BY ID ASC`;
            connection.query(query, (err, res) => {
                if(err) return err;
                
                // Show results in console.table
                console.log("\n");
                console.table(res);

                // Back to main menu
                mainMenu();
            });
        });
    });
}
