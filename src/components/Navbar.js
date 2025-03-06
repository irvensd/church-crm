import React, { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { FiSun, FiMoon, FiBell, FiUser, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  
  const notifications = [
    { id: 1, text: 'New member registration', time: '5 minutes ago' },
    { id: 2, text: 'Upcoming event: Prayer Meeting', time: '1 hour ago' },
    { id: 3, text: 'Donation received: $250', time: '3 hours ago' }
  ];
  
  const handleSettingsClick = () => {
    navigate('/settings');
  };
  
  const handleProfileClick = () => {
    navigate('/church-profile');
  };
  
  const handleLogout = () => {
    // This would be handled by your authentication system
    console.log('Logging out...');
    // Clear any user session data if needed
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    
    // Call the onLogout function passed from App.js
    if (onLogout) {
      onLogout();
    }
    
    // Navigate to landing page
    navigate('/');
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Congre</span>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">via</span>
              <span className="ml-1 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-1.5 py-0.5 rounded-sm font-normal">CMS</span>
            </h1>
          </div>
          
          <div className="flex items-center">
            {/* Notifications */}
            <div className="relative ml-4">
              <button 
                className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FiBell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              {/* Notification dropdown */}
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    {notifications.map(notification => (
                      <div key={notification.id} className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{notification.text}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-600">
                      <a href="#" className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                        View all notifications
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Settings */}
            <button 
              className="p-2 ml-4 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
              onClick={handleSettingsClick}
            >
              <FiSettings className="h-5 w-5" />
            </button>
            
            {/* User profile */}
            <div className="relative ml-4">
              <button 
                className="flex items-center max-w-xs bg-white dark:bg-gray-700 rounded-full focus:outline-none"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <FiUser className="h-5 w-5" />
                </div>
              </button>
              
              {/* User menu dropdown */}
              {showUserMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                  <div className="py-1">
                    <button 
                      onClick={handleProfileClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Your Profile
                    </button>
                    <button 
                      onClick={handleSettingsClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Settings
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 ml-4 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 