import React from 'react';

export const PageHeader = ({ 
  title, 
  subtitle, 
  actions, 
  darkMode = false 
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {subtitle}
          </p>
        )}
      </div>
      
      {actions && (
        <div className="flex items-center gap-4">
          {actions}
        </div>
      )}
    </div>
  );
};
