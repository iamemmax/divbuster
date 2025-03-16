"use client";

import { cn } from "@/utils/classNames";
import { RightUpArrow } from "@/icons/core";
import { Button, LinkButton } from "@/components/core";

// import {
//   CheckStar,
//   CrossIcon,
//   GroupIcon,
//   LearnMore,
//   UnderLine,
// } from "./misc/icons";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { CheckStar, HandIcon, LearnMore, UnderLine } from "../../misc/icons";
import Marquee from "../../misc/components/Marquee";
import CheckPhoneNumber from "../../misc/components/insurance/modals/CheckPhoneNumber";
import RemitalModalDetails from "../../misc/components/insurance/modals/remital/RemitalModalDetails";
import RemitalUserDetails from "../../misc/components/insurance/modals/remital/RemitalUserDetails";
import CreatepasswordModal from "../../misc/components/insurance/modals/remital/CreatePassWordModal";
import RemitalPlanModal from "../../misc/components/insurance/modals/remital/RemitalPlanModal";
import NonRemitalModal from "../../misc/components/insurance/modals/non-remital/NonRemitalModal";
import AprokoPlanModal from "../components/AprokoPlan";
import { tokenStorage } from "@/app/(auth)/(onboarding)/misc";
import AprokoPlan from "../components/AprokoPlan";
import HealthIcon from "../../misc/icons/HealthIcon";
import UserIcon from "../../misc/icons/UserIcon";
import GetInsuranceButton from "../../misc/components/GetIsuranceButton";
import Loading from "../../loading";

export default function ReferralHome() {
  
  const [showAprokoPlanModal, setshowAprokoPlanModal] = useState(false);
  const [loading, setLoading] = useState(true)


  const search = useSearchParams();
  const getStarted = search.get("select-plan");
  useEffect(() => {
    if (getStarted) {
      setshowAprokoPlanModal(true);
      tokenStorage.setReferral("aproko-doctor");
    }
  }, [getStarted]);

  
  


  const cardArray1 =[
    {
      icon:<HealthIcon/>,
      desc:"Over 1000+ Hospitals readily available based on your proximity."
    },
    {
      icon:<UserIcon/>,
      desc:"Premium health cover for both corporate and individuals users."
    },
  ]


  const cardArray2 =[
    {
      title:"Lifetime  Rewards",
      desc:"For every insurance plan you buy, you stand a chance to get a lifetime reward.",
      button_name:"Learn more",
    },
    {
      title:"Standard Hospitals",
      desc:"We give you a standard hospitals in your preferred local government.",
      button_name:"Learn more",
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4000);
  }, [])

  if(loading){
    return <Loading/>
  }

  return (
    <main className="w-full bg-main h-full">
      <section className="bg-main w-full !mb-0 text-white shadow-sm  ">
            <section className=" px-6 md:px-[3rem] 2xl:px-[7.5rem] p-[4.375rem] pb-6 flex-col flex-wrap xl:flex-row flex ">
                 <div className="flex flex-1 flex-col  gap-4  md:gap-6  max-md:py-10">
                   <h6
                     className={cn(
                       "font-display",
                       "flex items-center text-[.625rem] md:text-[0.825rem] w-max font-semibold gap-1.5 px-5 py-1.5 md:py-3 mb-2.5 rounded-full bg-[#34307A]/30"
                     )}
                   >
                     <span>
                       <CheckStar />
                     </span>
                     Welcome to Liberty Life
                     <span><HandIcon /></span>
                     NEM Health
                   </h6>
                   <h2
                     className={cn(
                       "font-display",
                       "flex flex-col font-semibold text-[2rem] sm:text-[2.5rem] md:text-[3rem] xl:text-[3.375rem] 2xl:text-[3.4rem] 3xl:text-[4.5rem] gap-2"
                     )}
                   >
                     <p className="flex items-center flex-wrap leading-none gap-1">
                       Standard Health
                       <p className="text-[#AFD85B]">Insurance</p>
                     </p>
                     <span className=" mt-0 leading-snug">
                       for you and your family.
                     </span>
                   </h2>
                   <p className="xl:max-w-[100%] font-sans text-[0.825rem] md:text-xl text-helper">
                     <span>
                       Get a comprehensive health cover and stand a chance to benefit from
                     </span>
                     <span className=" flex flex-wrap">  a lifetime reward of
                       <span className="flex flex-col ml-3 text-white">
                         ₦500,000
                         <UnderLine />
                       </span>
                     </span>
                   </p>
       
                     
       
                   <div className="flex items-center gap-4 flex-wrap">
       
                  <GetInsuranceButton/>
                   </div>
                 </div>
       
                 <section className="relative hidden xl:block px-5 md:px-0">
                  
                 <div className="relative flex items-center justify-center rounded-full h-[450px] w-[450px] p-2 overflow-hidden">
             {/* Spinning border */}
             <div className="absolute inset-0 bg-[url('/images/landing-page/image-circle.svg')] bg-cover bg-no-repeat  animate-spin-slow"/>

             {/* Static image */}
             <Image
               alt="Doctor"
               height={400}
               width={400}
               src="/images/landing-page/doctor2.png"
               className="z-10" // Keep image on top of the spinning border
             />
           </div>
                   {/* </DoctorRoundedIcon> */}
                 </section>
               </section>
        <section className="px-4 md:px-[3rem] 2xl:px-[7.5rem]">
        <div className="bg-[#10152e] rounded-[1.25rem] w-full md:p-6 grid-cols-1 md:grid-cols-2 grid gap-4">
<div className="bg-[#1E2954] relative p-6 py-[2rem]  rounded-[20px]">
  <div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-4">
{
  cardArray1?.map((card,id:number)=>(
    <div key={id} className="bg-[#161d42] py-11 px-[15px] rounded-lg flex justify-center items-center">
      <div className=" absolute top-3 h-[2.625rem] w-[2.625rem] bg-[#161d42] flex justify-center items-center rounded-full  border-[0.3px] border-[#4760FD] border-opacity-55">
        {card.icon}
      </div>
      <p className="text-sm text-white text-center">{card.desc}</p>
    </div>
  ))
}

  </div>
</div>

<div className="bg-[#1E2954] p-6 py-[2rem]  rounded-[20px]">
  <div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-4">
{
  cardArray2?.map((card,id:number)=>(
    <div key={id} className="bg-[#161d42] py-4 px-6 xl:px-[1.6rem] rounded-lg flex flex-col justify-center items-center">
      <h3 className="text-lg font-medium text-white">{card?.title}</h3>
      <p className="text-sm text-[#CAC9D4] text-center">{card.desc}</p>
      <Button className="bg-transparent cursor-pointer pb-0 z-[999999] mt-1">{card?.button_name}<LearnMore/></Button>
    </div>
  ))
}

  </div>
</div>
        </div>
        </section>
      </section>
     

      {/* Aproko */}

      {showAprokoPlanModal && (
        <AprokoPlan
        
        />
      )}
    </main>
  );
}
