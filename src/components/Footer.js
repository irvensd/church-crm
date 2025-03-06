import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Congrevia. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <Link to="/terms" className="text-gray-600 hover:text-blue-600 text-sm">
            Terms of Service
          </Link>
          <Link to="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">
            Privacy Policy
          </Link>
          <Link to="/help-support" className="text-gray-600 hover:text-blue-600 text-sm">
            Help & Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 