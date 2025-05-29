"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DiveBusterBlackLogo from "@/components/icons/DiveBusterBlackLogo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgetPasswordUserSchema } from "../schema";
import { Button, ErrorModal } from "@/components/core";
import Link from "next/link";
import { useAuth } from "@/contexts/authentication";
import { useErrorModalState } from "@/hooks";
import { SmallSpinner } from "@/icons/core";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { Language } from "../sign-up/translations";
import UpdatePassword from "./UpdatePassword";
import { useResendVerifyEmail } from "../api/verification/resendVerification";

type LoginStep = "forget-password" | "update-password";

// Create translations object for login page

export type forgetDetailsValue = z.infer<typeof forgetPasswordUserSchema>;

const ForgetPasswordPage = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [currentStep, setCurrentStep] = useState<LoginStep>("forget-password");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const lang = localStorage.getItem("preferredLanguage");

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
    // 'mfa-verification'
  ];
  const getStepIndex = (step: LoginStep) => stepOrder.indexOf(step);

  const handleNext = () => {
    const currentIndex = getStepIndex(currentStep);
    const nextIndex = currentIndex + 1;

    setCurrentStep(stepOrder[nextIndex]);
  };

  const goToPreviousStep = () => {
    const currentIndex = getStepIndex(currentStep);
    const prevIndex = currentIndex - 1;
    setCurrentStep(stepOrder[prevIndex]);
  };

  const onSubmit = (data: forgetDetailsValue) => {
    resendverifyEmail(
      {
        email: data.email,
        lang: String(lang) || "en",
      },
      {
        onSuccess: () => {
          setSuccessMessage("Verification Code sent to your email");
          handleNext();
          setTimeout(() => {
            setSuccessMessage(null), 5000;
          });
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
        <div className="md:px-[30px] px-6 py-[30px]  xl:px-[9.125rem] xl:py-[7rem]">
          <div className="flex justify-center mb-7 items-center lg:hidden ">
            <DiveBusterBlackLogo />
          </div>
          <div className="flex justify-center items-center flex-col">
            <h2 className="font-archivo text-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39]">
              Forget Password
            </h2>
            <p className="font-archivo text-[#8D9196] font-medium text-xs 2xl:text-base">
              Please enter your email address to reset your password
            </p>
          </div>
          <div className="mt-[1.3125rem]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col ">
                <label
                  htmlFor="email"
                  className="font-archivo text-[#1E293B] text-base font-medium"
                >
                  Email
                </label>
                <input
                  type="text"
                  placeholder={"enter Email"}
                  id="email"
                  className={`border ${errors.email ? "border-red-500" : "border-[#E2E8F0]"} outline-none py-[.8125rem] text-black text-sm bg-transparent font-archivo rounded-lg px-[.875rem]`}
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-red-900 text-xs font-archivo">
                    {errors?.email?.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="bg-[#F7931D] border flex items-center justify-center gap-x-3 border-[#F7931D] font-archivo font-semibold text-base mt-5 w-full h-[50px]"
              >
                Submit {isLoading && <SmallSpinner color="#fff" />}
              </Button>
            </form>
          </div>

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
      ),

      "update-password": (
        <>
          {successMessage && (
            <div className="mb-4 w-full">
              <div className="bg-green-100 border w-full border-green-400 text-green-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{successMessage}</span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setSuccessMessage(null)}
                >
                  <svg
                    className="fill-current h-6 w-6 text-green-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                  </svg>
                </span>
              </div>
            </div>
          )}

          <UpdatePassword
            email={watchEmail}
            goToPreviousStep={goToPreviousStep}
          />
        </>
      ),
    };
    return stepComponents[currentStep];
  };

  return <div className="w-full h-full">{renderCurrentStep()}</div>;
};

export default ForgetPasswordPage;
