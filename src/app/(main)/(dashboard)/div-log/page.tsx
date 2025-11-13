








"use client";
import React, { useState } from "react";
import Header from "../../components/shared/Header";
import { DebouncedSearchInput } from "@/components/core/DebouncedSearchInput";
import { DiveLogTabs } from "./components/DivLogTabs";
import CalendarIcon from "@/app/icons/(dashboard)/CalendarIcon";
import DateRangePicker from "@/components/core/DateRangePicker";
import DiveLogContainer from "./components/DiveLogContainer";
import { diveLogTabsTranslations, diveLogTranslations } from "../../translation/diveLogTranslation";
import { useLanguage } from "@/hooks/useLanguage";

interface CustomDateRange {
  startDate: Date;
  endDate: Date;
}

const DiveLog = () => {

  const {language}= useLanguage()
 
  const t = diveLogTranslations[language] || diveLogTranslations?.en;
  const mt = diveLogTabsTranslations[language] || diveLogTabsTranslations?.en;


  const [globalSearch, setGlobalSearch] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"all_time" | "last_month" | "custom">("all_time");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });

  const handleTabChange = (tab: "all_time" | "last_month" | "custom") => {
    setActiveTab(tab);
    if (tab === "custom" && !showDatePicker) {
      setShowDatePicker(true);
    }
  };

  const handleDateRangeApply = (startDate: Date, endDate: Date) => {
    setCustomDateRange({ startDate, endDate });
    setShowDatePicker(false);
  };

  return (
    <div className="text-black dark:text-white">
      <Header title={t.title} subtitle={""} />


      {/* Dashboard content */}
      <div className="mt-[1.125rem] p-4 md:px-[1.875rem] h-[83vh] overflow-y-auto">
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <div className="relative w-full md:w-96">
            <DebouncedSearchInput
              placeholder={t.searchPlaceholder}
              onSearch={(value) => setGlobalSearch(value)}
              debounceTime={300}
              value={globalSearch}
            />
          </div>

          <div
            className="border border-[#D0D5DD] dark:border-gray-700 flex items-center gap-2 rounded-lg py-[.625rem] px-4 
            text-[#344054] dark:text-gray-200 text-sm font-archivo font-medium cursor-pointer 
            bg-white dark:bg-gray-900"
            onClick={() => setShowDatePicker(true)}
          >
            <CalendarIcon />
            {customDateRange.startDate.toDateString()} - {customDateRange.endDate.toDateString()}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6">
          <h2 className="text-lg font-semibold font-archivo text-[#101828] dark:text-white">
            {t.totalOverview}
          </h2>

          <div className="flex flex-col items-end">
            <div className="flex mt-2 md:mt-0">
              <DiveLogTabs value={activeTab} onChange={handleTabChange}
                labels={{
                  allTime: mt.allTime,
                  lastMonth: mt.lastMonth,
                  custom: mt.custom
                }}
              />
            </div>

          
          </div>
        </div>

        <DiveLogContainer
          data_type={activeTab === "last_month" ? activeTab : undefined}
          date_from={
            activeTab === "custom" && customDateRange?.startDate
              ? customDateRange?.startDate?.toISOString().split("T")[0]
              : undefined
          }
          date_to={
            activeTab === "custom" && customDateRange?.endDate
              ? customDateRange?.endDate?.toISOString()?.split("T")[0]
              : undefined
          }
        />

        {showDatePicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-lg p-6">
              <DateRangePicker
                initialStartDate={customDateRange?.startDate}
                initialEndDate={customDateRange?.endDate}
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





