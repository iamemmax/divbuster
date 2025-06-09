"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../components/shared/Header'
import RecentDiveSites from './components/RecentDiveSites'
import LocationIcconbg from '@/app/icons/(dashboard)/LocationIconbg'
import { Button } from '@/components/core'
import PlusIcon from '@/app/icons/(dashboard)/PlusIcon'
import DiveSitesSidebar from './components/DiveSitesSidebar'

interface TabItem {
  id: string
  label: string
  href: string
}

const DiveSites = () => {
  const [activeTab, setActiveTab] = useState<string>('recentDiveSites')

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
  }

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case 'recentDiveSites':
        return <div><RecentDiveSites/></div>
      case 'favouriteDiveSite':
        return <div>My Favourite Dive Sites Content</div>
      case 'divesitesNearYou':
        return <div>Discover Divesites Near You Content</div>
      default:
        return <div>Content not found</div>
    }
  }

  return (
    <div>
      <div>
        <Header title="Dive Sites" subtitle="" />
      </div>
      <div className="max-h-[80vh] overflow-y-auto p-6">

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
  <div className="relative z-20 w-full h-full flex items-center justify-between px-7">
    {/* Left Content */}
    <div className="flex w-full flex-col gap-y-2 justify-center">
      <p className="font-archivo text-sm md:text-base text-[#F7931D]">
        Recent Visited Dive Site
      </p>
      <h2 className="font-archivo font-semibold text-lg md:text-[1.875rem] text-white">
        Maria la Gorda, Guanacabibes
      </h2>
      <p className="font-archivo md:text-base text-sm text-white">
        Washington County, Tennessee, United States
      </p>

      <div className="flex absolute bottom-6 right-10 justify-end w-full   mt-4">
        <Button className="bg-[#F7931D] h-[3.1875rem] p-0 w-[3.1875rem] rounded-full flex justify-center items-center">
          <PlusIcon width={24} height={24} />
        </Button>
      </div>
    </div>

    {/* Right Icon */}
    <div className="absolute right-[3rem] 2xl:right-[10rem]">
      <Button className="bg-transparent">
        <LocationIcconbg />
      </Button>
    </div>
  </div>
</div>

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
            : 'text-gray-600 hover:text-gray-800'
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
            <DiveSitesSidebar/>
        </div>
  {/* Responsive Tab Navigation */}
</div>
      </div>

    </div>
  )
}

export default DiveSites
