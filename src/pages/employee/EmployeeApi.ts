import Employee from './Employee';

export const searchEmployee = async () => {
  let url = process.env.REACT_APP_API + '/employee';
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export const searchEmployeeById = async (id: string) => {
  let url = process.env.REACT_APP_API + '/employee/' + id;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const removeEmployee = async (id: string) => {
  let url = process.env.REACT_APP_API + '/employee/' + id;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const saveEmployee = async (employee: Employee) => {
  let url = process.env.REACT_APP_API + '/employee';
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(employee),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
