import React, { useState } from 'react';
import AdvancedDetailsModal from './AdvancedDetailsModal';
import LogSummaryModal from './LogSummaryModal';
import MoreLogDetailsModal from './MoreLogDetailsModal';


// Replace these with actual content components, NOT modals

interface EditDiveStatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditDiveStatisticsModal: React.FC<EditDiveStatisticsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState('log-summary');

  if (!isOpen) return null;

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#f9fafb]  rounded-lg w-full max-w-[57.3125rem] px-4 md:px-8 pt-8  max-h-[95vh] overflow-auto">
        {/* Header */}
        <div className=" border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold font-archivo  text-[#101828]">Edit Dive Statistics</h2>
          
        </div>

        {/* Tabs */}
        <div className="w-full mt-2">
          <div className="border-b  border-opacity-55 border-gray-200">
            <nav className="flex  gap-5 md:gap-8 items-start">
              {[
                { id: 'log-summary', label: 'Log Summary' },
                { id: 'advanced-details', label: 'Advanced Details' },
                { id: 'more-log-details', label: 'More Log Details' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={` px-0 py-4 text-xs md:text-sm font-archivo  font-medium border-b transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#F7931D] text-[#F7931D]'
                      : 'border-transparent text-[#667085] hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-4">
            {activeTab === 'log-summary' && <LogSummaryModal isOpen={true} onClose={onClose}/>}
            {activeTab === 'advanced-details' && <AdvancedDetailsModal isOpen={true} onClose={onClose} />}
            {activeTab === 'more-log-details' && <MoreLogDetailsModal  isOpen={true} onClose={onClose}/>}
          </div>

      
        </div>
      </div>
    </div>
  );
};

export default EditDiveStatisticsModal;
