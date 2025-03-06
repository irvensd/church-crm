import React from 'react';
import { FiX, FiEdit, FiTrash2, FiCalendar, FiClock, FiMapPin, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { FaUsers, FaUserFriends, FaHome, FaBook, FaChurch, FaPray, FaChild, FaHeart } from 'react-icons/fa';

const SmallGroupDetail = ({ group, onClose, onEdit, onDelete }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            {getGroupTypeIcon(group.type)}
            <span className="ml-2">{group.name}</span>
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Group Info */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">About this Group</h3>
                <p className="text-gray-700">{group.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FiCalendar />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Meeting Day</div>
                    <div className="text-sm text-gray-500">{group.meetingDay}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FiClock />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Meeting Time</div>
                    <div className="text-sm text-gray-500">{group.meetingTime}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <FiMapPin />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Location</div>
                    <div className="text-sm text-gray-500">{group.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                    <FaUsers />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Members</div>
                    <div className="text-sm text-gray-500">{group.members.length} members</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Group Leader</h3>
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
                    <FiUser size={24} />
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-medium text-gray-900">{group.leader.name}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FiMail className="mr-1" />
                      {group.leader.email}
                    </div>
                    {group.leader.phone && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FiPhone className="mr-1" />
                        {group.leader.phone}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Members ({group.members.length})</h3>
                {group.members.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.members.map(member => (
                      <div key={member.id} className="flex items-center p-3 border rounded-lg">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
                          {member.photoUrl ? (
                            <img src={member.photoUrl} alt={member.name} className="h-10 w-10 rounded-full" />
                          ) : (
                            <FiUser />
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-xs text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border rounded-lg">
                    <FaUsers className="mx-auto text-gray-300 text-4xl mb-2" />
                    <p className="text-gray-500">No members in this group yet</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Image and Actions */}
            <div>
              {group.imageUrl ? (
                <div className="mb-6">
                  <img 
                    src={group.imageUrl} 
                    alt={group.name} 
                    className="w-full h-48 object-cover rounded-lg shadow-sm"
                  />
                </div>
              ) : (
                <div className="mb-6 bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    {getGroupTypeIcon(group.type)}
                    <p className="text-gray-500 mt-2">No group image</p>
                  </div>
                </div>
              )}
              
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2">Group Status</h3>
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  group.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {group.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                
                <h3 className="font-medium mt-4 mb-2">Group Type</h3>
                <div className="flex items-center">
                  {getGroupTypeIcon(group.type)}
                  <span className="ml-2 text-gray-700">
                    {group.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={onEdit}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <FiEdit className="mr-2" />
                  Edit Group
                </button>
                <button
                  onClick={() => onDelete(group.id)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50"
                >
                  <FiTrash2 className="mr-2" />
                  Delete Group
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallGroupDetail; 