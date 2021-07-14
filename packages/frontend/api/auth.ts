import axios from './config';
import { LoginData } from 'types/index';

const auth = {
  logout: () => axios.post('/auth/logout'),
  login: (loginData: LoginData) => axios.post('/auth/login', loginData),
};

export default auth;
