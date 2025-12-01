import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

// ----------------------
// REQUEST INTERCEPTOR
// ----------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token && config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------
// RESPONSE INTERCEPTOR
// ----------------------
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error?.response?.status;

    // Handle unauthorized (token expired / invalid)
    if (status === 401) {
      localStorage.removeItem('token');

      // Avoid redirect loop (only redirect if not already on login page)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Optional: handle common server errors
    if (status === 500) {
      console.error("Internal server error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
