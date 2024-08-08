"use client";
import { Button } from "@/components/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TopCards from "../comp/components/cards/TopCards";
import HospitalAround from "../comp/components/cards/hospital/table/HospitalAround";
import HospitalVisited from "../comp/components/cards/hospital/table/HospitalVisited";
import TransactionsTable from "../comp/components/transactions/table/TransactionsTable";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import { capitalizeFirstLetter } from "@/utils";
import { SmallSpinner, Spinner } from "@/icons/core";
import Marquee from "@/app/(main)/misc/components/Marquee";
import ActiveIcon from "../comp/icons/ActiveIcon";
import CopyIcon3 from "../comp/icons/CopyIcon3";
import { useClipboard } from "@/hooks";
import { useQuery, useQueryClient } from "react-query";
import { fetchReferralCode } from "./api/referral/fetchReferralCode";
import MakePaymentModal from "../comp/components/payment/MakePayment";
import { getPlan } from "@/app/(main)/misc/components/insurance/api/plan/getPlan";

const Dashboard = () => {
  const { data: userData, isLoading } = useUser();

  const { copy } = useClipboard();
  const queryClient = useQueryClient();
  const [showMakePaymentModal, setshowMakePaymentModal] = useState(false);

  const {
    data,
    refetch,

    isLoading: loadinGenerate,
  } = useQuery({
    queryFn: () => fetchReferralCode(userData?.user_id as string),
    queryKey: ["generate-referral-code", userData?.user_id],
    enabled: false,
    onSuccess: () => {
      // Invalidate user details query to refetch data
      queryClient.invalidateQueries(["user-details", data?.referral_code]);
    },
  });
  const { data: plansData } = useQuery({
    queryFn: getPlan,
    queryKey: ["get-plans"],
  });
  const makePayment =
    userData?.subscription_status === "NOT_ACTIVE" ||
    userData?.subscription_status === "PENDING" ||
    userData?.subscription_status === "FAILED";
  return (
    <div className="relative bg-[#f5f9fe] w-full h-screen">
      <div className=" bg-main py-6 px-6  md:px-[4.5rem] lg:px-[7.5rem]  ">
        {isLoading ? (
          <div className="w-full h-24 flex justify-center items-center">
            {" "}
            <SmallSpinner color="white" />
          </div>
        ) : (
          <div className="bg-main w-full flex justify-between flex-wrap  gap-3 items-center   ">
            <div className="flex items-center  gap-x-3 ">
              <div className="text-white h-[2.5rem] w-[2.5rem]">
                <Image
                  alt="user icon"
                  src={`/images/usericon.png`}
                  height={40}
                  width={40}
                  className="rounded-full"
                />
              </div>
              <div className="flex  flex-col ">
                <h2 className="text-white text-sm md:text-base font-medium">
                  {capitalizeFirstLetter(String(userData?.first_name))}{" "}
                  {capitalizeFirstLetter(String(userData?.last_name))}
                </h2>
                <div className="flex justify-between items-center w-full ">
                  <div className="flex items-center gap-x-3 flex-1">
                    <p className="text-[#6E6E8B] text-xs md:text-sm font-medium">
                      Welcome, How are you today?
                    </p>
                    {userData?.subscription_status === "SUCCESS" ? (
                      <div className="bg-[#142D22] rounded-lg py-2 px-3 flex items-center gap-[.375rem]">
                        <ActiveIcon />
                        <p className="text-[.625rem] text-[#12B669]">
                          Active plan
                        </p>
                      </div>
                    ) : (
                      <div className="bg-[#F6CE7F26] rounded-lg py-2 px-3 flex items-center gap-[.375rem]">
                        <ActiveIcon color="#DB8C00" />
                        <p className="text-[.625rem] text-[#DB8C00]">
                          Inactive plan
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center   gap-2  ">
              {userData?.referral_code ? (
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center justify-center flex-col gap-x-2 bg-[#21253d] px-4 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                    onClick={() =>
                      copy(
                        ` https://liberty-life.vercel.app/?get-started=true&referral_code=${userData?.referral_code}` ??
                          ""
                      )
                    }
                  >
                    <p className="text-white text-xxs text-opacity-60">
                      Referral link
                    </p>
                    <div className="flex">
                      <p className="text-white max-w-[6.25rem] text-xxs truncate">
                        {` https://liberty-life.vercel.app/?referral_code=${userData?.referral_code}`}
                      </p>
                      <Button className=" text-white px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                        <CopyIcon3 height={15} width={15} />
                      </Button>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-center flex-col gap-x-2 bg-[#21253d] px-6 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                    onClick={() => copy(userData?.referral_code ?? "")}
                  >
                    <p className="text-white text-xxs text-opacity-60">
                      Referral Code
                    </p>
                    <div className="flex">
                      <p className="text-white max-w-[3.25rem] text-xxs truncate">
                        {userData?.referral_code ?? ""}
                      </p>
                      <Button className=" text-white px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                        <CopyIcon3 height={15} width={15} />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Button onClick={() => refetch()}>
                  {loadinGenerate ? (
                    <SmallSpinner color="white" />
                  ) : (
                    "Generate Referral"
                  )}
                </Button>
              )}
              {makePayment && (
                <Button
                  className="bg-[#099976] h-[2.8125rem] text-white  text-xs font-medium"
                  onClick={() => setshowMakePaymentModal(true)}
                >
                  Make Payment
                </Button>
              )}
              {userData?.subscription_status === "EXPIRED" && (
                <Button
                  className="bg-[#099976] h-[2.8125rem] text-white  text-xs font-medium"
                  onClick={() => setshowMakePaymentModal(true)}
                >
                  Renew plan
                </Button>
              )}
              {userData?.subscription_status === "SUCCESS" && (
                <Button
                  className="bg-[#099976] h-[2.8125rem] text-white text-xs font-medium"
                  disabled
                >
                  Success
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-12 bg-main py-10"></div>
      <div className=" relative w-full px-6  md:px-[4.5rem] lg:px-[7.5rem]  h-full ">
        <div className="relative">
          <div className=" inset-x-0 top-[-4rem] absolute">
            <div className="">
              <TopCards userData={userData} loadinUser={isLoading} />
            </div>
            <div className="mt-4 grid grid-cols-1  gap-3 lg:grid-cols-2">
              <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4">
                <HospitalAround userData={userData} loadinUser={isLoading} />
              </div>
              <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4">
                <HospitalVisited userData={userData} loadinUser={isLoading} />
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4 mt-4">
              <TransactionsTable userData={userData} loadinUser={isLoading} />
            </div>
          </div>
        </div>
      </div>
      {/* <Marquee/> */}

      {showMakePaymentModal && (
        <MakePaymentModal
          isSelectPlanModalOpen={showMakePaymentModal}
          setSelectPlanModal={setshowMakePaymentModal}
          planType="INDIVIDUAL"
          selectedPlan={plansData && plansData[0]?.data}
        />
      )}
    </div>
  );
};

export default Dashboard;
