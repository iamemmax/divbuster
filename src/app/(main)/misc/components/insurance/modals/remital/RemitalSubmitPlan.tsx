"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
} from "@/components/core/DialogClone";
import { useCreatePlanRequest } from "../../api/remital/createPlan";
import { SmallSpinner } from "@/icons/core";
import { useMakeRemitalPayment } from "../../api/remital/remitalpayment";
import Link from "next/link";
import { Button, ErrorModal, LinkButton } from "@/components/core";
import { useErrorModalState } from "@/hooks";
import {
  formatAxiosErrorMessage,
  formatCurrency,
  removeCommaFromPrice,
} from "@/utils";
import { AxiosError } from "axios";
import PlanComfirmationModal from "./PlanComfirmationModal";
import PlanPayment from "./PlanPayment";
import { useRouter } from "next/navigation";
import { useCreateReferralBeneficiaries } from "../../api/referral/createReferralBeneficies";
import { BeneFicairySuccess } from "../referral/AddReferralPhoneNumber";
import { tokenStorage } from "@/app/(auth)/(onboarding)/misc";

interface prop {
  setShowSubmitModal: React.Dispatch<React.SetStateAction<boolean>>;
  verifiedPhoneNumber: string;
  showSubmitModal: boolean;
  planType: {
    duration: number;
    amount: string;
    userId: string;
    play_type: string;
    number_of_recipient: number;
  };
}

export interface PaymentSuccessMsg {
  message?: string;
  account_name: string;
  account_no: string;
  bank_name: string;
  wallet_balance?: string;
  unique_request_id?: string;
  paystack_link: string;
  amount: number;
  phone_number: string;

  "user:"?: User;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  organization: null;
  gender: string;
  has_set_password: boolean;
  hospitals: Hospitals;
  phone_verified: boolean;
  nin: string;
  email: string;
  address: string;
}

interface Hospitals {
  state: string;
  region: string;
  hospital: string;
  provider_id: string;
}

const RemitalSubmitPlanModal = ({
  setShowSubmitModal,
  showSubmitModal,
  verifiedPhoneNumber,
  planType,
}: prop) => {
  const { mutate: handlePaymentRequest, isLoading } = useMakeRemitalPayment();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ConfirmationMessage, setConfirmationMessage] = useState("");
  const [PaymentInfo, setPaymentInfo] = useState<PaymentSuccessMsg>();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [checkUserHasPassword, setCheckUserHasPassword] = useState<boolean>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { mutate: handleCreateBeneficiariesPlan, isLoading: LoadinBene } =
    useCreateReferralBeneficiaries();
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const router = useRouter();
  const handlePayment = () => {
    if (planType?.play_type === "INDIVIDUAL") {
      handlePaymentRequest(
        {
          duration: planType?.duration,
          userId: planType?.userId,
          plan_type: planType?.play_type,
          number_of_recipient: Number(planType?.number_of_recipient),
        },
        {
          onSuccess: (data: PaymentSuccessMsg) => {
            if (data?.message) {
              setErrorMsg(data?.message);
              openErrorModalWithMessage(String(data?.message));
            } else {
              setPaymentInfo({
                account_name: data?.account_name,
                account_no: data?.account_no,
                amount: data?.amount,
                bank_name: data?.bank_name,
                paystack_link: data?.paystack_link,
                phone_number: data?.phone_number,
              });
              setShowPaymentModal(true);
              tokenStorage.clearReferral()

              // setOpenShowRemitalPlan(false);
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
    } else {
      handleCreateBeneficiariesPlan(
        {
          duration: Number(planType?.duration),
          phone_number: verifiedPhoneNumber,
          number_of_recipient: Number(planType?.number_of_recipient),
          packages: planType?.play_type,
          referral_code: ""
        },
        {
          onSuccess: (data: BeneFicairySuccess) => {
            if (data?.message) {
              setErrorMsg(data?.message);
              openErrorModalWithMessage(String(data?.message));
            } else {
              setPaymentInfo({
                account_name: data?.account_name,
                amount: Number(
                  formatCurrency(Number(data?.plan_details?.price))
                ),
                account_no: data?.account_no,
                bank_name: data?.bank_name,
                paystack_link: data?.paystack_link,
                phone_number: data?.phone_number,
              });
              setShowPaymentModal(true);
              tokenStorage.clearReferral()

              // setOpenCheckPhoneNumberModal(false);
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
  };
  return (
    <>
      <Dialog
        open={showSubmitModal}
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

              <div className="flex justify-center items-center w-full mt-[1rem]">
                <p className="text-xl  'font-DMSans' font-semibold text-[#fff]">
                  Deduction Acknowledgment.
                </p>
              </div>

              <div className="text-center px-7 mt-[0.65rem] ">
                <p className="text-xs text-[#94a3b8] font-normal 'font-DMSans' ">
                  Kindly know that a{" "}
                  <span className="text-white px-1 font-semibold">
                    {" "}
                    ₦ {planType?.amount ?? 0 + " "}{" "}
                  </span>
                  monthly premium will be auto-deducted from your salary for
                  your health insurance package.
                </p>
              </div>

              <div className="bg-[#272D4A] mt-[2.5rem] w-full flex items-center justify-center">
                <div className="">
                  <p className="text-[#fff] py-[1rem] text-xs font-medium 'font-DMSans' ">
                    This also qualifies you for the lifestyle reward of N5m,
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center items-center gap-[1rem] py-4 mt-[2rem] text-sm">
                <Button
                  variant={"outlined"}
                  className="rounded-3xl border-[0.3px] border-white border-opacity-70 text-[#fff]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
                  onClick={() => {
                    setShowSubmitModal(false);
                  }}
                >
                  Decline
                </Button>

                <Button
                  className="rounded-3xl bg-[#fff] gap-x-2 flex items-center justify-center text-[#1B1687] py-[0.9rem] w-[12rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
                  onClick={handlePayment}
                >
                  Agree & Proceed
                  {(isLoading || LoadinBene) && <SmallSpinner color="blue" />}
                </Button>
              </div>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
      {showConfirmation && (
        <PlanComfirmationModal
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          ConfirmationMessage={ConfirmationMessage}
          setShowPaymentModal={setShowPaymentModal}
          checkUserHasPassword={checkUserHasPassword}
        />
      )}
      {showPaymentModal && (
        <PlanPayment
          showPaymentModal={showPaymentModal}
          setShowPaymentModal={setShowPaymentModal}
          userId={planType?.userId}
          PaymentInfo={PaymentInfo}
          setShowSuccessModal={setShowSuccessModal}
          planType={planType}
        />
      )}
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

export default RemitalSubmitPlanModal;
