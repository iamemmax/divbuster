"use client"

import Home from "@/app/(main)/page";
import { Button, ClientOnly, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/core";
import { Input2 } from "@/components/core/Input2";
 
import { useBooleanStateControl } from "@/hooks";
import { RightUpArrow } from "@/icons/core";
import { useState } from "react";
import DisplayedRemitaDetails from "../DisplayedRemitaDetails";
import OTPInput from "../OtpInput";
import { useRouter } from "next/navigation";




interface UseBooleanStateControlProps {
    isRemitaDetailsModalOpen: boolean;
    setRemitaDetailsModal: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    setThirdModal: React.Dispatch<React.SetStateAction<boolean>>;
    heading: string;
    subheading: string;
    description: string;
    subdescription: string;
    otp: number;
    closeButtonReplacement?: React.ReactNode;
    children?: React.ReactNode;


}


 function RemitaDetailsModal({

    isRemitaDetailsModalOpen,
    setRemitaDetailsModal,
    setThirdModal,
    heading,
    subheading,
    description,
    subdescription,
    otp,
    children,
}: UseBooleanStateControlProps) {


  
  const router = useRouter();



  const handleClose =() =>{

      setRemitaDetailsModal(false);

      router.back();

  }
  
 

    return (

        <div className="rounded-xl">



<ClientOnly>

<Dialog open ={isRemitaDetailsModalOpen} 
onOpenChange = {setRemitaDetailsModal}>

  <DialogContent className="!overflow-hidden">

    

<DialogHeader className="bg-[#1B1687] ">

  <DialogTitle className="text-[#fff]">
    {heading}
  </DialogTitle>

<DialogClose className="rounded-full">
  <button onClick={handleClose}>close</button>
</DialogClose>


</DialogHeader>

<DialogBody className="bg-[#141B3f] w-full">

  <div className="py-1">

  <div className="text-[#fff] font-light text-sm 'font-DMSans'">
          {subheading}
        </div>

        <div className="my-5">

        <DisplayedRemitaDetails
        name={undefined} 
        Ministry={undefined} 
        State={undefined}                  
        
        />
       

        </div>

        <div className="mt-2 bg-[#2B3151] text-[#fff]  rounded-lg">

          <p className="text-sm  pl-[1rem] py-[0.6rem] 'font-DMSans'">{description}</p>

        </div>

       

<div className="mt-[2rem]  text-[#fff] w-full 'font-DMSans' " >

<p className="w-full text-xs font-medium">{subdescription}</p>

</div>



<div className="mt-2">

<OTPInput

/>

</div>


{/* <div className="mt-6 md:mt-12">

{children}

</div> */}


<button 
        className=" mt-10 font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"

        onClick={() => {
setThirdModal(true)
setRemitaDetailsModal(false)


        }}
    >
          Continue
        </button>



  </div>

</DialogBody>


  </DialogContent>


</Dialog>
</ClientOnly>


        </div>





    )


}

export default RemitaDetailsModal









