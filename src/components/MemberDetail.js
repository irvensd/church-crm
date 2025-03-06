import React, { useState, useRef } from 'react';
import { FaTimes, FaSave, FaTrash, FaCamera, FaUser, FaComments } from 'react-icons/fa';
import MemberTags from './MemberTags';
import EngagementScoreCard from './EngagementScoreCard';

const MemberDetail = ({ member, onClose, onSave, onDelete, tags = [], onTagCreate, onOpenCommunicationLog, attendanceRecords = [], communicationLogs = [], pledges = [] }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: member?.name || '',
    email: member?.email || '',
    status: member?.status || 'active',
    role: member?.role || 'member',
    joinDate: member?.joinDate || '',
    lastDonation: member?.lastDonation || '',
    totalDonations: member?.totalDonations || 0,
    phone: member?.phone || '',
    address: member?.address || '',
    notes: member?.notes || '',
    tagIds: member?.tagIds || [],
    photoUrl: member?.photoUrl || '',
    birthday: member?.birthday || '',
  });
  
  const [previewUrl, setPreviewUrl] = useState(member?.photoUrl || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagSelect = (tagId) => {
    const tagIds = formData.tagIds.includes(tagId)
      ? formData.tagIds.filter(id => id !== tagId)
      : [...formData.tagIds, tagId];
    
    setFormData({
      ...formData,
      tagIds,
    });
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData({
          ...formData,
          photoUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...member, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {member ? `Edit Member: ${member.name}` : 'Add New Member'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex justify-center mb-6">
                <div 
                  className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer relative"
                  onClick={handlePhotoClick}
                >
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt={formData.name || "Member"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser size={48} className="text-gray-400" />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-all">
                    <FaCamera className="text-white opacity-0 hover:opacity-100" size={24} />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Donation Date</label>
                  <input
                    type="date"
                    name="lastDonation"
                    value={formData.lastDonation}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Donations ($)</label>
                  <input
                    type="number"
                    name="totalDonations"
                    value={formData.totalDonations}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="member">Member</option>
                    <option value="leader">Leader</option>
                    <option value="deacon">Deacon</option>
                    <option value="elder">Elder</option>
                    <option value="pastor">Pastor</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <MemberTags 
                  tags={tags}
                  selectedTags={formData.tagIds}
                  onTagSelect={handleTagSelect}
                  onTagCreate={onTagCreate}
                />
              </div>

              <div className="flex justify-between space-x-4 mt-6">
                {member && (
                  <button
                    type="button"
                    onClick={() => onOpenCommunicationLog(member)}
                    className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                  >
                    <FaComments className="mr-2" />
                    Communication Log
                  </button>
                )}
                <div className="flex space-x-4 ml-auto">
                  {member && (
                    <button
                      type="button"
                      onClick={() => onDelete(member.id)}
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    <FaSave className="mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {member && (
            <div className="md:col-span-1">
              <EngagementScoreCard 
                member={member}
                attendanceRecords={attendanceRecords}
                communicationLogs={communicationLogs}
                pledges={pledges}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDetail; 