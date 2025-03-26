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
// import { useCreateReferralPlanRequest } from "@/app/(main)/misc/components/insurance/api/referral/createReferralPlan";
import { formatAxiosErrorMessage, validatePhoneNumber } from "@/utils";
import { useCheckUserActivePlan } from "@/app/(main)/misc/components/insurance/api/plan/checkUserActiveHealthPlan";
import { AxiosError } from "axios";

interface Prop {
  setOpenCheckPhoneNumberModal: React.Dispatch<SetStateAction<boolean>>;
  openCheckPhoneNumberModal: boolean;
}

const contactSchema = z.object({
  phone_number: z
  .string()
  .min(11, { message: "Phone number should be at least 11 digits" })
  .regex(/^0\d{10}$/, { message: "Phone number must start with 0 and be 11 digits long" }),

});

export type detailRequestType = z.infer<typeof contactSchema>;

const CheckUserHasPlan = ({
  openCheckPhoneNumberModal,
  setOpenCheckPhoneNumberModal,
}: Prop) => {
  const {
    control,
 
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

//   const onsubmit = (data: detailRequestType) => {
//     handleCheck({phone_number:data?.phone_number},{
//         onSuccess:(data)=>{
// if(data){
//   window.open("https://hmo.heala.io/nemhmo", "_blank");
//   setOpenCheckPhoneNumberModal(false)
// }

//         },
//           onError: (error) => {
//                 const errorMessage = formatAxiosErrorMessage(error as AxiosError);
              
//                 openErrorModalWithMessage(String(errorMessage));
//               },
//     })
//   };
const onsubmit = (data: detailRequestType) => {
  handleCheck(
    { phone_number: data?.phone_number },
    {
      onSuccess: (data) => {
        if (data) {
          const externalUrl = "https://hmo.heala.io/nemhmo";

          // Check if we are on a mobile device (this can be customized based on your needs)
          const isMobile = /Mobi|Android/i.test(navigator.userAgent);

          if (isMobile) {
            // For mobile, use window.location for redirection
            window.location.href = externalUrl;
          } else {
            // For desktop, create and click an <a> tag
            const a = document.createElement("a");
            a.href = externalUrl;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            document.body.appendChild(a);
            a.click(); // Simulate the user click
            document.body.removeChild(a); // Clean up the DOM
          }

          setOpenCheckPhoneNumberModal(false); // Close the modal after redirection
        }
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      },
    }
  );
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
                                           <input
                                             {...field}
                                             {...field}
                                       className={`${
                                         errors?.phone_number ? "border border-red-700" : ""
                                       } text-[#fff] text-xs outline-none h-[2.4rem] md:h-[2.875rem] rounded-lg w-full px-6 bg-[#2a3150]`}
                                             id="account_no"
                                             maxLength={11}
                                             placeholder="Phone number"
                                             type="text"
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
                     {errors?.phone_number && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.phone_number.message}
                </p>
              )}

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
