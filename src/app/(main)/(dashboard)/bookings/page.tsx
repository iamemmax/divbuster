"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../components/shared/Header'
import ActiveBookings from './components/ActiveBooking'
import BookPlanWithBuddy from './components/BookPlanWithBuddy'
import BookingSideBar from './components/BookingSideBar'

interface TabItem {
  id: string
  label: string
  href: string
}

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState<string>('activeBookings')
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
    
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

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string) => {
    e.preventDefault()

    const url = new URL(window.location.href)
    url.searchParams.set('tab', tabId)
    window.history.pushState({}, '', url.toString())
    setActiveTab(tabId)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case 'activeBookings':
        return <div><ActiveBookings/></div>
      case 'recentDivePlanWithBuddy':
        return <div><BookPlanWithBuddy/></div>
      case 'recentDivePlanWithSchoolCommunity':
        return <div>Discover Divesites Near You Content</div>
      default:
        return <div>Content not found</div>
    }
  }

  return (
    <div>
      <Header title="Bookings" subtitle="" />

      <div className="font-archivo h-[80vh] overflow-y-auto">
        <div className="relative h-60 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/dashboard/profile-Location.png')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black flex justify-center items-center opacity-30 z-10" />

          {/* Foreground Content */}
          <div className="relative z-20 w-full h-full flex items-center justify-between ">
            {/* Left Content */}
            <div className="flex w-full flex-col gap-y-2 justify-center px-7">
              <p className="font-archivo text-sm md:text-base text-[#F7931D]">
                Recent Visited Dive Site
              </p>
              <h2 className="font-archivo font-semibold text-lg md:text-[1.875rem] text-white">
                Maria la Gorda, Guanacabibes
              </h2>
              <p className="font-archivo md:text-base text-sm text-white">
                Washington County, Tennessee, United States
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 md:px-6">
          <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] gap-[1.3125rem]'>
            <div className="">
              {/* Mobile Sidebar Toggle Button */}
              <div className="lg:hidden flex justify-between items-center mt-5 mb-3">
                <button
                  onClick={toggleSidebar}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
                  aria-label="Toggle sidebar"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 12h16M4 18h16" 
                    />
                  </svg>
                  Menu
                </button>
              </div>

              <nav
                className="flex overflow-x-auto border-b mt-5 border-gray-200 scrollbar-hide"
                role="tablist"
              >
                {tabs?.map((tab) => (
                  <a
                    key={tab.id}
                    href={tab.href}
                    onClick={(e) => handleTabClick(e, tab.id)}
                    className={`flex-shrink-0 whitespace-nowrap px-6 py-3 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'text-orange-500 border-b-2 border-orange-500'
                        : 'text-gray-600 hover:text-gray-800 dark:text-white'
                    }`}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`tabpanel-${tab.id}`}
                  >
                    {tab.label}
                  </a>
                ))}
              </nav>

              {/* Main Content */}
              <main className="w-full" role="main">
                <div
                  id={`tabpanel-${activeTab}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab}`}
                >
                  {renderTabContent()}
                </div>
              </main>
            </div>

            {/* Sidebar - Hidden on mobile by default, toggleable */}
            <div className={`w-full py-8 h-full lg:block ${
              isSidebarOpen ? 'block' : 'hidden'
            }`}>
              {/* Mobile Sidebar Header with Close Button */}
              <div className="lg:hidden flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h3>
                <button
                  onClick={toggleSidebar}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Close sidebar"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
              <BookingSideBar/>
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleSidebar}
              aria-hidden="true"
            />
          )}

          {/* Mobile Sidebar Drawer */}
          <div
            className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
              isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-4 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h3>
                <button
                  onClick={toggleSidebar}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Close sidebar"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
              <BookingSideBar/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage