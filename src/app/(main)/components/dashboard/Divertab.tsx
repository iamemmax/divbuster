import React, { useState, useEffect } from 'react';
import DiveActivityCard from './DIveActivityCard';
import DiveActivitySideBar from './DiveActivitySideBar';

interface DiveStat {
  label: string;
  value: string;
}

interface TabItem {
  id: string;
  label: string;
  href: string;
}

interface DivingAppProps {
  initialTab?: string;
  onTabChange?: (tabId: string) => void;
}

const DivingTab: React.FC<DivingAppProps> = ({ 
  initialTab = 'friend-activities',
  onTabChange 
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);


  const tabs: TabItem[] = [
    { id: 'friend-activities', label: 'Friend Activities', href: '?tab=friend-activities' },
    { id: 'divers-around', label: 'Divers Around You', href: '?tab=divers-around' },
    { id: 'who-online', label: 'Who is Online', href: '?tab=who-online' }
  ];

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

  // Update URL with query parameters
  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string): void => {
    e.preventDefault();
    
    // Create new URL with query parameter
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    
    // Update URL without page reload
    window.history.pushState({}, '', url.toString());
    
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };



  const stats: DiveStat[] = [
    { label: 'Dive Activities / Week', value: '2' },
    { label: 'Avg. Distance / Week', value: '12m' },
    { label: 'Avg. Divespot / Week', value: '2' },
    { label: 'Avg. Bottom Time / Week', value: '3h 34m' },
    { label: 'Avg. Depth / Week', value: '4m(ft)' }
  ];

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case 'friend-activities':
        return (
          <>
           
          <DiveActivityCard/>
                
            
          
          </>
        );
      case 'divers-around':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Divers Around You</h3>
            <p className="text-gray-500">Find diving buddies in your area</p>
          </div>
        );
      case 'who-online':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Who is Online</h3>
            <p className="text-gray-500">See which divers are currently online</p>
          </div>
        );
      default:
        return <div>Content not found</div>;
    }
  };

  return (
  <div className="bg-white grid grid-cols-1 lg:gap-6 md:grid-cols-[2fr_1fr] 2xl:grid-cols-[3fr_1fr] items-start  lg:px-8 py-6">
  {/* Main Content Column */}
  <div className="flex flex-col col-span-full md:col-span-1">
    {/* Tabs Header */}
    <nav
    className="flex overflow-x-auto border-b mt-5 border-gray-200 scrollbar-hide"
    role="tablist"
  >
    {tabs?.map((tab) => (
      <a
        key={tab.id}
        href={tab.href}
        onClick={(e) => handleTabClick(e, tab.id)}
        className={`flex-shrink-0 whitespace-nowrap px-4 lg:px-6 py-3 text-xs sm:text-sm font-medium transition-colors duration-200 ${
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


    {/* Main Tab Content */}
    <div className="mt-4">{renderTabContent()}</div>
  </div>

  {/* Sidebar Column */}
  <aside className="w-full md:w-auto">
    <DiveActivitySideBar />
  </aside>
</div>


  );
};

export default DivingTab;
