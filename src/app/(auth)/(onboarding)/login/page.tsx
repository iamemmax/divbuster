"use client";
import React, { useEffect, useState } from "react";
import { OnboardingPageWrapper, tokenStorage } from "../misc";
import { PhoneLoginForm } from "./misc/components/NewLoginForm";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Input2 } from "@/components/core/Input2";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ErrorModal, LinkButton } from "@/components/core";
import { useCheckUserLoginStatus } from "../api/checkuserStatus";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { SmallSpinner } from "@/icons/core";
import { userStatusTypes } from "../types/userStatusTypes";
import { useRouter } from "next/navigation";

const contactSchema = z.object({
  phone_number: z
    .string({ required_error: "Enter your phone number" })
    .trim()
    .min(10, { message: "Phone number should be at least 11 digits" }).max(11, { message: "Phone number should be at most 11 digits" }),
});
export type userStatusType = z.infer<typeof contactSchema>;

export default function Login() {
  const {
    isErrorModalOpen,
    setErrorModalState,
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<userStatusType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone_number: "",
    },

    mode: "onChange",
  });
  const router = useRouter();
  const [returninguser, setReturninguser] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPasswordNotSet, setUserPasswordNotSet] = useState(false);
  const { mutate: handleCheckStatus, isLoading } = useCheckUserLoginStatus();
  
 const [referralFromAproko, setReferralFromAproko] = useState("")
 useEffect(() => {
    const ApprokoReferral = tokenStorage.getReferral()
    
    if(ApprokoReferral){
      setReferralFromAproko(ApprokoReferral)
     }else{
       setReferralFromAproko("") 
     }
   }, [])

   const onsubmit = ({ phone_number }: userStatusType) => {
    handleCheckStatus(phone_number, {
      onSuccess: (data: userStatusTypes) => {
if(data?.user_found === false){
  if (referralFromAproko === "aproko-doctor") {
    router.push("/plan/aproko-doctor?select-plan=true");
  } else {
    router.push("/?get-started=true");
  }
}else{
  if (data?.has_set_password) {
    setReturninguser(true);
  } else {
    setUserPasswordNotSet(true);
  }
  setUserPhoneNumber(data?.phone_number);

}
},

      onError: (error) => {   
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
   openErrorModalWithMessage(String(errorMessage));
      },
    });
  };
  

  return (
    <>
      <OnboardingPageWrapper
        heading="Welcome back! 👋"
        subHeading="Enter your enrollment phone number to login "
      >
        {!returninguser ? (
          <>
            <form className="mt-8" onSubmit={handleSubmit(onsubmit)}>
              <div className="w-full mt-[1rem] text-sm font-normal">
                <Label
                  className="mb-1 block text-xs  text-[#fff]"
                  htmlFor="phone"
                >
                  Phone Number
                </Label>

                <div className={`relative mt-[.25rem] `}>
                  {/* <Input2
                    className={`${errors?.phone_number?.message ? "border border-red-700" : ""} h-12 rounded-lg text-[#fff]`}
                    placeholder="Enter your phone number"
                    type="number"
                    id="phone"
                    maxLength={11}

                    
                    {...register("phone_number")}
                  /> */}

<Controller
                      control={control}
                      name={`phone_number`}
                      render={({ field }) => (
                        <Input2
                          {...field}
                          className="login-autofill-text mt-2 login-no-chrome-autofill-bg h-auto rounded-lg  !bg-white/10 px-6 py-3.5 outline-none text-sm font-sans font-medium text-white  focus-visible:outline-none placeholder:text-white focus:!bg-white/30 "
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
                            const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                            // Intercept paste event to sanitize pasted content
                            const pastedValue = e.clipboardData.getData('text');
                            const sanitizedValue = pastedValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
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
                  {!userPasswordNotSet ? (
                    <div className="pb-[2rem]">
                      <Button
                        className=" mt-[3rem] flex items-center justify-center gap-x-2 font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
                                    shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                        type="submit"
                      >
                        Continue {isLoading && <SmallSpinner color="blue" />}
                      </Button>
                    </div>
                  ) : (
                    <LinkButton
                      className=" mt-[3rem] h-12 text-white border-[.0187rem] border-opacity-60 border-white flex items-center justify-center gap-x-2 font-display focus:shadow-outline w-full  bg-transparent p-4 py-3 font-semibold tracking-wide
                                 rounded-[1.25rem]   shadow-lg transition-colors delay-150 ease-in-out  focus:outline-none "
                      variant={"outlined"}
                      href={`/create-password?phone=${userPhoneNumber}`}
                    >
                      <p className="text-xxs font-normal">
                        Don’t have a password ?
                      </p>{" "}
                      Create password
                    </LinkButton>
                  )}
                </div>
              </div>
            </form>
          </>
        ) : (
          <PhoneLoginForm userPhoneNumber={userPhoneNumber} />
        )}

{errorModalMessage !== "User not found" && (
  <ErrorModal
    isErrorModalOpen={isErrorModalOpen}
    setErrorModalState={setErrorModalState}
    subheading={
      errorModalMessage || "Please check your inputs and try again."
    }
  />
)}


      </OnboardingPageWrapper>
    </>
  );
}
