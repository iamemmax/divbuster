import React, { useState, useEffect } from "react";
import { MonthlyTabs } from "@/components/core/MonthlyTabs";
import { Button } from "@/components/core";
import DateRangePicker from "@/components/core/DateRangePicker";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";

// Define types for our stats
interface StatItem {
  title: string;
  value: string;
  suffix?: string;
  change: { percent: string; isPositive: boolean };
}

interface CustomDateRange {
  startDate: Date;
  endDate: Date;
}

const MonthlySnapShot = () => {
  // Data for this month
  const thisMonthStats: StatItem[] = [
    {
      title: "Total Dives",
      value: "16",
      change: { percent: "10%", isPositive: true },
    },
    {
      title: "Total Bottom Time",
      value: "9h 56m",
      change: { percent: "2%", isPositive: false },
    },
    {
      title: "Dive Spots",
      value: "5",
      change: { percent: "12%", isPositive: true },
    },
    {
      title: "Maximum Depth",
      value: "15m",
      suffix: "(45 ft)",
      change: { percent: "2%", isPositive: false },
    },
  ];
  
  // Data for last month
  const lastMonthStats: StatItem[] = [
    {
      title: "Total Dives",
      value: "12",
      change: { percent: "8%", isPositive: true },
    },
    {
      title: "Total Bottom Time",
      value: "10h 12m",
      change: { percent: "5%", isPositive: true },
    },
    {
      title: "Dive Spots",
      value: "4",
      change: { percent: "0%", isPositive: false },
    },
    {
      title: "Maximum Depth",
      value: "18m",
      suffix: "(59 ft)",
      change: { percent: "15%", isPositive: true },
    },
  ];
  
  // Custom period data (placeholder)
  const customStats: StatItem[] = [
    {
      title: "Total Dives",
      value: "42",
      change: { percent: "25%", isPositive: true },
    },
    {
      title: "Total Bottom Time",
      value: "28h 45m",
      change: { percent: "18%", isPositive: true },
    },
    {
      title: "Dive Spots",
      value: "9",
      change: { percent: "50%", isPositive: true },
    },
    {
      title: "Maximum Depth",
      value: "22m",
      suffix: "(72 ft)",
      change: { percent: "10%", isPositive: true },
    },
  ];
    
  const [activeTab, setActiveTab] = useState<
    "this-month" | "last-month" | "custom"
  >("this-month");
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });
  
  // Format date for display
  const formatDateRange = (start: Date, end: Date) => {
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${startStr} - ${endStr}`;
  };

  // Handle tab change
  const handleTabChange = (tab: "this-month" | "last-month" | "custom") => {
    setActiveTab(tab);
    if (tab === "custom" && !showDatePicker) {
      setShowDatePicker(true);
    }
  };

  // Handle date range selection
  const handleDateRangeApply = (startDate: Date, endDate: Date) => {
    setCustomDateRange({ startDate, endDate });
    setShowDatePicker(false);
    // Here you would typically fetch data for the selected date range
    // For now, we'll just use the placeholder customStats
  };

  // Get the appropriate stats based on the active tab
  const getActiveStats = () => {
    switch (activeTab) {
      case "this-month":
        return thisMonthStats;
      case "last-month":
        return lastMonthStats;
      case "custom":
        return customStats;
      default:
        return thisMonthStats;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-lg font-semibold font-archivo text-[#101828] dark:text-white">
            Monthly Snapshot
          </h2>

          <div className="flex flex-col items-end">
            <div className="flex mt-2 md:mt-0">
              <MonthlyTabs value={activeTab} onChange={handleTabChange} />
            </div>
            
            {activeTab === "custom" && !showDatePicker && (
              <button 
                onClick={() => setShowDatePicker(true)}
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {formatDateRange(customDateRange.startDate, customDateRange.endDate)}
              </button>
            )}
          </div>
        </div>

        {/* Date Range Picker Modal */}
        {showDatePicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
              <DateRangePicker
                initialStartDate={customDateRange.startDate}
                initialEndDate={customDateRange.endDate}
                onApply={handleDateRangeApply}
                onCancel={() => setShowDatePicker(false)}
              />
            </div>
          </div>
        )}

        {/* Token Balance */}
        <div className="bg-[#FFF5F5] dark:bg-red-900/10 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <h3 className="text-gray-700 dark:text-gray-300 font-medium">
                Total Token Balance:
              </h3>
              <span className="ml-2 text-gray-900 dark:text-white font-semibold">
                {activeTab === "this-month" ? "2,700" : 
                 activeTab === "last-month" ? "2,450" : "3,200"}
              </span>
            </div>
            <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              View History
              {/* <ChevronRightIcon className="w-4 h-4 ml-1" /> */}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getActiveStats().map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {stat.title}
                </h3>
                <Button className="text-gray-400 bg-transparent p-1 hover:text-gray-600 dark:hover:text-gray-300">
                  <svg
                    width="4"
                    height="16"
                    viewBox="0 0 4 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.99935 8.83331C2.45959 8.83331 2.83268 8.46022 2.83268 7.99998C2.83268 7.53974 2.45959 7.16665 1.99935 7.16665C1.53911 7.16665 1.16602 7.53974 1.16602 7.99998C1.16602 8.46022 1.53911 8.83331 1.99935 8.83331Z"
                      stroke="#98A2B3"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.99935 2.99998C2.45959 2.99998 2.83268 2.62688 2.83268 2.16665C2.83268 1.70641 2.45959 1.33331 1.99935 1.33331C1.53911 1.33331 1.16602 1.70641 1.16602 2.16665C1.16602 2.62688 1.53911 2.99998 1.99935 2.99998Z"
                      stroke="#98A2B3"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.99935 14.6666C2.45959 14.6666 2.83268 14.2935 2.83268 13.8333C2.83268 13.3731 2.45959 13 1.99935 13C1.53911 13 1.16602 13.3731 1.16602 13.8333C1.16602 14.2935 1.53911 14.6666 1.99935 14.6666Z"
                      stroke="#98A2B3"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div
                  className={`flex items-center ${stat.change.isPositive ? "text-green-500" : "text-red-500"} text-sm font-medium`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={
                        stat.change.isPositive
                          ? "M8 12V4M8 4L4 8M8 4L12 8"
                          : "M8 4V12M8 12L4 8M8 12L12 8"
                      }
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-1">{stat.change.percent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlySnapShot;
