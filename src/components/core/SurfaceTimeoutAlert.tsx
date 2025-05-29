import React from 'react';
import { cn } from '@/utils/classNames';

interface SurfaceTimeoutAlertProps {
  hours: number;
  minutes: number;
  onClose?: () => void;
  className?: string;
}

export function SurfaceTimeoutAlert({ 
  hours, 
  minutes, 
  onClose, 
  className 
}: SurfaceTimeoutAlertProps) {
  return (
    <div 
      className={cn(
        "relative flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md",
        className
      )}
      role="alert"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="flex-shrink-0"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg>
      <div className="flex-1">
        <p className="font-medium">Surface Timeout</p>
        <p className="text-sm">
          You have {hours} h {minutes} m left on your surface time. 
          Kindly stay out of the water for this period of time. 
          You can try other activities during this time. Thanks
        </p>
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="text-red-500 hover:text-red-700"
          aria-label="Close"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
