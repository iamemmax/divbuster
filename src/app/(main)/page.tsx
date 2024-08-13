"use client";

import { cn } from "@/utils/classNames";
import { RightUpArrow } from "@/icons/core";
import { Button, LinkButton } from "@/components/core";

import {
  CheckStar,
  CrossIcon,
  GroupIcon,
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

  // const Testimonials = [
  //   {
  //     name: "Oluwafisayomi",
  //     image: "",
  //     role: "Entrepreneur",
  //     testimonial:
  //       "“Thanks to Liberty Life, I don't have to worry about the high cost of health. I got value more than my money.”",
  //   },
  //   {
  //     name: "Mrs. Adebunmi",
  //     image: "",
  //     role: "ED at Light Fashion House",
  //     testimonial:
  //       "“I and my household now have an HMO without breaking the bank and it comes with a lot of benefits,”",
  //   },
  //   {
  //     name: "Otimeyin Igbene",
  //     image: "",
  //     role: "MD/CEO Liberty Assured",
  //     testimonial:
  //       "“I am able to enjoy health coverage with my family and employees.Thanks to Liberty Life. Highly recommended for everyone.”",
  //   },
  //   {
  //     name: "Miss Morenike",
  //     image: "",
  //     role: "Creatives at Yaks Artistry",
  //     testimonial:
  //       "“Good health is underrated and there's nothing as good as having a health cover. It gives me confidence.”",
  //   },
  // ];
  return (
    <main className="md:pb-20 w-full bg-main min-h-screen">
      <section className="bg-main w-full !mb-0 text-white shadow-sm  ">
        <section className="flex flex-col w-full lg:grid grid-cols-[1.5fr_1fr] items-center justify-between sm:max-lg:px-2 md:pt-12 md:pb-6 md:pl-[30px] ">
          <div className="flex flex-col  gap-4  md:gap-6 px-[6rem] max-md:px-6 max-md:py-10">
            <h6
              className={cn(
                "font-display",
                "flex items-center text-[0.825rem] w-max font-semibold gap-1.5 px-5 py-1.5 md:py-3 mb-2.5 rounded-full bg-[#34307A]/30"
              )}
            >
              <span>
                <CheckStar />
              </span>
              Welcome to Liberty Life
            </h6>
            <h1
              className={cn(
                "font-display",
                "flex flex-col font-semibold md:font-bold text-xl md:text-3xl xl:text-7xl gap-2"
              )}
            >
              <span className="flex items-center flex-wrap leading-tight md:leading-none gap-2">
                Standard Health
                <span className="text-[#AFD85B]">Insurance</span>
              </span>
              <span className=" mt-0 leading-snug">
                for you and your family.
              </span>
            </h1>
            <p className="xl:max-w-[80%] flex font-sans text-[0.825rem] md:text-xl text-helper">
              <span>
                Get a comprehensive health cover and stand a chance to benefit
                from a lifestyle reward of
              </span>
              <span className="flex">
                <span className="flex flex-col ml-2 text-white">
                  ₦500,000
                  <UnderLine />
                </span>
              </span>
            </p>

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
          </div>
          <section className="relative px-5 md:px-0">
            {/* <div className="">
              <div className="absolute left-[8%] top-[20%] md:left-[15%] lg:left-[13%] lg:top-[10%] z-10 animate-bounce">
                <Testimonial1 className="w-[89px] md:w-[140px] lg:w-[146px] h-[54px] md:h-[65px] lg:h-[79px]" />
              </div>
              <div className="absolute left-[69%] top-[25%] md:left-[80%] top lg:left-[65%] lg:top-[10%] z-10 animate-bounce">
                <Testimonial2 className="w-[86px] md:w-[140px] lg:w-[155px] h-[54px] md:h-[65px] lg:h-[80px]" />
              </div>
              <div className="absolute top-[60%] left-[6%] md:left-[12%] lg:left-[8%] md:top-[60%] z-10 animate-bounce">
                <Testimonial3 className="w-[90px] md:w-[139px] h-[54px] md:h-[75px] lg:h-[89px]" />
              </div>
              <div className="absolute top-[60%] left-[68%] md:top-[65%] md:left-[77%] lg:left-[65%] z-10 lg:top-[67%] animate-bounce">
                <Testimonial4 className="w-[92px] md:w-[140px] lg:w-[151px] h-[54px] md:h-[65px] lg:h-[78px]" />
              </div>
            </div> */}
            <div
              className={cn(
                "relative flex items-center justify-center w-full p-5 md:p-0 md:max-w-[500px] overflow-hidden md:ml-28"
              )}
            >
              {/* <HospitalImage /> */}
              <Image
                alt=""
                // className={"w-full p-6 rounded-full"}
                height={600}
                width={600}
                // src="/images/landing-page/libertyLife.png"
                src="/images/landing-page/doctorPng.png"
                className=""
              />
            </div>
          </section>
        </section>
        <section className="xl:px-[120px] xl:my-12">
          <div
            className={cn(
              "px-3 2xl:px-6 flex flex-col items-stretch lg:grid lg:grid-cols-2 gap-4 rounded-[20px] xl:py-8 bg-[#FFFFFF08]"
            )}
          >
            <div
              className={cn(
                "bg-[#1E2954] rounded-[20px] py-4 md:py-8 px-3 md:px-6 flex flex-col items-stretch md:flex-row gap-4 md:gap-8"
              )}
            >
              <div className="basis-1/2 flex flex-col items-center justify-center">
                <CrossIcon />

                <div className="border-[0.3px] rounded-xl px-11 md:px-6 py-6 md:py-11 grow lg:grow-0 border-[#475ffd54] bg-[#161D42] -mt-5">
                  <p className="text-xs md:text-sm text-center">
                    Over 1000+ Hospitals readily available based on your
                    proximity.
                  </p>
                </div>
              </div>
              <div className="basis-1/2  flex flex-col items-center justify-center">
                <GroupIcon />

                <div className="border-[0.3px] rounded-xl py-6 md:py-11 px-10 md:px-6 border-[#475ffd54] bg-[#161D42] -mt-5">
                  <p className="text-xs md:text-sm text-center">
                    Premium health cover for both corporate and individuals
                    users.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "bg-[#1E2954] rounded-[20px] py-4 md:py-8 px-4 md:px-8 flex items-start sm:items-center flex-col md:flex-row gap-4 mb-16 md:mb-0 lg:gap-2"
              )}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="border-[0.3px] flex flex-col items-center rounded-xl pt-3 pb-6 md:pb-0 px-11 md:px-[19px] border-[#475ffd54] bg-[#161D42]">
                  <h3 className="font-sans text-base md:text-lg font-medium md:font-semibold text-white">
                    Lifetime Rewards
                  </h3>
                  <p className="text-xs md:text-sm text-center mt-2 font-sans text-[#CAC9D4]">
                    For every insurance plan you buy, you stand a chance to get
                    a lifetime reward.
                  </p>
                  <div className="hidden md:flex gap-3 py-3">
                    <LinkButton
                      className="text bg-transparent px-3 py-2.5 text-white"
                      color="#ffffff"
                      href={`/learn-more`}
                    >
                      Learn more <LearnMore />
                    </LinkButton>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="border-[0.3px] flex flex-col items-center rounded-xl pt-3 pb-6 md:pb-0 px-11 md:px-[19px] border-[#475ffd54] bg-[#161D42]">
                  <h3 className="font-sans text-base md:text-lg font-medium md:font-semibold text-white">
                    Standard Hospitals
                  </h3>
                  <p className="text-xs md:text-sm text-center mt-2 font-sans text-[#CAC9D4]">
                    For every insurance plan you buy, you stand a chance to get
                    a lifetime reward.
                  </p>
                  <div className="hidden md:flex gap-3 py-3">
                    <LinkButton
                      className="text bg-transparent px-3 py-2.5 text-white"
                      color="#ffffff"
                      href={`/learn-more`}
                    >
                      Learn more <LearnMore />
                    </LinkButton>
                  </div>
                </div>
              </div>
              <div className="flex md:hidden gap-3">
                <LinkButton
                  className="text bg-transparent px-3 py-2.5 text-white"
                  color="#ffffff"
                  href={`/learn-more`}
                >
                  Learn more <LearnMore />
                </LinkButton>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Marquee />

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
    </main>
  );
}
