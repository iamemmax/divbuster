import React from 'react';

const DiveLogSkeleton = () => {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg border border-[#EAECF0] dark:border-gray-700 p-[1.875rem] max-md:py-4 px-4 md:px-[2.2813rem] animate-pulse"
        >
          {/* Header section */}
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-start space-x-4 w-full">
              {/* Profile skeleton */}
              <div className="shrink-0 md:h-[60px] md:w-[60px] h-[40px] w-[40px] rounded-full bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="flex items-start gap-y-2 max-md:flex-wrap w-full justify-between">
                <div className="flex flex-col w-full">
                  {/* Title skeleton */}
                  <div className="h-4 md:h-5 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-2"></div>
                  {/* Date skeleton */}
                  <div className="h-3 md:h-4 bg-gray-300 dark:bg-gray-600 rounded w-64 mb-2"></div>
                  {/* Dive site skeleton */}
                  <div className="h-4 md:h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                </div>
                
                {/* Visibility button skeleton */}
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="w-full">
            {/* Map/image skeleton */}
            <div className="relative rounded-lg bg-gray-300 dark:bg-gray-600 mt-4" style={{ minHeight: "10.6875rem" }}>
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

            {/* Stats section skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-5 pb-2">
              {[...Array(3)].map((_, statIndex) => (
                <div key={statIndex} className="flex gap-x-4 items-start">
                  <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiveLogSkeleton;