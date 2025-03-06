import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaBirthdayCake, FaTimes } from 'react-icons/fa';

const BirthdayCalendar = ({ members, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarDays, setCalendarDays] = useState([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    generateCalendarDays();
    findUpcomingBirthdays();
  }, [currentMonth, currentYear, members]);

  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, birthdays: [] });
    }
    
    // Add days of the month with birthdays
    for (let day = 1; day <= daysInMonth; day++) {
      const birthdays = members.filter(member => {
        if (!member.birthday) return false;
        const birthDate = new Date(member.birthday);
        return birthDate.getMonth() === currentMonth && birthDate.getDate() === day;
      });
      
      days.push({ day, birthdays });
    }
    
    setCalendarDays(days);
  };

  const findUpcomingBirthdays = () => {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    
    const upcoming = members
      .filter(member => member.birthday)
      .map(member => {
        const birthDate = new Date(member.birthday);
        const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        
        // If birthday has passed this year, use next year's birthday
        if (thisYearBirthday < today) {
          thisYearBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        const daysUntil = Math.ceil((thisYearBirthday - today) / (1000 * 60 * 60 * 24));
        const age = thisYearBirthday.getFullYear() - birthDate.getFullYear();
        
        return {
          ...member,
          daysUntil,
          upcomingAge: age,
          upcomingDate: thisYearBirthday
        };
      })
      .filter(member => member.daysUntil <= 30) // Only show birthdays in the next 30 days
      .sort((a, b) => a.daysUntil - b.daysUntil);
    
    setUpcomingBirthdays(upcoming);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatBirthday = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Birthday Calendar</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handlePrevMonth}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              &lt; Prev
            </button>
            <h3 className="text-xl font-medium">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={handleNextMonth}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Next &gt;
            </button>
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((dayData, index) => (
                <div
                  key={index}
                  className={`min-h-24 border rounded-lg p-2 ${
                    dayData.day ? 'bg-white' : 'bg-gray-100'
                  } ${
                    dayData.birthdays.length > 0 ? 'border-blue-300' : 'border-gray-200'
                  }`}
                >
                  {dayData.day && (
                    <>
                      <div className="text-right text-sm font-medium">{dayData.day}</div>
                      <div className="mt-1">
                        {dayData.birthdays.map(member => (
                          <div
                            key={member.id}
                            className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1 mb-1 flex items-center"
                          >
                            <FaBirthdayCake className="mr-1" />
                            {member.name} ({calculateAge(member.birthday)})
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <FaBirthdayCake className="mr-2 text-blue-500" />
              Upcoming Birthdays
            </h3>
            {upcomingBirthdays.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingBirthdays.map(member => (
                  <div key={member.id} className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                        <FaBirthdayCake className="text-blue-500" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">
                        {formatBirthday(member.birthday)} ({member.daysUntil} days)
                      </div>
                      <div className="text-xs text-blue-600">
                        Turning {member.upcomingAge}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-gray-500">
                No upcoming birthdays in the next 30 days
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCalendar; 