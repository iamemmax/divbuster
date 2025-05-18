"use client"
import React from 'react'
import Header from './components/shared/Header'
import { cn } from '@/utils/classNames'
import { useAuth } from '@/contexts/authentication'
// import { ChevronRightIcon } from '@heroicons/react/24/outline'

const Page = () => {
  const { authState, authDispatch } = useAuth();
  const { user} = authState;

  return (
    <div className='text-black dark:text-white'>
      <Header 
        title={`Welcome, ${user?.first_name}`}
        subtitle='June 12, 2024' 
      />
      
      {/* Dashboard content */}
      <div className="p-6">
        {/* Search and action bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search for buddies, dive sites, dive plans" 
              className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <div className="relative w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#F7931D] hover:bg-[#e88616] text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center">
              Select an Action
              <svg 
                className="ml-2 w-5 h-5" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M5 7.5L10 12.5L15 7.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Monthly Snapshot section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-xl font-semibold">Monthly Snapshot</h2>
            
            <div className="flex mt-2 md:mt-0">
              <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button className="flex items-center px-4 py-2 bg-[#F0FFF4] dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  This month
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm border-l border-gray-200 dark:border-gray-700">
                  Last month
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm border-l border-gray-200 dark:border-gray-700 flex items-center">
                  <svg 
                    className="mr-1 w-4 h-4" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M12 4V20M20 12H4" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  Custom
                </button>
              </div>
            </div>
          </div>
          
          {/* Token Balance */}
          <div className="bg-[#FFF5F5] dark:bg-red-900/10 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <h3 className="text-gray-700 dark:text-gray-300 font-medium">Total Token Balance:</h3>
                <span className="ml-2 text-gray-900 dark:text-white font-semibold">2,700</span>
              </div>
              <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                View History
                {/* <ChevronRightIcon className="w-4 h-4 ml-1" /> */}
              </button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Dives */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Dives</h3>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H2.01M8 2H8.01M14 2H14.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">16</span>
                <div className="flex items-center text-green-500 text-sm font-medium">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="ml-1">10%</span>
                </div>
              </div>
            </div>
            
            {/* Total Bottom Time */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Bottom Time</h3>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H2.01M8 2H8.01M14 2H14.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">9h 56m</span>
                <div className="flex items-center text-red-500 text-sm font-medium">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="ml-1">2%</span>
                </div>
              </div>
            </div>
            
            {/* Dive Spots */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Dive Spots</h3>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H2.01M8 2H8.01M14 2H14.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">5</span>
                <div className="flex items-center text-green-500 text-sm font-medium">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="ml-1">12%</span>
                </div>
              </div>
            </div>
            
            {/* Maximum Depth */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Maximum Depth</h3>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H2.01M8 2H8.01M14 2H14.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">15m</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">(45 ft)</span>
                </div>
                <div className="flex items-center text-red-500 text-sm font-medium">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="ml-1">2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
