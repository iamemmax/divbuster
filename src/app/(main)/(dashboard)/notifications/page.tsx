"use client"
import React, { useEffect, useState } from 'react';
import { Calendar, Settings, MoreHorizontal, Moon, Sun } from 'lucide-react';
import Header from '../../components/shared/Header';
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput';
import { TabItem } from '../../components/dashboard/SuggestedDIverTabs';
import NotificationScreen from './components/NotificationScreen';
import BuddyRequest, { buddyRequests } from './components/BuddyRequest';
import NotificationSidebar from './components/NotificationSidebar';
import NotificationSettings from './components/NotificationSettingsPage';
import ThreeDot from '@/app/icons/(dashboard)/ThreeDot';
import { Button } from '@/components/core';
import { CustomDateRange } from '../../components/dashboard/MonthlySnapShot';
import DateRangePicker from '@/components/core/DateRangePicker';

const NotificationOverview = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [globalSearch, setGlobalSearch] = useState<string>("");
  const [showSettingPage, setShowSettingPage] = useState(false);
 const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });
  const tabs: TabItem[] = [
    { id: "notifications", label: "Notifications", href: '?tab=notifications' },
    { id: "buddyRequests", label: "Buddy Requests", href: '?tab=buddyRequests' },
  ];



  const handleDateRangeApply = (startDate: Date, endDate: Date) => {
    setCustomDateRange({ startDate, endDate });
    setShowDatePicker(false);
    // Here you would typically fetch data for the selected date range
    // For now, we'll just use the placeholder customStats
  };

  // Sync with browser URL on mount and handle browser back/forward
  useEffect(() => {
    const updateFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tabFromURL = urlParams.get('tab');
      if (tabFromURL && tabs.some(tab => tab.id === tabFromURL)) {
        setActiveTab(tabFromURL);
      }
    };

    // Set initial tab from URL
    updateFromURL();

    // Listen for browser back/forward navigation
    const handlePopState = () => {
      updateFromURL();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fixed: Update URL with query parameters for button clicks
  const handleTabClick = (tabId: string): void => {
    // Create new URL with query parameter
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    
    // Update URL without page reload
    window.history.pushState({}, '', url.toString());
    
    setActiveTab(tabId);
  };

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case 'notifications':
        return <NotificationScreen />;
      case 'buddyRequests':
        return <BuddyRequest />;
      default:
        return <div className="text-gray-500 dark:text-gray-400">Content not found</div>;
    }
  };

  return (
    <div className="h-[100vh] bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header title="Notifications" subtitle="" />
      
      {/* Main Container */}
      <div className="mt-[2.125rem] md:px-[1.875rem] h-[83vh] overflow-y-auto">
        
        {/* Top Controls Section */}
        <div className="bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700 py-6  transition-colors duration-200">
          {/* Search and Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center w-full md:w-96 gap-4">
              <DebouncedSearchInput
                placeholder="search for buddies, dive sites, dive plans"
                onSearch={(value) => setGlobalSearch(value)}
                debounceTime={30}
                value={globalSearch}
                className=''
              />
            </div>
            <div className="flex items-center flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm transition-colors duration-200" onClick={()=>setShowDatePicker(true)}>
                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Jan 6, 2022 – Jan 13, 2022</span>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200" onClick={()=>setShowSettingPage(true)}>
                <Settings className="w-4 h-4" />
                Settings
              </button>
      
            </div>
          </div>

          {/* Page Header */}
        <div className="flex items-center justify-between">
        {activeTab==="notifications"&&  
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                Notification Overview
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-200">
                Your current account notifications and activity.
              </p>
            </div>
            }
          {
            activeTab === "buddyRequests"&&<div className="">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Buddy Requests
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {buddyRequests?.length} pending requests
        </p>
      </div>
          }
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                Clear all Activity
              </button>
              <button className="px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-200">
                Read All Notifications
              </button>
            </div>
          </div>
          




        </div>

        {/* Main Content Grid */}
      
          <div className="grid grid-cols-1  w-full lg:grid-cols-[2fr_1fr] items-start gap-8">
            
            {/* Left Column - Main Content */}
            <main className="space-y-6">
              
              {/* Tab Navigation */}
              <div className="bg-white dark:bg-transparent rounded-lg  overflow-hidden  transition-colors duration-200">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      id={`tab-${tab.id}`}
                      onClick={() => handleTabClick(tab.id)}
                      className={`flex-1  py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`tabpanel-${tab.id}`}
                    >
                      <span className={`flex ${activeTab === tab.id? "items-center justify-center ":"items-start px-4 md:px-12"}   gap-2`}>
                        {tab.label}
                        {/* Add notification badges if needed */}
                        {tab.id === 'buddyRequests' && (
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-[#027A48] bg-[#ECFDF3] dark:bg-white rounded-full">
                            9
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                
                {/* Tab Content */}
                <div className="p-6">
                  <div
                    id={`tabpanel-${activeTab}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${activeTab}`}
                    className="min-h-[400px]"
                  >
                    {renderTabContent()}
                  </div>
                </div>
              </div>
              
            </main>
            
            {/* Right Column - Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/20 overflow-hidden sticky top-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <div className="p-6 border-b flex items-start justify-between  border-gray-200 dark:border-gray-700">
                  <div className="">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                    Recent Dive Activities
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
                    Latest updates from your network
                  </p>

                  </div>
                  <div className="">
                   <Button className='bg-transparent'> <ThreeDot/></Button>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800/50">
                  <NotificationSidebar />
                </div>
              </div>
            </aside>
            
          </div>
        
      </div>

      {
        showSettingPage && <NotificationSettings isOpen={showSettingPage} onClose={()=>setShowSettingPage(false)}/>
      }
       {showDatePicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
              <DateRangePicker
                initialStartDate={customDateRange.startDate}
                initialEndDate={customDateRange.endDate}
                onApply={handleDateRangeApply}
                onCancel={() => setShowDatePicker(false)}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default NotificationOverview;