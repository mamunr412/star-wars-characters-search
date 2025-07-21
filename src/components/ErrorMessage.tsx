import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-500/20 rounded-full">
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-red-400 mb-2">
          Something went wrong
        </h3>
        
        <p className="text-gray-300 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center space-x-2 mx-auto px-4 py-2 bg-red-500/20 
                     hover:bg-red-500/30 text-red-400 rounded-lg transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};