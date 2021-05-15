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
    renderMenu();
  });

// Main menu function
function renderMenu(){

    // Prompt user to choose an option
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "HERE IS THE  MENU",
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
           case "View all employees by manager":
                renderAllEmployeeByMngr();
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


function renderAllEmp(){

   
    let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

    
    connection.query(query, function(err, res) {
        if(err) return err;
        console.log("\n");

        
        console.table(res);

        
        renderMenu();
    });
}


function renderAllEmpByDept(){

    
    let deptArr = [];
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        
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

            
            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = '${answer.department}' ORDER BY ID ASC`;
            connection.query(query, (err, res) => {
                if(err) return err;
                
                
                console.log("\n");
                console.table(res);

               
                renderMenu();
            });
        });
    });
}

function renderAllEmpByRole(){

   
    let roleArr = [];
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        
        inquirer
          .prompt(
            {
              name: 'role',
              type: 'rawlist',
              choices() {
                 
                results.forEach(({ title }) => {
                  roleArr.push(title);
                });
                return roleArr;
              },
              message: "Which role would you like to search?",
            }
          )   
        .then((answer) => {

            
            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE role.title = '${answer.role}' ORDER BY ID ASC`;
            connection.query(query, (err, res) => {
                if(err) return err;
                
                
                console.log("\n");
                console.table(res);

                u
                renderMenu();
            });
        });
    });
}

function renderAllEmployeeByMngr(){

    
    let managerArr = [];
   
    connection.query("select DISTINCT m.id, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id  where e.manager_id IS NOT NULL", (err, results) => {
        if (err) throw err;
       //dataMngr=results.data;
        inquirer
          .prompt(
            {
              name: 'manager',
              type: 'rawlist',
              choices() {
                 
                 results.forEach((data) => {
                  managerArr.push(data.Manager);
                });
                return managerArr;
              },
            
              message: "Which role would you like to search?",
            }
          ) 
            
        .then((answer) => {
                  //console.log(results[1].id);
            let managerID;
            for (i=0; i < results.length; i++){
                if (answer.manager === results[i].Manager){
                    managerID = results[i].id;
                }
            }

            
            const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, 
            department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager 
            FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id 
            INNER JOIN department ON role.department_id = department.id WHERE e.manager_id = '${managerID}' ORDER BY ID ASC`;
            connection.query(query, (err, res) => {
                if(err) return err;
                
               
                console.log("\n");
                console.table(res);

               
                renderMenu();
            });
        });
    });
}

// Add Role
function addRole(){

    
    let departmentArr = [];

    connection.query('SELECT id, name FROM department ORDER BY name ASC',(err, results)=>{
        if (err) throw err;
        inquirer.prompt([
            {
                
                name: "roleTitle",
                type: "input",
                message: "Role title: "
            },
            {
                
                name: "salary",
                type: "number",
                message: "Salary: "
            },
            {   
                
                name: "dept",
                type: "list",
                message: "Department: ",
                choices(){
                 
                    results.forEach(({ name }) => {
                      departmentArr.push(name);
                    });
                    return departmentArr;
                  },
            }]).then((answer) => {

            
                let deptID;

               for (i=0; i < results.length; i++){
                    if (answer.dept == results[i].name){
                        deptID = results[i].id;
                    }
                }

               
                connection.query(`INSERT INTO role (title, salary, department_id)
                VALUES ("${answer.roleTitle}", ${answer.salary}, ${deptID})`, (err, res) => {
                    if(err) return err;
                    console.log(`\n ROLE ${answer.roleTitle} ADDED...\n`);
                    renderMenu();
                });

            });

        });
}

// Add a department

const addDepartment=()=>{
        inquirer.prompt(
            {
                name: "dptName",
                type: "input",
                message: "Department Name: "
            },
        )
        .then((answer)=>{
            connection.query(`insert into Department (name) values ("${answer.dptName}")`)
            console.log(`\n Department ${answer.dptname} ADDED...\n`);
            renderMenu()

        });

        }
        
   
    //add employee
    //================= Select Role Quieries Role Title for Add Employee Prompt ===========//
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}
//================= Select Role Quieries The Managers for Add Employee Prompt ===========//
var managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}
//============= Add Employee ==========================//
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then((answer)=> {
      var roleId = selectRole().indexOf(answer.role) + 1
      var managerId = selectManager().indexOf(answer.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: answer.firstname,
          last_name: answer.lastname,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.log(`\n EMPLOYEE ${answer.firstname} ${answer.lastname} ADDED...\n `);
          renderMenu()
      })

  })
}

//============= Update Employee ==========================//
function updateEmployeeRole() {
    connection.query("SELECT employee.id,employee.last_name FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    // console.log(res)
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then((answer) =>{
        var roleId = selectRole().indexOf(answer.role) + 1
        var employeeID;
        for(let i=0;i < res.length;i++)
            {
                if (answer.lastName===res[i].last_name)
                employeeID=res[i].id
            }
        connection.query(`UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeID}`, (err, res) => {
            if(err) return err;

            // confirm update employee
            console.log(`\n ${answer.lastName} ROLE UPDATED TO ${answer.role}...\n `);

            // back to main menu
            renderMenu();
  
           });
        });
  });

  }

  //update employee's manager

  
function updateEmployeeMngr() {
    connection.query("SELECT employee.id,employee.last_name FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    // console.log(res)
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "Manager",
            type: "rawlist",
            message: "Who is the Employees new Manager? ",
            choices: selectManager()
          },
      ]).then((answer) =>{
        var ManagerId = selectManager().indexOf(answer.Manager) + 1
        var employeeID;
        for(let i=0;i < res.length;i++)
            {
                if (answer.lastName===res[i].last_name)
                employeeID=res[i].id
            }
        connection.query(`UPDATE employee SET manager_id = ${ManagerId} WHERE id = ${employeeID}`, (err, res) => {
            if(err) return err;

            // confirm update employee
            console.log(`\n ${answer.lastName} Manager UPDATED TO ${answer.Manager}...\n `);

            // back to main menu
            renderMenu();
  
           });
        });
  });

  }

  //========= Deleted employees=========//

 connection.query("select DISTINCT m.id, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id  where e.manager_id IS NOT NULL", (err, results) => {
        if (err) throw err;
       //dataMngr=results.data;
        inquirer
          .prompt(
            {
              name: 'manager',
              type: 'rawlist',
              choices() {
                 
                 results.forEach((data) => {
                  managerArr.push(data.Manager);
                });
                return managerArr;
              },
            
              message: "Which role would you like to search?",
            }
          ) 
            
        .then((answer)