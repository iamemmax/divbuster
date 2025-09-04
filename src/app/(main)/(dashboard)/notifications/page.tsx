"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, Settings, MoreHorizontal, Moon, Sun, Menu, X } from 'lucide-react';
import Header from '../../components/shared/Header';
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput';
import { TabItem } from '../../components/dashboard/SuggestedDIverTabs';
import NotificationScreen from './components/NotificationScreen';
import BuddyRequest from './components/BuddyRequest';
import NotificationSidebar from './components/NotificationSidebar';
import NotificationSettings from './components/NotificationSettingsPage';
import ThreeDot from '@/app/icons/(dashboard)/ThreeDot';
import { Button } from '@/components/core';
import { CustomDateRange } from '../../components/dashboard/MonthlySnapShot';
import DateRangePicker from '@/components/core/DateRangePicker';
import { useFetchBuddyRequest } from '../api/notification/buddyRequest';
import moment from 'moment';

const NotificationOverview = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [globalSearch, setGlobalSearch] = useState<string>("");
  const [showSettingPage, setShowSettingPage] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
 const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({
    startDate: new Date(new Date().getFullYear() - 4, 0, 1), // 4 years ago, January 1st
    endDate: new Date(),
  });
  
  const tabs: TabItem[] = [
    { id: "notifications", label: "Notifications", href: '?tab=notifications' },
    { id: "buddyRequests", label: "Buddy Requests", href: '?tab=buddyRequests' },
  ];

  const filters = {
date_from:moment(customDateRange?.startDate)?.subtract(10, 'days').calendar(),
date_to:moment(customDateRange?.endDate)?.subtract(10, 'days').calendar(),
search: globalSearch
};
const { data } = useFetchBuddyRequest("buddy-request", filters);
  const handleDateRangeApply = (startDate: Date, endDate: Date) => {
    setCustomDateRange({ startDate, endDate });
    setShowDatePicker(false);
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

    updateFromURL();

    const handlePopState = () => {
      updateFromURL();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabClick = (tabId: string): void => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    window.history.pushState({}, '', url.toString());
    setActiveTab(tabId);
  };

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case 'notifications':
        return <NotificationScreen  />;
      case 'buddyRequests':
        return <BuddyRequest 
        globalSearch={globalSearch}
        initialStartDate={moment(customDateRange?.startDate)?.subtract(10, 'days').calendar()}
              initialEndDate={moment(customDateRange?.endDate)?.subtract(10, 'days').calendar()} />;
      default:
        return <div className="text-gray-500 dark:text-gray-400">Content not found</div>;
    }
  };

  const buddyRequestData = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page?.data?.count);
  }, [data]);

  const formatDateRange = (startDate: Date, endDate: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return `${startDate.toLocaleDateString('en-US', options)} – ${endDate.toLocaleDateString('en-US', options)}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header title="Notifications" subtitle="" />
      
      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
              <button 
                onClick={() => setShowMobileSidebar(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-4">
              <NotificationSidebar />
            </div>
          </div>
        </div>
      )}
      
      {/* Main Container */}
      <div className="mt-[2.125rem] px-4 sm:px-6 md:px-[1.875rem] pb-6">
        
        {/* Top Controls Section */}
        <div className=" py-4 sm:py-6 transition-colors duration-200">
          
          {/* Search and Controls */}
          <div className="space-y-4">
            {/* Mobile: Stack search and controls vertically */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              
              {/* Search Input */}
              <div className="w-full sm:w-96">
                <DebouncedSearchInput
                  placeholder="Search for buddies, dive sites, dive plans"
                  onSearch={(value) => setGlobalSearch(value)}
                  debounceTime={30}
                  value={globalSearch}
                  className="w-full"
                />
              </div>
              
              {/* Controls Group */}
              <div className="flex items-center flex-wrap w-full gap-2 sm:gap-3 flex-shrink-0">
                
                {/* Date Range Picker - Responsive */}
                <div 
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-xs sm:text-sm transition-colors duration-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                  onClick={() => setShowDatePicker(true)}
                >
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 hidden sm:inline">
                    {formatDateRange(customDateRange.startDate, customDateRange.endDate)}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 sm:hidden">
                    Range
                  </span>
                </div>
                
                {/* Settings Button */}
                <button 
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => setShowSettingPage(true)}
                >
                  <Settings className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Settings</span>
                </button>
                
                {/* Mobile Sidebar Toggle - Only visible on mobile/tablet */}
                <button 
                  className="flex lg:hidden items-center gap-2 px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => setShowMobileSidebar(true)}
                >
                  <Menu className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Activities</span>
                </button>
                
              </div>
            </div>
          </div>

          {/* Page Header - Responsive */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
            
            {/* Title Section */}
            <div className="w-full sm:w-auto">
              {activeTab === "notifications" && (
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                    Notification Overview
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-200">
                    Your current account notifications and activity.
                  </p>
                </div>
              )}
              
              {activeTab === "buddyRequests" && (
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                    Buddy Requests
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Pending requests
                  </p>
                </div>
              )}
            </div>
            
            {/* Action Buttons - Responsive */}
            {/* <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-center">
                Clear all Activity
              </button>
              <button className="px-3 sm:px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white text-xs sm:text-sm rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-200 text-center">
                Read All Notifications
              </button>
            </div> */}
            
          </div>
        </div>

        {/* Main Content Grid - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] items-start gap-4 sm:gap-6 lg:gap-8 mt-6">
          
          {/* Left Column - Main Content */}
          <main className="w-full min-w-0"> {/* min-w-0 prevents overflow on mobile */}
            
            {/* Tab Navigation - Mobile Optimized */}
            <div className="bg-white dark:bg-transparent rounded-lg overflow-hidden transition-colors duration-200">
              
              {/* Mobile: Scrollable tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`tabpanel-${tab.id}`}
                  >
                    <span className="flex items-center gap-1 sm:gap-2">
                      {tab.label}
                      {/* Notification Badge */}
                      {tab.id === 'buddyRequests' && (
                        <span className="inline-flex items-center justify-center px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold leading-none text-[#027A48] bg-[#ECFDF3] dark:bg-white rounded-full min-w-[18px] sm:min-w-[20px]">
                          {buddyRequestData[0] ?? 0}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Tab Content - Responsive Padding */}
              <div className="p-3 sm:p-4 lg:p-6">
                <div
                  id={`tabpanel-${activeTab}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab}`}
                  className="min-h-[300px] sm:min-h-[400px]"
                >
                  {renderTabContent()}
                </div>
              </div>
            </div>
            
          </main>
          
          {/* Right Column - Desktop Sidebar (Hidden on Mobile/Tablet) */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/20 overflow-hidden sticky top-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <div className="p-4 xl:p-6 border-b flex items-start justify-between border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-base xl:text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                    Recent Dive Activities
                  </h2>
                  <p className="text-xs xl:text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
                    Latest updates from your network
                  </p>
                </div>
                <div>
                  <Button className="bg-transparent p-1">
                    <ThreeDot />
                  </Button>
                </div>
              </div>
              <div className="p-4 xl:p-6 bg-white dark:bg-gray-800/50">
                <NotificationSidebar />
              </div>
            </div>
          </aside>
          
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingPage && (
        <NotificationSettings 
          isOpen={showSettingPage} 
          onClose={() => setShowSettingPage(false)} 
        />
      )}

      {/* Date Picker Modal - Responsive */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
            <DateRangePicker
              initialStartDate={customDateRange.startDate}
              initialEndDate={customDateRange.endDate}
              onApply={handleDateRangeApply}
              onCancel={() => setShowDatePicker(false)}
            />
          </div>
        </div>
      )}

      {/* Custom Styles for Scrollbar Hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default NotificationOverview;