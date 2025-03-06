import React from 'react';

const RecentActivity = () => {
  const activities = [
    { id: 1, user: 'John Smith', action: 'added a new member', time: '2 hours ago' },
    { id: 2, user: 'Sarah Johnson', action: 'updated event details', time: '4 hours ago' },
    { id: 3, user: 'Mike Williams', action: 'processed a donation', time: '1 day ago' },
    { id: 4, user: 'Lisa Brown', action: 'sent a group message', time: '2 days ago' },
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
            {activity.user.split(' ').map(name => name[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{activity.user}</p>
            <p className="text-sm text-gray-500">{activity.action}</p>
            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity; 