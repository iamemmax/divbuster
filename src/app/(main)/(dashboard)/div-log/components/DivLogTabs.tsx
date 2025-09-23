import * as React from 'react';
import { cn } from '@/utils/classNames';
import { Button } from '@/components/core';

type TabOption = 'all_time' | 'last_month' | 'custom';

interface MonthlyTabsProps {
  value: TabOption;
  onChange: (value: TabOption) => void;
  className?: string;
  labels: {
    allTime: string;
    lastMonth: string;
    custom: string;
  };
}

export const DiveLogTabs: React.FC<MonthlyTabsProps> = ({
  value,
  onChange,
  className,
  labels
}) => {
  return (
    <div className={cn("flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden", className)}>
      <Button 
        className={cn(
          "flex items-center px-4 py-2 font-medium text-sm",
          value === 'all_time' 
            ? "bg-[#F0FFF4] dark:bg-green-900/20 text-green-600 rounded-none rounded-l dark:text-green-400" 
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        )}
        onClick={() => onChange('all_time')}
      >
        {value === 'all_time' && <span className="w-2 h-2 bg-green-500 mr-2"></span>}
        {labels.allTime}
      </Button>
      
      <Button 
        className={cn(
          "px-4 py-2 font-medium text-sm border-l border-gray-200 rounded-none dark:border-gray-700",
          value === 'last_month' 
            ? "bg-[#F0FFF4] dark:bg-green-900/20 text-green-600 dark:text-green-400" 
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        )}
        onClick={() => onChange('last_month')}
      >
        {value === 'last_month' && <span className="w-2 h-2 bg-green-500 mr-2"></span>}
        {labels.lastMonth}
      </Button>
      
      <Button 
        className={cn(
          "flex items-center px-4 py-2 font-medium text-sm border-l rounded-none rounded-r border-gray-200 dark:border-gray-700",
          value === 'custom' 
            ? "bg-[#F0FFF4] dark:bg-green-900/20 text-green-600 dark:text-green-400" 
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        )}
        onClick={() => onChange('custom')}
      >
        {value === 'custom' ? (
          <span className="w-2 h-2 bg-green-500 mr-2"></span>
        ) : (
          <svg 
            className="mr-1 w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 4V20M20 12H4" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
        {labels.custom}
      </Button>
    </div>
  );
};
