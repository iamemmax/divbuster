"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Button, LinkButton } from "@/components/core";
import EyeIcon from "@/app/icons/EyeIcon";
import { loginUserSchema } from "@/app/schema/LoginSchema";
import { tokenStorage } from "../../misc/utils";

export type LoginDetailsValue = z.infer<typeof loginUserSchema>;

const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);

  const togglePassword = () => setPasswordShown(!passwordShown);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<LoginDetailsValue>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      password: "",
      phone_number: "",
    },
    mode: "onChange",
  });

  // const tokenStorage =tokenStorage()
  const onSubmit = (data: LoginDetailsValue) => {
    if (keepMeLoggedIn) {
      tokenStorage.saveLoginDetails(data);
    } else {
      tokenStorage.clearLoginDetails();
    }
  };

  useEffect(() => {
    // look for saved credenntials
    const token = tokenStorage.getSavedLoginDetails();
    if (token) {
      setValue("phone_number", token?.phone_number);
      setValue("password", token?.password);
      setKeepMeLoggedIn(true);
    }
  }, []);

  return (
    <div className="text-white relative border-[.0187rem] py-6 xl:py-[4.5rem]  border-[#4649E5] px-6 md:px-[50px] 2xl:px-[6.1875rem] rounded-[1.25rem]">
      <div>
        <h2 className="text-white font-verdana font-bold text-[1.25rem] xl:text-[1.75rem]">
          Welcome back
        </h2>
        <p className="font-outfit text-sm xl:text-base max-w-[19.5rem] xl:max-w-[380px] text-white text-opacity-70 font-light">
          Login into your account and enjoy wise investment.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {/* Phone Number Input */}
        <div>
          <Label className="mb-1 block text-sm font-outfit text-[#fff]">
            Phone Number*
          </Label>
          <div className="relative mt-[.25rem]">
            <Controller
              control={control}
              name="phone_number"
              render={({ field }) => (
                <input
                  {...field}
                  className={`${
                    errors?.phone_number
                      ? "border border-red-700"
                      : "border-[0.3px] border-[#696969]"
                  } text-[#fff] text-xs outline-none h-[2.75rem]  md:h-[3.375rem] border-opacity-70 rounded-lg w-full px-6 bg-transparent`}
                  id="account_no"
                  placeholder="Enter your phone number"
                  type="text"
                  maxLength={11}
                  onChange={(e) => {
                    const validPhoneNumber = e.target.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                    field.onChange(validPhoneNumber);
                  }}
                  onPaste={(e) => {
                    const pastedValue = e.clipboardData.getData("text");
                    const sanitizedValue = pastedValue
                      .replace(/[^0-9]/g, "")
                      .slice(0, 11);
                    e.preventDefault();
                    field.onChange(sanitizedValue);
                  }}
                  onInput={(e) => {
                    const validPhoneNumber = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                    field.onChange(validPhoneNumber);
                  }}
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

        {/* Password Input */}
        <div className="mt-4">
          <Label className="mb-1 block text-sm font-outfit text-[#fff]">
            Password*
          </Label>
          <div
            className={`${
              errors?.password
                ? "border border-red-700"
                : "border-[0.3px] border-[#696969]"
            } flex items-center relative w-full pr-10 md:pr-16 bg-transparent rounded-lg h-[2.75rem]  md:h-[3.375rem] border-opacity-70`}
          >
            <input
              className="login-autofill-text login-no-chrome-autofill-bg h-auto min-w-0 grow bg-transparent py-3.5 pl-6 text-sm font-medium text-white  focus-visible:outline-none"
              id="password"
              placeholder="Enter password"
              type={passwordShown ? "text" : "password"}
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-5"
              onClick={togglePassword}
            >
              <EyeIcon />
            </button>
          </div>
          {errors?.password && (
            <p className="text-red-700 text-xs mt-1">
              {errors?.password?.message}
            </p>
          )}
        </div>

        {/* Keep me logged in */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-[9px]">
            <input
              className="h-3 w-3 border-opacity-30"
              id="keep_me_logged"
              type="checkbox"
              checked={keepMeLoggedIn}
              onChange={(e) => setKeepMeLoggedIn(e.target.checked)}
            />
            <label
              className="select-none font-sans text-xs text-white"
              htmlFor="keep_me_logged"
            >
              Keep me logged in
            </label>
          </div>
          <div>
            <LinkButton
              href={"/forget-password"}
              className="text-white text-xs bg-transparent p-0"
            >
              Forget Password?
            </LinkButton>
          </div>
        </div>

        {/* Submit Button + Signup Link */}
        <div className="mt-[2rem] xl:mt-[4.5rem] flex flex-col pb-[1.75rem] xl:pb-[2.75rem]">
          <Button className="w-full bg-white text-[#2B3AA6] h-11 rounded-10 font-outfit text-sm">
            Login
          </Button>
          <LinkButton
            className="w-full border-[0.5px] border-[#FFFFFF] font-extralight mt-6 text-white h-11 rounded-10 font-outfit text-sm"
            variant={"outlined"}
            href={"/sign-up"}
          >
            Don’t have an account? <span className="font-normal pl-1">Signup</span>
          </LinkButton>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
