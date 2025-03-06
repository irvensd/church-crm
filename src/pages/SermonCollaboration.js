import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiShare2, 
  FiCalendar, 
  FiClock,
  FiBookOpen,
  FiUsers,
  FiMessageSquare,
  FiPaperclip,
  FiArrowLeft,
  FiStar,
  FiFilter
} from 'react-icons/fi';
import PageLayout from '../components/PageLayout';

const SermonCollaboration = () => {
  // Sample sermon data
  const [sermons, setSermons] = useState([
    {
      id: 1,
      title: "Finding Peace in Troubled Times",
      scripture: "John 14:27",
      scheduledDate: "2023-07-23",
      status: "draft",
      collaborators: [
        { id: 1, name: "Pastor Mike", avatar: "M", role: "owner" },
        { id: 2, name: "Pastor Sarah", avatar: "S", role: "editor" }
      ],
      notes: "Focus on how Jesus provides peace that's different from what the world offers.",
      resources: [
        { id: 1, name: "Commentary on John", type: "pdf" },
        { id: 2, name: "Peace sermon illustration", type: "image" }
      ],
      lastEdited: "2023-07-10T14:30:00Z"
    },
    {
      id: 2,
      title: "The Power of Gratitude",
      scripture: "1 Thessalonians 5:16-18",
      scheduledDate: "2023-07-30",
      status: "in-progress",
      collaborators: [
        { id: 1, name: "Pastor Mike", avatar: "M", role: "owner" },
        { id: 3, name: "Pastor David", avatar: "D", role: "viewer" }
      ],
      notes: "Explore how gratitude transforms our perspective and brings us closer to God.",
      resources: [
        { id: 3, name: "Gratitude research study", type: "pdf" },
        { id: 4, name: "Thanksgiving hymn history", type: "doc" }
      ],
      lastEdited: "2023-07-12T09:15:00Z"
    },
    {
      id: 3,
      title: "Walking in Faith",
      scripture: "Hebrews 11:1-6",
      scheduledDate: "2023-08-06",
      status: "complete",
      collaborators: [
        { id: 1, name: "Pastor Mike", avatar: "M", role: "owner" }
      ],
      notes: "Define faith and show biblical examples of faith in action.",
      resources: [
        { id: 5, name: "Hebrews commentary", type: "pdf" },
        { id: 6, name: "Faith heroes slides", type: "ppt" }
      ],
      lastEdited: "2023-07-05T16:45:00Z"
    }
  ]);
  
  // Filter state
  const [filter, setFilter] = useState('all'); // all, draft, in-progress, complete
  
  // Get filtered sermons
  const getFilteredSermons = () => {
    if (filter === 'all') return sermons;
    return sermons.filter(sermon => sermon.status === filter);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format time ago
  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'complete':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get file icon
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'doc':
        return '📝';
      case 'image':
        return '🖼️';
      case 'ppt':
        return '📊';
      default:
        return '📎';
    }
  };
  
  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sermon Collaboration</h1>
        <p className="text-gray-600 mt-1">Create, edit, and collaborate on sermon content</p>
      </div>
      
      {/* Stats and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex space-x-4">
          <div className="bg-white rounded-lg shadow px-4 py-3">
            <div className="text-sm font-medium text-gray-500">Upcoming</div>
            <div className="text-2xl font-bold text-blue-600">4</div>
          </div>
          <div className="bg-white rounded-lg shadow px-4 py-3">
            <div className="text-sm font-medium text-gray-500">In Progress</div>
            <div className="text-2xl font-bold text-amber-500">3</div>
          </div>
          <div className="bg-white rounded-lg shadow px-4 py-3">
            <div className="text-sm font-medium text-gray-500">Completed</div>
            <div className="text-2xl font-bold text-green-600">12</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <FiPlus className="mr-2" />
            New Sermon
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-md border border-gray-300 flex items-center">
            <FiFilter className="mr-2" />
            Filter
          </button>
        </div>
      </div>
      
      {/* Sermons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredSermons().map(sermon => (
          <div key={sermon.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{sermon.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(sermon.status)}`}>
                  {sermon.status === 'in-progress' ? 'In Progress' : 
                   sermon.status.charAt(0).toUpperCase() + sermon.status.slice(1)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Scripture:</span> {sermon.scripture}
              </p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <FiCalendar size={14} className="mr-1" />
                <span>Scheduled: {formatDate(sermon.scheduledDate)}</span>
              </div>
              
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Collaborators</h4>
                <div className="flex -space-x-2">
                  {sermon.collaborators.map(collaborator => (
                    <div key={collaborator.id} className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium border-2 border-white" title={collaborator.name}>
                      {collaborator.avatar}
                    </div>
                  ))}
                  <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 border-2 border-white">
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Notes</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{sermon.notes}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Resources</h4>
                <div className="flex flex-wrap gap-2">
                  {sermon.resources.map(resource => (
                    <span key={resource.id} className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-800 text-xs">
                      <span className="mr-1">{getFileIcon(resource.type)}</span>
                      {resource.name}
                    </span>
                  ))}
                  <button className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs">
                    <FiPaperclip size={12} className="mr-1" />
                    Add
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
              <span className="text-xs text-gray-500">Edited {timeAgo(sermon.lastEdited)}</span>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-blue-500">
                  <FiEdit2 size={16} />
                </button>
                <button className="text-gray-500 hover:text-blue-500">
                  <FiShare2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add New Sermon Card */}
        <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center p-6 hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mx-auto mb-3">
              <FiPlus size={24} />
            </div>
            <h3 className="text-gray-700 font-medium mb-1">Create New Sermon</h3>
            <p className="text-gray-500 text-sm">Start preparing your next message</p>
          </div>
        </div>
      </div>
      
      {/* Premium Badge */}
      <div className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 text-white flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Premium Feature</h3>
          <p className="opacity-90">Sermon Collaboration is a premium feature. Upgrade your plan for full access.</p>
        </div>
        <button className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-opacity-90">
          Upgrade
        </button>
      </div>
    </PageLayout>
  );
};

export default SermonCollaboration;
