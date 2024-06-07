"use client"

import { useBooleanStateControl } from "@/hooks";
import RemitaDetailsModal from "../misc/components/modals/RemitaDetailsModal";
 import Home from "../page";
import Link from "next/link";
import UserDetailsModal from "../misc/components/modals/UserDetailsModal";





export default function UserDetails(){

  const {
    state: isSuccessDetailRequestModalOpen,
    setState: setSuccessUserDetailsModalState,
    setTrue: openSuccessModal,
  } = useBooleanStateControl();



  const stateOptions = [
    {
        name: '1',
        value: "Lagos",

    },

    {
        name: '2',
        value: "Ekiti",


    },

    {
        name: '3',
        value: "Osun",

    },

    {
        name: '4',
        value: "Arizona",

    },

    {
        name: '5',
        value: "Oyo",

    },

    {
        name: '6',
        value: "Ogun",

    },

    {
        name: '7',
        value: "Abuja",


    }

];







return(

<div className="w-full h-full">


<Home/>


<UserDetailsModal
              
              
            subheading="Kindly enter the details below and select the hospitals around you."
            heading="User Details"
            isUserDetailsModalOpen={true}
            setUserDetailsModal={setSuccessUserDetailsModalState} 
            //@ts-ignore
           statedroplist= {stateOptions}
       >

        <Link 
             href="/individual-plan"
             >
         
        <button 
        className=" mt-10 font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
    >
          Continue
        </button>
      
           </Link>

         



              
              
    </UserDetailsModal>



</div>


)







}