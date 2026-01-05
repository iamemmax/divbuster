/**
 * Native JavaScript date formatting utilities using Intl.DateTimeFormat
 */

export const formatDate = {
  /**
   * Format date as "January 15, 2024"
   */
  long: (date: string | Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  },

  /**
   * Format date as "Jan 15, 2024"
   */
  medium: (date: string | Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  },

  /**
   * Format date as "01/15/2024"
   */
  short: (date: string | Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date));
  },

  /**
   * Format time as "2:30 PM"
   */
  time: (date: string | Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date));
  },

  /**
   * Format date and time as "01/15/2024, 2:30 PM"
   */
  dateTime: (date: string | Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date));
  },

  /**
   * Get relative time like "2 hours ago", "yesterday", etc.
   */
  relative: (date: string | Date): string => {
    const now = new Date();
    const target = new Date(date);
    const diffMs = now.getTime() - target.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return formatDate.medium(target);
  }
};

export default formatDate;