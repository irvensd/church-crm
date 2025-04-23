import React, { useState, useEffect, useRef } from 'react';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiCalendar, 
  FiFilter, 
  FiPlus, 
  FiClock, 
  FiMapPin, 
  FiUsers, 
  FiX, 
  FiPrinter,
  FiShare2,
  FiBell,
  FiRefreshCw
} from 'react-icons/fi';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import EventDetail from '../components/EventDetail';
import { generateDummyEvents } from '../utils/dummyEvents';
import PageLayout from '../components/PageLayout';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [showAvailability, setShowAvailability] = useState(false);
  const calendarRef = useRef(null);

  // Load dummy events
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(generateDummyEvents());
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter events based on type
  const filteredEvents = filterType === 'all' 
    ? events 
    : events.filter(event => event.type === filterType);

  // Handle event click in calendar
  const handleEventClick = (event) => {
    setSelectedEvent(event);
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

  // Handle print calendar
  const handlePrint = () => {
    window.print();
  };

  // Handle share calendar
  const handleShare = () => {
    // Implement calendar sharing functionality
    alert('Calendar sharing feature coming soon!');
  };

  // Handle refresh calendar
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setEvents(generateDummyEvents());
      setIsLoading(false);
    }, 800);
  };

  return (
    <PageLayout 
      title="Calendar" 
      subtitle="View and manage your schedule"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              className={`px-3 py-2 rounded-lg ${viewMode === 'month' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('month')}
            >
              Month
            </button>
            <button
              className={`px-3 py-2 rounded-lg ${viewMode === 'week' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('week')}
            >
              Week
            </button>
            <button
              className={`px-3 py-2 rounded-lg ${viewMode === 'day' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('day')}
            >
              Day
            </button>
          </div>

          {/* Calendar Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Print Calendar"
            >
              <FiPrinter />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Share Calendar"
            >
              <FiShare2 />
            </button>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Refresh Calendar"
            >
              <FiRefreshCw />
            </button>
            <button
              onClick={() => setShowAvailability(!showAvailability)}
              className={`p-2 rounded-lg ${showAvailability ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="Show Availability"
            >
              <FiUsers />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <EventCalendar 
          events={filteredEvents}
          onEventClick={handleEventClick}
          onDeleteEvent={handleDeleteEvent}
          viewMode={viewMode}
          showAvailability={showAvailability}
        />
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

export default Calendar; 