


"use client"
import React, { useState } from 'react'
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

const Page = () => {
  const { authState } = useAuth();
  const { user } = authState;
  const [showDiveLogModal, setShowDivelogModal] = useState(false)
  const [showCertificationModal, setShowCertificationModal] = useState(false)
  const [showScholBookingModal, setShowSchoolBookingModal] = useState(false)
  const [showBookWithBuddy, setShowBookWithBuddy] = useState(false)

  const {language}= useLanguage()
  const t = DashboardTranslations[language] || DashboardTranslations.en;

  return (
    <div className='text-black dark:text-white'>
     
       <Header 
        title={`Welcome, ${user?.first_name}`}
        subtitle='June 12, 2024' 
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
            <ActionDropdown 
              items={[
                { label: t.createDiveLog,  onClick:() => setShowDivelogModal(true) },
                { label: t.createDivePlan, onClick:()=>setShowBookWithBuddy(true) },
                { label: t.addBuddy, onClick:()=>setShowSchoolBookingModal(true) },
                { label: t.addCertification, onClick:()=>setShowCertificationModal(true)},
              ]}
            />
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

      {showDiveLogModal && <AddNewDiveLog isOpen={showDiveLogModal} onClose={()=>setShowDivelogModal(false)}/>}
      {showScholBookingModal && <CreateSchoolPlan isOpen={showScholBookingModal} setIsOpenCardModal={setShowSchoolBookingModal}/>}
      {showBookWithBuddy && <CreateBuddyBooking isOpen={showBookWithBuddy} setIsOpenCardModal={setShowBookWithBuddy} user={user} selectedBuddies=''/>}
      {showCertificationModal && <AddCertificateTypeComp certificateData={{} as certificateResult} type="add" isOpen={showCertificationModal} setIsOpenCardModal={()=>setShowCertificationModal(false)}/>}
    </div>
  )
}

export default Page
