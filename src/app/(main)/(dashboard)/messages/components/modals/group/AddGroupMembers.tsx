"use client";
import { Button, Dialog, DialogContent } from "@/components/core";
import CloseIcon from "@/app/icons/CloseIcon";
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
import { SmallSpinner } from "@/icons/core";
import { Othermember } from "@/app/(main)/(dashboard)/api/chats/group/fetchGroupChatList";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/contexts/authentication";


interface Prop {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  setShowCreateGroupChat: React.Dispatch<React.SetStateAction<boolean>>;
  setSuggestedMembers: React.Dispatch<React.SetStateAction<Othermember[] | undefined>>
  suggestedMembers: Othermember[] | undefined
}



export default function AddNewGroupMembersModal({
  isOpen,
  onClose,
  groupId,
  setShowCreateGroupChat,
  setSuggestedMembers,
  suggestedMembers
}: Prop) {
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const {authState}=useAuth()
  const {user}=authState
  const { 
    data: buddyList, 
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["buddy-list-group", user?.profile_details?.language],
    queryFn: ({ pageParam }) => fetchBuddyList(pageParam, String(user?.profile_details?.language)),
    getNextPageParam: (lastPage) => lastPage.next,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  // Intersection Observer for infinite scroll
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

  const handleRemoveMember = (id: string) => {
    setSuggestedMembers((prev) => prev?.filter((member) => member?.user_id?.toString() !== id?.toString()));
    setSelectedMemberIds((prev) => prev.filter((memberId) => memberId !== id));
  };

  const handleAddMembers = () => {
    setShowCreateGroupChat(true);
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] dark:bg-[#1A1D21] rounded-lg">
        <div className="w-full mx-auto bg-[#F9FAFB] dark:bg-[#1A1D21] rounded-xl shadow">
          <div className="p-7 border-b border-gray-400 border-opacity-50 dark:border-gray-600">
            <h2 className="text-xl md:text-[1.875rem] font-archivo font-semibold text-[#101828] dark:text-gray-100">
              Create a New Group
            </h2>
          </div>

          {suggestedMembers && suggestedMembers?.length > 0 && (
            <>
              <div className="p-7">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selected Dive Buddies
                </h3>
                <div className="flex items-center flex-wrap gap-6 overflow-x-auto pb-2">
                  {suggestedMembers?.map((buddy, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center relative"
                    >
                      {buddy?.image ? (
                        <img
                          src={buddy?.image}
                          alt={buddy.first_name}
                          className="md:w-[4.375rem] md:h-[4.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/default-avatar.png"
                          }}
                        />
                      ) : (
                        <div className="md:w-[4.375rem] md:h-[4.375rem] w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                          {`${buddy?.first_name?.[0] ?? ""}${buddy?.last_name?.[0] ?? ""}`}
                        </div>
                      )}

                      <Button
                        className="absolute bottom-5 right-0 h-[1.3625rem] w-[1.3625rem] flex justify-center items-center -mt-2 -mr-2 bg-[#EEEFF0] dark:bg-gray-700 border rounded-full p-0.5 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => handleRemoveMember(buddy?.user_id?.toString())}
                      >
                        <CloseIcon color="#A9B0C2" />
                      </Button>
                      <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {`${buddy.first_name} ${buddy.last_name}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="m1-4 border-gray-300 dark:border-gray-600" />
            </>
          )}

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 px-7 mt-5">
            <span className="font-semibold text-base md:text-xl font-archivo text-[#1F2C37] dark:text-gray-200">
              Add member from your Buddy list
            </span>
          </p>

          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <SmallSpinner />
            </div>
          ) : (
            <ul className="space-y-6 px-6 pb-9 max-h-[55vh] overflow-y-auto py-4">
              {buddyList?.pages
                ?.flatMap(page => page.results)
                ?.filter((buddy) => !selectedMemberIds.includes(String(buddy.id)))
                ?.map((buddy, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition"
                    onClick={() => {
                      if (!selectedMemberIds.includes(String(buddy.id))) {
                        setSelectedMemberIds((prev) => [...prev, String(buddy.id)]);
                        setSuggestedMembers((prev) => [
                          {
                            image: buddy?.diver_profile?.dive_image ? buddy?.diver_profile?.dive_image : "/images/profile.png",
                            user_id: Number(buddy?.id),
                            first_name: buddy.first_name,
                            last_name: buddy.last_name,
                            email: buddy?.email,
                            invite_id: buddy?.profile_details?.invite_id,
                          },
                          ...(prev || [])
                        ]);
                      }
                    }}
                  >
                    <img
                      src={buddy?.profile_details?.profile_picture !== null ? buddy?.profile_details?.profile_picture : "/images/profile.png"}
                      alt={buddy.first_name}
                      className="md:w-[4.375rem] md:h-[4.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="md:text-lg text-base font-archivo font-medium text-[#101828] dark:text-gray-100">
                        {`${buddy.first_name} ${buddy.last_name}`}
                      </p>
                      <p className="md:text-sm text-xs font-archivo truncate text-[#4F4F4F] dark:text-gray-400">
                        {`Dive:${buddy?.dashboard_analysis?.dives ?? 0} . Dive Spot:${buddy?.dashboard_analysis?.dive_spots ?? 0} . Bottom:${buddy?.dashboard_analysis?.bottom_time ?? 0}`}
                      </p>
                    </div>
                  </li>
                ))}
              
              {/* Loading indicator for fetching more */}
              {isFetchingNextPage && (
                <div className="flex items-center justify-center py-4">
                  <SmallSpinner />
                </div>
              )}
              
              {/* Intersection observer target */}
              <div ref={loaderRef} className="h-4" />
            </ul>
          )}
        </div>

        <div className="flex justify-end items-center p-4 gap-4">
          <button
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
            onClick={handleAddMembers}
          >
            Proceed
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}