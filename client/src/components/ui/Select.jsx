import React from 'react';

export const Select = ({ 
  value, 
  onChange, 
  options = [], 
  darkMode = false,
  className = '',
  ...props 
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`
        w-full p-3 rounded-lg border
        ${darkMode 
          ? 'bg-gray-700 border-gray-600 text-white' 
          : 'bg-white border-gray-300 text-gray-900'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${className}
      `}
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};