import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiPlus, FiFilter, FiSearch, FiGrid, FiList } from 'react-icons/fi';
import { 
  FaChurch, 
  FaCalendarAlt, 
  FaRegCalendarCheck, 
  FaPray, 
  FaHandsHelping, 
  FaBook, 
  FaUsers, 
  FaChild, 
  FaMusic, 
  FaClipboardList 
} from 'react-icons/fa';
import { generateDummyEvents } from '../utils/dummyEvents';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import PageLayout from '../components/PageLayout';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar', 'list', 'grid'
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('upcoming');

  // Generate dummy events
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(generateDummyEvents());
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter events based on search and filter
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const now = new Date();
    const eventDate = new Date(event.startDate);
    const isUpcoming = eventDate >= now;
    
    const matchesFilter = filterValue === 'all' || 
                         (filterValue === 'upcoming' && isUpcoming) ||
                         (filterValue === 'past' && !isUpcoming) ||
                         (filterValue === event.type);
    
    return matchesSearch && matchesFilter;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle filter
  const toggleFilter = (value) => {
    setFilterValue(value);
  };

  // Handle add new event
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setShowEventForm(true);
  };

  // Handle edit event
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  // Handle save event
  const handleSaveEvent = (eventData) => {
    // Show loading state
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (eventData.id) {
        // For existing events, we need to check if it's a recurring instance
        const originalId = typeof eventData.id === 'string' && eventData.id.includes('-') 
          ? eventData.id.split('-')[0] 
          : eventData.id;
        
        // Update the event in the events array
        setEvents(events.map(e => e.id === originalId ? {
          ...eventData,
          id: originalId // Ensure we keep the original ID
        } : e));
      } else {
        // Add new event with a unique ID
        const newEvent = {
          ...eventData,
          id: Date.now(),
        };
        setEvents([...events, newEvent]);
      }
      
      // Hide the form and loading state
      setShowEventForm(false);
      setIsLoading(false);
      
      // Show success message (optional)
      alert('Event saved successfully!');
    }, 500);
  };

  // Handle delete event
  const handleDeleteEvent = (eventId) => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to delete this event?')) {
      setIsLoading(true);
      
      // Extract the original ID if it's a recurring instance
      const originalId = typeof eventId === 'string' && eventId.includes('-') 
        ? eventId.split('-')[0] 
        : eventId;
      
      // Remove the event from the events array
      setTimeout(() => {
        setEvents(events.filter(e => e.id !== originalId));
        setIsLoading(false);
        
        // Show success message (optional)
        alert('Event deleted successfully!');
      }, 500);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get event type icon
  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'worship':
        return <FaChurch className="text-purple-500" />;
      case 'youth':
        return <FiUsers className="text-blue-500" />;
      case 'prayer':
        return <FaPray className="text-green-500" />;
      case 'outreach':
        return <FaHandsHelping className="text-orange-500" />;
      case 'study':
        return <FaBook className="text-indigo-500" />;
      case 'fellowship':
        return <FaUsers className="text-yellow-500" />;
      case 'children':
        return <FaChild className="text-pink-500" />;
      case 'music':
        return <FaMusic className="text-red-500" />;
      case 'meeting':
        return <FaClipboardList className="text-gray-500" />;
      default:
        return <FaCalendarAlt className="text-blue-500" />;
    }
  };

  // Actions for the page header
  const pageActions = (
    <>
      {/* Removed duplicate Create Event button */}
    </>
  );

  return (
    <PageLayout 
      title="Events" 
      subtitle="Manage your church's events and activities"
      actions={pageActions}
    >
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Church Events</h1>
        <button
          onClick={handleAddEvent}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" />
          Schedule Event
        </button>
      </div>

      {/* Event Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Total Events</p>
          <p className="text-2xl font-bold">{events.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Upcoming Events</p>
          <p className="text-2xl font-bold">
            {events.filter(e => new Date(e.startDate) > new Date()).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-2xl font-bold">
            {events.filter(e => {
              const eventDate = new Date(e.startDate);
              const now = new Date();
              return eventDate.getMonth() === now.getMonth() && 
                     eventDate.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Recurring Events</p>
          <p className="text-2xl font-bold">
            {events.filter(e => e.recurring).length}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <button
              className={`px-3 py-2 rounded-lg ${viewMode === 'calendar' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('calendar')}
            >
              <FaCalendarAlt className="inline mr-2" />
              Calendar
            </button>
            <button
              className={`px-3 py-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('list')}
            >
              <FiList className="inline mr-2" />
              List
            </button>
            <button
              className={`px-3 py-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid className="inline mr-2" />
              Grid
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                className="appearance-none px-4 py-2 rounded-lg border bg-white text-gray-700 pr-8"
                value={filterValue}
                onChange={(e) => toggleFilter(e.target.value)}
              >
                <option value="upcoming">Upcoming Events</option>
                <option value="past">Past Events</option>
                <option value="all">All Events</option>
                <option value="worship">Worship Services</option>
                <option value="youth">Youth Events</option>
                <option value="prayer">Prayer Meetings</option>
                <option value="outreach">Outreach Events</option>
                <option value="study">Bible Studies</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="p-8 text-center">
              <FaCalendarAlt className="text-gray-400 text-5xl mx-auto mb-4" />
              <p className="text-gray-600">No events found. Try adjusting your filters or create a new event.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organizer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500">{event.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(event.startDate)}</div>
                      <div className="text-sm text-gray-500">
                        {event.recurring && `Recurring (${event.recurrencePattern})`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.organizer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        event.status === 'tentative' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEditEvent(event)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Events Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.type}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-2 text-gray-400" />
                    {formatDate(event.startDate)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiMapPin className="mr-2 text-gray-400" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiUsers className="mr-2 text-gray-400" />
                    {event.organizer} ({event.attendees} attendees)
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <div>
                    {event.recurring && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <FaRegCalendarCheck className="mr-1" />
                        Recurring
                      </span>
                    )}
                  </div>
                  <div>
                    <button 
                      onClick={() => handleEditEvent(event)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <EventCalendar 
          events={filteredEvents} 
          onEventClick={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}

      {/* Event Form Modal - Placeholder */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {selectedEvent ? `Edit Event: ${selectedEvent.title}` : 'Schedule New Event'}
              </h2>
              <button onClick={() => setShowEventForm(false)} className="text-gray-500 hover:text-gray-700">
                <FiPlus className="transform rotate-45" size={24} />
              </button>
            </div>
            <div className="p-6">
              <EventForm 
                event={selectedEvent} 
                onSave={handleSaveEvent} 
                onCancel={() => setShowEventForm(false)} 
              />
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Events; 