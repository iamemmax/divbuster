"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../components/shared/Header'
import RecentDiveSites from './components/RecentDiveSites'
import LocationIcconbg from '@/app/icons/(dashboard)/LocationIconbg'
import { Button } from '@/components/core'
import PlusIcon from '@/app/icons/(dashboard)/PlusIcon'
import DiveSitesSidebar from './components/DiveSitesSidebar'
import { useFetchDiveSites } from '../api/div-sites/fetch-dive-sites'
import { useUser } from '@/app/(auth)/api/getAuthenticatedUser'
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput'

interface TabItem {
  id: string
  label: string
  href: string
}

const DiveSites = () => {
  const [activeTab, setActiveTab] = useState<string>('recentDiveSites')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const { data: user, isLoading: userLoading } = useUser()
  const [search, setSearch] = useState("")
  // Fixed API parameters - ensure lang is always available
  const apiParams = {
    lang: user?.data?.profile_details?.language || 'en',
    favorite: activeTab === "favouriteDiveSite" ? "yes" : "",
    search
  }
  
  const {  data, fetchNextPage, hasNextPage, isFetchingNextPage,refetch ,isLoading,isError,error} = useFetchDiveSites(apiParams)
  

  const tabs: TabItem[] = [
    { id: 'recentDiveSites', label: 'Recent Dive Sites', href: '?tab=recentDiveSites' },
    { id: 'favouriteDiveSite', label: 'My Favourite Dive Sites', href: '?tab=favouriteDiveSite' },
    { id: 'divesitesNearYou', label: 'Discover Divesites Near You', href: '?tab=divesitesNearYou' },
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
    
    // Force refetch when switching to/from favorites
    if (tabId === 'favouriteDiveSite' || activeTab === 'favouriteDiveSite') {
      setTimeout(() => {
        refetch()
      }, 100)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const renderTabContent = (): JSX.Element => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-red-500 dark:text-red-400 text-center py-8">
          Error loading dive sites. Please try again.
        </div>
      )
    }

    switch (activeTab) {
      case 'recentDiveSites':
        return <div><RecentDiveSites data={data} loading={isLoading} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} search={search} /></div>
      case 'favouriteDiveSite':
        return <div><RecentDiveSites data={data} loading={isLoading} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} search={search} /></div>
      case 'divesitesNearYou':
        return (
          <div className="text-gray-600 dark:text-gray-300 text-center py-8">
            Discover Divesites Near You Content - Coming Soon
          </div>
        )
      default:
        return (
          <div className="text-gray-600 dark:text-gray-300 text-center py-8">
            Content not found
          </div>
        )
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 max-h-[100vh]">
      <div>
        <Header title="Dive Sites" subtitle="" />
      </div>
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden p-4">
        <Button
          onClick={toggleSidebar}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
         Dive site around
        </Button>
      </div>

      <div className="max-h-[80vh] overflow-y-auto p-2 md:p-6">
        {/* Hero Section */}
    
        {/* Main Content Grid */}
        <div className='grid grid-cols-1 xl:grid-cols-[2fr_1fr] 2xl:grid-cols-[3fr_1fr] gap-[1.3125rem]  relative'>
          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            {/* Tab Navigation */}
            <nav
              className="flex overflow-x-auto border-b mt-5 border-gray-200 dark:border-gray-700 scrollbar-hide bg-white dark:bg-gray-800"
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
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
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
            <main className="w-full p-3 md:p-6   bg-white dark:bg-gray-800" role="main">
               <div className="mb-4">
                          <DebouncedSearchInput
                            placeholder="Search for  dive sites, longitude and Latitude"
                            onSearch={(value) => setSearch(value)}
                            debounceTime={300}
                            value={search}
                            inputClassName='h-[3.5rem] rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                          />
                        </div>
              <div
                id={`tabpanel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
              >
                {renderTabContent()}
              </div>
            </main>
          </div>

          {/* Sidebar - Sticky on Desktop */}
          <div className={`
            w-full  h-full
            lg:sticky lg:top-6  lg:self-start
            ${sidebarOpen ? 'block' : 'hidden lg:block'}
            ${sidebarOpen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4' : ''}
          `}>
            {/* Mobile Sidebar Header */}
            {sidebarOpen && (
              <div className="lg:hidden flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Filters & Information
                </h3>
                <Button
                  onClick={toggleSidebar}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <svg 
                    className="w-6 h-6 text-gray-600 dark:text-gray-300" 
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
                </Button>
              </div>
            )}
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 lg:p-0">
              <DiveSitesSidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div 
                className="lg:hidden fixed inset-0 bg-black/50 -z-10"
                onClick={toggleSidebar}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiveSites