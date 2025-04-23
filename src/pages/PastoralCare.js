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
  FiDollarSign,
  FiSearch,
  FiPrinter
} from 'react-icons/fi';
import PageLayout from '../components/PageLayout';
import PastoralCareModal from '../components/PastoralCareModal';

const PastoralCare = () => {
  const [activeTab, setActiveTab] = useState('visitation');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
  
  // Add new state for prayer requests
  const [prayerRequests, setPrayerRequests] = useState([
    {
      id: 1,
      member: { id: 107, name: "Sarah Johnson", avatar: "SJ" },
      request: "Healing for my mother's cancer",
      isPrivate: true,
      status: "active",
      dateSubmitted: "2024-03-10T08:00:00Z",
      updates: [
        { date: "2024-03-12T10:00:00Z", note: "Started new treatment" }
      ]
    }
  ]);

  // Add new state for counseling sessions
  const [counselingSessions, setCounselingSessions] = useState([
    {
      id: 1,
      member: { id: 108, name: "Michael Brown", avatar: "MB" },
      type: "Marriage",
      nextSession: "2024-03-15T14:00:00Z",
      status: "ongoing",
      notes: "Working on communication issues",
      history: [
        { date: "2024-03-01T14:00:00Z", notes: "Initial session" }
      ]
    }
  ]);

  // Add new state for visitation schedule
  const [visitationSchedule, setVisitationSchedule] = useState([
    {
      id: 1,
      member: { id: 109, name: "Elizabeth White", avatar: "EW" },
      type: "Hospital",
      date: "2024-03-14T10:00:00Z",
      location: "Memorial Hospital, Room 302",
      status: "scheduled",
      notes: "Pre-surgery visit"
    }
  ]);

  // Add new state for care teams
  const [careTeams, setCareTeams] = useState([
    {
      id: 1,
      name: 'Hospital Visitation Team',
      leader: 'Deacon John',
      members: ['Sarah B.', 'Michael R.', 'Rachel T.'],
      assignments: [
        { memberName: 'Sarah Johnson', date: '2024-03-25' }
      ]
    },
    {
      id: 2,
      name: 'Prayer Warriors',
      leader: 'Elder Mary',
      members: ['David L.', 'Susan M.', 'James P.'],
      assignments: [
        { memberName: 'David Thompson', date: '2024-03-22' }
      ]
    }
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalMode, setModalMode] = useState('add');

  // Handle add new item
  const handleAddNew = (type) => {
    setModalType(type);
    setModalMode('add');
    setSelectedItem(null);
    setShowModal(true);
  };

  // Handle edit item
  const handleEdit = (type, item) => {
    setModalType(type);
    setModalMode('edit');
    setSelectedItem(item);
    setShowModal(true);
  };

  // Handle delete item
  const handleDelete = (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (type) {
        case 'visitation':
          setVisitationSchedule(prev => prev.filter(item => item.id !== id));
          break;
        case 'prayer':
          setPrayerRequests(prev => prev.filter(item => item.id !== id));
          break;
        case 'counseling':
          setCounselingSessions(prev => prev.filter(item => item.id !== id));
          break;
        case 'teams':
          setCareTeams(prev => prev.filter(item => item.id !== id));
          break;
        default:
          break;
      }
    }
  };

  // Handle form submission
  const handleSubmit = (formData) => {
    const newId = Date.now(); // Simple ID generation
    
    switch (modalType) {
      case 'visitation':
        if (modalMode === 'edit') {
          setVisitationSchedule(prev => prev.map(item => 
            item.id === selectedItem.id ? { ...formData, id: item.id } : item
          ));
        } else {
          setVisitationSchedule(prev => [...prev, { ...formData, id: newId }]);
        }
        break;
        
      case 'prayer':
        if (modalMode === 'edit') {
          setPrayerRequests(prev => prev.map(item =>
            item.id === selectedItem.id ? { ...formData, id: item.id } : item
          ));
        } else {
          setPrayerRequests(prev => [...prev, { ...formData, id: newId }]);
        }
        break;
        
      case 'counseling':
        if (modalMode === 'edit') {
          setCounselingSessions(prev => prev.map(item =>
            item.id === selectedItem.id ? { ...formData, id: item.id } : item
          ));
        } else {
          setCounselingSessions(prev => [...prev, { ...formData, id: newId }]);
        }
        break;
        
      case 'teams':
        if (modalMode === 'edit') {
          setCareTeams(prev => prev.map(item =>
            item.id === selectedItem.id ? { ...formData, id: item.id } : item
          ));
        } else {
          setCareTeams(prev => [...prev, { ...formData, id: newId }]);
        }
        break;
        
      default:
        break;
    }
    
    setShowModal(false);
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Add new component for Prayer Requests
  const renderPrayerRequests = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="Health">Health</option>
            <option value="Family">Family</option>
            <option value="Spiritual">Spiritual</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          onClick={() => handleAddNew('prayer')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FiPlus className="mr-2" />
          New Request
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {prayerRequests.map((request) => (
            <li key={request.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <FiHeart className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-900">{request.memberName}</h4>
                        {request.isConfidential && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Confidential
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{request.request}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {request.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEdit('prayer', request)}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete('prayer', request.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                {request.updates && request.updates.length > 0 && (
                  <div className="mt-2">
                    <h5 className="text-sm font-medium text-gray-700">Updates:</h5>
                    <ul className="mt-1 space-y-1">
                      {request.updates.map((update, index) => (
                        <li key={index} className="text-sm text-gray-500">
                          {update.date}: {update.note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Add new component for Counseling Sessions
  const renderCounselingSessions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search sessions..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Types</option>
            <option value="Marriage">Marriage</option>
            <option value="Personal">Personal</option>
            <option value="Family">Family</option>
            <option value="Grief">Grief</option>
          </select>
        </div>
        <button
          onClick={() => handleAddNew('counseling')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FiPlus className="mr-2" />
          New Session
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {counselingSessions.map((session) => (
            <li key={session.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FiMessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">{session.memberName}</h4>
                      <p className="text-sm text-gray-500">{session.counselingType} Counseling - {session.nextSession}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      session.status === 'completed' ? 'bg-green-100 text-green-800' :
                      session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {session.status}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEdit('counseling', session)}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete('counseling', session.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Notes:</span> {session.notes}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Add new component for Visitation Schedule
  const renderVisitationSchedule = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search visits..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleAddNew('visitation')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FiPlus className="mr-2" />
            New Visit
          </button>
          <button 
            onClick={handlePrint}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <FiPrinter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {visitationSchedule.map((visit) => (
            <li key={visit.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                      visit.priority === 'high' ? 'bg-red-100' :
                      visit.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <FiCalendar className={`h-5 w-5 ${
                        visit.priority === 'high' ? 'text-red-600' :
                        visit.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">{visit.member.name}</h4>
                      <p className="text-sm text-gray-500">{visit.type} Visit - {visit.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      visit.status === 'completed' ? 'bg-green-100 text-green-800' :
                      visit.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {visit.status}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEdit('visitation', visit)}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete('visitation', visit.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Location:</span> {visit.location}
                  </div>
                  {visit.notes && (
                    <div className="mt-1 text-sm text-gray-500">
                      <span className="font-medium">Notes:</span> {visit.notes}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Add new component for Care Teams
  const renderCareTeams = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search teams..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={() => handleAddNew('teams')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FiPlus className="mr-2" />
          New Team
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {careTeams.map((team) => (
          <div key={team.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">{team.teamName}</h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleEdit('teams', team)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <FiEdit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete('teams', team.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Team Leader</h4>
                <p className="text-sm text-gray-500">{team.leader}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Team Members</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {team.members.map((member, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Current Assignments</h4>
                <ul className="mt-1 space-y-1">
                  {team.assignments && team.assignments.map((assignment, index) => (
                    <li key={index} className="text-sm text-gray-500">
                      {assignment.memberName} - {assignment.date}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pastoral Care</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage visitation schedules, prayer requests, counseling sessions, and care teams
        </p>
      </div>

      <div className="mb-6">
        <nav className="flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('visitation')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'visitation'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiCalendar className="inline-block mr-2" />
            Visitation Schedule
          </button>
          <button
            onClick={() => setActiveTab('prayer')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'prayer'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiHeart className="inline-block mr-2" />
            Prayer Requests
          </button>
          <button
            onClick={() => setActiveTab('counseling')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'counseling'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiMessageSquare className="inline-block mr-2" />
            Counseling
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'teams'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiUsers className="inline-block mr-2" />
            Care Teams
          </button>
        </nav>
      </div>

      {activeTab === 'visitation' && renderVisitationSchedule()}
      {activeTab === 'prayer' && renderPrayerRequests()}
      {activeTab === 'counseling' && renderCounselingSessions()}
      {activeTab === 'teams' && renderCareTeams()}

      <PastoralCareModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        type={modalType}
        initialData={selectedItem}
        mode={modalMode}
      />
    </PageLayout>
  );
};

export default PastoralCare;
