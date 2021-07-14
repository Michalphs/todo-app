import axios from './config';

const todo = {
  getAll: () => axios.get('/todos'),
};

export default todo;
