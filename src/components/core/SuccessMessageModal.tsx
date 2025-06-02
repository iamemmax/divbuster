import CloseIcon from '@/app/icons/CloseIcon';
import React from 'react';

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
  autoHide?: boolean;
  autoHideDuration?: number;
  className?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  onClose,
  autoHide = false,
  autoHideDuration = 5000,
  className = "",
}) => {
  React.useEffect(() => {
    if (autoHide && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDuration, onClose]);

  return (
    <div className={`mb-4 w-full ${className}`}>
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Success Icon */}
            <svg
              className="w-5 h-5 mr-2 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="block sm:inline font-archivo text-sm font-medium">
              {message}
            </span>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="ml-4 text-green-500 hover:text-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded"
            aria-label="Close success message"
          >
            <CloseIcon/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;