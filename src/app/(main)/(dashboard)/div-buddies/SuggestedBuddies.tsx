"use client"
import { Button, ErrorModal } from '@/components/core';
import { useAuth, } from '@/contexts/authentication';
import { useErrorModalState } from '@/hooks';
import React, { useState } from 'react'
import { useAddBuddy } from '../api/buddy/addBuddy';
import { SuggestedDiver } from '@/app/(auth)/types/profile';
import toast from 'react-hot-toast';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { SmallSpinner } from '@/icons/core';
import { useQueryClient } from 'react-query';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { SuggestedBuddySkeleton } from '@/components/core';

interface DiveBuddy {
  id: number;
  name: string;
  email: string;
  avatar: string;
  certificates: string[];
  buddyCount: number;
  buddyAvatars: string[];
  rating: number;
  reviewCount: number;
  isOnline?: boolean;
}

const SuggestedBuddies = () => {
      const {
        isErrorModalOpen,
        setErrorModalState,
        openErrorModalWithMessage,
        errorModalMessage,
      } = useErrorModalState();
      
      const { authState} = useAuth();
      const { user } = authState;
      const userData = user as User;
      const { mutate: handleAddNewBuddy } = useAddBuddy();
     const  suggestedBuddies:DiveBuddy[] =[]
  const [loadingDiverId, setLoadingDiverId] = useState<number | null>(null);
  // Track removed divers to hide them from the list
  const [removedDivers, setRemovedDivers] = useState<Set<number>>(new Set());
const queryClient = useQueryClient();
  const handleAddBuddy = (suggested: SuggestedDiver) => {
    // Set the loading state for this specific diver
    setLoadingDiverId(suggested.id);
    
    handleAddNewBuddy({
      invite_id: String(suggested?.invite_id),
      user_id: suggested?.id,
    }, {
      onSuccess: () => {
        // Remove this diver from the visible list
        setRemovedDivers(prev => new Set(prev).add(suggested.id));
        
        // Clear the loading state
        setLoadingDiverId(null);
        
        // Refetch user data to update the backend state
        queryClient.invalidateQueries({queryKey:["user-details"]});
        
        toast.success("Buddy added successfully", { id: "addBuddySuccess" });
      },
      onError: (error) => {
        // Clear the loading state
        setLoadingDiverId(null);
        
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      }
    });
  };

  // Filter out removed divers from the display
  const visibleDivers = userData?.suggested_divers?.filter(
    diver => !removedDivers.has(diver.id)
  ) || [];
     
  return (
    <div className="w-full xl:min-w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-200">
            <div className=" p-2 sm:px-6 sm:py-4 border-b border-gray-100">
            <h3 className="font-semibold font-arcivo text-base text-[#101828] dark:text-white">
              Suggested Buddies
            </h3>
            {/* <p className="text-xs text-[#78828A] font-medium font-archivo">46 Dive Buddies</p> */}
          </div>            
            <div className="relative p-4 sm:p-6 sm:py-4 max-h-[calc(100vh-300px)] overflow-y-auto">
              {!userData ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <SuggestedBuddySkeleton key={idx} />
                ))
              ) : (
                visibleDivers?.map((buddy, index) => (
                <div key={buddy.id} className="relative flex items-center justify-between py-3">
                  {/* Connecting line */}
                  {index < visibleDivers?.length - 1 && (
                    <div className="absolute left-5 top-[53px] w-px h-6 bg-gray-200 dark:bg-gray-600 transition-colors duration-200"></div>
                  )}
                  
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 text-sm font-medium overflow-hidden">
  {buddy?.profile_picture ? (
    <img
      src={buddy.profile_picture}
      alt={buddy.full_name}
      className="w-full h-full object-cover"
    />
  ) : (
    <span>
      {buddy?.full_name
        ?.split(" ")
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase())
        .join("") || ""}
    </span>
  )}
</div>

                      {/* {buddy.isOnline && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
                      )} */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate transition-colors duration-200">{buddy.full_name}</div>
                     
                    </div>
                  </div>
                 {loadingDiverId === buddy?.id? <SmallSpinner color='#F7931D'/>: <button className="flex items-center justify-center hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors duration-200 p-1 flex-shrink-0"
                  onClick={()=>handleAddBuddy(buddy)}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15ZM10 20C8.61667 20 7.31667 19.7417 6.1 19.225C4.88333 18.6917 3.825 17.975 2.925 17.075C2.025 16.175 1.30833 15.1167 0.775 13.9C0.258333 12.6833 0 11.3833 0 10C0 8.61667 0.258333 7.31667 0.775 6.1C1.30833 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31667 6.1 0.799999C7.31667 0.266666 8.61667 0 10 0C11.3833 0 12.6833 0.266666 13.9 0.799999C15.1167 1.31667 16.175 2.025 17.075 2.925C17.975 3.825 18.6833 4.88333 19.2 6.1C19.7333 7.31667 20 8.61667 20 10C20 11.3833 19.7333 12.6833 19.2 13.9C18.6833 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6917 13.9 19.225C12.6833 19.7417 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#A9B0C2" className="dark:fill-gray-400"/>
                    </svg>
                  </button>}
                </div>
              ))
              )}
            </div>
            
            {/* <div className="mt-6">
              <Button variant={"outlined"} className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                View more
              </Button>
            </div> */}

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

export default SuggestedBuddies