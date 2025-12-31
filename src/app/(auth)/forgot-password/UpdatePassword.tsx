import { useErrorModalState } from "@/hooks";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "../sign-up/translations";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResendVerifyEmail } from "../api/verification/resendVerification";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { Button, ErrorModal, LinkButton } from "@/components/core";
import { SmallSpinner } from "@/icons/core";
import EyeIcon from "@/app/icons/EyeIcon";
import { useUpdatePassword } from "../api/forget-password/reset-password";
import { useRouter } from "next/navigation";
import SuccessMessage from "@/components/core/SuccessMessageModal";

type UpdatePasswordFormValues = {
  otp: string;
  password: string;
  confirm_password: string;
};

interface prop {
  email: string;
  goToPreviousStep: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

const UpdatePassword = ({ email, goToPreviousStep, isFirstStep = false, isLastStep = false }: prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  // Define schema inside component to access translations
  const updatePasswordSchema = z.object({
    otp: z.string().min(5, t.emailVerification.errors.tokenRequired),
    password: z.string()
      .min(8, t.emailVerification.errors.passwordMinLength)
      .refine(
        (value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{8,}$/.test(value),
        {
          message: t.emailVerification.errors.passwordComplexity
        }
      ),
    confirm_password: z.string().min(1, t.emailVerification.errors.confirmPasswordRequired)
  }).refine((data) => data.password === data.confirm_password, {
    message: t.emailVerification.errors.passwordsDoNotMatch,
    path: ["confirm_password"]
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirm_password: "",
      
    },
  });

  const lang = language;
  const { mutate: resendverifyEmail, isLoading: isResending } =
    useResendVerifyEmail();
  const { mutate: handleUpdatePassword, isLoading } = useUpdatePassword();
    
  const onSubmit = async (data: UpdatePasswordFormValues) => {
    handleUpdatePassword(
      { 
        email, 
        otp: data.otp, 
        password: data.password,
        lang:language
      },
      {
        onSuccess: (data) => {
          setSuccessMessage(data?.message);
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  const handleResend = async () => {
    resendverifyEmail(
      {
        email,
        lang: String(lang) || "en",
      },
      {
        onSuccess: () => {
          setSuccessMessage(t.forgotPassword?.successMessage || "Verification code sent to your email");
          setTimeout(() => setSuccessMessage(null), 3000);
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

   const handleCloseSuccessMessage = () => {
    setSuccessMessage(null);
  };

  
  return (
    <div className="md:px-[30px] px-6 py-[30px] h-full border 2xl:px-[9.125rem] xl:py-[7rem]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col items-center justify-center"
      >
        {successMessage && (
            <div className="px-6 pt-6 w-full">
              <SuccessMessage
                message={successMessage}
                onClose={handleCloseSuccessMessage}
                autoHide={true}
                autoHideDuration={8000}
              />
            </div>
          )}
        
        <div className="flex justify-center items-center py-3 flex-col">
          <h2 className="font-archivo text-[1.2rem] 2xl:text-[1.5rem] font-semibold text-[#1E1B39] dark:text-white">
            {t.verifyEmail?.title || "Update Password"}
          </h2>
        </div>
        
        {/* OTP Field */}
        <div className="mb-5 w-full">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-[#1E1B39] dark:text-white mb-2"
          >
            {t.emailVerification.verificationCodeLabel}
          </label>
          <input
            id="otp"
            type="text"
            placeholder={t.emailVerification.verificationCodePlaceholder}
            className={`w-full px-3 py-2 border ${
              errors.otp ? "border-red-500" : "border-[#E2E8F0]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7931D] h-[3rem] text-sm font-archivo`}
            {...register("otp")}
          />
          {errors.otp && (
            <p className="text-red-500 text-xs mt-1">
              {errors.otp.message}
            </p>
          )}
        </div>
        
        {/* Password Field */}
        <div className="mb-5 w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#1E1B39] dark:text-white mb-2"
          >
            {t.emailVerification.passwordLabel}
          </label>
          <div className={`relative border ${
            errors.password ? "border-red-500" : "border-[#E2E8F0]"
          } rounded-lg focus-within:ring-2 focus-within:ring-[#F7931D] h-[3rem]`}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t.emailVerification.passwordPlaceholder}
              className="w-full h-full px-3 py-2 border-none outline-none  text-sm font-archivo rounded-lg"
              {...register("password")}
            />
             <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-black dark:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <EyeIcon className="text-black dark:text-white" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        
        {/* Confirm Password Field */}
        <div className="mb-5 w-full">
          <label
            htmlFor="confirm_password"
            className="block text-sm font-medium text-[#1E1B39] dark:text-white mb-2"
          >
            {t.emailVerification.confirmPasswordLabel}
          </label>
          <div className={`relative border ${
            errors.confirm_password ? "border-red-500" : "border-[#E2E8F0]"
          } rounded-lg focus-within:ring-2 focus-within:ring-[#F7931D] h-[3rem]`}>
            <input
              id="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t.emailVerification.confirmPasswordPlaceholder}
              className="w-full h-full px-3 py-2 border-none outline-none  text-sm font-archivo rounded-lg"
              {...register("confirm_password")}
            />
             <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-black dark:text-white"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {!showConfirmPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <EyeIcon className="text-black dark:text-white" />
              )}
            </button>
          </div>
          {errors.confirm_password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        <div className="text-end w-full mt-6">
          <p className="text-[#1E1B39] dark:text-white text-sm inline-flex items-end">
            {t.emailVerification.noCodeText}{" "}
            <button
              type="button"
              onClick={handleResend}
              className="text-[#F7931D] font-medium ml-1"
              disabled={isResending}
            >
              {isResending
                ? t.emailVerification.resendingText
                : t.emailVerification.resendButton}
            </button>
          </p>
        </div>

<div className="grid w-full items-center sm:gap-4 sm:grid-cols-2">
  
        <div className="w-full">
          <Button
          type="submit"
          className="bg-[#F7931D] border  flex items-center justify-center gap-x-3 border-[#F7931D] font-archivo font-semibold text-base mt-6 w-full h-[50px]"
        >
          {t.emailVerification.submitButton} {isLoading && <SmallSpinner color="#fff" />}
        </Button>
        </div>
        <div className="mt-6 text-center w-full">
              <LinkButton
              variant={"outlined"}
                href="/login"
                className="text-[#F7931D] border border-[#F7931D] w-full hover:text-[#E8821A] font-archivo text-sm h-[50px] font-medium transition-colors"
              >
              {t.emailVerification.backToLoginButton}
              </LinkButton>
            </div>
</div>
      </form>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      ></ErrorModal>
    </div>
  );
};

export default UpdatePassword;
