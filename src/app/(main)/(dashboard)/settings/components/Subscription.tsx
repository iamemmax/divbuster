// import React, { useState } from 'react';
// import { ChevronRight } from 'lucide-react';
// import AccountSubscription from './subscription/AccountSubscription';
// import { User } from '@/app/(auth)/api/getAuthenticatedUser';
// import { Language } from '@/app/(auth)/sign-up/translations';

// interface prop{
//     user: User | null;
//     language:Language
// }

// const SubscriptionSettings = ({user}:prop) => {
//   const [activeSection, setActiveSection] = useState('account-subscription');

//   const sidebarItems = [
//     {
//       id: 'account-subscription',
//       title: 'Account Subscription',
//       subtitle: 'Full details on your current account',
//     },
//     {
//       id: 'account-upgrade',
//       title: 'Account Upgrade',
//       subtitle: 'Upgrade your account features',
//     },
//   ];

//   const renderComponent = () => {
//     switch (activeSection) {
//       case 'account-subscription':
//         return <AccountSubscription />;
    
//       default:
//         return <AccountSubscription />;
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row px-4 md:px-10 py-6 gap-6 md:gap-[50px]">
//       {/* Sidebar */}
//       <div className="w-full max-w-md mt-10 shadow-sm dark:shadow-gray-900/20 rounded-lg">
//         <div className="pb-3 max-w-xs">
//           <h2 className='font-archivo text-black dark:text-white font-medium text-xl'>
//             <span className='text-[#71717A] dark:text-gray-400'>Hello, {user?.first_name}</span>
//             , Let's help you set up your account plan.
//           </h2>
//           <p className='py-1 font-archivo text-sm text-[#71717A] dark:text-gray-400'>
//             You are currently on a One (1) Year Solid Plan.
//           </p>
//         </div>
//         <div className="space-y-4">
//           {sidebarItems.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => setActiveSection(item.id)}
//               className={`p-4 rounded-lg border cursor-pointer transition-all ${
//                 activeSection === item.id
//                   ? 'border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20'
//                   : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3 flex-1">
//                   <div className="flex-1">
//                     <h3
//                       className={`font-medium font-archivo text-[#333333] dark:text-gray-200 mb-1 text-sm ${
//                         activeSection === item.id ? 'font-bold' : 'font-normal'
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     <p className="text-xs font-archivo text-[#71717A] dark:text-gray-400">
//                       {item.subtitle}
//                     </p>
//                   </div>
//                 </div>
//                 <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content - Scrollable */}
//       <div className="flex-1 w-full mt-6 overflow-y-auto max-h-[calc(80vh-0rem)] p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-gray-900/20">
//         {renderComponent()}
//       </div>
//     </div>
//   );
// };

// export default SubscriptionSettings;


"use client";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import AccountSubscription from "./subscription/AccountSubscription";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import { Language } from "@/app/(auth)/sign-up/translations";
import { subscriptionSranslations } from "@/app/(main)/translation/profileTranslation";

// ✅ Translations in one object


interface Props {
  user: User | null;
  language: Language;
}

const SubscriptionSettings = ({ user, language }: Props) => {
  const [activeSection, setActiveSection] = useState("account-subscription");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = subscriptionSranslations[language] || subscriptionSranslations.en;

  const sidebarItems = [
    {
      id: "account-subscription",
      title: t.sidebar.account_subscription.title,
      subtitle: t.sidebar.account_subscription.subtitle,
    },
    // {
    //   id: "account-upgrade",
    //   title: t.sidebar.account_upgrade.title,
    //   subtitle: t.sidebar.account_upgrade.subtitle,
    // },
  ];

  const renderComponent = () => {
    switch (activeSection) {
      case "account-subscription":
        return <AccountSubscription language={language}/>;
      default:
        return <AccountSubscription language={language}/>;
    }
  };

  return (
    <div className="flex flex-col xl:flex-row px-4 md:px-10 py-6 gap-6 md:gap-[50px]">
      {/* Desktop Sidebar */}
      <div className="hidden xl:block w-full max-w-md mt-10 shadow-sm dark:shadow-gray-900/20 rounded-lg">
        <div className="pb-3 max-w-xs">
          <h2 className="font-archivo text-black dark:text-white font-medium text-xl">
            {t.greeting(user?.first_name || "User")}
          </h2>
          <p className="py-1 font-archivo text-sm text-[#71717A] dark:text-gray-400">
            {t.currentPlan}
          </p>
        </div>
        <div className="space-y-4">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(item.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeSection === item.id
                  ? "border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-1">
                    <h3
                      className={`font-medium font-archivo text-[#333333] dark:text-gray-200 mb-1 text-sm ${
                        activeSection === item.id ? "font-bold" : "font-normal"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs font-archivo text-[#71717A] dark:text-gray-400">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRight className="size-5 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Toggle - Floating Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="xl:hidden fixed bottom-4 right-4 z-50 bg-[#F7931D] text-white p-3 rounded-full shadow-lg hover:bg-[#E8841A] transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Mobile Modal Sidebar */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute bottom-0 inset-x-0 bg-white dark:bg-gray-900 rounded-t-lg max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-archivo">Subscription Menu</h3>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="size-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M12.854 4.854a.5.5 0 0 0-.708-.708L8 8.293 3.854 4.146a.5.5 0 1 0-.708.708L7.293 9l-4.147 4.146a.5.5 0 0 0 .708.708L8 9.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 9l4.147-4.146z"/>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(70vh-80px)]  p-4 md:pl-[18.5rem] space-y-3">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    activeSection === item.id
                      ? "border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:text-white"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
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
      <div className="flex-1 w-full mt-6 overflow-y-auto max-h-[calc(80vh-0rem)] p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-gray-900/20">
        {renderComponent()}
      </div>
    </div>
  );
};

export default SubscriptionSettings;
