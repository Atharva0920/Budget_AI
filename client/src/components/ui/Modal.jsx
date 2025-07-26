import React from 'react';
import { X } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  actions,
  darkMode = false,
  maxWidth = 'max-w-md'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card darkMode={darkMode} className={`w-full ${maxWidth} mx-4 p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'text-gray-500'}`}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          {children}
        </div>
        
        {actions && (
          <div className="flex gap-2 justify-end">
            {actions}
          </div>
        )}
      </Card>
    </div>
  );
};