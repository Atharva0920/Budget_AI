import React from 'react';
import { Card } from './Card';

export const Table = ({ 
  columns, 
  data, 
  darkMode = false, 
  className = '',
  onRowClick 
}) => {
  return (
    <Card darkMode={darkMode} className={`overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-900'
                  } uppercase tracking-wider`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'divide-gray-700' : 'divide-gray-200'} divide-y`}>
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={`
                  ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} 
                  ${onRowClick ? 'cursor-pointer' : ''}
                  transition-colors
                `}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};