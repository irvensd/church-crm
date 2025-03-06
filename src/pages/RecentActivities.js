import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiFilter, 
  FiCalendar, 
  FiClock,
  FiUser,
  FiUsers,
  FiEdit,
  FiDollarSign,
  FiMessageSquare,
  FiPlus,
  FiTrash2,
  FiRefreshCw,
  FiSettings
} from 'react-icons/fi';

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, members, events, financial, messages
  const [timeRange, setTimeRange] = useState('7days'); // 24hours, 7days, 30days, all

  // Generate more comprehensive activity data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyActivities = generateDummyActivities(50);
      setActivities(dummyActivities);
      setLoading(false);
    }, 800);
  }, []);

  // Generate dummy activities
  const generateDummyActivities = (count) => {
    const users = [
      { name: 'Pastor Johnson', avatar: 'PJ', role: 'Pastor' },
      { name: 'Sarah Miller', avatar: 'SM', role: 'Admin' },
      { name: 'David Wilson', avatar: 'DW', role: 'Financial Officer' },
      { name: 'Emily Parker', avatar: 'EP', role: 'Member Coordinator' },
      { name: 'Michael Brown', avatar: 'MB', role: 'Events Manager' },
      { name: 'Jessica Taylor', avatar: 'JT', role: 'Communications Director' }
    ];

    const actionTypes = [
      { type: 'member', actions: ['added a new member', 'updated member details', 'archived a member', 'restored a member', 'added member notes'] },
      { type: 'event', actions: ['created a new event', 'updated event details', 'canceled an event', 'rescheduled an event', 'added event attendees'] },
      { type: 'financial', actions: ['processed donations', 'created a financial report', 'updated budget', 'recorded expenses', 'reconciled accounts'] },
      { type: 'message', actions: ['sent a group message', 'created an announcement', 'updated communication settings', 'sent email campaign', 'created a newsletter'] },
      { type: 'system', actions: ['changed system settings', 'performed backup', 'updated church profile', 'modified user permissions', 'installed integration'] }
    ];

    const activities = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];
      const action = actionType.actions[Math.floor(Math.random() * actionType.actions.length)];
      
      // Random time within the last 30 days
      const timeOffset = Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000);
      const timestamp = new Date(now.getTime() - timeOffset);
      
      activities.push({
        id: i + 1,
        user: user.name,
        avatar: user.avatar,
        role: user.role,
        action: action,
        type: actionType.type,
        timestamp: timestamp,
        details: `Details for activity ${i + 1}`
      });
    }
    
    // Sort by timestamp (newest first)
    return activities.sort((a, b) => b.timestamp - a.timestamp);
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    
    // Less than a minute
    if (diff < 60 * 1000) {
      return 'Just now';
    }
    
    // Less than an hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }
    
    // Less than a day
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // Less than a week
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
    
    // Format as date
    return timestamp.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  // Filter activities
  const getFilteredActivities = () => {
    let filtered = [...activities];
    
    // Filter by type
    if (filter !== 'all') {
      filtered = filtered.filter(activity => activity.type === filter);
    }
    
    // Filter by time range
    const now = new Date();
    if (timeRange === '24hours') {
      filtered = filtered.filter(activity => 
        (now - activity.timestamp) < 24 * 60 * 60 * 1000
      );
    } else if (timeRange === '7days') {
      filtered = filtered.filter(activity => 
        (now - activity.timestamp) < 7 * 24 * 60 * 60 * 1000
      );
    } else if (timeRange === '30days') {
      filtered = filtered.filter(activity => 
        (now - activity.timestamp) < 30 * 24 * 60 * 60 * 1000
      );
    }
    
    return filtered;
  };

  // Get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'member':
        return <FiUsers className="text-blue-500" />;
      case 'event':
        return <FiCalendar className="text-green-500" />;
      case 'financial':
        return <FiDollarSign className="text-yellow-500" />;
      case 'message':
        return <FiMessageSquare className="text-purple-500" />;
      case 'system':
        return <FiSettings className="text-gray-500" />;
      default:
        return <FiRefreshCw className="text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link to="/dashboard" className="mr-4 text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Recent Activities</h1>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="flex items-center">
              <FiFilter className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-600 mr-2">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === 'all' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('member')}
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === 'member' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Members
              </button>
              <button 
                onClick={() => setFilter('event')}
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === 'event' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Events
              </button>
              <button 
                onClick={() => setFilter('financial')}
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === 'financial' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Financial
              </button>
              <button 
                onClick={() => setFilter('message')}
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === 'message' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Messages
              </button>
              <button 
                onClick={() => setFilter('system')}
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === 'system' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                System
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <FiClock className="text-gray-500 mr-2" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="24hours">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Activities List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mb-4"></div>
            <p className="text-gray-600">Loading activities...</p>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {getFilteredActivities().map((activity) => (
                <li key={activity.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                        {activity.avatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.user} <span className="text-xs text-gray-500">({activity.role})</span>
                        </p>
                        <p className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</p>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <span className="mr-2">{getActivityIcon(activity.type)}</span>
                        {activity.action}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {getFilteredActivities().length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-600">No activities found for the selected filters.</p>
                <button 
                  onClick={() => {setFilter('all'); setTimeRange('all');}}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecentActivities; 