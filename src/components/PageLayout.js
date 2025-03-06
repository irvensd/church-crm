import React from 'react';

const PageLayout = ({ title, subtitle, children, actions }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {subtitle && <p className="mt-1 text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
        {actions && <div className="flex space-x-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
};

export default PageLayout; 