"use client";
import React, { useState } from "react";
import Header from "../../components/shared/Header";
import { useUser } from "@/app/(auth)/api/getAuthenticatedUser";
import { diveSiteResult, divSitesProp, useFetchDiveSites } from "../api/div-sites/fetch-dive-sites";
import GoogleMap from "./components/GoogleMap";
import { FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query";
import { DebouncedSearchInput } from "@/components/core/DebouncedSearchInput";
import { Search } from "lucide-react";
import CreateBuddyPlanMap from "./components/CreateBuddyPlanMap";
import { useAuth } from "@/contexts/authentication";
import { diverBuddiesTranslations } from "../../translation/diveBuddiesTranslation";
import { Language } from "../../translation/dashboardTranslation";
import { buddyListProp, buddyResult, useFetchBuddyList } from "../api/buddy/fetchBudies";

interface buddyProp {
  buddyList: buddyResult[]
 FetchBuddyNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<buddyListProp, unknown>>
hasNextBuddyPage: boolean | undefined
isFetchBuddyNextPage: boolean

}


interface prop {
    diveSites: diveSiteResult[]
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<divSitesProp, unknown>>
}
// Nearest Dive Site Component - simplified without Wrapper
function NearestDiveSite({ diveSites, fetchNextPage,hasNextPage,isFetchingNextPage}: prop) {
  return (
    <div className="flex-1">
      <GoogleMap diveSites={diveSites}  hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/>
    </div>
  );
}

// Create Dive Plan Component
function CreateDivePlan({FetchBuddyNextPage,buddyList,hasNextBuddyPage,isFetchBuddyNextPage}:buddyProp) {

    
  return (
    <div className="flex-1">
      <CreateBuddyPlanMap buddyList={buddyList}  fetchNextPage={FetchBuddyNextPage}isFetchingNextPage={isFetchBuddyNextPage} hasNextPage={hasNextBuddyPage} />
    </div>
  );
}

// Find Buddy Component
function FindBuddy() {

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto bg-white  dark:bg-gray-900 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Find Buddy</h2>
        {/* Add your find buddy form here */}
      </div>
    </div>
  );
}

// Main DiveMap Component
export default function DiveMap() {
  const { data: user } = useUser();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("nearest");

    const language: Language = (user?.data?.profile_details?.language as Language);
    const t = diverBuddiesTranslations[language] || diverBuddiesTranslations.en;
  
  const apiParams = {
    lang: user?.data?.profile_details?.language || "en",
    favorite: "",
    search,
    paginate:"yes"
  };

  const {
    data,
  hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchDiveSites(apiParams);

  const { 
      data: buddyList, 
  
      fetchNextPage:FetchBuddyNextPage,
      hasNextPage:hasNextBuddyPage,
      isFetchingNextPage:isFetchBuddyNextPage,
    
    } = useFetchBuddyList(language);

  const diveSites = data?.pages?.flatMap((page) => page?.data?.results) || [];
  const diveBuddirsData = buddyList?.pages?.flatMap((page) => page?.results) || [];

  const tabs = [
    { id: "nearest", label: "Nearest Dive Site", component: <NearestDiveSite diveSites={diveSites} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/> },
    { id: "plan", label: "Create Dive Plan", component: <CreateDivePlan isFetchBuddyNextPage={isFetchBuddyNextPage}  buddyList={diveBuddirsData} FetchBuddyNextPage={FetchBuddyNextPage} hasNextBuddyPage={hasNextBuddyPage}/> },
    { id: "buddy", label: "Find Buddy", component: <FindBuddy /> },
  ];

  return (
    <div className="flex relative flex-col h-screen">
      {/* Header */}
      <Header title="Dive Finder" subtitle="" />

      {/* Tabs */}
      <div className="flex gap-4 px-4 pb-5 md:p-4 bg-white dark:bg-gray-900 flex-wrap  absolute top-[6rem] inset-x-0 z-[9999999] shadow-md">
         <div className="relative flex-1 w-full">
                    <DebouncedSearchInput
                      placeholder="Search for dive buddy, dive location, etc."
                      onSearch={setSearch}
                      debounceTime={300}
                      value={search}
                      className="py-3"
                      icon={<Search size={18} />}
                    />           
                  </div>
      <div className="flex items-center gap-4">
          {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`md:px-4 px-2  py-2 rounded transition-colors text-xs md:text-base ${
              activeTab === tab.id
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      </div>

      {/* Active Tab Content */}
      {tabs.find(tab => tab.id === activeTab)?.component}
    </div>
  );
}