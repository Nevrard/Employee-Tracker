INSERT INTO department (name)
VALUES ("IT");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Human Resources");

INSERT INTO department (name)
VALUES ( "Management");

INSERT INTO department (name)
VALUES ("Finance");

--- Roles Seed ---

INSERT INTO role (title, salary, department_id)
VALUES ("Front End Developer", 60000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES ("Helpdesk Analyst", 45000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales representative", 45000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Account", 65000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Account", 80000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("IT manager", 90000, 1);



----- Employee Seeds ---

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "EVrard", "Ndanga", 2, null);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "Jean", "Paul", 4, 4);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "Melissa", "Mutoni", 3, null);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "Zakarian", "Gary", 5, null);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "Katleen", "Renault", 6, null);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( "Ali", "Souleiman", 1, 5);
