import React from 'react';
import { Card } from '../ui/Card';

export const ChartContainer = ({ 
  title, 
  children, 
  actions, 
  darkMode = false,
  className = '' 
}) => {
  return (
    <Card darkMode={darkMode} className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
      {children}
    </Card>
  );
};
