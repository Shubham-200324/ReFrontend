import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.js';
import Navbar from './components/Navbar.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Dashboard from './pages/Dashboard.js';
import ResumeBuilder from './pages/ResumeBuilder.js';
import OAuthSuccess from './pages/oauth-success.js';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-builder"
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              }
            />
            <Route path="/edit-resume/:id" element={<ResumeBuilder />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)',
                color: '#fff',
                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.15)',
                borderRadius: '12px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                animation: 'toast-pop 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
              },
              success: {
                iconTheme: {
                  primary: '#06b6d4',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
      <style>{`
@keyframes toast-pop {
  0% { opacity: 0; transform: translateY(30px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
`}</style>
    </AuthProvider>
  );
};

export default App; 