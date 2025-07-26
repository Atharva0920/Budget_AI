import React from 'react';

export const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  darkMode = false,
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full p-3 rounded-lg border
        ${darkMode 
          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${className}
      `}
      {...props}
    />
  );
};
