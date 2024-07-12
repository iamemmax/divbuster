"use client";

import { Label } from "@radix-ui/react-label";

import * as React from "react";

import { Button } from "@/components/core/Button";
import { ErrorModal } from "@/components/core/ErrorModal";
import { Input } from "@/components/core/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderModal } from "@/components/core/LoaderModal";
import { useBooleanStateControl, useErrorModalState } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import { FormError } from "@/components/core";
import EyeIcon from "@/app/(main)/misc/icons/EyeIcon";
import { useRouter, useSearchParams } from "next/navigation";
import PinInput from "react-pin-input";
import useIsMobile from "@/app/(main)/misc/components/insurance/util/UseMobile";
import { Input2 } from "@/components/core/Input2";
import { useUpdatePassword } from "../../api/updatePassword";
import { SmallSpinner } from "@/icons/core";
// import { useChangePassword } from "../../../api/createPassword";

const PasswordFormSchema = z.object({
  passwordData: z
    .object({
      phone_number: z
        .string({ required_error: "Enter your phone number" })
        .trim()
        .min(10, { message: "Phone number should be at least 11 digits" }),
      otp: z
        .string()
        .length(6, "otp must be exactly 6 digits")
        .regex(/^\d+$/, "otp must be numeric"),
      new_password: z
        .string({ required_error: "Please enter your password." })
        .trim()
        .min(1, { message: "password must be at least 1 characters." }),

      confirm_password: z
        .string({ required_error: "Please enter your password." })
        .trim()
        .min(1, { message: "Password must be at least 1 characters." }),
    })
    .refine((data) => data?.new_password === data?.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"],
    }),
});

const UpdatePassword = () => {
  const { state: isLoaderModalOpen, setTrue: _openLoaderModal } =
    useBooleanStateControl();

  type passwordformProps = z.infer<typeof PasswordFormSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordformProps>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      passwordData: {
        otp: "",
        new_password: "",
        confirm_password: "",
      },
    },

    mode: "onChange",
  });

  const {
    isErrorModalOpen,
    setErrorModalState,
    closeErrorModal,
    errorModalMessage,
  } = useErrorModalState();

  const [passwordShown, setPasswordShown] = React.useState(false);
  const router = useRouter();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const search = useSearchParams();
  const phone = search?.get("phone");
  const { mutate: handleChangePassword, isLoading } = useUpdatePassword();
  const onsubmit = ({
    passwordData: { confirm_password, new_password, otp, phone_number },
  }: passwordformProps) => {
    handleChangePassword(
      {
        otp,
        confirm_password,
        new_password,
        phone_number,
      },
      {
        onSuccess: () => {
          router?.push("/login");
        },
      }
    );
  };

  // mobile responsiveness
  const isMobile = useIsMobile();

  return (
    <>
      <LoaderModal isOpen={isLoaderModalOpen} />

      <form className="relative z-10" onSubmit={handleSubmit(onsubmit)}>
        <div className="w-full py-4">
          <Label
            className="text-white font-sans text-sm mb-2"
            htmlFor="password"
          >
            OTP
          </Label>
          <div className="mt-3">
            <Controller
              name="passwordData.otp"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <PinInput
                  {...field}
                  autoSelect={false}
                  initialValue=""
                  inputFocusStyle={{
                    border: "none",
                    background: "#1E2753",
                    boxShadow: "0 0 0 4.5px #fff, 0 0 0 5.8px #032282",
                  }}
                  inputMode="number"
                  inputStyle={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    border: "transparent",
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                    transition: "all 0.45s ease-in-out",
                    width: isMobile ? "1.8rem" : "2.5rem",
                    height: isMobile ? "1.8rem" : "2.5rem",
                  }}
                  length={6}
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    gap: isMobile ? "0.4rem" : "0.625rem",
                    margin: "auto",
                  }}
                  type="numeric"
                  secret
                />
              )}
            />
            {/* {errors?.pin && (
                    <p className="text-red-500 mt-4 text-xs">
                      {errors.pin.message}
                    </p>
                  )} */}
          </div>
          {/* <div className="flex w-full mt-3 items-center justify-between px-4">
            <div className="text-white text-xs">
              <Countdown onTimeUp={handleTimeUp} reset={resetTimer} />
            </div>
            {showResendOtpButton && (
              <button
                type="button"
                className="flex items-center gap-[.3125rem] text-white text-[.625rem]"
                onClick={handleResendOtp}
              >
                <REsetOtpIcon /> Resend OTP
              </button>
            )}
          </div> */}
        </div>

        <div className={`relative mt-[.25rem] hidden`}>
          <Label
            className="text-white font-sans text-sm mb-2"
            htmlFor="password"
          >
            Phone Number
          </Label>
          <Input2
            className={`${errors?.passwordData?.phone_number?.message ? "border border-red-700" : ""} text-[#fff]`}
            placeholder="Enter your phone number"
            type="number"
            id="phone"
            value={String(phone)}
            {...register("passwordData.phone_number")}
          />
          {/* 
                      {errors?.phone_number && (
                        <FormError
                          className="bg-red-900/40 text-white"
                          errorMessage={errors?.phone_number?.message}
                        />
                      )} */}
          {/* {isLoading && (
            <div className=" absolute top-[1.3rem] transform -translate-y-1/2 right-[1rem]">
              <SmallSpinner className="" color="#fff" />
            </div>
          )} */}
        </div>

        <div className="mt-4">
          <div>
            <Label
              className="text-white font-sans text-sm mb-2"
              htmlFor="password"
            >
              Password
            </Label>

            <div className="flex items-center w-full  pr-10 md:pr-16 !bg-white/10 rounded-lg h-[3rem] ">
              <Input
                className="login-autofill-text  pr-7 login-no-chrome-autofill-bg h-full  outline-none border-none  rounded-lg bg-transparent  px-6 py-3.5 text-sm font-sans font-medium text-white placeholder:text-white  focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#403C3A]"
                id="password"
                placeholder="Enter password"
                type={passwordShown ? "text" : "password"}
                {...register("passwordData.new_password")}
              />

              <button
                type="button"
                className="absolute right-5"
                onClick={togglePassword}
              >
                <EyeIcon />
              </button>
            </div>

            {errors?.passwordData?.new_password && (
              <FormError
                className="mt-3 bg-red-900/40 text-white"
                errorMessage={errors?.passwordData?.new_password.message}
              />
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label
            className="text-white font-sans text-sm mb-2"
            htmlFor="password"
          >
            Confirm Pasword
          </Label>

          <div className="flex items-center relative w-full pr-10 md:pr-16  !bg-white/10 rounded-lg h-[3rem] ">
            <Input
              className="login-autofill-text !outline-none !border-none login-no-chrome-autofill-bg h-full rounded-lg bg-transparent px-6 py-3.5 text-sm font-sans font-medium text-white placeholder"
              id="password"
              placeholder="Enter password"
              type={passwordShown ? "text" : "password"}
              {...register("passwordData.confirm_password")}
              style={{ outline: "none", border: "none" }}
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
          {errors?.passwordData?.confirm_password && (
            <FormError
              className="mt-3 bg-red-900/40 text-white"
              errorMessage={errors?.passwordData?.confirm_password?.message}
            />
          )}
        </div>

        <Button
          className="my-6 mt-16 flex items-center justify-center gap-x-5 w-full rounded-[20px] text-[#1B1687] font-sans py-[.9375rem] text-base leading-[normal]"
          type="submit"
          variant="white"
        >
          {isLoading ? (
            <SmallSpinner className="" color="#1B1687" />
          ) : (
            "Reset password"
          )}
        </Button>
      </form>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={setErrorModalState}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      >
        <div className="flex gap-3 rounded-2xl bg-red-50 px-8 py-6">
          <Button
            className="grow bg-red-950 px-1.5 sm:text-sm md:px-6"
            size="lg"
            type="button"
            onClick={closeErrorModal}
          >
            Okay
          </Button>
        </div>
      </ErrorModal>
    </>
  );
};

export default UpdatePassword;
