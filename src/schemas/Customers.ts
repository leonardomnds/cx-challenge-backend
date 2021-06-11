import * as Yup from 'yup';

export const CreateCustomerSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string().required('Campo obrigatório').email('E-mail inválido'),
  phone: Yup.string().required('Campo Obrigatório').min(10, 'Deve ter 10 ou 11 caracteres').max(11, 'Deve ter 10 ou 11 caracteres'),
  createdAt: Yup.date().default(new Date()),
});

export const UpdateCustomerSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string().required('Campo obrigatório').email('E-mail inválido'),
  phone: Yup.string().required('Campo Obrigatório').min(10, 'Deve ter 10 ou 11 caracteres').max(11, 'Deve ter 10 ou 11 caracteres'),
});
