"use client";
import React, { useEffect, useState } from "react";
import ReferralModalPlan from "../misc/components/insurance/modals/referral/ReferralPlan";
import { useGetPlan } from "../misc/components/insurance/api/plan/getPlan";
import { Spinner } from "@/icons/core";



export interface PlanTypeTypes {
    duration: string;
    amount: string;
    number_of_recipient: string;
    play_type: string;
  }
  
  export interface PaymentDataType {
    account_name: string;
    account_no: string;
    amount: string;
    bank_name: string;
    paystack_link: string;
    phone_number: string;
  }
  
  
const Plan = () => {
  const [isReferralModalOpen, setReferralModalOpen] = useState(false);

  useEffect(() => {
    setReferralModalOpen(true); // Open modal when the component loads
  }, []);

  const { data: plansData, isLoading: loadingPlan } = useGetPlan();

  if (loadingPlan) return  // Handle loading state

  return (
    <div className="bg-[#151D42] w-full h-full">
    {loadingPlan?  <div className="flex justify-center bg-[#151D42] z-[999999999999] absolute inset-0 w-full h-full items-center">
  <Spinner color="white" />
</div> :
<>
{isReferralModalOpen && plansData && (
  <ReferralModalPlan
    userId=""
    openRemitalPlan={isReferralModalOpen}
    setOpenShowRemitalPlan={setReferralModalOpen}
    plansData={plansData}
    loadingPlan={loadingPlan}
  />
)}
</>
}


    </div>
  );
};

export default Plan;
