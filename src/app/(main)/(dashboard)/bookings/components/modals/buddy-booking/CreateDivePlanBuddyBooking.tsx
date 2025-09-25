








import { Button, ErrorModal } from '@/components/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { SmallSpinner } from '@/icons/core';
import { useFetchBuddyList } from '@/app/(main)/(dashboard)/api/buddy/fetchBudies';
import { diveLogTypes } from './DiveBuddyInfo';
import { useCreateBookingWithBuddy } from '@/app/(main)/(dashboard)/api/bookings/addBookeWithBuddy';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { useErrorModalState } from '@/hooks';
import toast from 'react-hot-toast';
import { createGearLogDetailsFormValues } from './CreateDrivePlanGear';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { diveLogBuddiesTranslations } from '@/app/(main)/translation/diveLogTranslation';
import { useLanguage } from '@/hooks/useLanguage';

const advancedDetailsSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type AdvancedDetails = z.infer<typeof advancedDetailsSchema>;

interface prop{
    setStep: React.Dispatch<React.SetStateAction<number>>
     buddyMembers: addBuddyMember;
     setBuddyMembers: React.Dispatch<React.SetStateAction<addBuddyMember>>
     stepOneLogDetails:diveLogTypes
        onClose: () => void
        planGearData:createGearLogDetailsFormValues
         user: User | null
}
export interface addBuddyMember {
    email:string[],
    buddies:string;

}

// Helper function to parse buddies string to Set<number>
const parseBuddiesString = (buddiesString: string): Set<number> => {
  if (!buddiesString || buddiesString.trim() === '') {
    return new Set();
  }
  
  try {
    // Remove 'Set(' and ')' if present, then split by comma
    const cleanString = buddiesString.replace(/^Set\(|\)$/g, '');
    if (cleanString === '') return new Set();
    
    const buddyIds = cleanString
      .split(',')
      .map(id => parseInt(id.trim()))
      .filter(id => !isNaN(id));
    
    return new Set(buddyIds);
  } catch (error) {
    console.error('Error parsing buddies string:', error);
    return new Set();
  }
};

// Helper function to convert Set<number> to string
const setBuddiesString = (buddiesSet: Set<number>): string => {
  if (buddiesSet.size === 0) return '';
  return Array.from(buddiesSet).join(',');
};

const CreateDivePlanBuddyBooking = ({setStep,buddyMembers,planGearData,onClose,stepOneLogDetails,user}:prop) => {
   const {language}= useLanguage()
    const t = diveLogBuddiesTranslations[language] || diveLogBuddiesTranslations?.en;
      const {
          isErrorModalOpen,
          setErrorModalState,
          openErrorModalWithMessage,
          errorModalMessage,
      } = useErrorModalState();
  const [selectedBuddies, setSelectedBuddies] = useState<Set<number>>(() => 
    parseBuddiesString(buddyMembers?.buddies || '')
  );
  const [emailList, setEmailList] = useState<string[]>(() => 
    buddyMembers?.email || []
  );

  const {
    data: buddyList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchBuddyList(user?.profile_details?.language as string);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // RHF setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdvancedDetails>({
    resolver: zodResolver(advancedDetailsSchema),
  });

  // Update local state when buddyMembers prop changes (useful for navigation)
  useEffect(() => {
    setEmailList(buddyMembers?.email || []);
    setSelectedBuddies(parseBuddiesString(buddyMembers?.buddies || ''));
  }, [buddyMembers]);

  // Infinite scroll observer
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
    const option = { root: null, rootMargin: "20px", threshold: 0.5 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  // Handle buddy selection
  const handleBuddySelection = (buddyId: number) => {
    const newSelectedBuddies = new Set(selectedBuddies);
    if (newSelectedBuddies.has(buddyId)) {
      newSelectedBuddies.delete(buddyId);
    } else {
      newSelectedBuddies.add(buddyId);
    }
    setSelectedBuddies(newSelectedBuddies);
  };

  const {mutate:handleCreate, isLoading:isSubmitting}= useCreateBookingWithBuddy()
  
  // Function to create the booking
  const createBooking = (finalEmailList: string[]) => {
    const payload = {
     ...planGearData,
        ...stepOneLogDetails,
        email: finalEmailList,
        buddies: setBuddiesString(selectedBuddies) // Convert Set to string
      
    }
    
    handleCreate(payload, {
      onSuccess: () => {
        toast.success("Booking created successfully");
        setSelectedBuddies({}as any)
        onClose();
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      },
    });
  };

  // Handle adding email only (for the "Add" button)
  const addEmail = (data: AdvancedDetails) => {
    // Add the new email if it's not already in the list
    if (!emailList.includes(data.email)) {
      setEmailList([...emailList, data.email]);
      reset(); // Clear the input after adding
    } else {
      toast.error("Email already added");
    }
  };

  // Handle proceed action (create booking)
  const handleProceed = () => {
    // Validate that we have at least one email or buddy selected
    if (emailList.length === 0 && selectedBuddies.size === 0) {
      toast.error("Please add at least one email or select a buddy");
      return;
    }

    // Create the booking with the current email list
    createBooking(emailList);
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmailList(emailList.filter((email) => email !== emailToRemove));
  };

  return (
    <div className="p-3">
      {/* Email Input */}
      <div className="">
        <h2 className="py-3 text-gray-900 dark:text-gray-100">{t.addNewMembers}</h2>
        <form
          onSubmit={handleSubmit(addEmail)}
          className="flex items-center gap-x-2"
        >
          <input
            {...register("email")}
            placeholder={t.emailPlaceholder}
            className={`border outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-700 font-archivo rounded-lg px-[.875rem]
              focus:border-[#F7931D] border-[#E2E8F0] dark:border-gray-600 focus:ring-2 focus:ring-[#F7931D]/20 transition-colors 
              placeholder-gray-400 dark:placeholder-gray-500`}
          />
          <Button
            size={"lg"}
            type="submit"
            className="bg-[#F7931D] py-[1rem] hover:bg-[#E8841A] text-white"
            disabled={isSubmitting}
          >
            {t.addButton}
          </Button>
        </form>

        {/* Show validation errors */}
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}

        {/* Display added emails */}
        {emailList.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {emailList.map((email, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
              >
                <span>{email}</span>
                <button
                  onClick={() => handleRemoveEmail(email)}
                  className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buddy List */}
      <div className="md:px-3 mt-3">
        <p className="text-gray-900 dark:text-gray-100">
       {t.addFromList}
        </p>
        {selectedBuddies.size > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {selectedBuddies.size} {t.buddiesSelected}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <SmallSpinner />
        </div>
      ) : (
        <ul className="space-y-3 md:px-6  max-h-[65vh] overflow-y-auto py-2">
          {buddyList?.pages
            ?.flatMap((page) => page.results)
            ?.map((buddy, index: number) => (
              <li
                key={buddy.id || index}
                className={`flex items-center space-x-4 p-1 cursor-pointer mt-4 rounded-lg transition 
                    ${
                  selectedBuddies.has(buddy.id)
                    ? "bg-[#F7931D]/10 border border-[#F7931D]/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                
                `}
                onClick={() => handleBuddySelection(buddy.id)}
              >
                <div className="relative">
                  <img
                    src={
                      buddy?.profile_details?.profile_picture !== null
                        ? buddy?.profile_details?.profile_picture
                        : "/images/profile.png"
                    }
                    alt={buddy.first_name}
                    className="md:w-[2.375rem] md:h-[2.375rem] shrink-0 w-9 h-9 rounded-full object-cover"
                  />
                  {selectedBuddies.has(buddy.id) && (
                    <div className="absolute top-1 -right-1 w-4 h-4  bg-[#F7931D] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="md:text-sm text-xs font-archivo font-medium text-[#101828] dark:text-gray-100">
                    {`${buddy.first_name} ${buddy.last_name}`}
                  </p>
                  <p className="text-xs  font-archivo truncate text-[#4F4F4F] dark:text-gray-400">
                    {`${t.dives}:${buddy?.dashboard_analysis?.dives ?? 0} . ${t.diveSpots}:${buddy?.dashboard_analysis?.dive_spots ?? 0} . ${t.bottomTime}:${buddy?.dashboard_analysis?.bottom_time ?? 0}`}
                  </p>
                </div>
              </li>
            ))}

          {isFetchingNextPage && (
            <div className="flex items-center justify-center py-4">
              <SmallSpinner />
            </div>
          )}

          <div ref={loaderRef} className="h-4" />
        </ul>
      )}

      {/* Action Buttons */}
      <div className="py-4 border-t border-[#EAECF0] border-opacity-50 flex justify-end space-x-2">
        <Button 
          type="button"
          className="px-8 py-3 border-dark dark:border-white dark:text-white text-black font-medium rounded-lg flex justify-center items-center gap-x-3 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          variant="outlined" 
          onClick={() => setStep(4)}
          disabled={isSubmitting}
        >
          {t.back}
        </Button>
        <Button 
          type="button" 
          className="bg-orange-500 flex justify-center items-center gap-x-3 hover:bg-orange-600 text-white"
          disabled={isSubmitting}
          onClick={handleProceed}
        >
         {t.proceed}  {isSubmitting && <SmallSpinner color='#fff' /> }
        </Button>
      </div>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      />
    </div>
  );
};

export default CreateDivePlanBuddyBooking;