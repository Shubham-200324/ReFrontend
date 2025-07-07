import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { validateForm, authValidationRules } from '../utils/validation.js';
import { toast } from 'react-hot-toast';
import Input from '../components/Input.js';
import Button from '../components/Button.js';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldErrors = validateForm({ [name]: value }, [{ ...authValidationRules[name], id: name, label: name.charAt(0).toUpperCase() + name.slice(1) }]);
    setErrors(prev => ({
      ...prev,
      ...fieldErrors
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData, [
      { ...authValidationRules.email, id: 'email', label: 'Email' },
      { ...authValidationRules.password, id: 'password', label: 'Password' }
    ]);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(formData);
      if (result.success) {
        toast.success('Login successful!');
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181c2a] to-[#2a2d3e] py-8 px-2">
      <div className="w-full max-w-md bg-[#23263a] rounded-2xl shadow-2xl border border-[#32344a] p-6 sm:p-10 space-y-8 mx-2 animate-fade-in">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white drop-shadow-lg">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Or{' '}
            <Link
              to="/signup"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              create a new account
            </Link>
          </p>
        </div>
        {/* Google Login Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-600 rounded-lg bg-[#181c2a] text-white font-medium shadow hover:bg-[#23263a] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            window.location.href = process.env.REACT_APP_BACKEND_URL
              ? `${process.env.REACT_APP_BACKEND_URL}/api/auth/google`
              : 'http://localhost:3001/api/auth/google';
          }}
        >
          <svg className="h-5 w-5" viewBox="0 0 488 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123.1 24.5 166.3 64.9l-67.5 64.9C316.4 97.7 285.7 88 248 88c-99.7 0-180.7 81.1-180.7 180.7 0 99.7 81.1 180.7 180.7 180.7 91.6 0 150.7-52.2 162.7-125.7H248v-100h240c2.2 12.7 3.3 25.7 3.3 38.8z" fill="#4285F4"/>
              <path d="M248 504c67.6 0 124.5-22.4 166.3-60.7l-80.1-65.6c-22.2 15-50.7 23.9-86.2 23.9-66.2 0-122.3-44.7-142.4-104.7H24.1v65.8C66.2 455.1 151.2 504 248 504z" fill="#34A853"/>
              <path d="M105.6 297.6c-4.8-14.3-7.6-29.5-7.6-45.6s2.8-31.3 7.6-45.6v-65.8H24.1C8.6 164.7 0 208.7 0 256s8.6 91.3 24.1 130.4l81.5-65.8z" fill="#FBBC05"/>
              <path d="M248 88c35.7 0 67.7 12.3 92.9 36.4l69.6-69.6C371.1 24.5 314.8 0 248 0 110.8 0 0 110.8 0 248c0 47.3 8.6 91.3 24.1 130.4l81.5-65.8C125.7 169.1 206.7 88 248 88z" fill="#EA4335"/>
            </g>
          </svg>
          <span className="text-white">Sign in with Google</span>
        </button>
        <div className="flex items-center my-2">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="mx-2 text-gray-400 text-xs">or</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              placeholder="Enter your email"
              required
              className="text-base bg-[#181c2a] text-white border-gray-600 placeholder-gray-400"
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                placeholder="Enter your password"
                required
                className="pr-10 text-base bg-[#181c2a] text-white border-gray-600 placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-2 text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-150"
            loading={isLoading}
            disabled={isLoading}
          >
            Sign in
          </Button>
        </form>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeInModal 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Login; 