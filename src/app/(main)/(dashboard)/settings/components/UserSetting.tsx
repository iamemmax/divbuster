



"use client";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import ProfileAccountType from "./userSettings/ProfileAccountType";
import ReferralSetting from "./userSettings/ReferralSetting";
import { AuthenticationComponent } from "./userSettings/AuthenticationComp";
import LanguageComponent from "./userSettings/LangusgeSetteings";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import { Language } from "@/app/(auth)/sign-up/translations";
import { userSettingsTranslations } from "@/app/(main)/translation/profileTranslation";

// ✅ All translations in one object


interface Prop {
  user: User | null;
setLanguage: (lang: Language) => void
  language:Language
}

const UserSetting = ({ user ,language, setLanguage}: Prop) => {
  const [activeSection, setActiveSection] = useState("authentication");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const t = userSettingsTranslations[language] || userSettingsTranslations?.en;

  const sidebarItems = [
    { id: "authentication", title: t.authentication.title, subtitle: t.authentication.subtitle },
    { id: "account-type", title: t.accountType.title, subtitle: t.accountType.subtitle },
    { id: "language", title: t.language.title, subtitle: t.language.subtitle },
    { id: "referral", title: t.referral.title, subtitle: t.referral.subtitle },
    // { id: "delete-account", title: t.deleteAccount.title, subtitle: t.deleteAccount.subtitle },
  ];

  const renderComponent = () => {
    switch (activeSection) {
      case "authentication":
        return <AuthenticationComponent  language={language} />;
      case "account-type":
        return <ProfileAccountType user={user} language={language} />;
      case "language":
        return <LanguageComponent user={user} language={language} setLanguage={setLanguage} />;
      case "referral":
        return <ReferralSetting />;
      // case "delete-account":
        // return <BlockedUsersAndFeedback />;
      default:
        return <AuthenticationComponent  language={language} />;
    }
  };

  return (
    <div className="flex flex-col xl:flex-row  py-6 gap-6 md:gap-[50px]">


      {/* Mobile Menu Toggle - Floating Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="xl:hidden fixed bottom-4 right-4 z-50 bg-[#F7931D] text-white p-3 rounded-full shadow-lg hover:bg-[#E8841A] transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Sidebar (desktop only) */}
      <div className="hidden xl:block w-full max-w-md mt-10 shadow-sm rounded-lg">
        <div className="space-y-4">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(item.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeSection === item.id
                  ? "border-orange-300 bg-orange-50 dark:text-black"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-1">
                    <h3
                      className={`font-medium font-archivo mb-1 text-sm ${
                        activeSection === item.id
                          ? "font-bold text-[#333333]"
                          : "font-normal dark:text-white"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs font-archivo text-[#71717A]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRight className="size-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Modal Sidebar */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute bottom-0 inset-x-0 bg-white dark:bg-gray-900 rounded-t-lg max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-archivo">{t.menu.open || 'Settings Menu'}</h3>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="size-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M12.854 4.854a.5.5 0 0 0-.708-.708L8 8.293 3.854 4.146a.5.5 0 1 0-.708.708L7.293 9l-4.147 4.146a.5.5 0 0 0 .708.708L8 9.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 9l4.147-4.146z"/>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(70vh-80px)]  p-4  md:pl-[18.5rem] space-y-3">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-4 rounded-lg border   cursor-pointer transition-all ${
                    activeSection === item.id
                      ? "border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:text-white"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 ">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.subtitle}</p>
                    </div>
                    <ChevronRight className="size-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 w-full  overflow-y-auto max-h-[calc(70vh-5rem)] p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default UserSetting;
