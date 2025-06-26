import React, { useState } from 'react';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';
import ProfileAccountType from './userSettings/ProfileAccountType';
import LanguageComponent from './userSettings/LangusgeSetteings';
import ReferralSetting from './userSettings/ReferralSetting';
import BlockedUsersAndFeedback from './userSettings/BlockedUsersAndFeedback ';

const UserSetting = () => {
  const [activeSection, setActiveSection] = useState('authentication');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSaveChanges = () => {
    console.log('Password change submitted');
  };

  const AuthenticationComponent = () => (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold font-archivo text-[#09090B] mb-2">
        Change Password
      </h1>
      <p className="text-[#71717A] text-xs font-archivo mb-8">
        Passwords must contain at least 8 characters
      </p>

      <div className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="block text-xs font-archivo font-medium text-[#36394A] mb-2">
            Current password
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-4 py-3 border border-[#ECEFF3] bg-[#F6F8FA] text-[#09090B] text-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-xs font-archivo font-medium text-[#36394A] mb-2">
            New password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-[#ECEFF3] bg-[#F6F8FA] text-[#09090B] text-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-archivo font-medium text-[#36394A] mb-2">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-[#ECEFF3] bg-[#F6F8FA] text-[#09090B] text-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSaveChanges}
          className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none"
        >
          Save Changes
        </button>
      </div>
    </div>
  );

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
        <div className="flex-1 w-full mt-6 overflow-y-auto max-h-[calc(70vh-5rem)] p-4">
          {renderComponent()}
        </div>
      </div>
  );
};

export default UserSetting;
