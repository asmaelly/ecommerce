// src/components/LoadingSpinner.jsx
import React, { useState, useEffect } from 'react';

const LoadingSpinner = ({ 
  fullScreen = true, 
  size = 'md', 
  message = 'Chargement...',
  minDisplayTime = 2000 
}) => {
  const [show, setShow] = useState(false);
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  useEffect(() => {
    // Assure un temps d'affichage minimum pour éviter le flash
    const timer = setTimeout(() => {
      setShow(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner animé */}
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className={`absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-purple-600 border-b-blue-600 border-l-purple-600 animate-spin`}></div>
      </div>
      
      {/* Message optionnel */}
      {message && (
        <p className="text-gray-600 font-medium animate-pulse">{message}</p>
      )}
      
      {/* Points de chargement */}
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '5s' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '5s' }}></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;