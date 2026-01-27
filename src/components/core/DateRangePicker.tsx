import React, { useState, useEffect } from 'react';
import { Button } from '@/components/core';

interface DateRangePickerProps {
  onApply: (startDate: Date, endDate: Date) => void;
  onCancel: () => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

type TimeRange = 
  | 'today'
  | 'yesterday'
  | 'this-week'
  | 'last-week'
  | 'this-month'
  | 'last-month'
  | 'this-year'
  | 'last-year'
  | 'all-time'
  | 'custom';

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onApply,
  onCancel,
  initialStartDate = new Date(),
  initialEndDate = new Date(),
}) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });
  
  const [activeTimeRange, setActiveTimeRange] = useState<TimeRange>('custom');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [nextMonth, setNextMonth] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() + 1)));
  
  // Helper function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  // Helper function to normalize date to start of day
  const normalizeDate = (date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  // Check which preset matches the current date range
  const getMatchingTimeRange = (startDate: Date | null, endDate: Date | null): TimeRange => {
    if (!startDate || !endDate) return 'custom';
    
    const today = normalizeDate(new Date());
    const start = normalizeDate(startDate);
    const end = normalizeDate(endDate);
    
    // Today
    if (isSameDay(start, today) && isSameDay(end, today)) {
      return 'today';
    }
    
    // Yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (isSameDay(start, yesterday) && isSameDay(end, yesterday)) {
      return 'yesterday';
    }
    
    // This week (Sunday to today)
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
    if (isSameDay(start, thisWeekStart) && isSameDay(end, today)) {
      return 'this-week';
    }
    
    // Last week (Sunday to Saturday)
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(lastWeekStart.getDate() - lastWeekStart.getDay() - 7);
    const lastWeekEnd = new Date(lastWeekStart);
    lastWeekEnd.setDate(lastWeekEnd.getDate() + 6);
    if (isSameDay(start, lastWeekStart) && isSameDay(end, lastWeekEnd)) {
      return 'last-week';
    }
    
    // This month (1st of month to today)
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    if (isSameDay(start, thisMonthStart) && isSameDay(end, today)) {
      return 'this-month';
    }
    
    // Last month (1st to last day of previous month)
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    if (isSameDay(start, lastMonthStart) && isSameDay(end, lastMonthEnd)) {
      return 'last-month';
    }
    
    // This year (Jan 1 to today)
    const thisYearStart = new Date(today.getFullYear(), 0, 1);
    if (isSameDay(start, thisYearStart) && isSameDay(end, today)) {
      return 'this-year';
    }
    
    // Last year (Jan 1 to Dec 31 of previous year)
    const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
    const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);
    if (isSameDay(start, lastYearStart) && isSameDay(end, lastYearEnd)) {
      return 'last-year';
    }
    
    // All time (2020-01-01 to today)
    const allTimeStart = new Date(2020, 0, 1);
    if (isSameDay(start, allTimeStart) && isSameDay(end, today)) {
      return 'all-time';
    }
    
    return 'custom';
  };

  // Update active time range when date range changes
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const matchingRange = getMatchingTimeRange(dateRange.startDate, dateRange.endDate);
      console.log('Date range changed:', {
        start: dateRange.startDate.toDateString(),
        end: dateRange.endDate.toDateString(),
        matchingRange
      });
      setActiveTimeRange(matchingRange);
    } else {
      setActiveTimeRange('custom');
    }
  }, [dateRange]);
  
  // Generate calendar days for a month
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Get days from previous month to fill the first row
    const prevMonthDays = [];
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthLastDay = prevMonth.getDate();
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }
    
    // Current month days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Next month days to fill the last row
    const nextMonthDays = [];
    const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length;
    const remainingCells = 42 - totalDaysDisplayed; // 6 rows x 7 days
    
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };
  
  // Format date to display
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Check if a date is selected (in range or single selection)
  const isDateSelected = (date: Date) => {
    if (!dateRange.startDate) return false;
    
    // If only start date is selected
    if (!dateRange.endDate) {
      return isSameDay(date, dateRange.startDate);
    }
    
    // If both dates are selected, check if date is in range
    const dateTime = normalizeDate(date).getTime();
    const startTime = normalizeDate(dateRange.startDate).getTime();
    const endTime = normalizeDate(dateRange.endDate).getTime();
    
    return dateTime >= startTime && dateTime <= endTime;
  };
  
  // Check if a date is the start or end of the range
  const isRangeEndpoint = (date: Date) => {
    if (!dateRange.startDate) return false;
    
    const isStart = isSameDay(date, dateRange.startDate);
    const isEnd = dateRange.endDate ? isSameDay(date, dateRange.endDate) : false;
    
    return isStart || isEnd;
  };
  
  // Handle date click
  const handleDateClick = (date: Date) => {
    const normalizedDate = normalizeDate(date);
    
    if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
      // Start a new selection
      const newRange = {
        startDate: normalizedDate,
        endDate: null,
      };
      setDateRange(newRange);
    } else {
      // Complete the selection
      const startTime = dateRange.startDate.getTime();
      const clickedTime = normalizedDate.getTime();
      
      let newRange;
      if (clickedTime < startTime) {
        newRange = {
          startDate: normalizedDate,
          endDate: dateRange.startDate,
        };
      } else {
        newRange = {
          startDate: dateRange.startDate,
          endDate: normalizedDate,
        };
      }
      
      setDateRange(newRange);
      
      // Immediately check for matching preset when range is complete
      if (newRange.startDate && newRange.endDate) {
        const matchingRange = getMatchingTimeRange(newRange.startDate, newRange.endDate);
        setActiveTimeRange(matchingRange);
      }
    }
  };
  
  // Handle preset time range selection
  const handleTimeRangeSelect = (range: TimeRange) => {
    const today = normalizeDate(new Date());
    
    let start = new Date();
    let end = new Date();
    
    switch (range) {
      case 'today':
        start = new Date(today);
        end = new Date(today);
        break;
        
      case 'yesterday':
        start = new Date(today);
        start.setDate(start.getDate() - 1);
        end = new Date(start);
        break;
        
      case 'this-week':
        start = new Date(today);
        start.setDate(start.getDate() - start.getDay());
        end = new Date(today);
        break;
        
      case 'last-week':
        start = new Date(today);
        start.setDate(start.getDate() - start.getDay() - 7);
        end = new Date(start);
        end.setDate(end.getDate() + 6);
        break;
        
      case 'this-month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today);
        break;
        
      case 'last-month':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
        
      case 'this-year':
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today);
        break;
        
      case 'last-year':
        start = new Date(today.getFullYear() - 1, 0, 1);
        end = new Date(today.getFullYear() - 1, 11, 31);
        break;
        
      case 'all-time':
        start = new Date(2020, 0, 1); // Arbitrary start date
        end = new Date(today);
        break;
        
      default:
        return;
    }
    
    setDateRange({ startDate: start, endDate: end });
  };
  
  // Navigate to previous month
  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setNextMonth(new Date(nextMonth.getFullYear(), nextMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setNextMonth(new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1));
  };
  
  // Handle apply button click
  const handleApply = () => {
    console.log('Apply button clicked', {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      hasStartDate: !!dateRange.startDate,
      hasEndDate: !!dateRange.endDate
    });
    
    if (dateRange.startDate && dateRange.endDate) {
      console.log('Calling onApply with dates:', dateRange.startDate, dateRange.endDate);
      onApply(dateRange.startDate, dateRange.endDate);
    } else {
      console.log('Cannot apply: missing start or end date');
    }
  };
  
  // Days of the week
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];
  
  // Generate calendar days
  const currentMonthDays = generateCalendarDays(currentMonth);
  const nextMonthDays = generateCalendarDays(nextMonth);
  
  return (
   <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
  <div className="flex flex-col lg:flex-row">
    {/* Time range presets */}
    <div className="w-full hidden md:block lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
        {[
          { id: 'today', label: 'Today' },
          { id: 'yesterday', label: 'Yesterday' },
          { id: 'this-week', label: 'This week' },
          { id: 'last-week', label: 'Last week' },
          { id: 'this-month', label: 'This month' },
          { id: 'last-month', label: 'Last month' },
          { id: 'this-year', label: 'This year' },
          { id: 'last-year', label: 'Last year' },
          { id: 'all-time', label: 'All time' },
        ].map((item) => (
          <div
            key={item.id}
            className={`px-3 py-3 rounded-md cursor-pointer text-sm text-center lg:text-left ${
              activeTimeRange === item.id
                ? 'bg-[#F7931D]/10 text-[#F7931D]'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => handleTimeRangeSelect(item.id as TimeRange)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
    
    {/* Calendar */}
    <div className="flex-1 flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 sm:p-6 flex-grow">
        {/* Current Month */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outlined"
              className="p-1 rounded-full border-none hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={goToPrevMonth}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <h3 className="text-sm font-medium">
              {currentMonth.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </h3>
            <div className="w-8"></div>
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-[10px] sm:text-xs text-center font-medium text-gray-500 dark:text-gray-400 py-1"
              >
                {day}
              </div>
            ))}

            {currentMonthDays.map((day, index) => (
              <div
                key={index}
                className={`
                  text-center h-8 w-8 sm:h-9 sm:w-9 flex justify-center items-center text-xs rounded-full cursor-pointer
                  ${!day.isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : 'text-gray-800 dark:text-gray-200'}
                  ${isDateSelected(day.date) ? 'bg-[#F7931D]/10' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                  ${isRangeEndpoint(day.date) ? '!bg-[#F7931D] text-white hover:!bg-[#F7931D]' : ''}
                `}
                onClick={() => handleDateClick(day.date)}
              >
                {day.date.getDate()}
              </div>
            ))}
          </div>
        </div>

        {/* Next Month */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-8"></div>
            <h3 className="text-sm font-medium">
              {nextMonth.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </h3>
            <button
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={goToNextMonth}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-[10px] sm:text-xs text-center font-medium text-gray-500 dark:text-gray-400 py-1"
              >
                {day}
              </div>
            ))}

            {nextMonthDays.map((day, index) => (
              <div
                key={index}
                className={`
                  text-center h-8 w-8 sm:h-9 sm:w-9 flex justify-center items-center text-xs rounded-full cursor-pointer
                  ${!day.isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : 'text-gray-800 dark:text-gray-200'}
                  ${isDateSelected(day.date) ? 'bg-[#F7931D]/10' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                  ${isRangeEndpoint(day.date) ? '!bg-[#F7931D] text-white hover:!bg-[#F7931D]' : ''}
                `}
                onClick={() => handleDateClick(day.date)}
              >
                {day.date.getDate()}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Date Range Display and Actions */}
      <div className="mt-auto py-4 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-opacity-70 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="px-4 sm:px-5 font-archivo font-normal py-2 border border-gray-200 dark:border-gray-700 rounded-md text-xs sm:text-sm">
            {formatDate(dateRange.startDate)}
          </div>
          <span className="text-gray-500">–</span>
          <div className="px-4 sm:px-5 py-2 border border-gray-200 font-archivo font-normal dark:border-gray-700 rounded-md text-xs sm:text-sm">
            {formatDate(dateRange.endDate)}
          </div>
        </div>

        <div className="flex space-x-2 w-full sm:w-auto">
          <Button
            variant="outlined"
            className="flex-1 sm:flex-none text-sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 sm:flex-none bg-[#F7931D] text-white hover:bg-[#e88616] text-sm"
            onClick={(e) => {
              console.log('Apply button clicked event:', e);
              handleApply();
            }}
            disabled={!dateRange.startDate || !dateRange.endDate}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default DateRangePicker;