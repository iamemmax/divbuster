


import React, { useState, useEffect, useMemo } from "react";
import SuggestedDivers from "./suggested/SuggestedDivers";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import { sugestedDriverTranslations } from "../../translation/dashboardTranslation";
import { useLanguage } from "@/hooks/useLanguage";
import ComingSoon from "./ComingSoon";


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
  
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);



const {language}= useLanguage()
  const t = sugestedDriverTranslations[language] ||sugestedDriverTranslations?.en ;

  const tabs: TabItem[] = useMemo(() => [
    { id: "divers", label: t.divers, href: "?tab=divers" },
    { id: "spots", label: t.spots, href: "?tab=spots" },
    { id: "products", label: t.products, href: "?tab=products" },
    { id: "challenges", label: t.challenges, href: "?tab=challenges" },
  ], [t]);

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
        return <ComingSoon title={t.spots} />;
      case "products":
        return <ComingSoon title={t.products} />;
      case "challenges":
        return <ComingSoon title={t.challenges} />;
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
            className={`shrink-0 px-4 lg:px-6 py-3 text-xs sm:text-base font-medium transition-colors duration-200 ${
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
