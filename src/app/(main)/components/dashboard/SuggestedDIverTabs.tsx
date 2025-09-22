// import React, { useState, useEffect } from 'react';
// import SuggestedDivers from './suggested/SuggestedDivers';
// import { User } from '@/app/(auth)/api/getAuthenticatedUser';

// //

// export interface TabItem {
//   id: string;
//   label: string;
//   href: string;
// }

// interface DivingAppProps {
//   initialTab?: string;
//   onTabChange?: (tabId: string) => void;
//    user: User | null
// }

// const SuggestedDIverTabs: React.FC<DivingAppProps> = ({ 
//   initialTab = 'divers',
//   onTabChange,
//   user
// }) => {
//   const [activeTab, setActiveTab] = useState<string>(initialTab);
  

//   const tabs: TabItem[] = [
//     { id: "divers", label: "Suggested Divers", href: '?tab=divers' },
//     { id: "spots", label: "Suggested Dive Spots", href: '?tab=spots' },
//     { id: "products", label: "Suggested Products", href: '?tab=products' },
//     { id: "challenges", label: "Suggested Challenges", href: '?tab=challenges' },
//   ];

//   // Sync with browser URL on mount and handle browser back/forward
//   useEffect(() => {
//     const updateFromURL = () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const tabFromURL = urlParams.get('tab');
//       if (tabFromURL && tabs.some(tab => tab.id === tabFromURL)) {
//         setActiveTab(tabFromURL);
//       }
//     };

//     // Set initial tab from URL
//     updateFromURL();

//     // Listen for browser back/forward navigation
//     const handlePopState = () => {
//       updateFromURL();
//     };

//     window.addEventListener('divers', handlePopState);
//     return () => window.removeEventListener('divers', handlePopState);
//   }, []);

//   // Update URL with query parameters
//   const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string): void => {
//     e.preventDefault();
    
//     // Create new URL with query parameter
//     const url = new URL(window.location.href);
//     url.searchParams.set('tab', tabId);
    
//     // Update URL without page reload
//     window.history.pushState({}, '', url.toString());
    
//     setActiveTab(tabId);
//     if (onTabChange) {
//       onTabChange(tabId);
//     }
//   };


  

//   const renderTabContent = (): JSX.Element => {
//     switch (activeTab) {
//       case 'divers':
//         return (
//           <>
//            <SuggestedDivers/>
//           </>
//         );
//       case 'spots':
//         return (
//           <>spot</>
//         );
//       case 'products':
//         return (
//           <div className="">product</div>
//         );
//       case 'challenges':
//         return (
//           <div className="">challenge</div>
//         );
//       default:
//         return <div>Content not found</div>;
//     }
//   };

//   return (
//   <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-200">
//   {/* Header Tabs */}
//   <nav
//     className="flex overflow-x-auto whitespace-nowrap border-b border-gray-200 dark:border-gray-700 scrollbar-hide transition-colors duration-200"
//     role="tablist"
//   >
//     {tabs.map((tab) => (
//       <a
//         key={tab.id}
//         href={tab.href}
//         onClick={(e) => handleTabClick(e, tab.id)}
//         className={`flex-shrink-0 px-4 lg:px-6 py-3 text-xs sm:text-base font-medium transition-colors duration-200 ${
//           activeTab === tab.id
//             ? 'text-orange-500 dark:text-orange-400 border-b-2 border-orange-500 dark:border-orange-400'
//             : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
//         }`}
//         role="tab"
//         aria-selected={activeTab === tab.id}
//         aria-controls={`tabpanel-${tab.id}`}
//       >
//         {tab.label}
//       </a>
//     ))}
//   </nav>

//   <div className="flex">
//     {/* Main Content */}
//     <main className="flex-1 " role="main">
//       <div
//         id={`tabpanel-${activeTab}`}
//         role="tabpanel"
//         aria-labelledby={`tab-${activeTab}`}
//       >
//         {renderTabContent()}
//       </div>
//     </main>
//   </div>
// </div>
//   );
// };



// export default SuggestedDIverTabs;


import React, { useState, useEffect } from "react";
import SuggestedDivers from "./suggested/SuggestedDivers";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import { sugestedDriverTranslations } from "../../translation/dashboardTranslation";
import { Language } from "@/app/(auth)/sign-up/translations";


export interface TabItem {
  id: string;
  label: string;
  href: string;
}

interface DivingAppProps {
  initialTab?: string;
  onTabChange?: (tabId: string) => void;
  user: User | null;
}

const SuggestedDIverTabs: React.FC<DivingAppProps> = ({
  initialTab = "divers",
  onTabChange,
  user,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);



 const language: Language = (user?.profile_details?.language as Language) || "en";
  const t = sugestedDriverTranslations[language] ||sugestedDriverTranslations?.en ;

  const tabs: TabItem[] = [
    { id: "divers", label: t.divers, href: "?tab=divers" },
    { id: "spots", label: t.spots, href: "?tab=spots" },
    { id: "products", label: t.products, href: "?tab=products" },
    { id: "challenges", label: t.challenges, href: "?tab=challenges" },
  ];

  // Sync with URL
  useEffect(() => {
    const updateFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tabFromURL = urlParams.get("tab");
      if (tabFromURL && tabs.some((tab) => tab.id === tabFromURL)) {
        setActiveTab(tabFromURL);
      }
    };
    updateFromURL();
    window.addEventListener("popstate", updateFromURL);
    return () => window.removeEventListener("popstate", updateFromURL);
  }, [tabs]);

  const handleTabClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tabId: string
  ) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tabId);
    window.history.pushState({}, "", url.toString());
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case "divers":
        return <SuggestedDivers />;
      case "spots":
        return <div>{t.spots}</div>;
      case "products":
        return <div>{t.products}</div>;
      case "challenges":
        return <div>{t.challenges}</div>;
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Language Switcher */}
 

      {/* Header Tabs */}
      <nav
        className="flex overflow-x-auto whitespace-nowrap border-b border-gray-200 dark:border-gray-700 scrollbar-hide transition-colors duration-200"
        role="tablist"
      >
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={tab.href}
            onClick={(e) => handleTabClick(e, tab.id)}
            className={`flex-shrink-0 px-4 lg:px-6 py-3 text-xs sm:text-base font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? "text-orange-500 dark:text-orange-400 border-b-2 border-orange-500 dark:border-orange-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
          >
            {tab.label}
          </a>
        ))}
      </nav>

      <main className="flex-1">{renderTabContent()}</main>
    </div>
  );
};

export default SuggestedDIverTabs;
