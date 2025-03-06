import React, { useState } from 'react';

function BackupRecovery() {
  // Mock data for backup history
  const [backupHistory, setBackupHistory] = useState([
    { id: 1, date: '2023-06-20 03:00 AM', type: 'Automatic', status: 'Completed', size: '42.3 MB' },
    { id: 2, date: '2023-06-19 03:00 AM', type: 'Automatic', status: 'Completed', size: '42.1 MB' },
    { id: 3, date: '2023-06-18 03:00 AM', type: 'Automatic', status: 'Completed', size: '41.8 MB' },
    { id: 4, date: '2023-06-17 03:00 AM', type: 'Automatic', status: 'Completed', size: '41.5 MB' },
    { id: 5, date: '2023-06-16 01:30 PM', type: 'Manual', status: 'Completed', size: '41.2 MB' },
  ]);

  // Backup schedule settings
  const [backupSchedule, setBackupSchedule] = useState({
    frequency: 'daily',
    time: '03:00',
    retentionPeriod: '30'
  });

  // Handle backup schedule changes
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setBackupSchedule(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Simulate backup creation
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  
  const createBackup = () => {
    setIsCreatingBackup(true);
    
    // Simulate API call
    setTimeout(() => {
      const newBackup = {
        id: backupHistory.length + 1,
        date: new Date().toLocaleString(),
        type: 'Manual',
        status: 'Completed',
        size: '42.5 MB'
      };
      
      setBackupHistory([newBackup, ...backupHistory]);
      setIsCreatingBackup(false);
    }, 2000);
  };

  // Simulate restore from backup
  const [isRestoring, setIsRestoring] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);

  const startRestore = (backupId) => {
    setSelectedBackup(backupId);
    setIsRestoring(true);
    
    // Simulate restore process
    setTimeout(() => {
      setIsRestoring(false);
      setSelectedBackup(null);
      alert('Restore completed successfully!');
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Backup & Recovery</h1>
      
      {/* Backup Status */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Backup Status</h2>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-green-600 font-medium">Active</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="border rounded p-4">
            <h3 className="text-sm text-gray-500 mb-1">Last Backup</h3>
            <p className="font-semibold">{backupHistory[0]?.date || 'N/A'}</p>
          </div>
          <div className="border rounded p-4">
            <h3 className="text-sm text-gray-500 mb-1">Backup Size</h3>
            <p className="font-semibold">{backupHistory[0]?.size || 'N/A'}</p>
          </div>
          <div className="border rounded p-4">
            <h3 className="text-sm text-gray-500 mb-1">Next Scheduled Backup</h3>
            <p className="font-semibold">Tomorrow at 03:00 AM</p>
          </div>
        </div>
        
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={createBackup}
          disabled={isCreatingBackup}
        >
          {isCreatingBackup ? 'Creating Backup...' : 'Create Backup Now'}
        </button>
      </div>
      
      {/* Backup Schedule */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Backup Schedule</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="frequency">
              Frequency
            </label>
            <select
              id="frequency"
              name="frequency"
              value={backupSchedule.frequency}
              onChange={handleScheduleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
              Time
            </label>
            <input
              id="time"
              name="time"
              type="time"
              value={backupSchedule.time}
              onChange={handleScheduleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="retentionPeriod">
              Retention Period (days)
            </label>
            <input
              id="retentionPeriod"
              name="retentionPeriod"
              type="number"
              min="1"
              max="365"
              value={backupSchedule.retentionPeriod}
              onChange={handleScheduleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Schedule
        </button>
      </div>
      
      {/* Backup History */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Backup History</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Date & Time</th>
                <th className="py-2 px-4 border-b text-left">Type</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Size</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backupHistory.map((backup) => (
                <tr key={backup.id}>
                  <td className="py-2 px-4 border-b">{backup.date}</td>
                  <td className="py-2 px-4 border-b">{backup.type}</td>
                  <td className="py-2 px-4 border-b">
                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                      {backup.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{backup.size}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => window.open('#', '_blank')}
                      >
                        Download
                      </button>
                      <button 
                        className={`text-green-500 hover:text-green-700 ${
                          isRestoring && selectedBackup === backup.id ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => startRestore(backup.id)}
                        disabled={isRestoring}
                      >
                        {isRestoring && selectedBackup === backup.id ? 'Restoring...' : 'Restore'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Data Recovery Options */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Data Recovery Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded p-4">
            <h3 className="font-bold mb-2">Point-in-Time Recovery</h3>
            <p className="text-gray-600 mb-4">
              Restore your database to a specific point in time. This is useful if you need to recover data from before an accidental deletion or corruption.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Start Point-in-Time Recovery
            </button>
          </div>
          
          <div className="border rounded p-4">
            <h3 className="font-bold mb-2">Selective Data Recovery</h3>
            <p className="text-gray-600 mb-4">
              Restore specific data elements without affecting the entire database. Useful for recovering individual records or tables.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Start Selective Recovery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackupRecovery;
