import React, { useState } from "react";
import FamilyUserIcon from "./icons/UserIcon";
import { Spinner } from "@/icons/core";
import { Button, LinkButton } from "@/components/core";
import { UserDataTypes } from "@/app/(auth)/(onboarding)/misc";
import { beneficiaryTypeProp } from "../plans/api/fetchBeneficairies";
import BuyPlanModalForCoperate from "../plans/coperate/BuyPlanForCoperate";
import UpdateUserAccount from "../beneficiary/UpdateUserAccount";
interface Prop {
  userData: UserDataTypes | undefined;
  loadinUser: boolean;
  loadingBeneficial: boolean;
  beneficiaryList: beneficiaryTypeProp[] | undefined;
}
const CorporateCard = ({
  loadinUser,
  userData,
  loadingBeneficial,
  beneficiaryList,
}: Prop) => {
  const [buyPlanForCoporate, setBuyPlanForCoporate] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false)
  
  const checkCorporatePaymentStatus =
    userData?.paid_beneficiary_requests?.includes("CORPORATE");
    const NoUser = userData?.first_name === "" || userData?.first_name===null &&  userData?.last_name ==="" || userData?.last_name===null

  return (
    <div className="bg-white rounded-10 p-1">
      {loadingBeneficial || loadinUser ? (
        <div className="flex justify-center h-full items-center w-full py-6">
          <Spinner className="w-4  h-4 " color="#DB8C00" />
        </div>
      ) : (
        <div className="bg-[#FFFAF0] h-full justify-center flex flex-col shadow-sm rounded-10  px-6 py-[.875rem] ">
          <div className="">
            <div className="flex items-center gap-x-1">
              <FamilyUserIcon backgroundColor="#FFF2D9" color="#DB8C00" />
              <h2 className="text-sm font-semibold font-sans  text-[#DB8C00]">
                Corporate
              </h2>
            </div>

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
              {checkCorporatePaymentStatus ? (
                <Button
                  // variant={"outlined"}
                  className="bg-[#DB8C00] rounded-md py-[.4375rem]  px-[.625rem] text-[#fff] text-[.625rem]"
                  onClick={() =>{
                    NoUser?setShowUserDetailsModal(true):setBuyPlanForCoporate(true)
                  }}
                >
                  Add Member
                </Button>
              ) : (
                <Button
                  // variant={"outlined"}
                  className="bg-[#DB8C00] rounded-md py-[.4375rem]  px-[.625rem] text-[#fff] text-[.625rem]"
                  onClick={() =>{
                    NoUser?setShowUserDetailsModal(true):setBuyPlanForCoporate(true)
                  }}
                >
                  Buy Plan
                </Button>
              )}
              <LinkButton
                href={"/dashboard/corporate-beneficiaries"}
                className="bg-[#FFE9BC] rounded-md py-[.4375rem]  px-[.8125rem] text-[#DB8C00] text-[.625rem]"
                // onClick={() => setBuyPlan(true)}
              >
                View
              </LinkButton>
            </div>
          </div>
        </div>
      )}

      {buyPlanForCoporate && (
        <BuyPlanModalForCoperate
          heading="Beneficiary Details"
          isBuyPlanModalOpen={buyPlanForCoporate}
          setBuyPlanModal={setBuyPlanForCoporate}
          subsection="Kindly enter the details below to activate beneficiary ."
        />
      )}
        {showUserDetailsModal && <UpdateUserAccount
      openUpdateDetails={showUserDetailsModal}
      setOpenUpdateDetails={setShowUserDetailsModal}
      // planType="corporate"
      setOpenPlanModal={setBuyPlanForCoporate}
      userData={userData}
      />}
    </div>
  );
};

export default CorporateCard;
