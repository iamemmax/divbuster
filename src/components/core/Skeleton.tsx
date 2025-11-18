import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4' 
}) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${width} ${height} ${className}`}
    />
  );
};

export const DiveSiteSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 px-2 md:px-4 border border-gray-200 dark:border-gray-700">
    <div className="relative rounded-lg overflow-hidden min-h-[250px] bg-gray-200 dark:bg-gray-700 animate-pulse">
      <div className="absolute top-0 py-4 px-3 md:px-2 2xl:px-[0.75rem] w-full flex justify-center flex-col h-full">
        <div className="flex items-center flex-wrap gap-[10px] md:gap-[20px] mb-4">
          <Skeleton width="w-[40px] xl:w-[52px]" height="h-[30px] xl:h-[40px]" />
          <Skeleton width="w-32" height="h-6" />
          <Skeleton width="w-20" height="h-6" />
        </div>
        <Skeleton width="w-48" height="h-8" className="mb-3" />
        <div className="flex gap-2 mb-3">
          <Skeleton width="w-16" height="h-6" className="rounded-2xl" />
          <Skeleton width="w-20" height="h-6" className="rounded-2xl" />
        </div>
        <Skeleton width="w-64" height="h-4" />
      </div>
    </div>
    <div className="mt-3 flex justify-between items-center">
      <div className="flex items-center gap-2 sm:gap-5">
        <Skeleton width="w-[2rem] md:w-[3.75rem]" height="h-[2.2rem] md:h-[2.8125rem]" className="rounded-2xl" />
        <Skeleton width="w-[2rem] md:w-[3.75rem]" height="h-[2.2rem] md:h-[2.8125rem]" className="rounded-xl" />
        <Skeleton width="w-[2rem] md:w-[3.75rem]" height="h-[2.2rem] md:h-[2.8125rem]" className="rounded-xl" />
      </div>
    </div>
  </div>
);

export const DiveLogSkeleton = () => (
  <div className="border border-[#EAECF0] rounded-lg mt-[1.875rem] w-full p-6">
    <div className="flex justify-between items-center mb-2">
      <Skeleton width="w-32" height="h-5" />
      <Skeleton width="w-6" height="h-6" />
    </div>
    <div className="flex gap-8 mb-4">
      <div>
        <Skeleton width="w-16" height="h-4" className="mb-1" />
        <Skeleton width="w-20" height="h-6" />
      </div>
      <div>
        <Skeleton width="w-16" height="h-4" className="mb-1" />
        <Skeleton width="w-20" height="h-6" />
      </div>
    </div>
    <Skeleton width="w-full" height="h-64" className="rounded" />
  </div>
);

export const DiveBuddySkeleton = () => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <Skeleton width="w-12" height="h-12" className="rounded-full" />
        <div className="min-w-0">
          <Skeleton width="w-32" height="h-4" className="mb-1" />
          <Skeleton width="w-40" height="h-3" />
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <Skeleton width="w-16" height="h-6" />
    </td>
    <td className="px-6 py-4">
      <div className="flex gap-1">
        <Skeleton width="w-12" height="h-6" className="rounded-full" />
        <Skeleton width="w-16" height="h-6" className="rounded-full" />
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="text-right">
        <Skeleton width="w-20" height="h-4" />
      </div>
    </td>
  </tr>
);

export const SuggestedBuddySkeleton = () => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3 flex-1">
      <Skeleton width="w-10" height="h-10" className="rounded-full" />
      <div className="flex-1">
        <Skeleton width="w-24" height="h-4" />
      </div>
    </div>
    <Skeleton width="w-5" height="h-5" className="rounded-full" />
  </div>
);