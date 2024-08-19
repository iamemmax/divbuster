import { Button, ErrorModal } from "@/components/core";
import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/core/DialogClone";
import { SmallSpinner } from "@/icons/core";
import { useErrorModalState } from "@/hooks";
import { useCreateReferralPlanRequest } from "@/app/(main)/misc/components/insurance/api/referral/createReferralPlan";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useCreateBeneficiaryPlanRequest } from "@/app/(dashboard)/dashboard/api/payment/createBeneficairyPlan";
import { useCreateIndividualPlanRequest } from "@/app/(dashboard)/dashboard/api/payment/createIndividualPlan";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
interface prop {
  setShowPaymentConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  showPaymentConfirmation: boolean;
  planType: {
    phone_number: string;
    duration: string;
    amount: string;
    number_of_recipient: string;
    play_type: string;
  };
  setSelectPlanModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPaymentData: React.Dispatch<
    React.SetStateAction<{
      account_name: string;
      account_no: string;
      amount: string;
      bank_name: string;
      paystack_link: string;
    }>
  >;
  setShowPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
}
interface successProp {
  amount: string;
  account_no: string;
  bank_name: string;
  paystack_link: string;
  message: string;
}
const ConfirmPayment = ({
  setShowPaymentConfirmation,
  showPaymentConfirmation,
  planType,
  setPaymentData,
  setShowPaymentModal,
  setSelectPlanModal,
}: prop) => {
  const [errorMsg, setErrorMsg] = useState("");

  const {
    isErrorModalOpen,
    setErrorModalState,
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { mutate: handleCreatePlan, isLoading } =
    useCreateIndividualPlanRequest();
  const { mutate: handleCreateBeneficiaryPlan, isLoading:loadBeneficiary } = useCreateBeneficiaryPlanRequest();
  //   const router = useRouter();
const {data:users}  = useUser()
console.log(users);

  const handlePayment = () => {
    if(planType?.play_type === "INDIVIDUAL"){
      handleCreatePlan(
        {
        plan_duration:planType?.duration,
        userId:users?.id as string,
        plan_type:planType?.play_type
        },
        {
          onSuccess: (data: successProp) => {
            if (data?.message) {
              setErrorMsg(data?.message);
              openErrorModalWithMessage(String(data?.message));
            } else {
              setPaymentData({
                account_name: "",
                account_no: data?.account_no,
                amount: data?.amount,
                bank_name: data?.bank_name,
                paystack_link: data?.paystack_link,
              });
              setShowPaymentModal(true);
              setSelectPlanModal(false);
            }
          },
          onError: (error) => {
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            setErrorMsg(error?.response?.data?.error);
  
            openErrorModalWithMessage(String(errorMessage));
          },
        }
      );

    }else{
      handleCreateBeneficiaryPlan(
        {
          duration: Number(planType?.duration),
          phone_number: planType?.phone_number,
          number_of_recipient: Number(planType?.number_of_recipient),
          packages: planType?.play_type,
        },
        {
          onSuccess: (data: successProp) => {
            if (data?.message) {
              setErrorMsg(data?.message);
              openErrorModalWithMessage(String(data?.message));
            } else {
              setPaymentData({
                account_name: "",
                account_no: data?.account_no,
                amount: data?.amount,
                bank_name: data?.bank_name,
                paystack_link: data?.paystack_link,
              });
              setShowPaymentModal(true);
              setSelectPlanModal(false);
            }
          },
          onError: (error) => {
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            setErrorMsg(error?.response?.data?.error);
  
            openErrorModalWithMessage(String(errorMessage));
          },
        }
      );
    }
    // console.log("123");
  };
  return (
    <>
      <Dialog
        open={showPaymentConfirmation}
        // onOpenChange={setSixMonthIndividualPlanModal}
      >
        <DialogContent className="!overflow-hidden min-h-[30rem]  max-w-[98%]  w-[26rem]  ">
          <DialogBody className="bg-[#141B3f]  w-[26rem] max-w-[98%] rounded-[1.125rem] border-[0.01px] border-[#407BFF]  border-opacity-50">
            <div className="py-1 ">
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

              {/* <div className="flex justify-center items-center w-full mt-[1rem]">
                <p className="text-xl  'font-DMSans' font-semibold text-[#fff]">
                  Deduction Acknowledgment.
                </p>
              </div> */}

              <div className="text-center px-7 mt-[0.65rem] ">
                <p className="text-xs text-[#94a3b8] font-normal 'font-DMSans' ">
                  You have selected {planType?.duration} months health cover.{" "}
                  <br /> A monthly premium of
                  <span className="text-white px-1 font-semibold">
                    {" "}
                    {planType?.amount ?? 0 + " "}{" "}
                  </span>
                </p>
              </div>

              {/* <div className="bg-[#272D4A] mt-[2.5rem] w-full flex items-center justify-center">
                <div className="">
                  <p className="text-[#fff] py-[1rem] text-xs font-medium 'font-DMSans' ">
                    This also qualifies you for the lifestyle reward of N5m,
                  </p>
                </div>
              </div> */}
              <div className="w-full flex justify-center items-center gap-[1rem] py-4 mt-[2rem] text-sm">
                <Button
                  variant={"outlined"}
                  className="rounded-3xl border-[0.3px] border-white border-opacity-70 text-[#fff]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
                  onClick={() => {
                    setShowPaymentConfirmation(false);
                  }}
                >
                  Decline
                </Button>

                <Button
                  className="rounded-3xl bg-[#fff] gap-x-2 flex items-center justify-center text-[#1B1687]   py-[0.9rem] w-[12rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
                  onClick={handlePayment}
                >
                  Agree & Proceed {isLoading && <SmallSpinner color="blue" />}
                </Button>
              </div>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage ||
          errorMsg ||
          "Please check your inputs and try again."
        }
      ></ErrorModal>
    </>
  );
};

export default ConfirmPayment;
