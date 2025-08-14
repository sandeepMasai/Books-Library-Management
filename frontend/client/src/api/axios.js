import axios from 'axios';

const api = axios.create({
  baseURL: 'https://books-library-management-yga0.onrender.com/api',
  withCredentials: true, 
});

export default api;
