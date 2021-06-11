export interface Contact {
  id: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
}

const Contacts: Contact[] = [{
  id: '9fe20a90-fccf-41c2-9cda-d364858a9850',
  customerId: '9667019f-c2fd-4f66-85e2-d5feefe5dc0e',
  name: 'Ricardo Grassi',
  email: 'ricardo.grassi@customerx.cx',
  phone: '(45) 99999-9999',
}];

export default Contacts;
