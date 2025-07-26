import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  onClick,
  disabled = false,
  className = '',
  darkMode = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'secondary':
        return darkMode 
          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700';
      case 'ghost':
        return darkMode
          ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-3 py-1.5 text-sm';
      case 'md': return 'px-4 py-2';
      case 'lg': return 'px-6 py-3 text-lg';
      default: return 'px-4 py-2';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 rounded-lg font-medium
        transition-all duration-200 hover:scale-105
        ${getVariantClasses()} 
        ${getSizeClasses()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};
