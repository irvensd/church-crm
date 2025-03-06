import React from 'react';

function HelpSupport() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Help & Support</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Documentation Section */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Documentation</h2>
          <p className="mb-4">Access comprehensive guides and tutorials for using the Church CRM system.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Documentation
          </button>
        </div>
        
        {/* FAQs Section */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <p className="mb-4">Find answers to common questions about features and functionality.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Browse FAQs
          </button>
        </div>
        
        {/* Contact Support Section */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
          <p className="mb-4">Need help? Reach out to our support team for assistance.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit a Ticket
          </button>
        </div>
      </div>
      
      {/* Video Tutorials Section */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Video Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded p-4">
            <div className="bg-gray-200 h-40 mb-2 flex items-center justify-center">
              <span className="text-gray-500">Video Preview</span>
            </div>
            <h3 className="font-bold">Getting Started</h3>
            <p className="text-sm text-gray-600">Learn the basics of the Church CRM system</p>
          </div>
          <div className="border rounded p-4">
            <div className="bg-gray-200 h-40 mb-2 flex items-center justify-center">
              <span className="text-gray-500">Video Preview</span>
            </div>
            <h3 className="font-bold">Managing Members</h3>
            <p className="text-sm text-gray-600">How to add, edit, and organize church members</p>
          </div>
          <div className="border rounded p-4">
            <div className="bg-gray-200 h-40 mb-2 flex items-center justify-center">
              <span className="text-gray-500">Video Preview</span>
            </div>
            <h3 className="font-bold">Financial Management</h3>
            <p className="text-sm text-gray-600">Track donations and manage church finances</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpSupport; 