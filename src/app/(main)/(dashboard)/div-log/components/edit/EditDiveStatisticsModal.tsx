import React, { useState } from 'react';
import AdvancedDetailsModal from './unused/AdvancedDetailsModal';
import LogSummaryModal from './LogSummaryModal';
import MoreLogDetailsModal from './unused/MoreLogDetailsModal';
import { singleDiveProp } from '../../../api/div-logs/fetchSingleDivLog';
import { Dialog, DialogContent } from "@/components/core";
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { Language } from '@/app/(auth)/sign-up/translations';
import { diveLogSidebarTranslations } from '@/app/(main)/translation/diveLogTranslation';


interface EditDiveStatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
   data: singleDiveProp | undefined;
    user: User | null
}

const EditDiveStatisticsModal: React.FC<EditDiveStatisticsModalProps> = ({
  isOpen,
  onClose,
  data,
  user
}) => {
  // const [activeTab, setActiveTab] = useState('log-summary');

  if (!isOpen) return null;

  // const handleTabChange = (value: string) => {
  //   setActiveTab(value);
  // };
 const language: Language = (user?.profile_details?.language as Language)
    const t = diveLogSidebarTranslations[language] || diveLogSidebarTranslations?.en;
 
  return (
   <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[50.25rem] bg-[#F9FAFB] dark:bg-[#1A1D21] rounded-lg">
    <div className="bg-[#f9fafb] dark:bg-gray-800 rounded-lg w-full max-w-[57.3125rem] px-4 md:px-8 pt-8 max-h-[95vh] overflow-auto">
        {/* Header */}
        <div className="border-b border-opacity-55 border-gray-200 dark:border-gray-600 flex justify-between items-center">
          <h2 className="text-xl font-semibold font-archivo pb-4 text-[#101828] dark:text-white">{t?.menu?.editStats}</h2>
          
        </div>

        {/* Tabs */}
              {/* // { id: 'advanced-details', label: 'Advanced Details' }, */}
        <div className="w-full mt-2">
          {/* <div className="border-b border-opacity-55 border-gray-200 dark:border-gray-600">
            <nav className="flex gap-5 md:gap-8 items-start">
              {[
                { id: 'log-summary', label: 'Log Summary' },
                { id: 'more-log-details', label: 'More Log Details' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-0 py-4 text-xs md:text-sm font-archivo font-medium border-b transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#F7931D] text-[#F7931D]'
                      : 'border-transparent text-[#667085] dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div> */}

 <LogSummaryModal data={data} isOpen={true} onClose={onClose} user={user}/>
          {/* Tab Content */}
            {/* {activeTab === 'advanced-details' && <AdvancedDetailsModal isOpen={true} onClose={onClose} />} */}
          {/* <div className="py-4">
            {activeTab === 'log-summary' && <LogSummaryModal data={data} isOpen={true} onClose={onClose}/>}
            {activeTab === 'more-log-details' && <MoreLogDetailsModal isOpen={true} onClose={onClose}/>}
          </div> */}

      
        </div>
      </div>
   </DialogContent>
    </Dialog>
  );
};

export default EditDiveStatisticsModal;
