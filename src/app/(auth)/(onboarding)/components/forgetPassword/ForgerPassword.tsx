"use client";
import React from "react";
import { z } from "zod";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Button, LinkButton } from "@/components/core";

import { forgetPasswordUserSchema } from "@/app/schema/LoginSchema";
export type forgetPasswordDetailsValue = z.infer<typeof forgetPasswordUserSchema>;

interface Prop{
    onNext: () => void
  }
const ForgetPassword = ({onNext}:Prop) => {

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<forgetPasswordDetailsValue>({
    resolver: zodResolver(forgetPasswordUserSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  // const tokenStorage =tokenStorage()
  const onSubmit = (data:forgetPasswordDetailsValue) => {
    if(isValid){
        onNext()
    }
  }

  return (
    <div className="text-white relative border-[.0187rem] py-6 xl:py-[4.5rem]  border-[#4649E5] px-6 md:px-[50px] 2xl:px-[6.1875rem] rounded-[1.25rem]">
      <div>
        <h2 className="text-white font-verdana font-bold text-[1.25rem] xl:text-[1.75rem]">
        Forgot Password?
        </h2>
        <p className="font-outfit text-sm xl:text-base max-w-[19.5rem] xl:max-w-[380px] text-white text-opacity-70 font-light">
        Enter your email address and we will send an email with a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {/* Phone Number Input */}
        <div>
          <Label className="mb-1 block text-sm font-outfit text-[#fff]">
            Email*
          </Label>
          <input
            className={`${errors?.email ? "border border-red-700" : "border-[0.3px] border-[#696969]"} text-[#fff] text-xs outline-none  h-[2.75rem]  md:h-[3.375rem] border-opacity-70 rounded-lg w-full px-6 bg-[#02010D]`}
            placeholder="Enter your email"
            type="text"
            id={`email`}
            {...register(`email`)}
          />

          {errors?.email && (
            <p className="text-red-700 text-xs mt-1">
              {errors?.email?.message}
            </p>
          )}
        </div>


        {/* Submit Button + Signup Link */}
        <div className="mt-[2rem] xl:mt-[4.5rem] flex flex-col pb-[1.75rem] xl:pb-[2.75rem]">
          <Button className="w-full bg-white text-[#2B3AA6] h-11 rounded-10 font-outfit text-sm">
          Continue
          </Button>
          <LinkButton
            className="w-full border-[0.5px] border-[#FFFFFF] font-extralight mt-6 text-white h-11 rounded-10 font-outfit text-sm"
            variant={"outlined"}
            href={"/login"}
          >Back to login  Don’t have an account? <span className="font-normal pl-1">Signup</span>
          </LinkButton>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
