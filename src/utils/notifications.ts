import {toast} from 'sonner';

export type ToastNotification = 'success' | 'error' | 'neutral';

const getNotificationColor = (notificationType: ToastNotification) => {
  switch (notificationType) {
    case 'success': {
      return '#065f46';
    }

    case 'error': {
      return '#b91c1c';
    }

    case 'neutral': {
      return '#032282';
    }

    default: {
      throw new Error(`Unsupported notification type: ${notificationType}`);
    }
  }
};
export const launchNotification = (type: ToastNotification, text: string) => {
  toast(text, {
    style: {
      padding: '8px 20px',
      backgroundColor: getNotificationColor(type),
      color: '#ffffff',
      textAlign: 'center',
      overflowWrap: 'break-word',
      overflow: 'auto',
      bottom: '32px',
      fontSize: '14px',
    },
  });
};

/**
 * Display an error notification toast
 * @param message The error message to display
 */
export const showErrorNotification = (message: string) => {
  launchNotification('error', message);
};

/**
 * Display a success notification toast
 * @param message The success message to display
 */
export const showSuccessNotification = (message: string) => {
  launchNotification('success', message);
};
