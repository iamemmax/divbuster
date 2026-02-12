"use client"
import React, { useState, useEffect, useMemo } from "react";
import { MonthlyTabs } from "@/components/core/MonthlyTabs";
import DateRangePicker from "@/components/core/DateRangePicker";
import { useAuth } from "@/contexts/authentication";
import DashboardIcon from "@/app/icons/(dashboard)/Dashbaordicon";
import { ToggleSwitch } from "@/components/core/Toggle";
import Link from "next/link";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import { MonthlySnapShotTranslations } from "../../translation/dashboardTranslation";
import { useLanguage } from "@/hooks/useLanguage";

export interface CustomDateRange {
  startDate: Date;
  endDate: Date;
}

interface prop{
   user: User | null
}
type Language = "en" | "es" | "fr" | "nl";

const MonthlySnapShot = ({user}:prop) => {
  const [activeTab, setActiveTab] = useState<"this-month" | "last-month" | "custom">("this-month");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });
  // const [toggle, setToggle] = useState(false);

  const handleTabChange = (tab: "this-month" | "last-month" | "custom") => {
    console.log('Tab changed to:', tab);
    setActiveTab(tab);
    if (tab === 'custom') {
      setShowDatePicker(true);
    } else {
      // TODO: Fetch filtered data based on tab
      console.log('Should fetch data for:', tab);
    }
  };

  // Calculate date ranges for filtering
  const getDateRange = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    switch (activeTab) {
      case 'this-month':
        return {
          start: new Date(currentYear, currentMonth, 1),
          end: now
        };
      case 'last-month':
        return {
          start: new Date(currentYear, currentMonth - 1, 1),
          end: new Date(currentYear, currentMonth, 0)
        };
      case 'custom':
        return {
          start: customDateRange.startDate,
          end: customDateRange.endDate
        };
      default:
        return {
          start: new Date(currentYear, currentMonth, 1),
          end: now
        };
    }
  };

  // Get filtered stats based on active tab
  const getFilteredStats = () => {
    // For now, return the same data but with debug info
    // TODO: Replace with actual API call to fetch filtered data
    const dateRange = getDateRange();
    
    return {
      dives: user?.dashboard_analysis?.dives || 0,
      bottom_time: user?.dashboard_analysis?.bottom_time || 0,
      dive_spots: user?.dashboard_analysis?.dive_spots || 0,
      max_depth: user?.dashboard_analysis?.max_depth || 0
    };
  };

  const filteredData = useMemo(() => getFilteredStats(), [activeTab, customDateRange, user?.dashboard_analysis]);

 

const {language}= useLanguage()
  const t = MonthlySnapShotTranslations[language] || MonthlySnapShotTranslations.en;

  const stats = [
    { name: t.totalDives, value: filteredData.dives },
    { name: t.totalBottomTime, value: filteredData.bottom_time },
    { name: t.diveSpots, value: filteredData.dive_spots },
    { name: t.maximumDepth, value: `${filteredData.max_depth}` },
  ];

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-lg font-semibold font-archivo text-[#101828] dark:text-white">
          {t.monthlySnapshot}
        </h2>

        {/* <div className="flex flex-col items-end">
          <MonthlyTabs value={activeTab} onChange={handleTabChange} user={user}/>
        </div> */}
      </div>

      {/* Date Range Picker */}
      {/* {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <DateRangePicker
              initialStartDate={customDateRange.startDate}
              initialEndDate={customDateRange.endDate}
              onApply={(start, end) => {
                console.log('Date range applied:', start, end);
                setCustomDateRange({ startDate: start, endDate: end });
                setShowDatePicker(false);
              }}
              onCancel={() => setShowDatePicker(false)}
            />
          </div>
        </div>
      )} */}

      {/* Balance & toggle */}
      <div className="flex flex-wrap justify-between bg-[#F044380D]/5 p-4 w-full rounded-sm items-start sm:items-center gap-2 sm:gap-0">
        <div className="flex flex-wrap items-start sm:items-center gap-5 lg:gap-[3.5rem] w-full sm:w-auto">
          <div className="flex items-center gap-2 md:gap-[0.625rem]">
          <div className="">  <DashboardIcon width={20} height={20} color="#F04438" /></div>
            <p className={`text-xs md:text-sm font-medium font-archivo  flex items-center gap-1 ${
              (user?.wallet?.balance ?? 0) >= 50 ? 'text-orange-500' : 'text-[#F04438]'
            }`}>
              <span>{t.totalTokenBalance}</span>
              { user?.wallet?.balance ?? 0}
            </p>
          </div>
          {/* <div className="flex items-center">
            <ToggleSwitch isOn={toggle} onToggle={setToggle} size="small" id="small-toggle" />
          </div> */}
        </div>

        {/* History link */}
        <Link href="/token-management" className="flex items-center gap-1 sm:gap-[10px]">
          <p className="text-xs sm:text-sm text-[#09090B] font-archivo dark:text-gray-300">
            {t.viewHistory}
          </p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="#F9A602" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid max-xxscren:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mt-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-[#EAECF0]">
            <div className="flex justify-between items-center">
              <h3 className="text-xs md:text-sm font-medium text-[#667085] font-archivo dark:text-white">
                {stat.name}
              </h3>
            </div>
            <p className="text-xl md:text-2xl font-semibold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlySnapShot;
