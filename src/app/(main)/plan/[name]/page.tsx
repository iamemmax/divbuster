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
       <section className="bg-main w-full sm:!mb-0 text-white shadow-sm  h-full ">
            <section className=" px-6 md:px-[3rem] 2xl:px-[7.5rem] p-[4.375rem] pb-6 flex-col flex-wrap xl:flex-row flex ">
              <div className="flex flex-1 flex-col  gap-4  md:gap-6  max-md:py-10">
                <div className="flex items-center flex-wrap gap-5">
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
    <LinkButton 
    className="flex items-center  text-lg w-max font-semibold gap-1.5 px-8 py-1.5 md:py-3 mb-2.5 rounded-full bg-[#f9ab21]/60" href={"https://wa.link/vrg8zn"} target="_blank" title="Talk to Sales">Talk to Sales</LinkButton>
                </div>
                <h2
                  className={cn(
                    "font-display",
                    "flex flex-col font-semibold max-xxscren:text-[1.2rem] text-[1.4rem] sm:text-[2.5rem] md:text-[3rem] xl:text-[3.375rem] 2xl:text-[3.4rem] 3xl:text-[4.5rem] gap-2"
                  )}
                >
                  <p className="flex items-center flex-wrap leading-none gap-1">
                    Standard Health
                    <p className="text-[#AFD85B] pl-1"> Insurance</p>
                  </p>
                  <span className=" mt-0 leading-snug">
                    for you and your family.
                  </span>
                </h2>
                <p className="max-w-[40.75rem] font-sans text-[0.725rem] md:text-xl text-helper">
      Get a comprehensive health cover and stand a chance to benefit from
      a lifetime reward of
      <span className="ml-2 text-white inline-block relative">
        ₦500,000
        <UnderLine className="absolute top-3 md:top-5 left-0 w-full" />
      </span>
    </p>
    
                  
    
                <div className="flex items-center   gap-2 md:gap-4 ">
    
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
            src="/images/landing-page/libertyLife.png"
            className="z-10" // Keep image on top of the spinning border
          />
        </div>
                {/* </DoctorRoundedIcon> */}
              </section>
            </section>
            <section className="px-4 md:px-[3rem] 2xl:px-[7.5rem] ">
            <div className="bg-[#10152e] rounded-[1.25rem]  w-full md:p-6 grid-cols-1 md:grid-cols-2 grid gap-4  mb-20 md:mb-0">
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
          <LinkButton href={"/about-us"} className="bg-transparent cursor-pointer pb-0  mt-1">{card?.button_name}<LearnMore/></LinkButton>
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
