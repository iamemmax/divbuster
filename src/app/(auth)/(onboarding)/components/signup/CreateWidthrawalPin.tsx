import {  createWidthrawalPin } from "@/app/schema/SignupValidation";
import React, { SetStateAction } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PinInput from "react-pin-input";
import { Button, LinkButton } from "@/components/core";

import useIsMobile from "@/hooks/UseMobile";

interface prop {
  onNext: (value: SetStateAction<number>) => void;
  onPrev: (value: SetStateAction<number>) => void;
}

export type UserWidrawalDetailsValue = z.infer<typeof createWidthrawalPin>;

const CreateWidthralPin = ({onNext}: prop) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserWidrawalDetailsValue>({
    resolver: zodResolver(createWidthrawalPin),
    defaultValues: {
      pin: "",
     
    },
    mode: "onChange",
  });

  const onSubmit =()=>{
    if(isValid){
        onNext(6)

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
        Withdrawal Pin
        </h2>
        <p className="font-outfit max-xxscren:text-xs text-sm xl:text-base text-white text-opacity-70 max-w-[250px] lg:max-w-[380px] font-light">
        Create your unique pin for withdrawal.
        </p>
        <div className="absolute max-xxscren:right-3 right-10 xl:right-16 top-14">
          <p className="font-outfit font-semibold text-white text-xs xl:text-base">
            5/6
          </p>
        </div>
      </div>

<form onSubmit={handleSubmit(onSubmit)} className="max-w-[22.5rem]">
      <div className="mt-[2.625rem]">
    
    
          
        <div className="mt-3 ">
            <Controller
              name="pin"
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
                    background: "#F5F7F9CC",
                    borderRadius: "10px",
                    border: "transparent",
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                    transition: "all 0.45s ease-in-out",
                    width: isMobile ? "2.7rem" : "3.375rem",
                    height: isMobile ? "2.7rem" : "3.375rem",
                  }}
                  length={4}
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
 
            </div>
<div className="mt-[4.5rem] flex flex-col pb-[2.75rem]">
    <Button className="w-full bg-white text-[#2B3AA6] h-11 rounded-10 font-outfit text-sm " type="submit">Create</Button>
    <LinkButton className="w-full border-[0.5px] border-[#FFFFFF] font-extralight mt-6 text-white h-11 rounded-10 font-outfit text-sm " href={"/"} variant={"outlined"}>Skip</LinkButton>
</div>

</form>
    </div>
  );
};

export default CreateWidthralPin;
