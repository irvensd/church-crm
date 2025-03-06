import React, { useState, useEffect } from 'react';
import { FiSearch, FiGrid, FiList, FiCalendar } from 'react-icons/fi';
import { FaFilter, FaUserPlus, FaTag, FaUser, FaCalendarCheck, FaTrash, FaComments, FaBirthdayCake, FaFileImport, FaHandHoldingUsd, FaUserFriends } from 'react-icons/fa';
import MemberDetail from '../components/MemberDetail';
import MemberTags from '../components/MemberTags';
import MemberGrid from '../components/MemberGrid';
import AttendanceTracker from '../components/AttendanceTracker';
import CommunicationLog from '../components/CommunicationLog';
import BirthdayCalendar from '../components/BirthdayCalendar';
import MemberImportExport from '../components/MemberImportExport';
import PledgeTracker from '../components/PledgeTracker';
import MemberJourney from '../components/MemberJourney';
import { generateDummyMembers } from '../utils/dummyData';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Members = () => {
  const [activeTab, setActiveTab] = useState('directory');
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('All Members');
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddingMember, setIsAddingMember] = useState(false);

  // New state for tags
  const [tags, setTags] = useState([
    { id: 1, name: 'Donor', color: '#3B82F6' },
    { id: 2, name: 'Volunteer', color: '#10B981' },
    { id: 3, name: 'Board Member', color: '#8B5CF6' },
    { id: 4, name: 'New Member', color: '#F59E0B' },
  ]);

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(10);

  // Add role filter state
  const [roleFilter, setRoleFilter] = useState('');

  // Add state for member journey
  const [showMemberJourney, setShowMemberJourney] = useState(false);
  const [selectedMemberForJourney, setSelectedMemberForJourney] = useState(null);

  // Add a new state for journey view
  const [journeyView, setJourneyView] = useState('all'); // 'all', 'welcome', 'connect', 'grow', 'serve', 'integrated'

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMembers(generateDummyMembers());
      setIsLoading(false);
    }, 1000);
  }, []);

  // Move this up before the filteredMembers function
  const [selectedTagFilter, setSelectedTagFilter] = useState(null);

  // Filter members based on search term
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterValue === 'All Members' || member.status === 'active';
    const matchesTag = !selectedTagFilter || (member.tagIds && member.tagIds.includes(selectedTagFilter));
    const matchesRole = !roleFilter || member.role === roleFilter;
    return matchesSearch && matchesFilter && matchesTag && matchesRole;
  });

  // Calculate pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle active filter
  const toggleFilter = () => {
    setFilterValue(prev => prev === 'All Members' ? 'Active Members' : 'All Members');
  };

  // Handle member edit
  const handleEditMember = (member) => {
    setSelectedMember(member);
  };

  // Handle add new member
  const handleAddMember = () => {
    setIsAddingMember(true);
  };

  // Handle save member (edit or add)
  const handleSaveMember = (updatedMember) => {
    if (updatedMember.id) {
      // Edit existing member
      setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
    } else {
      // Add new member
      const newMember = {
        ...updatedMember,
        id: Date.now(), // Simple ID generation for demo
      };
      setMembers([...members, newMember]);
    }
    setSelectedMember(null);
    setIsAddingMember(false);
  };

  // Handle delete member
  const handleDeleteMember = (memberId) => {
    setMembers(members.filter(m => m.id !== memberId));
    setSelectedMember(null);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedMember(null);
    setIsAddingMember(false);
  };

  // Handle tag creation
  const handleCreateTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  // Add state for attendance tracking
  const [showAttendanceTracker, setShowAttendanceTracker] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Add handler for saving attendance
  const handleSaveAttendance = (attendanceData) => {
    setAttendanceRecords([attendanceData, ...attendanceRecords]);
    setShowAttendanceTracker(false);
  };

  // Add handler for deleting attendance
  const handleDeleteAttendance = (recordId) => {
    setAttendanceRecords(attendanceRecords.filter(record => record.id !== recordId));
  };

  // Add state for communication log
  const [showCommunicationLog, setShowCommunicationLog] = useState(false);
  const [selectedMemberForComm, setSelectedMemberForComm] = useState(null);
  const [communicationLogs, setCommunicationLogs] = useState([]);

  // Add handler for opening communication log
  const handleOpenCommunicationLog = (member) => {
    setSelectedMemberForComm(member);
    setShowCommunicationLog(true);
  };

  // Add handler for saving communication logs
  const handleSaveCommunicationLog = (logs) => {
    setCommunicationLogs(logs);
  };

  // Add state for birthday calendar
  const [showBirthdayCalendar, setShowBirthdayCalendar] = useState(false);

  // Add upcoming birthdays
  const upcomingBirthdays = members
    .filter(member => member.birthday)
    .map(member => {
      const birthDate = new Date(member.birthday);
      const today = new Date();
      const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      
      // If birthday has passed this year, use next year's birthday
      if (thisYearBirthday < today) {
        thisYearBirthday.setFullYear(today.getFullYear() + 1);
      }
      
      const daysUntil = Math.ceil((thisYearBirthday - today) / (1000 * 60 * 60 * 24));
      
      return {
        ...member,
        daysUntil
      };
    })
    .filter(member => member.daysUntil <= 7) // Only show birthdays in the next 7 days
    .sort((a, b) => a.daysUntil - b.daysUntil);

  // Add state for import/export
  const [showImportExport, setShowImportExport] = useState(false);

  // Add handler for importing members
  const handleImportMembers = (importedMembers) => {
    // Generate IDs for imported members
    const membersWithIds = importedMembers.map((member, index) => ({
      ...member,
      id: Date.now() + index,
      // Set default values for any missing fields
      status: member.status || 'active',
      tagIds: [],
    }));
    
    setMembers([...members, ...membersWithIds]);
  };

  // Add state for pledge tracking
  const [showPledgeTracker, setShowPledgeTracker] = useState(false);
  const [pledges, setPledges] = useState([]);
  const [newPledge, setNewPledge] = useState({
    memberId: '',
    amount: '',
    campaign: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    frequency: 'one-time',
    status: 'active',
    notes: '',
  });

  // Add handler for saving pledges
  const handleSavePledges = (updatedPledges) => {
    setPledges(updatedPledges);
  };

  // Add pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Add handler for opening member journey
  const handleOpenMemberJourney = (member) => {
    setSelectedMemberForJourney(member);
    setShowMemberJourney(true);
  };

  // Add handler for saving member journey
  const handleSaveMemberJourney = (updatedMember) => {
    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
    setShowMemberJourney(false);
  };

  // Add a function to filter members by journey stage
  const getJourneyMembers = () => {
    if (journeyView === 'all') {
      return members.filter(member => member.journeyStage);
    }
    return members.filter(member => member.journeyStage === journeyView);
  };

  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-100">
      {/* Member Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">{filterValue === 'All Members' ? 'Total Members' : 'Filtered Members'}</p>
          <p className="text-2xl font-bold">{filteredMembers.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Active Members</p>
          <p className="text-2xl font-bold">{members.filter(m => m.status === 'active').length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Total Donations</p>
          <p className="text-2xl font-bold">
            ${members.reduce((sum, member) => sum + (parseInt(member.totalDonations) || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Upcoming Birthdays Section */}
      {upcomingBirthdays.length > 0 && (
        <div className="bg-pink-50 rounded-lg p-4 mb-6 shadow-sm">
          <h3 className="text-lg font-medium mb-2 flex items-center text-pink-700">
            <FaBirthdayCake className="mr-2" />
            Upcoming Birthdays
          </h3>
          <div className="flex flex-wrap gap-2">
            {upcomingBirthdays.map(member => (
              <div 
                key={member.id}
                className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm cursor-pointer"
                onClick={() => handleEditMember(member)}
              >
                {member.photoUrl && (
                  <img 
                    src={member.photoUrl} 
                    alt={member.name} 
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                )}
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-xs text-gray-500">
                    {member.daysUntil === 0 ? 'Today!' : `In ${member.daysUntil} days`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Member Directory Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Member Directory</h1>
          <div className="flex flex-wrap gap-2">
            <button 
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={() => setShowAttendanceTracker(true)}
            >
              <FaCalendarCheck className="mr-2" />
              Attendance
            </button>
            <button 
              className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              onClick={() => setShowBirthdayCalendar(true)}
            >
              <FaBirthdayCake className="mr-2" />
              Birthdays
            </button>
            <button 
              className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              onClick={() => setShowImportExport(true)}
            >
              <FaFileImport className="mr-2" />
              Import/Export
            </button>
            <button 
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={() => setShowPledgeTracker(true)}
            >
              <FaHandHoldingUsd className="mr-2" />
              Pledges
            </button>
            <button 
              className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition ml-auto"
              onClick={handleAddMember}
            >
              <FaUserPlus className="mr-2" />
              Add Member
            </button>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-lg border ${
                filterValue === 'Active Members' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={toggleFilter}
            >
              <FaFilter className="inline mr-2" />
              {filterValue}
            </button>
            <div className="relative">
              <select
                className="appearance-none px-4 py-2 rounded-lg border bg-white text-gray-700 pr-8"
                value={selectedTagFilter || ''}
                onChange={(e) => setSelectedTagFilter(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">All Tags</option>
                {tags.map(tag => (
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FaTag className="text-gray-400" />
              </div>
            </div>
            <div className="relative">
              <select
                className="appearance-none px-4 py-2 rounded-lg border bg-white text-gray-700 pr-8"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="member">Members</option>
                <option value="leader">Leaders</option>
                <option value="deacon">Deacons</option>
                <option value="elder">Elders</option>
                <option value="pastor">Pastors</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
            </div>
            <div className="flex border rounded-lg overflow-hidden">
              <button
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <FiList />
              </button>
              <button
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <FiGrid />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Members List/Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : viewMode === 'list' ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Join Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Total Donations</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Tags</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Journey</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Engagement</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentMembers.length > 0 ? (
                currentMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 mr-3">
                          {member.photoUrl ? (
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={member.photoUrl} 
                              alt={member.name} 
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <FaUser className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">{member.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        member.role === 'pastor' ? 'bg-purple-100 text-purple-800' :
                        member.role === 'elder' ? 'bg-red-100 text-red-800' :
                        member.role === 'deacon' ? 'bg-blue-100 text-blue-800' :
                        member.role === 'leader' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">{new Date(member.joinDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">${member.totalDonations.toLocaleString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <MemberTags 
                        tags={tags}
                        selectedTags={member.tagIds || []}
                        readOnly={true}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {member.journeyStage ? (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          member.journeyStage === 'integrated' ? 'bg-green-100 text-green-800' :
                          member.journeyStage === 'serve' ? 'bg-blue-100 text-blue-800' :
                          member.journeyStage === 'grow' ? 'bg-purple-100 text-purple-800' :
                          member.journeyStage === 'connect' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {member.journeyStage.charAt(0).toUpperCase() + member.journeyStage.slice(1)}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Not Started</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {(() => {
                        // Calculate a simplified engagement score for the list view
                        let score = 0;
                        
                        // Base score for active status
                        if (member.status === 'active') score += 10;
                        
                        // Score for attendance
                        const memberAttendance = attendanceRecords.filter(record => 
                          record.attendeeIds && record.attendeeIds.includes(member.id)
                        );
                        score += Math.min(memberAttendance.length * 5, 25);
                        
                        // Score for communications
                        const memberCommunications = communicationLogs.filter(log => log.memberId === member.id);
                        score += Math.min(memberCommunications.length * 3, 15);
                        
                        // Score for donations
                        if (member.totalDonations) {
                          const donationAmount = parseFloat(member.totalDonations);
                          if (donationAmount >= 1000) score += 20;
                          else if (donationAmount >= 500) score += 15;
                          else if (donationAmount >= 100) score += 10;
                          else if (donationAmount > 0) score += 5;
                        }
                        
                        // Return colored badge based on score
                        if (score >= 70) return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Very High</span>;
                        if (score >= 50) return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">High</span>;
                        if (score >= 30) return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Medium</span>;
                        if (score >= 15) return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Low</span>;
                        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Very Low</span>;
                      })()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="text-green-600 hover:text-green-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewPledge({
                              ...newPledge,
                              memberId: member.id,
                            });
                            setShowPledgeTracker(true);
                          }}
                          title="Add Pledge"
                        >
                          <FaHandHoldingUsd />
                        </button>
                        <button 
                          className="text-purple-600 hover:text-purple-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCommunicationLog(member);
                          }}
                          title="Communication Log"
                        >
                          <FaComments />
                        </button>
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenMemberJourney(member);
                          }}
                          title="Member Journey"
                        >
                          <FaUserFriends />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => handleEditMember(member)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMember(member.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No members found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <MemberGrid 
          members={currentMembers}
          tags={tags}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
        />
      )}

      {filteredMembers.length > membersPerPage && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === totalPages ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstMember + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastMember, filteredMembers.length)}
                </span>{' '}
                of <span className="font-medium">{filteredMembers.length}</span> members
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                    currentPage === 1
                      ? 'text-gray-300'
                      : 'text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === pageNumber
                          ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                    currentPage === totalPages
                      ? 'text-gray-300'
                      : 'text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Statistics Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Attendance Statistics</h2>
        
        {attendanceRecords.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold">{attendanceRecords.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Average Attendance</p>
                <p className="text-2xl font-bold">
                  {Math.round(attendanceRecords.reduce((sum, record) => sum + record.attendees, 0) / attendanceRecords.length)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Last Event</p>
                <p className="text-2xl font-bold">{attendanceRecords[0].name}</p>
                <p className="text-sm text-gray-600">{new Date(attendanceRecords[0].date).toLocaleDateString()}</p>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-2">Recent Events</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceRecords.slice(0, 5).map(record => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{record.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{record.attendees}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {Math.round((record.attendees / members.filter(m => m.status === 'active').length) * 100)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleDeleteAttendance(record.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FiCalendar className="mx-auto text-4xl mb-2" />
            <p>No attendance records yet</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={() => setShowAttendanceTracker(true)}
            >
              Start Tracking Attendance
            </button>
          </div>
        )}
      </div>

      {/* Member Detail Modal */}
      {(selectedMember || isAddingMember) && (
        <MemberDetail
          member={selectedMember}
          onClose={handleCloseModal}
          onSave={handleSaveMember}
          onDelete={handleDeleteMember}
          tags={tags}
          onTagCreate={handleCreateTag}
          onOpenCommunicationLog={handleOpenCommunicationLog}
          attendanceRecords={attendanceRecords}
          communicationLogs={communicationLogs}
          pledges={pledges}
        />
      )}

      {/* Attendance Tracker Modal */}
      {showAttendanceTracker && (
        <AttendanceTracker
          members={members.filter(m => m.status === 'active')}
          onClose={() => setShowAttendanceTracker(false)}
          onSave={handleSaveAttendance}
          onDelete={handleDeleteAttendance}
          existingRecords={attendanceRecords}
        />
      )}

      {/* Communication Log Modal */}
      {showCommunicationLog && selectedMemberForComm && (
        <CommunicationLog
          member={selectedMemberForComm}
          onClose={() => setShowCommunicationLog(false)}
          onSave={handleSaveCommunicationLog}
          existingLogs={communicationLogs.filter(log => log.memberId === selectedMemberForComm.id)}
        />
      )}

      {/* Birthday Calendar Modal */}
      {showBirthdayCalendar && (
        <BirthdayCalendar
          members={members}
          onClose={() => setShowBirthdayCalendar(false)}
        />
      )}

      {/* Import/Export Modal */}
      {showImportExport && (
        <MemberImportExport
          members={members}
          onClose={() => setShowImportExport(false)}
          onImport={handleImportMembers}
        />
      )}

      {/* Pledge Tracker Modal */}
      {showPledgeTracker && (
        <PledgeTracker
          members={members.filter(m => m.status === 'active')}
          onClose={() => setShowPledgeTracker(false)}
          onSave={handleSavePledges}
          existingPledges={pledges}
        />
      )}

      {/* Member Journey Modal */}
      {showMemberJourney && selectedMemberForJourney && (
        <MemberJourney
          member={selectedMemberForJourney}
          members={members}
          onClose={() => setShowMemberJourney(false)}
          onSave={handleSaveMemberJourney}
        />
      )}

      {activeTab === 'journey' && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Member Journey Tracking</h2>
            <div className="flex space-x-2">
              <select
                className="border rounded-lg px-3 py-2"
                value={journeyView}
                onChange={(e) => setJourneyView(e.target.value)}
              >
                <option value="all">All Stages</option>
                <option value="welcome">Welcome Stage</option>
                <option value="connect">Connect Stage</option>
                <option value="grow">Grow Stage</option>
                <option value="serve">Serve Stage</option>
                <option value="integrated">Integrated Stage</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Welcome Stage</p>
              <p className="text-2xl font-bold">{members.filter(m => m.journeyStage === 'welcome').length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Connect Stage</p>
              <p className="text-2xl font-bold">{members.filter(m => m.journeyStage === 'connect').length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Grow Stage</p>
              <p className="text-2xl font-bold">{members.filter(m => m.journeyStage === 'grow').length}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Serve Stage</p>
              <p className="text-2xl font-bold">{members.filter(m => m.journeyStage === 'serve').length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Integrated Stage</p>
              <p className="text-2xl font-bold">{members.filter(m => m.journeyStage === 'integrated').length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Not Started</p>
              <p className="text-2xl font-bold">{members.filter(m => !m.journeyStage).length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getJourneyMembers().map(member => {
                  // Find mentor
                  const mentor = members.find(m => m.id === member.mentorId);
                  
                  // Calculate progress
                  const journeySteps = {
                    welcome: ['welcome_call', 'welcome_packet', 'church_tour', 'pastor_meeting'],
                    connect: ['small_group', 'ministry_intro', 'fellowship_event'],
                    grow: ['new_member_class', 'bible_study', 'discipleship'],
                    serve: ['spiritual_gifts', 'ministry_placement', 'volunteer_training'],
                    integrated: ['regular_attendance', 'giving', 'leadership']
                  };
                  
                  const stepsForCurrentStage = journeySteps[member.journeyStage] || [];
                  const completedStepsInStage = stepsForCurrentStage.filter(
                    step => member.completedJourneySteps && member.completedJourneySteps.includes(step)
                  ).length;
                  
                  const progress = stepsForCurrentStage.length > 0 
                    ? Math.round((completedStepsInStage / stepsForCurrentStage.length) * 100)
                    : 0;
                  
                  return (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            {member.photoUrl ? (
                              <img 
                                src={member.photoUrl} 
                                alt={member.name} 
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <FaUser className="text-gray-600" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          member.journeyStage === 'integrated' ? 'bg-green-100 text-green-800' :
                          member.journeyStage === 'serve' ? 'bg-blue-100 text-blue-800' :
                          member.journeyStage === 'grow' ? 'bg-purple-100 text-purple-800' :
                          member.journeyStage === 'connect' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {member.journeyStage.charAt(0).toUpperCase() + member.journeyStage.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {mentor ? (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 mr-2">
                              {mentor.photoUrl ? (
                                <img 
                                  src={mentor.photoUrl} 
                                  alt={mentor.name} 
                                  className="h-8 w-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                  <FaUser className="text-gray-600" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{mentor.name}</div>
                              <div className="text-xs text-gray-500">{mentor.role.charAt(0).toUpperCase() + mentor.role.slice(1)}</div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">Not Assigned</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {member.journeyStartDate ? new Date(member.journeyStartDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 w-24">
                            <div 
                              className={`h-2.5 rounded-full ${
                                progress >= 75 ? 'bg-green-600' :
                                progress >= 50 ? 'bg-blue-600' :
                                progress >= 25 ? 'bg-yellow-600' :
                                'bg-orange-600'
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleOpenMemberJourney(member)}
                        >
                          Manage Journey
                        </button>
                      </td>
                    </tr>
                  );
                })}
                
                {getJourneyMembers().length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <FaUserFriends className="text-4xl mb-2" />
                        <p>No members found in the selected journey stage.</p>
                        {journeyView !== 'all' && (
                          <button 
                            className="mt-2 text-blue-600 hover:text-blue-800"
                            onClick={() => setJourneyView('all')}
                          >
                            View all journey stages
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members; 