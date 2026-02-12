"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { NotificationItem } from './NotificationItem';
import { buddyRequestResult, useFetchBuddyRequest } from '../../api/notification/buddyRequest';
import { useAddBuddy } from '../../api/buddy/addBuddy';
import { useQueryClient } from 'react-query';
import { useErrorModalState } from '@/hooks';
import { ErrorModal } from '@/components/core';
import toast from 'react-hot-toast';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { SmallSpinner } from '@/icons/core';


interface prop{
  globalSearch: string;
  initialStartDate: string
  initialEndDate: string
}

// Main BuddyRequest Component
const BuddyRequest: React.FC<prop> = ({globalSearch,initialStartDate,initialEndDate}) => {
    const {
      isErrorModalOpen,
      setErrorModalState,
      openErrorModalWithMessage,
      errorModalMessage,
    } = useErrorModalState();
    const filters = {
  date_from: initialStartDate,
  date_to:initialEndDate,
  search: globalSearch
};
  // const [loadingStates, setLoadingStates] = useState<{[key: string]: {accept: boolean, decline: boolean}}>({});
const { mutate: handleAddNewBuddy, isLoading:isUpdating } = useAddBuddy();
  const queryClient = useQueryClient();

 const [acceptingDiverId, setAcceptingDiverId] = useState<number | null>(null);
 const [decliningDiverId, setDecliningDiverId] = useState<number | null>(null);

const { data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,}= useFetchBuddyRequest("buddy-request", filters);
      // Flatten all pages' results into one array
      const allNotifications = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap((page) => page?.data?.results);
      }, [data]);

     // Infinite scroll
     useEffect(() => {
        const handleScroll = () => {
          if (
            window.innerHeight + window.scrollY >=
              document.body.offsetHeight - 200 && // near bottom
            hasNextPage &&
            !isFetchingNextPage
          ) {
            fetchNextPage();
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
    
  
  // Split notifications into two columns

  const handleAccept = async (suggested:buddyRequestResult) => {
     setAcceptingDiverId(suggested.id);
    
    handleAddNewBuddy({
      invite_id: String(suggested?.request_from?.profile_details?.invite_id),
      user_id: suggested?.request_from?.profile_details?.id,
      request_status:"approved"
    }, {
      onSuccess: () => {
        setAcceptingDiverId(null);
        queryClient.invalidateQueries({queryKey:["user-details"]});
        toast.success("Buddy added successfully", { id: "addBuddySuccess" });
      },
      onError: (error) => {
        setAcceptingDiverId(null);
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      }
    });
  };

  const handleDecline = async (suggested:buddyRequestResult) => {
    setDecliningDiverId(suggested.id);
    
    handleAddNewBuddy({
      invite_id: String(suggested?.request_from?.profile_details?.invite_id),
      user_id: suggested?.request_from?.profile_details?.id,
      request_status:"declined"
    }, {
      onSuccess: () => {
        setDecliningDiverId(null);
        queryClient.invalidateQueries({queryKey:["user-details"]});
        toast.success("Buddy declined successfully", { id: "declineBuddySuccess" });
      },
      onError: (error) => {
        setDecliningDiverId(null);
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      }
    });
  };

  const handleMarkAsRead = (id: string) => {
    console.log(`Marked notification ${id} as read`);
    // Update read status logic here
  };

  return (
    <div className="w-full">
      {/* Header */}
      



      {/* Buddy Requests List */}
 <div className="bg-white dark:bg-transparent rounded-lg py-3">
  {
    isLoading?<div className="flex justify-center items-center py-6"><SmallSpinner/></div>:
  <div className="grid grid-cols-1 ">
    {/* Left column with border-right on desktop */}
    <div className="md:border-r md:border-gray-200 dark:md:border-gray-700 gap-y-3 md:pr-8">
      {allNotifications?.map((request, index: number) => (
        <NotificationItem
          key={request.id}
          id={String(request?.id )}
          avatar={
  request?.request_from?.profile_details?.profile_picture ?? "/images/profile.png"
}
          name={`${request.request_from?.first_name??""} ${request.request_from?.last_name??""}`}
          time={request?.request_date}
          action={"Want to be your Dive buddy"}
          isOnline={request?.request_from?.diver_profile?.online}
          // isLast={index === Number(leftColumnNotifications?.length) - 1}
          showAcceptBtn={true}
          showDeclineBtn={true}
          onAccept={() => handleAccept(request)}
          onDecline={() => handleDecline(request)}
          acceptLoading={acceptingDiverId === request?.id}
          declineLoading={decliningDiverId === request?.id}

        />
      ))}
    </div>

  
  </div>
  }
</div>






      {/* Empty State (when no requests) */}
      {!isLoading&&allNotifications?.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Buddy Requests
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            You don't have any pending buddy requests at the moment.
          </p>
        </div>
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
  );
};

export default BuddyRequest;