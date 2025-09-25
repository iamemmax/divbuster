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
import CloseIcon from "@/app/icons/CloseIcon";
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
    <div className="flex flex-col md:flex-row px-4 md:px-10 py-6 gap-6 md:gap-[50px]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-full max-w-md mt-10 shadow-sm dark:shadow-gray-900/20 rounded-lg">
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
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar (Modal) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="mb-4 px-4 py-2 bg-orange-500 text-white rounded-lg shadow"
        >
          Open Menu
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
            <div className="bg-white dark:bg-gray-900 w-full p-6 space-y-4 overflow-y-auto">
              <div className="flex justify-end items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-red-500 font-bold mb-4"
                >
                  <CloseIcon />
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
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full mt-6 overflow-y-auto max-h-[calc(80vh-0rem)] p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-gray-900/20">
        {renderComponent()}
      </div>
    </div>
  );
};

export default SubscriptionSettings;
