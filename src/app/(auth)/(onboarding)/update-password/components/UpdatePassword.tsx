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
import { useRouter } from "next/navigation";
import PinInput from "react-pin-input";
import useIsMobile from "@/app/(main)/misc/components/insurance/util/UseMobile";
import { Input2 } from "@/components/core/Input2";
import { useUpdatePassword } from "../../api/updatePassword";
import { SmallSpinner } from "@/icons/core";
import useDataStore from "@/app/store/useStore";
import { maskPhoneNumber } from "@/utils/strings";
import REsetOtpIcon from "@/app/(main)/misc/components/insurance/icons/ResentOtpIcon";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
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
        .min(5, { message: "Password must be at least 5 characters." })
        .refine(
          (value) =>
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{8,}$/.test(
              value
            ),
          {
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
          }
        ),
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
  const forgetPasswordDetails = useDataStore(
    (state) => state?.forgetPasswordDetails
  );
  const removeForgetPasswordDetails = useDataStore(
    (state) => state?.removeForgetPasswordDetails
  );
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
        phone_number: forgetPasswordDetails?.phone_number,
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
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const [errorMsg, setErrorMsg] = React.useState("");
  const [passwordShown, setPasswordShown] = React.useState(false);

  const router = useRouter();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

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
          removeForgetPasswordDetails();
          router?.push("/login");
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          setErrorMsg(error?.response?.data?.error);

          openErrorModalWithMessage(String(errorMessage));
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
        <div className="py-[.8125rem] text-center my-6 w-full bg-[#21253d] rounded-lg">
          <p className="text-base text-white font-semibold">
            Dial *347*180*52# to get an OTP.
          </p>
        </div>
        <div className="w-full py-4">
          <p className="text-xs font-medium text-white pb-4">
            Enter the OTP code sent to your number{" "}
            {maskPhoneNumber(forgetPasswordDetails?.phone_number)}
          </p>
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
          </div>
          <div className="flex w-full mt-3 items-center justify-between px-4">
            <div className="text-white text-xs">
              {/* <Countdown onTimeUp={handleTimeUp} reset={resetTimer} /> */}
            </div>
            {/* {showResendOtpButton && ( */}
            <button
              type="button"
              className="flex items-center gap-[.3125rem] text-white text-[.625rem]"
              // onClick={handleResendOtp}
            >
              <REsetOtpIcon /> Resend OTP
            </button>
            {/* )} */}
          </div>
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
            value={String(forgetPasswordDetails?.phone_number)}
            {...register("passwordData.phone_number")}
          />
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
              <input
                className="login-autofill-text  focus-visible:outline-none  pr-7 login-no-chrome-autofill-bg h-full  outline-none border-none  rounded-lg bg-transparent  px-6 py-3.5 text-sm font-sans font-medium text-white placeholder:text-white  focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#403C3A]"
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
        <p className="text-white leading-[15px] opacity-80 text-[.625rem] my-2">
          Must be at least 6 characters long - uppercase, lowercase, number,
          special characters (@*-!_)
        </p>
        <div className="mt-4">
          <Label
            className="text-white font-sans text-sm mb-2"
            htmlFor="password"
          >
            Confirm Pasword
          </Label>

          <div className="flex items-center relative w-full pr-10 md:pr-16  !bg-white/10 rounded-lg h-[3rem] ">
            <input
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
      ></ErrorModal>
    </>
  );
};

export default UpdatePassword;
