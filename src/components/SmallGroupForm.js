import React, { useState, useEffect } from 'react';
import { FiX, FiCheck, FiCalendar, FiClock, FiMapPin, FiUsers, FiSearch, FiPlus, FiTrash2 } from 'react-icons/fi';
import { generateDummyMembers } from '../utils/dummyData';

const SmallGroupForm = ({ group, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    type: 'bible-study',
    meetingDay: 'Sunday',
    meetingTime: '19:00',
    location: '',
    leader: {
      id: '',
      name: '',
      email: ''
    },
    members: [],
    status: 'active',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [showLeaderSearch, setShowLeaderSearch] = useState(false);
  const [showMemberSearch, setShowMemberSearch] = useState(false);

  // Group types
  const groupTypes = [
    { id: 'bible-study', name: 'Bible Study' },
    { id: 'prayer', name: 'Prayer Group' },
    { id: 'fellowship', name: 'Fellowship' },
    { id: 'ministry', name: 'Ministry Team' },
    { id: 'youth', name: 'Youth Group' },
    { id: 'women', name: 'Women\'s Group' },
    { id: 'men', name: 'Men\'s Group' },
    { id: 'other', name: 'Other' }
  ];

  // Days of the week
  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  // Load available members
  useEffect(() => {
    // In a real app, this would be an API call
    const allMembers = generateDummyMembers();
    setAvailableMembers(allMembers);
  }, []);

  // Initialize form with group data if editing
  useEffect(() => {
    if (group) {
      setFormData({
        id: group.id,
        name: group.name || '',
        description: group.description || '',
        type: group.type || 'bible-study',
        meetingDay: group.meetingDay || 'Sunday',
        meetingTime: group.meetingTime || '19:00',
        location: group.location || '',
        leader: group.leader || { id: '', name: '', email: '' },
        members: group.members || [],
        status: group.status || 'active',
        imageUrl: group.imageUrl || ''
      });
    }
  }, [group]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('leader.')) {
      const leaderField = name.split('.')[1];
      setFormData({
        ...formData,
        leader: {
          ...formData.leader,
          [leaderField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Filter available members based on search and already selected members
  const filteredAvailableMembers = availableMembers.filter(member => {
    // Don't show members that are already in the group
    const alreadySelected = formData.members.some(m => m.id === member.id);
    if (alreadySelected) return false;
    
    // Don't show the leader in the member list
    if (formData.leader.id && member.id === formData.leader.id) return false;
    
    // Filter by search query
    if (memberSearchQuery) {
      return member.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
             member.email.toLowerCase().includes(memberSearchQuery.toLowerCase());
    }
    
    return true;
  });

  // Add member to group
  const handleAddMember = (member) => {
    setFormData({
      ...formData,
      members: [...formData.members, member]
    });
    setMemberSearchQuery('');
    setShowMemberSearch(false);
  };

  // Remove member from group
  const handleRemoveMember = (memberId) => {
    setFormData({
      ...formData,
      members: formData.members.filter(m => m.id !== memberId)
    });
  };

  // Set leader from available members
  const handleSetLeader = (member) => {
    // If the member is already in the group, remove them
    const updatedMembers = formData.members.filter(m => m.id !== member.id);
    
    setFormData({
      ...formData,
      leader: {
        id: member.id,
        name: member.name,
        email: member.email,
        phone: member.phone
      },
      members: updatedMembers
    });
    
    setMemberSearchQuery('');
    setShowLeaderSearch(false);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Meeting location is required';
    }
    
    if (!formData.leader.name.trim()) {
      newErrors.leaderName = 'Leader name is required';
    }
    
    if (!formData.leader.email.trim()) {
      newErrors.leaderEmail = 'Leader email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.leader.email)) {
      newErrors.leaderEmail = 'Invalid email format';
    }

    // Ensure leader has an ID
    if (!formData.leader.id) {
      newErrors.leaderName = 'Please select a leader from the member list';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Generate a new ID if creating a new group
        const groupToSave = {
          ...formData,
          id: formData.id || `group_${Date.now()}`,
          leader: {
            id: formData.leader.id,
            name: formData.leader.name,
            email: formData.leader.email
          },
          members: formData.members.map(member => ({
            id: member.id,
            name: member.name,
            email: member.email
          }))
        };
        
        await onSave(groupToSave);
      } catch (error) {
        console.error('Error saving group:', error);
        setErrors({
          submit: 'Failed to save group. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {group ? 'Edit Group' : 'Create New Group'}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Group Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Group Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter group name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            {/* Group Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Group Type*
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {groupTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            {/* Meeting Day */}
            <div>
              <label htmlFor="meetingDay" className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Day*
              </label>
              <div className="relative">
                <select
                  id="meetingDay"
                  name="meetingDay"
                  value={formData.meetingDay}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  {daysOfWeek.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <FiCalendar className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            {/* Meeting Time */}
            <div>
              <label htmlFor="meetingTime" className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Time*
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="meetingTime"
                  name="meetingTime"
                  value={formData.meetingTime}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <FiClock className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status*
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Location*
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter meeting location"
                />
                <FiMapPin className="absolute left-3 top-3 text-gray-400" />
              </div>
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>
            
            {/* Group Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter group description"
              ></textarea>
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            
            {/* Group Image URL */}
            <div className="md:col-span-2">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Group Image URL (optional)
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter image URL"
              />
            </div>
            
            {/* Leader Information */}
            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <FiUsers className="mr-2" />
                Group Leader
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Leader Name */}
                <div>
                  <label htmlFor="leader.name" className="block text-sm font-medium text-gray-700 mb-1">
                    Leader Name*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="leader.name"
                      name="leader.name"
                      value={formData.leader.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.leaderName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter leader name"
                      onFocus={() => setShowLeaderSearch(true)}
                    />
                    {errors.leaderName && <p className="mt-1 text-sm text-red-600">{errors.leaderName}</p>}
                    
                    {/* Member search dropdown for leader */}
                    {showLeaderSearch && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-y-auto">
                        <div className="p-2 border-b">
                          <input
                            type="text"
                            value={memberSearchQuery}
                            onChange={(e) => setMemberSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Search members..."
                            autoFocus
                          />
                        </div>
                        <ul>
                          {filteredAvailableMembers.slice(0, 5).map(member => (
                            <li 
                              key={member.id}
                              className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center justify-between"
                              onClick={() => handleSetLeader(member)}
                            >
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-gray-500">{member.email}</div>
                              </div>
                              <button 
                                type="button"
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                Set as Leader
                              </button>
                            </li>
                          ))}
                          {filteredAvailableMembers.length === 0 && (
                            <li className="px-3 py-2 text-gray-500">No members found</li>
                          )}
                        </ul>
                        <div className="p-2 border-t bg-gray-50 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setShowLeaderSearch(false);
                              setMemberSearchQuery('');
                            }}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Leader Email */}
                <div>
                  <label htmlFor="leader.email" className="block text-sm font-medium text-gray-700 mb-1">
                    Leader Email*
                  </label>
                  <input
                    type="email"
                    id="leader.email"
                    name="leader.email"
                    value={formData.leader.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.leaderEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter leader email"
                  />
                  {errors.leaderEmail && <p className="mt-1 text-sm text-red-600">{errors.leaderEmail}</p>}
                </div>
              </div>
            </div>
            
            {/* Group Members */}
            <div className="md:col-span-2 border-t pt-4 mt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium flex items-center">
                  <FiUsers className="mr-2" />
                  Group Members ({formData.members.length})
                </h3>
                <button
                  type="button"
                  onClick={() => setShowMemberSearch(true)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 flex items-center text-sm"
                >
                  <FiPlus className="mr-1" />
                  Add Members
                </button>
              </div>
              
              {/* Member search dropdown */}
              {showMemberSearch && (
                <div className="mb-4 border rounded-md shadow-sm">
                  <div className="p-3 border-b bg-gray-50">
                    <div className="relative">
                      <input
                        type="text"
                        value={memberSearchQuery}
                        onChange={(e) => setMemberSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Search members to add..."
                        autoFocus
                      />
                      <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {filteredAvailableMembers.map(member => (
                      <li 
                        key={member.id}
                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b last:border-b-0"
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            {member.photoUrl ? (
                              <img src={member.photoUrl} alt={member.name} className="h-8 w-8 rounded-full" />
                            ) : (
                              <FiUsers className="text-gray-500" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-gray-500">{member.email}</div>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => handleAddMember(member)}
                          className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                        >
                          Add
                        </button>
                      </li>
                    ))}
                    {filteredAvailableMembers.length === 0 && (
                      <li className="px-3 py-4 text-center text-gray-500">
                        No members found matching your search
                      </li>
                    )}
                  </ul>
                  <div className="p-3 border-t bg-gray-50 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMemberSearch(false);
                        setMemberSearchQuery('');
                      }}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              
              {/* Current members list */}
              {formData.members.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formData.members.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          {member.photoUrl ? (
                            <img src={member.photoUrl} alt={member.name} className="h-10 w-10 rounded-full" />
                          ) : (
                            <FiUsers className="text-gray-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-gray-500">{member.email}</div>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-md bg-gray-50">
                  <FiUsers className="mx-auto text-gray-300 text-4xl mb-2" />
                  <p className="text-gray-500 mb-2">No members added to this group yet</p>
                  <button
                    type="button"
                    onClick={() => setShowMemberSearch(true)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 inline-flex items-center text-sm"
                  >
                    <FiPlus className="mr-1" />
                    Add Members
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            {errors.submit && (
              <div className="flex-grow text-red-600 text-sm">
                {errors.submit}
              </div>
            )}
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiCheck className="mr-2" />
                  Save Group
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SmallGroupForm;
