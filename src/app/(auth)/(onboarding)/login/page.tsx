"use client";
import React, { useEffect, useState } from "react";
import { OnboardingPageWrapper, tokenStorage } from "../misc";
import { PhoneLoginForm } from "./misc/components/NewLoginForm";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
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
import { useAuth } from "@/contexts/authentication";

const contactSchema = z.object({
  phone_number: z
  .string()
  .min(11, { message: "Phone number should be at least 11 digits" })
  .regex(/^0\d{10}$/, { message: "Phone number must start with 0 and be 11 digits long" }),

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
    router.replace("/sign-up");
  } else {
    router.replace("/sign-up");
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
 const { authState } = useAuth();
  const { isAuthenticated } = authState;
  useEffect(() => {
   if(isAuthenticated){
    router.replace("/");
   }
  }, [isAuthenticated])
  
  

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
                     {errors?.phone_number && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.phone_number.message}
                </p>
              )}
                  {!userPasswordNotSet ? (
                    <div className="">
                      <Button
                        className=" mt-[5rem] flex items-center justify-center gap-x-2 font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
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
                   <LinkButton
            href={"/sign-up"}
            className="my-6 mt-6 block w-full rounded-[20px] bg-[#080D27]  border-[0.5px] border-white border-opacity-40 text-[#fff] font-sans py-[.9375rem] text-base leading-[normal]"
            type="submit"
            variant="white"
          >
          <p className="text-xs text-[#f4f4f4] text-opacity-60">  Don’t have an account ?  <span className="text-white text-sm text-opacity-100"> Sign up</span></p>
          </LinkButton>
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
