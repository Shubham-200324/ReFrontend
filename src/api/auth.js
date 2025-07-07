import api from './config.js';

export const authAPI = {
  // Register a new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Logout (client-side only since we're using JWT cookies)
  logout: () => {
    localStorage.removeItem('user');
    // The backend will handle cookie removal
  },
}; 