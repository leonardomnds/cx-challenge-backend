export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

const Customers: Customer[] = [{
  id: '9667019f-c2fd-4f66-85e2-d5feefe5dc0e',
  name: 'CustomerX',
  email: 'desenvolvimento@customerx.cx',
  phone: '(45) 99999-9999',
  createdAt: new Date('2021-06-10'),
}];

export default Customers;
