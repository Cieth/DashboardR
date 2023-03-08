import Supplier from './Supplier';

export function searchSupplier() {
  if (!localStorage['Suppliers']) {
    localStorage['Suppliers'] = '[]';
  }
  let suppliers = localStorage['Suppliers'];
  suppliers = JSON.parse(suppliers);
  return suppliers;
}

export const searchSupplierById = (id: string) => {
  let suppliers = searchSupplier();
  let result = suppliers.find((supplier: any) => supplier.id === id);
  return result;
};

export const removeSupplier = (id: string) => {
  let suppliers = searchSupplier();
  let index = suppliers.findIndex((supplier: any) => supplier.id === id);
  suppliers.splice(index, 1);
  localStorage['Suppliers'] = JSON.stringify(suppliers);
};

export function saveSupplier(supplier: Supplier) {
  let suppliers = searchSupplier();
  if (supplier.id) {
    let index = suppliers.findIndex((c: any) => c.id === supplier.id);
    suppliers[index] = supplier;
  } else {
    supplier.id = String(Math.round(Math.random() * 100000));
    suppliers.push(supplier);
  }
  localStorage['Suppliers'] = JSON.stringify(suppliers);
}
