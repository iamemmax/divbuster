"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  FormError,
  ErrorModal,
  Button,
} from "@/components/core";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "react-query";
import { SmallSpinner, Spinner } from "@/icons/core";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { Input2 } from "@/components/core/Input2";
import Select from "react-select";
import { fetchBankList } from "@/app/(dashboard)/dashboard/api/withdrawal/fetchBankList";
import { useVerifyAccountNumber } from "@/app/(dashboard)/dashboard/api/withdrawal/verifyAcctNumber";
import ConfirmWidthrawal from "./ComfirmWithdrawal";

interface Prop {
  setshowWithdrawalModal: React.Dispatch<React.SetStateAction<boolean>>;
  showWithdrawalModal: boolean;
  referralWalletBalance: string | undefined;
  setshowWithdrawalSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setWithdrawalAmount: React.Dispatch<React.SetStateAction<string>>;
}

const formValues = z.object({
  bankData: z.object({
    bank_code: z.string().trim().min(1, { message: "Please select a bank." }),
    account_number: z
      .string()
      .min(9, { message: "Enter valid Account number" }),
    amount: z.string().min(1, { message: "Enter amount." }),
    narration: z.string().trim().optional(),
  }),
});

interface VerifySuccessData {
  account_number: string;
  account_name: string;
  bank_id: number;
  bank_code: string;
}

type FormValues = z.infer<typeof formValues>;

const WithDrawalModal = ({
  setshowWithdrawalModal,
  showWithdrawalModal,
  referralWalletBalance,
  setshowWithdrawalSuccessModal,
  setWithdrawalAmount,
}: Prop) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formValues),
    defaultValues: {
      bankData: {
        bank_code: "",
        account_number: "",
        amount: "",
        narration: "",
      },
    },
    mode: "onChange",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [showConfirmationModal, setshowConfirmationModal] = useState(false);

  const { data: bankList } = useQuery({
    queryFn: fetchBankList,
    queryKey: ["fetch-bank-list"],
  });

  const [isLoading, setIsLoading] = useState(false);
  const { mutate: handleVerifyAccount, isLoading: loadingSubmit } =
    useVerifyAccountNumber();
  const [accountName, setAccountName] = useState("");
  const [selectedBankName, setSelectedBankName] = useState("");
  const watchAct = useWatch({ name: "bankData", control });

  useEffect(() => {
    if (
      !accountName &&
      watchAct.bank_code &&
      watchAct?.account_number?.toString().length === 10
    ) {
      verifyAcct();
    } else {
      setAccountName("");
    }
  }, [watchAct?.account_number, watchAct?.bank_code]);

  const verifyAcct = () => {
    handleVerifyAccount(
      {
        account_number: String(watchAct.account_number),
        bank_code: watchAct.bank_code,
      },
      {
        onSuccess: (data: VerifySuccessData) => {
          setAccountName(data?.account_name);
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

  const onSubmit = () => {
    setshowConfirmationModal(true);
    const selectedBank = bankList?.find(
      (bank) => bank.cbn_code === watchAct.bank_code
    );
    setSelectedBankName(selectedBank?.name || "");
    setWithdrawalAmount(watchAct.amount);
  };

  const bankOptions = bankList?.map((bank) => ({
    value: bank.cbn_code,
    label: bank.name,
  }));

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      background: "#2a304f",
      height: "2.875rem",
      boxShadow: "none",
      color: "#fff",
    }),
    option: (provided: any) => ({
      ...provided,
      color: "#333",
      background: "#fff",
      "&:hover": {
        background: "#f0f0f0",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#fff",
      fontSize: "12px",
      textTransform: "capitalize",
    }),
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="rounded-xl">
          <Dialog open={showWithdrawalModal}>
            <DialogContent className="!overflow-hidden">
              <DialogHeader className="bg-[#1B1687] font-DMSans font-medium text-[#fff] text-base">
                <DialogTitle className="font-DMSans font-medium text-[#fff]">
                  Withdraw Funds
                </DialogTitle>
                <DialogClose
                  className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]"
                  onClick={() => setshowWithdrawalModal(false)}
                >
                  <button>Close</button>
                </DialogClose>
              </DialogHeader>
              <DialogBody className="bg-[#141B3f] w-full">
                <div className="py-1">
                  <div className="text-[#fff] font-light w-4/5 font-DMSans text-sm">
                    You are about to move money from your referral wallet to an
                    external account.
                  </div>
                </div>
                <div className="flex items-center gap-x-1 mt-6">
                  <p className="text-white text-sm text-opacity-75">
                    Referral Wallet :
                  </p>
                  <h2 className="text-white font-bold text-xl">
                    ₦{referralWalletBalance ?? 0}
                  </h2>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Label
                      className="mt-5 mb-1 block text-xs text-[#fff]"
                      htmlFor="State"
                    >
                      Select Bank
                    </Label>
                    <Controller
                      control={control}
                      name="bankData.bank_code"
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          value={bankOptions?.find((c) => c.value === value)}
                          options={bankOptions}
                          placeholder="Select Bank"
                          ref={ref}
                          onChange={(bankOption) => {
                            onChange(bankOption?.value);
                          }}
                          styles={style}
                          components={{
                            IndicatorSeparator: () => null,
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="w-full mt-[1rem] text-sm font-normal">
                    <Label
                      className="mb-1 block text-xs text-[#fff]"
                      htmlFor="account_number"
                    >
                      Account Number
                    </Label>
                    <div className="relative mt-[.25rem]">
                      <Input2
                        className={`${errors?.bankData?.account_number?.message ? "border border-red-700" : ""} text-[#fff] h-[2.875rem]`}
                        placeholder="Enter Account Number"
                        type="number"
                        maxLength={10}
                        id="account_number"
                        {...register("bankData.account_number")}
                      />
                    </div>
                    {loadingSubmit && (
                      <div className="py-3">
                        <SmallSpinner className="" color="#fff" />
                      </div>
                    )}
                    {accountName && (
                      <h2 className="mt-2 py-2 text-white font-bold">
                        {accountName}
                      </h2>
                    )}
                  </div>
                  <div className="w-full mt-[1rem] text-sm font-normal">
                    <Label
                      className="mb-1 block text-xs text-[#fff]"
                      htmlFor="amount"
                    >
                      Amount
                    </Label>
                    <div className="relative mt-[.25rem]">
                      <Input2
                        className={`${errors?.bankData?.amount?.message ? "border border-red-700" : ""} text-[#fff] h-[2.875rem]`}
                        placeholder="Enter amount"
                        type="number"
                        id="amount"
                        {...register("bankData.amount")}
                      />
                    </div>
                  </div>
                  <div className="w-full mt-[1rem] text-sm font-normal">
                    <Label
                      className="mb-1 block text-xs text-[#fff]"
                      htmlFor="narration"
                    >
                      Narration
                    </Label>
                    <div className="relative mt-[.25rem]">
                      <Input2
                        className={`${errors?.bankData?.narration?.message ? "border border-red-700" : ""} text-[#fff] h-[2.875rem]`}
                        placeholder="Enter narration"
                        type="text"
                        id="narration"
                        {...register("bankData.narration")}
                      />
                    </div>
                  </div>
                  <div className="pb-[2rem]">
                    <Button
                      className="mt-[3.5rem] flex items-center gap-x-5 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                      type="submit"
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </DialogBody>
            </DialogContent>
          </Dialog>
          <ErrorModal
            isErrorModalOpen={isErrorModalOpen}
            setErrorModalState={() => setErrorModalState(false)}
            subheading={
              errorModalMessage ||
              errorMsg ||
              "Please check your inputs and try again."
            }
          />
        </div>
      )}
      {showConfirmationModal && (
        <ConfirmWidthrawal
          showConfirmationModal={showConfirmationModal}
          setshowConfirmationModal={setshowConfirmationModal}
          watchAct={watchAct}
          account_name={accountName}
          referralWalletBalance={referralWalletBalance}
          seletedBankName={selectedBankName}
          setshowWithdrawalSuccessModal={setshowWithdrawalSuccessModal}
          setshowWithdrawalModal={setshowWithdrawalModal}
        />
      )}
    </>
  );
};

export default WithDrawalModal;
