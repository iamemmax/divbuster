import React, { useState } from 'react'
import { SuggestedDiverCard } from './SuggestedDiversCard'
import { Diver } from './types'
import { useAuth } from '@/contexts/authentication'
import { LocationDisplay } from '@/utils/GetLocationFromCordinate'
import { useAddBuddy } from '@/app/(main)/(dashboard)/api/buddy/addBuddy'
import { SuggestedDiver } from '@/app/(auth)/types/profile'
import { useErrorModalState } from '@/hooks'
import { formatAxiosErrorMessage } from '@/utils'
import { AxiosError } from 'axios'
import { useQueryClient } from 'react-query'
import { ErrorModal } from '@/components/core'
import toast from 'react-hot-toast'
import { User } from '@/app/(auth)/api/getAuthenticatedUser'

const SuggestedDivers = () => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  
  const { authState } = useAuth();

  const { user } = authState;
  const userData = user as User;
  const { mutate: handleAddNewBuddy, isLoading } = useAddBuddy();
  const queryClient = useQueryClient();

  
  // Track which diver is currently being processed
  const [loadingDiverId, setLoadingDiverId] = useState<number | null>(null);
  // Track removed divers to hide them from the list
  const [removedDivers, setRemovedDivers] = useState<Set<number>>(new Set());

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
    <div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleDivers.map((diver) => (
          <SuggestedDiverCard
            key={diver?.id}
            id={String(diver.id)}
            name={diver?.full_name}
            addBuddyFunc={() => handleAddBuddy(diver)}
            // Only show loading for the specific diver being processed
            isLoading={loadingDiverId === diver?.id}
            location={
              <LocationDisplay 
                lat={diver?.coordinate?.lat} 
                lon={diver?.coordinate?.lon}
                fallback="Location unavailable"
                showTime={true}
                timeFormat="relative"
              />
            }
            date={diver?.recent_dive_info?.other_divers ?? ""}
            profileImage={diver?.profile_picture !== null ? diver?.profile_picture : ""}
            backgroundImage={diver?.recent_dive_info?.dive_image ?? ""}
            stats={{
              bottomTime: diver?.recent_dive_info?.bottom_time ?? "",
              description: "",
              maxDepth: diver?.recent_dive_info?.depth ?? "",
              timeIn: diver?.recent_dive_info?.start_date ?? "",
              timeOut: diver?.recent_dive_info?.end_date ?? "",
            }}
          />
        ))}
      </div>

      {/* Show a message when no divers are visible */}
      {visibleDivers.length === 0 && userData?.suggested_divers?.length > 0 && (
        <div className="mt-6 text-center text-gray-500">
          All suggested divers have been added as buddies!
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

export default SuggestedDivers;