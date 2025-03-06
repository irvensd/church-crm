import React, { useState, useEffect } from 'react';
import { FiSearch, FiGrid, FiList, FiPlus, FiFilter, FiMapPin, FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import { FaUsers, FaUserFriends, FaHome, FaBook, FaChurch, FaPray, FaChild, FaHeart } from 'react-icons/fa';
import SmallGroupForm from '../components/SmallGroupForm';
import SmallGroupDetail from '../components/SmallGroupDetail';
import { generateDummySmallGroups } from '../utils/dummySmallGroups';
import PageLayout from '../components/PageLayout';

const SmallGroups = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupDetail, setShowGroupDetail] = useState(false);

  // Load dummy data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGroups(generateDummySmallGroups());
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter groups based on search and filter
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.leader.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterValue === 'all' || 
                         (filterValue === 'active' && group.status === 'active') ||
                         (filterValue === 'inactive' && group.status === 'inactive') ||
                         (filterValue === group.type);
    
    return matchesSearch && matchesFilter;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle filter
  const toggleFilter = (value) => {
    setFilterValue(value);
  };

  // Handle add new group
  const handleAddGroup = () => {
    setSelectedGroup(null);
    setShowGroupForm(true);
  };

  // Handle edit group
  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setShowGroupForm(true);
  };

  // Handle view group details
  const handleViewGroup = (group) => {
    setSelectedGroup(group);
    setShowGroupDetail(true);
  };

  // Handle save group
  const handleSaveGroup = (groupData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (groupData.id) {
        // Update existing group
        setGroups(groups.map(group => 
          group.id === groupData.id ? groupData : group
        ));
      } else {
        // Add new group with generated ID
        setGroups([...groups, { ...groupData, id: Date.now() }]);
      }
      
      setShowGroupForm(false);
      setIsLoading(false);
    }, 500);
  };

  // Handle delete group
  const handleDeleteGroup = (groupId) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setGroups(groups.filter(group => group.id !== groupId));
        setShowGroupDetail(false);
        setIsLoading(false);
      }, 500);
    }
  };

  // Get icon for group type
  const getGroupTypeIcon = (type) => {
    switch (type) {
      case 'bible-study':
        return <FaBook className="text-blue-500" />;
      case 'prayer':
        return <FaPray className="text-purple-500" />;
      case 'fellowship':
        return <FaUserFriends className="text-green-500" />;
      case 'ministry':
        return <FaChurch className="text-red-500" />;
      case 'youth':
        return <FaChild className="text-yellow-500" />;
      case 'women':
        return <FaHeart className="text-pink-500" />;
      case 'men':
        return <FaUsers className="text-indigo-500" />;
      default:
        return <FaHome className="text-gray-500" />;
    }
  };

  // Actions for the page header
  const pageActions = (
    <>
      <button
        onClick={handleAddGroup}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <FiPlus className="mr-2" />
        Create Group
      </button>
    </>
  );

  return (
    <PageLayout 
      title="Small Groups" 
      subtitle="Manage your church's small groups and ministries"
      actions={pageActions}
    >
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => toggleFilter('all')}
            className={`px-3 py-1 rounded-lg text-sm ${
              filterValue === 'all' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All Groups
          </button>
          <button
            onClick={() => toggleFilter('active')}
            className={`px-3 py-1 rounded-lg text-sm ${
              filterValue === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => toggleFilter('bible-study')}
            className={`px-3 py-1 rounded-lg text-sm ${
              filterValue === 'bible-study' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Bible Study
          </button>
          <button
            onClick={() => toggleFilter('fellowship')}
            className={`px-3 py-1 rounded-lg text-sm ${
              filterValue === 'fellowship' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Fellowship
          </button>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0 ml-0 md:ml-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <FiGrid />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <FiList />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Grid View */}
      {!isLoading && viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGroups.map(group => (
            <div 
              key={group.id} 
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => handleViewGroup(group)}
            >
              <div className="h-40 bg-gray-200 relative">
                {group.imageUrl ? (
                  <img 
                    src={group.imageUrl} 
                    alt={group.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {getGroupTypeIcon(group.type, 48)}
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-medium text-gray-700 flex items-center">
                  <FiUsers className="mr-1" size={12} />
                  {group.members.length} members
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">{group.name}</h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{group.description}</p>
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <FiCalendar className="mr-1" />
                  {group.meetingDay}s at {group.meetingTime}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <FiMapPin className="mr-1" />
                  {group.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {!isLoading && viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leader
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meeting
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGroups.map(group => (
                <tr 
                  key={group.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewGroup(group)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        {getGroupTypeIcon(group.type)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{group.name}</div>
                        <div className="text-sm text-gray-500">{group.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{group.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{group.leader.name}</div>
                    <div className="text-sm text-gray-500">{group.leader.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiUsers className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{group.members.length}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{group.meetingDay}</div>
                    <div className="text-sm text-gray-500">{group.meetingTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      group.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {group.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewGroup(group);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditGroup(group);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Results */}
      {!isLoading && filteredGroups.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FiUsers className="mx-auto text-gray-300 text-5xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={handleAddGroup}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center"
          >
            <FiPlus className="mr-2" />
            Create New Group
          </button>
        </div>
      )}

      {/* Group Form Modal */}
      {showGroupForm && (
        <SmallGroupForm
          group={selectedGroup}
          onSave={handleSaveGroup}
          onCancel={() => setShowGroupForm(false)}
        />
      )}

      {/* Group Detail Modal */}
      {showGroupDetail && selectedGroup && (
        <SmallGroupDetail
          group={selectedGroup}
          onClose={() => setShowGroupDetail(false)}
          onEdit={() => {
            setShowGroupDetail(false);
            setShowGroupForm(true);
          }}
          onDelete={handleDeleteGroup}
        />
      )}
    </PageLayout>
  );
};

export default SmallGroups; 