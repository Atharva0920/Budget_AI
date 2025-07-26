import React from 'react';

export const ProgressBar = ({ 
  value, 
  max = 100, 
  color = 'blue', 
  showPercentage = true,
  darkMode = false,
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const getColorClasses = () => {
    const colors = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      red: 'bg-red-600',
      yellow: 'bg-yellow-600',
      purple: 'bg-purple-600',
      emerald: 'bg-emerald-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={className}>
      <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getColorClasses()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between mt-1 text-xs">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            {percentage.toFixed(1)}% used
          </span>
        </div>
      )}
    </div>
  );
};
