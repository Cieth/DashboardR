import Vendor from './Vendor';

export function searchVendor() {
  if (!localStorage['vendors']) {
    localStorage['vendors'] = '[]';
  }
  let vendors = localStorage['vendors'];
  vendors = JSON.parse(vendors);
  return vendors;
}

export const searchVendorById = (id: string) => {
  let vendors = searchVendor();
  let result = vendors.find((vendor: any) => vendor.id === id);
  return result;
};

export const removeVendor = (id: string) => {
  let vendors = searchVendor();
  let index = vendors.findIndex((vendor: any) => vendor.id === id);
  vendors.splice(index, 1);
  localStorage['Vendors'] = JSON.stringify(vendors);
};

export function saveVendor(vendor: Vendor) {
  let vendors = searchVendor();
  if (vendor.id) {
    let index = vendors.findIndex((c: any) => c.id === vendor.id);
    vendors[index] = vendor;
  } else {
    vendor.id = String(Math.round(Math.random() * 100000));
    vendors.push(vendor);
  }
  localStorage['vendors'] = JSON.stringify(vendors);
}
