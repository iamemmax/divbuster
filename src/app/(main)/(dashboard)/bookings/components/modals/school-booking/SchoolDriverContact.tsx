"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { schoolDiverTranslations } from "@/app/(main)/translation/bookingTranslation";
import { useLanguage } from "@/hooks/useLanguage";


const bookingSchema = z.object({
  first_name: z.string().min(1, "firstNameRequired"),
  last_name: z.string().min(1, "lastNameRequired"),
  email: z.string().email("emailInvalid"),
});

export type BookingDriverFormValues = z.infer<typeof bookingSchema>;

interface Props {
  next: () => void;
  back: () => void;
  setDiverInfo: React.Dispatch<React.SetStateAction<BookingDriverFormValues>>;
  diverInfo: BookingDriverFormValues;
}

const SchoolDriverContact = ({ back, next, diverInfo, setDiverInfo}: Props) => {
  const {language}=useLanguage()
  const t = schoolDiverTranslations[language] || schoolDiverTranslations.en;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingDriverFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      first_name: diverInfo?.first_name || "",
      last_name: diverInfo?.last_name || "",
      email: diverInfo?.email || "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: BookingDriverFormValues) => {
    setDiverInfo({
      email: data?.email,
      first_name: data?.first_name,
      last_name: data?.last_name,
    });
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 md:px-4 bg-transparent text-sm text-gray-900 dark:text-white"
    >
      <div className="max-h-[70vh] w-full overflow-y-auto">
        {/* First Name */}
        <div className="border-b border-[#EAECF0] dark:border-gray-700 py-4">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-[#344054] dark:text-white font-archivo text-sm">
              {t.firstName}
            </label>
            <div className="flex flex-col gap-y-3">
              <input
                {...register("first_name")}
                placeholder={t.firstNamePlaceholder}
                className={`w-full p-3 outline-none rounded-md border ${
                  errors.first_name ? "border-red-900" : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-800 text-sm text-black dark:text-white`}
              />
            </div>
            {errors.first_name && (
              <p className="text-red-500 text-xs">{t[errors.first_name.message as keyof typeof t]}</p>
            )}
          </div>
        </div>

        {/* Last Name */}
        <div className="border-b border-[#EAECF0] dark:border-gray-700 py-4">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-[#344054] dark:text-white font-archivo text-sm">
              {t.lastName}
            </label>
            <div className="flex flex-col gap-y-3">
              <input
                {...register("last_name")}
                placeholder={t.lastNamePlaceholder}
                className={`w-full p-3 outline-none rounded-md border ${
                  errors.last_name ? "border-red-900" : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-800 text-sm text-black dark:text-white`}
              />
            </div>
            {errors.last_name && (
              <p className="text-red-500 text-xs">{t[errors.last_name.message as keyof typeof t]}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="border-b border-[#EAECF0] dark:border-gray-700 py-4">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
            <label className="text-[#344054] dark:text-white font-archivo text-sm">
              {t.email}
            </label>
            <div className="flex flex-col gap-y-3">
              <input
                {...register("email")}
                placeholder={t.emailPlaceholder}
                className={`w-full p-3 rounded-md outline-none border ${
                  errors.email ? "border-red-900" : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-800 text-sm text-black dark:text-white`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{t[errors.email.message as keyof typeof t]}</p>
            )}
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] mt-5  max-w-3xl items-start gap-4">
          <label className="text-[#344054] dark:text-white font-archivo text-sm">
            {t.cancellationPolicy}
          </label>
          <ul className="space-y-4 list-disc pl-4 text-gray-900 block mb-1 dark:text-gray-300 text-sm md:text-base">
            <li>{t.cancellation7}</li>
            <li>{t.cancellation14}</li>
            <li>{t.cancellation30}</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end gap-4 max-h-[10vh] border-gray-200 dark:border-gray-700 px-6 bg-white dark:bg-gray-900">
        <button
          onClick={back}
          type="button"
          className="px-4 py-2 border rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {t.cancel}
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          {t.proceed}
        </button>
      </div>
    </form>
  );
};

export default SchoolDriverContact;
