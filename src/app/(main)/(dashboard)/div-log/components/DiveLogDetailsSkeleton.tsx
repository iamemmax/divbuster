import React from 'react';

const DiveLogDetailsSkeleton = () => {
  return (
    <div className="md:px-[1.875rem] h-[83vh] overflow-y-auto">
      <div className="2xl:mt-[1.125rem] py-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 w-full">
        {/* Main Content */}
        <div className="animate-pulse">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-[#EAECF0] dark:border-gray-700 p-[1.875rem] px-4 md:px-[2.2813rem]">
            {/* Header section */}
            <div className="flex items-center justify-between w-full mb-6">
              <div className="flex items-start space-x-4 w-full">
                {/* Profile skeleton */}
                <div className="shrink-0 md:h-[60px] md:w-[60px] h-[40px] w-[40px] rounded-full bg-gray-300 dark:bg-gray-600"></div>
                
                <div className="flex items-start w-full justify-between">
                  <div className="flex flex-col flex-1">
                    {/* Title skeleton */}
                    <div className="h-5 md:h-6 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-2"></div>
                    {/* Date skeleton */}
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-64 mb-2"></div>
                    {/* Dive site skeleton */}
                    <div className="h-4 md:h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                  </div>
                  
                  {/* Visibility button skeleton */}
                  <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Map/image skeleton */}
            <div className="relative rounded-lg bg-gray-300 dark:bg-gray-600 mt-4" style={{ minHeight: "17.6875rem" }}>
              <div className="absolute top-4 left-4 space-y-3">
                {/* Flag and location skeleton */}
                <div className="flex items-center gap-4">
                  <div className="h-8 w-12 bg-gray-400 dark:bg-gray-500 rounded"></div>
                  <div className="h-4 w-48 bg-gray-400 dark:bg-gray-500 rounded"></div>
                  <div className="h-6 w-16 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                </div>
                
                {/* Title skeleton */}
                <div className="h-8 w-80 bg-gray-400 dark:bg-gray-500 rounded"></div>
                
                {/* Tags skeleton */}
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                  <div className="h-6 w-12 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                  <div className="h-6 w-14 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                </div>
                
                {/* Coordinates skeleton */}
                <div className="h-4 w-64 bg-gray-400 dark:bg-gray-500 rounded"></div>
              </div>
            </div>

            {/* Metrics section skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 lg:grid-cols-5 py-4 px-4 md:px-8 border border-[#EAECF0] dark:border-gray-700 rounded-lg mt-5">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex-1 px-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
                </div>
              ))}
            </div>

            {/* Chart skeleton */}
            <div className="mt-6 h-64 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>

            {/* Air usage section skeleton */}
            <div className="border border-[#EAECF0] dark:border-gray-700 rounded-lg mt-[1.875rem] w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
              
              <div className="w-full grid grid-cols-[3fr_1fr]">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-s-[1.25rem] py-[1.1875rem] px-5 lg:px-[2.3125rem] grid grid-cols-[1fr_3fr_3fr] gap-3 lg:gap-9">
                  <div className="flex items-end">
                    <div className="w-8 h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="flex flex-col gap-5 justify-between">
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 justify-between">
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
                    </div>
                  </div>
                </div>
                <div className="w-full rounded-e-[1.25rem] bg-gray-400 dark:bg-gray-600 flex flex-col gap-5 justify-center items-center py-[2.125rem] px-5 lg:px-[2.3125rem]">
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded w-20"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-500 rounded w-16"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-12"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional charts skeleton */}
            <div className="mt-6 h-48 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="animate-pulse">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-[#EAECF0] dark:border-gray-700 p-6">
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiveLogDetailsSkeleton;