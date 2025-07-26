import React from 'react';

export const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  darkMode = false 
}) => {
  const baseClasses = `${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border`;
  const hoverClasses = hover ? 'transition-all duration-200 hover:shadow-md hover:scale-105' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};