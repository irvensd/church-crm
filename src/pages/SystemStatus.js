import React, { useState } from 'react';

function SystemStatus() {
  // Mock data for system status
  const [systemComponents, setSystemComponents] = useState([
    { id: 1, name: 'Web Application', status: 'operational', uptime: '99.9%' },
    { id: 2, name: 'Database', status: 'operational', uptime: '99.8%' },
    { id: 3, name: 'Authentication Service', status: 'operational', uptime: '99.9%' },
    { id: 4, name: 'File Storage', status: 'operational', uptime: '99.7%' },
    { id: 5, name: 'Email Service', status: 'degraded', uptime: '98.2%' },
    { id: 6, name: 'SMS Notifications', status: 'operational', uptime: '99.5%' },
  ]);

  // Mock data for recent incidents
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      date: '2023-06-15',
      title: 'Email Delivery Delays',
      description: 'Some users experienced delays in email delivery. The issue has been resolved.',
      status: 'resolved'
    },
    {
      id: 2,
      date: '2023-06-10',
      title: 'Scheduled Maintenance',
      description: 'System was down for scheduled maintenance for 2 hours.',
      status: 'completed'
    }
  ]);

  // Get status color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'outage':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">System Status</h1>
      
      {/* Overall Status */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <div className="flex items-center mb-4">
          <div className={`w-4 h-4 rounded-full ${getStatusColor('operational')} mr-2`}></div>
          <h2 className="text-xl font-semibold">All Systems Operational</h2>
        </div>
        <p className="text-gray-600">Last updated: June 20, 2023 at 10:30 AM</p>
      </div>
      
      {/* Component Status */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Component Status</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Component</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Uptime</th>
              </tr>
            </thead>
            <tbody>
              {systemComponents.map((component) => (
                <tr key={component.id}>
                  <td className="py-2 px-4 border-b">{component.name}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(component.status)} mr-2`}></div>
                      <span className="capitalize">{component.status}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">{component.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Incidents */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>
        {incidents.length > 0 ? (
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div key={incident.id} className="border-l-4 border-yellow-500 pl-4 py-2">
                <div className="flex justify-between">
                  <h3 className="font-bold">{incident.title}</h3>
                  <span className="text-sm text-gray-500">{incident.date}</span>
                </div>
                <p className="text-gray-600">{incident.description}</p>
                <span className={`text-sm ${
                  incident.status === 'resolved' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No incidents reported in the last 30 days.</p>
        )}
      </div>
      
      {/* Scheduled Maintenance */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Scheduled Maintenance</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <div className="flex justify-between">
            <h3 className="font-bold">Upcoming Database Optimization</h3>
            <span className="text-sm text-gray-500">June 25, 2023 (2:00 AM - 4:00 AM)</span>
          </div>
          <p className="text-gray-600">
            We will be performing database optimization to improve system performance. 
            The system may experience brief periods of slowness during this time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SystemStatus; 