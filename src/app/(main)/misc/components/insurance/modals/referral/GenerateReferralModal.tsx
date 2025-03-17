import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  ErrorModal,
} from "@/components/core";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SmallSpinner, Spinner } from "@/icons/core";
import { useCreateReferral } from "../../api/referral/generateReferralCode";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";

interface Prop {
  setBuyPlanModal: React.Dispatch<React.SetStateAction<boolean>>;
  isBuyPlanModalOpen: boolean;
  setShowGenerateReferralSuccessModal: Dispatch<SetStateAction<boolean>>
  setReferralResponse: Dispatch<SetStateAction<ReferralsuccessProp | undefined>>
}
export interface ReferralsuccessProp {
  message: string;
  referral_code: string;
}
const formSchema = z.object({

  first_name: z
    .string()
    .trim()
    .min(1, { message: "Please enter  First name." }),
  last_name: z
    .string()
    .trim()
    .min(1, { message: "Please enter Last name." }),
    phone_number: z
    .string()
    .min(11, { message: "Phone number should be at least 11 digits" })
    .regex(/^0\d{10}$/, { message: "Phone number must start with 0 and be 11 digits long" }),

});

type FormValues = z.infer<typeof formSchema>;

const GenerateReferralModal = ({
  setBuyPlanModal,
  isBuyPlanModalOpen,
  setShowGenerateReferralSuccessModal,
  setReferralResponse
}: Prop) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      phone_number: "",
      last_name: ""


    },
  });

  const { mutate: handleGenerateReferral,isLoading } = useCreateReferral()

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const onSubmit = (data: FormValues) => {
    handleGenerateReferral(
      data,
      {
        onSuccess: (data: ReferralsuccessProp) => {
          //    console.log(data);
          if (data?.referral_code) {
            setReferralResponse({
              message: data?.message,
              referral_code: data?.referral_code
            })
            setShowGenerateReferralSuccessModal(true)
            setBuyPlanModal(false)
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
  };

  return (
    <>
     
        <div className="rounded-xl z-[9999999999999] ">
          <Dialog open={isBuyPlanModalOpen}>
            <DialogContent className="!overflow-hidden  z-[9999999999999]  max-h-[93vh]">
              <DialogHeader className="bg-[#1B1687] font-medium text-[#fff] text-base">
                <DialogTitle className="font-medium text-[#fff]">
                  Generate Referral Details
                </DialogTitle>
                <DialogClose
                  className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]"
                  onClick={() => setBuyPlanModal(false)}
                >
                  <button>Close</button>
                </DialogClose>
              </DialogHeader>

              <DialogBody className="bg-[#141B3f] w-full !max-h-[86vh]">
                <div className="text-[#fff] font-light text-sm pb-4">
                  <p className="w-4/5 pb-2">
                    Kindly enter below your details to generate a referral link.
                  </p>
                  {/* {fields?.length > 0 && (
                    <Button className="bg-white mt-2 flex justify-center items-center gap-2 rounded-lg text-[#032282]">
                      People Added
                      <div className="bg-[#E5ECFA] h-[1.375rem] w-[1.375rem] shrink-0 flex justify-center items-center rounded-full">
                        {fields?.length}
                      </div>
                    </Button>
                  )} */}
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="max-h-[50vh] overflow-y-auto">
                    <div

                      className="w-full mt-[1rem] text-sm font-normal max-h-[60vh] overflow-y-auto"
                    >
                      <div className="flex items-center justify-between">
                        <Label
                          className="mb-1 block text-xs text-[#fff]"
                          htmlFor={`first_name`}
                        >
                          First Name
                        </Label>


                      </div>
                      <div className="relative mt-[.25rem]">
                        <input
                          className={`${errors?.first_name ? "border border-red-700" : ""} text-[#fff] text-xs outline-none h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
                          placeholder="Enter name"
                          type="text"
                          id={`name`}
                          {...register(
                            `first_name`
                          )}
                        />
                      </div>
                      {errors?.first_name && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.first_name.message}
                </p>
              )}
                      <div className="mt-3">
                        <Label
                          className="mb-1 block text-xs text-[#fff]"
                          htmlFor={`last_name`}
                        >
                          Last Name
                        </Label>
                        <div className="relative mt-[.25rem]">
                          <input
                            className={`${errors?.last_name ? "border border-red-700" : ""} text-[#fff] text-xs outline-none rounded-lg px-6 w-full h-[2.875rem] bg-[#2a3150]`}
                            placeholder="Enter last name"
                            type="text"
                            id={`last_name`}
                            {...register(
                              `last_name`
                            )}
                          />
                        </div>
                        {errors?.last_name && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.last_name.message}
                </p>
              )}
                      </div>
                      <div className="mt-3">
                        <Label
                          className="mb-1 block text-xs text-[#fff]"
                          htmlFor={`phone_number`}
                        >
                          Phone number
                        </Label>
                        <div className="relative mt-[.25rem]">
                        <Controller
                      control={control}
                      name={`phone_number`}
                      render={({ field }) => (
                        <input
                          {...field}
                          {...field}
                    className={`${
                      errors?.phone_number ? "border border-red-700" : ""
                    } text-[#fff] text-xs outline-none h-[2.4rem] md:h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
                          id="account_no"
                          placeholder="Phone number"
                          type="text"
                          maxLength={11}
                          onChange={(e) => {
                            const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                            // Handle input sanitization on change (typing)
                            const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                            field.onChange(validPhoneNumber);
                          }}
                         


                         
                          onPaste={(e) => {
                            e.target as HTMLInputElement;
                            // Intercept paste event to sanitize pasted content
                            const pastedValue = e.clipboardData.getData('text');
                            // Remove non-numeric characters and limit to 11 digits
                            const sanitizedValue = pastedValue.replace(/[^0-9]/g, '').slice(0, 11); // Only allow first 11 digits
                            e.preventDefault(); // Prevent the default paste behavior
                            field.onChange(sanitizedValue); // Apply sanitized value
                          }}
                          
                          onInput={(e) => {
                            const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                            // Handle input sanitization on input changes
                            const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                            field.onChange(validPhoneNumber);
                          }}
                          // onChange={(e) => field.onChange(e.target.value)}
                        />
                      )}
                    />
                        </div>
                        {errors?.phone_number && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.phone_number.message}
                </p>
              )}
                      </div>
                    </div>
                  </div>
                  <div className="py-6 mt-[1rem]">
                    <div className="w-full flex items-center gap-3 justify-between text-sm font-normal">
                      <Button
                        className="flex items-center gap-x-5 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 font-semibold tracking-wide shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                        type="submit"
                      >
                        Continue {isLoading && <SmallSpinner color="blue"/>}
                      </Button>
                    </div>
                  </div>
                </form>
              </DialogBody>
            </DialogContent>
          </Dialog>


        </div>
      

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage ||

          "Please check your inputs and try again."
        }
      ></ErrorModal>
    </>
  );
};

export default GenerateReferralModal