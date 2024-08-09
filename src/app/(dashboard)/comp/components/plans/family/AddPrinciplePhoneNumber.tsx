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
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { useRouter } from "next/navigation";
import { useCreateReferralPlanRequest } from "@/app/(main)/misc/components/insurance/api/referral/createReferralPlan";

interface Prop {
  setOpenCheckPhoneNumberModal: React.Dispatch<SetStateAction<boolean>>;
  openCheckPhoneNumberModal: boolean;
  setBuyFamilyPlan: React.Dispatch<React.SetStateAction<boolean>>;
}

interface successProp {
  amount: string;
  account_no: string;
  bank_name: string;
  paystack_link: string;
  message: string;
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

const AddPrinciplePhoneNumer = ({
  openCheckPhoneNumberModal,
  setOpenCheckPhoneNumberModal,
  setBuyFamilyPlan,
}: Prop) => {
  const {
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

  const [errorMsg, setErrorMsg] = useState("");
  console.log(errors);

  const {
    isErrorModalOpen,
    setErrorModalState,
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { mutate: handleCreatePlan, isLoading } =
    useCreateReferralPlanRequest();
  const router = useRouter();

  const onsubmit = (data: detailRequestType) => {
    setBuyFamilyPlan(true);
    // console.log("123");
    // handleCreatePlan(
    //   {
    //     duration: Number(planType?.duration),
    //     phone_number: data?.phone_number,
    //     number_of_recipient: Number(planType?.number_of_recipient),
    //     packages: planType?.play_type,
    //   },
    //   {
    //     onSuccess: (data: successProp) => {
    //       if (data?.message) {
    //         setErrorMsg(data?.message);
    //         openErrorModalWithMessage(String(data?.message));
    //       } else {
    //       }
    //     },
    //     onError: (error) => {
    //       const errorMessage = formatAxiosErrorMessage(error as AxiosError);
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       //@ts-expect-error
    //       setErrorMsg(error?.response?.data?.error);
    //       openErrorModalWithMessage(String(errorMessage));
    //     },
    //   }
    // );
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
            <DialogTitle className="text-[#fff]">Principal Number</DialogTitle>

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
                Enter Principal (account Owner) Phone number.
              </p>

              <form className="mt-8" onSubmit={handleSubmit(onsubmit)}>
                <div className="w-full mt-[1rem] text-sm font-normal">
                  <Label
                    className="mb-1 block text-xs  text-[#fff]"
                    htmlFor="phone"
                  >
                    {/* Phone Number */}
                  </Label>

                  <div className={`relative mt-[.25rem] `}>
                    <Input2
                      className={`${errors?.phone_number?.message ? "border border-red-700" : ""} h-12 rounded-lg text-[#fff]`}
                      placeholder="Enter your phone number"
                      type="number"
                      id="phone"
                      {...register("phone_number")}
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
                    className=" mt-[3rem] flex items-center justify-center gap-x-2 font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
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

export default AddPrinciplePhoneNumer;
