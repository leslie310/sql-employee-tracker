USE company_db;

SELECT first_name AS name, 
FROM employees
JOIN title on roles.id = employees.id
JOIN roles on employees.id = roles.id;