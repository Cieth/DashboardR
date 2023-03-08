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
  let customers = await searchCustomer();
  let result = customers.find((customer: any) => customer.id === id);
  return result;
};

export const removeCustomer = async (id: string) => {
  let customers = await searchCustomer();
  let index = customers.findIndex((customer: any) => customer.id === id);
  customers.splice(index, 1);
  localStorage['customers'] = JSON.stringify(customers);
};

export const saveCustomer = async (customer: Customer) => {
  let customers = await searchCustomer();
  if (customer.id) {
    let index = customers.findIndex((c: any) => c.id === customer.id);
    customers[index] = customer;
  } else {
    customer.id = String(Math.round(Math.random() * 100000));
    customers.push(customer);
  }
  localStorage['customers'] = JSON.stringify(customers);
};
