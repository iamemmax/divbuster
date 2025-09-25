


"use client";
import React, { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFetchCountry } from "../../../api/fetchCountry";
import { unicodeToEmoji } from "@/app/(auth)/sign-up/components/AccountTypeForm";
import { useErrorModalState } from "@/hooks";
import { useUpdateCountryAndLanguage } from "../../../api/settings/updateCountryAndLanguage";
import toast from "react-hot-toast";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { ErrorModal } from "@/components/core";
import { SmallSpinner } from "@/icons/core";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import { useQueryClient } from "react-query";
import { languageTranslations } from "@/app/(main)/translation/profileTranslation";
import { Language } from "@/app/(auth)/sign-up/translations";



const languages = [
  { value: "en", label: "English", flag: "https://flagcdn.com/gb.svg" },
  { value: "es", label: "Spanish", flag: "https://flagcdn.com/es.svg" },
  { value: "fr", label: "French", flag: "https://flagcdn.com/fr.svg" },
  { value: "nl", label: "Dutch", flag: "https://flagcdn.com/nl.svg" },
];

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, ref) => (
    <Select.Item
      ref={ref}
      {...props}
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none 
        focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-gray-100 
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Select.ItemIndicator>
          <Check className="h-4 w-4" />
        </Select.ItemIndicator>
      </span>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
);
SelectItem.displayName = "SelectItem";

interface Props {
  user: User | null;
setLanguage: (lang: Language) => void
  language: Language
}

const LanguageComponent: React.FC<Props> = ({ user,language,setLanguage }) => {
  // const language: Language = ( as Language)
     const t = languageTranslations[language] || languageTranslations?.en;
 
  const languageSettingsSchema = z.object({
    country_id: z.string().min(1, languageTranslations.en.validation.country),
    lang: z.string().min(1, languageTranslations.en.validation.language),
  });
  type LanguageSettingsForm = z.infer<typeof languageSettingsSchema>;
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const { data: countries } = useFetchCountry();
  const queryClient = useQueryClient();
  

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LanguageSettingsForm>({
    resolver: zodResolver(languageSettingsSchema),
    defaultValues: {
      country_id: String(user?.profile_details?.country) || "",
      lang:language
    },
  });


  useEffect(() => {
    if (user) {
      setValue("country_id", String(user?.profile_details?.country));
      setValue("lang", String(language));
    }
  }, [user]);

  const { mutate: handleUpdate, isLoading: isSubmitting } =
    useUpdateCountryAndLanguage();

  const onSubmit = (data: LanguageSettingsForm) => {
    handleUpdate(
      { country_id: String(data.country_id), lang: data.lang },
      {
        onSuccess: () => {
          setLanguage(data?.lang as Language)
          toast.success("Updated successfully");
          queryClient.invalidateQueries({ queryKey: ["user-details"] });
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold font-archivo text-[#09090B] dark:text-white mb-2">
       {t.languageSettings.title}
      </h1>
      <p className="text-[#71717A] dark:text-gray-400 text-xs sm:text-sm font-archivo mb-8">
       {t.languageSettings.note}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Country */}
        <div>
          <label className="block text-xs font-medium text-[#36394A] dark:text-gray-300 mb-2">
            {t.languageSettings.defaultCountry}
          </label>
          <Controller
            name="country_id"
            control={control}
            render={({ field }) => (
              <Select.Root
                value={String(field.value)}
                onValueChange={field.onChange}
              >
                <Select.Trigger
                   className={`inline-flex w-full items-center justify-between rounded-lg border px-4 py-4 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.country_id 
                    ? 'border-red-500 bg-red-50 dark:bg-red-950 focus:border-red-500 text-gray-900 dark:text-gray-100' 
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:border-orange-500 text-gray-900 dark:text-gray-100'
                }`}>
                  <Select.Value placeholder="Select your Country" />
                  <Select.Icon>
                    <ChevronDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white dark:bg-gray-800">
                    <Select.Viewport>
                      {countries?.results?.map((country) => (
                        <SelectItem
                          key={country.id}
                          value={String(country?.id)}
                        >
                          <div className="flex items-center gap-2">
                            {country.alpha2code ? (
                              <img
                                src={`https://flagcdn.com/${country.alpha2code.toLowerCase()}.svg`}
                                className="w-5 h-5"
                              />
                            ) : (
                              unicodeToEmoji(country.flag_link)
                            )}
                            {country.name}
                          </div>
                        </SelectItem>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            )}
          />
          {errors.country_id && (
            <p className="mt-1 text-xs text-red-600">
              {t.validation.country}
            </p>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block text-xs font-medium text-[#36394A] dark:text-gray-300 mb-2">
          {t.languageSettings.defaultLanguage}
          </label>
          <Controller
            name="lang"
            control={control}
            render={({ field }) => (
              <Select.Root value={field.value} onValueChange={field.onChange}>
                <Select.Trigger className={`inline-flex w-full items-center justify-between rounded-lg border px-4 py-4 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.lang 
                    ? 'border-red-500 bg-red-50 dark:bg-red-950 focus:border-red-500 text-gray-900 dark:text-gray-100' 
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:border-orange-500 text-gray-900 dark:text-gray-100'
                }`}>
                  <Select.Value placeholder="Select language" />
                  <Select.Icon>
                    <ChevronDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white dark:bg-gray-800">
                    <Select.Viewport>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center gap-2">
                            <img src={lang.flag} className="w-5 h-5" />
                            <span>{lang.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            )}
          />
          {errors.lang && (
            <p className="mt-1 text-xs text-red-600">{t.validation.language}</p>
          )}
        </div>

        {/* Save button */}
        <div className="mt-12 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-orange-500 text-white rounded-lg flex items-center gap-x-3"
          >
            {t.languageSettings.saveChanges}
            {isSubmitting && <SmallSpinner color="#fff" />}
          </button>
        </div>
      </form>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => setErrorModalState(false)}
        subheading={errorModalMessage || "Please check your inputs."}
      />
    </div>
  );
};

export default LanguageComponent;
