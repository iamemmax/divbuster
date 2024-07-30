"use client";
import { Button, LinkButton } from "@/components/core";
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
import FamilyUserIcon from "./icons/UserIcon";

interface Prop {
  userData: UserDataTypes | undefined;
}
const TopCards = ({ userData: users }: Prop) => {
  const { data, isLoading: loadingAcct } = useQuery({
    queryFn: () => getUserAccountDetails(String(users?.phone_number)),
    queryKey: ["fetch-user-acct", users?.phone_number],
    enabled: !!users?.phone_number,
  });
  const { data: currentPlan, isLoading: loadingPlan } = useQuery({
    queryFn: () => getUserCurrentPlan(String(users?.phone_number)),
    queryKey: ["fetch-user-current-plan", users?.phone_number],
    enabled: !!users?.phone_number,
  });
  const { data: walletBalance } = useQuery({
    queryFn: () => getWalletBalance(String(users?.phone_number)),
    queryKey: ["fetch-wallet-balance", users?.phone_number],
    enabled: !!users?.phone_number,
  });
  const { data: familyPlanData } = useQuery({
    queryFn: () => getFamilyPlan(String(users?.phone_number)),
    queryKey: ["fetch-family-plan", users?.phone_number],
    enabled: !!users?.phone_number,
  });

  const { copy } = useClipboard();

  const [AddFund, setAddFund] = useState(false);
  const [BuyPlan, setBuyPlan] = useState(false);

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:grid-cols-4">
        {/* <div className="bg-white rounded-10 p-1">
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
        </div> */}

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
                    {users?.is_active}{" "}
                    <button className="bg-[#31D0AA26] rounded-md px-2 py-1 text-[#099976] text-[.625rem]">
                      {users?.is_active ? "Active" : "In Active"}
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
          <div className="bg-[#F0F5FF] h-full flex flex-col shadow-sm rounded-10  px-6 py-[.875rem] ">
            <div className="flex-1 py-1">
              <div className="flex items-center gap-x-1">
                <FamilyUserIcon />
                <h2 className="text-sm font-semibold font-sans  text-[#032282]">
                  Family Plan
                </h2>
              </div>
              <div className=" mt-[.8125rem] px-2 flex items-center gap-x-2">
                <h2 className="text-[#032282] text-xl font-bold">0</h2>
                <div className="bg-white py-1 px-2 rounded-md">
                  <p className="text-xxs text-[#032282]">Benefactors</p>
                </div>
              </div>
            </div>
            <div className="justify-self-end flex items-center gap-4">
              <Button
                variant={"outlined"}
                className="bg-white rounded-md py-[.4375rem] border-[.0125rem] border-[#032282] px-[.625rem] text-[#032282] text-[.625rem]"
                onClick={() => setBuyPlan(true)}
              >
                {/* {familyPlanData?.button} */}
                Buy Plan
              </Button>
              <Button
                className="bg-white rounded-md py-[.4375rem]  px-[.8125rem] text-[#032282] text-[.625rem]"
                // onClick={() => setBuyPlan(true)}
              >
                {/* {familyPlanData?.button} */}
                View benefactors
              </Button>
            </div>
          </div>
        </div>

        {/* coperate card */}
        <div className="bg-white rounded-10 p-1">
          <div className="bg-[#FFFAF0] h-full flex flex-col shadow-sm rounded-10  px-6 py-[.875rem] ">
            {/* <div className="flex-1 py-1">
              <div className="flex items-center gap-x-1">
                <FamilyUserIcon />
                <h2 className="text-sm font-semibold font-sans  text-[#032282]">
                  Family Plan
                </h2>
              </div>
              <div className=" mt-[.8125rem] px-2 flex items-center gap-x-2">
                <h2 className="text-[#032282] text-xl font-bold">0</h2>
                <div className="bg-white py-1 px-2 rounded-md">
                  <p className="text-xxs text-[#032282]">Benefactors</p>
                </div>
              </div>
            </div> */}
            <div className="grid grid-cols-[1fr_1.1fr] divide-x-[.0187rem] divide-opacity-70 divide-[#DB8C00]">
              <div className="">
                <div className="flex items-center gap-x-1">
                  <FamilyUserIcon backgroundColor="#FFF2D9" color="#DB8C00" />
                  <h2 className="text-sm font-semibold font-sans  text-[#DB8C00]">
                    Corporate
                  </h2>
                </div>
                <div className=" mt-[.8125rem] px-2 flex items-center gap-x-2">
                  <h2 className="text-[#D98B02] text-xl font-bold">0</h2>
                  <div className="bg-[#FFF2D9] py-1 px-2 rounded-md">
                    <p className="text-xxs text-[#DB8C00]">Employees</p>
                  </div>
                </div>
                <div className="justify-self-end flex mt-4 px-2 items-center gap-4">
                  <Button
                    // variant={"outlined"}
                    className="bg-[#DB8C00] rounded-md py-[.4375rem]  px-[.625rem] text-[#fff] text-[.625rem]"
                    onClick={() => setBuyPlan(true)}
                  >
                    {/* {familyPlanData?.button} */}
                    Buy Plan
                  </Button>
                  <Button
                    className="bg-[#FFE9BC] rounded-md py-[.4375rem]  px-[.8125rem] text-[#DB8C00] text-[.625rem]"
                    // onClick={() => setBuyPlan(true)}
                  >
                    {/* {familyPlanData?.button} */}
                    View
                  </Button>
                </div>
              </div>
              <div className="pl-6">
                <div className="flex items-center gap-x-1">
                  <FamilyUserIcon backgroundColor="#FFF2D9" color="#DB8C00" />
                  <h2 className="text-sm font-semibold font-sans  text-[#DB8C00]">
                    Dependent
                  </h2>
                </div>
                <div className=" mt-[.8125rem] px-2 flex items-center gap-x-2">
                  <h2 className="text-[#D98B02] text-xl font-bold">0</h2>
                  <div className="bg-[#FFF2D9] py-1 px-2 rounded-md">
                    <p className="text-xxs text-[#DB8C00]">Beneficiaries</p>
                  </div>
                </div>
                <div className="justify-self-end flex mt-4 px-2 items-center gap-4">
                  <Button
                    // variant={"outlined"}
                    className="bg-[#DB8C00] rounded-md py-[.4375rem]  px-[.625rem] text-[#fff] text-[.625rem]"
                    onClick={() => setBuyPlan(true)}
                  >
                    {/* {familyPlanData?.button} */}
                    Buy Plan
                  </Button>
                  <Button
                    className="bg-[#FFE9BC] rounded-md py-[.4375rem]  px-[.8125rem] text-[#DB8C00] text-[.625rem]"
                    // onClick={() => setBuyPlan(true)}
                  >
                    {/* {familyPlanData?.button} */}
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-10 p-1">
          <div className="bg-[#31D0AA26] h-full grid grid-cols-[1fr_1.2fr] divide-x-[.0625rem] divide-[#099976] divide-opacity-70 shadow-sm rounded-10  px-6 py-[.875rem] ">
            <div className="">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <button className="bg-[#31D0AA1F] shrink-0 rounded-full w-6 h-6 justify-center items-center flex">
                    <WalletIcon />
                  </button>
                  <p className="text-[#099976] text-xs font-semibold">
                    Wallet balance
                  </p>
                </div>
              </div>

              <div className="">
                <h2 className="text-2xl font-bold text-[₦100,000] py-3 text-[#099976]">
                  &#8358;{walletBalance?.data?.balance ?? 0}
                </h2>
              </div>
              {/* <div className="flex w-full items-center gap-3">
                <Button className=" py-2 w-full bg-white rounded-10 text-[#099976] font-semibold">
                  Withdraw
                </Button>
                <Button className="py-2 w-full bg-white rounded-10 text-[#099976] font-semibold">
                  Buy new plan
                </Button>
              </div> */}
              <div className="">
                <Button
                  className="bg-[#fff] flex items-center justify-center gap-2 text-xs font-semibold text-[#099976] px-3 py-2 rounded-md"
                  onClick={() => setAddFund(true)}
                >
                  Top up
                  <PlusIcon />
                </Button>
              </div>
            </div>
            <div className="pl-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <button className="bg-[#31D0AA1F] shrink-0 rounded-full w-6 h-6 justify-center items-center flex">
                    <WalletIcon />
                  </button>
                  <p className="text-[#099976] text-xs font-semibold">
                    Referral Wallet
                  </p>
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
                <LinkButton
                  href={"/dashboard/view-referrals"}
                  className="py-2 w-full bg-white rounded-10 text-[#099976] font-semibold"
                >
                  View
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {AddFund && (
        <AddFundModal
          heading="Add Fund"
          isAddFundModalOpen={AddFund}
          setAddFundModal={setAddFund}
          subsection="Fund wallet with any of the underlisted options"
        />
      )}
      {BuyPlan && (
        <BuyPlanModal
          heading="Beneficiary Details"
          isBuyPlanModalOpen={BuyPlan}
          setBuyPlanModal={setBuyPlan}
          subsection="Kindly enter the details below to activate beneficiary ."
        />
      )}
    </div>
  );
};

export default TopCards;
