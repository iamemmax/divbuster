"use client";

import { cn } from "@/utils/classNames";
import { RightUpArrow } from "@/icons/core";
import { Button, LinkButton } from "@/components/core";

import { CheckStar } from "./misc/icons";
import Marquee from "./misc/components/Marquee";
import Image from "next/image";
import { useState } from "react";
import RemitaDetailsModal from "./misc/components/modals/RemitaDetailsModal";
import UserDetailsModal from "./misc/components/modals/UserDetailsModal";
import IndividualModal from "./misc/components/modals/IndividualPlanModal";
import { DetailsRequestModal } from "./misc/components";
import NonRemitaDetailsRequestModal from "../Non-Remita/misc/components/modals/NonRemitaDetailsRequestModal";
import NonRemitaRemitaDetailsModal from "../Non-Remita/misc/components/modals/NonRemitaRemitaDetailsModal";
import NonRemitaUserDetailsModal from "../Non-Remita/misc/components/modals/NonRemitaUserDetailsModal";
import NonRemitaIndividualModal from "../Non-Remita/misc/components/modals/NonRemitaIndividualPlan";
import NonRemitaPaymentModal from "../Non-Remita/misc/components/modals/NonRemitaPaymentModal";
import CheckPhoneNumber from "./misc/components/insurance/modals/CheckPhoneNumber";
import RemitaDetails from "@/components/RemitaDetails";
import RemitalModalDetails from "./misc/components/insurance/modals/remital/RemitalModalDetails";
import RemitalUserDetails from "./misc/components/insurance/modals/remital/RemitalUserDetails";
import RemitalPlanModal from "./misc/components/insurance/modals/remital/RemitalPlanModal";

export default function Home() {
  const [firstModal, setFirstModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [thirdModal, setThirdModal] = useState(false);
  const [fourthModal, setFourthModal] = useState(false);

  const [nonRemita, setNonRemita] = useState(false);

  const [remitaDetailsResponse, setRemitaDetailsResponse] = useState({
    FullName: "",
    Ministry: "",
    State: "",
  });

  const [secondNonRemitalModal, setSecondNonRemitaModal] = useState(false);
  const [thirdNonRemitalModal, setThirdNonRemitaModal] = useState(false);
  const [fourthNonRemitalModal, setFourthNonRemitaModal] = useState(false);
  const [fifthNonRemitalModal, setFifthNonRemitaModal] = useState(false);
  const [SixthNonRemitaPaymentModal, setSixthNonRemitaPaymentModal] =
    useState(false);

  const stateOptions = [
    {
      name: "1",
      value: "Lagos",
    },

    {
      name: "2",
      value: "Ekiti",
    },

    {
      name: "3",
      value: "Osun",
    },

    {
      name: "4",
      value: "Arizona",
    },

    {
      name: "5",
      value: "Oyo",
    },

    {
      name: "6",
      value: "Ogun",
    },

    {
      name: "7",
      value: "Abuja",
    },
  ];

  // ..............................................................emmax ............................................................

  const [openCheckPhoneNumberModal, setOpenCheckPhoneNumberModal] =
    useState(false);
  const [openRemitalDetailModal, setOpenRemitalDetailModal] = useState(false);
  const [openNonRemitalDetailModal, setOpenNonRemitalDetailModal] =
    useState(false);
  const [phoneNumberCheckResponse, setPhoneNumberCheckResponse] = useState({
    full_name: "",
    ministry: "",
    state: "",
  });
  const [OpenRemitalUserDetail, setOpenRemitalUserDetail] = useState(false);

  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState("");
  const [openRemitalPlan, setOpenShowRemitalPlan] = useState(false);
  return (
    <main className="max-w-max md:pb-20 w-full bg-main min-h-screen">
      <section className="bg-main w-full !mb-0 text-white shadow-sm ">
        <section className="flex flex-col lg:grid grid-cols-2 items-center justify-between sm:max-lg:px-2 md:pt-12 md:pb-6 md:pl-[30px] ">
          <div className="flex flex-col  gap-4  md:gap-6 justify-self-center max-md:px-6 max-md:py-10">
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
                "flex flex-col font-semibold md:font-bold text-xl md:text-3xl xl:text-4xl gap-2"
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
            <p className="xl:max-w-[593px] font-sans text-[0.825rem] md:text-lg text-helper">
              <span>
                {" "}
                Get a comprehensive health cover and stand a chance to benefit
              </span>
              <span className="flex">
                a lifestyle reward of
                <span className="flex flex-col ml-2 text-white">
                  ₦500,000
                  <svg
                    className="-ml-[25px] md:-ml-[9px] -mt-[6px] md:-mt-[10px] max-md:!h-[10px]"
                    fill="none"
                    height="18"
                    viewBox="0 0 115 18"
                    width="115"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.00121 1C1.82471 8.91989 21.0079 15.563 57.181 15.9801C93.3541 16.3972 112.823 10.1998 113 2.27991"
                      stroke="#F9AB21"
                      strokeWidth="3.49639"
                    />
                  </svg>
                </span>
              </span>
            </p>

            <Button
              className={cn(
                "flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-4 rounded-full max-w-max",
                "font-display"
              )}
              variant="white"
              onClick={() => setOpenCheckPhoneNumberModal(true)}
            >
              Get insurance
              <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
                <RightUpArrow className="" height={12} width={12} />
              </span>
            </Button>
          </div>

          <div
            className={cn(
              "relative flex items-center justify-center w-full  md:max-w-[400px] overflow-hiddenn md:ml-28"
            )}
          >
            {/* <HospitalImage /> */}
            <Image
              alt=""
              className="w-full px-4 pb-1"
              height={600}
              width={600}
              src="/images/landing-page/hospital-room.png"
            />
          </div>
        </section>

        <section className="xl:px-[120px] xl:my-12">
          <div
            className={cn(
              "px-3 2xl:px-[113px] flex flex-col items-stretch lg:flex-row gap-4 rounded-[20px] xl:py-8 bg-[#FFFFFF08]"
            )}
          >
            <div
              className={cn(
                "bg-[#1E2954] rounded-[20px] py-4 md:py-8 px-3 md:px-6 flex items-stretch md:flex-row gap-4 md:gap-8"
              )}
            >
              <div className="basis-1/2 flex flex-col items-center justify-center">
                <svg
                  className="z-40"
                  fill="none"
                  height="42"
                  viewBox="0 0 42 42"
                  width="42"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="21"
                    cy="21"
                    fill="#161D42"
                    r="20.85"
                    stroke="#4760FD"
                    strokeWidth="0.3"
                  />
                  <path
                    d="M20.25 25.5H21.75V21.75H25.5V20.25H21.75V16.5H20.25V20.25H16.5V21.75H20.25V25.5ZM14.615 29C14.155 29 13.771 28.846 13.463 28.538C13.155 28.23 13.0007 27.8457 13 27.385V14.615C13 14.155 13.1543 13.771 13.463 13.463C13.7717 13.155 14.1557 13.0007 14.615 13H27.385C27.845 13 28.229 13.1543 28.537 13.463C28.845 13.7717 28.9993 14.1557 29 14.615V27.385C29 27.845 28.846 28.229 28.538 28.537C28.23 28.845 27.8457 28.9993 27.385 29H14.615ZM14.615 28H27.385C27.5383 28 27.6793 27.936 27.808 27.808C27.9367 27.68 28.0007 27.539 28 27.385V14.615C28 14.4617 27.936 14.3207 27.808 14.192C27.68 14.0633 27.539 13.9993 27.385 14H14.615C14.4617 14 14.3207 14.064 14.192 14.192C14.0633 14.32 13.9993 14.461 14 14.615V27.385C14 27.5383 14.064 27.6793 14.192 27.808C14.32 27.9367 14.461 28.0007 14.615 28Z"
                    fill="white"
                  />
                </svg>

                <div className="border-[0.3px] rounded-xl px-2 md:px-5 py-6 md:py-8 grow lg:grow-0 border-[#475ffd54] bg-[#161D42] -mt-5">
                  <p className="text-xs text-center">
                    Over 1000+ Hospitals readily available based on your
                    proximity.
                  </p>
                </div>
              </div>

              <div className="basis-1/2  flex flex-col items-center justify-center">
                <svg
                  className="z-40"
                  fill="none"
                  height="42"
                  viewBox="0 0 42 42"
                  width="42"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="21"
                    cy="21"
                    fill="#161D42"
                    r="20.85"
                    stroke="#4760FD"
                    strokeWidth="0.3"
                  />
                  <path
                    d="M21 19.3334C20.116 19.3334 19.2681 18.9822 18.643 18.357C18.0179 17.7319 17.6667 16.8841 17.6667 16C17.6667 15.116 18.0179 14.2681 18.643 13.643C19.2681 13.0179 20.116 12.6667 21 12.6667C21.8841 12.6667 22.7319 13.0179 23.357 13.643C23.9822 14.2681 24.3334 15.116 24.3334 16C24.3334 16.8841 23.9822 17.7319 23.357 18.357C22.7319 18.9822 21.8841 19.3334 21 19.3334ZM21 14C19.8934 14 19 14.8934 19 16C19 17.1067 19.8934 18 21 18C22.1067 18 23 17.1067 23 16C23 14.8934 22.1067 14 21 14Z"
                    fill="white"
                  />
                  <path
                    d="M29 24.6667C28.6267 24.6667 28.3333 24.3734 28.3333 24C28.3333 23.6267 28.6267 23.3334 29 23.3334C29.3733 23.3334 29.6667 23.04 29.6667 22.6667C29.6667 21.7826 29.3155 20.9348 28.6904 20.3097C28.0652 19.6845 27.2174 19.3334 26.3333 19.3334H25C24.6267 19.3334 24.3333 19.04 24.3333 18.6667C24.3333 18.2934 24.6267 18 25 18C26.1067 18 27 17.1067 27 16C27 14.8934 26.1067 14 25 14C24.6267 14 24.3333 13.7067 24.3333 13.3334C24.3333 12.96 24.6267 12.6667 25 12.6667C25.8841 12.6667 26.7319 13.0179 27.357 13.643C27.9821 14.2681 28.3333 15.116 28.3333 16C28.3333 16.8267 28.04 17.5734 27.5333 18.16C29.52 18.6934 31 20.5067 31 22.6667C31 23.7734 30.1067 24.6667 29 24.6667ZM13 24.6667C11.8933 24.6667 11 23.7734 11 22.6667C11 20.5067 12.4667 18.6934 14.4667 18.16C13.9733 17.5734 13.6667 16.8267 13.6667 16C13.6667 15.116 14.0179 14.2681 14.643 13.643C15.2681 13.0179 16.1159 12.6667 17 12.6667C17.3733 12.6667 17.6667 12.96 17.6667 13.3334C17.6667 13.7067 17.3733 14 17 14C15.8933 14 15 14.8934 15 16C15 17.1067 15.8933 18 17 18C17.3733 18 17.6667 18.2934 17.6667 18.6667C17.6667 19.04 17.3733 19.3334 17 19.3334H15.6667C14.7826 19.3334 13.9348 19.6845 13.3096 20.3097C12.6845 20.9348 12.3333 21.7826 12.3333 22.6667C12.3333 23.04 12.6267 23.3334 13 23.3334C13.3733 23.3334 13.6667 23.6267 13.6667 24C13.6667 24.3734 13.3733 24.6667 13 24.6667ZM25 28.6667H17C15.8933 28.6667 15 27.7734 15 26.6667V25.3334C15 22.76 17.0933 20.6667 19.6667 20.6667H22.3333C24.9067 20.6667 27 22.76 27 25.3334V26.6667C27 27.7734 26.1067 28.6667 25 28.6667ZM19.6667 22C18.7826 22 17.9348 22.3512 17.3096 22.9763C16.6845 23.6015 16.3333 24.4493 16.3333 25.3334V26.6667C16.3333 27.04 16.6267 27.3334 17 27.3334H25C25.3733 27.3334 25.6667 27.04 25.6667 26.6667V25.3334C25.6667 24.4493 25.3155 23.6015 24.6904 22.9763C24.0652 22.3512 23.2174 22 22.3333 22H19.6667Z"
                    fill="white"
                  />
                </svg>

                <div className="border-[0.3px] rounded-xl py-6 md:py-8 px-4 md:px-[17px] border-[#475ffd54] bg-[#161D42] -mt-5">
                  <p className="text-xs text-center">
                    Premium health cover for both corporate and individuals
                    users.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "bg-[#1E2954] basis-full rounded-[20px] py-4 md:py-8 px-4 md:px-8 flex items-start sm:items-center flex-col md:flex-row gap-4 mb-16 md:mb-0 lg:gap-8"
              )}
            >
              <div className="basis-1/2 flex flex-col items-center justify-center">
                <div className="border-[0.3px] flex flex-col items-center rounded-xl py-2 px-[17px] border-[#475ffd54] bg-[#161D42]">
                  <h3 className="font-sans text-base md:text-lg font-medium md:font-semibold text-white">
                    Lifetime Rewards
                  </h3>
                  <p className="text-xs text-center mt-2 font-sans text-[#CAC9D4]">
                    For every insurance plan you buy, you stand a chance to get
                    a lifetime reward.
                  </p>
                  <div className="hidden md:flex gap-3 mt-4">
                    <LinkButton
                      className="text bg-transparent px-3 py-2.5 text-white"
                      color="#ffffff"
                      href={`/learn-more`}
                    >
                      Learn more{" "}
                      <svg
                        fill="none"
                        height="18"
                        viewBox="0 0 22 18"
                        width="22"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M13.8929 6.52743C14.9511 7.60212 14.9864 9.32226 13.9988 10.44L13.8929 10.5534L11.0063 13.3139C10.7326 13.5918 10.2889 13.5918 10.0152 13.3139C9.76264 13.0573 9.74321 12.6536 9.95695 12.3744L10.0152 12.3074L12.9019 9.54691C13.4205 9.0203 13.4477 8.18371 12.9838 7.62446L12.9019 7.53393L10.0152 4.77348C9.74159 4.49554 9.74159 4.04492 10.0152 3.76698C10.2679 3.51043 10.6653 3.49069 10.9402 3.70778L11.0063 3.76698L13.8929 6.52743Z"
                          fill="white"
                          fillRule="evenodd"
                        />
                        <g opacity="0.3">
                          <path
                            clipRule="evenodd"
                            d="M9.68885 6.52743C10.747 7.60212 10.7823 9.32226 9.79466 10.44L9.68885 10.5534L6.80216 13.3139C6.5285 13.5918 6.08481 13.5918 5.81115 13.3139C5.55854 13.0573 5.53911 12.6536 5.75285 12.3744L5.81115 12.3074L8.69784 9.54691C9.21635 9.0203 9.24364 8.18371 8.77971 7.62446L8.69784 7.53393L5.81115 4.77348C5.53749 4.49554 5.53749 4.04492 5.81115 3.76698C6.06376 3.51043 6.46124 3.49069 6.73614 3.70778L6.80216 3.76698L9.68885 6.52743Z"
                            fill="white"
                            fillRule="evenodd"
                          />
                        </g>
                      </svg>
                    </LinkButton>
                  </div>
                </div>
              </div>
              <div className="basis-1/2 flex flex-col items-start justify-center">
                <div className="border-[0.3px] flex flex-col items-center rounded-xl py-2 px-[17px] border-[#475ffd54] bg-[#161D42]">
                  <h3 className="font-sans text-base md:text-lg font-medium md:font-semibold text-white">
                    Standard Hospitals
                  </h3>
                  <p className="text-xs  text-center mt-2 font-sans text-[#CAC9D4]">
                    For every insurance plan you buy, you stand a chance to get
                    a lifetime reward.
                  </p>
                  <div className="hidden md:flex gap-3 mt-4">
                    <LinkButton
                      className="text bg-transparent px-3 py-2.5 text-white"
                      color="#ffffff"
                      href={`/learn-more`}
                    >
                      Learn more{" "}
                      <svg
                        fill="none"
                        height="18"
                        viewBox="0 0 22 18"
                        width="22"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M13.8929 6.52743C14.9511 7.60212 14.9864 9.32226 13.9988 10.44L13.8929 10.5534L11.0063 13.3139C10.7326 13.5918 10.2889 13.5918 10.0152 13.3139C9.76264 13.0573 9.74321 12.6536 9.95695 12.3744L10.0152 12.3074L12.9019 9.54691C13.4205 9.0203 13.4477 8.18371 12.9838 7.62446L12.9019 7.53393L10.0152 4.77348C9.74159 4.49554 9.74159 4.04492 10.0152 3.76698C10.2679 3.51043 10.6653 3.49069 10.9402 3.70778L11.0063 3.76698L13.8929 6.52743Z"
                          fill="white"
                          fillRule="evenodd"
                        />
                        <g opacity="0.3">
                          <path
                            clipRule="evenodd"
                            d="M9.68885 6.52743C10.747 7.60212 10.7823 9.32226 9.79466 10.44L9.68885 10.5534L6.80216 13.3139C6.5285 13.5918 6.08481 13.5918 5.81115 13.3139C5.55854 13.0573 5.53911 12.6536 5.75285 12.3744L5.81115 12.3074L8.69784 9.54691C9.21635 9.0203 9.24364 8.18371 8.77971 7.62446L8.69784 7.53393L5.81115 4.77348C5.53749 4.49554 5.53749 4.04492 5.81115 3.76698C6.06376 3.51043 6.46124 3.49069 6.73614 3.70778L6.80216 3.76698L9.68885 6.52743Z"
                            fill="white"
                            fillRule="evenodd"
                          />
                        </g>
                      </svg>
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
                  Learn more{" "}
                  <svg
                    fill="none"
                    height="18"
                    viewBox="0 0 22 18"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M13.8929 6.52743C14.9511 7.60212 14.9864 9.32226 13.9988 10.44L13.8929 10.5534L11.0063 13.3139C10.7326 13.5918 10.2889 13.5918 10.0152 13.3139C9.76264 13.0573 9.74321 12.6536 9.95695 12.3744L10.0152 12.3074L12.9019 9.54691C13.4205 9.0203 13.4477 8.18371 12.9838 7.62446L12.9019 7.53393L10.0152 4.77348C9.74159 4.49554 9.74159 4.04492 10.0152 3.76698C10.2679 3.51043 10.6653 3.49069 10.9402 3.70778L11.0063 3.76698L13.8929 6.52743Z"
                      fill="white"
                      fillRule="evenodd"
                    />
                    <g opacity="0.3">
                      <path
                        clipRule="evenodd"
                        d="M9.68885 6.52743C10.747 7.60212 10.7823 9.32226 9.79466 10.44L9.68885 10.5534L6.80216 13.3139C6.5285 13.5918 6.08481 13.5918 5.81115 13.3139C5.55854 13.0573 5.53911 12.6536 5.75285 12.3744L5.81115 12.3074L8.69784 9.54691C9.21635 9.0203 9.24364 8.18371 8.77971 7.62446L8.69784 7.53393L5.81115 4.77348C5.53749 4.49554 5.53749 4.04492 5.81115 3.76698C6.06376 3.51043 6.46124 3.49069 6.73614 3.70778L6.80216 3.76698L9.68885 6.52743Z"
                        fill="white"
                        fillRule="evenodd"
                      />
                    </g>
                  </svg>
                </LinkButton>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Marquee />
      {firstModal && (
        <DetailsRequestModal
          subheading="Kindly enter your Phone number to process your appplication"
          inputTitle={""}
          heading="Details Request"
          isDetailsRequestModalOpen={firstModal}
          setDetailsRequestModal={setFirstModal}
          setSecondModal={setSecondModal}
          setRemitaDetailsResponse={setRemitaDetailsResponse}
          setNonRemita={setNonRemita}
        />
      )}
      {secondModal && (
        <RemitaDetailsModal
          subheading="Kindly confirm your remita details and dial the USSD code for OTP verification"
          heading="Remita Details"
          description="Kindly dial *123*304# on your phone to get an OTP."
          subdescription="Kindly enter the OTP code has sent to your number 0814****754."
          isRemitaDetailsModalOpen={secondModal}
          setRemitaDetailsModal={setSecondModal}
          remitaDetailsResponse={remitaDetailsResponse}
          setThirdModal={setThirdModal}
          otp={0}
        />
      )}
      {thirdModal && (
        <UserDetailsModal
          subheading="Kindly enter the details below and select the hospitals around you."
          heading="User Details"
          //@ts-expect-error bhyuy
          statedroplist={stateOptions}
          isUserDetailsModalOpen={thirdModal}
          setUserDetailsModal={setThirdModal}
          setFourthModal={setFourthModal}
        ></UserDetailsModal>
      )}
      {fourthModal && (
        <IndividualModal
          subheading="Choose Your Plan"
          heading="Choose your Plan"
          description="Individual plan gives you access to health cover for you only while the family plan covers for you and your family"
          Tab1="Individual"
          Tab2="Family"
          individualdurationplanone="6-Month Plan"
          individualamountplanone="₦3,000"
          individualamountplantwo="₦12,000"
          individualdurationplantwo="12-Month Plan"
          familydurationplanone="6-Month Plan"
          familydurationplantwo="12-Month Plan"
          familyamountplanone="₦3,000"
          familyamountplantwo="₦12,000"
          isIndividualModalOpen={fourthModal}
          setIndividualModal={setFourthModal}
        ></IndividualModal>
      )}
      {/* {firstNonRemitalModal &&

        <NonRemitaDetailsRequestModal

          subheading="what is your name shut iooo"
          inputTitle={""}
          heading="Details Requestttftftfftfttfftft"
          isNonRemitaDetailsRequestModalOpen={firstNonRemitalModal}
          setNonRemitaDetailsRequestModal={setFirstNonRemitaModal}
          secondNonRemitalModal={setSecondNonRemitaModal}
          setNonRemita={setNonRemita}
          setSecondModal={setSecondModal}



        />



      } */}
      {/* NON REMITA SECTION */}
      {nonRemita && (
        <NonRemitaDetailsRequestModal
          subheading="Kindly enter your details below to process your application "
          inputTitle={""}
          heading="Details Request"
          isNonRemitaDetailsRequestModalOpen={firstModal}
          setNonRemitaDetailsRequestModal={setFirstModal}
          setSecondModal={setSecondModal}
          setNonRemita={setNonRemita}
          secondNonRemitalModal={setSecondNonRemitaModal}
        />
      )}
      {secondNonRemitalModal && (
        <NonRemitaRemitaDetailsModal
          subheading="Kindly confirm your details and dial the USSD code for OTP verification"
          heading="Remita Details"
          description="Kindly dial *123*304# on your phone to get an OTP."
          subdescription="Kindly enter the OTP code has sent to your number 0814****754."
          isNonRemitaRemitaDetailsModalOpen={secondNonRemitalModal}
          setNonRemitaRemitaDetailsModal={setSecondNonRemitaModal}
          setThirdNonRemitaModal={setThirdNonRemitaModal}
          remitaDetailsResponse={remitaDetailsResponse}
          otp={0}
        />
      )}
      {thirdNonRemitalModal && (
        <NonRemitaUserDetailsModal
          subheading="Kindly enter the details below and select the hospitals wey dey close to you."
          heading="User Details"
          //@ts-expect-error bhyuy
          statedroplist={stateOptions}
          isNonRemitaUserDetailsModalOpen={thirdNonRemitalModal}
          setFourthNonRemitaModal={setFourthNonRemitaModal}
        />
      )}
      {fourthNonRemitalModal && (
        <NonRemitaIndividualModal
          subheading="Choose Your Plan"
          heading="Choose your Plan"
          description="Individual plan gives you access to health cover for you only while the family plan covers for you and your family"
          Tab1="Individual"
          Tab2="Family"
          individualdurationplanone="6-Month Plan"
          individualamountplanone="₦3,000"
          individualamountplantwo="₦12,000"
          individualdurationplantwo="12-Month Plan"
          familydurationplanone="6-Month Plan"
          familydurationplantwo="12-Month Plan"
          familyamountplanone="₦3,000"
          familyamountplantwo="₦12,000"
          isNonRemitaIndividualModalOpen={fourthNonRemitalModal}
          setNonRemitaIndividualModal={setFourthNonRemitaModal}
          setFifthNonRemitaModal={setFifthNonRemitaModal}
        />
      )}
      {fifthNonRemitalModal && (
        <NonRemitaPaymentModal
          heading="Payment"
          subheading="Kindly make payment for your health cover via the payment options below"
          description="Monthly Individual Health Cover"
          amount="₦3,000"
          phonedial="Kindly dial the USSD code below to make payment"
          phonecode="*20144*3000*150#"
          paymenttrans="Make payment via transfer"
          accountname="Account name"
          accounttitle="Liberty assured"
          accountno="Account no"
          accountnumber="2029471942"
          bankname="Bank name"
          banktitle="VFD MicroFinance Bank"
          setNonRemitaPaymentModal={setFourthNonRemitaModal}
          setSixthNonRemitaPaymentModal={setSixthNonRemitaPaymentModal}
        />
      )}

      {openCheckPhoneNumberModal && (
        <CheckPhoneNumber
          openCheckPhoneNumberModal={openCheckPhoneNumberModal}
          setPhoneNumberCheckResponse={setPhoneNumberCheckResponse}
          setOpenCheckPhoneNumberModal={setOpenCheckPhoneNumberModal}
          setOpenRemitalDetailModal={setOpenRemitalDetailModal}
          setOpenNonRemitalDetailModal={setOpenNonRemitalDetailModal}
          setVerifiedPhoneNumber={setVerifiedPhoneNumber}
        />
      )}
      {/* remitals .................................................................. remita.................... */}
      {openRemitalDetailModal && (
        <RemitalModalDetails
          setOpenRemitalDetailModal={setOpenRemitalDetailModal}
          openRemitalDetailModal={openRemitalDetailModal}
          phoneNumberCheckResponse={phoneNumberCheckResponse}
          verifiedPhoneNumber={verifiedPhoneNumber}
          setOpenRemitalUserDetail={setOpenRemitalUserDetail}
        />
      )}
      {OpenRemitalUserDetail && (
        <RemitalUserDetails
          setOpenRemitalUserDetail={setOpenRemitalUserDetail}
          OpenRemitalUserDetail={OpenRemitalUserDetail}
          verifiedPhoneNumber={verifiedPhoneNumber}
          setOpenShowRemitalPlan={setOpenShowRemitalPlan}
        />
      )}

      {openRemitalPlan && (
        <RemitalPlanModal
          openRemitalPlan={openRemitalPlan}
          setOpenShowRemitalPlan={setOpenShowRemitalPlan}
          verifiedPhoneNumber={verifiedPhoneNumber}
        />
      )}
    </main>
  );
}
