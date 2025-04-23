import React, { useState } from 'react';
import { FaTimes, FaPlus, FaTrash, FaCheck, FaStar } from 'react-icons/fa';

const SkillsInventory = ({ member, onClose, onSave }) => {
  const [skills, setSkills] = useState(member?.skills || []);
  const [spiritualGifts, setSpiritualGifts] = useState(member?.spiritualGifts || []);
  const [newSkill, setNewSkill] = useState('');
  const [newProficiency, setNewProficiency] = useState('intermediate');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Define spiritual gift options
  const spiritualGiftOptions = [
    { id: 'administration', name: 'Administration', description: 'The ability to organize and manage' },
    { id: 'apostleship', name: 'Apostleship', description: 'The ability to start new ministries or churches' },
    { id: 'discernment', name: 'Discernment', description: 'The ability to distinguish between truth and error' },
    { id: 'evangelism', name: 'Evangelism', description: 'The ability to share the gospel effectively' },
    { id: 'exhortation', name: 'Exhortation', description: 'The ability to encourage and motivate others' },
    { id: 'faith', name: 'Faith', description: 'Exceptional trust in God and His promises' },
    { id: 'giving', name: 'Giving', description: 'The ability to give generously' },
    { id: 'healing', name: 'Healing', description: 'The ability to be used by God in healing' },
    { id: 'helps', name: 'Helps', description: 'The ability to support others in ministry' },
    { id: 'hospitality', name: 'Hospitality', description: 'The ability to make others feel welcome' },
    { id: 'knowledge', name: 'Knowledge', description: 'The ability to learn, analyze, and share knowledge' },
    { id: 'leadership', name: 'Leadership', description: 'The ability to lead and cast vision' },
    { id: 'mercy', name: 'Mercy', description: 'The ability to show compassion to those in need' },
    { id: 'prophecy', name: 'Prophecy', description: 'The ability to proclaim God\'s truth boldly' },
    { id: 'service', name: 'Service', description: 'The ability to identify and meet practical needs' },
    { id: 'shepherding', name: 'Shepherding', description: 'The ability to nurture and guide others' },
    { id: 'teaching', name: 'Teaching', description: 'The ability to explain scripture and doctrine clearly' },
    { id: 'tongues', name: 'Tongues', description: 'The ability to pray in an unknown language' },
    { id: 'wisdom', name: 'Wisdom', description: 'The ability to apply spiritual knowledge practically' }
  ];

  // Common practical skills
  const commonSkills = [
    'Music - Vocal', 'Music - Instrumental', 'Audio/Visual Tech', 'Graphic Design', 
    'Photography', 'Videography', 'Writing', 'Public Speaking', 'Event Planning', 
    'Childcare', 'Cooking', 'Accounting', 'Web Development', 'Social Media', 
    'Counseling', 'Foreign Language', 'Construction', 'Teaching', 'Medical'
  ];

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    const skillToAdd = {
      skill: newSkill,
      proficiency: newProficiency,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setSkills([...skills, skillToAdd]);
    setNewSkill('');
    setNewProficiency('intermediate');
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleToggleSpiritualGift = (giftId) => {
    if (spiritualGifts.includes(giftId)) {
      setSpiritualGifts(spiritualGifts.filter(id => id !== giftId));
    } else {
      setSpiritualGifts([...spiritualGifts, giftId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave({
        ...member,
        skills,
        spiritualGifts
      });
      
      setIsLoading(false);
      setSuccessMessage('Skills and gifts updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case 'beginner': return 'bg-yellow-100 text-yellow-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-green-100 text-green-800';
      case 'expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            Skills & Gifts: {member.name}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Practical Skills Section */}
            <div>
              <h3 className="text-lg font-medium mb-3">Practical Skills</h3>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Current Skills</label>
                  <div className="text-sm text-gray-500">
                    {skills.length} skill{skills.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {skills.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 max-h-48 overflow-y-auto">
                    {skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{skill.skill}</div>
                          <div className={`text-xs px-2 py-1 rounded-full inline-block ${getProficiencyColor(skill.proficiency)}`}>
                            {skill.proficiency.charAt(0).toUpperCase() + skill.proficiency.slice(1)}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove skill"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                    No skills added yet. Add skills below.
                  </div>
                )}
              </div>

              <div className="p-4 border border-dashed rounded-lg mb-4">
                <h4 className="font-medium mb-2">Add New Skill</h4>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter a skill..."
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Level</label>
                  <select
                    value={newProficiency}
                    onChange={(e) => setNewProficiency(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                
                <button
                  type="button"
                  onClick={handleAddSkill}
                  disabled={!newSkill.trim()}
                  className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <FaPlus className="mr-1" />
                  Add Skill
                </button>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Common Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {commonSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => setNewSkill(skill)}
                      className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Spiritual Gifts Section */}
            <div>
              <h3 className="text-lg font-medium mb-3">Spiritual Gifts</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-3">
                  Select the spiritual gifts that best describe {member.name}'s ministry strengths.
                </p>
                
                <div className="mb-2 text-sm text-gray-500">
                  {spiritualGifts.length} gift{spiritualGifts.length !== 1 ? 's' : ''} selected
                </div>
                
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {spiritualGiftOptions.map((gift) => (
                    <div 
                      key={gift.id} 
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        spiritualGifts.includes(gift.id) 
                          ? 'bg-indigo-50 border border-indigo-200' 
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handleToggleSpiritualGift(gift.id)}
                    >
                      <div className="flex items-center">
                        <div className={`mr-3 ${spiritualGifts.includes(gift.id) ? 'text-indigo-600' : 'text-gray-400'}`}>
                          {spiritualGifts.includes(gift.id) ? <FaCheck /> : <FaStar />}
                        </div>
                        <div>
                          <div className="font-medium">{gift.name}</div>
                          <div className="text-sm text-gray-500">{gift.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
              {successMessage}
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
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
                'Save Skills & Gifts'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillsInventory; 