"use client";
import React, { useState } from "react";
import Header from "../../components/shared/Header";
import { DebouncedSearchInput } from "@/components/core/DebouncedSearchInput";
import { DiveLogTabs } from "./components/DivLogTabs";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import { Button } from "@/components/core";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import UpArrow from "@/app/icons/(dashboard)/UpArrow";
import DateRangePicker from "@/components/core/DateRangePicker";
import DiveLogContainer from "./components/DiveLogContainer";
import ArrowDown from "@/app/icons/(dashboard)/ArrowDown";
import CalendarIcon from "@/app/icons/(dashboard)/CalendarIcon";
interface CustomDateRange {
  startDate: Date;
  endDate: Date;
}

const DiveLog = () => {
  const [globalSeaech, setGlobalSeaech] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "all_time" | "last_month" | "custom"
  >("all_time");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });
  // Handle tab change
  const handleTabChange = (tab: "all_time" | "last_month" | "custom") => {
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

  const stats = [
    {
      name: "Total Dives",
      value: "42",
      count: "high",
      percentage: "10%",
    },
    {
      name: "Total Depth Overall",
      value: "36m (75ft)",
      count: "low",
      percentage: "2%",
    },
    {
      name: "Total Bottom Time",
      value: "1d 1h 45m",
      count: "",
      percentage: "",
    },
    {
      name: "Total Dive Sites",
      value: "15",
      count: "low",
      percentage: "2%",
    },
  ];

  return (
  <div className="text-black dark:text-white">
  <Header title={"Dive Logs"} subtitle="June 12, 2024" />

  {/* Dashboard content */}
  <div className="mt-[1.125rem] p-4 md:px-[1.875rem] h-[83vh] overflow-y-auto">
    <div className="flex justify-between items-center gap-3 flex-wrap">
      <div className="relative w-full md:w-96">
        <DebouncedSearchInput
          placeholder="search for Date, dive sites, longitude and Latitude"
          onSearch={(value) => setGlobalSeaech(value)}
          debounceTime={300}
          value={globalSeaech}
        />
      </div>

      {/* Date Picker Button */}
      <div
        className="border border-[#D0D5DD] dark:border-gray-700 flex items-center gap-2 rounded-lg py-[.625rem] px-4 
        text-[#344054] dark:text-gray-200 text-sm font-archivo font-medium cursor-pointer 
        bg-white dark:bg-gray-900"
        onClick={() => setShowDatePicker(true)}
      >
       <CalendarIcon/>
        {customDateRange.startDate.toDateString()} -{" "}
        {customDateRange.endDate.toDateString()}
      </div>
    </div>

    {/* Overview Section */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6">
      <h2 className="text-lg font-semibold font-archivo text-[#101828] dark:text-white">
        Total Overview
      </h2>

      <div className="flex flex-col items-end">
        <div className="flex mt-2 md:mt-0">
          <DiveLogTabs value={activeTab} onChange={handleTabChange} />
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

    {/* Stats Cards */}
    <div className="grid max-xxscren:grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-4 mt-[1.25rem]">
      {stats?.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-[#EAECF0] dark:border-gray-700"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xs md:text-sm font-medium text-[#667085] font-archivo dark:text-gray-300">
              {stat.name}
            </h3>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="p-0 bg-transparent text-black dark:text-white">
                  <ThreeDot />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-40 bg-white dark:bg-gray-800 dark:text-white rounded-md py-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                sideOffset={5}
              >
                <DropdownMenuItem className="group text-[13px] leading-none w-full rounded-[3px] hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center h-[25px] py-4 cursor-pointer select-none">
                  <Button className="flex bg-transparent text-black dark:text-white w-full px-0 items-center gap-1">
                    Update
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="group text-[13px] leading-none rounded-[3px] hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center h-[25px] py-4 cursor-pointer select-none">
                  <Button className="flex bg-transparent text-black dark:text-white items-center w-full px-0 gap-1">
                    Delete
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Stat Values */}
          <div className="flex items-center justify-between flex-wrap mt-2">
            <p className="text-sm md:text-2xl font-semibold font-archivo mt-2">
              {stat.value}
            </p>
            <div>
              {stat.count === "high" && (
                <p className="text-xs md:text-sm bg-[#ECFDF3] dark:bg-green-900/40 gap-1 flex items-center max-w-[70px] rounded-2xl py-[.3063rem] px-[.7813rem] font-medium text-[#027A48] dark:text-green-400">
                  <UpArrow />
                  {stat.percentage}
                </p>
              )}
              {stat.count === "low" && (
                <p className="text-xs md:text-sm font-medium gap-1 flex items-center max-w-[70px] bg-[#FEF3F2] dark:bg-red-900/40 rounded-2xl py-[.3063rem] px-[.7813rem] font-archivo text-[#B42318] dark:text-red-400">
                 <ArrowDown/>
                  {stat.percentage}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Dive Log Container */}
  <DiveLogContainer
  data_type={activeTab === "last_month" ? activeTab : undefined}
  date_from={
    activeTab === "custom" && customDateRange?.startDate
      ? customDateRange.startDate.toISOString().split("T")[0]
      : undefined
  }
  date_to={
    activeTab === "custom" && customDateRange?.endDate
      ? customDateRange.endDate.toISOString().split("T")[0]
      : undefined
  }
/>
    {/* Date Picker Modal */}
    {showDatePicker && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-lg p-6">
          <DateRangePicker
            initialStartDate={customDateRange.startDate}
            initialEndDate={customDateRange.endDate}
            onApply={handleDateRangeApply}
            onCancel={() => setShowDatePicker(false)}
          />
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default DiveLog;
