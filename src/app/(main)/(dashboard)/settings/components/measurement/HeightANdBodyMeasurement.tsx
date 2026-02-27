
"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Layers } from "lucide-react";
import { useErrorModalState } from "@/hooks";
import { useUpdateHeightMeasurement } from "../../../api/settings/updateHeightMeasurement";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { ErrorModal } from "@/components/core";
import { SmallSpinner } from "@/icons/core";
import { User } from "@/app/(auth)/api/getAuthenticatedUser";
import { HeightTranslations } from "@/app/(main)/translation/profileTranslation";
import { Language } from "@/app/(auth)/sign-up/translations";

// Translations


// Zod schema
const measurementSchema = z.object({
  measurement_unit: z.string().min(1, "Please select a height unit"),
});

type MeasurementFormData = z.infer<typeof measurementSchema>;

interface MeasurementOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isDefault?: boolean;
}

interface Prop {
  user: User | null;
language:Language
}

const HeightAndBodyMeasurement: React.FC<Prop> = ({ user, language }) => {
  const t = HeightTranslations[language] || HeightTranslations.en

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MeasurementFormData>({
    resolver: zodResolver(
      measurementSchema.refine(
        (val) => !!val.measurement_unit,
        t.error as string
      )
    ),
    defaultValues: {
      measurement_unit: "",
    },
  });


  const { mutate: handleUpdateTemp, isLoading: isSubmitting } =
    useUpdateHeightMeasurement();

  useEffect(() => {
    if (user) {
      setValue("measurement_unit", user?.diver_profile?.measurement_unit);
    }
  }, [user, setValue]);

  const queryClient = useQueryClient();

  const onSubmit = (data: MeasurementFormData) => {
    handleUpdateTemp(
      {
        measurement_unit: data.measurement_unit,
      },
      {
        onSuccess: () => {
          toast.success(t.success as string);
          queryClient.invalidateQueries({ queryKey: ["user-details"] });
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  // Height measurement options (localized)
  const heightOptions: MeasurementOption[] = [
    {
      id: "imperial",
      name: t.imperial as string,
      icon: <Layers className="size-5 text-orange-500" />,
      description: "",
      isDefault: true,
    },
    {
      id: "metric",
      name: t.metric as string,
      icon: <Layers className="size-5 text-orange-500" />,
      description: "",
    },
  ];

  return (
    <div className="max-w-2xl md:p-6 bg-white dark:bg-gray-900">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {t.title}
      </h2>

      {/* Height Measurement Options */}
      <div className="space-y-4">
        <Controller
          name="measurement_unit"
          control={control}
          render={({ field }) => (
            <>
              {heightOptions.map((option) => (
                <div
                  key={option.id}
                  className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 cursor-pointer transition-all"
                  onClick={() => field.onChange(option.id)}
                >
                  <div
                    className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 rounded-t-lg ${
                      field.value === option.id
                        ? "border border-orange-400 dark:border-orange-500 bg-[#F7F7F7] dark:bg-orange-900/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-[#F7F7F7] dark:bg-gray-700 flex items-center justify-center shrink-0">
                        {option.icon}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {option.name}
                      </h3>
                    </div>

                    <div
                      className={`size-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        field.value === option.id
                          ? "border-orange-500 bg-orange-500"
                          : "border-orange-500 dark:border-orange-400"
                      }`}
                    >
                      {field.value === option.id && (
                        <div className="size-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        />
      </div>

      {/* Error Messages */}
      {errors.measurement_unit && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-2" role="alert">
          {t.error}
        </p>
      )}

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit(onSubmit)}
          type="button"
          disabled={isSubmitting}
          className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg flex justify-center items-center gap-x-3 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.save} {isSubmitting && <SmallSpinner color="#fff" />}
        </button>
      </div>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => setErrorModalState(false)}
        subheading={
          errorModalMessage || (t.defaultError as string) || "Unexpected error"
        }
      />
    </div>
  );
};

export default HeightAndBodyMeasurement;
