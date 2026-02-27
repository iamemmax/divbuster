"use client";
import React, { useEffect, useState, useMemo } from "react";
import Header from "../../components/shared/Header";
import ProfileSettings from "./components/ProfileSettings";
import UserSetting from "./components/UserSetting";
import SubscriptionSettings from "./components/Subscription";
import { useAuth } from "@/contexts/authentication";
import UnitAndMeasurement from "./components/UnitAndMeasurement";
import DivingComputer from "./components/DIvingComputer";
// import { Language } from "../../translation/dashboardTranslation";
import { Profiletranslations } from "../../translation/profileTranslation";
import { useLanguage } from "@/hooks/useLanguage";

interface TabItem {
  id: string;
  label: string;
  href: string;
}



const SettingsTab = () => {
  // 🔹 Pick language here (could be dynamic from user profile/context)
    const { authState } = useAuth();
  const { user } = authState;
    const {language, setLanguage}=useLanguage()
   const t = Profiletranslations[language] || Profiletranslations?.en;

  const [activeTab, setActiveTab] = useState<string>("profile");

  const tabs = useMemo<TabItem[]>(() => [
    { id: "profile", label: t.tabs.profile, href: "?tab=profile" },
    { id: "UserSettings", label: t.tabs.user_settings, href: "?tab=userSettings" },
    { id: "MySubscription", label: t.tabs.my_subscription, href: "?tab=mySubscription" },
    { id: "Units & Measurement", label: t.tabs.units_measurement, href: "?tab=unit&measurement" },
    { id: "DivingComputer", label: t.tabs.diving_computer, href: "?tab=divingComputer" },
  ], [t]);

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
  };



  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings language={language}/>;
      case "UserSettings":
        return <UserSetting user={user} language={language} setLanguage={setLanguage}/>;
      case "MySubscription":
        return <SubscriptionSettings user={user} language={language}/>;
      case "Units & Measurement":
        return <UnitAndMeasurement user={user} language={language}/>;
      case "DivingComputer":
        return <DivingComputer />;
      default:
        return <div>{t.content_not_found}</div>;
    }
  };

  return (
    <div className="h-screen">
      <div className="h-[10vh]">
        <Header title={t.title} subtitle="" />
      </div>

      <div className="font-archivo p-3 md:p-6 h-[90vh] overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-base lg:text-2xl font-medium text-[#1D2939] dark:text-white">
            {t.system_settings}
          </h1>
          <p className="text-[#475467] font-medium text-xs sm:text-sm dark:text-gray-300">
            {t.system_settings_subtitle}
          </p>
        </div>

        <nav
          className="flex overflow-x-auto mt-5 border-gray-200 dark:border-gray-700 scrollbar-hide"
          role="tablist"
        >
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={tab.href}
              onClick={(e) => handleTabClick(e, tab.id)}
              className={`shrink-0 whitespace-nowrap px-8 py-[10px] text-xs sm:text-sm font-medium transition-colors duration-200
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
            className={`shrink-0 whitespace-nowrap px-8 py-[10px] text-xs sm:text-sm font-medium transition-colors duration-200
            ${
              activeTab === "token-management"
                ? "text-white bg-[#F7931D] dark:bg-[#F7931D]"
                : "bg-white text-black border border-[#D0D5DD] border-opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
            }`}
            role="tab"
          >
            {t.tabs.token_management}
          </a>
        </nav>

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
