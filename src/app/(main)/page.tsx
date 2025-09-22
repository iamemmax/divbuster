// "use client"
// import React, { useState } from 'react'
// import Header from './components/shared/Header'
// import { useAuth } from '@/contexts/authentication'
// import { DebouncedSearchInput } from '@/components/core/DebouncedSearchInput';
// import { ActionDropdown } from '@/components/core/ActionDropdown';
// import MonthlySnapShot from './components/dashboard/MonthlySnapShot'
// import SuggestedDIverTabs from './components/dashboard/SuggestedDIverTabs'
// import AddNewDiveLog from './(dashboard)/div-log/components/AddNewDiveLog'
// import AddCertification from './components/certifications/AddCertification'
// import { certificateResult } from './(dashboard)/certifications/fetchCertifications'
// import CreateSchoolPlan from './(dashboard)/bookings/components/modals/school-booking/CreateSchoolPlan'
// import CreateBuddyBooking from './(dashboard)/bookings/components/modals/buddy-booking/CreateBuddyBooking'
// // import { ChevronRightIcon } from '@heroicons/react/24/'

// const Page = () => {
//   const { authState } = useAuth();
//   const { user} = authState;
//   const [showDiveLogModal, setShowDivelogModal] = useState(false)
//   const [showCertificationModal, setShowCertificationModal] = useState(false)
//       const [showScholBookingModal, setShowSchoolBookingModal] = useState(false)
//       const [showBookWithBuddy, setShowBookWithBuddy] = useState(false)
//       const language = user?.profile_details?.language

//   return (
//     <div className='text-black dark:text-white'>
//       <Header 
//         title={`Welcome, ${user?.first_name}`}
//         subtitle='June 12, 2024' 
//       />
      
//       {/* Dashboard content */}
//       <div className="mt-[3.125rem] px-6 lg:px-[1.875rem] h-[83vh] overflow-y-auto">
//         {/* Search and action bar */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//           <div className="relative w-full md:w-96">
//             <DebouncedSearchInput 
//               placeholder="Search for buddies, dive sites, dive plans" 
//               onSearch={(value) => value}
//               debounceTime={30}
//             />
//           </div>
          
//           <div className="relative w-full md:w-auto">
//             <ActionDropdown 
//               items={[
//                 { label: "Add new Dive Log",  active: true , onClick:() =>setShowDivelogModal(true)
//                 },
//                 { label: "Create a Dive Plan", onClick:()=>setShowBookWithBuddy(true) },
//                 { label: "Add a new Buddy",onClick:()=>setShowSchoolBookingModal(true) },
//                 // { label: "Add new Dive Spot" },
//                 { label: "Add Certification", onClick:()=>setShowCertificationModal(true)},
//               ]}
              
              
            
//             />
//           </div>
//         </div>
        
//         {/* Monthly Snapshot section */}
//         <div className="">

//         <MonthlySnapShot/>
//         <div className="">
//           <SuggestedDIverTabs />
//         </div>
//         {/* <div className="">
//           <DivingTab/>
//         </div> */}
//         </div>
    
//       </div>


//       {
//         showDiveLogModal && <AddNewDiveLog isOpen={showDiveLogModal} onClose={()=>setShowDivelogModal(false)}/>
//       }
//       {
//         showCertificationModal && <AddCertification  certificateData={{} as certificateResult} type="add" isOpen={showCertificationModal} setIsOpenCardModal={()=>setShowCertificationModal(false)}/>
//       }
//        {showScholBookingModal&& <CreateSchoolPlan isOpen={showScholBookingModal} setIsOpenCardModal={setShowSchoolBookingModal}/>}
//           {showBookWithBuddy && <CreateBuddyBooking isOpen={showBookWithBuddy} setIsOpenCardModal={setShowBookWithBuddy}/>}
      
//     </div>
//   )
// }

// export default Page


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
import { Dashbaordtranslations } from './translation/dashboardTranslation';


type Language = "en" | "es" | "fr" | "nl";

const Page = () => {
  const { authState } = useAuth();
  const { user } = authState;
  const [showDiveLogModal, setShowDivelogModal] = useState(false)
  const [showCertificationModal, setShowCertificationModal] = useState(false)
  const [showScholBookingModal, setShowSchoolBookingModal] = useState(false)
  const [showBookWithBuddy, setShowBookWithBuddy] = useState(false)

  const language: Language = (user?.profile_details?.language as Language) 
  const t = Dashbaordtranslations[language] || Dashbaordtranslations.en;

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
                { label: t.addDiveLog,  active: true, onClick:() => setShowDivelogModal(true) },
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
      {showCertificationModal && <AddCertification certificateData={{} as certificateResult} type="add" isOpen={showCertificationModal} setIsOpenCardModal={()=>setShowCertificationModal(false)}/>}
      {showScholBookingModal && <CreateSchoolPlan isOpen={showScholBookingModal} setIsOpenCardModal={setShowSchoolBookingModal}/>}
      {showBookWithBuddy && <CreateBuddyBooking isOpen={showBookWithBuddy} setIsOpenCardModal={setShowBookWithBuddy}/>}
    </div>
  )
}

export default Page
