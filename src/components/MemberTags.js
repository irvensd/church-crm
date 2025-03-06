import React, { useState } from 'react';
import { FaPlus, FaTimes, FaTag } from 'react-icons/fa';

const MemberTags = ({ tags = [], selectedTags = [], onTagSelect, onTagCreate, onTagDelete, readOnly = false }) => {
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3B82F6'); // Default blue
  const [isAddingTag, setIsAddingTag] = useState(false);

  const colorOptions = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Yellow', value: '#F59E0B' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Indigo', value: '#6366F1' },
  ];

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      onTagCreate({ id: Date.now(), name: newTagName.trim(), color: newTagColor });
      setNewTagName('');
      setIsAddingTag(false);
    }
  };

  const handleTagSelect = (tagId) => {
    if (readOnly) return;
    onTagSelect(tagId);
  };

  return (
    <div className="space-y-2">
      {!readOnly && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <div 
              key={tag.id}
              onClick={() => handleTagSelect(tag.id)}
              className={`px-2 py-1 rounded-full text-xs font-medium flex items-center cursor-pointer transition-colors
                ${selectedTags.includes(tag.id) 
                  ? 'text-white' 
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
              style={selectedTags.includes(tag.id) ? { backgroundColor: tag.color } : {}}
            >
              <FaTag className="mr-1" />
              {tag.name}
            </div>
          ))}
        </div>
      )}

      {readOnly && selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tagId => {
            const tag = tags.find(t => t.id === tagId);
            if (!tag) return null;
            return (
              <div 
                key={tag.id}
                className="px-2 py-1 rounded-full text-xs font-medium text-white flex items-center"
                style={{ backgroundColor: tag.color }}
              >
                <FaTag className="mr-1" />
                {tag.name}
              </div>
            );
          })}
        </div>
      )}

      {!readOnly && !isAddingTag && (
        <button
          onClick={() => setIsAddingTag(true)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <FaPlus className="mr-1" /> Add Tag
        </button>
      )}

      {!readOnly && isAddingTag && (
        <div className="p-3 border rounded-md bg-gray-50">
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Tag name"
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setIsAddingTag(false)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map(color => (
                <div
                  key={color.value}
                  onClick={() => setNewTagColor(color.value)}
                  className={`w-6 h-6 rounded-full cursor-pointer ${newTagColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                ></div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleCreateTag}
            disabled={!newTagName.trim()}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Create Tag
          </button>
        </div>
      )}
    </div>
  );
};

export default MemberTags; 