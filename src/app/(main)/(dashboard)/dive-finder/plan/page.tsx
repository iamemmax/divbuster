"use client";
import React, { useMemo } from "react";
import CreateBuddyPlanMap from "../components/CreateBuddyPlanMap";
import { useLanguage } from "@/hooks/useLanguage";
import { useFetchAllBuddies } from "../../api/buddy/fetchBudies";
import { useSearchContext } from "../layout";

export default function CreateDivePlan() {
  const {language}=useLanguage()
  const search = useSearchContext();

  // Fetch all buddies without search parameter for client-side filtering
  const {
    data: buddyList,
    isLoading,
  } = useFetchAllBuddies(language);

  const diveBuddirsData = buddyList?.results || [];

  // Filter buddies based on search term (client-side only)
  const filteredBuddies = useMemo(() => {
    if (!search.trim()) return diveBuddirsData;

    const searchLower = search.toLowerCase();
    return diveBuddirsData.filter(buddy =>
      `${buddy.first_name} ${buddy.last_name}`.toLowerCase().includes(searchLower) ||
      buddy.username?.toLowerCase().includes(searchLower)
    );
  }, [diveBuddirsData, search]);

  return (
    <div className="relative w-full h-screen">
      {!isLoading && filteredBuddies.length === 0 && search.trim() && (
        <div className="absolute inset-0 flex items-center justify-center z-[100] bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
              No buddies found for "{search}"
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Try searching with different keywords
            </p>
          </div>
        </div>
      )}
      <CreateBuddyPlanMap
        buddyList={filteredBuddies}
        isLoading={isLoading}
      />
    </div>
  );
}