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
import DashboardIcon from "@/app/icons/(dashboard)/Dashbaordicon";
import { ToggleSwitch } from "@/components/core/Toggle";
import { info } from "console";
import Link from "next/link";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";

// Define types for our stats
interface StatItem {
  title: string;
  value: string;
  suffix?: string;
  change: { percent: string; isPositive: boolean };
}

export interface CustomDateRange {
  startDate: Date;
  endDate: Date;
}

const MonthlySnapShot = () => {
  
 

  const [activeTab, setActiveTab] = useState<
    "this-month" | "last-month" | "custom"
  >("this-month");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });

 

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

  

  const [toggle, setToggle] = useState(false);
  const { authState } = useAuth();
  const { user } = authState;
  const userData = user as User;

  const stats = [
    {
      name: "Total Dives",
      value: userData?.dashboard_analysis?.dives,
      lastMonth: userData?.dashboard_analysis?.dives_last_month,
    },
    {
      name: "Total Bottom Time",
      value: userData?.dashboard_analysis?.bottom_time,
      lastMonth: userData?.dashboard_analysis?.bottom_time_last_month,
    },
    {
      name: "Dive Spots",
      value: userData?.dashboard_analysis?.dive_spots,
      lastMonth: userData?.dashboard_analysis?.dive_spots_last_month,
    },
    {
      name: "Maximum Depth",
      value: `${userData?.dashboard_analysis?.max_depth}`,
      lastMonth: userData?.dashboard_analysis?.max_depth_last_month,
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

       <div className="flex flex-wrap justify-between bg-[#F044380D]/5 p-4 w-full rounded-sm items-start sm:items-center gap-4 sm:gap-0">
  {/* Left Section */}
  <div className="flex flex-wrap items-start sm:items-center gap-10 lg:gap-[3.5rem] w-full sm:w-auto">
    <div className="flex items-center gap-[0.625rem]">
      <DashboardIcon width={20} height={20} color="#F04438" />
<p className="text-sm font-medium text-[#F04438] font-archivo dark:text-gray-300 flex items-center gap-1">
  <span>Total Token Balance:</span>
  {toggle ? userData?.wallet?.balance ?? 0 : <span className="text-[#F04438] text-2xl mt-2 ">*******</span>}
</p>
    </div>
    <div className="flex items-center">
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

  {/* Right Section */}
  <Link href={"/token-management"} className="flex items-center gap-2 sm:gap-[10px]">
    <p className="text-xs sm:text-sm text-[#09090B] font-archivo dark:text-gray-300">
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Link>
</div>

{/* Responsive Stats Grid */}
<div className="grid max-xxscren:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
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
              <ThreeDot />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-40 bg-white rounded-md py-[5px] shadow-lg">
            <DropdownMenuItem className="text-sm hover:bg-[#eee] cursor-pointer">
              <Button className="flex bg-transparent text-black w-full px-0 items-center gap-1">
                Update
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm hover:bg-[#eee] cursor-pointer">
              <Button className="flex bg-transparent text-black w-full px-0 items-center gap-1">
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
