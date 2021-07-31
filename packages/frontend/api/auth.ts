import { Credentials, CredentialsRegister } from 'types';
import axios from './config';

const auth = {
  logout: () => axios.post('/auth/logout'),
  login: (credentials: Credentials) => axios.post('/auth/login', credentials),
  register: (credentials: CredentialsRegister) => axios.post('/auth/register', credentials),
};

export default auth;
