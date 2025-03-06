import React, { useState } from 'react';

function Integrations() {
  // Mock data for available integrations
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: 'Mailchimp',
      description: 'Connect your email marketing campaigns with your church database.',
      category: 'Email Marketing',
      status: 'connected',
      icon: '📧'
    },
    {
      id: 2,
      name: 'QuickBooks',
      description: 'Sync your financial data with QuickBooks accounting software.',
      category: 'Accounting',
      status: 'disconnected',
      icon: '💰'
    },
    {
      id: 3,
      name: 'Zoom',
      description: 'Schedule and manage virtual meetings and events.',
      category: 'Video Conferencing',
      status: 'connected',
      icon: '🎥'
    },
    {
      id: 4,
      name: 'Stripe',
      description: 'Process online donations and payments securely.',
      category: 'Payment Processing',
      status: 'connected',
      icon: '💳'
    },
    {
      id: 5,
      name: 'Google Calendar',
      description: 'Sync church events with Google Calendar.',
      category: 'Calendar',
      status: 'disconnected',
      icon: '📅'
    },
    {
      id: 6,
      name: 'Twilio',
      description: 'Send SMS notifications and alerts to church members.',
      category: 'Communications',
      status: 'disconnected',
      icon: '📱'
    }
  ]);

  // Toggle connection status
  const toggleConnection = (id) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, status: integration.status === 'connected' ? 'disconnected' : 'connected' } 
        : integration
    ));
  };

  // Filter integrations by category
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', ...new Set(integrations.map(item => item.category))];
  
  const filteredIntegrations = activeFilter === 'All' 
    ? integrations 
    : integrations.filter(item => item.category === activeFilter);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Integrations</h1>
      
      {/* Introduction */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h2 className="text-xl font-semibold mb-2">Connect Your Tools</h2>
        <p className="text-gray-600 mb-4">
          Integrate your Church CRM with other services to streamline your workflow and enhance functionality.
          Connect with popular tools for email marketing, accounting, payment processing, and more.
        </p>
      </div>
      
      {/* Category Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              activeFilter === category 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map(integration => (
          <div key={integration.id} className="bg-white shadow-md rounded overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{integration.icon}</span>
                <h3 className="text-lg font-bold">{integration.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{integration.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  {integration.category}
                </span>
                <button
                  onClick={() => toggleConnection(integration.id)}
                  className={`px-4 py-2 rounded ${
                    integration.status === 'connected'
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {integration.status === 'connected' ? 'Connected' : 'Connect'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Request Integration */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-6">
        <h2 className="text-xl font-semibold mb-4">Don't see what you need?</h2>
        <p className="text-gray-600 mb-4">
          If you need an integration that's not listed here, let us know and we'll consider adding it to our platform.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Request an Integration
        </button>
      </div>
    </div>
  );
}

export default Integrations; 