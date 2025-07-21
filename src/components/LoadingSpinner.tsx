import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-yellow-400"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <p className="mt-4 text-gray-300 text-lg animate-pulse">
        Loading characters from a galaxy far, far away...
      </p>
    </div>
  );
};