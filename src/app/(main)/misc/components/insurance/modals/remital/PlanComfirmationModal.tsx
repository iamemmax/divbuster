import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
} from "@/components/core/DialogClone";
import { useCreatePlanRequest } from "../../api/remital/createPlan";
import { SmallSpinner } from "@/icons/core";

interface prop {
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  planData: {
    plan_type: string;
    plan_duration: string;
    plan_amount: number;
    type: string;
    duration: number;
  };
  verifiedPhoneNumber: string;
  showConfirmation: true;
}

interface successMsgType {
  id: string;
  enrolee: string;
  plan_type: string;
  plan_duration: string;
  is_active: boolean;
  medi_response: null;
  payment_response: null;
  amount_paid: number;
  is_deleted: boolean;
  date_created: string;
  date_updated: string;
}

const PlanComfirmationModal = ({
  planData,
  showConfirmation,
  setShowConfirmation,
  setShowPaymentModal,
  verifiedPhoneNumber,
}: prop) => {
  const { mutate: handleCreatePlan, isLoading } = useCreatePlanRequest();
  const handleSubmit = () => {
    handleCreatePlan(
      {
        verifiedPhoneNumber,
        plan_type: planData?.type,
        plan_duration: planData?.plan_duration,
      },
      {
        onSuccess: (data: successMsgType) => {
          setShowPaymentModal(true);
          setShowConfirmation(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={showConfirmation}
      // onOpenChange={setSixMonthIndividualPlanModal}
    >
      <DialogContent className="!overflow-hidden !border max-sm:w-[97%] !border-[#407BFF]">
        <DialogBody className="bg-[#141B3f] px-6 w-full rounded-[1.125rem] border-[0.01px] border-[#407BFF]  border-opacity-50">
          <div className="py-1 px-6">
            <div className="flex items-center justify-center w-full">
              <svg
                width={101}
                height={101}
                viewBox="0 0 101 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width={100.32} height={100.32} rx={50.16} fill="#fff" />
                <path
                  d="M47 34a3 3 0 0 1 6 0v22a3 3 0 0 1-6 0zm0 32a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
                  stroke="#1B1687"
                  strokeWidth={2}
                />
              </svg>
            </div>

            <div className="flex justify-center items-center w-full mt-[1rem]">
              <p className="text-sm md:text-xl font-sans font-semibold text-[#fff]">
                {planData?.plan_type} Individual Plan
              </p>
            </div>

            <div className="w-full flex justify-center items-center">
              <p className="text-xs md:text-sm text-[#94a3b8] font-normal text-center font-sans ">
                You have selected {planData?.plan_type} health cover. <br /> A
                monthly premium of{" "}
                <span className="text-white">₦{planData?.plan_amount}</span>
              </p>
            </div>

            <div className="w-full flex items-center justify-center gap-[0.3rem]">
              <p className=" text-sm font-normal  text-[#94a3b8] font-sans">
                {/* {subdescription} */}
              </p>
              {/* <p className="text-[#fff]">{amount}</p> */}
            </div>

            <div className="w-full flex justify-center items-center gap-[1rem] mt-[4rem] text-sm mb-[1.5rem]">
              <button
                className="rounded-3xl border-[0.3px] text-[#fff]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
                onClick={() => {
                  setShowConfirmation(false);
                }}
              >
                Decline
              </button>

              <button
                className="rounded-3xl bg-[#fff] text-[#1B1687] flex justify-center items-center gap-4 py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none "
                onClick={handleSubmit}
              >
                Accept
                {isLoading && <SmallSpinner className="" color="#1B1687" />}
              </button>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default PlanComfirmationModal;
