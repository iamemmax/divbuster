import React, { useState, useEffect } from 'react';
import SuggestedDivers from './suggested/SuggestedDivers';

//

interface TabItem {
  id: string;
  label: string;
  href: string;
}

interface DivingAppProps {
  initialTab?: string;
  onTabChange?: (tabId: string) => void;
}

const SuggestedDIverTabs: React.FC<DivingAppProps> = ({ 
  initialTab = 'divers',
  onTabChange 
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  

  const tabs: TabItem[] = [
    { id: "divers", label: "Suggested Divers", href: '?tab=divers' },
    { id: "spots", label: "Suggested Dive Spots", href: '?tab=spots' },
    { id: "products", label: "Suggested Products", href: '?tab=products' },
    { id: "challenges", label: "Suggested Challenges", href: '?tab=challenges' },
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

    window.addEventListener('divers', handlePopState);
    return () => window.removeEventListener('divers', handlePopState);
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


  

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case 'divers':
        return (
          <>
           <SuggestedDivers/>
          </>
        );
      case 'spots':
        return (
          <>spot</>
        );
      case 'products':
        return (
          <div className="">product</div>
        );
      case 'challenges':
        return (
          <div className="">challenge</div>
        );
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="w-full mx-auto bg-white ">
      {/* Header Tabs */}
      <nav className="flex border-b border-gray-200" role="tablist">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={tab.href}
            onClick={(e) => handleTabClick(e, tab.id)}
            className={`px-6 py-4 text-sm font-medium relative transition-colors duration-200 ${
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

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6" role="main">
          
          <div
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
          >
            {renderTabContent()}
          </div>
        </main>

     
      </div>
    </div>
  );
};



export default SuggestedDIverTabs;
