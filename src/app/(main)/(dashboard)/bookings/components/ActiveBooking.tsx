import React, { useState, useCallback, useMemo } from 'react';
import { Search, Share2, ArrowRight, Loader2 } from 'lucide-react';
import { BookingCard } from './BookingCard';
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput';
import { Button } from '@/components/core';
import AddBookingButton from './AddBookingButton';
import ViewBookingDetails from './details/ViewBooking';
import ViewBookingDivePlan from './details/ViewBookingDivePlan';
import { bookingResult, useFetchSchoolBooking } from '../../api/bookings/fetchSchoolBooking';
import moment from 'moment';

// Types


// Main Component
const ActiveBookings: React.FC = () => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [showViewBookingDetailsModal, setShowViewBookingDetailsModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<bookingResult>();
  const [showViewBookingDivePlanModal, setShowViewBookingDivePlanModal] = useState(false);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    error
  } = useFetchSchoolBooking();

  // Memoized filtered bookings based on search
  const filteredBookings = useMemo(() => {
    if (!data?.pages) return [];
    
    const allBookings = data.pages.flatMap(response => response?.results || []);
    
    if (!globalSearch.trim()) return allBookings;
    
    const searchLower = globalSearch.toLowerCase();
    return allBookings.filter(dive => 
      dive?.event?.description?.toLowerCase().includes(searchLower) ||
      dive?.event?.name?.toLowerCase().includes(searchLower) 
    )
      // dive?.dive_instructor?.toLowerCase().includes(searchLower)
  }, [data?.pages, globalSearch]);

  // Optimized handlers using useCallback
  const handleShare = useCallback((title: string): void => {
    if (navigator.share) {
      navigator.share({
        title: `Dive Plan: ${title}`,
        text: 'Check out this dive plan!',
        url: window.location.href,
      }).catch((err) => console.log('Error sharing:', err));
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard?.writeText(window.location.href);
      // You might want to show a toast notification here
      console.log('Link copied to clipboard');
    }
  }, []);

  const handleReadMore = useCallback((dive: bookingResult) => {
    setBookingDetails(dive);
    setShowViewBookingDetailsModal(true);
  }, []);

  const handleViewPlan = useCallback((dive: bookingResult) => {
    setBookingDetails(dive);
    setShowViewBookingDivePlanModal(true);
  }, []);

 

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Loader2 className="animate-spin" size={20} />
          <span>Loading dive bookings...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            Failed to load dive bookings
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="py-4">
          <div className="relative flex-1 w-full">
            <DebouncedSearchInput
              placeholder="Search for dive buddy, dive location, etc."
              onSearch={setGlobalSearch}
              debounceTime={300}
              value={globalSearch}
              className="py-3"
              icon={<Search size={18} />}
            />           
          </div>
          
          <div className="flex gap-y-3 flex-wrap items-center justify-between py-3">
            <h1 className="font-archivo text-base md:text-xl text-[#101828] dark:text-white font-medium">
              Recent Dive Plan Details
              {filteredBookings.length > 0 && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'})
                </span>
              )}
            </h1>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outlined"
                className="flex items-center font-archivo gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
                onClick={() => handleShare('Dive Plan')}
                disabled={filteredBookings.length === 0}
              >
                <Share2 size={18} />
                <span>Share Dive Plan</span>
              </Button>
              <AddBookingButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-white dark:bg-gray-900 p-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {globalSearch ? 'No matching dive bookings found' : 'No dive bookings yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {globalSearch 
                ? `No results found for "${globalSearch}". Try adjusting your search.`
                : 'Get started by creating your first dive booking.'
              }
            </p>
            {!globalSearch && <AddBookingButton />}
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
              {filteredBookings.map((dive, index) => (
                <BookingCard
                  key={dive?.id || index}
                  image={ ""}
                  location={dive?.contact_info?.location || "Location TBD"}
                  date={moment(dive?.date?.event_date).format("MMM DD, YYYY")}
                  hostedBy={dive?.event?.dive_school?.toString() || ""}
                  title={dive?.event?.name || "Dive Event"}
                  description={dive?.event?.description || "No description available"}
                  viewPlanText="View Dive Plan"
                  readMoreText="Read more"
                  onReadMore={() => handleReadMore(dive)}
                  onViewPlan={() => handleViewPlan(dive)}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleLoadMore}
                  disabled={isFetchingNextPage}
                  className="flex items-center gap-2"
                >
                  {isFetchingNextPage ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Loading more...
                    </>
                  ) : (
                    <>
                      Load more
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      {showViewBookingDetailsModal &&
        <ViewBookingDetails bookingDetails={bookingDetails} isOpen={showViewBookingDetailsModal} setIsOpen={setShowViewBookingDetailsModal}/>
      }
      {showViewBookingDivePlanModal &&
        <ViewBookingDivePlan isOpen={showViewBookingDivePlanModal} title='Dive with Bart (Dive Plan Summary)' bookingDetails={bookingDetails} type='dive' setIsOpen={setShowViewBookingDivePlanModal}/>
      }
    </div>
  );
};

export default ActiveBookings;

     