import React from "react";

// Mock three-dot menu icon
const ThreeDotMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
    <circle cx="12" cy="5" r="1" fill="currentColor"/>
    <circle cx="12" cy="19" r="1" fill="currentColor"/>
  </svg>
);

interface DiveStats {
  recentSpot: {
    name: string;
    location: string;
  };
  weeklyStats: {
    diveActivities: number;
    avgDistance: string;
    avgDivespot: number;
    avgBottomTime: string;
    avgDepth: string;
  };
}

const diveStatsData: DiveStats = {
  recentSpot: {
    name: "Dive Spot: Bari Reef #1",
    location: "Bari Reef, Bonaire"
  },
  weeklyStats: {
    diveActivities: 2,
    avgDistance: "12m",
    avgDivespot: 2,
    avgBottomTime: "3h 34m",
    avgDepth: "4m(ft)"
  }
};

const DiveActivitySideBar = () => {
  const StatRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between items-center py-4 border-b border-opacity-70 border-[#DBDADE] dark:border-gray-600 dark:border-opacity-50 last:border-b-0 transition-colors duration-200">
      <span className="text-[#667085] dark:text-gray-400 text-sm font-archivo font-normal transition-colors duration-200">{label}</span>
      <span className="text-[#101828] dark:text-gray-100 text-base font-medium transition-colors duration-200">{value}</span>
    </div>
  );

  return (
    <div className="lg:max-w-md mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen lg:p-4 lg:px-6 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-700/20 border border-[#DBDADE] dark:border-gray-600 p-6 transition-colors duration-200">
        {/* Header */}
        <div className="flex justify-between border-b dark:border-gray-600 pb-[.5313rem] items-start mb-6 transition-colors duration-200">
          <h2 className="text-base font-medium text-[#101828] dark:text-gray-100 transition-colors duration-200">
            Recent Dive Activities
          </h2>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 text-gray-600 dark:text-gray-400">
            <ThreeDotMenu />
          </button>
        </div>

        {/* Recent Dive Spot */}
        <div className="mb-4">
          <h3 className="text-base font-archivo font-semibold text-[#101828] dark:text-gray-100 mb-2 transition-colors duration-200">
            {diveStatsData.recentSpot.name}
          </h3>
          <p className="text-[#667085] dark:text-gray-400 text-sm font-archivo font-normal transition-colors duration-200">
            {diveStatsData.recentSpot.location}
          </p>
        </div>

        {/* Stats Section */}
        <div className="space-y-0">
          <StatRow 
            label="Dive Activities / Week" 
            value={diveStatsData.weeklyStats.diveActivities} 
          />
          <StatRow 
            label="Avg. Distance / Week" 
            value={diveStatsData.weeklyStats.avgDistance} 
          />
          <StatRow 
            label="Avg. Divespot / Week" 
            value={diveStatsData.weeklyStats.avgDivespot} 
          />
          <StatRow 
            label="Avg. Bottom Time / Week" 
            value={diveStatsData.weeklyStats.avgBottomTime} 
          />
          <StatRow 
            label="Avg. Depth / Week" 
            value={diveStatsData.weeklyStats.avgDepth} 
          />
        </div>

        {/* View All Stats Link */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-600 transition-colors duration-200">
          <button className="text-[#F7931D] dark:text-orange-400 text-base font-semibold hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-200">
            View all your Dive Stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiveActivitySideBar;