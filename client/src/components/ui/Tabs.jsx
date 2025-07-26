import React from 'react';

export const Tabs = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  darkMode = false,
  className = '' 
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
            ${activeTab === tab.id
              ? darkMode 
                ? 'text-blue-400 bg-blue-900' 
                : 'text-blue-600 bg-blue-100'
              : darkMode
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }
          `}
        >
          {tab.label} {tab.count && `(${tab.count})`}
        </button>
      ))}
    </div>
  );
};