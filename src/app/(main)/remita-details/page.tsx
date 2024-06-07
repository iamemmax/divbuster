"use client"

import { useBooleanStateControl } from "@/hooks";
import RemitaDetailsModal from "../misc/components/modals/RemitaDetailsModal";
 import Home from "../page";
import Link from "next/link";





export default function RemitaDetails(){

  const {
    state: isSuccessDetailRequestModalOpen,
    setState: setSuccessDetailRequestModalState,
    setTrue: openSuccessModal,
  } = useBooleanStateControl();


return(

<div className="w-full h-full">


<Home/>


<RemitaDetailsModal
              
              
      subheading="Kindly confirm your remita details and dial the USSD code for OTP verification"
      heading="Remita Details"
      description="Kindly dial *123*304# on your phone to get an OTP."
      subdescription="Kindly enter the OTP code has sent to your number 0814****754."
      isRemitaDetailsModalOpen={true}
      setRemitaDetailsModal={setSuccessDetailRequestModalState} 
      otp={0}
       >

          <Link 
             href="/user-details"
             >
         
        <button 
        className=" mt-10 font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
    >
          Continue
        </button>
      
           </Link>



              
              
    </RemitaDetailsModal>



</div>


)







}