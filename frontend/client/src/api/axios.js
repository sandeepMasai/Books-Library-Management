import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2025/api',
  withCredentials: true, 
});

export default api;
