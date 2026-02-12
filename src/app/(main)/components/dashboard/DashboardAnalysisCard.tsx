"use client";
import React, { useState } from "react";
import { cn } from "@/utils/classNames";
import { Button } from "@/components/core";

type AnalysisTab = "overall" | "this_month" | "last_month";

interface AnalysisData {
  totalDives: number;
  totalDepth: string;
  totalBottomTime: string;
  averageDepth?: string;
  maxDepth: string;
  diveCount?: number;
}

interface DashboardAnalysisCardProps {
  overallData?: AnalysisData;
  thisMonthData?: AnalysisData;
  lastMonthData?: AnalysisData;
  className?: string;
}

const DashboardAnalysisCard: React.FC<DashboardAnalysisCardProps> = ({
  overallData = {
    totalDives: 156,
    totalDepth: "2,340m",
    totalBottomTime: "245h 30m",
    averageDepth: "15m",
    maxDepth: "42m",
    diveCount: 156,
  },
  thisMonthData = {
    totalDives: 12,
    totalDepth: "180m",
    totalBottomTime: "18h 45m",
    averageDepth: "15m",
    maxDepth: "38m",
    diveCount: 12,
  },
  lastMonthData = {
    totalDives: 8,
    totalDepth: "120m",
    totalBottomTime: "12h 30m",
    averageDepth: "15m",
    maxDepth: "35m",
    diveCount: 8,
  },
  className,
}) => {
  const [activeTab, setActiveTab] = useState<AnalysisTab>("overall");

  const tabs: { id: AnalysisTab; label: string }[] = [
    { id: "overall", label: "Overall" },
    { id: "this_month", label: "This Month" },
    { id: "last_month", label: "Last Month" },
  ];

  const getCurrentData = (): AnalysisData => {
    switch (activeTab) {
      case "this_month":
        return thisMonthData;
      case "last_month":
        return lastMonthData;
      default:
        return overallData;
    }
  };

  const data = getCurrentData();

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg border border-[#EAECF0] dark:border-gray-700 transition-colors duration-200", className)}>
      {/* Header with Tabs */}
      <div className="p-6 border-b border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-[#101828] dark:text-gray-100 font-archivo transition-colors duration-200">
            Diving Analysis
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                activeTab === tab.id
                  ? "bg-orange-500 text-white dark:bg-orange-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Total Dives */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Dives
            </span>
            <span className="text-3xl font-bold text-[#101828] dark:text-gray-100">
              {data.totalDives}
            </span>
          </div>

          {/* Total Depth */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Depth
            </span>
            <span className="text-3xl font-bold text-[#101828] dark:text-gray-100">
              {data.totalDepth}
            </span>
          </div>

          {/* Total Bottom Time */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Bottom Time
            </span>
            <span className="text-3xl font-bold text-[#101828] dark:text-gray-100">
              {data.totalBottomTime}
            </span>
          </div>

          {/* Average Depth */}
          {data.averageDepth&&<div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Average Depth
            </span>
            <span className="text-3xl font-bold text-[#101828] dark:text-gray-100">
              {data.averageDepth}
            </span>
          </div>}

          {/* Max Depth */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Max Depth
            </span>
            <span className="text-3xl font-bold text-[#101828] dark:text-gray-100">
              {data.maxDepth}
            </span>
          </div>

          {/* Dive Count */}
          {data.diveCount&&<div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Dive Count
            </span>
            <span className="text-3xl font-bold text-[#101828] dark:text-gray-100">
              {data.diveCount}
            </span>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalysisCard;

