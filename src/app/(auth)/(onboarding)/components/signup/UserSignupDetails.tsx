import { signUpUserSchema } from "@/app/schema/SignupValidation";
import React, { SetStateAction } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Button, LinkButton } from "@/components/core";

interface prop {
  onNext: (value: SetStateAction<number>) => void;
}

export type UserSignupDetailsValue = z.infer<typeof signUpUserSchema>;

const UserSignupDetails = ({onNext}: prop) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserSignupDetailsValue>({
    resolver: zodResolver(signUpUserSchema),
    defaultValues: {
      email: "",
      full_name: "",
      phone_number: "",
      referral: "",
    },
    mode: "onChange",
  });

  const onSubmit =()=>{
    if(isValid){
        onNext(2)

    }
  }
  return (
    <div className="text-white overflow-y-auto relative border-[.0187rem] py-6 xl:py-[1.75rem]  border-[#4649E5] px-6 md:px-[50px] rounded-[1.25rem]">
      <div className="">
        <h2 className="text-white font-verdana font-bold text-[1.25rem] xl:text-[1.75rem]">
          Let’s Get Started
        </h2>
        <p className="font-outfit text-sm xl:text-base text-white text-opacity-70 font-light">
          Start your journey to financial freedom
        </p>
        <div className="absolute right-10 xl:right-16 top-14">
          <p className="font-outfit font-semibold text-white text-xs xl:text-base">
            1/6
          </p>
        </div>
      </div>

<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="mt-6">
        <div className="mt-[.5rem]">
          <Label
            className="mb-1 block text-sm font-outfit text-[#fff]"
            htmlFor={``}
          >
            Full Name*
          </Label>
          <input
            className={`${errors?.full_name ? "border border-red-700" : "border-[0.3px] border-[#696969]"} text-[#fff] text-xs outline-none border-opacity-70  h-[2.75rem] md:h-[3.375rem] rounded-lg w-full px-6 bg-[#02010D]`}
            placeholder="Enter your full name"
            type="text"
            id={`full_name`}
            {...register(`full_name`)}
          />

          {errors?.full_name && (
            <p className="text-red-700 text-xs mt-1">
              {errors?.full_name?.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <Label
            className="mb-1 block text-sm font-outfit text-[#fff]"
            htmlFor={``}
          >
            Phone Number*
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
                    errors?.phone_number
                      ? "border border-red-700"
                      : "border-[0.3px] border-[#696969]"
                  } text-[#fff] text-xs outline-none h-[2.75rem]  md:h-[3.375rem] border-opacity-70 rounded-lg w-full px-6 bg-[#02010D]`}
                  id="account_no"
                  placeholder="Enter your phone number"
                  type="text"
                  maxLength={11}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement; // Casting e.target to HTMLInputElement
                    // Handle input sanitization on change (typing)
                    const validPhoneNumber = target.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                    field.onChange(validPhoneNumber);
                  }}
                  onPaste={(e) => {
                    e.target as HTMLInputElement;
                    // Intercept paste event to sanitize pasted content
                    const pastedValue = e.clipboardData.getData("text");
                    // Remove non-numeric characters and limit to 11 digits
                    const sanitizedValue = pastedValue
                      .replace(/[^0-9]/g, "")
                      .slice(0, 11); // Only allow first 11 digits
                    e.preventDefault(); // Prevent the default paste behavior
                    field.onChange(sanitizedValue); // Apply sanitized value
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement; // Casting e.target to HTMLInputElement
                    // Handle input sanitization on input changes
                    const validPhoneNumber = target.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                    field.onChange(validPhoneNumber);
                  }}
                  // onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            {errors?.phone_number && (
              <p className="text-red-700 text-xs mt-1">
                {errors?.phone_number?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Label
            className="mb-1 block text-sm font-outfit text-[#fff]"
            htmlFor={`email`}
          >
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
        <div className="mt-4">
          <Label
            className="mb-1 block text-sm font-outfit text-[#fff]"
            htmlFor={`email`}
          >
            Referral Code (Optional)
          </Label>
          <input
            className={`${errors?.referral ? "border border-red-700" : "border-[0.3px] border-[#696969]"} text-[#fff] text-xs outline-none  h-[2.75rem]  md:h-[3.375rem] border-opacity-70 rounded-lg w-full px-6 bg-[#02010D]`}
            placeholder="Enter referral code"
            type="text"
            id={`referral`}
            {...register(`referral`)}
          />

          {errors?.referral && (
            <p className="text-red-700 text-xs mt-1">
              {errors?.referral?.message}
            </p>
          )}
        </div>
      </div>
<div className="mt-[4.5rem] flex flex-col pb-[2.75rem]">
    <Button className="w-full bg-white text-[#2B3AA6] h-11 rounded-10 font-outfit text-sm ">Get Started</Button>
    <LinkButton className="w-full border-[0.5px] border-[#FFFFFF] font-extralight mt-6 text-white h-11 rounded-10 font-outfit text-sm " variant={"outlined"} href={"/login"}>Already have an account? <span className="font-normal">Login</span></LinkButton>
</div>

</form>
    </div>
  );
};

export default UserSignupDetails;
