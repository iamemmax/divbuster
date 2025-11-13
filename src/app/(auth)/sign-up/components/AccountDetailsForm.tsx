import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, ErrorModal } from "@/components/core";
import { secondStepProps } from ".";
// import { useLanguage } from "../contexts/LanguageContext";
import DiveBusterBlackLogo from "@/components/icons/DiveBusterBlackLogo";

import { useAuth } from "@/contexts/authentication";
import { useRouter } from "next/navigation";
import { useErrorModalState } from "@/hooks";
import SocialAuth from "../../components/SocialAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "../translations";

type AccountDetailsFormProps = {
  stepTwoData: secondStepProps;
  setStepTwoData: React.Dispatch<React.SetStateAction<secondStepProps>>;
  onNext: () => void;
  onBack: () => void;
};

const AccountDetailsForm = ({
  stepTwoData,
  setStepTwoData,
  onNext,
  onBack,
}: AccountDetailsFormProps) => {

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { language, setLanguage } = useLanguage();
  const { authState } = useAuth();
  const router = useRouter();


const t = translations[language] || translations.en
  // Create the validation schema with translated error messages
  const accountDetailsSchema = z.object({
    first_name: z.string().min(1, { message: t.accountDetails.errors.firstNameRequired }),
    last_name: z.string().min(1, { message: t.accountDetails.errors.lastNameRequired }),
    email: z.string().email({ message: t.accountDetails.errors.invalidEmail }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      first_name: stepTwoData.first_name || "",
      last_name: stepTwoData.last_name || "",
      email: stepTwoData.email || "",
    },
    mode: "onChange",
  });


  // Watch for authentication state changes
  const onSubmit = (data: any) => {
    setStepTwoData({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    });
    onNext();
  };



  useEffect(() => {
    if (authState.isAuthenticated && !authState.isLoading) {
      router.replace("/");
    }
  }, [authState.isAuthenticated, authState.isLoading, router]);


  return (
    <div className=" xl:px-[9.125rem] w-full md:px-[30px]  px-6 py-[30px] xl:py-[7rem]">
      <div className="flex justify-center mb-7 items-center md:hidden">
        <DiveBusterBlackLogo />
      </div>

      <div className="flex justify-center items-center flex-col">
        <h2 className="font-archivo text-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39]">
          {t.accountDetails.title}
        </h2>
        <p className="font-archivo text-[#8D9196] font-medium text-xs 2xl:text-base">
          {t.accountDetails.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-[3.125rem]">
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="block text-gray-700 font-archivo font-medium mb-2"
          >
            {t.accountDetails.firstName}
          </label>
          <input
            type="text"
            id="first_name"
            placeholder={t.accountDetails.firstNamePlaceholder}
            {...register("first_name")}
            className={`border ${errors.first_name ? "border-red-500" : "border-[#E2E8F0]"
              } w-full outline-none h-[3rem] text-sm font-archivo rounded-lg px-[.875rem]`}
          />
          {errors.first_name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="last_name"
            className="block text-gray-700 font-archivo font-medium mb-2"
          >
            {t.accountDetails.lastName}
          </label>
          <input
            type="text"
            id="last_name"
            placeholder={t.accountDetails.lastNamePlaceholder}
            {...register("last_name")}
            className={`border ${errors.last_name ? "border-red-500" : "border-[#E2E8F0]"
              } w-full outline-none h-[3rem] text-sm font-archivo rounded-lg px-[.875rem]`}
          />
          {errors.last_name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-archivo font-medium mb-2"
          >
            {t.accountDetails.email}
          </label>
          <input
            type="email"
            id="email"
            placeholder={t.accountDetails.emailPlaceholder}
            {...register("email")}
            className={`border ${errors.email ? "border-red-500" : "border-[#E2E8F0]"
              } w-full outline-none h-[3rem] text-sm font-archivo rounded-lg px-[.875rem]`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={onBack}
            className="bg-white flex-1 border border-[#F7931D] text-[#F7931D] py-3 rounded-lg font-archivo font-medium"
          >
            {t.accountDetails.backButton}
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#F7931D] text-white py-3 rounded-lg font-archivo font-medium"
          >
            {t.accountDetails.nextButton}
          </Button>
        </div>
      </form>



      <SocialAuth />


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
  );
};

export default AccountDetailsForm;




