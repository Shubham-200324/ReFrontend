import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      console.log('Unauthorized request - clearing token');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // Don't redirect automatically - let components handle it
    }
    
    if (error.response?.status === 429) {
      // Rate limit exceeded
      console.error('Rate limit exceeded:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api; 