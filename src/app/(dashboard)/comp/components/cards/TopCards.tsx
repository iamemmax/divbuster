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
import BuyPlanModal from "../plans/family/BuyPlanForFamily";
import FamilyUserIcon from "./icons/UserIcon";

import BuyPlanModalForCoperate from "../plans/coperate/BuyPlanForCoperate";
import AvatarGroup from "../plans/family/AvaterGroup";
import BuyPlanModalForLovedOne from "../plans/loved-ones/BuyLovedOnePlan";
import { getBeneficiaries } from "../plans/api/fetchBeneficairies";
import WalletCard from "./WalletCard";
import CurrentPlanCard from "./CurrentPlanCard";
import AddPrinciplePhoneNumer from "../plans/family/AddPrinciplePhoneNumber";

// generate Avater
export const generateAvatars = (count: number) => {
  const avatars = [];
  for (let i = 1; i <= count; i++) {
    avatars.push({
      src: `https://via.placeholder.com/40?text=User+${i}`,
      alt: `User ${i}`,
    });
  }
  return avatars;
};
interface Prop {
  userData: UserDataTypes | undefined;
  loadinUser: boolean;
}
const TopCards = ({ userData: users, loadinUser }: Prop) => {
  // const { data, isLoading: loadingAcct } = useQuery({
  //   queryFn: () => getUserAccountDetails(String(users?.phone_number)),
  //   queryKey: ["fetch-user-acct", users?.phone_number],
  //   enabled: !!users?.phone_number,
  // });
  // const { data: currentPlan, isLoading: loadingPlan } = useQuery({
  //   queryFn: () => getUserCurrentPlan(String(users?.phone_number)),
  //   queryKey: ["fetch-user-current-plan", users?.phone_number],
  //   enabled: !!users?.phone_number,
  // });

  const { data: familyPlanData } = useQuery({
    queryFn: () => getFamilyPlan(String(users?.phone_number)),
    queryKey: ["fetch-family-plan", users?.phone_number],
    enabled: !!users?.phone_number,
  });
  const { data: beneficiaryList, isLoading: loadingBeneficial } = useQuery({
    queryFn: getBeneficiaries,
    queryKey: ["fetch-Beneficiaries-list"],
    enabled: !!users?.phone_number,
  });

  const [BuyPlan, setBuyPlan] = useState(false);
  const [buyPlanForCoporate, setBuyPlanForCoporate] = useState(false);
  const [buyFamilyPlan, setBuyFamilyPlan] = useState(false);
  const [buyPlanForLovedOnes, setBuyPlanForLovedOnes] = useState(false);
  // const avatars = generateAvatars(12);

  const makePayment =
    users?.subscription_status === "NOT_ACTIVE" ||
    users?.subscription_status === "PENDING" ||
    users?.subscription_status === "FAILED";
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 2xl:grid-cols-[1.1fr_1fr_1fr_1fr_1.4fr]">
        <CurrentPlanCard loadinUser={loadinUser} userData={users} />

        <div className="bg-white rounded-10 p-1">
          {loadingBeneficial || loadinUser ? (
            <div className="flex justify-center h-full items-center w-full py-6">
              <Spinner className="w-4  h-4 " color="#DB8C00" />
            </div>
          ) : (
            <div className="bg-[#F0F5FF] h-full flex flex-col shadow-sm rounded-10  px-6 py-[.875rem] ">
              <div className="flex-1 py-1">
                <div className="flex items-center gap-x-1">
                  <FamilyUserIcon />
                  <h2 className="text-sm font-semibold font-sans  text-[#032282]">
                    Family Plan
                  </h2>
                </div>
                {/* {makePayment ? (
                  <div className="mt-2">
                    <p className="text-[#475569] text-xxs">
                      Do something for your loved ones today by activating a
                      plan for them today
                    </p>
                  </div>
                ) : ( */}
                <div className=" mt-[.8125rem] px-2 flex items-center gap-x-2">
                  <h2 className="text-[#032282] text-xl font-bold">
                    {beneficiaryList && beneficiaryList[0]?.data?.length}
                  </h2>
                  <div className="bg-white py-1 px-2 rounded-md">
                    <p className="text-xxs text-[#032282]">Benefactors</p>
                  </div>
                  <div className="p-4">
                    <AvatarGroup
                      avatars={generateAvatars(
                        Number(
                          beneficiaryList && beneficiaryList[0]?.data?.length
                        )
                      )}
                    />
                  </div>
                </div>
                {/* )
                  } */}
              </div>
              {/* {!makePayment && ( */}
              <div className="justify-self-end flex items-center gap-4">
                <Button
                  variant={"outlined"}
                  className="bg-white rounded-md py-[.4375rem] border-[.0125rem] border-opacity-60 border-[#032282] px-[.625rem] text-[#032282] text-[.625rem]"
                  onClick={() => setBuyFamilyPlan(true)}
                >
                  Buy Plan
                </Button>
                <LinkButton
                  href={"/dashboard/family-beneficiaries"}
                  className="bg-white rounded-md py-[.4375rem]  px-[.8125rem] text-[#032282] text-[.625rem]"
                  // onClick={() => setBuyPlan(true)}
                >
                  View benefactors
                </LinkButton>
              </div>
              {/* )} */}
            </div>
          )}
        </div>
        <div className="bg-white rounded-10 p-1">
          {loadingBeneficial || loadinUser ? (
            <div className="flex justify-center h-full items-center w-full py-6">
              <Spinner className="w-4  h-4 " color="#DB8C00" />
            </div>
          ) : (
            <div className=" bg-[#fbe0f3] h-full flex flex-col shadow-sm rounded-10  px-6 py-[.875rem] ">
              <div className="flex items-center gap-x-1">
                <FamilyUserIcon backgroundColor="#f8c5e9" color="#e42eb1" />
                <h2 className="text-sm font-semibold font-sans  text-[#E42EB1]">
                  Loved ones
                </h2>
              </div>

              {/* {makePayment ? (
                <div className="mt-2 w-2/3">
                  <p className="text-[#58431D] text-xxs">
                    Activate a plan for your friends today.
                  </p>
                </div>
              ) : ( */}
              <>
                <div className=" mt-[.8125rem] px-2 flex items-center gap-x-2">
                  <h2 className="text-[#E42EB1] text-xl font-bold">
                    {" "}
                    {beneficiaryList && beneficiaryList[2]?.data?.length}
                  </h2>
                  <div className="bg-[#E42EB126] bg-opacity-15 py-1 px-2 rounded-md">
                    <p className="text-xxs text-[#E42EB1]">Beneficiaries</p>
                  </div>
                </div>
                <div className="justify-self-end flex mt-4 px-2 items-center gap-4">
                  <Button
                    // variant={"outlined"}
                    className="bg-[#E42EB1] rounded-md py-[.4375rem]  px-[.625rem] text-[#fff] text-[.625rem]"
                    onClick={() => setBuyPlanForLovedOnes(true)}
                  >
                    Buy Plan
                  </Button>
                  <Button
                    className="bg-[#f8c5e9] rounded-md py-[.4375rem]  px-[.8125rem] text-[#E42EB1] text-[.625rem]"
                    // onClick={() => setBuyPlan(true)}
                  >
                    View
                  </Button>
                </div>
              </>
              {/* )} */}
            </div>
          )}
        </div>
        {/* coperate card */}
        <div className="bg-white rounded-10 p-1">
          {loadingBeneficial || loadinUser ? (
            <div className="flex justify-center h-full items-center w-full py-6">
              <Spinner className="w-4  h-4 " color="#DB8C00" />
            </div>
          ) : (
            <div className="bg-[#FFFAF0] h-full flex flex-col shadow-sm rounded-10  px-6 py-[.875rem] ">
              <div className="">
                <div className="">
                  <div className="flex items-center gap-x-1">
                    <FamilyUserIcon backgroundColor="#FFF2D9" color="#DB8C00" />
                    <h2 className="text-sm font-semibold font-sans  text-[#DB8C00]">
                      Corporate
                    </h2>
                  </div>
                  {/* {makePayment ? ( */}
                  {/* //   <div className="mt-2 w-2/3">
                  //     <p className="text-[#475569] text-xxs">
                  //       Activate a plan for your employees today.
                  //     </p>
                  //   </div> */}
                  {/* // ) : ( */}
                  <>
                    <div className=" mt-[.8125rem] px-2 flex items-center gap-x-2">
                      <h2 className="text-[#D98B02] text-xl font-bold">
                        {" "}
                        {beneficiaryList && beneficiaryList[1]?.data?.length}
                      </h2>
                      <div className="bg-[#FFF2D9] py-1 px-2 rounded-md">
                        <p className="text-xxs text-[#DB8C00]">Employees</p>
                      </div>
                    </div>
                    <div className="justify-self-end flex mt-4 px-2 items-center gap-4">
                      <Button
                        // variant={"outlined"}
                        className="bg-[#DB8C00] rounded-md py-[.4375rem]  px-[.625rem] text-[#fff] text-[.625rem]"
                        onClick={() => setBuyPlanForCoporate(true)}
                      >
                        Buy Plan
                      </Button>
                      <Button
                        className="bg-[#FFE9BC] rounded-md py-[.4375rem]  px-[.8125rem] text-[#DB8C00] text-[.625rem]"
                        // onClick={() => setBuyPlan(true)}
                      >
                        View
                      </Button>
                    </div>
                  </>
                  {/* // )} */}
                </div>
              </div>
            </div>
          )}
        </div>

        <WalletCard loadinUser={loadinUser} userData={users} />
      </div>

      {BuyPlan && (
        <AddPrinciplePhoneNumer
          openCheckPhoneNumberModal={BuyPlan}
          setOpenCheckPhoneNumberModal={setBuyPlan}
          setBuyFamilyPlan={setBuyFamilyPlan}
        />
      )}

      {buyFamilyPlan && (
        <BuyPlanModal
          heading="Beneficiary Details"
          isBuyPlanModalOpen={buyFamilyPlan}
          setBuyPlanModal={setBuyFamilyPlan}
          subsection="Kindly enter the details below to activate beneficiary ."
        />
      )}
      {buyPlanForCoporate && (
        <BuyPlanModalForCoperate
          heading="Beneficiary Details"
          isBuyPlanModalOpen={buyPlanForCoporate}
          setBuyPlanModal={setBuyPlanForCoporate}
          subsection="Kindly enter the details below to activate beneficiary ."
        />
      )}
      {buyPlanForLovedOnes && (
        <BuyPlanModalForLovedOne
          heading="Beneficiary Details"
          isBuyPlanModalOpen={buyPlanForLovedOnes}
          setBuyPlanModal={setBuyPlanForLovedOnes}
          subsection="Kindly enter the details below to activate beneficiary ."
        />
      )}
    </div>
  );
};

export default TopCards;
