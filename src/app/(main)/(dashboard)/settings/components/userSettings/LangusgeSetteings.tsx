import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFetchCountry } from '../../../api/fetchCountry';
import { unicodeToEmoji } from '@/app/(auth)/sign-up/components/AccountTypeForm';
import { useAuth } from '@/contexts/authentication';

// Validation schema
const languageSettingsSchema = z.object({
  country: z.string().min(1, "Please select a country"),
  language: z.string().min(1, "Please select a language"),
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
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
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

const LanguageComponent: React.FC = () => {
  const { data: countries } = useFetchCountry();
    const { authState } = useAuth();
     const { user} = authState;
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<LanguageSettingsForm>({
    resolver: zodResolver(languageSettingsSchema),
    defaultValues: {
      country: String(user?.profile_details?.country),
      language: user?.profile_details?.language,
    },
  });

  const selectedCountry = watch('country');
  const selectedLanguage = watch('language');

  const onSubmit = async (data: LanguageSettingsForm) => {
    try {
      console.log('Form data:', data);
      // Add your API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold font-archivo text-[#09090B] mb-2">
        Change Language & Country
      </h1>
      <p className="text-[#71717A] text-xs sm:text-sm font-archivo mb-8">
        Please note that changing your default language to another language will require you to Login 
        into your account again. You can change back to default after login.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Default Country Section */}
        <div>
          <label className="block text-xs font-archivo font-medium text-[#36394A] mb-2">
            Default Country
          </label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select.Root value={field.value} onValueChange={field.onChange}>
                <Select.Trigger className={`inline-flex w-full items-center justify-between rounded-lg border px-4 py-4 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.country 
                    ? 'border-red-500 bg-red-50 focus:border-red-500' 
                    : 'border-gray-300 bg-gray-50 focus:border-orange-500'
                }`}>
                  <Select.Value placeholder="Select your Country" className="text-gray-700" />
                  <Select.Icon className="h-4 w-4 opacity-50">
                    <ChevronDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                    <Select.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
                      <ChevronDown className="h-4 w-4 rotate-180" />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-1">
                      {countries?.results?.map((country) => (
                        <SelectItem
                          key={country.id}
                          value={String(country.id)}
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
          {errors.country && (
            <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>
          )}
        </div>

        {/* Default Language Section */}
        <div>
          <label className="block text-xs font-archivo font-medium text-[#36394A] mb-2">
            Default Language
          </label>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select.Root value={field.value} onValueChange={field.onChange}>
                <Select.Trigger className={`inline-flex w-full items-center justify-between rounded-lg border px-4 py-4 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.language 
                    ? 'border-red-500 bg-red-50 focus:border-red-500' 
                    : 'border-gray-300 bg-gray-50 focus:border-orange-500'
                }`}>
                  <Select.Value placeholder="Select language" className="text-gray-700" />
                  <Select.Icon className="h-4 w-4 opacity-50">
                    <ChevronDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
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
          {errors.language && (
            <p className="mt-1 text-xs text-red-600">{errors.language.message}</p>
          )}
        </div>

        <div className="mt-12 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LanguageComponent;