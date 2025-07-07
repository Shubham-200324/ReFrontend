import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../api/auth.js';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Add a small delay to prevent rapid state changes
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (user && token) {
          const userData = JSON.parse(user);
          dispatch({ type: 'AUTH_SUCCESS', payload: userData });
        } else {
          // Clear any partial data
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          dispatch({ type: 'AUTH_FAILURE', payload: null });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch({ type: 'AUTH_FAILURE', payload: null });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authAPI.login(credentials);
      if (response.success) {
        const userData = response.data.user;
        const token = response.data.token;
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        dispatch({ type: 'AUTH_SUCCESS', payload: userData });
        return { success: true };
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authAPI.register(userData);
      if (response.success) {
        const user = response.data.user;
        const token = response.data.token;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
        return { success: true };
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    authAPI.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const setAuthFromToken = async (token) => {
    if (!token) return;
    try {
      // Option 1: Decode JWT (if you want to extract user info directly)
      // Option 2: Fetch user profile from backend
      const res = await axios.get('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data && res.data.success) {
        const user = res.data.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: 'Invalid token' });
      }
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Invalid token' });
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    setAuthFromToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 