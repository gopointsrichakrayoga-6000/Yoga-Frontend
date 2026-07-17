import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ashram_jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle unauthorized errors cleanly without breaking component renders
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token is invalid/expired during authenticated requests, clear localStorage
      localStorage.removeItem('ashram_jwt_token');
      localStorage.removeItem('ashram_user');
      // Dispatch custom event so AuthContext can sync state immediately
      window.dispatchEvent(new CustomEvent('ashram_auth_expired', { detail: { path: window.location.pathname } }));
    }
    return Promise.reject(error);
  }
);

export default api;
