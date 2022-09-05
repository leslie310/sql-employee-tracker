USE company_db;

INSERT INTO department (name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Sales Lead', 100000, 4),
        ('Salesperson', 80000, 4),
        ('Lead Engineer', 150000, 1),
        ('Software Engineer', 120000, 1),
        ('Account Manager', 160000, 2),
        ('Accountant', 125000, 2),
        ('Legal Team Lead', 250000, 3),
        ('Lawyer', 190000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Emily', 'Gomez', 4, null),
        ('Chris', 'Clay', 3, null),
        ('Josh', 'Sanchez', 2, 1),
        ('Michael', 'Ortiz', 3, 1),
        ('John', 'John', 2, 1),
        ('Ivan', 'Lewis', 1, 2),
        ('Monica', 'Son', 1, 1),
        ('Claire', 'JO', 1, 4),
        ('Brittany', 'Lu', 2, 2),
        ('Maebe', 'Funke', 4, 1);
