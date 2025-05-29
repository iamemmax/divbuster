import React from 'react';
import { AlertBanner } from './AlertBanner';

interface ErrorAlertProps {
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

/**
 * A pre-styled error alert component for displaying error messages
 */
export function ErrorAlert({ 
  title = "Error",
  message, 
  onClose, 
  className 
}: ErrorAlertProps) {
  return (
    <AlertBanner
      variant="error"
      title={title}
      message={message}
      onClose={onClose}
      className={className}
    />
  );
}