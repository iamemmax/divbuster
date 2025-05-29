import React from 'react';
import { cn } from '@/utils/classNames';

type AlertVariant = 'error' | 'success' | 'warning' | 'info';

interface AlertBannerProps {
  variant: AlertVariant;
  title: string;
  message: string;
  onClose?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export function AlertBanner({
  variant = 'info',
  title,
  message,
  onClose,
  className,
  icon,
}: AlertBannerProps) {
  // Define variant-specific styles
  const variantStyles = {
    error: {
      container: 'bg-red-50 border-red-200 text-red-600',
      icon: (
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
      ),
      closeButton: 'text-red-500 hover:text-red-700',
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-600',
      icon: (
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
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      ),
      closeButton: 'text-green-500 hover:text-green-700',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      icon: (
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
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      closeButton: 'text-yellow-500 hover:text-yellow-700',
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-600',
      icon: (
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
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      ),
      closeButton: 'text-blue-500 hover:text-blue-700',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'relative flex items-center gap-3 border px-4 py-3 rounded-md',
        styles.container,
        className
      )}
      role="alert"
    >
      {icon || styles.icon}
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={cn('', styles.closeButton)}
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