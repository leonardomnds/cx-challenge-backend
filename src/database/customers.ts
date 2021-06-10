export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

const Customers: Customer[] = [];

export default Customers;
