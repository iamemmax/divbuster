
"use client"
import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react'
import Header from './components/shared/Header'
import { useAuth } from '@/contexts/authentication'
// import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput';
import { ActionDropdown } from '@/components/core/ActionDropdown';
import MonthlySnapShot from './components/dashboard/MonthlySnapShot'
import SuggestedDIverTabs from './components/dashboard/SuggestedDIverTabs'
import { certificateResult } from './(dashboard)/api/certifications/fetchCertifications'
import { DashboardTranslations } from './translation/dashboardTranslation';
import { useLanguage } from '@/hooks/useLanguage';
import formatDate from '@/utils/dateFormat';
// import CreateBuddyBooking from './(dashboard)/bookings/components/modals/buddy-booking/CreateBuddyBooking';

// Lazy load heavy modal components
const AddNewDiveLog = lazy(() => import('./(dashboard)/div-log/components/AddNewDiveLog'));
const CreateDivePlan = lazy(() => import('./(dashboard)/bookings/components/modals/buddy-booking/CreateBuddyBooking'));
const CreateBuddyBooking = lazy(() => import('./(dashboard)/bookings/components/modals/buddy-booking/CreateBuddyBooking'));
const AddCertificateTypeComp = lazy(() => import('./components/certifications/AddCertificateTypeComp'));

const MemoizedMonthlySnapShot = React.memo(MonthlySnapShot);
const MemoizedSuggestedDIverTabs = React.memo(SuggestedDIverTabs);

const DashboardComponent = () => {
  const { authState } = useAuth();
  const { user } = authState;

  const [modalStates, setModalStates] = useState({
    diveLog: false,
    certification: false,
    schoolBooking: false,
    buddyBooking: false
  });

  const currentDate = useMemo(() => formatDate.long(new Date()), []);

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
  ], [t]);

  return (
    <div className='text-black dark:text-white'>

       <Header
        title={`Welcome, ${user?.first_name}`}
        subtitle={currentDate}
      />


      {/* Dashboard content */}
      <div className=" px-3 lg:px-[1.875rem] mt-5 h-[85vh] overflow-y-auto">
        {/* Search and action bar */}
        <div className="flex flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">

          </div>

          <div className="relative w-[230px] md:w-auto">
            <ActionDropdown items={actionItems} />
          </div>
        </div>

        {/* Monthly Snapshot section */}
        <div className="">
          <MemoizedMonthlySnapShot user={user}/>
          <div className="">
            <MemoizedSuggestedDIverTabs user={user} />
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {modalStates.diveLog && <AddNewDiveLog isOpen={modalStates.diveLog} onClose={() => toggleModal('diveLog')}/>}
        {modalStates.schoolBooking && <CreateDivePlan selectedBuddies='' user={user} isOpen={modalStates.schoolBooking} setIsOpenCardModal={() => toggleModal('schoolBooking')}/>}
        {modalStates.buddyBooking && <CreateBuddyBooking isOpen={modalStates.buddyBooking} setIsOpenCardModal={() => toggleModal('buddyBooking')} user={user} selectedBuddies='' title={t.addBuddy}/>}
        {modalStates.certification && <AddCertificateTypeComp certificateData={{} as certificateResult} type="add" isOpen={modalStates.certification} setIsOpenCardModal={() => toggleModal('certification')}/>}
      </Suspense>
    </div>
  )
}

const Dashbaord = React.memo(DashboardComponent)
Dashbaord.displayName = 'Dashbaord'

export default Dashbaord