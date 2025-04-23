import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, 
  FiFilter, 
  FiPlus, 
  FiClock, 
  FiMapPin, 
  FiUsers, 
  FiX, 
  FiDownload,
  FiBarChart2,
  FiRepeat,
  FiSettings
} from 'react-icons/fi';
import EventForm from '../components/EventForm';
import EventDetail from '../components/EventDetail';
import { generateDummyEvents } from '../utils/dummyEvents';
import PageLayout from '../components/PageLayout';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list', 'grid', 'calendar'
  const [searchQuery, setSearchQuery] = useState('');
  const [showStats, setShowStats] = useState(false);

  // Load dummy events
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(generateDummyEvents());
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter events based on type and search query
  const filteredEvents = events.filter(event => {
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Calculate event statistics
  const eventStats = {
    total: events.length,
    byType: events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {}),
    upcoming: events.filter(event => new Date(event.startDate) > new Date()).length,
    recurring: events.filter(event => event.recurring).length
  };

  // Handle add new event
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  // Handle edit event
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  // Handle delete event
  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  // Handle export events
  const handleExport = () => {
    // Implement export functionality
    alert('Export feature coming soon!');
  };

  return (
    <PageLayout 
      title="Events" 
      subtitle="Manage church events and activities"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Search and Filter */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Events</option>
              <option value="service">Services</option>
              <option value="meeting">Meetings</option>
              <option value="class">Classes</option>
              <option value="outreach">Outreach</option>
              <option value="social">Social</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* View Mode and Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="List View"
            >
              <FiCalendar />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="Grid View"
            >
              <FiSettings />
            </button>
            <button
              onClick={() => setShowStats(!showStats)}
              className={`p-2 rounded-lg ${showStats ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="Show Statistics"
            >
              <FiBarChart2 />
            </button>
            <button
              onClick={handleExport}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Export Events"
            >
              <FiDownload />
            </button>
            <button
              onClick={handleAddEvent}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FiPlus className="mr-2" /> Add Event
            </button>
          </div>
        </div>
      </div>

      {/* Event Statistics */}
      {showStats && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Event Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{eventStats.total}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{eventStats.upcoming}</div>
              <div className="text-sm text-gray-600">Upcoming Events</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{eventStats.recurring}</div>
              <div className="text-sm text-gray-600">Recurring Events</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {Object.keys(eventStats.byType).length}
              </div>
              <div className="text-sm text-gray-600">Event Types</div>
            </div>
          </div>
        </div>
      )}

      {/* Events List/Grid View */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {viewMode === 'list' ? (
          <div className="divide-y">
            {filteredEvents.map(event => (
              <div 
                key={event.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleEditEvent(event)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FiCalendar className="mr-1" />
                        {new Date(event.startDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <FiClock className="mr-1" />
                        {event.startTime} - {event.endTime}
                      </span>
                      <span className="flex items-center">
                        <FiMapPin className="mr-1" />
                        {event.location}
                      </span>
                      <span className="flex items-center">
                        <FiUsers className="mr-1" />
                        {event.attendees} attendees
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {event.recurring && (
                      <span className="text-blue-600">
                        <FiRepeat />
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      event.type === 'service' ? 'bg-purple-100 text-purple-800' :
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'class' ? 'bg-green-100 text-green-800' :
                      event.type === 'outreach' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredEvents.map(event => (
              <div 
                key={event.id}
                className="border rounded-lg p-4 hover:shadow-md cursor-pointer"
                onClick={() => handleEditEvent(event)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{event.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    event.type === 'service' ? 'bg-purple-100 text-purple-800' :
                    event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'class' ? 'bg-green-100 text-green-800' :
                    event.type === 'outreach' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" />
                    {new Date(event.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-2" />
                    {event.startTime} - {event.endTime}
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="mr-2" />
                    {event.attendees} attendees
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Form Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {selectedEvent ? `Edit Event: ${selectedEvent.title}` : 'Add New Event'}
              </h2>
              <button onClick={() => setShowEventModal(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <EventForm 
                event={selectedEvent}
                onSave={(eventData) => {
                  if (eventData.id) {
                    setEvents(events.map(e => e.id === eventData.id ? eventData : e));
                  } else {
                    setEvents([...events, { ...eventData, id: Date.now() }]);
                  }
                  setShowEventModal(false);
                }}
                onCancel={() => setShowEventModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && !showEventModal && (
        <EventDetail
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </PageLayout>
  );
};

export default Events; 