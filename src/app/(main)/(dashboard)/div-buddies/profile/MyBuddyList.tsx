"use client"
import { useUser } from '@/app/(auth)/api/getAuthenticatedUser'
import { Button } from '@/components/core'
import React, { useMemo } from 'react'
import { useFetchBuddyList } from '../../api/buddy/fetchBudies'
import Link from 'next/link'
import { SmallSpinner } from '@/icons/core'

const MyBuddyList = () => {
  const buddyProfile = useUser()
  const {
    data: buddyList,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingPreviousPage
  } = useFetchBuddyList(buddyProfile?.data?.data?.profile_details?.language as string);

  // Extract all buddies from infinite query pages
  const allBuddies = useMemo(() => {
    if (!buddyList?.pages) return [];
    // Flatten all pages into a single array
    return buddyList.pages.flatMap(page => page?.results || []);
  }, [buddyList]);

  // Get total count from the first page (assuming it's consistent across pages)
  const totalCount = useMemo(() => {
    return buddyList?.pages?.[0]?.count || 0;
  }, [buddyList]);

  // Get current page info for display
  const currentPageInfo = useMemo(() => {
    const totalResults = allBuddies.length;
    return {
      start: totalResults > 0 ? 1 : 0,
      end: totalResults,
      total: totalCount
    };
  }, [allBuddies.length, totalCount]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/20 transition-colors duration-200">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <h3 className="font-semibold font-archivo text-base text-[#101828] dark:text-gray-100 transition-colors duration-200">
          {buddyProfile?.data?.data?.first_name}{buddyProfile?.data?.data?.first_name&&"'s Buddies"}
        </h3>
        {/* <p className="text-xs text-[#78828A] dark:text-gray-400 font-medium font-archivo transition-colors duration-200">
          {buddyProfile?.} Dive Buddies
        </p> */}
      </div>
      <div className="p-4">
       {isLoading?<div className='flex justify-center items-center py-8'><SmallSpinner/></div>: <div className="">
          {allBuddies.map((buddy, index) => (
            <Link href={`/div-buddies/profile/${buddy?.id}`}
              key={buddy.id || index}
              className="relative flex items-center justify-between py-3"
            >
              {/* Connecting line */}
              {index < allBuddies.length - 1 && (
                <div className="absolute left-5 top-12 w-[2px] h-6 bg-gray-200 dark:bg-gray-600 transition-colors duration-200"></div>
              )}

              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative z-10 flex-shrink-0">
                  {buddy?.profile_details?.profile_picture ?<img
                    src={ buddy?.profile_details?.profile_picture}
                    alt={buddy.first_name || buddy.last_name || 'Buddy'}
                    className="w-10 h-10 rounded-full object-cover"
                  /> : <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    {buddy?.first_name?.[0]?.toUpperCase() || buddy?.last_name?.[0]?.toUpperCase() || ""}
                  </div>}
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate transition-colors duration-200">
                    {buddy?.first_name??""} { buddy?.last_name ??""}
                  </div>
                </div>
              </div>
              <button className="flex items-center justify-center hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors duration-200 p-1 flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15ZM10 20C8.61667 20 7.31667 19.7417 6.1 19.225C4.88333 18.6917 3.825 17.975 2.925 17.075C2.025 16.175 1.30833 15.1167 0.775 13.9C0.258333 12.6833 0 11.3833 0 10C0 8.61667 0.258333 7.31667 0.775 6.1C1.30833 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31667 6.1 0.799999C7.31667 0.266666 8.61667 0 10 0C11.3833 0 12.6833 0.266666 13.9 0.799999C15.1167 1.31667 16.175 2.025 17.075 2.925C17.975 3.825 18.6833 4.88333 19.2 6.1C19.7333 7.31667 20 8.61667 20 10C20 11.3833 19.7333 12.6833 19.2 13.9C18.6833 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6917 13.9 19.225C12.6833 19.7417 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                    fill="#A9B0C2"
                    className="dark:fill-gray-500"
                  />
                </svg>
              </button>
            </Link>
          ))}
        </div>}
      </div>
      <div className="flex py-3 justify-center items-center w-full">
        <Button
          variant={"outlined"}
          className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : hasNextPage ? "View more" : "No more buddies"}
        </Button>
      </div>
    </div>
  )
}

export default MyBuddyList