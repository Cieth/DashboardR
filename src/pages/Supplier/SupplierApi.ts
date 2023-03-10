import Supplier from './Supplier';

export const searchSupplier = async () => {
  let url = process.env.REACT_APP_API + '/supplier';
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const searchSupplierById = async (id: string) => {
  let url = process.env.REACT_APP_API + '/supplier/' + id;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const removeSupplier = async (id: string) => {
  let url = process.env.REACT_APP_API + '/supplier/' + id;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const saveSupplier = async (supplier: Supplier) => {
  let url = process.env.REACT_APP_API + '/supplier';
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(supplier),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
