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
  LinkButton,
} from "@/components/core";
import { RightUpArrow, SmallSpinner } from "@/icons/core";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Input2 } from "@/components/core/Input2";
import { useErrorModalState } from "@/hooks";
import { useRouter } from "next/navigation";
import { useCreateReferralPlanRequest } from "@/app/(main)/misc/components/insurance/api/referral/createReferralPlan";
import { formatAxiosErrorMessage, validatePhoneNumber } from "@/utils";
import { useCheckUserActivePlan } from "@/app/(main)/misc/components/insurance/api/plan/checkUserActiveHealthPlan";
import { AxiosError } from "axios";

interface Prop {
  setOpenCheckPhoneNumberModal: React.Dispatch<SetStateAction<boolean>>;
  openCheckPhoneNumberModal: boolean;
}

const contactSchema = z.object({
  phone_number: z
    .string({ required_error: "Enter your phone number" })
    .trim()
    .min(10, {
      message: "Phone number ssetShowPaymentModalhould be at least 11 digits",
    }),
});

export type detailRequestType = z.infer<typeof contactSchema>;

const CheckUserHasPlan = ({
  openCheckPhoneNumberModal,
  setOpenCheckPhoneNumberModal,
}: Prop) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<detailRequestType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone_number: "",
    },

    mode: "onChange",
  });

  const {
    isErrorModalOpen,
    setErrorModalState,
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const router = useRouter();
  const {mutate:handleCheck,isLoading}= useCheckUserActivePlan()

  const onsubmit = (data: detailRequestType) => {
    handleCheck({phone_number:data?.phone_number},{
        onSuccess:(data)=>{
if(data){
  window.open("https://hmo.heala.io/nemhmo", "_blank");
  setOpenCheckPhoneNumberModal(false)
}

        },
          onError: (error) => {
                const errorMessage = formatAxiosErrorMessage(error as AxiosError);
              
                openErrorModalWithMessage(String(errorMessage));
              },
    })
  };

  return (
    <div className="">
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
            <DialogTitle className="text-[#fff]">Check Plan Status</DialogTitle>

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
                Enter Phone number.
              </p>

              <form className="mt-8" onSubmit={handleSubmit(onsubmit)}>
                <div className="w-full mt-[1rem] text-sm font-normal">
                  <Label
                    className="mb-1 block text-xs  text-[#fff]"
                    htmlFor="phone"
                  >
                    {/* Phone Number */}
                  </Label>

                  <div className={`relative  `}>
                    <Controller
                      control={control}
                      name={`phone_number`}
                      render={({ field }) => (
                        <Input2
                          {...field}
                          className={`p-2 w-full h-[3rem] px-3 text-sm focus:outline-none rounded-[.625rem] outline-none text-white border-[.0187rem] ${errors?.phone_number ? "border border-red-700" : "border-[#C4C4C4]"}`}
                          id="account_no"
                          maxLength={11}
                          placeholder="Phone number"
                          type="text"
                          onChange={(e) => {
                            const validAcctNumber = validatePhoneNumber(
                              e.target.value
                            );
                            field.onChange(validAcctNumber); // Update only with validated value
                          }}
                          onKeyDown={(e) => {
                            // Prevent non-numeric keys (e.g., e, +, -, .)
                            if (
                              !/[0-9]/.test(e.key) &&
                              e.key !== "Backspace" &&
                              e.key !== "Delete" &&
                              e.key !== "ArrowLeft" &&
                              e.key !== "ArrowRight"
                            ) {
                              e.preventDefault();
                            }
                          }}
                          // onChange={(e) => field.onChange(e.target.value)}
                        />
                      )}
                    />

                    {/* {isLoading && (
                      <div className=" absolute top-[1.3rem] transform -translate-y-1/2 right-[1rem]">
                        <SmallSpinner className="" color="#fff" />
                      </div>
                    )} */}
                  </div>
                </div>

                <div className="pb-[2rem]">
                  <Button
                    className=" mt-[3rem] flex items-center h-12 justify-center gap-x-2 font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
                                    shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                    type="submit"
                  >
                    Continue{" "}
                    {isLoading && <SmallSpinner className="" color="blue" />}
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
          if(errorModalMessage === "User does not have an active plan"){
            router.push("/plan")
              setOpenCheckPhoneNumberModal(false)
          }
        }}
        subheading={
          errorModalMessage ||
          "Please check your inputs and try again."
        }
      >


      </ErrorModal>
    </div>
  );
};

export default CheckUserHasPlan;
