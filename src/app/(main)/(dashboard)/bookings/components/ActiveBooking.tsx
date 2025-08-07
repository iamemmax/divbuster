import React, { useState } from 'react';
import { Search, Share2, ArrowRight } from 'lucide-react';
import { BookingCard } from './BookingCard';
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput';
import { Button } from '@/components/core';
import AddBookingButton from './AddBookingButton';
import ViewBookingDetails from './details/ViewBooking';
import ViewBookingDivePlan from './details/ViewBookingDivePlan';

export interface DiveData {
  image: string;
  location: string;
  date: string;
  hostedBy: string;
  title: string;
  description: string;
}

// Main Component
const ActiveBookings: React.FC = () => {
    const [globalSearch, setGlobalSearch] = useState("")
    const [showViewBookingDetailsModal, setShowViewBookingDetailsModal] = useState(false)
   const [bookingDetails, setBookingDetails] = useState<DiveData>()
   const [showViewBookingDivePlanModal, setShowViewBookingDivePlanModal] = useState(false)



  const handleShare = (title:string): void => {
    console.log('Share dive plan clicked');
  };

  const diveData: DiveData[] = [
    {
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "USAT Liberty Shipwreck",
      date: "13 May, 2024",
      hostedBy: "Dive Hosted by: Amazing Dive School",
      title: "Dive with Bart",
      description: "Always wanted to try out diving? Come and join us on a Discover Scuba diving adventure Discover Scuba diving adventure. "
    },
    {
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Bonaire, Caribbean Netherlands.",
      date: "16 May, 2024",
      hostedBy: "Dive Hosted by: Amazing Dive School",
      title: "Amazing Dive School Events",
      description: "This program is designed especially for people who want to try diving for the first time.."
    },
    {
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Casino Point Dive Park",
      date: "05 May, 2024",
      hostedBy: "Dive Hosted by: Amazing Dive School",
      title: "Diving get Better",
      description: "Always wanted to try out diving? Come and join us on a Discover Scuba diving adventure."
    },
    {
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Maria la Gorda, Guanacabibes",
      date: "01 May, 2024",
      hostedBy: "Dive Hosted by: Amazing Dive School",
      title: "Dive School Championship",
      description: "This program is designed especially for people who want to try diving for the first time.."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="py-4">
            <div className="relative flex-1 w-full">
             <DebouncedSearchInput
                           placeholder="search for dive buddy, dive location, e.t.c"
                           onSearch={(value) => setGlobalSearch(value)}
                           debounceTime={300}
                           value={globalSearch}
                           className='py-3'
                         />           
            </div>
          <div className="flex  gap-y-3 flex-wrap items-center justify-between py-3">
          <p className='font-archivo text-base md:text-xl text-[#101828] dark:text-white font-medium'>Recent Dive Plan Details</p>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button 
              variant={"outlined"}
                className="flex items-center font-archivo gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
                onClick={()=>handleShare}
              >
                <Share2 size={18} />
                <span>Share Dive Plan</span>
              </Button>
                 <AddBookingButton/>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-900">
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
          {diveData.map((dive: DiveData, index: number) => (
            <BookingCard
              key={index}
              image={dive.image}
              location={dive.location}
              date={dive.date}
              hostedBy={dive.hostedBy}
              title={dive.title}
              description={dive.description}
              viewPlanText='View Dive Plan '
              onReadMore={() =>{
                setBookingDetails(dive)
                setShowViewBookingDetailsModal(true)}}
              onViewPlan={() => setShowViewBookingDivePlanModal(true)}
            />
          ))}
        </div>
      </div>

      {showViewBookingDetailsModal &&
        <ViewBookingDetails bookingDetails={bookingDetails} isOpen={showViewBookingDetailsModal} setIsOpen={setShowViewBookingDetailsModal}/>
      }
      {showViewBookingDivePlanModal &&
        <ViewBookingDivePlan isOpen={showViewBookingDivePlanModal} title='Dive with Bart (Dive Plan Summary)' type='dive' setIsOpen={setShowViewBookingDivePlanModal}/>
      }
    </div>
  );
};

export default ActiveBookings;