"use client"
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Layers } from "lucide-react";
import { useErrorModalState } from "@/hooks";
import { useUpdateTemperature } from "../../../api/settings/updateTemperature";
import { formatAxiosErrorMessage } from "@/utils";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";
import { ErrorModal } from "@/components/core";
import { SmallSpinner } from "@/icons/core";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import { temperatureTranslations } from "@/app/(main)/translation/profileTranslation";
import { Language } from "@/app/(auth)/sign-up/translations";

// Zod schema
const accountPlanSchema = z.object({
  temp_unit: z.string().min(1, "selectPlan"),
});

type AccountPlanFormData = z.infer<typeof accountPlanSchema>;

interface prop {
  user: User | null;
  language:Language
}

// Inline translations
const TemperatureMeasurement: React.FC<prop> = ({ user,language }) => {
  const t = temperatureTranslations[language] || temperatureTranslations.en;

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AccountPlanFormData>({
    resolver: zodResolver(accountPlanSchema),
    defaultValues: {
      temp_unit: "F",
    },
  });

  const { mutate: handleUpdateTemp, isLoading: isSubmitting } =
    useUpdateTemperature();
  const queryClient = useQueryClient();

  const onSubmit = (data: AccountPlanFormData) => {
    handleUpdateTemp(
      { temp_unit: data.temp_unit },
      {
        onSuccess: () => {
          toast.success(t.temperature.successMessage);
          queryClient.invalidateQueries({ queryKey: ["user-details"] });
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  useEffect(() => {
    if (user) {
      setValue("temp_unit", user?.diver_profile?.temp_unit);
    }
  }, [user, setValue]);

  const planOptions = [
    {
      id: "F",
      name: t.temperature.fahrenheit,
      description: t.temperature.fahrenheitDesc,
      isDefault: true,
    },
    {
      id: "C",
      name: t.temperature.celsius,
      description: t.temperature.celsiusDesc,
    },
    {
      id: "K",
      name: t.temperature.kelvin,
      description: t.temperature.kelvinDesc,
    },
  ];

  return (
    <div className="md:max-w-2xl">
  

      {/* Header */}
      <div className="mb-8 -mt-5">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t.temperature.title}
        </h1>
      </div>

      {/* Plan Selection */}
      <div className="space-y-4">
        <Controller
          name="temp_unit"
          control={control}
          render={({ field }) => (
            <>
              {planOptions.map((plan) => (
                <div
                  key={plan.id}
                  className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 cursor-pointer transition-all"
                  onClick={() => field.onChange(plan.id)}
                >
                  {/* Header */}
                  <div
                    className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 rounded-t-lg ${
                      field.value === plan.id
                        ? "border border-orange-400 dark:border-orange-500 bg-[#F7F7F7] dark:bg-orange-900/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full bg-[#F7F7F7] dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <Layers className="w-5 h-5 text-orange-500" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {plan.name}
                      </h3>
                    </div>

                    {/* Radio Button */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        field.value === plan.id
                          ? "border-orange-500 bg-orange-500"
                          : "border-orange-500 dark:border-orange-400"
                      }`}
                    >
                      {field.value === plan.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-[80%] flex-1">
                        {plan.description}
                      </p>

                      {plan.isDefault && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full flex-shrink-0">
                          {t.temperature.default}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        />

        {errors.temp_unit && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {t.validation[errors.temp_unit.message as keyof typeof t.validation]}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit(onSubmit)}
          type="button"
          disabled={isSubmitting}
          className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg flex justify-center items-center gap-x-3 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.common.saveChanges} {isSubmitting && <SmallSpinner color="#fff" />}
        </button>
      </div>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => setErrorModalState(false)}
        subheading={errorModalMessage || t.validation.genericError}
      />
    </div>
  );
};

export default TemperatureMeasurement;
