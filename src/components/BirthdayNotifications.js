import React, { useState, useEffect } from 'react';
import { FaTimes, FaBirthdayCake, FaRegClock, FaEnvelope, FaCheck, FaBell, FaPhoneAlt, FaSms } from 'react-icons/fa';

const BirthdayNotifications = ({ members, onClose, onSave }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    enable_birthday_notifications: true,
    birthday_notification_days_before: 3,
    birthday_email_template: 'default_birthday',
    birthday_sms_template: 'default_birthday_sms',
    
    enable_anniversary_notifications: true,
    anniversary_notification_days_before: 7,
    anniversary_email_template: 'default_anniversary',
    anniversary_sms_template: 'default_anniversary_sms',
    
    notify_team_members: true,
    team_notification_recipients: ['pastor', 'admin'],
  });

  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [upcomingAnniversaries, setUpcomingAnniversaries] = useState([]);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Email templates
  const emailTemplates = [
    { id: 'default_birthday', name: 'Default Birthday Email' },
    { id: 'casual_birthday', name: 'Casual Birthday Wishes' },
    { id: 'formal_birthday', name: 'Formal Birthday Greeting' },
    { id: 'default_anniversary', name: 'Default Anniversary Email' },
    { id: 'casual_anniversary', name: 'Casual Anniversary Wishes' },
    { id: 'formal_anniversary', name: 'Formal Anniversary Greeting' },
  ];

  // SMS templates
  const smsTemplates = [
    { id: 'default_birthday_sms', name: 'Default Birthday SMS' },
    { id: 'short_birthday_sms', name: 'Short Birthday Text' },
    { id: 'default_anniversary_sms', name: 'Default Anniversary SMS' },
    { id: 'short_anniversary_sms', name: 'Short Anniversary Text' },
  ];

  // Team notification recipients options
  const teamRecipientOptions = [
    { id: 'pastor', name: 'Pastor' },
    { id: 'admin', name: 'Admin Staff' },
    { id: 'staff', name: 'Church Staff' },
    { id: 'deacon', name: 'Deacons' },
    { id: 'elder', name: 'Elders' },
  ];

  useEffect(() => {
    // Find upcoming birthdays (next 30 days)
    const today = new Date();
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    const birthdays = members
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
          type: 'birthday',
          memberId: member.id,
          memberName: member.name,
          memberPhoto: member.photoUrl,
          date: thisYearBirthday,
          dateString: thisYearBirthday.toISOString().split('T')[0],
          originalDate: member.birthday,
          daysUntil,
          milestone: age
        };
      })
      .filter(item => item.daysUntil <= 30)
      .sort((a, b) => a.daysUntil - b.daysUntil);
    
    setUpcomingBirthdays(birthdays);
    
    // For demo purposes, simulate some anniversaries (using join dates as anniversaries)
    const anniversaries = members
      .filter(member => member.joinDate)
      .map(member => {
        const joinDate = new Date(member.joinDate);
        const thisYearAnniversary = new Date(today.getFullYear(), joinDate.getMonth(), joinDate.getDate());
        
        // If anniversary has passed this year, use next year's anniversary
        if (thisYearAnniversary < today) {
          thisYearAnniversary.setFullYear(today.getFullYear() + 1);
        }
        
        const daysUntil = Math.ceil((thisYearAnniversary - today) / (1000 * 60 * 60 * 24));
        const years = thisYearAnniversary.getFullYear() - joinDate.getFullYear();
        
        return {
          type: 'anniversary',
          memberId: member.id,
          memberName: member.name,
          memberPhoto: member.photoUrl,
          date: thisYearAnniversary,
          dateString: thisYearAnniversary.toISOString().split('T')[0],
          originalDate: member.joinDate,
          daysUntil,
          milestone: years
        };
      })
      .filter(item => item.daysUntil <= 30)
      .sort((a, b) => a.daysUntil - b.daysUntil);
    
    setUpcomingAnniversaries(anniversaries);
    
    // Simulate recent notifications
    const simulatedNotifications = [
      ...birthdays.filter(b => b.daysUntil <= 7).slice(0, 3).map(birthday => ({
        id: `birthday_${birthday.memberId}`,
        type: 'birthday',
        memberId: birthday.memberId,
        memberName: birthday.memberName,
        memberPhoto: birthday.memberPhoto,
        status: Math.random() > 0.3 ? 'sent' : 'scheduled',
        sentDate: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 86400000 * 3).toISOString() : null,
        notificationDate: birthday.dateString,
        notificationType: Math.random() > 0.5 ? 'email' : 'sms'
      })),
      ...anniversaries.filter(a => a.daysUntil <= 7).slice(0, 3).map(anniversary => ({
        id: `anniversary_${anniversary.memberId}`,
        type: 'anniversary',
        memberId: anniversary.memberId,
        memberName: anniversary.memberName,
        memberPhoto: anniversary.memberPhoto,
        status: Math.random() > 0.3 ? 'sent' : 'scheduled',
        sentDate: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 86400000 * 3).toISOString() : null,
        notificationDate: anniversary.dateString,
        notificationType: Math.random() > 0.5 ? 'email' : 'sms'
      }))
    ].sort((a, b) => (a.sentDate ? new Date(b.sentDate) - new Date(a.sentDate) : 0));
    
    setRecentNotifications(simulatedNotifications);
  }, [members]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const handleTeamRecipientToggle = (recipientId) => {
    const currentRecipients = notificationSettings.team_notification_recipients;
    let updatedRecipients;
    
    if (currentRecipients.includes(recipientId)) {
      updatedRecipients = currentRecipients.filter(id => id !== recipientId);
    } else {
      updatedRecipients = [...currentRecipients, recipientId];
    }
    
    setNotificationSettings({
      ...notificationSettings,
      team_notification_recipients: updatedRecipients
    });
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(notificationSettings);
      
      setIsLoading(false);
      setSuccessMessage('Notification settings saved successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  const handleSendTestNotification = (type) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Test ${type} notification sent!`);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'email': return <FaEnvelope className="text-blue-500" />;
      case 'sms': return <FaSms className="text-green-500" />;
      case 'phone': return <FaPhoneAlt className="text-purple-500" />;
      default: return <FaBell className="text-yellow-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <FaBirthdayCake className="mr-2" />
            Birthday & Anniversary Notifications
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          {successMessage && (
            <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-lg">
              {successMessage}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Birthday Notification Settings */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <FaBirthdayCake className="mr-2 text-pink-500" />
                Birthday Notifications
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="enable_birthday_notifications"
                      checked={notificationSettings.enable_birthday_notifications}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Enable birthday notifications</span>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Send notifications
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      name="birthday_notification_days_before"
                      value={notificationSettings.birthday_notification_days_before}
                      onChange={handleInputChange}
                      min="0"
                      max="30"
                      className="w-16 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                    />
                    <span className="text-sm text-gray-600">days before the birthday</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Template
                  </label>
                  <select
                    name="birthday_email_template"
                    value={notificationSettings.birthday_email_template}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {emailTemplates
                      .filter(template => template.id.includes('birthday'))
                      .map(template => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMS Template
                  </label>
                  <select
                    name="birthday_sms_template"
                    value={notificationSettings.birthday_sms_template}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {smsTemplates
                      .filter(template => template.id.includes('birthday'))
                      .map(template => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                <div className="text-right">
                  <button
                    onClick={() => handleSendTestNotification('birthday')}
                    disabled={isLoading}
                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
                  >
                    Send Test Birthday Notification
                  </button>
                </div>
              </div>
            </div>
            
            {/* Anniversary Notification Settings */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <FaRegClock className="mr-2 text-blue-500" />
                Anniversary Notifications
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="enable_anniversary_notifications"
                      checked={notificationSettings.enable_anniversary_notifications}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Enable anniversary notifications</span>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Send notifications
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      name="anniversary_notification_days_before"
                      value={notificationSettings.anniversary_notification_days_before}
                      onChange={handleInputChange}
                      min="0"
                      max="30"
                      className="w-16 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                    />
                    <span className="text-sm text-gray-600">days before the anniversary</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Template
                  </label>
                  <select
                    name="anniversary_email_template"
                    value={notificationSettings.anniversary_email_template}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {emailTemplates
                      .filter(template => template.id.includes('anniversary'))
                      .map(template => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMS Template
                  </label>
                  <select
                    name="anniversary_sms_template"
                    value={notificationSettings.anniversary_sms_template}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {smsTemplates
                      .filter(template => template.id.includes('anniversary'))
                      .map(template => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                <div className="text-right">
                  <button
                    onClick={() => handleSendTestNotification('anniversary')}
                    disabled={isLoading}
                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
                  >
                    Send Test Anniversary Notification
                  </button>
                </div>
              </div>
            </div>
            
            {/* Team Notification Settings */}
            <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Team Notifications</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="notify_team_members"
                      checked={notificationSettings.notify_team_members}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Also notify church team members about upcoming birthdays and anniversaries
                    </span>
                  </label>
                </div>
                
                {notificationSettings.notify_team_members && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Send notifications to:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {teamRecipientOptions.map(option => (
                        <label
                          key={option.id}
                          className={`inline-flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                            notificationSettings.team_notification_recipients.includes(option.id)
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={notificationSettings.team_notification_recipients.includes(option.id)}
                            onChange={() => handleTeamRecipientToggle(option.id)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                          />
                          {option.name}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <button
              onClick={handleSaveSettings}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Notification Settings'
              )}
            </button>
          </div>
          
          {/* Upcoming events and Recent notifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <div>
              <h3 className="text-lg font-medium mb-3">Upcoming Events</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
                <div className="space-y-3">
                  {[...upcomingBirthdays, ...upcomingAnniversaries]
                    .sort((a, b) => a.daysUntil - b.daysUntil)
                    .slice(0, 10)
                    .map(event => (
                      <div 
                        key={`${event.type}_${event.memberId}`} 
                        className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className="flex items-center">
                          {event.memberPhoto ? (
                            <img 
                              src={event.memberPhoto} 
                              alt={event.memberName}
                              className="h-10 w-10 rounded-full mr-3 object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              {event.type === 'birthday' ? (
                                <FaBirthdayCake className="text-pink-500" />
                              ) : (
                                <FaRegClock className="text-blue-500" />
                              )}
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{event.memberName}</div>
                            <div className="text-sm text-gray-500">
                              {event.type === 'birthday' ? (
                                <>Birthday: {formatDate(event.dateString)} ({event.milestone} years)</>
                              ) : (
                                <>Anniversary: {formatDate(event.dateString)} ({event.milestone} years)</>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                          {event.daysUntil === 0 ? 'Today' : event.daysUntil === 1 ? 'Tomorrow' : `${event.daysUntil} days`}
                        </div>
                      </div>
                    ))}
                    
                    {[...upcomingBirthdays, ...upcomingAnniversaries].length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        No upcoming birthdays or anniversaries in the next 30 days
                      </div>
                    )}
                </div>
              </div>
            </div>
            
            {/* Recent Notifications */}
            <div>
              <h3 className="text-lg font-medium mb-3">Recent Notifications</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
                <div className="space-y-3">
                  {recentNotifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                    >
                      <div className="flex items-center">
                        {notification.memberPhoto ? (
                          <img 
                            src={notification.memberPhoto} 
                            alt={notification.memberName}
                            className="h-10 w-10 rounded-full mr-3 object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            {notification.type === 'birthday' ? (
                              <FaBirthdayCake className="text-pink-500" />
                            ) : (
                              <FaRegClock className="text-blue-500" />
                            )}
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{notification.memberName}</div>
                          <div className="text-sm text-gray-500">
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)} {formatDate(notification.notificationDate)}
                          </div>
                          <div className="flex items-center text-xs mt-1">
                            {getNotificationIcon(notification.notificationType)}
                            <span className="ml-1">
                              {notification.notificationType === 'email' ? 'Email' : 'SMS'}
                            </span>
                            <span className={`ml-2 px-2 py-0.5 rounded-full ${
                              notification.status === 'sent' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {notification.status === 'sent' ? (
                                <span className="flex items-center">
                                  <FaCheck className="mr-1" />
                                  Sent
                                </span>
                              ) : 'Scheduled'}
                            </span>
                          </div>
                        </div>
                      </div>
                      {notification.sentDate && (
                        <div className="text-xs text-gray-500">
                          {new Date(notification.sentDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {recentNotifications.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No recent notifications
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayNotifications; 