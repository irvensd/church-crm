import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiUsers, 
  FiCalendar, 
  FiDollarSign, 
  FiMessageSquare, 
  FiTrendingUp, 
  FiPlus, 
  FiCheck,
  FiClock,
  FiHeart,
  FiArrowRight,
  FiUserPlus,
  FiTrash2,
  FiX,
  FiActivity,
  FiMail
} from 'react-icons/fi';
import { FaUserFriends } from 'react-icons/fa';
import { generateDummyMembers } from '../utils/dummyData';
import { generateDummyEvents } from '../utils/dummyEvents';
import { generateDummySmallGroups } from '../utils/dummySmallGroups';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area, CartesianGrid } from 'recharts';
import { CardSkeleton } from '../components/SkeletonLoader';
import { ThemeContext } from '../contexts/ThemeContext';

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // State for tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Prepare Sunday sermon', completed: false },
    { id: 2, text: 'Call new members', completed: true },
    { id: 3, text: 'Review budget proposal', completed: false },
    { id: 4, text: 'Plan youth retreat', completed: false },
  ]);
  
  // State for new task input
  const [newTask, setNewTask] = useState('');

  // State for showing the add task form
  const [showAddTask, setShowAddTask] = useState(false);

  // State for the attendance modal
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  // State for weekly attendance data
  const [weeklyAttendanceData, setWeeklyAttendanceData] = useState([
    { date: '2023-07-02', count: 178, service: 'Sunday Morning' },
    { date: '2023-07-02', count: 65, service: 'Sunday Evening' },
    { date: '2023-07-09', count: 182, service: 'Sunday Morning' },
    { date: '2023-07-09', count: 68, service: 'Sunday Evening' },
    { date: '2023-07-16', count: 190, service: 'Sunday Morning' },
    { date: '2023-07-16', count: 72, service: 'Sunday Evening' },
    { date: '2023-07-23', count: 186, service: 'Sunday Morning' },
    { date: '2023-07-23', count: 70, service: 'Sunday Evening' },
  ]);

  // Weekly attendance data for the chart
  const weeklyAttendanceChartData = [
    { name: 'Week 1', attendance: 178 },
    { name: 'Week 2', attendance: 182 },
    { name: 'Week 3', attendance: 190 },
    { name: 'Week 4', attendance: 186 }
  ];

  // Monthly giving data for the chart
  const monthlyGivingChartData = [
    { name: 'Jan', amount: 10200 },
    { name: 'Feb', amount: 11500 },
    { name: 'Mar', amount: 10800 },
    { name: 'Apr', amount: 11900 },
    { name: 'May', amount: 12450 }
  ];

  // Add a new state for the monthly giving modal
  const [showGivingModal, setShowGivingModal] = useState(false);

  // Add monthly giving detailed data
  const [monthlyGivingDetailData, setMonthlyGivingDetailData] = useState([
    { date: '2023-01-01', amount: 10200, category: 'Tithes' },
    { date: '2023-01-01', amount: 2500, category: 'Missions' },
    { date: '2023-02-01', amount: 11500, category: 'Tithes' },
    { date: '2023-02-01', amount: 2800, category: 'Missions' },
    { date: '2023-03-01', amount: 10800, category: 'Tithes' },
    { date: '2023-03-01', amount: 3100, category: 'Missions' },
    { date: '2023-04-01', amount: 11900, category: 'Tithes' },
    { date: '2023-04-01', amount: 3400, category: 'Missions' },
    { date: '2023-05-01', amount: 12450, category: 'Tithes' },
    { date: '2023-05-01', amount: 3700, category: 'Missions' },
  ]);

  // Add a function to generate recent activities
  const generateRecentActivities = (count = 10) => {
    const users = [
      { name: 'Pastor Johnson', avatar: 'PJ', role: 'Pastor' },
      { name: 'Sarah Miller', avatar: 'SM', role: 'Admin' },
      { name: 'David Wilson', avatar: 'DW', role: 'Financial Officer' },
      { name: 'Emily Parker', avatar: 'EP', role: 'Member Coordinator' },
      { name: 'Michael Brown', avatar: 'MB', role: 'Events Manager' }
    ];

    const actionTypes = [
      { type: 'member', actions: ['added a new member', 'updated member details', 'archived a member'] },
      { type: 'event', actions: ['created a new event', 'updated event details', 'canceled an event'] },
      { type: 'financial', actions: ['processed donations', 'created a financial report', 'updated budget'] },
      { type: 'message', actions: ['sent a group message', 'created an announcement', 'updated communication settings'] }
    ];

    const activities = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];
      const action = actionType.actions[Math.floor(Math.random() * actionType.actions.length)];
      
      // Random time within the last 7 days
      const timeOffset = Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000);
      const timestamp = new Date(now.getTime() - timeOffset);
      
      activities.push({
        id: i + 1,
        user: user.name,
        avatar: user.avatar,
        role: user.role,
        action: action,
        type: actionType.type,
        timestamp: timestamp
      });
    }
    
    // Sort by timestamp (newest first)
    return activities.sort((a, b) => b.timestamp - a.timestamp);
  };

  // Add state for recent activities
  const [recentActivities, setRecentActivities] = useState([]);

  // Update the useEffect to load recent activities
  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setMembers(generateDummyMembers());
      setEvents(generateDummyEvents());
      setGroups(generateDummySmallGroups());
      setRecentActivities(generateRecentActivities(10));
      setIsLoading(false);
    }, 1000);
  }, []);

  // Format timestamp for recent activities
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
      default:
        return <FiActivity className="text-gray-500" />;
    }
  };

  // Get current date for the welcome message
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  
  // Sample data for stats
  const stats = [
    { 
      id: 1, 
      title: 'Total Members', 
      value: '248', 
      change: '+12% from last month', 
      icon: <FiUsers size={20} className="text-white" />, 
      color: 'bg-blue-500',
      trend: 'up',
      path: '/members'
    },
    { 
      id: 2, 
      title: 'Weekly Attendance', 
      value: '186', 
      change: '+5% from last week', 
      icon: <FiCheck size={20} className="text-white" />, 
      color: 'bg-green-500',
      trend: 'up'
    },
    { 
      id: 3, 
      title: 'Giving', 
      value: '$12,450', 
      change: '+8% from last month', 
      icon: <FiDollarSign size={20} className="text-white" />, 
      color: 'bg-yellow-500',
      trend: 'up'
    },
    { 
      id: 4, 
      title: 'Small Groups', 
      value: '24', 
      change: '+2 from last month', 
      icon: <FaUserFriends size={20} className="text-white" />, 
      color: 'bg-purple-500',
      trend: 'up',
      path: '/small-groups'
    }
  ];
  
  // Sample data for upcoming events
  const upcomingEvents = [
    { 
      id: 1, 
      title: 'Sunday Service', 
      date: 'Sunday, 10:00 AM', 
      location: 'Main Sanctuary',
      attendees: 180
    },
    { 
      id: 2, 
      title: 'Youth Group Meeting', 
      date: 'Wednesday, 6:30 PM', 
      location: 'Youth Center',
      attendees: 45
    },
    { 
      id: 3, 
      title: 'Prayer Breakfast', 
      date: 'Saturday, 8:00 AM', 
      location: 'Fellowship Hall',
      attendees: 28
    }
  ];
  
  // Sample data for giving overview
  const givingData = [
    { month: 'Jan', amount: 18500 },
    { month: 'Feb', amount: 20200 },
    { month: 'Mar', amount: 19800 },
    { month: 'Apr', amount: 22400 },
    { month: 'May', amount: 24500 }
  ];
  
  // Sample data for attendance
  const attendanceData = [
    { week: 'Week 1', count: 175 },
    { week: 'Week 2', count: 168 },
    { week: 'Week 3', count: 182 },
    { week: 'Week 4', count: 186 }
  ];

  // Get upcoming events (next 7 days)
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate >= today && eventDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      .slice(0, 5);
  };

  // Format date for display
  const formatEventDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatEventTime = (dateString) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Get recent members (joined in last 30 days)
  const getRecentMembers = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return members
      .filter(member => new Date(member.joinDate) >= thirtyDaysAgo)
      .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
      .slice(0, 5);
  };

  // Navigate to Messages page
  const handleSendMessageClick = () => {
    navigate('/messages');
  };

  // Handle task completion toggle
  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  // Handle task deletion
  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  // Handle adding a new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false
    };
    
    setTasks(prevTasks => [...prevTasks, newTaskObj]);
    setNewTask('');
    setShowAddTask(false);
  };
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboardTasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('dashboardTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Function to handle opening the attendance modal
  const handleViewAttendance = () => {
    setShowAttendanceModal(true);
  };

  // Function to handle opening the giving modal
  const handleViewGiving = () => {
    setShowGivingModal(true);
  };

  // Add state for the church health modal
  const [showHealthModal, setShowHealthModal] = useState(false);

  // Add church health metrics data
  const [churchHealthMetrics, setChurchHealthMetrics] = useState({
    attendanceGrowth: 75,
    givingTarget: 82,
    memberEngagement: 68,
    newVisitorRetention: 62,
    volunteerParticipation: 58,
    discipleshipProgress: 71
  });

  // Add church health trend data
  const [churchHealthTrends, setChurchHealthTrends] = useState([
    { month: 'Jan', attendance: 165, giving: 9800, engagement: 60 },
    { month: 'Feb', attendance: 170, giving: 10200, engagement: 62 },
    { month: 'Mar', attendance: 175, giving: 10500, engagement: 64 },
    { month: 'Apr', attendance: 172, giving: 10800, engagement: 65 },
    { month: 'May', attendance: 178, giving: 11200, engagement: 66 },
    { month: 'Jun', attendance: 186, giving: 12450, engagement: 68 }
  ]);

  // Function to handle opening the church health modal
  const handleViewChurchHealth = () => {
    setShowHealthModal(true);
  };

  // Add this to the state variables at the top of the component
  const [userName, setUserName] = useState('Pastor Johnson');

  // Announcements data
  const [announcements, setAnnouncements] = useState([
    { 
      id: 1, 
      title: 'Sunday Service Time Change', 
      content: 'Starting next week, our Sunday service will begin at 10:00 AM instead of 9:30 AM.',
      date: new Date(2023, 5, 15),
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'Volunteer Appreciation Dinner', 
      content: 'Join us for a special dinner to honor our volunteers on Friday, June 24th at 6:30 PM.',
      date: new Date(2023, 5, 10),
      priority: 'medium'
    },
    { 
      id: 3, 
      title: 'New Small Group Starting', 
      content: 'A new small group focused on young families will begin meeting on Wednesday evenings.',
      date: new Date(2023, 5, 5),
      priority: 'low'
    },
  ]);

  // Quick actions data
  const quickActions = [
    { id: 1, name: 'Add Member', icon: <FiUserPlus size={20} /> },
    { id: 2, name: 'Create Event', icon: <FiCalendar size={20} /> },
    { id: 3, name: 'Record Giving', icon: <FiDollarSign size={20} /> },
    { id: 4, name: 'Send Message', icon: <FiMail size={20} /> },
  ];

  // App version and last updated info
  const appVersion = '1.2.3';
  const lastUpdated = new Date(2023, 4, 20);

  // Format date function
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Handle quick action click
  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 1:
        navigate('/members');
        break;
      case 2:
        navigate('/events');
        break;
      case 3:
        navigate('/financial');
        break;
      case 4:
        navigate('/messages');
        break;
      default:
        break;
    }
  };

  // Handle announcement action click
  const handleAnnouncementAction = (announcementId) => {
    navigate(`/announcements/${announcementId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {userName}! Here's what's happening with your church.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                <p className={`text-sm text-${stat.trend === 'up' ? 'green' : 'red'}-600 dark:text-${stat.trend === 'up' ? 'green-400' : 'red-400'}`}>
                  {stat.change}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link to={stat.path} className={`text-sm text-${stat.trend === 'up' ? 'blue' : 'gray'}-600 dark:text-${stat.trend === 'up' ? 'blue-400' : 'gray-400'} hover:underline`}>View Details →</Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleQuickAction(action.id)}
            className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-600 dark:bg-indigo-700 text-white flex items-center justify-center mb-3">
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{action.name}</span>
          </button>
        ))}
      </div>
      
      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Attendance & Giving Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Attendance Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Weekly Attendance</h3>
                <button 
                  onClick={handleViewAttendance}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  View Details
                </button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAttendanceChartData}>
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                        borderColor: darkMode ? '#374151' : '#E5E7EB',
                        color: darkMode ? '#F3F4F6' : '#111827'
                      }} 
                    />
                    <Bar dataKey="attendance" fill={darkMode ? "#6366F1" : "#4F46E5"} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Monthly Giving Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Monthly Giving</h3>
                <button 
                  onClick={handleViewGiving}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  View Details
                </button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyGivingChartData}>
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Amount']} 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                        borderColor: darkMode ? '#374151' : '#E5E7EB',
                        color: darkMode ? '#F3F4F6' : '#111827'
                      }}
                    />
                    <Line type="monotone" dataKey="amount" stroke={darkMode ? "#34D399" : "#10B981"} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-100">Upcoming Events</h3>
              <button 
                onClick={() => navigate('/events')}
                className="text-blue-500 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {getUpcomingEvents().map((event) => (
                <div key={event.id} className="flex items-start border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                  <div className={`${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-blue-100 text-blue-600'} p-3 rounded-lg mr-4`}>
                    <FiCalendar size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 dark:text-gray-100">{event.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <FiClock className="mr-1" size={14} />
                      <span>{formatEventDate(event.startDate)} • {formatEventTime(event.startDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm text-gray-600 dark:text-gray-300">
                    <FiUsers size={14} className="mr-1" />
                    <span>{event.attendees}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - 1/3 width */}
        <div className="space-y-8">
          {/* Tasks */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-100">Tasks</h3>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                  {tasks.filter(task => task.completed).length}/{tasks.length} completed
                </span>
                <button 
                  onClick={() => setShowAddTask(!showAddTask)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                >
                  <FiPlus size={18} />
                </button>
              </div>
            </div>
            
            {/* Task List */}
            <div className="space-y-2">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    task.completed 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30' 
                      : 'bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`flex-shrink-0 h-5 w-5 rounded border ${
                        task.completed 
                          ? 'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      } mr-3 flex items-center justify-center`}
                    >
                      {task.completed && <FiCheck size={14} className="text-white" />}
                    </button>
                    <span className={`text-sm ${
                      task.completed 
                        ? 'text-green-800 dark:text-green-300 line-through' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Add Task Form */}
            {showAddTask && (
              <form onSubmit={addTask} className="mt-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800 text-white p-2 rounded-r-md transition-colors"
                  >
                    Add
                  </button>
                </div>
              </form>
            )}
          </div>
          
          {/* Recent Members */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-100">Recent Members</h3>
              <button 
                onClick={() => navigate('/members')}
                className="text-blue-500 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {getRecentMembers().map((member) => (
                <div key={member.id} className="flex items-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-10 w-10 rounded-full mr-3 object-cover border-2 border-white dark:border-gray-700"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">{member.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.email}</p>
                  </div>
                  <button
                    onClick={handleSendMessageClick}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                  >
                    <FiMessageSquare size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Church Health */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-100">Church Health</h3>
              <button 
                onClick={handleViewChurchHealth}
                className="text-blue-500 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                View Details
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-1/3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Attendance Growth</div>
                  <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">+12%</div>
                </div>
                <div className="w-1/3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Giving</div>
                  <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">+8%</div>
                </div>
                <div className="w-1/3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Engagement</div>
                  <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">+15%</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Overall Health Score</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">85%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 dark:bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Announcements */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-100">Announcements</h3>
              <button 
                onClick={() => navigate('/announcements')}
                className="text-blue-500 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {announcements.slice(0, 3).map((announcement) => (
                <div key={announcement.id} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">{announcement.title}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(announcement.date)}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{announcement.content}</p>
                  <div className="flex items-center text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      announcement.priority === 'high' 
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300' 
                        : announcement.priority === 'medium'
                        ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                        : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                    }`}>
                      {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                    </span>
                    <button 
                      onClick={() => handleAnnouncementAction(announcement.id)}
                      className="ml-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Congrevia Church Management System. All rights reserved.</p>
        <p className="mt-1">Version {appVersion} | Last updated: {formatDate(lastUpdated)}</p>
      </div>

      {/* Attendance Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full p-6 mx-4">
            <button 
              onClick={() => setShowAttendanceModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <FiX size={24} />
            </button>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Weekly Attendance Details</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Attendance records for the past 4 weeks</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-300">Date</th>
                    <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-300">Service</th>
                    <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-300">Attendance</th>
                    <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-300">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyAttendanceData.map((record, index) => {
                    // Calculate change from previous week's same service
                    const prevWeekSameService = weeklyAttendanceData.find(
                      (item, i) => 
                        i < index && 
                        item.service === record.service && 
                        new Date(item.date).getDay() === new Date(record.date).getDay()
                    );
                    
                    const change = prevWeekSameService 
                      ? ((record.count - prevWeekSameService.count) / prevWeekSameService.count * 100).toFixed(1)
                      : null;
                      
                    return (
                      <tr key={`${record.date}-${record.service}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-3 px-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-300">
                          {new Date(record.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </td>
                        <td className="py-3 px-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-300">{record.service}</td>
                        <td className="py-3 px-4 border-b dark:border-gray-700 font-medium text-gray-800 dark:text-gray-300">{record.count}</td>
                        <td className="py-3 px-4 border-b dark:border-gray-700">
                          {change && (
                            <span className={`${parseFloat(change) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {parseFloat(change) >= 0 ? '+' : ''}{change}%
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => setShowAttendanceModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Close
              </button>
              <button 
                onClick={() => navigate('/ministry-analytics')}
                className="px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-800"
              >
                View Full Analytics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Giving Modal */}
      {showGivingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full p-6 mx-4">
            <button 
              onClick={() => setShowGivingModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <FiX size={24} />
            </button>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Monthly Giving Details</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Giving records for the past 5 months</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-300">Month</th>
                    <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-300">Category</th>
                    <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-300">Amount</th>
                    <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-300">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyGivingDetailData.map((record, index) => {
                    // Calculate change from previous month's same category
                    const prevMonthSameCategory = monthlyGivingDetailData.find(
                      (item, i) => 
                        i < index && 
                        item.category === record.category && 
                        new Date(item.date).getMonth() === new Date(record.date).getMonth() - 1
                    );
                    
                    const change = prevMonthSameCategory 
                      ? ((record.amount - prevMonthSameCategory.amount) / prevMonthSameCategory.amount * 100).toFixed(1)
                      : null;
                      
                    return (
                      <tr key={`${record.date}-${record.category}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-3 px-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-300">
                          {new Date(record.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </td>
                        <td className="py-3 px-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-300">{record.category}</td>
                        <td className="py-3 px-4 border-b dark:border-gray-700 font-medium text-gray-800 dark:text-gray-300">${record.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 border-b dark:border-gray-700">
                          {change && (
                            <span className={`${parseFloat(change) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {parseFloat(change) >= 0 ? '+' : ''}{change}%
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => setShowGivingModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Close
              </button>
              <button 
                onClick={() => navigate('/financial')}
                className="px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-800"
              >
                View Financial Reports
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Church Health Modal */}
      {showHealthModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full p-6 mx-4">
            <button 
              onClick={() => setShowHealthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <FiX size={24} />
            </button>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Church Health Assessment</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive view of your church's health metrics</p>
            </div>
            
            {/* Health Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(churchHealthMetrics).map(([key, value]) => {
                // Determine color based on value
                let color = 'bg-red-500';
                if (value >= 80) color = 'bg-green-500';
                else if (value >= 60) color = 'bg-blue-500';
                else if (value >= 40) color = 'bg-yellow-500';
                
                // Format key for display
                const formattedKey = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase());
                
                return (
                  <div key={key} className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">{formattedKey}</h4>
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-gray-100 dark:border-gray-600 mr-4">
                        <span className="text-xl font-bold text-gray-800 dark:text-gray-200">{value}%</span>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-1">
                          <div className={`${color} h-3 rounded-full`} style={{ width: `${value}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Trends Charts */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">6-Month Trends</h4>
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={churchHealthTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis dataKey="month" stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                      <YAxis yAxisId="left" orientation="left" stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                      <YAxis yAxisId="right" orientation="right" stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                          borderColor: darkMode ? '#374151' : '#E5E7EB',
                          color: darkMode ? '#F3F4F6' : '#111827'
                        }} 
                      />
                      <Legend wrapperStyle={{ color: darkMode ? '#F3F4F6' : '#111827' }} />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="attendance" 
                        stroke="#4F46E5" 
                        strokeWidth={2}
                        name="Attendance"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="giving" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        name="Giving ($)"
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        name="Engagement (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Attendance Breakdown */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">Attendance Breakdown</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Adults', value: 120 },
                          { name: 'Youth', value: 35 },
                          { name: 'Children', value: 31 }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#4F46E5" />
                        <Cell fill="#10B981" />
                        <Cell fill="#F59E0B" />
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                          borderColor: darkMode ? '#374151' : '#E5E7EB',
                          color: darkMode ? '#F3F4F6' : '#111827'
                        }} 
                        formatter={(value) => [`${value} people`, 'Attendance']} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Member Engagement */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">Member Engagement</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Worship', value: 85 },
                        { name: 'Small Groups', value: 62 },
                        { name: 'Volunteering', value: 58 },
                        { name: 'Events', value: 70 },
                        { name: 'Giving', value: 65 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis dataKey="name" stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                      <YAxis domain={[0, 100]} stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                          borderColor: darkMode ? '#374151' : '#E5E7EB',
                          color: darkMode ? '#F3F4F6' : '#111827'
                        }} 
                        formatter={(value) => [`${value}%`, 'Participation']} 
                      />
                      <Bar dataKey="value" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => setShowHealthModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Close
              </button>
              <button 
                onClick={() => navigate('/church-health-assessment')}
                className="px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-800"
              >
                View Full Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 