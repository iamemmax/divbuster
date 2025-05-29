import React, { useState } from 'react';
import { SurfaceTimeoutAlert } from '../core/SurfaceTimeoutAlert';
import { BuddyApprovalAlert } from '../core/BuddyApprovalAlert';
import { AlertBanner } from '../core/AlertBanner';
import { ErrorAlert } from '../core/ErrorAlert';
import { SuccessAlert } from '../core/SuccessAlert';
import { Button } from '../core/Button';

export function AlertExamples() {
  const [showSurfaceTimeout, setShowSurfaceTimeout] = useState(true);
  const [showBuddyApproval, setShowBuddyApproval] = useState(true);
  const [showCustomAlert, setShowCustomAlert] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);

  return (
    <div className="space-y-4 p-4">
      {showSurfaceTimeout && (
        <SurfaceTimeoutAlert 
          hours={0} 
          minutes={12} 
          onClose={() => setShowSurfaceTimeout(false)} 
        />
      )}
      
      {showBuddyApproval && (
        <BuddyApprovalAlert 
          onClose={() => setShowBuddyApproval(false)} 
        />
      )}
      
      {showCustomAlert && (
        <AlertBanner
          variant="warning"
          title="Low Air Warning"
          message="Your tank is at 25% capacity. Consider ending your dive soon."
          onClose={() => setShowCustomAlert(false)}
        />
      )}
      
      {showErrorAlert && (
        <ErrorAlert
          title="Connection Error"
          message="Unable to connect to the server. Please check your internet connection and try again."
          onClose={() => setShowErrorAlert(false)}
        />
      )}
      
      {showSuccessAlert && (
        <SuccessAlert
          title="Profile Updated"
          message="Your profile has been successfully updated with the new information."
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
      
      <div className="flex flex-wrap gap-2 mt-4">
        <Button 
          onClick={() => setShowSurfaceTimeout(true)}
          disabled={showSurfaceTimeout}
        >
          Show Surface Timeout
        </Button>
        
        <Button 
          onClick={() => setShowBuddyApproval(true)}
          disabled={showBuddyApproval}
        >
          Show Buddy Approval
        </Button>
        
        <Button 
          onClick={() => setShowCustomAlert(true)}
          disabled={showCustomAlert}
        >
          Show Custom Alert
        </Button>
        
        <Button 
          onClick={() => setShowErrorAlert(true)}
          disabled={showErrorAlert}
          className="bg-red-600 hover:bg-red-700"
        >
          Show Error Alert
        </Button>
        
        <Button 
          onClick={() => setShowSuccessAlert(true)}
          disabled={showSuccessAlert}
          className="bg-green-600 hover:bg-green-700"
        >
          Show Success Alert
        </Button>
      </div>
    </div>
  );
}
