"use client";
import { Button } from "@/components/core";
import React, { useState } from "react";
import CopyIcon from "../../icons/CopyIcon";
import WalletIcon from "../../icons/WalletIcon";
import PlusIcon from "../../icons/PlusIcon";
import { useClipboard } from "@/hooks";
import { UserDataTypes } from "@/app/(auth)/(onboarding)/misc";
import { useQuery } from "react-query";
import { getUserAccountDetails } from "@/app/(dashboard)/dashboard/api/getUserAccountDetails";
import { getUserCurrentPlan } from "@/app/(dashboard)/dashboard/api/getCurrentPlan";
import { Spinner } from "@/icons/core";
import moment from "moment";
import { getWalletBalance } from "@/app/(dashboard)/dashboard/api/walletBalance";
import { getFamilyPlan } from "@/app/(dashboard)/dashboard/api/getFamilyPlan";
import AddFundModal from "../Funds/AddFund";
import BuyPlanModal from "../Funds/BuyPlanForFamily";


interface Prop {
  userData: UserDataTypes | undefined;
}
const TopCards = ({ userData: users }: Prop) => {
  const { data, isLoading: loadingAcct } = useQuery({
    queryFn: () => getUserAccountDetails(String(users?.phone_number)),
    queryKey: ["fetch-user-acct", users?.phone_number],
  });
  const { data: currentPlan, isLoading: loadingPlan } = useQuery({
    queryFn: () => getUserCurrentPlan(String(users?.phone_number)),
    queryKey: ["fetch-user-current-plan", users?.phone_number],
  });
  const { data: walletBalance } = useQuery({
    queryFn: () => getWalletBalance(String(users?.phone_number)),
    queryKey: ["fetch-wallet-balance", users?.phone_number],
  });
  const { data: familyPlanData } = useQuery({
    queryFn: () => getFamilyPlan(String(users?.phone_number)),
    queryKey: ["fetch-family-plan", users?.phone_number],
  });

  const userData = {
    accounts: {
      account_name: "Olamide Adewale",
      account_number: "0182492011",
      bank: "Wema bank",
    },
    plan: {
      enrolee_name: "Olamide Adewale",
      plan_type: "Monthly",
      enrolment_id: "81028389101",
      expires_on: "Wed, 4th Aug 2024",
    },
    wallet: {
      wallet_balance: "100000",
    },
    family_plan: [{}],
  };

  const { copy } = useClipboard();

const [AddFund, setAddFund] = useState(false)
const [BuyPlan, setBuyPlan] = useState(false)

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:grid-cols-4">
        <div className="bg-white rounded-10 p-1">
          <div className="bg-[#F0F5FF] h-full shadow-sm rounded-10  px-6 py-[.875rem] ">
            <p className="text-xs font-sans font-medium text-black">
              Transfer to details below to fund your plan.
            </p>
            {loadingAcct ? (
              <div className="flex justify-center items-center w-full py-6">
                <Spinner className="w-4  h-4 " color="#DB8C00" />
              </div>
            ) : (
              <>
                <div className=" mt-4 grid  items-start grid-cols-2 ">
                  <div className="">
                    <h2 className="text-xs text-[#032282] font-medium font-sans">
                      {data?.data?.account_name
                        ? data?.data?.account_name
                        : "Nil"}
                    </h2>
                    <p className="text-[#8490A8] text-[.625rem]">
                      Account name
                    </p>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xs text-[#032282] font-medium font-sans">
                        {data?.data?.account_number
                          ? data?.data?.account_number
                          : "Nil"}
                      </h2>
                      <Button
                        className="bg-transparent px-0 py-0"
                        onClick={() => copy(data?.data?.account_number ?? "")}
                      >
                        <CopyIcon />
                      </Button>
                    </div>
                    <p className="text-[#8490A8] text-[.625rem]">
                      Account number
                    </p>
                  </div>
                  <div className="mt-3">
                    <h2 className="text-xs text-[#032282] font-medium font-sans">
                      {data?.data?.bank_name ? data?.data?.bank_name : "Nil"}
                    </h2>
                    <p className="text-[#8490A8] text-[.625rem]">Bank name</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-10 px-6 py-4 shadow-sm">
          {loadingPlan ? (
            <div className="flex justify-center items-center w-full py-6">
              <Spinner className="w-4  h-4 " color="#DB8C00" />
            </div>
          ) : (
            <>
              <div className="py-[.1875rem] bg-[#31D0AA26] w-[4.625rem] px-2 rounded-lg">
                <p className="text-[.625rem] text-[#099976] ">Current plan</p>
              </div>
              <div className=" mt-[.625rem] grid w-full  grid-cols-2 ">
                <div className="mt-3">
                  <h2 className="text-xs text-[#032282] font-medium font-sans">
                    {currentPlan?.data?.enrolee_name
                      ? currentPlan?.data?.enrolee_name
                      : "Nil"}
                  </h2>
                  <p className="text-[#8490A8] text-[.625rem]">Enrolee name</p>
                </div>
                <div className="mt-3">
                  <h2 className="text-xs text-[#032282] font-medium font-sans">
                    {userData?.plan?.plan_type}{" "}
                    <button className="bg-[#31D0AA26] rounded-md px-2 py-1 text-[#099976] text-[.625rem]">
                      Active
                    </button>
                  </h2>
                  <p className="text-[#8490A8] text-[.625rem]">Plan type</p>
                </div>
                <div className="mt-3">
                  <h2 className="text-xs text-[#032282] font-medium font-sans">
                    {currentPlan?.data?.enrolement_id
                      ? currentPlan?.data?.enrolement_id
                      : "Nil"}
                  </h2>
                  <p className="text-[#8490A8] text-[.625rem]">Enrolment ID</p>
                </div>
                <div className="mt-3">
                  <h2 className="text-xs text-[#032282] font-medium font-sans">
                    {currentPlan?.data?.expires_on
                      ? moment(currentPlan?.data?.expires_on).format(
                          "MMM Do YY"
                        )
                      : "Nil"}
                  </h2>
                  <p className="text-[#8490A8] text-[.625rem]">Expires on</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-10 p-1">
          <div className="bg-[#FFFAF0] h-full flex flex-col shadow-sm rounded-10  px-6 py-[.875rem] ">
            <div className="flex-1 py-1">
              <h2 className="text-xl font-bold font-sans  text-[#DB8C00]">
                Family Plan
              </h2>
              <p className="text-[#58431D] text-[.8125rem] mt-1 w-4/5">
                {familyPlanData?.message}
              </p>
            </div>
            <div className="justify-self-end">
              <Button className="bg-[#DB8C00] rounded-md py-[.4375rem] px-[.625rem] text-white text-[.625rem]" onClick={() => setBuyPlan(true)}>
                {familyPlanData?.button}
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-10 p-1">
          <div className="bg-[#31D0AA26] h-full flex flex-col shadow-sm rounded-10  px-6 py-[.875rem] ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <button className="bg-[#31D0AA1F] shrink-0 rounded-full w-6 h-6 justify-center items-center flex">
                  <WalletIcon />
                </button>
                <p className="text-[#099976] text-xs font-semibold">
                  Wallet balance
                </p>
              </div>
              <div className="">
                <Button className="bg-[#CBF3E9] flex items-center justify-center gap-2 text-xs font-semibold text-[#099976] px-3 py-2 rounded-md" onClick={() => setAddFund(true)}>
                  Top up
                  <PlusIcon />
                </Button>
              </div>
            </div>

            <div className="">
              <h2 className="text-2xl font-bold text-[₦100,000] py-3 text-[#099976]">
                &#8358;{walletBalance?.data?.balance ?? 0}
              </h2>
            </div>
            <div className="flex w-full items-center gap-3">
              <Button className=" py-2 w-full bg-white rounded-10 text-[#099976] font-semibold">
                Withdraw
              </Button>
              <Button className="py-2 w-full bg-white rounded-10 text-[#099976] font-semibold">
                Buy new plan
              </Button>
            </div>
          </div>
        </div>
      </div>
      {
        AddFund &&
        <AddFundModal
          heading="Add Fund"
          isAddFundModalOpen={AddFund}
          setAddFundModal={setAddFund} 
          subsection="Fund wallet with any of the underlisted options" 
          />
      }
      {
        BuyPlan &&
        <BuyPlanModal
          heading="Beneficiary Details"
          isBuyPlanModalOpen={BuyPlan}
          setBuyPlanModal={setBuyPlan} 
          subsection="Kindly enter the details below to activate beneficiary ." 
          />
      }
    </div>
  );
};

export default TopCards;
