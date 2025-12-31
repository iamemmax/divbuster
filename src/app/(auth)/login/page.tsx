

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DiveBusterBlackLogo from "@/components/icons/DiveBusterBlackLogo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginUserSchema } from "../schema";
import { Button, ErrorModal, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core";
import EyeIcon from "@/app/icons/EyeIcon";
import Link from "next/link";
import { useLogin } from "../api/login";
import { useAuth } from "@/contexts/authentication";
import { useErrorModalState } from "@/hooks";
import { SmallSpinner } from "@/icons/core";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { Language } from "../sign-up/translations";
import SocialAuth from "../components/SocialAuth";
import VerifyEmail from "./VerifyEmail";
import CaretDownIcon from "@/icons/core/CaretDown";
import { useLanguage } from "@/hooks/useLanguage";
import { Check } from 'lucide-react'; // or use @phosphor-icons/react
import { LoginLanguages, LoginTranslations } from ".";
import DivebusterLogo from "@/components/icons/Logo";

// import { useLanguage } from "../sign-up/contexts/LanguageContext";

type LoginStep =
  | 'login'
  | 'verify'

// Create translations object for login page

export type LoginDetailsValue = z.infer<typeof loginUserSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [currentStep, setCurrentStep] = useState<LoginStep>('login');
  const { language: contextLanguage, setLanguage: updateLanguage } = useLanguage();
  const [language, setLanguage] = useState<Language>(contextLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize language only once on mount
  useEffect(() => {
    if (!initialized && typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem("preferredLanguage") as Language | null;
      if (storedLanguage && LoginTranslations && LoginTranslations[storedLanguage]) {
        setLanguage(storedLanguage);
        updateLanguage(storedLanguage);
      } else {
        setLanguage(contextLanguage || 'en');
      }
      setInitialized(true);
    }
  }, [initialized, contextLanguage, updateLanguage]);

  // Sync with context language changes (but avoid loops)
  useEffect(() => {
    if (initialized && contextLanguage !== language) {
      setLanguage(contextLanguage);
    }
  }, [contextLanguage, initialized]);

  // Get LoginTranslations for current language
  const t = LoginTranslations?.[language] || LoginTranslations?.en || {
    title: "Log in to your account",
    subtitle: "Welcome back! Please enter your details",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot Password?",
    loginButton: "Login",
    noAccount: "Don't have an account?",
    register: "Register"
  };

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<LoginDetailsValue>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      password: "",
      email: "",
    },
    mode: "onChange",
  });

  const { mutate: handleLogin, isLoading } = useLogin();

  // Watch for authentication state changes
  useEffect(() => {
    if (authState.isAuthenticated && !authState.isLoading) {
      router.replace("/");
    }
  }, [authState.isAuthenticated, authState.isLoading, router]);

  const watchEmail = watch("email")
  const stepOrder: LoginStep[] = [
    "login", "verify"
  ];
  const getStepIndex = (step: LoginStep) => stepOrder.indexOf(step);

  const handleNext = () => {
    const currentIndex = getStepIndex(currentStep);
    const nextIndex = currentIndex + 1;
    setCurrentStep(stepOrder[nextIndex]);
  }

  const goToPreviousStep = () => {
    const currentIndex = getStepIndex(currentStep);
    const prevIndex = currentIndex - 1;
    setCurrentStep(stepOrder[prevIndex]);
  };

  const onSubmit = (data: LoginDetailsValue) => {
    handleLogin({...data,lang:contextLanguage}, {
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));

        if (errorMessage === "Kindly verify account to continue") {
          handleNext()
        }
      },
    });
  };

  // Fixed: Improved language change handler
  const handleLanguageChange = (value: string) => {
    const newLanguage = value as Language;
    
    // Update local state first
    setLanguage(newLanguage);
    
    // Update context (this will handle localStorage)
    updateLanguage(newLanguage);
  };

  const renderCurrentStep = () => {
    const stepComponents = {
      "login": (
        <div className="md:px-[30px] px-6 py-[30px]  xl:px-[9.125rem] xl:py-[7rem]">

          <div className="flex justify-center z-[9999999999999] mt-[4rem] items-center md:hidden ">
            <DiveBusterBlackLogo className="dark:"/>
            {/* <DivebusterLogo className=" dark:block"/> */}
          </div>
          <div className="flex justify-center mt-[2rem] items-center flex-col">
            <h2 className="font-archivo text-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39] dark:text-white">
              {t.title}
            </h2>
            <p className="font-archivo text-[#8D9196] dark:text-gray-300 font-medium text-xs 2xl:text-base">
              {t.subtitle}
            </p>
          </div>
          <div className="mt-[1.3125rem]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col ">
                <label
                  htmlFor="email"
                  className="font-archivo text-[#1E293B] dark:text-white text-base font-medium"
                >
                  {t.emailLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.emailPlaceholder}
                  id="email"
                  className={`border ${errors.email ? "border-red-500" : "border-[#E2E8F0] dark:border-gray-600"} outline-none py-[.8125rem] text-black dark:text-white text-sm bg-transparent font-archivo rounded-lg px-[.875rem]`}
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-red-900 text-xs font-archivo">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-4 2xl:mt-6">
                <label
                  htmlFor="password"
                  className="font-archivo text-[#1E293B] dark:text-white text-base font-medium"
                >
                  {t.passwordLabel}
                </label>
                <div
                  className={`border ${errors.password ? "border-red-500" : "border-[#E2E8F0] dark:border-gray-600"} flex items-center justify-between gap-5 outline-none py-[.8125rem] text-sm font-archivo rounded-lg px-[.875rem]`}
                >
                  <input
                    className="border-none outline-none bg-transparent text-black dark:text-white w-full"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.passwordPlaceholder}
                    id="password"
                    {...register("password")}
                  />

                  <Button type="button" className="p-0 bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                    <EyeIcon />
                  </Button>
                </div>
                {errors?.password && (
                  <p className="text-red-900 text-xs font-archivo">
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end items-center mt-[10px]">
                <Link href={"/forgot-password"} className="text-[#F7931D] text-sm font-archivo font-medium">
                  {t.forgotPassword}
                </Link>
              </div>
              <Button type="submit" className="bg-[#F7931D] border flex items-center justify-center gap-x-3 border-[#F7931D] font-archivo font-semibold text-base mt-5 w-full h-[50px]">
                {t.loginButton} {isLoading && <SmallSpinner color="#fff" />}
              </Button>
            </form>

            <SocialAuth mode="login" />

            <div className="mt-7">
              <Link
                href={"/sign-up"}
                className="text-[#1E293B] dark:text-white text-sm font-archivo font-semibold flex justify-center items-center"
              >
                <p>
                  {t.noAccount} <span className="text-[#F7931D]">{t.register}</span>{" "}
                </p>
              </Link>
            </div>

          </div>

          <ErrorModal
            isErrorModalOpen={isErrorModalOpen}
            setErrorModalState={() => {
              setErrorModalState(false);
            }}
            subheading={
              errorModalMessage ||
              "Please check your inputs and try again."
            }
          ></ErrorModal>
        </div>
      ),

      "verify": (
        <VerifyEmail email={watchEmail} goToPreviousStep={goToPreviousStep} />
      )
    }
    return stepComponents[currentStep]
  }

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

export default LoginPage;