import React, { useState } from 'react';
import { FaTimes, FaSave, FaPhone, FaEnvelope, FaComments, FaCalendarAlt, FaTrash, FaPlus } from 'react-icons/fa';

const CommunicationLog = ({ member, onClose, onSave, existingLogs = [] }) => {
  const [logs, setLogs] = useState(existingLogs);
  const [newLog, setNewLog] = useState({
    type: 'phone',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLog({
      ...newLog,
      [name]: value,
    });
  };

  const handleAddLog = () => {
    if (!newLog.notes.trim()) {
      alert('Please enter notes for this communication');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const logEntry = {
        id: Date.now(),
        type: newLog.type,
        date: newLog.date,
        time: newLog.time,
        notes: newLog.notes,
        memberId: member.id,
        memberName: member.name,
      };

      const updatedLogs = [logEntry, ...logs];
      setLogs(updatedLogs);
      
      // Reset form
      setNewLog({
        type: 'phone',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].slice(0, 5),
        notes: '',
      });
      
      setIsLoading(false);
      
      // Notify parent component
      onSave(updatedLogs);
    }, 500);
  };

  const handleDeleteLog = (logId) => {
    if (window.confirm('Are you sure you want to delete this communication log?')) {
      const updatedLogs = logs.filter(log => log.id !== logId);
      setLogs(updatedLogs);
      onSave(updatedLogs);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'phone':
        return <FaPhone className="text-blue-500" />;
      case 'email':
        return <FaEnvelope className="text-green-500" />;
      case 'meeting':
        return <FaCalendarAlt className="text-purple-500" />;
      case 'other':
        return <FaComments className="text-orange-500" />;
      default:
        return <FaComments className="text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Communication Log: {member.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-4">Add New Communication</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  name="type"
                  value={newLog.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newLog.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={newLog.time}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={newLog.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter details about this communication..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddLog}
                disabled={isLoading || !newLog.notes.trim()}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FaPlus className="mr-2" />
                )}
                Add Communication
              </button>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-4">Communication History</h3>
          {logs.length > 0 ? (
            <div className="space-y-4">
              {logs.map(log => (
                <div key={log.id} className="border rounded-lg p-4 relative hover:shadow-md transition">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-gray-100 mr-4">
                      {getTypeIcon(log.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium">
                          {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(`${log.date}T${log.time}`).toLocaleString()}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700 whitespace-pre-wrap">{log.notes}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 border rounded-lg">
              <FaComments className="mx-auto text-4xl mb-2" />
              <p>No communication logs yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationLog; 