"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../../components/shared/Header";
import { useUser } from "@/app/(auth)/api/getAuthenticatedUser";
import { DebouncedSearchInput } from "@/components/core/DebouncedSearchInput";
import { Search } from "lucide-react";
import Link from "next/link";
import { diverBuddiesTranslations } from "../../translation/diveBuddiesTranslation";
import { Language } from "../../translation/dashboardTranslation";

export default function DiveFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = useUser();
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  
  const language: Language = (user?.data?.profile_details?.language as Language);
  const t = diverBuddiesTranslations[language] || diverBuddiesTranslations.en;

  const getActiveTab = () => {
    if (pathname?.includes('/nearest')) return 'nearest';
    if (pathname?.includes('/plan')) return 'plan';
    if (pathname?.includes('/buddy')) return 'buddy';
    return '';
  };

  const activeTab = getActiveTab();

  return (
    <div className="flex relative flex-col h-screen">
      <Header title="Find Buddy" subtitle="" />
      
      <div className="flex gap-4 px-4 pb-5 md:p-4 bg-white dark:bg-gray-900 flex-wrap absolute top-[6rem] inset-x-0 z-30 shadow-md">
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
            className={`md:px-4 px-2 py-2 rounded transition-colors text-xs md:text-base ${
              activeTab === 'nearest'
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {t.nearestDiveSite}
          </Link>
          <Link
            href="/dive-finder/plan"
            className={`md:px-4 px-2 py-2 rounded transition-colors text-xs md:text-base ${
              activeTab === 'plan'
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {t.createDivePlan}
          </Link>
          <Link
            href="/dive-finder/buddy"
            className={`md:px-4 px-2 py-2 rounded transition-colors text-xs md:text-base ${
              activeTab === 'buddy'
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {t.findBuddy}
          </Link>
        </div>
      </div>

      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}