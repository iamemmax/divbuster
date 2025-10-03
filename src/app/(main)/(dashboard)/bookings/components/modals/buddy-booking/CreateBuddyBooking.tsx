"use client"
import React, { useState } from 'react'
import { Dialog, DialogBody, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/core";
import DiveBuddyInfo, { diveLogTypes } from './DiveBuddyInfo';
import CloseIcon from '@/app/icons/CloseIcon';
import CreateDivePlanBuddyBooking, { addBuddyMember } from './CreateDivePlanBuddyBooking';
import CreateDrivePlanGear, { createGearLogDetailsFormValues } from './CreateDrivePlanGear';
import { Language } from '@/app/(auth)/sign-up/translations';
import { divePlanBuddiesTranslations } from '@/app/(main)/translation/diveLogTranslation';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { useLanguage } from '@/hooks/useLanguage';


interface Props {
  isOpen: boolean;
  setIsOpenCardModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null
  selectedBuddies:string
}
const CreateBuddyBooking = ({isOpen,setIsOpenCardModal,user,selectedBuddies}:Props) => {
        const [step, setStep] = useState(1)
        const {language}= useLanguage()
            const t = divePlanBuddiesTranslations[language] || divePlanBuddiesTranslations?.en;
        const [stepOneLogDetails, setStepOneLogDetails] = useState<diveLogTypes>({dive_site_id:"",end_date:"",name:"",start_date:"",meet_up_address:""})
        const [buddyMembers, setBuddyMembers] = useState<addBuddyMember>({ buddies: "", email: [] })
        const [planGearData, setPlanGearData] = useState<createGearLogDetailsFormValues>({bcd:"",fin:"",gas_mixture:"",mask:"",regulator:"",weight:"",wetsuit:""})
    
         const renderSteps = (step: number) => {
        switch (step) {
            case 1:
                return <DiveBuddyInfo setStep={setStep} stepOneLogDetails={stepOneLogDetails}  setStepOneLogDetails={setStepOneLogDetails} user={user}/>
            case 2:
                return <CreateDrivePlanGear setStep={setStep}  setPlanGearData={setPlanGearData} user={user} />
         case 3: 

                return <CreateDivePlanBuddyBooking onClose={()=>setIsOpenCardModal(false)} setStep={setStep}  user={user} setBuddyMembers={setBuddyMembers} selectedBuddies={selectedBuddies} stepOneLogDetails={stepOneLogDetails} buddyMembers={buddyMembers} planGearData={planGearData}/>
                       default:
                return <DiveBuddyInfo setStep={setStep} stepOneLogDetails={stepOneLogDetails}  setStepOneLogDetails={setStepOneLogDetails}  user={user}  />
        }
    }
  return (
    <Dialog open={isOpen}>
      <DialogContent className="!max-w-[917px] !z-[9999999999999999999999999] !max-h-[95vh] bg-white dark:bg-gray-900">
        <DialogBody className="w-full max-md:px-2 p-0 outline-none text-gray-900 dark:text-white">
               <DialogHeader className="border-b flex items-center justify-between border-gray-200 dark:border-gray-700 pb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {t.DivePlan}
                </DialogTitle>
                <DialogClose className="bg-transparent p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={()=>setIsOpenCardModal(false)}>
                    <CloseIcon className="dark:text-white text-black" />
                </DialogClose>
            </DialogHeader>
              <div className="p-1 md:p-6">
                    {renderSteps(step)}
                </div>
             </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBuddyBooking