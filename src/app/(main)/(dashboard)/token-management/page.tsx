"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/shared/Header";
import { useAuth } from "@/contexts/authentication";
import ManageToken from "./components/ManageToken";
import MyInvoicesNamagement from "./components/invoices/InvoiceMagement";
import CardManagement from "./components/MyCards";
import MyOrderMangement from "./components/orders/ordersMagement";
import { tokenTranslations } from "../../translation/tokenTranslation";
import { Language } from "../../translation/dashboardTranslation";
import { useLanguage } from "@/hooks/useLanguage";

interface TabItem {
  id: string;
  label: string;
  href: string;
}
const SettingsTab = () => {
  const [activeTab, setActiveTab] = useState<string>("manage-token");

  const { authState } = useAuth();
    const { user} = authState;
  const {language}= useLanguage()
 
  const t = tokenTranslations[language] || tokenTranslations.en;
  const tabs: TabItem[] = [
    { id: "manage-token", label: t.header, href: "?tab=manageToken" },
    //    { id: "myCards", label: "My Cards", href: "?tab=myCards" },
    {
      id: "invoices",
      label: t.invoices,
      href: "?tab=invoices",
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
  
  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case "manage-token":
        return (
          <div>
           <ManageToken user={user}/>
          </div>
        );
      case "myCards":
        return <div><CardManagement user={user}/></div>;
      case "invoices":
        return <div><MyInvoicesNamagement/></div>;
      case "orders":
        return <div><MyOrderMangement/></div>;
    
      default:
        return  <ManageToken user={user}/>
    }
  };

  return (
    <div className="w-full">
      <Header title={t.manageToken} subtitle="" />

      <div className="font-archivo w-full p-3 md:p-6 h-[80vh] overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-base md:xl: lg:text-2xl font-medium  text-[#1D2939]">
          {t.header}
          </h1>
          <p className="text-[#475467] font-medium text-xs sm:text-sm">
         {t.description}
          </p>
        </div>
        <nav
          className="flex overflow-x-auto mt-5 border-gray-200 scrollbar-hide"
          role="tablist"
        >
          {/* <div className=""> */}
          {tabs?.map((tab) => (
            <a
              key={tab.id}
              href={tab.href}
              onClick={(e) => handleTabClick(e, tab.id)}
              className={`flex-shrink-0 whitespace-nowrap px-8 py-[10px] text-xs sm:text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-white  bg-[#F7931D]"
                  : "bg-[#fff] text-black border border-[#D0D5DD] border-opacity-50"
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
            >
              {tab.label}
            </a>

))}
{/* </div> */}


        </nav>

        {/* Main Content */}
        <main className=" w-full" role="main">
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
