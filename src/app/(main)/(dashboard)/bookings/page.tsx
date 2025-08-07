"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../components/shared/Header'
import ActiveBookings from './components/ActiveBooking'
import BookPlanWithBuddy from './components/BookPlanWithBuddy'
interface TabItem {
  id: string
  label: string
  href: string
}
const BookingPage = () => {
     const [activeTab, setActiveTab] = useState<string>('activeBookings')
    
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
<div className=" p-3 md:px-6">
     <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] gap-[1.3125rem]'>
        <div className="">
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
  <main className=" w-full" role="main">
    <div
      id={`tabpanel-${activeTab}`}
      role="tabpanel"
      aria-labelledby={`tab-${activeTab}`}
    >
      {renderTabContent()}
    </div>
  </main>

        </div>
        <div className=" w-full  py-8  h-full">
           side
        </div>
  {/* Responsive Tab Navigation */}
</div>
</div>
      </div>
    </div>
  )
}

export default BookingPage