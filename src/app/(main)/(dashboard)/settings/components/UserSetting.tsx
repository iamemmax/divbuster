import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';
import ProfileAccountType from './userSettings/ProfileAccountType';
import LanguageComponent from './userSettings/LangusgeSetteings';
import ReferralSetting from './userSettings/ReferralSetting';
import BlockedUsersAndFeedback from './userSettings/BlockedUsersAndFeedback ';
import { AuthenticationComponent } from './userSettings/AuthenticationComp';


const UserSetting = () => {

  
  const [activeSection, setActiveSection] = useState('authentication');



  const sidebarItems = [
    {
      id: 'authentication',
      title: 'Authentication',
      subtitle: 'Change or Confirm your Password',
    },
    {
      id: 'account-type',
      title: 'Account Type',
      subtitle: 'Change or confirm your Account type',
    },
    {
      id: 'language',
      title: 'Change Language',
      subtitle: 'Please verify your Language of choice.',
    },
    {
      id: 'referral',
      title: 'Dive Busters Referral',
      subtitle: 'You have been selected to join this amazing family.',
    },
    {
      id: 'delete-account',
      title: 'Blocked Users / Delete Account',
      subtitle: 'Account deleted can never be recovered again.',
    },
  ];




  const renderComponent = () => {
    switch (activeSection) {
      case 'authentication':
        return <AuthenticationComponent />;
      case 'account-type':
        return <ProfileAccountType />;
      case 'language':
        return <LanguageComponent />;
      case 'referral':
        return <ReferralSetting />;
      case 'delete-account':
        return <BlockedUsersAndFeedback />;
      default:
        return <AuthenticationComponent />;
    }
  };

  return (
    <div className=" flex flex-col md:flex-row px-4 md:px-10 py-6 gap-6 md:gap-[50px]">
      {/* Sidebar */}
      <div className="w-full max-w-md mt-10 shadow-sm rounded-lg">
        <div className="space-y-4">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(item.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeSection === item.id
                  ? 'border-orange-300 bg-orange-50 dark:text-black'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-1">
                    <h3
                      className={`font-medium font-archivo text-[#333333]  mb-1 text-sm ${
                        activeSection === item.id ? 'font-bold' : 'font-normal dark:text-white'
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
      <div className="flex-1 w-full mt-6 overflow-y-auto max-h-[calc(70vh-5rem)] p-4">
        {renderComponent()}
      </div>

     
    </div>
  );
};

export default UserSetting;