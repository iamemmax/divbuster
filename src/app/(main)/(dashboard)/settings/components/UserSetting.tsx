



"use client";
import React, { useState } from "react";
import { ChevronRight, Menu } from "lucide-react";
import ProfileAccountType from "./userSettings/ProfileAccountType";
import ReferralSetting from "./userSettings/ReferralSetting";
import { AuthenticationComponent } from "./userSettings/AuthenticationComp";
import LanguageComponent from "./userSettings/LangusgeSetteings";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import BlockedUsersAndFeedback from "./userSettings/BlockedUsersAndFeedback ";
import { Language } from "@/app/(auth)/sign-up/translations";
import { userSettingsTranslations } from "@/app/(main)/translation/profileTranslation";
import CloseIcon from "@/app/icons/CloseIcon";

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
    { id: "delete-account", title: t.deleteAccount.title, subtitle: t.deleteAccount.subtitle },
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
      case "delete-account":
        return <BlockedUsersAndFeedback />;
      default:
        return <AuthenticationComponent  language={language} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row  py-6 gap-6 md:gap-[50px]">


      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden flex justify-end gap-2  px-4 py-2 rounded"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="w-5 h-5" /> {t.menu.open}
      </button>

      {/* Sidebar (desktop only) */}
      <div className="hidden md:block w-full max-w-md mt-10 shadow-sm rounded-lg">
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
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Modal Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="bg-white dark:bg-gray-900 w-full p-6 space-y-4 overflow-y-auto">
           <div className="flex justify-end items-center">
             <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-red-500 font-bold mb-4"
            >
            <CloseIcon/>
            </button>
           </div>
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  activeSection === item.id
                    ? "border-orange-300 bg-orange-50 dark:text-black"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            ))}
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
