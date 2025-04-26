import {  signUpUserOtpSchema } from "@/app/schema/SignupValidation";
import React, { SetStateAction } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PinInput from "react-pin-input";
import { Button } from "@/components/core";

import { useClipboard } from "@/hooks";
import useIsMobile from "@/hooks/UseMobile";
import MessageIcon from "@/app/icons/MessageIcon";

interface prop {
  onNext: (value: SetStateAction<number>) => void;
  onPrev: (value: SetStateAction<number>) => void;
}

export type UserSignupOtpDetailsValue = z.infer<typeof signUpUserOtpSchema>;

const UserOtpVerification = ({onNext,onPrev}: prop) => {
  const { copy } = useClipboard();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserSignupOtpDetailsValue>({
    resolver: zodResolver(signUpUserOtpSchema),
    defaultValues: {
      otp: "",
     
    },
    mode: "onChange",
  });

  const onSubmit =()=>{
    if(isValid){
        onNext(4)

    }
  }


  
  // mobile responsiveness
  const isMobile = useIsMobile();


  const handleResendOtp = () => {

  }
  const handleComplete = (pin: string) => {

  }
  return (
    <div className="text-white relative border-[.0187rem] py-6 xl:py-[4.5rem]  border-[#4649E5] px-6 md:px-[50px] 2xl:px-[6.1875rem] rounded-[1.25rem]">
      <div className="">
        <h2 className="text-white font-verdana font-bold text-[1.25rem] xl:text-[1.75rem]">
        OTP Verification
        </h2>
        <p className="font-outfit max-xxscren:text-xs text-sm xl:text-base text-white text-opacity-70 max-w-[250px] lg:max-w-[280px] font-light">
        This is to create your operational wallet account
        </p>
        <div className="absolute max-xxscren:right-3 right-10 xl:right-16 top-14">
          <p className="font-outfit font-semibold text-white text-xs xl:text-base">
            3/6
          </p>
        </div>
      </div>

<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="mt-[2.625rem]">
    
    
          
        <div className="mt-3 ">
            <Controller
              name="otp"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <PinInput
                  {...field}
                  autoSelect={false}
                  initialValue=""
                  inputFocusStyle={{
                    border: "3px solid #02010D",
                    outline:"none",
                    background: "#fff",
                    color:"black",
                    boxShadow: "0 0 0 0.5px #fff, 0 0 0 1.8px #fff",
                  }}
                  inputMode="number"
                  inputStyle={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    border: "transparent",
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                    transition: "all 0.45s ease-in-out",
                    width: isMobile ? "2.2rem" : "3.3rem",
                    height: isMobile ? "2.2rem" : "3.3rem",
                  }}
                  length={6}
                  style={{
                    display: "flex",
                    color:"black",
                    flexWrap: "nowrap",
                    gap: isMobile ? "0.4rem" : "1rem",
                    margin: "auto",
                  }}
                  type="numeric"
                  secret 
                  onComplete={handleComplete}

                />
              )}
            />
          </div>
       
     {/* <Countdown onTimeUp={handleTimeUp} reset={resetTimer} /> */}
      <div className="flex w-full mt-7 items-end justify-between  max-sm:px-4 sm:max-w-[425px]">
      <div className="text-white text-xs px-2">
      <p className="font-outfit text-xxs font-light">  05:52</p>
              {/* <Countdown onTimeUp={handleTimeUp} reset={resetTimer} /> */}
            </div>
            {/* {showResendOtpButton && ( */}
            <Button
              type="button"
              className="flex bg-transparent p-0 items-center gap-[.3125rem] text-white text-[.625rem]"
              onClick={handleResendOtp}
            >
              <MessageIcon /> Resend OTP
            </Button>
            {/* )} */}
          </div>
            </div>
<div className="mt-[4.5rem] flex flex-col pb-[2.75rem] lg:max-w-[425px]">
    <Button className="w-full bg-white text-[#2B3AA6] h-11 rounded-10 font-outfit text-sm ">Verify</Button>
</div>

</form>
    </div>
  );
};

export default UserOtpVerification;
