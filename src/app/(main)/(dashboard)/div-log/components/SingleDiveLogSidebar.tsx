import React, { useState, useEffect } from 'react';
import { ChevronRight, Wifi } from 'lucide-react';
import DiveWatch from '@/app/icons/(dashboard)/DiveWatch';
import EditDiveStatisticsModal from './edit/EditDiveStatisticsModal';
import EditBuuddyGear from './edit/EditBuuddyGear';
import AddAirUsage from './edit/AddAirUsage';
import EnvironmentalCondition from './edit/EnvironmentalCondition';
import DiveComputer from './edit/DiveComputer';
import AddDiveBuddyToLogModal from './edit/AddDivBuddyToLog';
import AddDiveNotes from './edit/AddDiveNotes';


const SingleDiveLogSidebar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [logSummaryModalOpen, setLogSummaryModalOpen] = useState(false);
const [showBuddyGearModalOpen, setShowBuddyGearModalOpen] = useState(false)
const [showAirUsageModalOpen, setShowAirUsageModalOpen] = useState(false)
const [showEnvironmentalModalOpen, setShowEnvironmentalModalOpen] = useState(false)
const [showdiveComputer, setShowdiveComputer] = useState(false)
const [showAddDiveToLog, setShowAddDiveToLog] = useState(false)
const [showNoteModal, setShowNoteModal] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);



 

  const menuItems = [
    { 
      title: "Edit Dive Statistics", 
      icon: ChevronRight, 
      onClick: () => setLogSummaryModalOpen(true) 
    },
    { 
      title: "Add Dive Buddy", 
      icon: ChevronRight ,
      onClick: () => setShowAddDiveToLog(true) 
    },
    { 
      title: "Add Photos/Videos", 
      icon: ChevronRight 
    },
    { 
      title: "Add Air Usage", 
      icon: ChevronRight ,
      onClick:()=>setShowAirUsageModalOpen(true)
    },
    { 
      title: "Log your Gear", 
      icon: ChevronRight,
      onClick:()=>setShowBuddyGearModalOpen(true)
    },
    { 
      title: "Add Notes", 
      icon: ChevronRight ,
      onClick: () => setShowNoteModal(true) 

    },
    { 
      title: "Environmental Conditions", 
      icon: ChevronRight ,
      onClick:()=>setShowEnvironmentalModalOpen(true)
    }
  ];

  return (
    <div className="max-w-md mx-auto ">
      {/* Watch Display */}
      <div className="relative bg-white p-8 flex justify-center" onClick={()=>setShowdiveComputer(true)}>
        <div className="relative">
          {/* Watch Body */}
           <DiveWatch/>
         
        </div>
      </div>
      
      {/* Connection Status */}
      <div className="px-6 py-4 flex justify-center items-center">
        <div className="bg-[#ECFDF3] rounded-full px-4 py-2 flex items-center gap-2 w-fit">
          <div className="w-2 h-2 bg-[#027A48] rounded-full"></div>
          <span className="text-[#027A48] font-archivo text-sm font-semibold">Device Connected</span>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="px-6 gap-4 pb-8">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg mb-3 border">
            <button 
              className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              onClick={item.onClick}
            >
              <span className="text-[#101828] font-archivo text-xs font-semibold">{item.title}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Modals */}
    {logSummaryModalOpen&&  <EditDiveStatisticsModal
        isOpen={logSummaryModalOpen}
        onClose={() => setLogSummaryModalOpen(false)}
       
      />}
    {showBuddyGearModalOpen &&  <EditBuuddyGear
        isOpen={showBuddyGearModalOpen}
        onClose={() => setShowBuddyGearModalOpen(false)}
       
      />}
    {showAirUsageModalOpen &&  <AddAirUsage
        isOpen={showAirUsageModalOpen}
        onClose={() => setShowAirUsageModalOpen(false)}
       
      />}
    {showEnvironmentalModalOpen &&  <EnvironmentalCondition
        isOpen={showEnvironmentalModalOpen}
        onClose={() => setShowEnvironmentalModalOpen(false)}
       
      />}
    {showdiveComputer &&  <DiveComputer
        isOpen={showdiveComputer}
        onClose={() => setShowdiveComputer(false)}
       
      />}
    {showAddDiveToLog &&  <AddDiveBuddyToLogModal
        isOpen={showAddDiveToLog}
        onClose={() => setShowAddDiveToLog(false)}
       
      />}
    {showNoteModal &&  <AddDiveNotes
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
       
      />}
    </div>


 
  );
};

export default SingleDiveLogSidebar;
