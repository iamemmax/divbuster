"use client"
import { useUser } from '@/app/(auth)/api/getAuthenticatedUser'
import { Button } from '@/components/core'
import React, { useMemo } from 'react'
import Link from 'next/link'
import { SmallSpinner } from '@/icons/core'
import { useLanguage } from '@/hooks/useLanguage'
import { useFetchBuddyList } from '../../api/buddy/fetchBudies';


const MyBuddyList = () => {
  const buddyProfile = useUser()
  const { language } = useLanguage()
  const {
    data: buddyList,
    isLoading,
    // error,
    // isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // hasPreviousPage,
    // fetchPreviousPage,
    // isFetchingPreviousPage
  } = useFetchBuddyList(language);

  // Extract all buddies from infinite query pages
  const allBuddies = useMemo(() => {
    if (!buddyList?.pages) return [];
    // Flatten all pages into a single array
    return buddyList.pages.flatMap(page => page?.results || []);
  }, [buddyList]);

  // Get total count from the first page (assuming it's consistent across pages)

  // Get current page info for display

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
       {isLoading && allBuddies.length === 0 ? <div className='flex justify-center items-center py-8'><SmallSpinner/></div>: <div className="">
          {allBuddies.map((buddy, index) => (
            <Link href={`/div-buddies/profile/${buddy?.id}`}
              key={buddy.id || index}
              className="relative  max-md:pl-0  max-2xl:pl-80  flex items-center justify-between py-3"
            >
              {/* Connecting line */}
              {index < allBuddies.length - 1 && (
                <div className="absolute left-5 top-12 w-[2px] h-6 bg-gray-200 dark:bg-gray-600 transition-colors duration-200"></div>
              )}

              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative z-10 shrink-0">
                  {buddy?.profile_details?.profile_picture ?<img
                    src={ buddy?.profile_details?.profile_picture}
                    alt={buddy.first_name || buddy.last_name || 'Buddy'}
                    className="size-10 rounded-full object-cover"
                  /> : <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    {buddy?.first_name?.[0]?.toUpperCase() || buddy?.last_name?.[0]?.toUpperCase() || ""}
                  </div>}
                  <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate transition-colors duration-200">
                    {buddy?.first_name??""} { buddy?.last_name ??""}
                  </div>
                </div>
              </div>
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