import React, { useState, useEffect } from 'react';
import { FaTimes, FaUserFriends, FaPlus, FaTrash } from 'react-icons/fa';

const FamilyRelationship = ({ member, members, onClose, onSave }) => {
  const [familyMembers, setFamilyMembers] = useState(member?.familyMembers || []);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [relationship, setRelationship] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [familyName, setFamilyName] = useState(member?.familyName || '');

  // Define relationship types
  const relationshipTypes = [
    'Spouse', 'Child', 'Parent', 'Sibling', 'Grandparent', 'Grandchild', 'Other'
  ];

  // Filter out already connected family members and the current member
  useEffect(() => {
    const connectedIds = familyMembers.map(fm => fm.memberId);
    const filtered = members.filter(m => 
      m.id !== member.id && 
      !connectedIds.includes(m.id)
    );
    setAvailableMembers(filtered);
  }, [members, member, familyMembers]);

  const handleAddFamilyMember = () => {
    if (!selectedMember || !relationship) return;

    const selectedPersonData = members.find(m => m.id.toString() === selectedMember.toString());
    
    // Create the new relationship
    const newRelationship = {
      memberId: selectedMember,
      name: selectedPersonData.name,
      photoUrl: selectedPersonData.photoUrl,
      relationship,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setFamilyMembers([...familyMembers, newRelationship]);
    setSelectedMember('');
    setRelationship('');
  };

  const handleRemoveFamilyMember = (memberId) => {
    setFamilyMembers(familyMembers.filter(fm => fm.memberId !== memberId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave({
        ...member,
        familyMembers,
        familyName
      });
      
      setIsLoading(false);
      setSuccessMessage('Family relationships updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  const getDefaultFamilyName = () => {
    if (familyName) return familyName;
    
    // Try to use last name as family name
    const nameParts = member.name.split(' ');
    if (nameParts.length > 1) {
      return nameParts[nameParts.length - 1]; // Last name
    }
    
    return '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            Family Relationships: {member.name}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Family Name</label>
            <input
              type="text"
              value={familyName || getDefaultFamilyName()}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="e.g., Smith Family"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              This will group family members together in reports and communications.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Current Family Members</h3>
              <div className="text-sm text-gray-500">
                {familyMembers.length} connection{familyMembers.length !== 1 ? 's' : ''}
              </div>
            </div>

            {familyMembers.length > 0 ? (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {familyMembers.map((familyMember) => (
                  <div 
                    key={familyMember.memberId} 
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      {familyMember.photoUrl ? (
                        <img 
                          src={familyMember.photoUrl} 
                          alt={familyMember.name} 
                          className="h-10 w-10 rounded-full mr-3 object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <FaUserFriends className="text-blue-500" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{familyMember.name}</div>
                        <div className="text-sm text-gray-500">
                          {familyMember.relationship}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFamilyMember(familyMember.memberId)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove relationship"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                No family relationships defined yet. Add family members below.
              </div>
            )}
          </div>

          <div className="mb-6 p-4 border border-dashed rounded-lg">
            <h3 className="text-lg font-medium mb-3">Add Family Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Member</label>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Member</option>
                  {availableMembers.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Relationship</option>
                  {relationshipTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddFamilyMember}
                  disabled={!selectedMember || !relationship}
                  className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <FaPlus className="mr-1" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
              {successMessage}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FaUserFriends className="mr-1" />
                  Save Family Relationships
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamilyRelationship; 