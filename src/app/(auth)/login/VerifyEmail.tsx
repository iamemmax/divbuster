import { useErrorModalState } from "@/hooks";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useLanguage } from "../sign-up/contexts/LanguageContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerifyEmail } from "../api/verification/verifyEmail";
import { useResendVerifyEmail } from "../api/verification/resendVerification";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { Button, ErrorModal } from "@/components/core";
import { SmallSpinner } from "@/icons/core";
// Validation schema
const verificationSchema = z.object({
  token: z.string().min(5, "Verification code is required"),
});
type VerificationFormValues = z.infer<typeof verificationSchema>;

interface prop {
  email: string;
  goToPreviousStep: () => void;
}
const VerifyEmail = ({ email, goToPreviousStep }: prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { t } = useLanguage();
  // const router = useRouter();
  const [_errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      token: "",
    },
  });

  const lang = localStorage.getItem("preferredLanguage");
  const { mutate: verifyEmail, isLoading: isVerifying } = useVerifyEmail();
  const { mutate: resendverifyEmail, isLoading: isResending } =
    useResendVerifyEmail();
  const onSubmit = async (data: VerificationFormValues) => {
    // Clear any previous error messages
    setErrorMessage(null);

    verifyEmail(
      { email, token: data?.token, lang: String(lang) },
      {
        onSuccess: (data) => {
          setSuccessMessage(data?.message);
          setTimeout(() => {
             setErrorModalState(false);
              goToPreviousStep();
          }, 1500);
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));

          if (
            errorMessage ===
            "Account is already verified, please proceed to login"
          ) {
           setTimeout(() => {
             setErrorModalState(false);
              goToPreviousStep();
          }, 1500);
          }
        },
      }
    );
  };
  

  const handleResend = async () => {
    // Clear any previous error messages
    setErrorMessage(null);

    resendverifyEmail(
      {
        email,
        lang: String(lang) || "en",
      },
      {
        onSuccess: () => {
          setSuccessMessage("Verification link sent to your email");
          setTimeout(() => setSuccessMessage(null), 3000);
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };
  return (
    <div className="md:px-[30px] px-6 py-[30px] h-full border  xl:px-[9.125rem] xl:py-28">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="size-full flex   flex-col items-center justify-center "
      >
        {successMessage && (
          <div className="mb-4 w-full">
            <div className="bg-green-100 border w-full border-green-400 text-green-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{successMessage}</span>
              <span
                className="absolute inset-y-0 right-0 px-4 py-3"
                onClick={() => setSuccessMessage(null)}
              >
                <svg
                  className="fill-current size-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>{t.emailVerification.closeButton}</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center py-3 flex-col">
          <h2 className="font-archivo text-[1.2rem] 2xl:text-[1.5rem] font-semibold text-[#1E1B39]">
            {t.verifyEmail?.title}
          </h2>
        </div>
        <div className="mb-6 w-full ">
          <label
            htmlFor="token"
            className="block text-sm font-medium text-[#1E1B39] mb-2"
          >
            {t.emailVerification.verificationCodeLabel}
          </label>
          <input
            id="token"
            type="text"
            placeholder={t.emailVerification.verificationCodePlaceholder}
            className={`w-full px-3 py-2 border ${
              errors.token ? "border-red-500" : "border-[#E2E8F0]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7931D] h-12 text-sm font-archivo`}
            {...register("token")}
          />
          {errors.token && (
            <p className="text-red-500 text-xs mt-1">
              {t.emailVerification.errors.tokenRequired}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-4 bg-[#F7931D] text-white flex items-center justify-center gap-x-3 rounded-lg font-medium"
          disabled={isVerifying}
        >
          {isVerifying ? (
            <SmallSpinner color="#fff" />
          ) : (
            t.emailVerification.submitButton
          )}
        </Button>

        <div className="text-center mt-6">
          <p className="text-[#1E1B39] text-sm inline-flex items-center">
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

export default VerifyEmail;
