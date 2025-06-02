import React, { useState, useEffect } from "react";
import { MonthlyTabs } from "@/components/core/MonthlyTabs";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Switch,
} from "@/components/core";
import DateRangePicker from "@/components/core/DateRangePicker";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import { useAuth } from "@/contexts/authentication";
import { UserDataProp } from "@/contexts/types";
import DashboardIcon from "@/app/icons/(dashboard)/Dashbaordicon";
import { ToggleSwitch } from "@/components/core/Toggle";
import { info } from "console";
import Link from "next/link";

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
    const startStr = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endStr = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
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
  // const getActiveStats = () => {
  //   switch (activeTab) {
  //     case "this-month":
  //       return thisMonthStats;
  //     case "last-month":
  //       return lastMonthStats;
  //     case "custom":
  //       return customStats;
  //     default:
  //       return thisMonthStats;
  //   }
  // };

  const [toggle, setToggle] = useState(false);
  const { authState } = useAuth();
  const { user } = authState;
  const userData = user as UserDataProp;

  const stats = [
    {
      name: "Total Dives",
      value: userData.dashboard_analysis?.dives,
      lastMonth: userData.dashboard_analysis?.dives_last_month,
    },
    {
      name: "Total Bottom Time",
      value: userData.dashboard_analysis?.bottom_time,
      lastMonth: userData.dashboard_analysis?.bottom_time_last_month,
    },
    {
      name: "Dive Spots",
      value: userData.dashboard_analysis?.dive_spots,
      lastMonth: userData.dashboard_analysis?.dive_spots_last_month,
    },
    {
      name: "Maximum Depth",
      value: `${userData.dashboard_analysis?.max_depth}`,
      lastMonth: userData.dashboard_analysis?.max_depth_last_month,
    },
  ];

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
                {/* {formatDateRange(customDateRange.startDate, customDateRange.endDate)} */}
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

        <div className="flex justify-between bg-[#F044380D]/5 p-4 w-full rounded-sm items-center">
          <div className="flex items-center gap-[3.5rem]">
            <div className="flex items-center gap-[.625rem]">
              <DashboardIcon width={20} height={20} color="#F04438" />
              <p className="text-sm font-medium text-[#F04438] font-archivo dark:text-gray-300">
                Total Token Balance: {userData?.wallet?.balance ?? 0}
              </p>
            </div>
            <div className=" flex items-center">
              <ToggleSwitch
                isOn={toggle}
                onToggle={setToggle}
                size="small"
                label=""
                id="small-toggle"
                className=""
              />
            </div>
          </div>
          <div className="flex items-center gap-[10px] ">
            <p className="text-xs sm:text-sm  text-[#09090B] font-archivo dark:text-gray-300">
              View History
            </p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="#F9A602"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="grid max-xxscren:grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-4 mt-[1.25rem]">
          {stats?.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-[#EAECF0]"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-[#667085] font-archivo dark:text-white">
                  {stat.name}
                </h3>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="p-0 bg-transparent">
                      {" "}
                      <ThreeDot />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="min-w-40 bg-white rounded-md py-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                  >
                    <DropdownMenuItem
                      className='group text-[13px] leading-none text-violet11 w-full rounded-[3px] hover:bg-[#eee] flex items-center h-[25px]  py-4 
                         cursor-pointer select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"'
                    >
                      <Button className="flex bg-transparent text-black  w-full px-0 items-center gap-1">
                        Update
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='group text-[13px] leading-none text-violet11 rounded-[3px] hover:bg-[#eee] flex items-center h-[25px]  py-4 
                         cursor-pointer select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"'
                    >
                      <Button className="flex bg-transparent text-black  items-center  w-full px-0 gap-1">
                        Delete
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-2xl font-semibold mt-2">{stat.value}</p>
           
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlySnapShot;
