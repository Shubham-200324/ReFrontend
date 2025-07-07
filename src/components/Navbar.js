import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { getInitials } from '../utils/helpers.js';
import { 
  UserCircleIcon, 
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="bg-[#23263a] shadow-lg border-b border-[#32344a] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              {/* Custom Resume Builder Logo SVG */}
              <span className="inline-block h-10 w-10">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="8" width="24" height="32" rx="4" fill="#e6f0fa" stroke="#2563eb" strokeWidth="2"/>
                  <rect x="10" y="14" width="8" height="6" rx="2" fill="#2563eb" opacity="0.2"/>
                  <rect x="10" y="24" width="16" height="2" rx="1" fill="#2563eb" opacity="0.5"/>
                  <rect x="10" y="29" width="12" height="2" rx="1" fill="#2563eb" opacity="0.5"/>
                  <g>
                    <rect x="30" y="28" width="12" height="12" rx="6" fill="#2563eb"/>
                    <path d="M34 34l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g>
                    <rect x="20" y="6" width="3" height="18" rx="1.2" fill="#2563eb"/>
                    <rect x="19" y="6" width="5" height="3" rx="1.2" fill="#1e293b"/>
                  </g>
                </svg>
              </span>
              <span className="text-xl font-bold text-white drop-shadow">Resume Builder</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/resume-builder"
              className="text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Create Resume
            </Link>
          </div>

          {/* User menu */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#181c2a] transition-colors"
              >
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-300">
                    {getInitials(user?.name || 'U')}
                  </span>
                </div>
                <span className="text-sm font-medium text-white">{user?.name}</span>
                <svg
                  className={`h-4 w-4 text-gray-300 transition-transform ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#23263a] rounded-md shadow-lg py-1 z-50 border border-[#32344a]">
                  <div className="px-4 py-2 border-b border-[#32344a]">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#181c2a] flex items-center space-x-2"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-300 hover:text-blue-400 hover:bg-[#181c2a]"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#32344a] bg-[#23263a]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-blue-400 hover:bg-[#181c2a]"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/resume-builder"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-blue-400 hover:bg-[#181c2a]"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Resume
            </Link>
            <div className="border-t border-[#32344a] pt-4">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-200 hover:text-blue-400 hover:bg-[#181c2a] flex items-center space-x-2"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .animate-fade-in {
          animation: fadeInModal 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(-20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 