import React from 'react';
import { FiX, FiEdit, FiTrash2, FiCalendar, FiClock, FiMapPin, FiUsers, FiRepeat } from 'react-icons/fi';

const EventDetail = ({ event, onClose, onEdit, onDelete }) => {
  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Get event type label
  const getEventTypeLabel = (type) => {
    const types = {
      service: 'Service',
      meeting: 'Meeting',
      class: 'Class',
      outreach: 'Outreach',
      social: 'Social Event',
      other: 'Other'
    };
    return types[type] || 'Event';
  };

  // Get color class based on event type
  const getEventColorClass = (type) => {
    const colors = {
      service: 'bg-purple-100 text-purple-800',
      meeting: 'bg-blue-100 text-blue-800',
      class: 'bg-green-100 text-green-800',
      outreach: 'bg-yellow-100 text-yellow-800',
      social: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  // Get recurrence pattern text
  const getRecurrenceText = (pattern) => {
    switch (pattern) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'biweekly':
        return 'Every 2 weeks';
      case 'monthly':
        return 'Monthly';
      default:
        return 'One-time event';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Event Type Badge */}
          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventColorClass(event.type)}`}>
              {getEventTypeLabel(event.type)}
            </span>
            
            {event.recurring && (
              <span className="ml-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                Recurring
              </span>
            )}
          </div>
          
          {/* Event Description */}
          {event.description && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-700">{event.description}</p>
            </div>
          )}
          
          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FiCalendar />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">Date</div>
                <div className="text-sm text-gray-500">{formatDate(event.startDate)}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <FiClock />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">Time</div>
                <div className="text-sm text-gray-500">
                  {formatTime(event.startDate)} - {formatTime(event.endDate)}
                </div>
              </div>
            </div>
            
            {event.location && (
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                  <FiMapPin />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Location</div>
                  <div className="text-sm text-gray-500">{event.location}</div>
                </div>
              </div>
            )}
            
            {event.recurring && (
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <FiRepeat />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Recurrence</div>
                  <div className="text-sm text-gray-500">{getRecurrenceText(event.recurrencePattern)}</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Attendees Section */}
          {event.attendees && event.attendees.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <FiUsers className="mr-2" />
                Attendees ({event.attendees.length})
              </h3>
              <div className="flex flex-wrap">
                {event.attendees.map((attendee, index) => (
                  <div key={index} className="mr-2 mb-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {attendee.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              onClick={() => onDelete(event.id)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center"
            >
              <FiTrash2 className="mr-2" />
              Delete
            </button>
            <button
              onClick={() => onEdit(event)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <FiEdit className="mr-2" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail; 