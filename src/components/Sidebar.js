import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiGrid, 
  FiCalendar, 
  FiMessageSquare, 
  FiUsers, 
  FiCalendar as FiEvent, 
  FiUserPlus,
  FiDollarSign,
  FiSettings,
  FiUser,
  FiHelpCircle,
  FiLifeBuoy,
  FiChevronLeft,
  FiChevronRight,
  FiServer,
  FiLink,
  FiDatabase,
  FiHome,
  FiBook,
  FiClipboard,
  FiBookOpen,
  FiHeart,
  FiTrendingUp,
  FiChevronDown,
  FiAward,
  FiStar,
  FiBarChart2
} from 'react-icons/fi';
import { FaUserFriends, FaChurch } from 'react-icons/fa';

const Sidebar = ({ onToggle, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [pastoralOpen, setPastoralOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    if (onToggle) {
      onToggle(collapsed);
    }
  }, [collapsed, onToggle]);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    if (onToggle) {
      onToggle(newCollapsedState);
    }
  };

  const toggleSupport = () => {
    setSupportOpen(!supportOpen);
  };
  
  const togglePastoral = () => {
    setPastoralOpen(!pastoralOpen);
  };
  
  const toggleAnalytics = () => {
    setAnalyticsOpen(!analyticsOpen);
  };

  // Dashboard section
  const dashboardItems = [
    { path: '/dashboard', icon: <FiHome size={18} />, label: 'Dashboard' },
    { path: '/why-congrevia', icon: <FiStar size={18} />, label: 'Why Congrevia' },
  ];

  // People management section
  const peopleItems = [
    { path: '/members', icon: <FiUsers size={18} />, label: 'Members' },
    { path: '/small-groups', icon: <FaUserFriends size={18} />, label: 'Small Groups' },
  ];

  // Activities section
  const activitiesItems = [
    { path: '/events', icon: <FiEvent size={18} />, label: 'Events' },
    { path: '/calendar', icon: <FiCalendar size={18} />, label: 'Calendar' },
  ];

  // Communication section
  const communicationItems = [
    { path: '/messages', icon: <FiMessageSquare size={18} />, label: 'Messages' },
  ];

  // Administration section
  const administrationItems = [
    { path: '/financial', icon: <FiDollarSign size={18} />, label: 'Financial' },
    { path: '/church-profile', icon: <FaChurch size={18} />, label: 'Church Profile' },
    { path: '/settings', icon: <FiSettings size={18} />, label: 'Settings' },
  ];

  // Analytics section items
  const analyticsItems = [
    { path: '/ministry-analytics', icon: <FiTrendingUp size={18} />, label: 'Ministry Analytics', badge: <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800">PRO</span> },
    { 
      path: '/church-health-assessment', 
      icon: <FiBarChart2 size={18} />, 
      label: 'Church Health',
      badge: <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800">PRO</span>
    },
  ];

  // Support items
  const supportItems = [
    { path: '/help-support', icon: <FiHelpCircle size={18} />, label: 'Help & Support' },
    { path: '/system-status', icon: <FiServer size={18} />, label: 'System Status' },
    { path: '/integrations', icon: <FiLink size={18} />, label: 'Integrations' },
    { path: '/backup-recovery', icon: <FiDatabase size={18} />, label: 'Backup & Recovery' },
  ];

  // Pastoral Tools section (Premium)
  const pastoralItems = [
    { path: '/sermon-collaboration', icon: <FiBookOpen size={18} />, label: 'Sermon Collaboration' },
    { path: '/pastoral-care', icon: <FiHeart size={18} />, label: 'Pastoral Care' },
  ];

  // Render a section with its items
  const renderSection = (title, items) => (
    <div className="px-4 py-2 mt-4">
      {!collapsed && <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>}
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive(item.path) 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'hover:bg-gray-100 text-gray-700'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
              {!collapsed && (
                <>
                  <span>{item.label}</span>
                  {item.badge && item.badge}
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  // Render the support section with dropdown
  const renderSupportSection = () => (
    <div className="px-4 py-2 mt-4">
      {!collapsed && <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">SUPPORT</h3>}
      <div className="mt-2">
        <button 
          onClick={toggleSupport}
          className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${collapsed ? 'justify-center' : ''}`}
        >
          <span className={collapsed ? '' : 'mr-3'}><FiLifeBuoy size={18} /></span>
          {!collapsed && (
            <>
              <span>Support</span>
              <FiChevronDown 
                className={`ml-auto transition-transform duration-200 ${supportOpen ? 'transform rotate-180' : ''}`} 
                size={16} 
              />
            </>
          )}
        </button>
        
        {(supportOpen || collapsed) && (
          <ul className={`mt-1 space-y-1 ${collapsed ? '' : 'pl-7'}`}>
            {supportItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.path) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-700'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
  
  // Render the pastoral tools section with dropdown
  const renderPastoralSection = () => (
    <div className="px-4 py-2 mt-4">
      {!collapsed && <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">PASTORAL TOOLS</h3>}
      <div className="mt-2">
        <button 
          onClick={togglePastoral}
          className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${collapsed ? 'justify-center' : ''}`}
        >
          <span className={collapsed ? '' : 'mr-3'}><FiAward size={18} /></span>
          {!collapsed && (
            <>
              <span>Pastoral Tools</span>
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white">PRO</span>
              <FiChevronDown 
                className={`ml-auto transition-transform duration-200 ${pastoralOpen ? 'transform rotate-180' : ''}`} 
                size={16} 
              />
            </>
          )}
        </button>
        
        {(pastoralOpen || collapsed) && (
          <ul className={`mt-1 space-y-1 ${collapsed ? '' : 'pl-7'}`}>
            {pastoralItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.path) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-700'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  // Render the analytics section with dropdown
  const renderAnalyticsSection = () => (
    <div className="px-4 py-2 mt-4">
      {!collapsed && <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ANALYTICS</h3>}
      <div className="mt-2">
        <button 
          onClick={toggleAnalytics}
          className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 ${collapsed ? 'justify-center' : ''}`}
        >
          <span className={collapsed ? '' : 'mr-3'}><FiBarChart2 size={18} /></span>
          {!collapsed && (
            <>
              <span>Analytics</span>
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white">PRO</span>
              <FiChevronDown 
                className={`ml-auto transition-transform duration-200 ${analyticsOpen ? 'transform rotate-180' : ''}`} 
                size={16} 
              />
            </>
          )}
        </button>
        
        {(analyticsOpen || collapsed) && (
          <ul className={`mt-1 space-y-1 ${collapsed ? '' : 'pl-7'}`}>
            {analyticsItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.path) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-700'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span>{item.label}</span>
                      {item.badge}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white h-full border-r border-gray-200">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <Link to="/" className="font-bold text-xl flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Congre</span>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">via</span>
            <span className="ml-1 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-1.5 py-0.5 rounded-sm font-normal">CMS</span>
          </Link>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 focus:outline-none"
        >
          {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </button>
      </div>
      
      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto h-[calc(100vh-65px)]">
        {renderSection("DASHBOARD", dashboardItems)}
        {renderSection("PEOPLE", peopleItems)}
        {renderSection("ACTIVITIES", activitiesItems)}
        {renderSection("COMMUNICATION", communicationItems)}
        {renderSection("ADMINISTRATION", administrationItems)}
        {renderAnalyticsSection()}
        {renderPastoralSection()}
        {renderSupportSection()}
      </div>
    </div>
  );
};

export default Sidebar; 