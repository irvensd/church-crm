import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiCalendar, FiFilter, FiPlus, FiClock, FiMapPin, FiUsers, FiX, FiPrinter } from 'react-icons/fi';
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
  };

  // Handle save event
  const handleSaveEvent = (eventData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (eventData.id) {
        // Update existing event
        setEvents(events.map(event => 
          event.id === eventData.id ? eventData : event
        ));
      } else {
        // Add new event with generated ID
        const newEvent = {
          ...eventData,
          id: Date.now().toString(),
        };
        setEvents([...events, newEvent]);
      }
      
      setShowEventModal(false);
      setIsLoading(false);
    }, 1000);
  };

  // Handle delete event
  const handleDeleteEvent = (eventId) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setEvents(events.filter(event => event.id !== eventId));
      setSelectedEvent(null);
      setIsLoading(false);
    }, 1000);
  };

  // Calendar navigation functions
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true });
    }
    
    return days;
  };

  // Get events for a specific day
  const getEventsForDay = (day) => {
    if (!day) return [];
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === month && 
             eventDate.getFullYear() === year;
    });
  };

  // Handle print calendar
  const handlePrintCalendar = () => {
    // Create a print-specific stylesheet
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #calendar-container, #calendar-container * {
          visibility: visible;
        }
        #calendar-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none !important;
        }
        .calendar-day {
          min-height: 120px;
          height: auto !important;
        }
        .calendar-events {
          max-height: none !important;
          overflow: visible !important;
        }
        .calendar-header {
          font-size: 24px !important;
          text-align: center;
          margin-bottom: 20px;
        }
      }
    `;
    document.head.appendChild(style);

    // Print the calendar
    window.print();

    // Remove the style after printing
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1000);
  };

  // Actions for the page header
  const pageActions = (
    <>
      <button 
        onClick={handleAddEvent}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <FiPlus className="mr-2" /> Add Event
      </button>
    </>
  );

  return (
    <PageLayout 
      title="Calendar" 
      subtitle="View and manage your church's schedule"
      actions={pageActions}
    >
      {/* Calendar Navigation */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100 no-print"
          >
            <FiChevronLeft />
          </button>
          <h2 className="text-lg font-medium calendar-header">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100 no-print"
          >
            <FiChevronRight />
          </button>
        </div>
        <div className="flex items-center space-x-2 no-print">
          <button 
            onClick={goToToday}
            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Today
          </button>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Events</option>
            <option value="service">Services</option>
            <option value="meeting">Meetings</option>
            <option value="class">Classes</option>
            <option value="outreach">Outreach</option>
            <option value="social">Social</option>
            <option value="other">Other</option>
          </select>
          <button 
            onClick={handlePrintCalendar}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 flex items-center"
          >
            <FiPrinter className="mr-2" /> Print
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64 no-print">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Calendar View */}
      {!isLoading && (
        <div id="calendar-container" className="bg-white rounded-lg shadow-sm overflow-hidden" ref={calendarRef}>
          <div className="grid grid-cols-7 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index} className="py-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 grid-rows-6 h-screen max-h-[800px]">
            {generateCalendarDays().map((dayObj, index) => {
              const { day, isCurrentMonth } = dayObj;
              const today = new Date();
              const isToday = day === today.getDate() && 
                             currentMonth.getMonth() === today.getMonth() && 
                             currentMonth.getFullYear() === today.getFullYear();
              
              const dayEvents = getEventsForDay(day);
              
              return (
                <div 
                  key={index} 
                  className={`border p-1 calendar-day ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                  } ${
                    isToday ? 'bg-blue-50' : ''
                  }`}
                >
                  {day && (
                    <>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm font-medium ${
                          isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                        }`}>
                          {day}
                        </span>
                        {isCurrentMonth && (
                          <button 
                            onClick={handleAddEvent}
                            className="text-gray-400 hover:text-gray-600 no-print"
                          >
                            <FiPlus size={14} />
                          </button>
                        )}
                      </div>
                      <div className="space-y-1 overflow-y-auto max-h-24 calendar-events">
                        {dayEvents.map(event => (
                          <div 
                            key={event.id}
                            onClick={() => handleEditEvent(event)}
                            className={`text-xs p-1 rounded truncate cursor-pointer ${
                              event.type === 'worship' ? 'bg-purple-100 text-purple-800' :
                              event.type === 'youth' ? 'bg-blue-100 text-blue-800' :
                              event.type === 'prayer' ? 'bg-green-100 text-green-800' :
                              event.type === 'outreach' ? 'bg-orange-100 text-orange-800' :
                              event.type === 'study' ? 'bg-indigo-100 text-indigo-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Event Details Sidebar - would be shown when an event is selected */}
      {selectedEvent && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 overflow-y-auto no-print">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Event Details</h3>
            <button 
              onClick={() => setSelectedEvent(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-xl font-medium">{selectedEvent.title}</h4>
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mt-1">
                {selectedEvent.type}
              </span>
            </div>
            
            <p className="text-gray-600">{selectedEvent.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <FiCalendar className="mr-2 text-gray-400" />
                {formatDate(selectedEvent.startDate)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FiClock className="mr-2 text-gray-400" />
                {selectedEvent.startTime} - {selectedEvent.endTime}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FiMapPin className="mr-2 text-gray-400" />
                {selectedEvent.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FiUsers className="mr-2 text-gray-400" />
                {selectedEvent.organizer} ({selectedEvent.attendees} attendees)
              </div>
            </div>
            
            <div className="pt-4 border-t flex space-x-2">
              <button 
                onClick={() => handleEditEvent(selectedEvent)}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteEvent(selectedEvent.id)}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Calendar; 