import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiPhone, 
  FiCalendar, 
  FiClock,
  FiHeart,
  FiUsers,
  FiMessageSquare,
  FiHome,
  FiArrowLeft,
  FiFilter,
  FiCheck,
  FiAlertCircle,
  FiActivity,
  FiDollarSign
} from 'react-icons/fi';
import PageLayout from '../components/PageLayout';

const PastoralCare = () => {
  // Sample care needs data
  const [careNeeds, setCareNeeds] = useState([
    {
      id: 1,
      member: { id: 101, name: "Eleanor Thompson", avatar: "ET", phone: "555-123-4567" },
      category: "hospital",
      priority: "high",
      status: "pending",
      description: "In hospital for hip surgery. Would appreciate visits.",
      dateReported: "2023-07-10T09:30:00Z",
      assignedTo: { id: 1, name: "Pastor Mike", avatar: "M" },
      lastContact: "2023-07-11T14:00:00Z",
      notes: "Called family on Tuesday. Surgery scheduled for Thursday."
    },
    {
      id: 2,
      member: { id: 102, name: "Robert Johnson", avatar: "RJ", phone: "555-987-6543" },
      category: "bereavement",
      priority: "high",
      status: "in-progress",
      description: "Lost his mother last week. Funeral is on Saturday.",
      dateReported: "2023-07-08T15:45:00Z",
      assignedTo: { id: 1, name: "Pastor Mike", avatar: "M" },
      lastContact: "2023-07-12T10:30:00Z",
      notes: "Visited home on Wednesday. Family is holding up. Preparing funeral sermon."
    },
    {
      id: 3,
      member: { id: 103, name: "Maria Garcia", avatar: "MG", phone: "555-456-7890" },
      category: "spiritual",
      priority: "medium",
      status: "pending",
      description: "Requested spiritual counseling about career decisions.",
      dateReported: "2023-07-05T11:20:00Z",
      assignedTo: { id: 2, name: "Pastor Sarah", avatar: "S" },
      lastContact: null,
      notes: ""
    },
    {
      id: 4,
      member: { id: 104, name: "James Wilson", avatar: "JW", phone: "555-789-0123" },
      category: "homebound",
      priority: "medium",
      status: "in-progress",
      description: "Recovering from surgery at home. Needs communion and visits.",
      dateReported: "2023-07-01T08:15:00Z",
      assignedTo: { id: 3, name: "Pastor David", avatar: "D" },
      lastContact: "2023-07-09T16:00:00Z",
      notes: "Brought communion on Sunday. Doing well but still limited mobility."
    },
    {
      id: 5,
      member: { id: 105, name: "Susan Miller", avatar: "SM", phone: "555-234-5678" },
      category: "financial",
      priority: "medium",
      status: "completed",
      description: "Needed assistance with utility bills this month.",
      dateReported: "2023-06-28T13:40:00Z",
      assignedTo: { id: 1, name: "Pastor Mike", avatar: "M" },
      lastContact: "2023-07-03T09:45:00Z",
      notes: "Connected with benevolence committee. Bill paid directly to utility company."
    },
    {
      id: 6,
      member: { id: 106, name: "David Chen", avatar: "DC", phone: "555-345-6789" },
      category: "other",
      priority: "low",
      status: "completed",
      description: "New to the area, would like someone to show him around the church.",
      dateReported: "2023-06-25T10:10:00Z",
      assignedTo: { id: 2, name: "Pastor Sarah", avatar: "S" },
      lastContact: "2023-07-02T11:30:00Z",
      notes: "Gave tour after Sunday service. Introduced to young adults group."
    }
  ]);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all'); // all, pending, in-progress, completed
  const [priorityFilter, setPriorityFilter] = useState('all'); // all, high, medium, low
  const [categoryFilter, setCategoryFilter] = useState('all'); // all, hospital, bereavement, etc.
  
  // Get filtered care needs
  const getFilteredCareNeeds = () => {
    return careNeeds.filter(need => {
      const statusMatch = statusFilter === 'all' || need.status === statusFilter;
      const priorityMatch = priorityFilter === 'all' || need.priority === priorityFilter;
      const categoryMatch = categoryFilter === 'all' || need.category === categoryFilter;
      
      return statusMatch && priorityMatch && categoryMatch;
    });
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format time ago
  const timeAgo = (dateString) => {
    if (!dateString) return 'Never';
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return formatDate(dateString);
  };
  
  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'hospital':
        return <FiActivity size={16} />;
      case 'bereavement':
        return <FiHeart size={16} />;
      case 'spiritual':
        return <FiMessageSquare size={16} />;
      case 'homebound':
        return <FiHome size={16} />;
      case 'financial':
        return <FiDollarSign size={16} />;
      default:
        return <FiUsers size={16} />;
    }
  };
  
  // Get category label
  const getCategoryLabel = (category) => {
    switch (category) {
      case 'hospital':
        return 'Hospital';
      case 'bereavement':
        return 'Bereavement';
      case 'spiritual':
        return 'Spiritual';
      case 'homebound':
        return 'Homebound';
      case 'financial':
        return 'Financial';
      default:
        return 'Other';
    }
  };
  
  // Get care stats
  const getCareStats = () => {
    const total = careNeeds.length;
    const pending = careNeeds.filter(need => need.status === 'pending').length;
    const inProgress = careNeeds.filter(need => need.status === 'in-progress').length;
    const completed = careNeeds.filter(need => need.status === 'completed').length;
    const highPriority = careNeeds.filter(need => need.priority === 'high').length;
    
    return { total, pending, inProgress, completed, highPriority };
  };
  
  const careStats = getCareStats();
  const filteredCareNeeds = getFilteredCareNeeds();
  
  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pastoral Care</h1>
        <p className="text-gray-600 mt-1">Manage and prioritize congregational care needs</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FiUsers size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Care Needs</p>
              <h3 className="text-xl font-bold text-gray-800">{careStats.total}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
              <FiAlertCircle size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">High Priority</p>
              <h3 className="text-xl font-bold text-gray-800">{careStats.highPriority}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <FiClock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-xl font-bold text-gray-800">{careStats.pending}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <FiActivity size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <h3 className="text-xl font-bold text-gray-800">{careStats.inProgress}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FiCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <h3 className="text-xl font-bold text-gray-800">{careStats.completed}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <FiPlus className="mr-2" />
            New Care Need
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-md border border-gray-300 flex items-center">
            <FiFilter className="mr-2" />
            Filter
          </button>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="hospital">Hospital</option>
            <option value="bereavement">Bereavement</option>
            <option value="homebound">Homebound</option>
            <option value="spiritual">Spiritual</option>
            <option value="financial">Financial</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      {/* Care Needs List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCareNeeds.map((need) => (
                <tr key={need.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {need.member.avatar}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{need.member.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiPhone size={12} className="mr-1" />
                          {need.member.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="p-1 rounded-full bg-gray-100 text-gray-600 mr-2">
                        {getCategoryIcon(need.category)}
                      </span>
                      <span className="text-sm text-gray-900">{getCategoryLabel(need.category)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(need.priority)}`}>
                      {need.priority.charAt(0).toUpperCase() + need.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(need.status)}`}>
                      {need.status === 'in-progress' ? 'In Progress' : 
                       need.status.charAt(0).toUpperCase() + need.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {need.assignedTo.avatar}
                      </div>
                      <div className="ml-2 text-sm text-gray-900">{need.assignedTo.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {timeAgo(need.lastContact)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FiEdit2 size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCareNeeds.length === 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
              <FiHeart size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No care needs found</h3>
            <p className="text-gray-500">
              {statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all'
                ? "Try adjusting your filters to see more results."
                : "There are no care needs to display. Add a new care need to get started."}
            </p>
          </div>
        )}
      </div>
      
      {/* Premium Badge */}
      <div className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 text-white flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Premium Feature</h3>
          <p className="opacity-90">Pastoral Care Dashboard is a premium feature. Upgrade your plan for full access.</p>
        </div>
        <button className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-opacity-90">
          Upgrade
        </button>
      </div>
    </PageLayout>
  );
};

export default PastoralCare;
