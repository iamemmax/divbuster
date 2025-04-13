import { createPasswordSchema, signUpUserBvnSchema } from "@/app/schema/SignupValidation";
import React, { SetStateAction, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/core";
import CopyIcon from "@/app/icons/CopyIcon";
import { useClipboard } from "@/hooks";
import EyeIcon from "@/app/icons/EyeIcon";

interface prop {
  onNext: (value: SetStateAction<number>) => void;
  onPrev: (value: SetStateAction<number>) => void;
}

export type UserPasswordDetailsValue = z.infer<typeof createPasswordSchema>;

const CreatePasswordDetails = ({onNext,onPrev}: prop) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };
    
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserPasswordDetailsValue>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password:""
     
    },
    mode: "onChange",
  });

  const onSubmit =()=>{
    if(isValid){
        onNext(7)
    }
  }
  return (
    <div className="text-white relative border-[.0187rem] py-6 xl:py-[4.5rem]  border-[#4649E5] px-6 md:px-[50px] 2xl:px-[6.1875rem] rounded-[1.25rem]">
       <div className="">
        <h2 className="text-white font-verdana font-bold text-[1.25rem] xl:text-[1.75rem]">
        Create Password
        </h2>
        <p className="font-outfit text-sm xl:text-base text-white text-opacity-70 font-light">
        Create a unique password for safe login
        </p>
        <div className="absolute right-10 xl:right-16 top-14">
          <p className="font-outfit font-semibold text-white text-xs xl:text-base">
            6/6
          </p>
        </div>
      </div>

<form onSubmit={handleSubmit(onSubmit)} className="mt-8">

  
        
      <div className="mt-4">
           <Label
                  className="mb-1 block text-sm font-outfit text-[#fff]"
                  htmlFor={``}
                >
            Pasword*
          </Label>

          <div className={` ${errors?.password ? "border border-red-700" : "border-[0.3px] border-[#696969]"} flex items-center relative w-full pr-10 md:pr-16  !bg-white/10 rounded-lg h-[3.5rem] `}>
        

            <input
              className={`
               
                login-autofill-text login-no-chrome-autofill-bg h-auto min-w-0 grow !bg-transparent py-3.5 pl-6 text-sm font-medium text-white placeholder:text-white focus-visible:outline-none`}
              id="password"
              // pattern="[0-9]*"
              placeholder="Enter password"
              type={passwordShown ? "text" : "password"}
              {...register("password")}
            />

            {/* <div> */}
            <button
              type="button"
              className="absolute right-5"
              onClick={togglePassword}
            >
              <EyeIcon />
            </button>
            {/* </div> */}
          </div>
 
          {errors?.password && (
              <p className="text-red-700 text-xs mt-1">
                {errors?.password?.message}
              </p>
            )}
          <p className="text-xs text-white max-w-[23.75rem] text-opacity-70 mt-2 font-outfit font-light">Must be at least 8 characters long - uppercase, lowercase, number,
          special characters (@*-!_)</p>
      </div>
        

        <div className="mt-4">
            <Label
                   className="mb-1 block text-sm font-outfit text-[#fff]"
                   htmlFor={``}
                 >
            Confirm Pasword*
          </Label> <div className={` ${errors?.confirm_password ? "border border-red-700" : "border-[0.3px] border-[#696969]"} flex items-center relative w-full pr-10 md:pr-16  !bg-white/10 rounded-lg h-[3.5rem] `}>
        


            <input
              className="login-autofill-text login-no-chrome-autofill-bg h-auto min-w-0 grow !bg-transparent py-3.5 pl-6 text-sm font-medium text-white placeholder:text-white focus-visible:outline-none"
              id="password"
              // pattern="[0-9]*"
              placeholder="Enter password"
              type={passwordShown ? "text" : "password"}
              {...register("confirm_password")}
            />

            {/* <div> */}
            <button
              type="button"
              className="absolute right-5"
              onClick={togglePassword}
            >
              <EyeIcon />
            </button>
            {/* </div> */}
          </div>
          {errors?.confirm_password && (
              <p className="text-red-700 text-xs mt-1">
                {errors?.confirm_password?.message}
              </p>
            )}
      </div>
<div className="mt-[4.5rem] flex flex-col pb-[2.75rem]">
    <Button className="w-full bg-white text-[#2B3AA6] h-11 rounded-10 font-outfit text-sm " type="submit">Verify</Button>
</div>

</form>
    </div>
  );
};

export default CreatePasswordDetails;
