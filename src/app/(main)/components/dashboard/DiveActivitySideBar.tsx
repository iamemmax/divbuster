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
    <div className="flex justify-between items-center py-4 border-b border-opacity-70 border-[#DBDADE]  last:border-b-0">
      <span className="text-[#667085] text-sm font-archivo font-normal">{label}</span>
      <span className="text-[#101828] text-base font-medium ">{value}</span>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-[#DBDADE] p-6">
        {/* Header */}
        <div className="flex justify-between border-b pb-[.5313rem]  items-start mb-6">
          <h2 className="text-base font-medium text-[#101828]">
            Recent Dive Activities
          </h2>
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ThreeDotMenu />
          </button>
        </div>

        {/* Recent Dive Spot */}
        <div className="mb-4">
          <h3 className="text-base font-archivo font-semibold  text-[#101828] mb-2">
            {diveStatsData.recentSpot.name}
          </h3>
          <p className="text-[#667085] text-sm font-archivo font-normal">
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
        <div className="mt-8 pt-6 border-t border-gray-100">
          <button className="text-[#F7931D] text-base font-semibold hover:text-orange-600 transition-colors">
            View all your Dive Stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiveActivitySideBar;