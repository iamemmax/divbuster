"use client"
import React, { useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '../../components/shared/Header'
import ActiveBookings from './components/ActiveBooking'
import BookingSideBar from './components/BookingSideBar'

interface TabItem {
  id: string
  label: string
  href: string
}

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState<string>('activeBookings')
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const tabs: TabItem[] = [
    { id: 'activeBookings', label: 'Active Bookings', href: '?tab=activeBookings' },
    { id: 'recentDivePlanWithBuddy', label: 'Recent Dive Plan with Buddy', href: '?tab=recentDivePlanWithBuddy' },
    { id: 'recentDivePlanWithSchoolCommunity', label: 'Recent Dive Plan with School/Community', href: '?tab=recentDivePlanWithSchoolCommunity' },
  ]

  useEffect(() => {
    const updateFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const tabFromURL = urlParams.get('tab')
      if (tabFromURL && tabs.some(tab => tab.id === tabFromURL)) {
        setActiveTab(tabFromURL)
      }
    }

    updateFromURL()
    window.addEventListener('popstate', updateFromURL)
    return () => window.removeEventListener('popstate', updateFromURL)
  }, [])

  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleTabClick = (tabId: string): void => {
    const url = new URL(window.location.href)
    url.searchParams.set('tab', tabId)
    window.history.pushState({}, '', url.toString())
    setActiveTab(tabId)
  }

  const checkScroll = React.useCallback(() => {
    if (tabsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsScrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }, [])

  React.useEffect(() => {
    checkScroll()
    const container = tabsScrollRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [checkScroll])

  const scroll = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      const scrollAmount = 300
      tabsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
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

              {/* Responsive Tabs with Scroll Buttons */}
              <div className="flex items-center gap-2 mb-4">
                <div ref={tabsScrollRef} className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-hidden scrollbar-hide flex-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      id={`tab-${tab.id}`}
                      onClick={() => handleTabClick(tab.id)}
                      className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-medium border-b-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                        activeTab === tab.id
                          ? 'border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`tabpanel-${tab.id}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Scroll Buttons */}
                {(canScrollLeft || canScrollRight) && (
                  <div className="flex gap-2 flex-shrink-0">
                    {canScrollLeft && (
                      <button
                        onClick={() => scroll('left')}
                        className="p-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                        aria-label="Scroll tabs left"
                      >
                        <ChevronLeft size={18} className="text-gray-600 dark:text-gray-300" />
                      </button>
                    )}
                    {canScrollRight && (
                      <button
                        onClick={() => scroll('right')}
                        className="p-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                        aria-label="Scroll tabs right"
                      >
                        <ChevronRight size={18} className="text-gray-600 dark:text-gray-300" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <main className="w-full" role="main">
                <div
                  id={`tabpanel-${activeTab}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab}`}
                >
                 <ActiveBookings/>
                </div>
              </main>

              {/* Main Content */}
              
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