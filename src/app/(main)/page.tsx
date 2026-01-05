
"use client"
import React, { useState, useMemo, useCallback } from 'react'
import Header from './components/shared/Header'
import { useAuth } from '@/contexts/authentication'
import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput';
import { ActionDropdown } from '@/components/core/ActionDropdown';
import MonthlySnapShot from './components/dashboard/MonthlySnapShot'
import SuggestedDIverTabs from './components/dashboard/SuggestedDIverTabs'
import AddNewDiveLog from './(dashboard)/div-log/components/AddNewDiveLog'
import AddCertification from './components/certifications/AddCertification'
import { certificateResult } from './(dashboard)/certifications/fetchCertifications'
import CreateSchoolPlan from './(dashboard)/bookings/components/modals/school-booking/CreateSchoolPlan'
import CreateBuddyBooking from './(dashboard)/bookings/components/modals/buddy-booking/CreateBuddyBooking'
import { DashboardTranslations } from './translation/dashboardTranslation';
import { useLanguage } from '@/hooks/useLanguage';
import AddCertificateTypeComp from './components/certifications/AddCertificateTypeComp';

import formatDate from '@/utils/dateFormat';

const Page = React.memo(() => {
  const { authState } = useAuth();
  const { user } = authState;
  
  const [modalStates, setModalStates] = useState({
    diveLog: false,
    certification: false,
    schoolBooking: false,
    buddyBooking: false
  });

  const {language}= useLanguage()
  const t = DashboardTranslations[language] || DashboardTranslations.en;

  const toggleModal = useCallback((modalName: keyof typeof modalStates) => {
    setModalStates(prev => ({ ...prev, [modalName]: !prev[modalName] }));
  }, []);

  const actionItems = useMemo(() => [
    { label: t.createDiveLog, onClick: () => toggleModal('diveLog') },
    { label: t.createDivePlan, onClick: () => toggleModal('schoolBooking') },
    { label: t.addBuddy, onClick: () => toggleModal('buddyBooking') },
    { label: t.addCertification, onClick: () => toggleModal('certification') },
  ], [t, toggleModal]);

  return (
    <div className='text-black dark:text-white'>
     
       <Header 
        title={`Welcome, ${user?.first_name}`}
        subtitle={formatDate.long(new Date())} 
      />
  
      
      {/* Dashboard content */}
      <div className=" px-3 lg:px-[1.875rem] mt-2 h-[85vh] overflow-y-auto">
        {/* Search and action bar */}
        <div className="flex flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <DebouncedSearchInput 
              placeholder={t.searchPlaceholder} 
              onSearch={(value) => value}
              debounceTime={30}
            />
          </div>
          
          <div className="relative w-[230px] md:w-auto">
            <ActionDropdown items={actionItems} />
          </div>
        </div>
        
        {/* Monthly Snapshot section */}
        <div className="">
          <MonthlySnapShot user={user}/>
          <div className="">
            <SuggestedDIverTabs user={user} />
          </div>
        </div>
      </div>

      {modalStates.diveLog && <AddNewDiveLog isOpen={modalStates.diveLog} onClose={() => toggleModal('diveLog')}/>}
      {modalStates.schoolBooking && <CreateSchoolPlan isOpen={modalStates.schoolBooking} setIsOpenCardModal={() => toggleModal('schoolBooking')}/>}
      {modalStates.buddyBooking && <CreateBuddyBooking isOpen={modalStates.buddyBooking} setIsOpenCardModal={() => toggleModal('buddyBooking')} user={user} selectedBuddies='' title={t.addBuddy}/>}
      {modalStates.certification && <AddCertificateTypeComp certificateData={{} as certificateResult} type="add" isOpen={modalStates.certification} setIsOpenCardModal={() => toggleModal('certification')}/>}
    </div>
  )
})

export default Page