import { Customer } from './customers';

export interface Contact {
  id: string;
  customer: Customer;
  name: string;
  email: string;
  phone: string;
}

const Contacts: Contact[] = [];

export default Contacts;
