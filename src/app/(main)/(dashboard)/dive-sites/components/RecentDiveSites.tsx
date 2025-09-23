"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { diveSiteResult, divSitesProp, useFetchDiveSites } from '../../api/div-sites/fetch-dive-sites'
import Image from 'next/image'
import { Button, ErrorModal } from '@/components/core'
import { useFetchCountry } from '../../api/fetchCountry'
import HeartIcon from '@/app/icons/(dashboard)/HeartIcon'
import ShareIcon2 from '@/app/icons/(dashboard)/ShareIcon2'
import MessageIcon2 from '@/app/icons/(dashboard)/MessageIcon2'
import LikeIcon from '@/app/icons/(dashboard)/LikeIcon'
import { useAddFouriteDivSIte } from '../../api/div-sites/add-favorite-dive-site'
import { useAuth } from '@/contexts/authentication'
import { UserDataProp } from '@/contexts/types'
import { SmallSpinner } from '@/icons/core'
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, useQueryClient } from 'react-query'
import { useErrorModalState } from '@/hooks'
import { formatAxiosErrorMessage } from '@/utils'
import { AxiosError } from 'axios'
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput'
import CupIcon from '@/app/icons/(dashboard)/CupIcon'
import InfoIcon from '@/app/icons/(dashboard)/InfoIcon'
import toast from 'react-hot-toast'
import { userDetails } from '@/app/(auth)/api/getAuthenticatedUser'

interface prop{
  user: userDetails | undefined
  data: InfiniteData<divSitesProp> | undefined
  loading:boolean;
  search: string;
  isFetchingNextPage: boolean
  hasNextPage: boolean | undefined
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<divSitesProp, unknown>>
}

// Custom hook for infinite scroll
const useInfiniteScroll = (
  callback: () => void,
  hasNextPage: boolean | undefined,
  isFetchingNextPage: boolean
) => {
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're near the bottom of the page
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      // Trigger when user is 200px from bottom
      const threshold = 200;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;
      
      if (isNearBottom && hasNextPage && !isFetchingNextPage) {
        callback();
      }
    };

    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [callback, hasNextPage, isFetchingNextPage]);
};

const RecentDiveSites = ({data, loading, search, fetchNextPage, hasNextPage, isFetchingNextPage}: prop) => {
  const { authState } = useAuth();
  const { user} = authState;
  const userData = user;
  const favoriteSites = user?.diver_profile.favourite_sites
  const [loadingItemId, setLoadingItemId] = useState<number | null>(null)
  const [myFavourite , setMyFavourite ] = useState<number[]>(favoriteSites || [])
  
useEffect(() => {
  setMyFavourite(favoriteSites as number[])
}, [])


  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  
      
  const {data:country}= useFetchCountry()
  const getCountry = (id:number) =>{
    const filterCountry = country?.results?.find((con) =>con?.id === id)
    return filterCountry
  }
  
  const queryClient = useQueryClient();
  
  const {mutate:handleAddTofavorite, isLoading:isAddingFav} = useAddFouriteDivSIte()
  
  const handleSave = (item:diveSiteResult) => {
    setLoadingItemId(item.id)
    handleAddTofavorite({
      action:"add",
      dive_site_id:item?.id,
      lang:String(userData?.profile_details?.language)
    },
    {
      onSuccess:() => {
        if(myFavourite.includes(item?.id)){

          const removeFrmFav = myFavourite.filter((x)=>x !== item?.id)
          setMyFavourite(removeFrmFav)
          toast.success("Dive sites removed from  your favoutite list")
        }else{
          setMyFavourite((prev)=>[...prev, item?.id])
          toast.success("Dive sites added to your favoutite list")

        }
        queryClient.invalidateQueries({queryKey:["user-details"]});
        queryClient.invalidateQueries({queryKey:["div-sites"]});
        setLoadingItemId(null)
      },
      onError:(error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
        setLoadingItemId(null)
      }
    })
  }

  // Memoized callback for fetchNextPage to prevent unnecessary re-renders
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Use our custom infinite scroll hook
  useInfiniteScroll(handleLoadMore, hasNextPage, isFetchingNextPage);

  // Flatten all pages data into a single array
  const allDiveSites = data?.pages?.flatMap(page => page.data.results) || [];
  const totalCount = data?.pages?.[0]?.data.count || 0;

  return (
    <div className=" transition-colors">
         
      {loading ? (
        <div className="flex justify-center items-center py-8"><SmallSpinner/></div>
      ) : (
        <>
          {/* Search Section */}

          {/* Results Count */}
          {search && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {allDiveSites.length} of {totalCount} dive site{totalCount !== 1 ? 's' : ''} found
              </p>
            </div>
          )}

          {/* No Results */}
          {allDiveSites.length === 0 && search && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No dive sites found matching "{search}"
              </p>
            </div>
          )}

          {/* Dive Sites Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
            {allDiveSites.map((item, idx: number) => (
              <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer p-2 md:py-[1.3rem] px-2 md:px-4 border border-gray-200 dark:border-gray-700"
                key={`${item.id}-${idx}`} // Better key using item id
              >
                {/* Main Image Section */}
                <div
                  className="relative rounded-lg overflow-hidden mt-2"
                  style={{ height: "15.6875rem" }}
                >
                  {/* Satellite/Map Background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(/images/dashboard/profile-Location.png)`,
                    }}
                  ></div>

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                  {/* Content Overlay */}
                  <div className="absolute top-1 md:top-2  text-white py-4 px-3 md:px-6 lg:px-[2.75rem] w-full">
                    {/* Add to Favorite Button */}
                    <div className="flex justify-end max-md:pr-2 items-center w-full mb-4">
                      <Button  
                        className={`${myFavourite?.includes(item?.id) ? "bg-[#F7931D] dark:bg-[#F7931D] text-white" : "bg-white text-[#4D5869] dark:text-gray-800 dark:bg-gray-100 hover:bg-gray-50 dark:hover:bg-gray-200 "} px-[1.0688rem] py-[.5206rem] rounded-2xl  font-archivo text-xs font-medium flex items-center gap-[.3125rem]  transition-colors disabled:opacity-50`}
                        onClick={() => handleSave(item)}
                        disabled={loadingItemId === item.id}
                      >
                        {loadingItemId === item.id ? (
                          <SmallSpinner color='#F7931D'/>
                        ) : (
                          <HeartIcon/>   
                        )}        
                       {myFavourite?.includes(item?.id)? "Remove from Favourite"  : "Add to Favourite"}
                      </Button>
                    </div>

                    {/* Site Info */}
                    <div className="">
                      <div className="flex items-center flex-wrap gap-[10px] md:gap-[20px]">
                        {/* Country Flag */}
                        <div className="relative h-[30px] md:h-[40px] rounded w-[40px] md:w-[52px] overflow-hidden">
                          <Image
                            src={`https://flagcdn.com/${getCountry(item?.country)?.alpha2code?.toLowerCase()}.svg`}
                            alt={`${getCountry(item?.country)?.name} flag`}
                            fill
                            className="object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>

                        {/* Title and Ranking */}
                        <div className="flex items-center flex-wrap gap-[10px]">
                          <p className="text-white font-archivo font-semibold text-xs sm:text-sm md:text-lg break-words">
                            {item?.title}
                          </p>
                          <div className="flex items-center bg-[#C5EFFF] dark:bg-blue-100 max-w-[100px] justify-center gap-[.3531rem] py-1 px-[.4063rem] rounded-lg">
                            <CupIcon/>
                            <p className="font-archivo text-xxs text-[#132346] dark:text-blue-800 font-semibold">
                              Rank:{item?.ranking}
                            </p>
                          </div>
                          <InfoIcon/>
                        </div>
                      </div>

                      {/* Address */}
                      <h2 className="font-semibold py-1 md:py-3 text-sm sm:text-base md:text-lg lg:text-[1.875rem] font-archivo text-white break-words">
                        {item?.address}
                      </h2>

                      {/* Site Type Tags */}
                      <div className="flex gap-x-2 py-2 md:py-3 items-center flex-wrap">
                        {item?.site_type?.split(",")?.map((tag, idx) => (
                          <div
                            key={idx}
                            className="px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] dark:bg-blue-50 text-[#175CD3] dark:text-blue-700 cursor-pointer whitespace-nowrap"
                          >
                            {tag.trim()}
                          </div>
                        ))}
                      </div>

                      {/* Coordinates */}
                      <div className="py-2">
                        <p className="text-xs text-[#F7F7F7] md:text-sm font-archivo break-all">
                          Latitude:{" "}
                          <span className="font-semibold">
                            {item?.lag}
                          </span>{" "}
                          <span className="px-2">•</span> Longitude:{" "}
                          <span className="font-semibold">
                            {item?.lon}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-3 flex justify-between flex-wrap gap-3 items-center">
                  {/* User Avatars */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                        alt="User avatar"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white object-cover"
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-gray-600 border border-white flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                          +1
                        </div>
                        <p className="text-sm font-archivo font-medium text-[#475467] dark:text-gray-300 hidden sm:block">
                          Like this dive
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Button className="bg-[#F9FAFB] dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 h-[2.8125rem] md:w-[3.75rem]  px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center transition-colors">
                      <LikeIcon/>
                    </Button>
                    
                    <Button className="bg-[#F9FAFB] dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 relative h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center transition-colors">
                      <div className="relative">
                        <MessageIcon2/>
                        <div className="absolute -top-4 -right-3 w-[.875rem] p-3 flex justify-center items-center h-[.875rem] bg-[#F7931D] rounded-full">
                          <p className="font-archivo text-xs font-bold text-white">12</p>
                        </div>
                      </div>
                    </Button>
                    
                    <Button className="bg-[#F9FAFB] dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center transition-colors">
                      <ShareIcon2/>
                    </Button>
                  </div>
                </div> 
              </div>
            ))}
          </div>

          {/* Loading indicator for next page */}
          {isFetchingNextPage && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2">
                <SmallSpinner/>
                <span className="text-gray-600 dark:text-gray-400">Loading more dive sites...</span>
              </div>
            </div>
          )}

          {/* End of results indicator */}
          {!hasNextPage && allDiveSites.length > 0 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                You've reached the end of all dive sites
              </span>
            </div>
          )}

          {/* Manual Load More Button (fallback) */}
          {hasNextPage && !isFetchingNextPage && allDiveSites.length > 0 && (
            <div className="flex justify-center items-center py-8">
              <Button
                onClick={handleLoadMore}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Load More Dive Sites
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!search && allDiveSites.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No dive sites available at the moment
              </p>
            </div>
          )}
        </>
      )}

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage ||
          "Please check your inputs and try again."
        }
      />
    </div>
  )
}

export default RecentDiveSites