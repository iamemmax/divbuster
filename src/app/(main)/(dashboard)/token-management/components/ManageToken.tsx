"use client"
import React, { useState } from 'react';
import { ChevronRight, Menu } from 'lucide-react';
import RecentTokenTransaction from './manageToken/RecentTokenTransaction';
import ManageTokenHeader from './manageToken/ManageTokenHeader';
// import RecentFundTransactions from './manageToken/FundTransaction';
// import TokenSpent from './manageToken/TokenSpent';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const {language}=useLanguage()
  const t = tokenHistoryTranslations[language] || tokenHistoryTranslations.en;

  const renderComponent = () => {
    switch (activeSection) {
      case 'History':
        return <MyInvoicesManagement />;
      case 'Token transaction':
        return <RecentTokenTransaction />;
      default:
        return  <RecentTokenTransaction />;;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="p-2 md:px-6 h-full">
      <div className='grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-4 md:gap-6 h-full'>
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="xl:hidden fixed bottom-10 right-4 z-50 bg-[#F7931D] text-white p-3 rounded-full shadow-lg hover:bg-[#E8841A] transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar - Hidden on mobile by default */}
        <div className="hidden xl:block w-full max-w-md overflow-y-auto mt-10">
          <div className="pb-3">
            <h2 className='font-archivo text-black dark:text-white font-medium text-xl'>
              <span className='text-[#71717A] dark:text-gray-400'>
                {t.greeting}, {user?.first_name}
              </span>, {t.manageTokens}
            </h2>
          </div>
          <div className="mb-6">
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
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
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

        {/* Main Content */}
        <div className="w-full overflow-y-auto bg-white dark:bg-gray-800 rounded-lg transition-colors">
          {renderComponent()}
        </div>
      </div>

      {/* Mobile Sidebar Modal */}
      {isSidebarOpen && (
        <div className="xl:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleSidebar}>
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-lg max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-archivo">Token Management</h3>
              <button 
                onClick={toggleSidebar} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M12.854 4.854a.5.5 0 0 0-.708-.708L8 8.293 3.854 4.146a.5.5 0 1 0-.708.708L7.293 9l-4.147 4.146a.5.5 0 0 0 .708.708L8 9.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 9l4.147-4.146z"/>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(80vh-80px)] p-4">
              <div className="pb-3">
                <h2 className='font-archivo text-black dark:text-white font-medium text-xl'>
                  <span className='text-[#71717A] dark:text-gray-400'>
                    {t.greeting}, {user?.first_name}
                  </span>, {t.manageTokens}
                </h2>
              </div>
              <div className="mb-6">
                <ManageTokenHeader 
                  onAddTokens={() => {setShowTokenModal(true); setIsSidebarOpen(false);}} 
                  balance={user?.wallet?.balance} 
                />
              </div>
              <div className="space-y-4 max-md:mb-44">
                {t.sidebar.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {setActiveSection(item.id); setIsSidebarOpen(false);}}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
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
          </div>
        </div>
      )}

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
