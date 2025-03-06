import React from 'react';

const UpcomingEvents = () => {
  const events = [
    { id: 1, title: 'Sunday Service', date: 'Sunday, 9:00 AM', location: 'Main Sanctuary' },
    { id: 2, title: 'Youth Group', date: 'Wednesday, 6:30 PM', location: 'Youth Center' },
    { id: 3, title: 'Bible Study', date: 'Thursday, 7:00 PM', location: 'Fellowship Hall' },
    { id: 4, title: 'Choir Practice', date: 'Saturday, 5:00 PM', location: 'Choir Room' },
  ];

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="p-3 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-900">{event.title}</h3>
          <p className="text-sm text-gray-500">{event.date}</p>
          <p className="text-sm text-gray-500">{event.location}</p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents; 