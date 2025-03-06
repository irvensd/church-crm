import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiBell, FiUser, FiSettings, FiHelpCircle } from 'react-icons/fi';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine the current page title based on the URL path
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path === '/members') return 'Members';
    if (path === '/calendar') return 'Calendar';
    if (path === '/messages') return 'Messages';
    if (path === '/events') return 'Events';
    if (path === '/small-groups') return 'Small Groups';
    if (path === '/financial') return 'Financial Management';
    if (path === '/church-profile') return 'Church Profile';
    if (path === '/settings') return 'Settings';
    if (path === '/help-support') return 'Help Center';
    if (path === '/sermon-collaboration') return 'Sermon Collaboration';
    if (path === '/pastoral-care') return 'Pastoral Care';
    if (path === '/ministry-analytics') return 'Ministry Analytics';
    if (path === '/tasks') return 'Tasks';
    if (path === '/why-congrevia') return 'Why Congrevia';
    
    // Default title if no match
    return 'Congrevia';
  };

  // Navigate to help and support page
  const goToHelpSupport = () => {
    navigate('/help-support');
  };

  // Navigate to settings page
  const goToSettings = () => {
    navigate('/settings');
  };

  // Navigate to church profile
  const goToChurchProfile = () => {
    navigate('/church-profile');
  };

  // Navigate to user profile (placeholder for now)
  const goToUserProfile = () => {
    // This could navigate to a user profile page in the future
    navigate('/settings');
  };

  return (
    <header className="fixed top-0 right-0 left-0 bg-white border-b border-gray-200 z-10 flex items-center justify-between h-14 px-6">
      {/* Page Title and Branding */}
      <div className="flex items-center">
        <button 
          onClick={goToChurchProfile}
          className="font-bold text-xl mr-3 focus:outline-none flex items-center"
          aria-label="Go to Church Profile"
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Congre</span>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">via</span>
          <span className="ml-1 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-1.5 py-0.5 rounded-sm font-normal">CMS</span>
        </button>
        <span className="text-gray-700 font-medium hidden md:block">|</span>
        <h2 className="text-gray-700 font-medium ml-3 hidden md:block">{getPageTitle()}</h2>
      </div>
      
      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        {/* Help */}
        <button 
          onClick={goToHelpSupport}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 focus:outline-none hidden md:block"
          aria-label="Help & Support"
        >
          <FiHelpCircle size={20} />
        </button>
        
        {/* Notifications */}
        <div className="relative">
          <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500 focus:outline-none" aria-label="Notifications">
            <FiBell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
          </button>
        </div>
        
        {/* Settings - visible on larger screens */}
        <button 
          onClick={goToSettings}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 focus:outline-none hidden md:block"
          aria-label="Settings"
        >
          <FiSettings size={20} />
        </button>
        
        {/* User menu */}
        <div className="relative ml-3">
          <button 
            onClick={() => navigate('/church-profile')}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium mr-2 shadow-sm">
              PM
            </div>
            <span className="text-sm font-medium text-gray-700 mr-1 hidden md:block">Pastor Mike</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 