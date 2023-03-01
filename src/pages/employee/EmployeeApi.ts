import Employee from './Employee';

export function searchEmployee() {
  if (!localStorage['employees']) {
    localStorage['employees'] = '[]';
  }
  let employees = localStorage['employees'];
  employees = JSON.parse(employees);
  return employees;
}

export const searchEmployeeById = (id: string) => {
  let employees = searchEmployee();
  let result = employees.find((employee: any) => employee.id === id);
  return result;
};

export const removeEmployee = (id: string) => {
  let employees = searchEmployee();
  let index = employees.findIndex((employee: any) => employee.id === id);
  employees.splice(index, 1);
  localStorage['employees'] = JSON.stringify(employees);
};

export function saveEmployee(employee: Employee) {
  let employees = searchEmployee();
  if (employee.id) {
    let index = employees.findIndex((c: any) => c.id === employee.id);
    employees[index] = employee;
  } else {
    employee.id = String(Math.round(Math.random() * 100000));
    employees.push(employee);
  }
  localStorage['employees'] = JSON.stringify(employees);
}
