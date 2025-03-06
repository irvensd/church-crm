import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';

const EventCalendar = ({ events, onEventClick, onDeleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  
  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Day names for display
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Fixed version of the generateRecurringEventInstances function
  const generateRecurringEventInstances = (events, year, month) => {
    // Create a completely new array to avoid any reference issues
    const result = [];
    
    // Create a map to track which dates already have events
    const eventDateMap = new Map();
    
    // First, process all non-recurring events
    events.forEach(event => {
      if (!event.isRecurringInstance) {
        const eventDate = new Date(event.startDate);
        const dateKey = `${event.id}-${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;
        
        // Add to result and mark this date as having this event
        result.push(event);
        eventDateMap.set(dateKey, true);
      }
    });
    
    // Then, generate recurring instances only for original recurring events
    const recurringEvents = events.filter(event => event.recurring && !event.isRecurringInstance);
    
    recurringEvents.forEach(event => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate);
      const duration = eventEndDate - eventStartDate; // Duration in milliseconds
      
      // Skip if the original event is already in this month
      const originalDateKey = `${event.id}-${eventStartDate.getFullYear()}-${eventStartDate.getMonth()}-${eventStartDate.getDate()}`;
      
      // Generate instances based on recurrence pattern
      switch (event.recurrencePattern) {
        case 'daily':
          // Generate daily instances for the month
          for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
            const instanceDate = new Date(year, month, day, 
              eventStartDate.getHours(), eventStartDate.getMinutes());
            
            // Skip if this date already has this event
            const dateKey = `${event.id}-${instanceDate.getFullYear()}-${instanceDate.getMonth()}-${instanceDate.getDate()}`;
            if (eventDateMap.has(dateKey)) {
              // Skip this iteration
            } else if (instanceDate < eventStartDate) {
              // Skip if this is before the original event date
            } else {
              const instanceEndDate = new Date(instanceDate.getTime() + duration);
              
              result.push({
                ...event,
                id: `${event.id}-${instanceDate.toISOString()}`,
                startDate: instanceDate.toISOString(),
                endDate: instanceEndDate.toISOString(),
                isRecurringInstance: true
              });
              
              // Mark this date as having this event
              eventDateMap.set(dateKey, true);
            }
          }
          break;
          
        case 'weekly':
          // Generate weekly instances for the month
          const dayOfWeek = eventStartDate.getDay();
          
          // Find the first occurrence of this day of week in the month
          let firstOccurrence = new Date(year, month, 1);
          while (firstOccurrence.getDay() !== dayOfWeek) {
            firstOccurrence.setDate(firstOccurrence.getDate() + 1);
          }
          
          // Generate all weekly occurrences in the month
          for (let day = firstOccurrence.getDate(); day <= new Date(year, month + 1, 0).getDate(); day += 7) {
            const instanceDate = new Date(year, month, day, 
              eventStartDate.getHours(), eventStartDate.getMinutes());
            
            // Skip if this date already has this event
            const dateKey = `${event.id}-${instanceDate.getFullYear()}-${instanceDate.getMonth()}-${instanceDate.getDate()}`;
            if (eventDateMap.has(dateKey)) {
              // Skip this iteration
            } else if (instanceDate < eventStartDate) {
              // Skip if this is before the original event date
            } else {
              const instanceEndDate = new Date(instanceDate.getTime() + duration);
              
              result.push({
                ...event,
                id: `${event.id}-${instanceDate.toISOString()}`,
                startDate: instanceDate.toISOString(),
                endDate: instanceEndDate.toISOString(),
                isRecurringInstance: true
              });
              
              // Mark this date as having this event
              eventDateMap.set(dateKey, true);
            }
          }
          break;
          
        case 'monthly':
          // Get the day of month from the original event
          const dayOfMonth = eventStartDate.getDate();
          
          // Only create an instance if this month should have this event
          if (dayOfMonth <= new Date(year, month + 1, 0).getDate()) {
            const instanceDate = new Date(year, month, dayOfMonth,
              eventStartDate.getHours(), eventStartDate.getMinutes());
            
            // Skip if this date already has this event
            const dateKey = `${event.id}-${instanceDate.getFullYear()}-${instanceDate.getMonth()}-${instanceDate.getDate()}`;
            if (eventDateMap.has(dateKey)) {
              // Skip this iteration
            } else if (instanceDate < eventStartDate) {
              // Skip if this is before the original event date
            } else {
              const instanceEndDate = new Date(instanceDate.getTime() + duration);
              
              result.push({
                ...event,
                id: `${event.id}-${instanceDate.toISOString()}`,
                startDate: instanceDate.toISOString(),
                endDate: instanceEndDate.toISOString(),
                isRecurringInstance: true
              });
              
              // Mark this date as having this event
              eventDateMap.set(dateKey, true);
            }
          }
          break;
          
        case 'yearly':
          // Only create an instance if this is the anniversary month and year is after or same as original
          if (month === eventStartDate.getMonth() && year >= eventStartDate.getFullYear()) {
            const instanceDate = new Date(year, month, eventStartDate.getDate(),
              eventStartDate.getHours(), eventStartDate.getMinutes());
            
            // Skip if this date already has this event
            const dateKey = `${event.id}-${instanceDate.getFullYear()}-${instanceDate.getMonth()}-${instanceDate.getDate()}`;
            if (eventDateMap.has(dateKey)) {
              // Skip this iteration
            } else if (instanceDate.getFullYear() === eventStartDate.getFullYear() &&
                instanceDate.getMonth() === eventStartDate.getMonth() &&
                instanceDate.getDate() === eventStartDate.getDate()) {
              // Skip if this is the original event date
            } else {
              const instanceEndDate = new Date(instanceDate.getTime() + duration);
              
              result.push({
                ...event,
                id: `${event.id}-${instanceDate.toISOString()}`,
                startDate: instanceDate.toISOString(),
                endDate: instanceEndDate.toISOString(),
                isRecurringInstance: true
              });
              
              // Mark this date as having this event
              eventDateMap.set(dateKey, true);
            }
          }
          break;
          
        default:
          break;
      }
    });
    
    return result;
  };
  
  // Update the useEffect that generates calendar days to include recurring events
  useEffect(() => {
    const days = [];
    
    // First day of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    
    // Last day of the month
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
    // First day of the calendar (might be in the previous month)
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    // Last day of the calendar (might be in the next month)
    const endDate = new Date(lastDayOfMonth);
    if (endDate.getDay() < 6) {
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    }
    
    // Generate all days in the calendar
    let currentDay = new Date(startDate);
    while (currentDay <= endDate) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    setCalendarDays(days);
  }, [currentMonth, currentYear]);
  
  // Add a state for expanded events
  const [expandedEvents, setExpandedEvents] = useState([]);
  
  // Update the getEventsForDay function
  const getEventsForDay = (day) => {
    // Generate recurring event instances for the current month
    const allEvents = generateRecurringEventInstances(events, currentYear, currentMonth);
    
    // Get events for this day
    return allEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  };
  
  // Add a function to handle clicking on "more events"
  const handleMoreEventsClick = (day) => {
    const isExpanded = expandedEvents.some(d => 
      d.getDate() === day.getDate() && 
      d.getMonth() === day.getMonth() && 
      d.getFullYear() === day.getFullYear()
    );
    
    if (isExpanded) {
      setExpandedEvents(expandedEvents.filter(d => 
        !(d.getDate() === day.getDate() && 
          d.getMonth() === day.getMonth() && 
          d.getFullYear() === day.getFullYear())
      ));
    } else {
      setExpandedEvents([...expandedEvents, day]);
    }
  };
  
  // Check if a day is today
  const isToday = (day) => {
    const today = new Date();
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  };
  
  // Check if a day is in the current month
  const isCurrentMonth = (day) => {
    return day.getMonth() === currentMonth;
  };
  
  // Add a useEffect to refresh the calendar when events change
  useEffect(() => {
    // Force a re-render when events change
    setExpandedEvents([]);
  }, [events]);
  
  // Add a state for the context menu
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    event: null
  });
  
  // Add a function to handle right-click on events
  const handleEventRightClick = (e, event) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      event: event
    });
  };
  
  // Add a function to close the context menu
  const closeContextMenu = () => {
    setContextMenu({
      visible: false,
      x: 0,
      y: 0,
      event: null
    });
  };
  
  // Add a useEffect to close the context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.visible) {
        closeContextMenu();
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button 
            onClick={goToToday}
            className="ml-4 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
          >
            Today
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={goToPreviousMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FiChevronLeft />
          </button>
          <button 
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day, index) => (
            <div 
              key={index} 
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDay(day);
            const isExpanded = expandedEvents.some(d => 
              d.getDate() === day.getDate() && 
              d.getMonth() === day.getMonth() && 
              d.getFullYear() === day.getFullYear()
            );
            
            return (
              <div 
                key={index} 
                className={`min-h-[100px] border rounded-lg p-2 ${
                  isToday(day) 
                    ? 'bg-blue-50 border-blue-200' 
                    : isCurrentMonth(day)
                      ? 'bg-white'
                      : 'bg-gray-50 text-gray-400'
                }`}
              >
                <div className="text-right font-medium text-sm mb-1">
                  {day.getDate()}
                </div>
                
                {/* Events for this day */}
                <div className="space-y-1">
                  {(isExpanded ? dayEvents : dayEvents.slice(0, 3)).map((event, eventIndex) => (
                    <div 
                      key={eventIndex}
                      onClick={() => onEventClick(event.isRecurringInstance ? {...event, id: event.id.split('-')[0]} : event)}
                      onContextMenu={(e) => handleEventRightClick(e, event)}
                      className={`text-xs p-1 rounded truncate cursor-pointer ${
                        event.type === 'worship' ? 'bg-purple-100 text-purple-800' :
                        event.type === 'youth' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'prayer' ? 'bg-green-100 text-green-800' :
                        event.type === 'outreach' ? 'bg-orange-100 text-orange-800' :
                        event.type === 'study' ? 'bg-indigo-100 text-indigo-800' :
                        event.type === 'fellowship' ? 'bg-yellow-100 text-yellow-800' :
                        event.type === 'children' ? 'bg-pink-100 text-pink-800' :
                        event.type === 'music' ? 'bg-red-100 text-red-800' :
                        event.type === 'meeting' ? 'bg-gray-100 text-gray-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                  
                  {/* Show indicator if there are more events */}
                  {!isExpanded && dayEvents.length > 3 && (
                    <div 
                      className="text-xs text-blue-600 text-center cursor-pointer hover:underline"
                      onClick={() => handleMoreEventsClick(day)}
                    >
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                  
                  {/* Show less button if expanded */}
                  {isExpanded && dayEvents.length > 3 && (
                    <div 
                      className="text-xs text-blue-600 text-center cursor-pointer hover:underline"
                      onClick={() => handleMoreEventsClick(day)}
                    >
                      Show less
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Context Menu */}
      {contextMenu.visible && (
        <div 
          className="fixed bg-white rounded-md shadow-lg z-50 py-1"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button 
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              onEventClick(contextMenu.event.isRecurringInstance ? 
                {...contextMenu.event, id: contextMenu.event.id.split('-')[0]} : 
                contextMenu.event
              );
              closeContextMenu();
            }}
          >
            Edit
          </button>
          <button 
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={() => {
              const eventId = contextMenu.event.isRecurringInstance ? 
                contextMenu.event.id.split('-')[0] : 
                contextMenu.event.id;
              
              // Call the delete function from props
              if (typeof onDeleteEvent === 'function') {
                onDeleteEvent(eventId);
              }
              closeContextMenu();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCalendar; 