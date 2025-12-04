"use client";
import React from "react";
import LeafletMap from "./LeafletMap";
import { diveSiteResult } from "../../api/div-sites/fetch-dive-sites";
import { buddyResult } from "../../api/buddy/fetchBudies";

interface BuddyPlanMapProps {
  diveSites: diveSiteResult[];
  buddyList: buddyResult[];
}

export default function BuddyPlanMap({ diveSites, buddyList }: BuddyPlanMapProps) {
  return (
    <div className="relative">
      <LeafletMap diveSites={diveSites} />
      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg max-w-xs">
        <h3 className="font-semibold mb-2">Available Buddies ({buddyList.length})</h3>
        <div className="max-h-32 overflow-y-auto space-y-1">
          {buddyList.slice(0, 5).map((buddy, index) => (
            <div key={index} className="text-sm p-1 bg-gray-50 dark:bg-gray-700 rounded">
              {`${buddy?.first_name} ${buddy?.last_name}` || `Buddy ${index + 1}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}