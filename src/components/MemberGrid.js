import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaTrash } from 'react-icons/fa';
import MemberTags from './MemberTags';

const MemberGrid = ({ members, tags, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {members.map(member => (
        <div key={member.id} className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
          <div className="h-40 bg-gray-200 relative">
            {member.photoUrl ? (
              <img 
                src={member.photoUrl} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaUser size={48} className="text-gray-400" />
              </div>
            )}
            <div className="absolute top-2 right-2 flex space-x-2">
              <button 
                onClick={() => onEdit(member)}
                className="p-2 bg-white rounded-full shadow hover:bg-blue-50"
              >
                <FaEdit className="text-blue-500" />
              </button>
              <button 
                onClick={() => onDelete(member.id)}
                className="p-2 bg-white rounded-full shadow hover:bg-red-50"
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
            <div className="text-sm text-gray-500 mb-2 flex items-center">
              <FaEnvelope className="mr-1" /> {member.email}
            </div>
            {member.phone && (
              <div className="text-sm text-gray-500 mb-2 flex items-center">
                <FaPhone className="mr-1" /> {member.phone}
              </div>
            )}
            <div className="mb-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </span>
            </div>
            <div className="mb-2">
              <MemberTags 
                tags={tags}
                selectedTags={member.tagIds || []}
                readOnly={true}
              />
            </div>
            <div className="text-sm text-gray-500">
              <div>Joined: {new Date(member.joinDate).toLocaleDateString()}</div>
              <div>Last Donation: {new Date(member.lastDonation).toLocaleDateString()}</div>
              <div className="font-semibold text-gray-700">Total: ${member.totalDonations.toLocaleString()}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberGrid; 