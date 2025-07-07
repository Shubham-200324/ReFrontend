import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setAuthFromToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      // Store token (localStorage or context)
      localStorage.setItem('token', token);
      if (setAuthFromToken) {
        setAuthFromToken(token);
      }
      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
    } else {
      // No token, redirect to login
      navigate('/login', { replace: true });
    }
  }, [navigate, setAuthFromToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-700 text-lg">Signing you in with Google...</p>
      </div>
    </div>
  );
};

export default OAuthSuccess; 