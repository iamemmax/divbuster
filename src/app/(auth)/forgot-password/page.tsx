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

import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '../sign-up/translations';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/core';
import CaretDownIcon from '@/icons/core/CaretDown';
import { Check } from 'lucide-react';
import { LoginLanguages } from "../login";

const ForgetPasswordPage = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const { language, setLanguage } = useLanguage();
  const t = translations[language] || translations.en;
  const [currentStep, setCurrentStep] = useState<LoginStep>("forget-password");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { language: contextLanguage, setLanguage: updateLanguage } = useLanguage();

  const languages = [
    { value: 'en', label: 'English', flag: '/flags/us.svg' },
    { value: 'es', label: 'Español', flag: '/flags/es.svg' },
    { value: 'fr', label: 'Français', flag: '/flags/fr.svg' },
    { value: 'nl', label: 'Nederlands', flag: '/flags/nl.svg' }
  ];

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
          setSuccessMessage(t.forgotPassword.successMessage);
          handleNext();
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };
  const handleLanguageChange = (value: string) => {
      const newLanguage = value as Language;
      
      // Update local state first
      setLanguage(newLanguage);
      
      // Update context (this will handle localStorage)
      updateLanguage(newLanguage);
    };

  const renderCurrentStep = () => {
    const stepComponents = {
      "forget-password": (
        <div className="md:px-[30px] px-6 py-[30px] h-full xl:px-[9.125rem] xl:py-[7rem]">
          <div className="flex justify-center mb-7 mt-[4rem] items-center md:hidden">
            <DiveBusterBlackLogo />
          </div>
          <div className="flex justify-center items-center flex-col">
            <h2 className="font-archivo text-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39] dark:text-white">
              {t.forgotPassword.title}
            </h2>
            <p className="font-archivo text-[#8D9196] font-medium text-xs 2xl:text-base text-center mt-2">
              {t.forgotPassword.subtitle}
            </p>
          </div>
          <div className="mt-[1.3125rem]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="font-archivo text-[#1E293B] dark:text-white text-base font-medium mb-2"
                >
                  {t.forgotPassword.emailLabel}
                </label>
                <input
                  type="email"
                  placeholder={t.forgotPassword.emailPlaceholder}
                  id="email"
                  className={`border ${
                    errors.email ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] text-black dark:text-white text-sm bg-transparent font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
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
                    {t.forgotPassword.sendingText} <SmallSpinner color="#fff" />
                  </>
                ) : (
                  t.forgotPassword.submitButton
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <LinkButton
              variant={"outlined"}
                href="/login"
                className="text-[#F7931D] border border-[#F7931D] w-full hover:text-[#E8821A] font-archivo text-sm font-medium transition-colors"
              >
                {t.forgotPassword.backToLogin}
              </LinkButton>
            </div>
          </div>

          <ErrorModal
            isErrorModalOpen={isErrorModalOpen}
            setErrorModalState={() => {
              setErrorModalState(false);
            }}
            subheading={
              errorModalMessage || t.forgotPassword.errorMessage
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

  return (
    <div className="w-full relative h-full">
   <div className="flex  absolute right-6 xl:right-[9rem] top-5 justify-end items-center">
  <Select
    value={language || ""}
    onValueChange={handleLanguageChange}
    defaultValue={language}
    onOpenChange={setIsOpen}
  >
    <div className="relative">
      <SelectTrigger
      iconClassName="hidden"
        id="language"
        className={`border bg-transparent max-w-[9.5rem] w-full relative text-black dark:text-white outline-none h-[3rem] text-sm font-archivo rounded-xl px-[.875rem] pr-10`}
      >
        <div className="flex items-center gap-3">
          {LoginLanguages.find(lang => lang.value === language) && (
            <>
              <img
                src={LoginLanguages.find(lang => lang.value === language)?.flag}
                alt="Selected language flag"
                className="w-5 h-5 rounded-sm object-cover"
              />
              <span className="dark:text-white">{LoginLanguages.find(lang => lang.value === language)?.label}</span>
            </>
          )}
        </div>
        <CaretDownIcon
          color="#8D9196"
          className={`absolute right-2  top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </SelectTrigger>
    </div>
    <SelectContent>
      {LoginLanguages.map((lang) => (
        <SelectItem

          key={lang.value}
          value={lang.value}
          className="px-2 [&>span[data-radix-select-item-indicator]]:hidden dark:"
        >
          <div className="flex items-center justify-between w-full gap-3">
            <div className="flex items-center gap-3">
              <img
                src={lang.flag}
                alt={`${lang.label} flag`}
                className="w-5 h-5 rounded-sm object-cover"
              />
              <span className="dark:text-white text-black">{lang.label}</span>
            </div>
            {language === lang.value && (
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center ml-auto">
                <Check 
                  className="w-3 h-3 text-white" 
                  strokeWidth={3}
                />
              </div>
            )}
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
      {renderCurrentStep()}
    </div>
  );
};

export default ForgetPasswordPage;