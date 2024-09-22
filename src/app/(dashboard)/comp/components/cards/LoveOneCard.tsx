import React, { useState } from "react";
import FamilyUserIcon from "./icons/UserIcon";
import { Spinner } from "@/icons/core";
import { Button, LinkButton } from "@/components/core";
import { UserDataTypes } from "@/app/(auth)/(onboarding)/misc";
import { beneficiaryTypeProp } from "../plans/api/fetchBeneficairies";
import BuyPlanModalForCoperate from "../plans/coperate/BuyPlanForCoperate";
import BuyPlanModalForLovedOne from "../plans/loved-ones/BuyLovedOnePlan";
interface Prop {
  userData: UserDataTypes | undefined;
  loadinUser: boolean;
  loadingBeneficial: boolean;
  beneficiaryList: beneficiaryTypeProp[] | undefined;
  showViewButton?: boolean;
}
const LoveOneCard = ({
  loadinUser,
  userData,
  loadingBeneficial,
  beneficiaryList,
  showViewButton = true,
}: Prop) => {
  const [buyPlanForLovedOnes, setBuyPlanForLovedOnes] = useState(false);
  const checkLovedOnesPaymentStatus =
    userData?.paid_beneficiary_requests?.includes("LOVE_ONES");

  return (
    <div className="bg-white rounded-10 p-1">
      {loadingBeneficial || loadinUser ? (
        <div className="flex justify-center h-full items-center w-full py-6">
          <Spinner className="w-4  h-4 " color="#DB8C00" />
        </div>
      ) : (
        <div className=" bg-[#fbe0f3] h-full flex justify-center flex-col shadow-sm rounded-10  px-6 py-[.875rem] ">
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
              {checkLovedOnesPaymentStatus ? (
                <Button
                  // variant={"outlined"}
                  className="bg-[#E42EB1] rounded-md py-[.4375rem]  px-[.625rem] text-[#fff] text-[.625rem]"
                  onClick={() => setBuyPlanForLovedOnes(true)}
                >
                  Add More
                </Button>
              ) : (
                <Button
                  // variant={"outlined"}
                  className="bg-[#E42EB1] rounded-md py-[.4375rem]  px-[.625rem] text-[#fff] text-[.625rem]"
                  onClick={() => setBuyPlanForLovedOnes(true)}
                >
                  {" "}
                  Buy Plan
                </Button>
              )}
              {showViewButton && (
                <LinkButton
                  href={"/dashboard/loved-ones-beneficiaries"}
                  className="bg-[#f8c5e9] rounded-md py-[.4375rem]  px-[.8125rem] text-[#E42EB1] text-[.625rem]"
                  // onClick={() => setBuyPlan(true)}
                >
                  View
                </LinkButton>
              )}
            </div>
          </>
          {/* )} */}
        </div>
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

export default LoveOneCard;
