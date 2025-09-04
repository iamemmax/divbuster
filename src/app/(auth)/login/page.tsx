

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
import { useLanguage } from "../sign-up/contexts/LanguageContext";

type LoginStep = 
  | 'login'
  | 'verify'
  
// Create translations object for login page
const translations = {
  en: {
    title: "Log in to your account",
    subtitle: "Welcome back! Please enter your details",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot Password?",
    loginButton: "Login",
    orText: "Or",
    googleLogin: "Login with Google",
    googleConnecting: "Connecting...",
    noAccount: "Don't have an account?",
    register: "Register",
    socialLogins: {
      reddit: "Login with Reddit",
      microsoft: "Login with Microsoft 365",
      linkedin: "Login with LinkedIn",
      apple: "Login with Apple ID",
      connecting: "Connecting..."
    }
  },
  es: {
    title: "Inicia sesión en tu cuenta",
    subtitle: "¡Bienvenido de nuevo! Por favor, introduce tus datos",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "Introduce tu correo electrónico",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "Introduce tu contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    loginButton: "Iniciar sesión",
    orText: "O",
    googleLogin: "Iniciar sesión con Google",
    googleConnecting: "Conectando...",
    noAccount: "¿No tienes una cuenta?",
    register: "Regístrate",
    socialLogins: {
      reddit: "Iniciar sesión con Reddit",
      microsoft: "Iniciar sesión con Microsoft 365",
      linkedin: "Iniciar sesión con LinkedIn",
      apple: "Iniciar sesión con Apple ID",
      connecting: "Conectando..."
    }
  },
  fr: {
    title: "Connectez-vous à votre compte",
    subtitle: "Bienvenue ! Veuillez entrer vos informations",
    emailLabel: "Adresse Email",
    emailPlaceholder: "Entrez votre email",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "Entrez votre mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    loginButton: "Connexion",
    orText: "Ou",
    googleLogin: "Se connecter avec Google",
    googleConnecting: "Connexion en cours...",
    noAccount: "Vous n'avez pas de compte ?",
    register: "S'inscrire",
    socialLogins: {
      reddit: "Se connecter avec Reddit",
      microsoft: "Se connecter avec Microsoft 365",
      linkedin: "Se connecter avec LinkedIn",
      apple: "Se connecter avec Apple ID",
      connecting: "Connexion en cours..."
    }
  },
  nl: {
    title: "Log in op je account",
    subtitle: "Welkom terug! Voer je gegevens in",
    emailLabel: "E-mailadres",
    emailPlaceholder: "Voer je e-mailadres in",
    passwordLabel: "Wachtwoord",
    passwordPlaceholder: "Voer je wachtwoord in",
    forgotPassword: "Wachtwoord vergeten?",
    loginButton: "Inloggen",
    orText: "Of",
    googleLogin: "Inloggen met Google",
    googleConnecting: "Verbinden...",
    noAccount: "Heb je geen account?",
    register: "Registreren",
    socialLogins: {
      reddit: "Inloggen met Reddit",
      microsoft: "Inloggen met Microsoft 365",
      linkedin: "Inloggen met LinkedIn",
      apple: "Inloggen met Apple ID",
      connecting: "Verbinden..."
    }
  },
  de: {
    title: "Melden Sie sich bei Ihrem Konto an",
    subtitle: "Willkommen zurück! Bitte geben Sie Ihre Daten ein",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
    passwordLabel: "Passwort",
    passwordPlaceholder: "Geben Sie Ihr Passwort ein",
    forgotPassword: "Passwort vergessen?",
    loginButton: "Anmelden",
    orText: "Oder",
    googleLogin: "Mit Google anmelden",
    googleConnecting: "Verbindung wird hergestellt...",
    noAccount: "Sie haben noch kein Konto?",
    register: "Registrieren",
    socialLogins: {
      reddit: "Mit Reddit anmelden",
      microsoft: "Mit Microsoft 365 anmelden",
      linkedin: "Mit LinkedIn anmelden",
      apple: "Mit Apple ID anmelden",
      connecting: "Verbindung wird hergestellt..."
    }
  }
};

 const languages = [
    {
      value: "en",
      label: "English",
      flag: "https://flagcdn.com/gb.svg", // UK
    },
    {
      value: "es",
      label: "Spanish",
      flag: "https://flagcdn.com/es.svg",
    },
    {
      value: "fr",
      label: "French",
      flag: "https://flagcdn.com/fr.svg",
    },
    {
      value: "nl",
      label: "Dutch",
      flag: "https://flagcdn.com/nl.svg",
    },
    // {
    //   value: "de",
    //   label: "German",
    //   flag: "https://flagcdn.com/de.svg",
    // },
  ];
export type LoginDetailsValue = z.infer<typeof loginUserSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [currentStep, setCurrentStep] = useState<LoginStep>('login');
  const { language: updatedLang, setLanguage: updateLanguage } = useLanguage();
  const [language, setLanguage] = useState<Language>(updatedLang);
  const [isOpen, setIsOpen] = useState(false);
  
  // Fixed: Initialize language from localStorage only on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem("preferredLanguage") as Language | null;
      if (storedLanguage && Object.keys(translations).includes(storedLanguage)) {
        setLanguage(storedLanguage);
        updateLanguage(storedLanguage);
      }
    }
  }, []); // Empty dependency array - only run on mount
  
  // Get translations for current language
  const t = translations[language] || translations.en;
  
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
      router.push("/");
    }
  }, [authState.isAuthenticated, authState.isLoading, router]);

  const watchEmail = watch("email")
  const stepOrder: LoginStep[] = [
   "login","verify"
  ];
  const getStepIndex = (step: LoginStep) => stepOrder.indexOf(step);

  const handleNext = ()=>{
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
    handleLogin(data, {
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));

        if(errorMessage === "Kindly verify account to continue"){
          handleNext()
        }
      },
    });
  };

  // Fixed: Improved language change handler
  const handleLanguageChange = (value: string) => {
    const newLanguage = value as Language;
    console.log('Changing language to:', newLanguage); // Debug log
    
    // Update local state first
    setLanguage(newLanguage);
    
    // Update context
    updateLanguage(newLanguage);
    
    // Set localStorage with error handling
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem("preferredLanguage", newLanguage);
        console.log('Language saved to localStorage:', newLanguage); // Debug log
        
        // Verify it was saved
        const saved = localStorage.getItem("preferredLanguage");
        console.log('Verified saved language:', saved); // Debug log
      }
    } catch (error) {
      console.error('Error saving language to localStorage:', error);
    }
  };

  const renderCurrentStep = ()=>{
    const stepComponents = {
      "login":(
  <div className="md:px-[30px] px-6 py-[30px]  xl:px-[9.125rem] xl:py-[7rem]">
   <div className="flex justify-end items-center">
        <Select
            value={language || ""}
            onValueChange={handleLanguageChange}
            defaultValue={language}
            onOpenChange={setIsOpen}
          >
            <div className="relative">
              <SelectTrigger
                id="language"
                className={`border bg-transparent max-w-[9.5rem] w-full  relative text-black outline-none h-[3rem] text-sm font-archivo rounded-xl px-[.875rem] pr-10`}
              >
                <SelectValue
                  className="text-[#8D9196] text-sm font-archivo font-medium"
                />
              <CaretDownIcon 
                color="#8D9196" 
                className={`absolute right-2  top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
              </SelectTrigger>
            </div>
            <SelectContent>
              <SelectItem
                className="hidden"
                disabled
                value=""
                style={{
                  color: "#8D9196",
                  fontWeight: 500,
                  fontFamily: "Archivo",
                  fontSize: "10px",
                }}
              >
                {language}
              </SelectItem>
              {languages.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  className="px-2"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={lang.flag}
                      alt={`${lang.label} flag`}
                      className="w-5 h-5 rounded-sm object-cover"
                    />{" "}
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
   </div>
      <div className="flex justify-center mt-5 mb-7 items-center lg:hidden ">
        <DiveBusterBlackLogo />
      </div>
      <div className="flex justify-center items-center flex-col">
        <h2 className="font-archivo text-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39]">
          {t.title}
        </h2>
        <p className="font-archivo text-[#8D9196] font-medium text-xs 2xl:text-base">
          {t.subtitle}
        </p>
      </div>
      <div className="mt-[1.3125rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col ">
            <label
              htmlFor="email"
              className="font-archivo text-[#1E293B] text-base font-medium"
            >
              {t.emailLabel}
            </label>
            <input
              type="text"
              placeholder={t.emailPlaceholder}
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
          <div className="flex flex-col mt-4 2xl:mt-6">
            <label
              htmlFor="password"
              className="font-archivo text-[#1E293B] text-base font-medium"
            >
              {t.passwordLabel}
            </label>
            <div
              className={`border ${errors.password ? "border-red-500" : "border-[#E2E8F0]"} flex items-center justify-between gap-5 outline-none py-[.8125rem] text-sm font-archivo rounded-lg px-[.875rem]`}
            >
              <input
                className="border-none  outline-none bg-transparent text-black w-full"
                type={showPassword?"text":"password"}
                placeholder={t.passwordPlaceholder}
                id="password"
                {...register("password")}
              />

              <Button type="button" className="p-0 bg-transparent" onClick={()=>setShowPassword(!showPassword)}>
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
            {t.loginButton} {isLoading && <SmallSpinner color="#fff"/>}
          </Button>
        </form>

         <SocialAuth/>

         <div className="mt-7">
                 <Link  
                   href={"/sign-up"}
                   className="text-[#1E293B] text-sm font-archivo font-semibold flex justify-center items-center"
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

      "verify":(
        <VerifyEmail email={watchEmail} goToPreviousStep={goToPreviousStep} />
      )
    }
      return stepComponents[currentStep]
  }

  return (
    <div className="w-full h-full">
    {renderCurrentStep()}
    </div>
  );
};

export default LoginPage;