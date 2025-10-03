"use client"
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import RecentTokenTransaction from './manageToken/RecentTokenTransaction';
import ManageTokenHeader from './manageToken/ManageTokenHeader';
import RecentFundTransactions from './manageToken/FundTransaction';
import TokenSpent from './manageToken/TokenSpent';
import AddTokenModal from './modals/AddTokenModal';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import MyInvoicesManagement from './invoices/InvoiceMagement';
import { tokenHistoryTranslations } from '@/app/(main)/translation/tokenTranslation';
import { useLanguage } from '@/hooks/useLanguage';

interface prop {
  user: User | null;
}



const ManageToken = ({ user }: prop) => {
  const [activeSection, setActiveSection] = useState('History');
  const [showTokenModal, setShowTokenModal] = useState(false);
const {language}=useLanguage()
  const t = tokenHistoryTranslations[language] || tokenHistoryTranslations.en;

  const renderComponent = () => {
    switch (activeSection) {
      case 'History':
        return <MyInvoicesManagement />;
      default:
        return 1;
    }
  };

  return (
    <div className="flex 2xl:max-h-[60vh] flex-col md:flex-row md:px-4 py-6 gap-6 md:gap-[50px] bg-white dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <div className="w-full max-w-md mt-10 rounded-lg">
        <div className="pb-3 max-w-xs">
          <h2 className='font-archivo text-black dark:text-white font-medium text-xl'>
            <span className='text-[#71717A] dark:text-gray-400'>
              {t.greeting}, {user?.first_name}
            </span>, {t.manageTokens}
          </h2>
        </div>
        <div className="">
          <ManageTokenHeader 
            onAddTokens={() => setShowTokenModal(true)} 
            balance={user?.wallet?.balance} 
          />
        </div>
        <div className="space-y-4">
          {t.sidebar.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(item.id)}
              className={`p-4 rounded-lg mt-4 border cursor-pointer transition-all ${
                activeSection === item.id
                  ? 'border-orange-300 dark:border-orange-400 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-1">
                    <h3
                      className={`font-medium font-archivo text-[#333333] dark:text-gray-200 mb-1 text-sm ${
                        activeSection === item.id ? 'font-bold' : 'font-normal'
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

      {/* Main Content - Scrollable */}
      <div className="flex-1 w-full mt-6 overflow-y-auto max-h-[calc(70vh-0rem)] p-4 bg-white dark:bg-gray-800 rounded-lg transition-colors">
        {renderComponent()}
      </div>

      {showTokenModal && (
        <AddTokenModal
          isOpen={showTokenModal}
          setIsOpen={setShowTokenModal}
        />
      )}
    </div>
  );
};

export default ManageToken;
