import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core";
import DiveBusterBlackLogo from "@/components/icons/DiveBusterBlackLogo";
import { firstStepProps } from ".";
import { CaretDown } from "@/components/icons";
import { useLanguage } from "../contexts/LanguageContext";
import { Language, translations } from "../translations";

// Basic info validation schema
const basicInfoSchema = z.object({
  lang: z.string().min(1, { message: "Language is required" }),
});

type BasicInfoFormProps = {
  stepOneData: firstStepProps;
  setStepOneData: React.Dispatch<React.SetStateAction<firstStepProps>>;
  onNext: () => void;
};

const BasicInfoForm = ({
  setStepOneData,
  stepOneData,
  onNext,
}: BasicInfoFormProps) => {
  const { language, setLanguage, t } = useLanguage();
  
  // Add a safety check for t
  const safeT = t || translations.en;
  
  const {
    
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      lang: stepOneData.lang || "",
    },
    mode: "onChange",
  });

  // Watch the language value to update the select
  const selectedLanguage = watch("lang");

  const [isOpen, setIsOpen] = useState(false);
  
  // Handle language selection
  const handleLanguageChange = (value: string) => {
    setValue("lang", value as string, { shouldValidate: true });
    // Update the language in the context
    setLanguage(value as Language);
    localStorage.setItem("preferredLanguage", value as Language);
  };

  // Set initial language from context if available
  useEffect(() => {
    if (language && !selectedLanguage) {
      setValue("lang", language, { shouldValidate: true });
    }
  }, [language, selectedLanguage, setValue]);

  const onSubmit = (data: any) => {
    setStepOneData({
      lang: data.lang,
    });
    onNext();
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

 

  return (
     <div className=" xl:px-[9.125rem] w-full md:px-[30px]  px-6 py-[30px] xl:py-[7rem]">
  <div className="flex justify-center mb-7 items-center md:hidden">
        <DiveBusterBlackLogo />
      </div>

      <div className="flex justify-center items-center flex-col">
        <h2 className="font-archivo text-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39]">
          {safeT.basicInfo?.title || "Create an Account"}
        </h2>
        <p className="font-archivo text-[#8D9196] font-medium text-xs 2xl:text-base">
          {safeT.basicInfo?.subtitle || "Proceed with your Registration"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-[3.125rem]">
        <div className="mb-4">
          <label
            htmlFor="language"
            className="block text-gray-700 font-medium mb-2"
          >
            {t.basicInfo.preferredLanguage}
          </label>
          <Select
            value={selectedLanguage || ""}
            onValueChange={handleLanguageChange}
            defaultValue={stepOneData.lang}
            onOpenChange={setIsOpen}
          >
            <div className="relative">
              <SelectTrigger
                id="language"
                className={`border bg-transparent text-black ${errors.lang ? "border-red-500" : "border-[#E2E8F0]"} w-full outline-none h-[3rem] text-sm font-archivo rounded-lg px-[.875rem] pr-10`}
              >
                <SelectValue
                  placeholder={t.basicInfo.selectLanguage}
                  className="text-[#8D9196] text-sm font-archivo font-medium"
                />
              </SelectTrigger>
              <CaretDown 
                color="#8D9196" 
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
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
                  fontSize: "12px",
                }}
              >
                {t.basicInfo.selectLanguage}
              </SelectItem>
              {languages.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  className="px-2"
                >
                  <div className="flex items-start gap-4">
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
          {errors.lang && (
            <p className="text-red-500 text-xs mt-1">{errors.lang.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#F7931D] text-white py-3 rounded-lg font-medium"
        >
          {t.basicInfo.nextButton}
        </Button>
      </form>
    </div>
  );
};

export default BasicInfoForm;




