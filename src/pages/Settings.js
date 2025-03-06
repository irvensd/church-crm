import React, { useState } from 'react';

function Settings() {
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    churchName: 'Grace Community Church',
    timezone: 'America/New_York',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    eventReminders: true,
    membershipUpdates: true,
    financialReports: true,
    attendanceReports: false
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    showMemberContact: 'staff_only', // options: all_members, staff_only, none
    showBirthdates: 'month_day_only', // options: full_date, month_day_only, none
    allowMemberSearch: true,
    showDonationAmounts: false,
    showAttendanceRecords: 'staff_only' // options: all_members, staff_only, none
  });

  // User roles and permissions
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', description: 'Full access to all features' },
    { id: 2, name: 'Pastor', description: 'Access to member data and spiritual tools' },
    { id: 3, name: 'Financial Officer', description: 'Access to financial data and reports' },
    { id: 4, name: 'Member', description: 'Limited access to personal data and events' }
  ]);

  // Handle general settings changes
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle notification settings changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle privacy settings changes
  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle role name change
  const handleRoleNameChange = (id, newName) => {
    setRoles(prev => 
      prev.map(role => 
        role.id === id ? { ...role, name: newName } : role
      )
    );
  };

  // Handle role description change
  const handleRoleDescriptionChange = (id, newDescription) => {
    setRoles(prev => 
      prev.map(role => 
        role.id === id ? { ...role, description: newDescription } : role
      )
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save these settings to your backend
    console.log('Settings saved:', {
      generalSettings,
      notificationSettings,
      privacySettings,
      roles
    });
    
    // Show success message
    alert('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <form onSubmit={handleSubmit}>
        {/* General Settings Section */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="churchName">
              Church Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="churchName"
              type="text"
              name="churchName"
              value={generalSettings.churchName}
              onChange={handleGeneralChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timezone">
                Timezone
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="timezone"
                name="timezone"
                value={generalSettings.timezone}
                onChange={handleGeneralChange}
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="America/Anchorage">Alaska Time (AKT)</option>
                <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
                Language
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="language"
                name="language"
                value={generalSettings.language}
                onChange={handleGeneralChange}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="pt">Portuguese</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateFormat">
                Date Format
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dateFormat"
                name="dateFormat"
                value={generalSettings.dateFormat}
                onChange={handleGeneralChange}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeFormat">
                Time Format
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="timeFormat"
                name="timeFormat"
                value={generalSettings.timeFormat}
                onChange={handleGeneralChange}
              >
                <option value="12h">12-hour (AM/PM)</option>
                <option value="24h">24-hour</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Notification Settings Section */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationChange}
                  className="mr-2"
                />
                <span className="text-gray-700">Email Notifications</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={notificationSettings.smsNotifications}
                  onChange={handleNotificationChange}
                  className="mr-2"
                />
                <span className="text-gray-700">SMS Notifications</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="eventReminders"
                  checked={notificationSettings.eventReminders}
                  onChange={handleNotificationChange}
                  className="mr-2"
                />
                <span className="text-gray-700">Event Reminders</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="membershipUpdates"
                  checked={notificationSettings.membershipUpdates}
                  onChange={handleNotificationChange}
                  className="mr-2"
                />
                <span className="text-gray-700">Membership Updates</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="financialReports"
                  checked={notificationSettings.financialReports}
                  onChange={handleNotificationChange}
                  className="mr-2"
                />
                <span className="text-gray-700">Financial Reports</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="attendanceReports"
                  checked={notificationSettings.attendanceReports}
                  onChange={handleNotificationChange}
                  className="mr-2"
                />
                <span className="text-gray-700">Attendance Reports</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Privacy Settings Section */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="showMemberContact">
              Member Contact Information Visibility
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="showMemberContact"
              name="showMemberContact"
              value={privacySettings.showMemberContact}
              onChange={handlePrivacyChange}
            >
              <option value="all_members">Visible to All Members</option>
              <option value="staff_only">Visible to Staff Only</option>
              <option value="none">Not Visible</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="showBirthdates">
              Birthdate Visibility
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="showBirthdates"
              name="showBirthdates"
              value={privacySettings.showBirthdates}
              onChange={handlePrivacyChange}
            >
              <option value="full_date">Show Full Date</option>
              <option value="month_day_only">Show Month and Day Only</option>
              <option value="none">Do Not Show</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="allowMemberSearch"
                checked={privacySettings.allowMemberSearch}
                onChange={handlePrivacyChange}
                className="mr-2"
              />
              <span className="text-gray-700">Allow Member Directory Search</span>
            </label>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="showDonationAmounts"
                checked={privacySettings.showDonationAmounts}
                onChange={handlePrivacyChange}
                className="mr-2"
              />
              <span className="text-gray-700">Show Donation Amounts (to authorized users)</span>
            </label>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="showAttendanceRecords">
              Attendance Records Visibility
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="showAttendanceRecords"
              name="showAttendanceRecords"
              value={privacySettings.showAttendanceRecords}
              onChange={handlePrivacyChange}
            >
              <option value="all_members">Visible to All Members</option>
              <option value="staff_only">Visible to Staff Only</option>
              <option value="none">Not Visible</option>
            </select>
          </div>
        </div>
        
        {/* User Roles Section */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">User Roles</h2>
          
          {roles.map(role => (
            <div key={role.id} className="mb-6 p-4 border rounded">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`role-name-${role.id}`}>
                  Role Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`role-name-${role.id}`}
                  type="text"
                  value={role.name}
                  onChange={(e) => handleRoleNameChange(role.id, e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`role-desc-${role.id}`}>
                  Description
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`role-desc-${role.id}`}
                  type="text"
                  value={role.description}
                  onChange={(e) => handleRoleDescriptionChange(role.id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-end">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings; 