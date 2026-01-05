/**
 * @param date The date to be formatted.
 * @param withTime A boolean determining whether or not the date is returned with a time value.
 * @returns The time (or time and date) formatted akin to 09/09/2021, 6 AM.
 */
export const formatShortDate = (
  date: string | Date,
  withTime: boolean
): string => {
  const dateObj = new Date(date);
  
  if (withTime) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(dateObj);
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(dateObj);
};
