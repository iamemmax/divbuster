import { signUpUserBvnSchema } from "@/app/schema/SignupValidation";
import React, { SetStateAction } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/core";
import CopyIcon from "@/app/icons/CopyIcon";
import { useClipboard } from "@/hooks";

interface prop {
  onNext: (value: SetStateAction<number>) => void;
  onPrev: (value: SetStateAction<number>) => void;
}

export type UserSignupBvnDetailsValue = z.infer<typeof signUpUserBvnSchema>;

const UserBvnDetails = ({onNext,onPrev}: prop) => {
  const { copy } = useClipboard();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserSignupBvnDetailsValue>({
    resolver: zodResolver(signUpUserBvnSchema),
    defaultValues: {
      bvn: "",
     
    },
    mode: "onChange",
  });

  const onSubmit =()=>{
    if(isValid){
        onNext(3)

    }
  }
  return (
    <div className="text-white relative border-[.0187rem] py-6 xl:py-[1.75rem]  border-[#4649E5] px-6 md:px-[50px] 2xl:px-[6.1875rem] rounded-[1.25rem]">
      <div className="">
        <h2 className="text-white font-verdana font-bold text-[1.25rem] xl:text-[1.75rem]">
        BVN Verification
        </h2>
        <p className="font-outfit text-sm xl:text-base text-white max-w-[290px] text-opacity-70 font-light">
        This is to create your operational wallet account
        </p>
        <div className="absolute right-10 xl:right-16 top-14">
          <p className="font-outfit font-semibold text-white text-xs xl:text-base">
            2/6
          </p>
        </div>
      </div>

<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="mt-6">
    
        <div className="mt-4">
          <Label
            className="mb-1 block text-sm font-outfit text-[#fff]"
            htmlFor={``}
          >
           BVN
          </Label>
          <div className="relative mt-[.25rem]">
            <Controller
              control={control}
              name={`bvn`}
              render={({ field }) => (
                <input
                  {...field}
                  {...field}
                  className={`${
                    errors?.bvn
                      ? "border border-red-700"
                      : "border-[0.3px] border-[#696969]"
                  } text-[#fff] text-xs outline-none h-[2.75rem] md:h-[3rem] rounded-lg w-full px-6 bg-[#02010D]`}
                  id="account_no"
                  placeholder="Enter your BVN"
                  type="text"
                  maxLength={11}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement; // Casting e.target to HTMLInputElement
                    // Handle input sanitization on change (typing)
                    const validBvn = target.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                    field.onChange(validBvn);
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
                    const validBvn = target.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                    field.onChange(validBvn);
                  }}
                  // onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            {errors?.bvn && (
              <p className="text-red-700 text-xs mt-1">
                {errors?.bvn?.message}
              </p>
            )}
            </div>
          <div
          className="border-[0.3px] border-[#696969] p-6 rounded-lg mt-4"
          ><p className="max-w-[270px] 2xl:max-w-[400px] text-white text-xs  font-outfit ">Your BVN is safe and does not give access to your bank accounts or transactions as it would only be used for account creation.</p>
          <div className="mt-[1.0919rem]">
            <p className="text-xs font-outfit font-normal text-white">Don’t know your BVN?</p>
            <div className="flex items-center gap-x-[.875rem] mt-2">
              <p className="font-outfit font-normal text-xs text-white">Dial: <span className="font-bold">*565*0#</span></p>
              <Button type="button" className="bg-white gap-x-[.3831rem] text-[#0934F6] text-[.5rem] font-outfit font-normal flex items-center justify-center px-[.625rem] py-[.4375rem]" onClick={()=>copy("*565*0#")}><CopyIcon/> Copy</Button>
            </div>
          </div>

          <div>

          </div>
        </div>
       
      </div>
      </div>
<div className="mt-[4.5rem] flex flex-col pb-[2.75rem]">
    <Button className="w-full bg-white text-[#2B3AA6] h-11 rounded-10 font-outfit text-sm " type="submit">Verify</Button>
    <Button className="w-full border-[0.5px] border-[#FFFFFF] font-extralight mt-6 text-white h-11 rounded-10 font-outfit text-sm " variant={"outlined"} onClick={()=>onPrev(1)}>Skip</Button>
</div>

</form>
    </div>
  );
};

export default UserBvnDetails;
