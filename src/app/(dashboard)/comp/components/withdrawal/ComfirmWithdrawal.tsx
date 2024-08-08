"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ClientOnly,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // Select,
  // SelectContent,
  // SelectItem,
  // SelectTrigger,
  // SelectValue,
  FormError,
  ErrorModal,
  Button,
} from "@/components/core";

import { SmallSpinner, Spinner } from "@/icons/core";
import {
  capitalizeFirstLetter,
  formatAxiosErrorMessage,
  formatCurrency,
} from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";

import { useVerifyAccountNumber } from "@/app/(dashboard)/dashboard/api/withdrawal/verifyAcctNumber";
import { useWithdrawalReferral } from "@/app/(dashboard)/dashboard/api/withdrawal/withdrawal";
import { useQueryClient } from "react-query";
import { removeCommas } from "@/utils/numbers";

interface Prop {
  setshowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setshowWithdrawalSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmationModal: boolean;
  referralWalletBalance: string | undefined;
  setshowWithdrawalModal: React.Dispatch<React.SetStateAction<boolean>>;

  watchAct: {
    amount: string;
    account_number: string;
    bank_code: string;
    narration?: string | undefined;
  };
  account_name: string;
  seletedBankName: string;
}

interface verifySuccessdata {
  account_number: string;
  account_name: string;
  bank_id: number;
  bank_code: string;
}

const ConfirmWidthrawal = ({
  setshowConfirmationModal,
  showConfirmationModal,
  watchAct,
  referralWalletBalance,
  account_name,
  seletedBankName,
  setshowWithdrawalSuccessModal,
  setshowWithdrawalModal,
}: Prop) => {
  const [errorMsg, setErrorMsg] = useState("");

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const { mutate: handleWithdrawal, isLoading } = useWithdrawalReferral();
  // const queryClient = fetch - wallet - balance;
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    handleWithdrawal(
      {
        account_name,
        account_number: watchAct?.account_number,
        amount: Number(watchAct?.amount),
        bank_code: watchAct?.bank_code,
        bank_name: seletedBankName,
        narration: watchAct?.narration as string,
      },
      {
        onSuccess: (data: verifySuccessdata) => {
          //   setBuyPlanModal;
          queryClient.invalidateQueries(["fetch-wallet-balance"]);
          setshowWithdrawalSuccessModal(true);
          // setshowWithdrawalModal(false);
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
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="rounded-xl">
          <Dialog open={showConfirmationModal}>
            <DialogContent className="!overflow-hidden">
              <DialogHeader className="bg-[#1B1687] 'font-DMSans' font-medium text-[#fff] text-base">
                <DialogTitle className="'font-DMSans' font-medium text-[#fff]">
                  Confirm Details
                </DialogTitle>
                <DialogClose
                  className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]"
                  onClick={() => setshowConfirmationModal(false)}
                >
                  <button>Close</button>
                </DialogClose>
              </DialogHeader>

              <DialogBody className="bg-[#141B3f] w-full">
                <div className="flex items-center gap-x-1 mt-3">
                  <p className="text-white text-sm text-opacity-75">
                    Referral Wallet :
                  </p>{" "}
                  <h2 className="text-white font-bold text-xl">
                    ₦{referralWalletBalance ?? 0}
                  </h2>
                </div>
                <div className="bg-[#282d4a] w-full p-6 mt-3 rounded-2xl space-y-4">
                  <div className="flex items-center  w-full">
                    <p className="text-white text-opacity-60 w-[9rem] ">
                      Account name
                    </p>
                    <p className="text-white font-medium text-sm font-display capitalize">
                      {capitalizeFirstLetter(account_name)}
                    </p>
                  </div>
                  <div className="flex items-center  w-full">
                    <p className="text-white text-opacity-60 w-[9rem] ">
                      Bank name
                    </p>
                    <p className="text-white font-medium text-sm font-display capitalize">
                      {capitalizeFirstLetter(seletedBankName)}
                    </p>
                  </div>
                  <div className="flex items-center  w-full">
                    <p className="text-white text-opacity-60 w-[9rem] ">
                      Account no
                    </p>
                    <p className="text-white font-medium text-sm font-display capitalize">
                      {capitalizeFirstLetter(watchAct?.account_number)}
                    </p>
                  </div>
                  <div className="flex items-center  w-full">
                    <p className="text-white text-opacity-60 w-[9rem] ">
                      Amount
                    </p>
                    <p className="text-white font-medium text-sm font-display capitalize">
                      {capitalizeFirstLetter(
                        formatCurrency(
                          Number(removeCommas(String(watchAct?.amount)))
                        )
                      )}
                    </p>
                  </div>
                  <div className="flex items-center  w-full">
                    <p className="text-white text-opacity-60 w-[9rem] ">
                      Narration
                    </p>
                    <p className="text-white font-medium text-sm font-display capitalize">
                      {capitalizeFirstLetter(watchAct?.narration ?? "")}
                    </p>
                  </div>
                </div>

                <div className="pb-[2rem]">
                  <Button
                    className="mt-[3.5rem] flex items-center  gap-x-5 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-4 font-semibold tracking-wide
                                            shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Withdraw {isLoading && <SmallSpinner color="blue" />}{" "}
                  </Button>
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
        </div>
      )}
    </>
  );
};

export default ConfirmWidthrawal;
