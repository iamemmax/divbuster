"use client"
import React from 'react'
import Header from './components/shared/Header'
import { cn } from '@/utils/classNames'
import { useAuth } from '@/contexts/authentication'
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput';
import { ActionDropdown } from '@/components/core/ActionDropdown';
import MonthlySnapShot from './components/dashboard/MonthlySnapShot'
import DivingTab from './components/dashboard/Divertab'
import SuggestedDIverTabs from './components/dashboard/SuggestedDIverTabs'
// import { ChevronRightIcon } from '@heroicons/react/24/outline'

const Page = () => {
  const { authState } = useAuth();
  const { user} = authState;

  return (
    <div className='text-black dark:text-white'>
      <Header 
        title={`Welcome, ${user?.first_name}`}
        subtitle='June 12, 2024' 
      />
      
      {/* Dashboard content */}
      <div className="mt-[3.125rem] px-6 lg:px-[1.875rem] h-[83vh] overflow-y-auto">
        {/* Search and action bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <DebouncedSearchInput 
              placeholder="Search for buddies, dive sites, dive plans" 
              onSearch={(value) => value}
              debounceTime={30}
            />
          </div>
          
          <div className="relative w-full md:w-auto">
            <ActionDropdown 
              items={[
                { label: "Add new Dive Log", href: "/dive-log/new", active: true },
                { label: "Create a Dive Plan", href: "/dive-plan/new" },
                { label: "Add a new Buddy", href: "/buddy/new" },
                { label: "Add new Dive Spot", href: "/dive-spot/new" },
                { label: "Add Certification", href: "/certification/new" },
                { label: "Add Gear", href: "/gear/new" },
                { label: "Add Feedback or Comment", href: "/feedback/new" }
              ]}
              
            
            />
          </div>
        </div>
        
        {/* Monthly Snapshot section */}
        <div className="">

        <MonthlySnapShot/>
        <div className="">
          <SuggestedDIverTabs />
        </div>
        <div className="">
          <DivingTab/>
        </div>
        </div>
    
      </div>
    </div>
  )
}

export default Page
