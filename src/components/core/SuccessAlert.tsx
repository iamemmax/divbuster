import React from 'react';
import { AlertBanner } from './AlertBanner';

interface SuccessAlertProps {
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

/**
 * A pre-styled success alert component for displaying success messages
 */
export function SuccessAlert({ 
  title = "Success",
  message, 
  onClose, 
  className 
}: SuccessAlertProps) {
  return (
    <AlertBanner
      variant="success"
      title={title}
      message={message}
      onClose={onClose}
      className={className}
    />
  );
}