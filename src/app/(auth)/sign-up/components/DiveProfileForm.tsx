import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/core";
import { thirdStepProps } from ".";
import { useLanguage } from "../contexts/LanguageContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import EyeIcon from "@/app/icons/EyeIcon";
import DiveBusterBlackLogo from "@/components/icons/DiveBusterBlackLogo";

type DiveProfileFormProps = {
  stepThreeData: thirdStepProps;
  setStepThreeData: React.Dispatch<React.SetStateAction<thirdStepProps>>;
  onNext: () => void;
  onBack: () => void;
};

const DiveProfileForm = ({
  stepThreeData,
  setStepThreeData,
  onNext,
  onBack,
}: DiveProfileFormProps) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Dive profile validation schema with translated error messages
  const diveProfileSchema = z.object({
    nickname: z.string().min(1, { message: t.diveProfile.errors.nicknameRequired }),
    dob: z.string().min(1, { message: t.diveProfile.errors.dateOfBirthRequired }),
    phone_number: z.string().min(1, { message: t.diveProfile.errors.phoneNumberRequired }),
    password: z.string()
      .min(8, { message: t.diveProfile.errors.passwordMinLength })
      .refine(
        (value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{8,}$/.test(value),
        {
          message: t.diveProfile.errors.passwordComplexity
        }
      ),
    confirm_password: z.string().min(1, { message: t.diveProfile.errors.confirmPasswordRequired })
  }).refine((data) => data.password === data.confirm_password, {
    message: t.diveProfile.errors.passwordsDoNotMatch,
    path: ["confirm_password"],
  });
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(diveProfileSchema),
    defaultValues: {
      nickname: stepThreeData.nickname || "",
      dob: stepThreeData.dob || "",
      phone_number: stepThreeData.phone_number || "",
      password: stepThreeData.password || "",
      confirm_password: stepThreeData.confirm_password || "",
    },
    mode: "onChange",
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Additional date handling logic if needed
  };

  const onSubmit = (data: any) => {
    setStepThreeData({
      ...stepThreeData,
      nickname: data.nickname,
      dob: data.dob,
      phone_number: data.phone_number,
      password: data.password,
      confirm_password: data.confirm_password,
    });
    onNext();
  };

  return (
     <div className=" xl:px-[9.125rem] w-full md:px-[30px]  px-6 py-[30px] xl:py-[7rem]">
      <div className="flex justify-center mb-7 items-center md:hidden">
        <DiveBusterBlackLogo />
      </div>
    
      <div className="flex justify-center items-center flex-col">
        <h2 className="font-archivo text-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39]">
          {t.diveProfile.title}
        </h2>
        <p className="font-archivo text-[#8D9196] font-medium text-xs 2xl:text-base">
          {t.diveProfile.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-[3.125rem]">
        <div className="mb-4">
          <label htmlFor="phone_number" className="block text-gray-700 font-medium mb-2">
            {t.diveProfile.phoneNumber}
          </label>
          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <PhoneInput
                country={'nl'} // Changed to Netherlands
                value={field.value}
                onChange={field.onChange}
                inputProps={{
                  id: 'phone_number',
                  name: 'phone_number',
                  placeholder: t.diveProfile.phoneNumberPlaceholder,
                }}
                containerClass="phone-input-container"
                inputClass={`w-full px-3 py-2 border ${
                  errors.phone_number ? 'border-red-500' : 'border-[#E2E8F0]'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7931D] h-[3rem] text-sm font-archivo`}
                buttonClass="border-none bg-transparent rounded-l-lg "
                dropdownClass="bg-white border-none rounded-lg shadow-lg"
                searchClass="py-2 px-3 border-b border-[#E2E8F0]"
              />
            )}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            {t.diveProfile.password}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder={t.diveProfile.passwordPlaceholder}
              className={`w-full px-3 py-2 pr-10 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7931D]`}
              {...register('password')}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirm_password" className="block text-gray-700 font-medium mb-2">
            {t.diveProfile.confirmPassword}
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              placeholder={t.diveProfile.confirmPasswordPlaceholder}
              className={`w-full px-3 py-2 pr-10 border ${errors.confirm_password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7931D]`}
              {...register('confirm_password')}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <EyeIcon />
            </button>
          </div>
          {errors.confirm_password && (
            <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            {t.diveProfile.nickname}
          </label>
          <input
            type="text"
            id="name"
            placeholder={t.diveProfile.nicknamePlaceholder}
            className={`border ${errors.nickname ? "border-red-500" : "border-[#E2E8F0]"} w-full outline-none py-[.8125rem] text-sm font-archivo rounded-lg px-[.875rem]`}
            {...register("nickname")}
          />
          {errors.nickname && (
            <p className="text-red-500 text-xs mt-1">
              {errors.nickname.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="dateOfBirth"
            className="block text-gray-700 font-medium mb-2"
          >
            {t.diveProfile.dateOfBirth}
          </label>
          <div className="relative">
            <input
              type="date"
              id="dateOfBirth"
              className={`border ${errors?.dob ? "border-red-500" : "border-[#E2E8F0]"} w-full outline-none py-[.8125rem] text-sm font-archivo rounded-lg px-[.875rem]`}
              {...register("dob")}
              onChange={handleDateChange}
              placeholder={t.diveProfile.dateOfBirthPlaceholder}
            />
          </div>
          {errors.dob && (
            <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={onBack}
            className="flex-1 bg-white border border-[#F7931D] text-[#F7931D] py-3 rounded-lg font-medium"
          >
            {t.diveProfile.backButton}
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#F7931D] text-white py-3 rounded-lg font-medium"
          >
            {t.diveProfile.nextButton}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DiveProfileForm;




