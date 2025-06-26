import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import AccountSubscription from './subscription/AccountSubscription';
import AccountUpgrade from './subscription/AccountUpgrade';
import { User } from '@/contexts/authentication';
interface prop{
    user: User | null
}
const SubscriptionSettings = ({user}:prop) => {
  const [activeSection, setActiveSection] = useState('account-subscription');

  const sidebarItems = [
    {
      id: 'account-subscription',
      title: 'Account Subscription',
      subtitle: 'Full details on your current account',
    },
    {
      id: 'account-upgrade',
      title: 'Account Upgrade',
      subtitle: 'Upgrade your account features',
    },
  ];

  const renderComponent = () => {
    switch (activeSection) {
      case 'account-subscription':
        return <AccountSubscription />;
      case 'account-upgrade':
        return <AccountUpgrade />;
      default:
        return <AccountSubscription />;
    }
  };

  return (
    <div className=" flex flex-col md:flex-row px-4 md:px-10 py-6 gap-6 md:gap-[50px]">
      {/* Sidebar */}
      <div className="w-full max-w-md mt-10 shadow-sm rounded-lg">
         <div className="pb-3 max-w-xs">
            <h2 className='font-archivo text-black font-medium text-xl'><span className='text-[#71717A]'>Hello, {user?.first_name}</span> , Let’s help you set up your account plan.</h2>
            <p className='py-1 font-archivo text-sm text-[#71717A]'>You are currently on a One (1) Year Solid Plan.</p>
        </div>
        <div className="space-y-4">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(item.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeSection === item.id
                  ? 'border-orange-300 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-1">
                    <h3
                      className={`font-medium font-archivo text-[#333333] mb-1 text-sm ${
                        activeSection === item.id ? 'font-bold' : 'font-normal'
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

      {/* Main Content - Scrollable */}
      <div className="flex-1 w-full mt-6 overflow-y-auto max-h-[calc(70vh-0rem)] p-4">
       
        {renderComponent()}
      </div>
    </div>
  );
};

export default SubscriptionSettings;
