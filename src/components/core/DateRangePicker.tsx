import React, { useState } from 'react';
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
  
  // Check if a date is selected
  const isDateSelected = (date: Date) => {
    if (!dateRange.startDate || !dateRange.endDate) {
      return dateRange.startDate?.getTime() === date.getTime();
    }
    
    const time = date.getTime();
    return time >= dateRange.startDate.getTime() && time <= dateRange.endDate.getTime();
  };
  
  // Check if a date is the start or end of the range
  const isRangeEndpoint = (date: Date) => {
    if (!dateRange.startDate || !dateRange.endDate) return false;
    
    const time = date.getTime();
    return time === dateRange.startDate.getTime() || time === dateRange.endDate.getTime();
  };
  
  // Handle date click
  const handleDateClick = (date: Date) => {
    if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
      // Start a new selection
      setDateRange({
        startDate: date,
        endDate: null,
      });
    } else {
      // Complete the selection
      if (date < dateRange.startDate) {
        setDateRange({
          startDate: date,
          endDate: dateRange.startDate,
        });
      } else {
        setDateRange({
          startDate: dateRange.startDate,
          endDate: date,
        });
      }
    }
    
    setActiveTimeRange('custom');
  };
  
  // Handle preset time range selection
  const handleTimeRangeSelect = (range: TimeRange) => {
    setActiveTimeRange(range);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
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
    if (dateRange.startDate && dateRange.endDate) {
      onApply(dateRange.startDate, dateRange.endDate);
    }
  };
  
  // Days of the week
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];
  
  // Generate calendar days
  const currentMonthDays = generateCalendarDays(currentMonth);
  const nextMonthDays = generateCalendarDays(nextMonth);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="flex">
        {/* Time range presets */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4">
          <div className="space-y-2">
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
                className={`px-3 py-3 rounded-md cursor-pointer text-sm ${
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
        <div className="flex-1  flex flex-col">
          <div className="grid grid-cols-2 gap-8 p-6 flex-grow">
            {/* Current Month */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Button 
                variant={"outlined"}
                  className="p-1 rounded-full border-none hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={goToPrevMonth}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
                <h3 className="text-sm font-medium">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="w-8"></div> {/* Spacer for alignment */}
              </div>
              
              <div className="grid grid-cols-7 gap-3">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-xs text-center font-medium text-gray-500 dark:text-gray-400 py-1">
                    {day}
                  </div>
                ))}
                
                {currentMonthDays.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      text-center h-9 w-9 flex justify-center items-center text-xs rounded-full cursor-pointer
                      ${!day.isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : 'text-gray-800 dark:text-gray-200'}
                      ${isDateSelected(day.date) ? 'bg-[#F7931D]/10' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                      ${isRangeEndpoint(day.date) ? '!bg-[#F7931D] text-white hover:!bg-[#F7931D]' : ''}
                      relative
                    `}
                    onClick={() => handleDateClick(day.date)}
                  >
                    {day.date.getDate()}
                    {/* {[6, 13].includes(day.date.getDate()) && day.isCurrentMonth && (
                      <span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#F7931D] rounded-full"></span>
                    )} */}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Next Month */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8"></div> {/* Spacer for alignment */}
                <h3 className="text-sm font-medium">
                  {nextMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button 
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={goToNextMonth}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-3">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-xs text-center font-medium text-gray-500 dark:text-gray-400 py-1">
                    {day}
                  </div>
                ))}
                
                {nextMonthDays.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      text-center h-9 w-9 flex justify-center items-center text-xs rounded-full cursor-pointer
                      ${!day.isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : 'text-gray-800 dark:text-gray-200'}
                      ${isDateSelected(day.date) ? 'bg-[#F7931D]/10' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                      ${isRangeEndpoint(day.date) ? '!bg-[#F7931D] text-white hover:!bg-[#F7931D]' : ''}
                      relative
                    `}
                    onClick={() => handleDateClick(day.date)}
                  >
                    {day.date.getDate()}
                    {/* {[13].includes(day.date.getDate()) && day.isCurrentMonth && (
                      <span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#F7931D] rounded-full"></span>
                    )} */}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Date Range Display and Actions - Now sticky at bottom */}
          <div className="mt-auto py-4 px-6 flex items-center justify-between border-opacity-70 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="px-5 font-archivo font-normal py-2 border border-gray-200 dark:border-gray-700 rounded-md text-sm">
                {formatDate(dateRange.startDate)}
              </div>
              <span className="text-gray-500">–</span>
              <div className="px-5 py-2 border border-gray-200 font-archivo font-normal dark:border-gray-700 rounded-md text-sm">
                {formatDate(dateRange.endDate)}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outlined" 
                className="text-sm"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#F7931D] text-white hover:bg-[#e88616] text-sm"
                onClick={handleApply}
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




