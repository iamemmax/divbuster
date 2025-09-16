import React, { useEffect } from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFetchCountry } from '../../../api/fetchCountry';
import { unicodeToEmoji } from '@/app/(auth)/sign-up/components/AccountTypeForm';
import { useAuth } from '@/contexts/authentication';
import { useErrorModalState } from '@/hooks';
import { useUpdateCountryAndLanguage } from '../../../api/settings/updateCountryAndLanguage';
import toast from 'react-hot-toast';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { ErrorModal } from '@/components/core';
import { SmallSpinner } from '@/icons/core';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { useQueryClient } from 'react-query';

// Validation schema
const languageSettingsSchema = z.object({
  country_id: z.string().min(1, "Please select a country"),
  lang: z.string().min(1, "Please select a language"),
});

type LanguageSettingsForm = z.infer<typeof languageSettingsSchema>;

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
];

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(({ children, className, ...props }, ref) => {
  return (
    <Select.Item
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
      {...props}
      ref={ref}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Select.ItemIndicator>
          <Check className="h-4 w-4" />
        </Select.ItemIndicator>
      </span>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
});

SelectItem.displayName = 'SelectItem';


interface prop{
  user: User | null
}
const LanguageComponent: React.FC<prop> = ({user}) => {
   const {
          isErrorModalOpen,
          setErrorModalState,
          openErrorModalWithMessage,
          errorModalMessage,
      } = useErrorModalState();
  const { data: countries } = useFetchCountry();
    
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LanguageSettingsForm>({
    resolver: zodResolver(languageSettingsSchema),
    defaultValues: {
      country_id: "",
      lang: "",
    },
  });



  useEffect(() => {
    if(user){
      setValue("country_id", String(user?.profile_details?.country))
      setValue("lang", String(user?.profile_details?.language))
    }
    
  }, [user])
  
    const { mutate: handleUpdate, isLoading: isSubmitting } = useUpdateCountryAndLanguage();
  const queryClient = useQueryClient()
  
  
  const onSubmit = async (data: LanguageSettingsForm) => {
    handleUpdate({
            country_id: String(data.country_id),
            lang: data.lang,
          }, {
            onSuccess: () => {
              toast.success("Updated successfully")
              queryClient.invalidateQueries({ queryKey: ["user-details"] })
            },
            onError: (error) => {
                const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                openErrorModalWithMessage(String(errorMessage));
            },
        });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold font-archivo text-[#09090B] dark:text-white mb-2">
        Change Language & Country
      </h1>
      <p className="text-[#71717A] dark:text-gray-400 text-xs sm:text-sm font-archivo mb-8">
        Please note that changing your default language to another language will require you to Login 
        into your account again. You can change back to default after login.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Default Country Section */}
        <div>
          <label className="block text-xs font-archivo font-medium text-[#36394A] dark:text-gray-300 mb-2">
            Default Country
          </label>
          <Controller
            name="country_id"
            control={control}
            render={({ field }) => (
              <Select.Root value={String(field.value)} onValueChange={field.onChange}>
                <Select.Trigger className={`inline-flex w-full items-center justify-between rounded-lg border px-4 py-4 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.country_id 
                    ? 'border-red-500 bg-red-50 dark:bg-red-950 focus:border-red-500 text-gray-900 dark:text-gray-100' 
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:border-orange-500 text-gray-900 dark:text-gray-100'
                }`}>
                  <Select.Value placeholder="Select your Country" className="text-gray-700 dark:text-gray-300" />
                  <Select.Icon className="h-4 w-4 opacity-50">
                    <ChevronDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-950 dark:text-gray-100 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                    <Select.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
                      <ChevronDown className="h-4 w-4 rotate-180" />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-1">
                      {countries?.results?.map((country) => (
                        <SelectItem
                          key={country.id}
                          value={String(country?.id)}
                          className="px-2"
                        >
                          <div className="flex items-center gap-2">
                            {country.alpha2code ? (
                              <img
                                src={`https://flagcdn.com/${country.alpha2code.toLowerCase()}.svg`}
                                alt={`${country.name} flag`}
                                className="w-5 h-5 rounded-sm object-cover"
                              />
                            ) : country.flag_link.includes('U+') ? (
                              <span className="text-xl">{unicodeToEmoji(country.flag_link)}</span>
                            ) : (
                              <img
                                src={country.flag_link}
                                alt={`${country.name} flag`}
                                className="w-5 h-5 rounded-sm object-cover"
                              />
                            )}
                            {country.name}
                          </div>
                        </SelectItem>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
                      <ChevronDown className="h-4 w-4" />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            )}
          />
          {errors.country_id && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.country_id.message}</p>
          )}
        </div>

        {/* Default Language Section */}
        <div>
          <label className="block text-xs font-archivo font-medium text-[#36394A] dark:text-gray-300 mb-2">
            Default Language
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
                  <Select.Value placeholder="Select language" className="text-gray-700 dark:text-gray-300" />
                  <Select.Icon className="h-4 w-4 opacity-50">
                    <ChevronDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-950 dark:text-gray-100 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                    <Select.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
                      <ChevronDown className="h-4 w-4 rotate-180" />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-1">
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
                            />
                            <span>{lang.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
                      <ChevronDown className="h-4 w-4" />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            )}
          />
          {errors.lang && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.lang.message}</p>
          )}
        </div>

        <div className="mt-12 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg flex justify-center items-center gap-x-3 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
         Save Changes   {isSubmitting && <SmallSpinner color='#fff'/>}
          </button>
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
                  />
    </div>
  );
};

export default LanguageComponent;