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
  // const [activeTab, setActiveTab] = useState<string>("manage-token");

  const { authState } = useAuth();
    const { user} = authState;
  const {language}= useLanguage()
 
  const t = tokenTranslations[language] || tokenTranslations.en;


  // useEffect(() => {
  //   const updateFromURL = () => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const tabFromURL = urlParams.get("tab");
  //     if (tabFromURL && tabs.some((tab) => tab.id === tabFromURL)) {
  //       setActiveTab(tabFromURL);
  //     }
  //   };

  //   updateFromURL();
  //   window.addEventListener("popstate", updateFromURL);
  //   return () => window.removeEventListener("popstate", updateFromURL);
  // }, []);

  // const handleTabClick = (
  //   e: React.MouseEvent<HTMLAnchorElement>,
  //   tabId: string
  // ) => {
  //   e.preventDefault();

  //   const url = new URL(window.location.href);
  //   url.searchParams.set("tab", tabId);
  //   window.history.pushState({}, "", url.toString());
  //   setActiveTab(tabId);
  // };
  
  // const renderTabContent = (): JSX.Element => {
  //   switch (activeTab) {
  //     case "manage-token":
  //       return (
  //         <div>
  //          <ManageToken user={user}/>
  //         </div>
  //       );
  //     case "myCards":
  //       return <div><CardManagement user={user}/></div>;
  //     case "invoices":
  //       return <div><MyInvoicesNamagement/></div>;
  //     case "orders":
  //       return <div><MyOrderMangement/></div>;
    
  //     default:
  //       return  <ManageToken user={user}/>
  //   }
  // };

  return (
    <div className="w-full">
      <Header title={t.manageToken} subtitle="" />

      <div className="font-archivo w-full p-3 h-[90vh] overflow-y-auto">
        {/* <div className="mb-3">
          <h1 className="text-base md:xl: lg:text-2xl font-medium  text-[#1D2939]">
          {t.header}
          </h1>
          <p className="text-[#475467] font-medium text-xs sm:text-sm">
         {t.description}
          </p>
        </div> */}
   

        {/* Main Content */}
        <main className=" w-full h-full" role="main">
          <ManageToken user={user} />
        </main>
      </div>
    </div>
  );
};

export default SettingsTab;
