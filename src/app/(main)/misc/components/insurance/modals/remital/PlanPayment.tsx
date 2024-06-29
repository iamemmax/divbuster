import React from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
} from "@/components/core/DialogClone";
import { useMakeRemitalPayment } from "../../api/remital/remitalpayment";
import { SmallSpinner } from "@/icons/core";

interface Prop {
  setShowPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  showPaymentModal: boolean;
  verifiedPhoneNumber: string;
  planData: {
    plan_type: string;
    plan_duration: string;
    plan_amount: number;
    type: string;
    duration: number;
  };
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlanPayment = ({
  setShowPaymentModal,
  showPaymentModal,
  planData,
  verifiedPhoneNumber,
  setShowSuccessModal,
}: Prop) => {
  const { mutate: handlePaymentRequest, isLoading } = useMakeRemitalPayment();
  const handlePayment = () => {
    handlePaymentRequest(
      {
        amount: planData?.plan_amount,
        duration: planData?.duration,
        verifiedPhoneNumber,
      },
      {
        onSuccess: (data) => {
          console.log(data);
        },
      }
    );
    setShowSuccessModal(true);
    setShowPaymentModal(false);
  };
  return (
    <div>
      <Dialog open={showPaymentModal}>
        <DialogContent className="!overflow-hidden md:w-[26.0625rem] border-opacity-70 border border-[#407BFF]">
          <DialogBody className="bg-[#141B3f]  w-full border-[0.01px] border-opacity-70 border-[#407BFF]">
            <div className="py-1 pb-4">
              <div className="">
                <div className="flex items-center justify-center w-full">
                  <svg
                    width={101}
                    height={101}
                    viewBox="0 0 101 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width={100.32}
                      height={100.32}
                      rx={50.16}
                      fill="#fff"
                    />
                    <path
                      d="M47 34a3 3 0 0 1 6 0v22a3 3 0 0 1-6 0zm0 32a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
                      stroke="#1B1687"
                      strokeWidth={2}
                    />
                  </svg>
                </div>

                <div className="flex justify-center items-center w-full mt-[1rem]">
                  <p className="text-xl  'font-DMSans' font-semibold text-[#fff]">
                    Deduction Acknowledgment.
                  </p>
                </div>

                <div className="text-center px-[3rem] mt-[0.65rem] ">
                  <p className="text-xs text-[#94a3b8] font-normal 'font-DMSans' ">
                    Kindly know that a
                    <span className="pl-1 text-white font-bold">
                      ₦{planData?.plan_amount}
                    </span>{" "}
                    monthly premium will be auto-deducted from your salary for
                    your health insurance package.
                  </p>
                </div>

                <div className="bg-[#272D4A] mt-[2.1875rem] w-full flex items-center justify-center">
                  <div className="">
                    <p className="text-[#fff] py-[1rem] text-xs font-medium 'font-DMSans' ">
                      This also qualifies you for the lifestyle reward of N5m,
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center items-center  gap-[1rem] mt-[1rem] text-sm">
                <button
                  className="rounded-3xl border-[0.3px] text-[#fff]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
                  onClick={() => {
                    setShowPaymentModal(false);
                  }}
                >
                  Decline
                </button>

                <button
                  className="rounded-3xl bg-[#fff] flex justify-center items-center gap-x-2 text-[#1B1687]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
                  onClick={handlePayment}
                >
                  Agree & Proceed
                  {isLoading && <SmallSpinner className="" color="#1B1687" />}
                </button>
              </div>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlanPayment;
