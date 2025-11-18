import AddIcon from '@/app/icons/(dashboard)/AddIcon';
import { Button } from '@/components/core';
import React, { useState } from 'react'
import { useFetchNearestUser } from '../../api/buddy/nearestUserAround';
import { useAddBuddy } from '../../api/buddy/addBuddy';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
const BookingSideBar = () => {
  const { data: nearestUsers, isLoading } = useFetchNearestUser();
  const { mutate: addBuddy, isLoading: isAddingBuddy } = useAddBuddy();
  const [displayCount, setDisplayCount] = useState(6);
  const [addingBuddyId, setAddingBuddyId] = useState<number | null>(null);
  
  const suggestedBuddies = nearestUsers?.slice(0, displayCount) || [];
  const hasMoreUsers = (nearestUsers?.length || 0) > displayCount;
  
  const queryClient = useQueryClient()
  const handleAddBuddy = (buddy: any) => {
    setAddingBuddyId(buddy.user_id);
    addBuddy({
      user_id: buddy.user_id,
      invite_id: buddy.invite_id,
      lang: 'en'
    }, {
      onSuccess: () => {
        toast.success('Buddy request sent successfully!');
        queryClient.invalidateQueries('fetchNearestUser');
        setAddingBuddyId(null);
      },
      onError: (error: any) => {
        toast.error('Failed to send buddy request');
        setAddingBuddyId(null);
      }
    });
  };
  
  const handleViewMore = () => {
    setDisplayCount(prev => prev + 10);
  };
       
      
       
      
       
  return (
    <div>
  <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Dive Buddy around you.</h2>
    
    <div className="relative">
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        suggestedBuddies.map((buddy, index) => {
          const fullName = `${buddy.first_name} ${buddy.last_name}`.trim() || buddy.nickname;
          const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
          
          return (
            <div key={buddy.user_id} className="relative flex items-center justify-between py-3">
              {/* Connecting line */}
              {index < suggestedBuddies.length - 1 && (
                <div className="absolute left-5 top-12 w-px h-6 bg-gray-200 dark:bg-gray-600"></div>
              )}
              
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative z-10 flex-shrink-0">
                  {buddy.profile_picture ? (
                    <img
                      src={buddy.profile_picture}
                      alt={fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                      {initials}
                    </div>
                  )}
                  {buddy.is_buddy && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white text-sm truncate">{fullName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{buddy.distance?.toFixed(1)} km away</div>
                </div>
              </div>
              <button 
                onClick={() => handleAddBuddy(buddy)}
                disabled={addingBuddyId === buddy.user_id || buddy.is_buddy}
                className={`flex items-center justify-center transition-colors p-1 flex-shrink-0 ${
                  buddy.is_buddy 
                    ? 'text-green-500 cursor-not-allowed' 
                    : addingBuddyId === buddy.user_id 
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                }`}
              >
                {addingBuddyId === buddy.user_id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                ) : buddy.is_buddy ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <AddIcon/>
                )}
              </button>
            </div>
          );
        })
      )}
    </div>
    
    {hasMoreUsers && (
      <div className="mt-6">
        <Button 
          onClick={handleViewMore}
          variant={"outlined"} 
          className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          View more
        </Button>
      </div>
    )}
  </div>
</div>
  )
}

export default BookingSideBar