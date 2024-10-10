"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ErrorModal,
  FormError,
} from "@/components/core";
import { RightUpArrow, SmallSpinner } from "@/icons/core";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Input2 } from "@/components/core/Input2";
import { formatAxiosErrorMessage, formatCurrency } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCreateReferralPlanRequest } from "../../api/referral/createReferralPlan";
import { useCreateReferralBeneficiaries } from "../../api/referral/createReferralBeneficies";
import { tokenStorage } from "@/app/(auth)/(onboarding)/misc";

interface Prop {
  setOpenCheckPhoneNumberModal: React.Dispatch<SetStateAction<boolean>>;
  openCheckPhoneNumberModal: boolean;
  planType: {
    duration: string;
    amount: string;
    number_of_recipient: string;
    play_type: string;
  };
  setShowReferralPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setPaymentData: React.Dispatch<
    React.SetStateAction<{
      account_name: string;
      account_no: string;
      amount: string;
      bank_name: string;
      paystack_link: string;
      phone_number: string;
    }>
  >;
}

interface successProp {
  account_name: string;
  amount: string;
  account_no: string;
  bank_name: string;
  paystack_link: string;
  message: string;
  phone_number: string;
}
export interface BeneFicairySuccess {
  account_no: string;
  bank_name: string;
  account_name: string;
  paystack_link: string;
  message: string;
  unique_request_id: string;
  plan_details: Plandetails;
  phone_number: string;
  redirect_to_paystack: string;
}

interface Plandetails {
  plan_duration: number;
  total_price: number;
  price: number;
}
const contactSchema = z.object({
  phone_number: z
    .string({ required_error: "Enter your phone number" })
    .trim()
    .min(10, {
      message: "Phone number ssetShowPaymentModalhould be at least 11 digits",
    })
    .max(11),

  referral_code: z
    .string({ required_error: "Enter your phone number" })
    .trim()
    .optional(),
});

export type detailRequestType = z.infer<typeof contactSchema>;

const AddRemitalPhoneNumer = ({
  openCheckPhoneNumberModal,
  setOpenCheckPhoneNumberModal,
  setShowReferralPayment,
  setPaymentData,
  planType,
}: Prop) => {
  const aprokoReferral = tokenStorage.getReferral();
  const search = useSearchParams();
  const myReferral = search?.get("referral_code");
  const { name } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<detailRequestType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone_number: "",
      referral_code: String(aprokoReferral) || myReferral || String(name) || "",
    },

    mode: "onChange",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const {
    isErrorModalOpen,
    setErrorModalState,
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { mutate: handleCreatePlan, isLoading } =
    useCreateReferralPlanRequest();
  const { mutate: handleCreateBeneficiariesPlan, isLoading: LoadinBene } =
    useCreateReferralBeneficiaries();
  const router = useRouter();

  const onsubmit = (data: detailRequestType) => {
    // console.log("123");

    if (planType?.play_type === "INDIVIDUAL") {
      handleCreatePlan(
        {
          duration: Number(planType?.duration),
          phone_number: data?.phone_number,
          number_of_recipient: 1,
          packages: planType?.play_type,
          referral_code: myReferral as string,
        },
        {
          onSuccess: (data: successProp) => {
            if (data?.message) {
              setErrorMsg(data?.message);
              openErrorModalWithMessage(String(data?.message));
            } else {
              setPaymentData({
                account_name: data?.account_name,
                account_no: data?.account_no,
                amount: formatCurrency(Number(data?.amount)),
                bank_name: data?.bank_name,
                paystack_link: data?.paystack_link,
                phone_number: data?.phone_number,
              });
              setShowReferralPayment(true);
              setOpenCheckPhoneNumberModal(false);
              tokenStorage.clearReferral();
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
          phone_number: data?.phone_number,
          number_of_recipient: Number(planType?.number_of_recipient),
          packages: planType?.play_type,
          referral_code: myReferral as string,
        },
        {
          onSuccess: (data: BeneFicairySuccess) => {
            if (data?.message) {
              setErrorMsg(data?.message);
              openErrorModalWithMessage(String(data?.message));
            } else {
              setPaymentData({
                account_name: data?.account_name,
                amount: formatCurrency(Number(data?.plan_details?.price)),
                account_no: data?.account_no,
                bank_name: data?.bank_name,
                paystack_link: data?.paystack_link,
                phone_number: data?.phone_number,
              });
              if (data?.redirect_to_paystack) {
                router.push(data?.paystack_link);
              } else {
                setShowReferralPayment(true);
              }

              setOpenCheckPhoneNumberModal(false);
              tokenStorage.clearReferral();
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
    <div className="!z-[99999999999999999999999999999999999]">
      {/* <ClientOnly> */}
      <Dialog
        open={openCheckPhoneNumberModal}
        //   onOpenChange={()=>setOpenCheckPhoneNumberModal(true)}
      >
        <DialogTrigger className="bg-white text-black flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-7 rounded-full max-w-max font-display">
          Get insurance
          <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
            <RightUpArrow className="" width={12} height={12} />
          </span>
        </DialogTrigger>

        <DialogContent className="!overflow-hidden ">
          <DialogHeader className="bg-[#1B1687] ">
            <DialogTitle className="text-[#fff]">Phone Number</DialogTitle>

            <DialogClose
              className="rounded-full"
              onClick={() => setOpenCheckPhoneNumberModal(false)}
            >
              <button>Close</button>
            </DialogClose>
          </DialogHeader>

          <DialogBody className="bg-[#151D42] w-full ">
            <div className="">
              <p className="text-sm font-medium text-white font-sans">
                Enter your enrollment number.
              </p>
              <form className="mt-8" onSubmit={handleSubmit(onsubmit)}>
                <div className="w-full mt-[1rem] text-sm font-normal">
                  <Label
                    className="mb-1 block text-xs  text-[#fff]"
                    htmlFor="phone"
                  >
                    Phone Number
                  </Label>

                  <div className={`relative mt-[.25rem] `}>
                    <Input2
                      className={`${errors?.phone_number?.message ? "border border-red-700" : ""} h-12 rounded-lg text-[#fff]`}
                      placeholder="Enter your phone number"
                      type="number"
                      id="phone"
                      maxLength={11} // Changed max to maxLength
                      {...register("phone_number")}
                    />

                    {/* {isLoading && (
                        <div className=" absolute top-[1.3rem] transform -translate-y-1/2 right-[1rem]">
                          <SmallSpinner className="" color="#fff" />
                        </div>
                      )} */}
                  </div>
                </div>
                <div
                  className={`${myReferral || name ? "hidden" : ""} w-full mt-[2rem] text-sm font-normal`}
                >
                  <Label
                    className="mb-1 block text-xs  text-[#fff]"
                    htmlFor="code"
                  >
                    Referral Code (Optional)
                  </Label>

                  <div className={`relative mt-[.25rem] `}>
                    <Input2
                      className={`${errors?.referral_code?.message ? "border border-red-700" : ""} h-12 rounded-lg text-[#fff]`}
                      placeholder="Enter code"
                      type="text"
                      id="code"
                      {...register("referral_code")}
                    />
                  </div>
                </div>

                <div className="pb-[2rem]">
                  <Button
                    className=" mt-[3rem] flex items-center justify-center gap-x-2 font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
                                      shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                    type="submit"
                  >
                    Continue{" "}
                    {(isLoading || LoadinBene) && (
                      <SmallSpinner className="" color="blue" />
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
      {/* </ClientOnly> */}

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
  );
};

export default AddRemitalPhoneNumer;
