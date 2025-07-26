import React from 'react';
import { Card } from './Card';

export const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'neutral',
  darkMode = false,
  badge,
  subtitle,
  className = '',
  onClick
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <Card 
      darkMode={darkMode} 
      hover={!!onClick} 
      className={`p-6 cursor-${onClick ? 'pointer' : 'default'} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        {Icon && <Icon className="text-green-500" size={24} />}
        {badge && (
          <span className={`text-sm px-2 py-1 rounded-full ${getChangeColor()}`}>
            {badge}
          </span>
        )}
      </div>
      
      <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
        {title}
      </h3>
      
      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
        {value}
      </p>
      
      {change && (
        <p className={`text-sm ${getChangeColor().split(' ')[0]}`}>
          {change}
        </p>
      )}
      
      {subtitle && (
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </Card>
  );
};
