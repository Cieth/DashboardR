import Customer from './Customer';

export const searchCustomer = async () => {
  let url = process.env.REACT_APP_API + '/customers';
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export const searchCustomerById = async (id: string) => {
  let url = process.env.REACT_APP_API + '/customers/' + id;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const removeCustomer = async (id: string) => {
  let url = process.env.REACT_APP_API + '/customers/' + id;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const saveCustomer = async (customer: Customer) => {
  let url = process.env.REACT_APP_API + '/customers';
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(customer),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
