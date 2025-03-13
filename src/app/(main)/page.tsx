"use client";

import { cn } from "@/utils/classNames";
import { RightUpArrow } from "@/icons/core";
import { Button } from "@/components/core";

import {
  CheckStar,
  HandIcon,
  LearnMore,
  Testimonial1,
  Testimonial2,
  Testimonial3,
  Testimonial4,
  UnderLine,
} from "./misc/icons";
// import {
//   CheckStar,
//   CrossIcon,
//   GroupIcon,
//   LearnMore,
//   UnderLine,
// } from "./misc/icons";
import Marquee from "./misc/components/Marquee";
import Image from "next/image";
import { useEffect, useState } from "react";

import CheckPhoneNumber from "./misc/components/insurance/modals/CheckPhoneNumber";

import NonRemitalModal from "./misc/components/insurance/modals/non-remital/NonRemitalModal";
import RemitalUserDetails from "./misc/components/insurance/modals/remital/RemitalUserDetails";
import RemitalPlanModal from "./misc/components/insurance/modals/remital/RemitalPlanModal";
import RemitalModalDetails from "./misc/components/insurance/modals/remital/RemitalModalDetails";
import CreatepasswordModal from "./misc/components/insurance/modals/remital/CreatePassWordModal";
import { useSearchParams } from "next/navigation";
import GenerateReferralModal, { ReferralsuccessProp } from "./misc/components/insurance/modals/referral/GenerateReferralModal";
import ReferralSuccessModal from "./misc/components/insurance/modals/referral/ReferralSuccessModal";
import DoctorRoundedIcon from "./misc/icons/DoctorRounded";
import HealthIcon from "./misc/icons/HealthIcon";
import UserIcon from "./misc/icons/UserIcon";

export default function Home() {
  const [openCheckPhoneNumberModal, setOpenCheckPhoneNumberModal] =
    useState(false);
  const [openRemitalDetailModal, setOpenRemitalDetailModal] = useState(false);
  const [phoneNumberCheckResponse, setPhoneNumberCheckResponse] = useState({
    id: "",
    address: "",
    full_name: "",
    ministry: "",
    state: "",
  });
  const [OpenRemitalUserDetail, setOpenRemitalUserDetail] = useState(false);
  const [userId, setUserId] = useState("");
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [openRemitalPlan, setOpenShowRemitalPlan] = useState(false);
  const [openNonRemitalDetailModal, setOpenNonRemitalDetailModal] =
    useState(false);

  const [showGenerateReferralModal, setShowGenerateReferralModal] = useState(false)
  const [showGenerateReferralSuccessModal, setShowGenerateReferralSuccessModal] = useState(false)
  const [referralResponse, setReferralResponse] = useState<ReferralsuccessProp>()
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [verifyResponse, setVerifyResponse] = useState({
    is_eligible: false,
    nin: "",
    bvn: "",
    address: "",
    email: "",
    id: "",
  });

  const search = useSearchParams();
  const getStarted = search.get("get-started");
  useEffect(() => {
    if (getStarted) {
      document.getElementById("get-insurance-button")?.click();
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


  return (
    <main className=" w-full bg-main ">
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

              <Button
                className={cn(
                  "flex items-center cursor-pointer justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-4 rounded-full max-w-max",
                  "font-display"
                )}
                id="get-insurance-button"
                variant="white"
                onClick={() => setOpenCheckPhoneNumberModal(true)}
              >
                Get insurance
                <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
                  <RightUpArrow className="" height={12} width={12} />
                </span>
              </Button>
              <Button
                className={cn(
                  "flex items-center px-4 cursor-pointer justify-between text-[0.865rem] border-opacity-30 border-white border-[0.3px] text-white  bg-transparent text-left py-1.5 pr-1.5 pl-4 mt-4 rounded-full max-w-max",
                  "font-display"
                )}
                id="get-insurance-button"
                variant="outlined"
                onClick={() => setShowGenerateReferralModal(true)}
              >
                Generate referral link
                <span className="flex items-center bg-white justify-center p-2 rounded-full ml-7">
                  <RightUpArrow className="" height={12} width={12} color="blue" />
                </span>
              </Button>
            </div>
          </div>

          <section className="relative hidden xl:block px-5 md:px-0">
           
          <div className="relative flex items-center justify-center rounded-full h-[450px] w-[450px] p-2 overflow-hidden">
      {/* Spinning border */}
      <div className="absolute inset-0 border-2 border-dashed border-white animate-spin-slow"></div>

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
      {/* <Marquee /> */}

      <div className="">

        {openCheckPhoneNumberModal && (
          <CheckPhoneNumber
            openCheckPhoneNumberModal={openCheckPhoneNumberModal}
            setPhoneNumberCheckResponse={setPhoneNumberCheckResponse}
            setOpenCheckPhoneNumberModal={setOpenCheckPhoneNumberModal}
            setOpenRemitalDetailModal={setOpenRemitalDetailModal}
            setOpenNonRemitalDetailModal={setOpenNonRemitalDetailModal}
            setVerifiedPhoneNumber={setVerifiedPhoneNumber}
            setUserId={setUserId}
            setOpenRemitalUserDetail={setOpenRemitalUserDetail}
            setVerifyResponse={setVerifyResponse}
            setUserEmail={setUserEmail}
            setShowPasswordModal={setShowPasswordModal}
          // setOpenNonRemitalDetailModal={setOpenNonRemitalDetailModal}
          />
        )}
        {/* remitals ............................................................ remita.................... */}
        {openRemitalDetailModal && (
          <RemitalModalDetails
            setOpenRemitalDetailModal={setOpenRemitalDetailModal}
            openRemitalDetailModal={openRemitalDetailModal}
            phoneNumberCheckResponse={phoneNumberCheckResponse}
            verifiedPhoneNumber={verifiedPhoneNumber}
            setOpenRemitalUserDetail={setOpenRemitalUserDetail}
            setUserEmail={setUserEmail}
          />
        )}
        {OpenRemitalUserDetail && (
          <RemitalUserDetails
            setOpenRemitalUserDetail={setOpenRemitalUserDetail}
            OpenRemitalUserDetail={OpenRemitalUserDetail}
            userId={userId}
            setOpenShowRemitalPlan={setOpenShowRemitalPlan}
            verifyResponse={verifyResponse}
            userEmail={userEmail}
            setShowPasswordModal={setShowPasswordModal}
          />
        )}

        {showPasswordModal && (
          <CreatepasswordModal
            userEmail={userEmail}
            setShowPasswordModal={setShowPasswordModal}
            showPasswordModal={showPasswordModal}
            setOpenShowRemitalPlan={setOpenShowRemitalPlan}
            verifiedPhoneNumber={verifiedPhoneNumber}
          />
        )}
        {openRemitalPlan && (
          <RemitalPlanModal
            openRemitalPlan={openRemitalPlan}
            setOpenShowRemitalPlan={setOpenShowRemitalPlan}
            userId={userId}
            verifyResponse={verifyResponse}
            verifiedPhoneNumber={verifiedPhoneNumber}
          />
        )}
        {openNonRemitalDetailModal && (
          <NonRemitalModal
            verifiedPhoneNumber={verifiedPhoneNumber}
            setPhoneNumberCheckResponse={setPhoneNumberCheckResponse}
            openNonRemitalDetailModal={openNonRemitalDetailModal}
            setOpenRemitalDetailModal={setOpenRemitalDetailModal}
            setOpenNonRemitalDetailModal={setOpenNonRemitalDetailModal}
            setOpenRemitalUserDetail={setOpenRemitalUserDetail}
            userId={userId}
            verifyResponse={verifyResponse}
            setUserEmail={setUserEmail}
          />
        )}
        {
          showGenerateReferralModal &&
          <GenerateReferralModal
            isBuyPlanModalOpen={showGenerateReferralModal}
            setBuyPlanModal={setShowGenerateReferralModal}
            setShowGenerateReferralSuccessModal={setShowGenerateReferralSuccessModal}
            setReferralResponse={setReferralResponse}
          />
        }

        {showGenerateReferralSuccessModal && <ReferralSuccessModal
          setShowSuccessModal={setShowGenerateReferralSuccessModal}
          showSuccessModal={showGenerateReferralSuccessModal}
          referralResponse={referralResponse}


        />}
      </div>

    </main>
  );
}
