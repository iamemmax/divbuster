
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Layers, Zap } from "lucide-react";
import { useFetchSubscriptionPlan } from "../../../api/subscription/fetchSubscriptionPlan";
import { ErrorModal, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core";
import { CaretDown } from "@/components/icons";
import { useFetchSubscriptionPlanById } from "../../../api/subscription/fetchSubscriptionPlanById";
import { SmallSpinner } from "@/icons/core";
import { useErrorModalState } from "@/hooks";
import { useCreateSubscription } from "../../../api/subscription/createSubscriptionPlan";
import toast from "react-hot-toast";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { Language } from "@/app/(auth)/sign-up/translations";
import { subscriptionTranslations } from "@/app/(main)/translation/profileTranslation";

// Types


const accountPlanSchema = z.object({
  plan_id: z.string().min(1, "planType"),
  selectedPlan: z.string().min(1, "plan"),
});
type AccountPlanFormData = z.infer<typeof accountPlanSchema>;

interface Props {
  language: Language;
}

interface SubscriptionTranslation {
  tokensPerYear: string;
  lifetimeTokens: string;
  tokensFor: string;
}

const getSubtitle = (duration: string, tokens: number, t: SubscriptionTranslation) => {
  if (tokens === 0) return t.tokensPerYear;
  if (duration === "unlimited") return t.lifetimeTokens;
  return `${t.tokensFor} ${duration.replace("year", " year(s)")}`;
};

const getPlanIcon = (planName: string) => {
  switch (planName.toLowerCase()) {
    case "free":
    case "solid":
      return <Layers className="size-4 text-orange-500" />;
    case "fun":
    case "divebuster":
      return <Zap className="size-4 text-orange-500" />;
    default:
      return <Layers className="size-4 text-orange-500" />;
  }
};

const AccountSubscription: React.FC<Props> = ({ language }) => {
  const t = subscriptionTranslations[language] ||subscriptionTranslations.en;

  const { isErrorModalOpen, setErrorModalState, openErrorModalWithMessage, errorModalMessage } =
    useErrorModalState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AccountPlanFormData>({
    resolver: zodResolver(accountPlanSchema),
    defaultValues: {
      plan_id: "",
      selectedPlan: "",
    },
  });

  const selectedPlanType = watch("plan_id");
  const selectedPlan = watch("selectedPlan");
  const { mutate: handleSubscription, isLoading: isSubmitting } = useCreateSubscription();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useFetchSubscriptionPlan();
  const { data: singleSubscription, fetchNextPage: _fetchSingleNextPage, isLoading: isLoadingSinglePlan } =
    useFetchSubscriptionPlanById(selectedPlanType);

  const subscriptionDuration =
    data?.pages.flatMap((page) =>
      page?.results?.map((event) => ({
        name: event?.name,
        label: event?.duration,
        value: String(event?.id),
      }))
    ).filter(Boolean) ?? [];

  const singleSubscriptionData =
    singleSubscription?.pages.flatMap((page) =>
      page?.results?.map((event) => ({
        id: String(event?.id),
        name: event?.name,
        label: event?.duration,
        value: String(event?.id),
        duration: event?.duration,
        maxPhotoUpload: event?.max_photo_upload || 0,
        maxVideoUpload: event?.max_video_upload || 0,
        maxVideoMinute: event?.max_video_minute || 0,
        subtitle: getSubtitle(event?.duration, event?.token, t),
        description: event?.description || "",
        icon: getPlanIcon(event?.name),
        tokens: event?.token || 0,
      }))
    ).filter(Boolean) ?? [];

  // Reset selectedPlan when plan_id changes
  useEffect(() => {
    setValue("selectedPlan", "");
  }, [selectedPlanType, setValue]);

  const onSubmit = (data: AccountPlanFormData) => {
    handleSubscription(
      { plan_id: Number(data?.plan_id) },
      {
        onSuccess: () => {
          toast.success("Subscription updated successfully");
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
      {/* Header */}
      <div className="h-[55vh] overflow-y-auto">
        <div className="mb-8">
          <h1 className="md:text-2xl text-xl font-medium text-[#09090B] dark:text-white font-archivo mb-1">
            {t.header}
          </h1>
          <p className="text-[#36394A] dark:text-gray-300 font-archivo font-medium text-sm mb-6">
            {t.subheader}
          </p>

          {/* Plan Type Dropdown */}
          <Controller
            name="plan_id"
            control={control}
            render={({ field }) => (
              <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                <SelectTrigger 
                className={`border relative ${
                          errors.plan_id
                            ? "border-red-500"
                            : "border-[#E2E8F0] dark:border-gray-600"
                        } outline-none py-[.8125rem] w-full text-black dark:text-gray-100 flex-1 text-xs md:text-sm bg-white dark:bg-gray-700 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                      >
                  <SelectValue placeholder={t.selectDuration} className="text-black dark:text-white" />
                    <div className="absolute right-4">
                          <CaretDown color="currentColor" className='dark:hidden' />
                        </div>
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                        <div
                          onScroll={(e) => {
                            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                            if (scrollHeight - scrollTop === clientHeight) {
                              if (hasNextPage && !isFetchingNextPage) {
                                fetchNextPage();
                              }
                            }
                          }}
                          className="max-h-60 overflow-y-auto"
                        >
                          {subscriptionDuration?.map((duration, idx) => (
                            <SelectItem value={duration.value} key={`${duration.value}-${idx}`}>
                              {duration.label} {duration?.name}
                            </SelectItem>
                          ))}
                          {(isFetchingNextPage || isLoading) && (
                            <div className="p-2 text-center text-sm flex justify-center items-center text-gray-500">
                             <SmallSpinner/>
                            </div>
                          )}
                        </div>
                      </SelectContent>
              </Select>
            )}
          />
          {errors.plan_id && <p className="text-red-500 text-sm mt-1">{t.validation.planType}</p>}
        </div>

        {/* Plan Selection */}
        {selectedPlanType && (
          <Controller
            name="selectedPlan"
            control={control}
            render={({ field }) => (
              <>
                {isLoadingSinglePlan ? (
                  <div className="flex justify-center items-center py-5">
                    <SmallSpinner />
                  </div>
                ) : (
                  <div>
                    {singleSubscriptionData?.map((plan) => (
                      <div
                        key={plan.id}
                        className={`relative bg-white dark:bg-gray-800 rounded-lg border-2 cursor-pointer mb-4 ${
                          field.value === plan.id ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                        }`}
                        onClick={() => field.onChange(plan.id)}
                      >
                        <div className="flex items-center justify-between p-[.875rem] border-b">
                          <div className="flex items-center gap-4">
                            <div className="size-8 rounded-full bg-orange-100 flex justify-center items-center">{plan.icon}</div>
                            <h3 className="text-sm font-medium">{plan.name}</h3>
                          </div>
                          <div className={`size-5 rounded-full border ${field.value === plan.id ? "bg-orange-500" : ""}`}></div>
                        </div>
                        <div className="p-[14px]">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="lg:text-3xl text-lg font-semibold">{plan.tokens}</p>
                            <p className="text-sm">{plan.subtitle}</p>
                          </div>
                          <p className="text-sm">{plan.description}</p>
                          <div className="flex items-center gap-4 flex-wrap">
                            <p>{t.maxPhoto} {plan.maxPhotoUpload}</p>
                            <p>{t.maxVideo} {plan.maxVideoUpload}</p>
                            <p>{t.maxMinute} {plan.maxVideoMinute}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          />
        )}
        {errors.selectedPlan && <p className="text-sm text-red-600">{t.validation.plan}</p>}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-orange-500 text-white px-8 py-3 rounded-md flex items-center gap-x-3"
          disabled={!selectedPlan}
        >
          {t.selectPlan} {isSubmitting && <SmallSpinner color="#fff" />}
        </button>
      </div>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => setErrorModalState(false)}
        subheading={errorModalMessage || t.error}
      />
    </div>
  );
};

export default AccountSubscription;
