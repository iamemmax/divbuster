"use client"
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
import { bookingTranslation } from '@/app/(main)/translation/bookingTranslation';
import { useLanguage } from '@/hooks/useLanguage';

// Translations


const ActiveBookings: React.FC = () => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [showViewBookingDetailsModal, setShowViewBookingDetailsModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<bookingResult>();
  const [showViewBookingDivePlanModal, setShowViewBookingDivePlanModal] = useState(false);
const {language} = useLanguage()
  const t = bookingTranslation[language] || bookingTranslation.en;

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useFetchSchoolBooking(language);

  const filteredBookings = useMemo(() => {
    if (!data?.pages) return [];
    const allBookings = data.pages.flatMap(response => response?.results || []);
    if (!globalSearch.trim()) return allBookings;
    const searchLower = globalSearch.toLowerCase();
    return allBookings.filter(dive =>
      dive?.event?.description?.toLowerCase().includes(searchLower) ||
      dive?.event?.name?.toLowerCase().includes(searchLower)
    );
  }, [data?.pages, globalSearch]);

  const handleShare = useCallback((title: string): void => {
    if (navigator.share) {
      navigator.share({
        title: `Dive Plan: ${title}`,
        text: 'Check out this dive plan!',
        url: window.location.href,
      }).catch((err) => console.log('Error sharing:', err));
    } else {
      navigator.clipboard?.writeText(window.location.href);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Loader2 className="animate-spin" size={20} />
          <span>{t.loading}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{t.error}</p>
          <Button onClick={() => window.location.reload()}>{t.tryAgain}</Button>
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
              placeholder={t.searchPlaceholder}
              onSearch={setGlobalSearch}
              debounceTime={300}
              value={globalSearch}
              className="py-3"
              icon={<Search size={18} />}
            />           
          </div>
          
          <div className="flex gap-y-3 flex-wrap items-center justify-between py-3">
            <h1 className="font-archivo text-base md:text-xl text-[#101828] dark:text-white font-medium">
              {t.recentPlans}
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
                <span>{t.sharePlan}</span>
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
              {globalSearch ? t.noResults : t.noBookings}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {globalSearch ? t.noResultsMessage(globalSearch) : t.getStarted}
            </p>
            {!globalSearch && <AddBookingButton />}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
              {filteredBookings.map((dive, index) => (
                <BookingCard
                  key={dive?.id || index}
                  image={"/images/dashboard/map3.png"}
                  location={dive?.contact_info?.location || "Location TBD"}
                  date={moment(dive?.date?.event_date).format("MMM DD, YYYY")}
                  hostedBy={dive?.event?.dive_school?.toString() || ""}
                  title={dive?.event?.name || "Dive Event"}
                  description={dive?.event?.description || "No description available"}
                  viewPlanText={t.viewPlan}
                  readMoreText={t.readMore}
                  onReadMore={() => handleReadMore(dive)}
                  onViewPlan={() => handleViewPlan(dive)}
                />
              ))}
            </div>

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
                      {t.loadingMore}
                    </>
                  ) : (
                    <>
                      {t.loadMore}
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
        <ViewBookingDivePlan isOpen={showViewBookingDivePlanModal} title={t.planSummary} bookingDetails={bookingDetails} type='dive' setIsOpen={setShowViewBookingDivePlanModal}/>
      }
    </div>
  );
};

export default ActiveBookings;

     