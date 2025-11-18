"use client";
import React, { useState, lazy, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "../../components/shared/Header";
import { useUser } from "@/app/(auth)/api/getAuthenticatedUser";
import { diveSiteResult, divSitesProp, useFetchDiveSites } from "../api/div-sites/fetch-dive-sites";
import { FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query";
import { DebouncedSearchInput } from "@/components/core/DebouncedSearchInput";
import { Search } from "lucide-react";
import { useAuth } from "@/contexts/authentication";
import { diverBuddiesTranslations } from "../../translation/diveBuddiesTranslation";
import { Language } from "../../translation/dashboardTranslation";
import { buddyListProp, buddyResult, useFetchBuddyList } from "../api/buddy/fetchBudies";

// Lazy load heavy components
const DiveSiteLeafletMap = lazy(() => import("./components/DiveSiteLeafletMap"));
const CreateBuddyPlanMap = lazy(() => import("./components/CreateBuddyPlanMap"));
const BuddiesAroundMe = lazy(() => import("./components/BuddiesAroundMe"));

// Loading component
const MapLoader = () => (
  <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
    </div>
  </div>
);


interface prop {
  diveSites: diveSiteResult[]
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<divSitesProp, unknown>>
}

// Main DiveMap Component
export default function DiveMap() {
  const { data: user } = useUser();
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'nearest';

  const language: Language = (user?.data?.profile_details?.language as Language);
  const t = diverBuddiesTranslations[language] || diverBuddiesTranslations.en;
  
  const apiParams = {
    lang: user?.data?.profile_details?.language || "en",
    favorite: "",
    search,
    paginate: "no"
  };

  const {
    data,
   
  } = useFetchDiveSites(apiParams);

  const { 
    data: buddyList, 
    fetchNextPage: FetchBuddyNextPage,
    hasNextPage: hasNextBuddyPage,
    isFetchingNextPage: isFetchBuddyNextPage,
  } = useFetchBuddyList(language);

 

  // Redirect to appropriate page based on tab
  React.useEffect(() => {
    if (activeTab === 'nearest') {
      window.location.href = '/dive-finder/nearest';
    } else if (activeTab === 'plan') {
      window.location.href = '/dive-finder/plan';
    } else if (activeTab === 'buddy') {
      window.location.href = '/dive-finder/buddy';
    }
  }, [activeTab]);

  return (
    <div className="flex relative flex-col h-screen">
      {/* Header */}
      <Header title="Buddy Finder" subtitle="" />

      {/* Tabs */}
      <div className="flex gap-4  px-4 pb-5 md:p-4 bg-white dark:bg-gray-900 flex-wrap absolute top-[6rem] inset-x-0 z-30 shadow-md">
        <div className="relative flex-1 w-full">
          <DebouncedSearchInput
            placeholder="Search for buddy, dive location, etc."
            onSearch={setSearch}
            debounceTime={300}
            value={search}
            className="py-3"
            icon={<Search size={18} />}
          />           
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/dive-finder/nearest"
            className="md:px-4 px-2 py-2 rounded transition-colors text-xs md:text-base bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            {t.nearestDiveSite}
          </Link>
          <Link
            href="/dive-finder/plan"
            className="md:px-4 px-2 py-2 rounded transition-colors text-xs md:text-base bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            {t.createDivePlan}
          </Link>
          <Link
            href="/dive-finder/buddy"
            className="md:px-4 px-2 py-2 rounded transition-colors text-xs md:text-base bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            {t.findBuddy}
          </Link>
        </div>
      </div>

      {/* Default Content */}
      <div className="mt-4 flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Choose an Option</h2>
          <p className="text-gray-600 dark:text-gray-400">Select from the options above to view maps</p>
        </div>
      </div>
    </div>
  );
}