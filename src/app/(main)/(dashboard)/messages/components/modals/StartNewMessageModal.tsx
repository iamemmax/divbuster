"use client";
import Image from "next/image";
import React, { useRef, useCallback, useEffect } from "react";
import { Button, Dialog, DialogContent } from "@/components/core";
import { SmallSpinner } from "@/icons/core";
import CloseIcon from "@/app/icons/CloseIcon";
import { useLanguage } from "@/hooks/useLanguage";
import { startNewMessageTranslations } from "@/app/(main)/translation/chatMessagesTranslation";
import { useInfiniteQuery } from "react-query";
import { adminAxios } from "@/lib/axios";

interface buddyListProp {
  count: number;
  next: null;
  previous: null;
  results: any[];
}

const fetchBuddyList = async (pageParam?: string, language?: string) => {
  let url: string;
  if (pageParam) {
    try {
      const urlObj = new URL(pageParam);
      url = urlObj.pathname + urlObj.search;
    } catch {
      url = pageParam;
    }
  } else {
    url = `buddies?lang=${language}`;
  }
  const response = await adminAxios.get(url);
  return response.data as buddyListProp;
};

interface prop {
  isOpen: boolean;
  onClose: () => void;
  onSelectMessage: (message: any) => void;
}

export default function StartNewMessageModal({
  isOpen,
  onClose,
  onSelectMessage,
}: prop) {
  const { language } = useLanguage();
  const t = startNewMessageTranslations[language] || startNewMessageTranslations.en;

  const {
    data: buddyList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["buddy-list-modal", language],
    queryFn: ({ pageParam }) => fetchBuddyList(pageParam, language),
    getNextPageParam: (lastPage) => lastPage.next,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Infinite scroll logic
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  const totalCount = buddyList?.pages?.[0]?.count ?? 0;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] dark:bg-[#1A1D21] rounded-lg">
        <div className="w-full mx-auto bg-[#F9FAFB] dark:bg-[#1A1D21] rounded-xl shadow">
          {/* Header */}
          <div className="p-7 max-md:py-3 border-b flex items-center justify-between border-gray-400 border-opacity-50 dark:border-gray-600">
            <h2 className="text-base md:text-[1.6rem] font-archivo font-semibold text-[#101828] dark:text-gray-100">
              {t.startNewMessage}
            </h2>
            <Button className="dark:bg-transparent p-2" onClick={onClose}>
              <CloseIcon width={20} height={20} />
            </Button>
          </div>

          {/* Body */}
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <SmallSpinner />
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 px-7 mt-5">
                <span className="font-semibold text-base md:text-xl font-archivo text-[#1F2C37] dark:text-gray-200">
                  {t.buddiesOnDivebusters} ({totalCount})
                </span>
              </p>

              <ul className="space-y-3 px-6 pb-9 max-h-[65vh] overflow-y-auto py-2">
                {buddyList?.pages
                  ?.flatMap((page) => page.results)
                  ?.map((buddy, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition"
                      onClick={() => {
                        onSelectMessage(buddy);
                        onClose();
                      }}
                    >
                      <Image
                        src={
                          buddy?.profile_details?.profile_picture !== null
                            ? buddy?.profile_details?.profile_picture
                            : "/images/profile.png"
                        }
                        alt={buddy.first_name}
                        width={54}
                        height={54}
                        className="md:w-[3.375rem] md:h-[3.375rem] shrink-0 w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <p className="md:text-base text-sm font-archivo font-medium text-[#101828] dark:text-gray-100">
                          {`${buddy.first_name} ${buddy.last_name}`}
                        </p>
                        <p className="md:text-sm text-xs font-archivo truncate text-[#4F4F4F] dark:text-gray-400">
                          {`${t.dive}: ${buddy?.dashboard_analysis?.dives ?? 0} · ${t.diveSpot}: ${buddy?.dashboard_analysis?.dive_spots ?? 0} · ${t.bottom}: ${buddy?.dashboard_analysis?.bottom_time ?? 0}`}
                        </p>
                      </div>
                    </li>
                  ))}

                {/* Loading for more items */}
                {isFetchingNextPage && (
                  <div className="flex items-center justify-center py-4">
                    <SmallSpinner />
                  </div>
                )}

                {/* Observer target */}
                <div ref={loaderRef} className="h-4" />
              </ul>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
