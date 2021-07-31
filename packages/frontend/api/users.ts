import axios from './config';

export default {
  me: () => axios.get('/users/me'),
};
