"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DiveBusterBlackLogo from "@/components/icons/DiveBusterBlackLogo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgetPasswordUserSchema } from "../schema";
import { Button, ErrorModal, LinkButton } from "@/components/core";
import Link from "next/link";
import { useAuth } from "@/contexts/authentication";
import { useErrorModalState } from "@/hooks";
import { SmallSpinner } from "@/icons/core";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { Language } from "../sign-up/translations";
import UpdatePassword from "./UpdatePassword";
import { useResendVerifyEmail } from "../api/verification/resendVerification";
import SuccessMessage from "@/components/core/SuccessMessageModal";

type LoginStep = "forget-password" | "update-password";

export type forgetDetailsValue = z.infer<typeof forgetPasswordUserSchema>;

const ForgetPasswordPage = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [currentStep, setCurrentStep] = useState<LoginStep>("forget-password");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Safe localStorage access with fallback
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lang = localStorage.getItem("preferredLanguage");
      setLanguage(lang || "en");
    }
  }, []);

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<forgetDetailsValue>({
    resolver: zodResolver(forgetPasswordUserSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const { mutate: resendverifyEmail, isLoading: isLoading } =
    useResendVerifyEmail();

  // Watch for authentication state changes
  useEffect(() => {
    if (authState.isAuthenticated && !authState.isLoading) {
      router.push("/");
    }
  }, [authState.isAuthenticated, authState.isLoading, router]);

  const watchEmail = watch("email");
  const stepOrder: LoginStep[] = [
    "forget-password",
    "update-password",
  ];

  const getStepIndex = (step: LoginStep) => stepOrder.indexOf(step);

  const handleNext = () => {
    const currentIndex = getStepIndex(currentStep);
    const nextIndex = currentIndex + 1;
    if (nextIndex < stepOrder.length) {
      setCurrentStep(stepOrder[nextIndex]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = getStepIndex(currentStep);
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(stepOrder[prevIndex]);
    }
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage(null);
  };

  const onSubmit = (data: forgetDetailsValue) => {
    resendverifyEmail(
      {
        email: data.email,
        lang: language,
      },
      {
        onSuccess: () => {
          setSuccessMessage("Verification Code sent to your email");
          handleNext();
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  const renderCurrentStep = () => {
    const stepComponents = {
      "forget-password": (
        <div className="md:px-[30px] px-6 py-[30px] h-full xl:px-[9.125rem] xl:py-[7rem]">
          <div className="flex justify-center mb-7 items-center lg:hidden">
            <DiveBusterBlackLogo />
          </div>
          <div className="flex justify-center items-center flex-col">
            <h2 className="font-archivo text-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39]">
              Forget Password
            </h2>
            <p className="font-archivo text-[#8D9196] font-medium text-xs 2xl:text-base text-center mt-2">
              Please enter your email address to reset your password
            </p>
          </div>
          <div className="mt-[1.3125rem]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="font-archivo text-[#1E293B] text-base font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  className={`border ${
                    errors.email ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] text-black text-sm bg-transparent font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-red-500 text-xs font-archivo mt-1">
                    {errors?.email?.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || !isValid}
                className="bg-[#F7931D] hover:bg-[#E8821A] disabled:opacity-50 disabled:cursor-not-allowed border flex items-center justify-center gap-x-3 border-[#F7931D] font-archivo font-semibold text-base mt-5 w-full h-[50px] transition-colors"
              >
                {isLoading ? (
                  <>
                    Sending... <SmallSpinner color="#fff" />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <LinkButton
              variant={"outlined"}
                href="/login"
                className="text-[#F7931D] border border-[#F7931D] w-full hover:text-[#E8821A] font-archivo text-sm font-medium transition-colors"
              >
                Back to Login
              </LinkButton>
            </div>
          </div>

          <ErrorModal
            isErrorModalOpen={isErrorModalOpen}
            setErrorModalState={() => {
              setErrorModalState(false);
            }}
            subheading={
              errorModalMessage || "Please check your inputs and try again."
            }
          />
        </div>
      ),

      "update-password": (
        <div className="w-full h-full">
          {successMessage && (
            <div className="px-6 pt-6">
              <SuccessMessage
                message={successMessage}
                onClose={handleCloseSuccessMessage}
                autoHide={true}
                autoHideDuration={8000}
              />
            </div>
          )}
          <UpdatePassword
            email={watchEmail}
            goToPreviousStep={goToPreviousStep}
          />
        </div>
      ),
    };
    return stepComponents[currentStep];
  };

  return <div className="w-full h-full">{renderCurrentStep()}</div>;
};

export default ForgetPasswordPage;