"use client";
import React, { useMemo } from "react";
import DiveSiteLeafletMap from "../components/DiveSiteLeafletMap";
import { useAuth } from "@/contexts/authentication";
import { useSearchContext } from "../layout";
import { useFetchAllDiveSites } from "../../api/div-sites/fetchDiveSiteNearMe";

export default function NearestDiveSites() {
  const { authState } = useAuth();
  const search = useSearchContext();

  // Fetch all sites without search parameter
  const apiParams = {
    lang: authState?.user?.profile_details?.language || "en",
    search: ""
  };

  const { data, isLoading, error } = useFetchAllDiveSites(apiParams);
  const allDiveSites = data?.data || [];

  // Debug: Log if there's an error
  if (error) {
    console.error("Error fetching dive sites:", error);
  }

  // Filter dive sites based on search term (client-side only)
  const filteredDiveSites = useMemo(() => {
    if (!search.trim()) return allDiveSites;

    const searchLower = search.toLowerCase();
    return allDiveSites.filter(site =>
      site.title?.toLowerCase().includes(searchLower) ||
      site.address?.toLowerCase().includes(searchLower) ||
      site.description?.toLowerCase().includes(searchLower)
    );
  }, [allDiveSites, search]);

  return (
    <div className="relative w-full h-screen">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-[100] bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading dive sites...</p>
          </div>
        </div>
      )}
      {!!error && (
        <div className="absolute inset-0 flex items-center justify-center z-[100] bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 text-lg font-medium">
              Error loading dive sites
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Please try again later
            </p>
          </div>
        </div>
      )}
      {!isLoading && !error && filteredDiveSites.length === 0 && search.trim() && (
        <div className="absolute inset-0 flex items-center justify-center z-[100] bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90">
          <div className="text-center">
            <p className="text-black dark:text-white text-lg font-medium">
              No dive sites found for "{search}"
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Try searching with different keywords
            </p>
          </div>
        </div>
      )}
      {!isLoading && !error && <DiveSiteLeafletMap diveSites={filteredDiveSites} isLoading={isLoading} />}
    </div>
  );
}