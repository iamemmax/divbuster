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
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/icons/core";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import CloseIcon from "@/app/(main)/misc/icons/CLoseIcon";
import { useQuery } from "react-query";
import { getPlan } from "@/app/(main)/misc/components/insurance/api/plan/getPlan";
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
    .min(1, { message: "Please enter the first name." }),
  last_name: z
    .string()
    .trim()
    .min(1, { message: "Please enter the name." }),
  phone_number: z
    .string()
    .trim()
    .min(10, { message: "Please enter a valid phone number." }),



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

  const { mutate: handleGenerateReferral } = useCreateReferral()

  const [isLoading, setIsLoading] = useState(false);
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
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="rounded-xl">
          <Dialog open={isBuyPlanModalOpen}>
            <DialogContent className="!overflow-hidden max-h-[93vh]">
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
                      </div>
                      <div className="mt-3">
                        <Label
                          className="mb-1 block text-xs text-[#fff]"
                          htmlFor={`phone_number`}
                        >
                          Phone number
                        </Label>
                        <div className="relative mt-[.25rem]">
                          <input
                            className={`${errors?.phone_number ? "border border-red-700" : ""} text-[#fff] text-xs outline-none rounded-lg px-6 w-full h-[2.875rem] bg-[#2a3150]`}
                            placeholder="Enter phone number"
                            type="text"
                            id={`phone_number`}
                            {...register(
                              `phone_number`
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-6 mt-[1rem]">
                    <div className="w-full flex items-center gap-3 justify-between text-sm font-normal">
                      <Button
                        className="flex items-center gap-x-5 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 font-semibold tracking-wide shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                        type="submit"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </form>
              </DialogBody>
            </DialogContent>
          </Dialog>


        </div>
      )}

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