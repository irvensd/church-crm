import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaCheck, FaTimes, FaSave, FaTrash, FaPlus } from 'react-icons/fa';

const AttendanceTracker = ({ members, onClose, onSave, onDelete, existingRecords = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventName, setEventName] = useState('');
  const [attendance, setAttendance] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [recentEvents, setRecentEvents] = useState(existingRecords.length > 0 ? 
    existingRecords : [
      { id: 1, date: '2023-06-01', name: 'Sunday Service', attendees: 12 },
      { id: 2, date: '2023-06-04', name: 'Bible Study', attendees: 8 },
      { id: 3, date: '2023-06-08', name: 'Prayer Meeting', attendees: 5 },
    ]
  );
  
  // Add common event types for quick selection
  const [commonEventTypes, setCommonEventTypes] = useState([
    'Sunday Service', 
    'Bible Study', 
    'Prayer Meeting', 
    'Youth Group', 
    'Choir Practice',
    'Board Meeting'
  ]);
  
  // Add state for new event type
  const [newEventType, setNewEventType] = useState('');
  const [showAddEventType, setShowAddEventType] = useState(false);

  // Initialize attendance with all members marked as absent
  useEffect(() => {
    const initialAttendance = {};
    members.forEach(member => {
      initialAttendance[member.id] = false;
    });
    setAttendance(initialAttendance);
  }, [members]);

  const handleAttendanceToggle = (memberId) => {
    setAttendance(prev => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  const handleSelectAll = () => {
    const allSelected = {};
    members.forEach(member => {
      allSelected[member.id] = true;
    });
    setAttendance(allSelected);
  };

  const handleSelectNone = () => {
    const noneSelected = {};
    members.forEach(member => {
      noneSelected[member.id] = false;
    });
    setAttendance(noneSelected);
  };

  const handleSaveAttendance = () => {
    if (!eventName.trim()) {
      alert('Please enter an event name');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const attendanceData = {
        id: Date.now(),
        date: selectedDate,
        name: eventName,
        attendance: attendance,
        attendees: Object.values(attendance).filter(Boolean).length
      };
      
      onSave(attendanceData);
      
      // Add to recent events
      setRecentEvents([attendanceData, ...recentEvents]);
      
      // Reset form
      setEventName('');
      handleSelectNone();
      
      setIsLoading(false);
    }, 1000);
  };

  const handleLoadEvent = (event) => {
    setSelectedDate(event.date);
    setEventName(event.name);
    // In a real app, you would load the actual attendance data for this event
  };

  const handleDeleteEvent = (event, e) => {
    e.stopPropagation(); // Prevent event bubbling to parent (which would load the event)
    
    if (window.confirm(`Are you sure you want to delete "${event.name}"?`)) {
      // Remove from local state
      setRecentEvents(recentEvents.filter(e => e.id !== event.id));
      
      // Notify parent component
      if (onDelete) {
        onDelete(event.id);
      }
    }
  };
  
  const handleAddEventType = () => {
    if (newEventType.trim() && !commonEventTypes.includes(newEventType.trim())) {
      setCommonEventTypes([...commonEventTypes, newEventType.trim()]);
      setEventName(newEventType.trim());
      setNewEventType('');
      setShowAddEventType(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Attendance Tracker</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
              <div className="flex">
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g., Sunday Service, Bible Study, etc."
                  className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setShowAddEventType(!showAddEventType)}
                  className="px-3 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                  title="Add to common event types"
                >
                  <FaPlus />
                </button>
              </div>
              
              {/* Common event types */}
              <div className="mt-2 flex flex-wrap gap-2">
                {commonEventTypes.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => setEventName(type)}
                    className={`px-2 py-1 text-xs rounded-full ${
                      eventName === type 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              {/* Add new event type form */}
              {showAddEventType && (
                <div className="mt-3 p-3 border rounded-md bg-gray-50">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Add New Event Type</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={newEventType}
                      onChange={(e) => setNewEventType(e.target.value)}
                      placeholder="Enter new event type"
                      className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleAddEventType}
                      disabled={!newEventType.trim()}
                      className="px-3 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Mark Attendance</h3>
            <div className="space-x-2">
              <button
                onClick={handleSelectAll}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Select All
              </button>
              <button
                onClick={handleSelectNone}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Select None
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-80 overflow-y-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map(member => (
                  <tr key={member.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        {member.photoUrl && (
                          <img 
                            src={member.photoUrl} 
                            alt={member.name} 
                            className="h-8 w-8 rounded-full mr-2 object-cover"
                          />
                        )}
                        <div className="font-medium">{member.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button
                        onClick={() => handleAttendanceToggle(member.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          attendance[member.id] 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {attendance[member.id] ? <FaCheck /> : <FaTimes />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveAttendance}
              disabled={isLoading || !eventName.trim()}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FaSave className="mr-2" />
              )}
              Save Attendance
            </button>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Recent Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentEvents.map(event => (
              <div 
                key={event.id} 
                className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md relative"
                onClick={() => handleLoadEvent(event)}
              >
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-blue-500 mr-2" />
                  <div className="font-medium">{event.name}</div>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Date: {new Date(event.date).toLocaleDateString()}</div>
                  <div>Attendees: {event.attendees}</div>
                </div>
                <button 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                  onClick={(e) => handleDeleteEvent(event, e)}
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker; 