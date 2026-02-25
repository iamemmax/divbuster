"use client"
import React, { useState } from 'react'
import Header from '../../components/shared/Header'
import ActiveBookings from './components/ActiveBooking'
import BookingSideBar from './components/BookingSideBar'

const BookingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div>
      <Header title="Bookings" subtitle="" />

      <div className="font-archivo h-[85vh]">
        <div className="p-3 md:px-6 h-full">
          <div className='grid grid-cols-1 2xl:grid-cols-[3fr_1fr] gap-[1.3125rem] h-full'>
            <div className="overflow-y-auto h-full">
              {/* Mobile Buddies Button */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden fixed bottom-4 right-4 z-50 bg-[#F7931D] text-white p-3 rounded-full shadow-lg hover:bg-[#E8841A] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.01 3.01 0 0 0 16.96 6c-.8 0-1.54.37-2.01.97L12 10.5 9.05 6.97A3.01 3.01 0 0 0 6.04 6c-1.28 0-2.4.8-2.84 2.01L.66 16H3.5v6h2v-6h2.12l2.88-8.64L12 9.5l1.5-2.14L16.38 16H18.5v6h2zM8 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2z"/>
                </svg>
              </button>

              {/* Active Bookings Component */}
              <ActiveBookings/>
              
            </div>

            {/* Sidebar - Hidden on mobile by default, toggleable */}
            <div className="hidden 2xl:block w-full py-8 h-full overflow-y-auto">
              <BookingSideBar/>
            </div>
          </div>

          {/* Mobile Buddies Modal */}
          {isSidebarOpen && (
            <div className="2xl:hidden absolute inset-x-0 bottom-0 z-40 bg-black bg-opacity-50" onClick={toggleSidebar}>
              <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-lg max-h-[70vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  {/* <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-archivo">Dive Buddy around you</h3> */}
                  <button 
                    onClick={toggleSidebar} 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M12.854 4.854a.5.5 0 0 0-.708-.708L8 8.293 3.854 4.146a.5.5 0 1 0-.708.708L7.293 9l-4.147 4.146a.5.5 0 0 0 .708.708L8 9.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 9l4.147-4.146z"/>
                    </svg>
                  </button>
                </div>
                <div className="overflow-y-auto max-h-[calc(70vh-80px)]">
                  <BookingSideBar/>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingPage