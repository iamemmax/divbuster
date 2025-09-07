"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/shared/Header";
import ProfileSettings from "./components/ProfileSettings";
import UserSetting from "./components/UserSetting";
import SubscriptionSettings from "./components/Subscription";
import { useAuth } from "@/contexts/authentication";
import UnitAndMeasurement from "./components/UnitAndMeasurement";
import DivingComputer from "./components/DIvingComputer";

interface TabItem {
  id: string;
  label: string;
  href: string;
}
const SettingsTab = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");

  const tabs: TabItem[] = [
    { id: "profile", label: "Profile", href: "?tab=profile" },
    { id: "UserSettings", label: "User Settings", href: "?tab=userSettings" },
    {
      id: "MySubscription",
      label: "My Subscription",
      href: "?tab=mySubscription",
    },
    {
      id: "Units & Measurement",
      label: "Units & Measurement",
      href: "?tab=unit&measurement",
    },
    {
      id: "DivingComputer",
      label: "Diving Computer",
      href: "?tab=divingComputer",
    },
    
   
  ];

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
  }, []);

  const handleTabClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tabId: string
  ) => {
    e.preventDefault();

    const url = new URL(window.location.href);
    url.searchParams.set("tab", tabId);
    window.history.pushState({}, "", url.toString());
    setActiveTab(tabId);
  };
  
   const { authState } = useAuth();
     const { user} = authState;
  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <ProfileSettings />
          </div>
        );
      case "UserSettings":
        return <div><UserSetting/></div>;
      case "MySubscription":
        return <div><SubscriptionSettings user={user}/></div>;
      case "Units & Measurement":
        return <div><UnitAndMeasurement user={user}/></div>;
      case "DivingComputer":
        return <div><DivingComputer/></div>;
      default:
        return <div>Content not found</div>;
    }
  };

  return (
<div>
  <Header title="Settings" subtitle="" />

  <div className="font-archivo p-3 md:p-6 h-[80vh] overflow-y-auto">
    <div className="mb-8">
      <h1 className="text-base lg:text-2xl font-medium text-[#1D2939] dark:text-white">
        System settings
      </h1>
      <p className="text-[#475467] font-medium text-xs sm:text-sm dark:text-gray-300">
        Set up your business account here if you haven't.
      </p>
    </div>

    <nav
      className="flex overflow-x-auto mt-5 border-gray-200 dark:border-gray-700 scrollbar-hide"
      role="tablist"
    >
      {tabs?.map((tab) => (
        <a
          key={tab.id}
          href={tab.href}
          onClick={(e) => handleTabClick(e, tab.id)}
          className={`flex-shrink-0 whitespace-nowrap px-8 py-[10px] text-xs sm:text-sm font-medium transition-colors duration-200
            ${
              activeTab === tab.id
                ? "text-white bg-[#F7931D] dark:bg-[#F7931D]"
                : "bg-white text-black border border-[#D0D5DD] border-opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
            }`}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
        >
          {tab.label}
        </a>
      ))}

      <a
        href={"/token-management"}
        className={`flex-shrink-0 whitespace-nowrap px-8 py-[10px] text-xs sm:text-sm font-medium transition-colors duration-200
          ${
            activeTab === "token-management"
              ? "text-white bg-[#F7931D] dark:bg-[#F7931D]"
              : "bg-white text-black border border-[#D0D5DD] border-opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          }`}
        role="tab"
      >
        Token Management
      </a>
    </nav>

    {/* Main Content */}
    <main className="w-full" role="main">
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

export default SettingsTab;
