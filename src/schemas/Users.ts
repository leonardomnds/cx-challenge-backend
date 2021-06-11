import * as Yup from 'yup';

export const CreateUserSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string().required('Campo obrigatório').email('E-mail inválido'),
  password: Yup.string().required('Campo obrigatório').min(6, 'Mínimo de 6 dígitos'),
});
