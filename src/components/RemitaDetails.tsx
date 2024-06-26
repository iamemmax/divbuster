
"use client"

import { CheckStar } from "@/app/(main)/misc/icons";
import { cn } from "@/utils/classNames";
import { useState } from "react";
import { Button, ClientOnly, Dialog, DialogBody, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, LinkButton } from "./core";
import { HospitalImage } from "@/app/(main)/misc/components";
import { RightUpArrow } from "@/icons/core";
import DisplayedRemitaDetails from "./DisplayedRemitaDetails";
import Home from "@/app/(main)/page";


export default function RemitaDetails(){


    const [openRemitaDetails, setOpenRemitaDetails] = useState(false);




return(

  <>
  <Home/>

<ClientOnly>

<Dialog open ={openRemitaDetails} onOpenChange = {setOpenRemitaDetails}>



  {/* <DialogTrigger className="bg-white text-black flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-7 rounded-full max-w-max font-display">

  Continue
  <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
    <RightUpArrow className="" width={12} height={12} />
  </span>
  </DialogTrigger> */}

  <DialogContent>

<DialogHeader className="bg-[#1B1687] ">

  <DialogTitle className="text-[#fff]">
    Remita Details
  </DialogTitle>

 <DialogClose>Close</DialogClose>

</DialogHeader>

<DialogBody className="bg-[#34307A] w-full ">

  <div className="py-1">

  <div className="text-[#fff] font-light">
          Kindly confirm  your remita details and dial the USSD code for OTP Verification
        </div>

        <div className="my-5">

        <DisplayedRemitaDetails 
        name={undefined} 
        Ministry={undefined} 
        State={undefined}                  
        
        />
       

        </div>

        <div className="mt-2 bg-green-600 text-[#fff]">

          <p>Kindly dial *123*304# on your phone number to get an OTP</p>

        </div>




  </div>

</DialogBody>


  </DialogContent>


</Dialog>
</ClientOnly>
  </>



)

}