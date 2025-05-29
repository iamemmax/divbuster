import React from 'react';
import { AlertBanner } from './AlertBanner';

interface BuddyApprovalAlertProps {
  onClose?: () => void;
  className?: string;
}

export function BuddyApprovalAlert({ 
  onClose, 
  className 
}: BuddyApprovalAlertProps) {
  return (
    <AlertBanner
      variant="success"
      title="Awaiting Buddy Approval"
      message="Congratulations! You have added a new buddy. You will be notified once your request as been approved."
      onClose={onClose}
      className={className}
    />
  );
}