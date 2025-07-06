import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { User } from '@/contexts/authentication';
import RecentTokenTransaction from './manageToken/RecentTokenTransaction';
import ManageTokenHeader from './manageToken/ManageTokenHeader';
import RecentFundTransactions from './manageToken/FundTransaction';
import TokenSpent from './manageToken/TokenSpent';
import AddTokenModal from './modals/AddTokenModal';
interface prop{
    user: User | null
}
const ManageToken = ({user}:prop) => {
  const [activeSection, setActiveSection] = useState('resetnt-token');

    const [showTokenModal, setShowTokenModal] = useState(false)

  const sidebarItems = [
    {
      id: 'resetnt-token',
      title: 'Token Transactions',
      subtitle: 'View all your token transaction here.',
    },
    {
      id: 'funt-transaction',
      title: 'Fund Transactions',
      subtitle: 'View all your fund transactions here.',
    },
    {
      id: 'History',
      title: 'History',
      subtitle: 'View all token spent with detais',
    },
    
  ];

  const renderComponent = () => {
    switch (activeSection) {
      case 'resetnt-token':
        return <RecentTokenTransaction/>;
      case 'funt-transaction':
        return <RecentFundTransactions/>;
      case 'History':
        return <TokenSpent/>;
    
      default:
        return  1
    }
  };

  return (
    <div className=" flex 2xl:max-h-[60vh] flex-col md:flex-row px-4 md:px-10 py-6 gap-6 md:gap-[50px]">
      {/* Sidebar */}
      <div className="w-full max-w-md mt-10  rounded-lg">
         <div className="pb-3 max-w-xs">
            <h2 className='font-archivo text-black font-medium text-xl'><span className='text-[#71717A]'>Hello, {user?.first_name}</span>, Let’s help you manage your token.</h2>
            {/* <p className='py-1 font-archivo text-sm text-[#71717A]'>You are currently on a One (1) Year Solid Plan.</p> */}
        </div>
        <div className="">
            <ManageTokenHeader onAddTokens={()=>setShowTokenModal(true)}/>
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

      {
        showTokenModal && <AddTokenModal
        isOpen={showTokenModal}
        setIsOpen={setShowTokenModal}
        />
      }
    </div>
  );
};

export default ManageToken;


