import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import DiveWatch from '@/app/icons/(dashboard)/DiveWatch';
import EditDiveStatisticsModal from './edit/EditDiveStatisticsModal';
import EditBuuddyGear from './edit/EditBuuddyGear';
import EnvironmentalCondition from './edit/EnvironmentalCondition';
import DiveComputer from './edit/DiveComputer';
import AddDiveNotes from './edit/AddDiveNotes';
import DivePhotoUploader from './edit/DivePhotoUploader';
import { singleDiveProp } from '../../api/div-logs/fetchSingleDivLog';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { diveLogSidebarTranslations } from '@/app/(main)/translation/diveLogTranslation';
import { useLanguage } from '@/hooks/useLanguage';


interface prop{
   data: singleDiveProp | undefined;
   user: User | null
}
const SingleDiveLogSidebar:React.FC<prop> = ({data,user}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [logSummaryModalOpen, setLogSummaryModalOpen] = useState(false);
const [showBuddyGearModalOpen, setShowBuddyGearModalOpen] = useState(false)
const [showEnvironmentalModalOpen, setShowEnvironmentalModalOpen] = useState(false)
const [showdiveComputer, setShowdiveComputer] = useState(false)
const [showNoteModal, setShowNoteModal] = useState(false)
const [showDiveUploaderModal, setShowDiveUploaderModal] = useState(false)

    const {language}= useLanguage()
    const t = diveLogSidebarTranslations[language] || diveLogSidebarTranslations?.en;
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { 
      title: t?.menu?.editStats, 
      icon: ChevronRight, 
      onClick: () => setLogSummaryModalOpen(true) 
    },
   
    { 
      title: t?.menu?.addPhotos, 
      icon: ChevronRight ,
      onClick: () => setShowDiveUploaderModal(true) 
    },
   
    { 
      title: t?.menu?.logGear, 
      icon: ChevronRight,
      onClick:()=>setShowBuddyGearModalOpen(true)
    },
    { 
      title: t?.menu?.addNotes, 
      icon: ChevronRight ,
      onClick: () => setShowNoteModal(true) 

    },
    { 
      title: t?.menu?.environment, 
      icon: ChevronRight ,
      onClick:()=>setShowEnvironmentalModalOpen(true)
    }
  ];

  return (
   <div className="xl:max-w-md w-full mx-auto h-full  overflow-x-hidden ">
      {/* Watch Display */}
      <div className="relative bg-white dark:bg-gray-800 p-4 2xl:p-8 flex justify-center" onClick={()=>setShowdiveComputer(true)}>
        <div className="relative">
          {/* Watch Body */}
           <DiveWatch className='dark:bg-transparent'/>
         
        </div>
      </div>
      
      {/* Connection Status */}
      <div className="px-6 py-4 flex justify-center items-center">
        <div className="bg-[#ECFDF3] dark:bg-green-900/20 rounded-full px-4 py-2 flex items-center gap-2 w-fit">
          <div className="w-2 h-2 bg-[#027A48] dark:bg-green-400 rounded-full"></div>
          <span className="text-[#027A48] dark:text-green-400 font-archivo text-sm font-semibold">{t?.deviceConnected}</span>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="2xl:px-6 px-3 gap-4 pb-8">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg mb-3 border border-gray-200 dark:border-gray-700">
            <button 
              className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={item.onClick}
            >
              <span className="text-[#101828] dark:text-white font-archivo text-xs font-semibold">{item.title}</span>
              <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Modals */}
    {logSummaryModalOpen&&  <EditDiveStatisticsModal
        isOpen={logSummaryModalOpen}
        onClose={() => setLogSummaryModalOpen(false)}
        data={data}
        user={user}
       
      />}
    {showBuddyGearModalOpen &&  <EditBuuddyGear
        isOpen={showBuddyGearModalOpen}
        onClose={() => setShowBuddyGearModalOpen(false)}
        initialData={data}
            user={user}
       
      />}
    
    {showEnvironmentalModalOpen &&  <EnvironmentalCondition
        isOpen={showEnvironmentalModalOpen}
        onClose={() => setShowEnvironmentalModalOpen(false)}
         initialData={data}
         user={user}
       
      />}
    {showdiveComputer &&  <DiveComputer
        isOpen={showdiveComputer}
        onClose={() => setShowdiveComputer(false)}
       
      />}
    
    {showNoteModal &&  <AddDiveNotes
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
         data={data}
          user={user}
       
      />}
    {showDiveUploaderModal &&  <DivePhotoUploader
        isOpen={showDiveUploaderModal}
        onClose={() => setShowDiveUploaderModal(false)}
         data={data}
           user={user}
       
      />}
    </div>


 
  );
};

export default SingleDiveLogSidebar;
