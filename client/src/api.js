import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

export const getUsers = () => API.get('/users');
export const addUser = (name) => API.post('/users', { name });
export const claimPoints = (id) => API.post(`/users/${id}/claim`);
