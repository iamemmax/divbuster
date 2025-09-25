// import React, { useEffect, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { ChevronDown, Layers, Zap } from 'lucide-react';
// import { useFetchSubscriptionPlan } from '../../../api/subscription/fetchSubscriptionPlan';
// import SelectField from '@/components/core/SelectField';
// import { ErrorModal, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core';
// import { CaretDown } from '@/components/icons';
// import { useFetchSubscriptionPlanById } from '../../../api/subscription/fetchSubscriptionPlanById';
// import { SmallSpinner } from '@/icons/core';
// import { useErrorModalState } from '@/hooks';
// import { useCreateSubscription } from '../../../api/subscription/createSubscriptionPlan';
// import toast from 'react-hot-toast';
// import { formatAxiosErrorMessage } from '@/utils';
// import { AxiosError } from 'axios';

// // Types
// interface PlanOption {
//   id: string;
//   name: string;
//   icon: React.ReactNode;
//   tokens: number | string;
//   subtitle: string;
//   description: string;
//   isLifetime?: boolean;
// }

// type PlanType = 'one' | 'two' | 'three';

// // Zod schema
// const accountPlanSchema = z.object({
//   plan_id: z.string().min(1, 'Please select a plan type'),
//   selectedPlan: z.string().min(1, 'Please select a plan')
// });

// type AccountPlanFormData = z.infer<typeof accountPlanSchema>;

// const getSubtitle = (duration: string, tokens: number) => {
//   if (tokens === 0) return 'Token per year';
//   if (duration === 'unlimited') return 'Tokens for a Lifetime';
//   return `Tokens for ${duration.replace('year', ' year(s)')}`;
// };

// const getPlanIcon = (planName: string) => {
//   switch (planName.toLowerCase()) {
//     case 'free':
//       return <Layers className="w-4 h-4 text-orange-500" />;
//     case 'solid':
//       return <Layers className="w-4 h-4 text-orange-500" />;
//     case 'fun':
//     case 'divebuster':
//       return <Zap className="w-4 h-4 text-orange-500" />;
//     default:
//       return <Layers className="w-4 h-4 text-orange-500" />;
//   }
// };

// const AccountSubscription: React.FC = () => {
//    const {
//             isErrorModalOpen,
//             setErrorModalState,
//             openErrorModalWithMessage,
//             errorModalMessage,
//         } = useErrorModalState();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue
//   } = useForm<AccountPlanFormData>({
//     resolver: zodResolver(accountPlanSchema),
//     defaultValues: {
//       plan_id: '',  // Changed from 'Lifetime Plan' to empty string
//       selectedPlan: ''
//     }
//   });

//   const selectedPlanType = watch('plan_id');
//   const selectedPlan = watch('selectedPlan');
//   const { mutate: handleSubscription, isLoading: isSubmitting } = useCreateSubscription();

//   const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
//     useFetchSubscriptionPlan();

//   const { 
//     data: singleSubscription, 
//     fetchNextPage: fetchSingleNextPage, 
//     hasNextPage: hasSingleNextPage,  // Fixed typo: hasSingleNextPAge -> hasSingleNextPage
//     isLoading: isLoadingSinglePlan, 
//     isFetchingNextPage: isFetchingSingleNextPage  // Fixed typo: isFectchingNextPage -> isFetchingNextPage
//   } = useFetchSubscriptionPlanById(selectedPlanType);

//   const subscriptionDuration =
//     data?.pages.flatMap((page) =>
//       page?.results?.map((event) => ({
//         name: event?.name,
//         label: event?.duration,
//         value: String(event?.id),
//       }))
//     ).filter(Boolean) ?? [];  // Added filter to remove undefined values

//   const singleSubscriptionData =
//     singleSubscription?.pages.flatMap((page) =>
//       page?.results?.map((event) => ({
//         id: String(event?.id),  // Ensure id is always a string
//         name: event?.name,
//         label: event?.duration,
//         value: String(event?.id),
//         duration: event?.duration,
//         maxPhotoUpload: event?.max_photo_upload || 0,
//         maxVideoUpload: event?.max_video_upload || 0,
//         maxVideoMinute: event?.max_video_minute || 0,
//         subtitle: getSubtitle(event?.duration, event?.token),
//         description: event?.description || '',
//         icon: getPlanIcon(event?.name),
//         tokens: event?.token || 0,
//       }))
//     ).filter(Boolean) ?? [];  // Added filter to remove undefined values

//   // Combined scroll handler to avoid duplicate event listeners
//   useEffect(() => {
//     const handleScroll = () => {
//       const isNearBottom = 
//         window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      
//       if (isNearBottom) {
//         // Handle main subscription data pagination
//         if (hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
        
//         // Handle single subscription data pagination
//         if (hasSingleNextPage && !isFetchingSingleNextPage) {  // Fixed variable name
//           fetchSingleNextPage();
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [
//     hasNextPage, 
//     isFetchingNextPage, 
//     isFetchingSingleNextPage,
//     fetchNextPage, 
//     hasSingleNextPage,  // Fixed variable name
//     fetchSingleNextPage
//   ]);

//   // Reset selectedPlan when plan_id changes
//   useEffect(() => {
//     setValue('selectedPlan', '');
//   }, [selectedPlanType, setValue]);

//   const onSubmit = (data: AccountPlanFormData) => {
//       handleSubscription({
//             plan_id:Number(data?.plan_id)
            
//         }, {
//             onSuccess: () => {
//               toast.success("Temperature updated successfully")

//             },
//             onError: (error) => {
//                 const errorMessage = formatAxiosErrorMessage(error as AxiosError);
//                 openErrorModalWithMessage(String(errorMessage));
//             },
//         });
//   };

//   const formatTokenDisplay = (tokens: number | string, subtitle: string): React.ReactNode => {
//     if (tokens === 0) {
//       return (
//         <div className="flex items-center gap-3 mb-2">
//           <p className="lg:text-3xl text-lg text-[#344054] dark:text-gray-200 font-semibold font-archivo mb-1">0</p>
//           <p className="text-[#667085] dark:text-gray-400 font-archivo text-sm">{subtitle}</p>
//         </div>
//       );
//     }
    
//     return (
//       <div className="flex items-center gap-3 mb-2">
//         <p className="lg:text-3xl text-lg text-[#344054] dark:text-gray-200 font-semibold font-archivo mb-1">{tokens}</p>
//         <p className="text-[#667085] dark:text-gray-400 font-archivo text-sm">{subtitle}</p>
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-2xl">


//       {/* Header */}

//       <div className="h-[55vh] overflow-y-auto">
//       <div className="mb-8">
//         <h1 className="md:text-2xl text-xl font-medium text-[#09090B] dark:text-white font-archivo mb-1">
//           My Account Plan
//         </h1>
//         <p className="text-[#36394A] dark:text-gray-300 font-archivo font-medium text-sm mb-6">
//           Choose your preferred Account Plan {selectedPlanType}
//         </p>

//         {/* Plan Type Dropdown */}
//         <div className="mb-8">
//           <div className="relative w-full">
//             <div className="">
//               <div className="">
//                 <Controller
//                   name="plan_id"
//                   control={control}
//                   render={({ field }) => (
//                     <Select 
//                       onValueChange={(value) => {
//                         field.onChange(value);
//                       }} 
//                       value={field.value}
//                     >
//                       <SelectTrigger
                      //   className={`border relative ${
                      //     errors.plan_id
                      //       ? "border-red-500"
                      //       : "border-[#E2E8F0] dark:border-gray-600"
                      //   } outline-none py-[.8125rem] w-full text-black dark:text-gray-100 flex-1 text-xs md:text-sm bg-white dark:bg-gray-700 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                      // >
//                         <SelectValue placeholder="Select duration" />
                        // <div className="absolute right-4">
                        //   <CaretDown color="currentColor" className='dark:hidden' />
                        // </div>
//                       </SelectTrigger>
                      // <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                      //   <div
                      //     onScroll={(e) => {
                      //       const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                      //       if (scrollHeight - scrollTop === clientHeight) {
                      //         if (hasNextPage && !isFetchingNextPage) {
                      //           fetchNextPage();
                      //         }
                      //       }
                      //     }}
                      //     className="max-h-60 overflow-y-auto"
                      //   >
                      //     {subscriptionDuration?.map((duration, idx) => (
                      //       <SelectItem value={duration.value} key={`${duration.value}-${idx}`}>
                      //         {duration.label} {duration?.name}
                      //       </SelectItem>
                      //     ))}
                      //     {(isFetchingNextPage || isLoading) && (
                      //       <div className="p-2 text-center text-sm text-gray-500">
                      //         Loading...
                      //       </div>
                      //     )}
                      //   </div>
                      // </SelectContent>
//                     </Select>
//                   )}
//                 />
//                 {errors.plan_id && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.plan_id.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Plan Selection */}
//       {selectedPlanType && (
//         <div className="space-y-4">
//           <Controller
//             name="selectedPlan"
//             control={control}
//             render={({ field }) => (
//               <>
//                 {isLoadingSinglePlan ? (
//                   <div className='flex justify-center items-center py-5'>
//                     <SmallSpinner/>
//                   </div>
//                 ) : (
//                   <div 
//                     className=""
//                     onScroll={(e) => {
//                       const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
//                       if (scrollHeight - scrollTop === clientHeight) {
//                         if (hasSingleNextPage && !isFetchingNextPage) {  // Fixed variable name
//                           fetchSingleNextPage();
//                         }
//                       }
//                     }}
//                   >
//                     {singleSubscriptionData?.map((plan) => (
//                       <div
//                         key={plan.id}
//                         className={`relative bg-white dark:bg-gray-800 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/20 mb-4 ${
//                           field.value === plan.id
//                             ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
//                             : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
//                         }`}
//                         onClick={() => {
//                           console.log('Plan clicked:', plan.id); // Debug log
//                           field.onChange(plan.id);
//                         }}
//                       >
//                         <div className="flex flex-col">
//                           <div className="flex-1 w-full">
//                             {/* Plan Header */}
//                             <div className="flex items-center justify-between p-[.875rem] border-b border-[#EAECF0] dark:border-gray-600">
//                               <div className="flex items-center gap-4 flex-1">
//                                 <div className="w-8 rounded-full bg-[#FEF6F4] dark:bg-orange-900/30 flex justify-center items-center shrink-0 h-8"> 
//                                   {plan.icon}
//                                 </div>
//                                 <h3 className="md:text-base text-sm font-medium text-[#344054] dark:text-gray-200 font-archivo ml-3">
//                                   {plan.name} 
//                                 </h3>
//                               </div>

//                               {/* Radio Button */}
//                               <div className="p-3 flex-shrink-0">
//                                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                                   field.value === plan.id
//                                     ? 'border-[#FF6500] bg-[#FF6500]'
//                                     : 'border-[#FF6500] dark:border-orange-400'
//                                 }`}>
//                                   {field.value === plan.id && (
//                                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Token Display */}
//                           </div>
//                           <div className="p-[14px]">
//                             {formatTokenDisplay(plan.tokens, plan.subtitle)}

//                             {/* Plan Description */}
//                             <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
//                               {plan.description}
//                             </p>
//                             <div className="flex items-center gap-4 flex-wrap">
//                               <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//                                 Max. Photo upload {plan?.maxPhotoUpload}
//                               </p>
//                               <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//                                 Max. Video upload {plan?.maxVideoUpload}
//                               </p>
//                               <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//                                 Max. video Minute {plan?.maxVideoMinute}
//                               </p>
//                             </div>
//                           </div>

//                           {/* Selection Overlay */}
//                           {field.value === plan.id && (
//                             <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 bg-opacity-20 rounded-lg pointer-events-none"></div>
//                           )}
//                         </div>
//                       </div>
//                     ))}
                    
//                     {isFetchingNextPage && (
//                       <div className='flex justify-center items-center py-5'>
//                         <SmallSpinner/>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           />
          
//           {errors.selectedPlan && (
//             <p className="text-sm text-red-600 dark:text-red-400" role="alert">
//               {errors.selectedPlan.message}
//             </p>
//           )}
//         </div>
//       )}

//       </div>

//       {/* Submit Button */}
//       <div className="mt-8 flex justify-end ">
//         <button
//           type="button"
//           onClick={handleSubmit(onSubmit)}
//           className="bg-orange-500 hover:bg-orange-600 flex justify-center items-center gap-x-3 dark:bg-orange-600 dark:hover:bg-orange-700 disabled:bg-orange-300 dark:disabled:bg-orange-800 text-white px-8 py-3 rounded-md font-medium transition-colors"
//           disabled={!selectedPlan}
//         >
//           Select Plan  {isSubmitting && <SmallSpinner color='#fff'/>}
//         </button>
//       </div>

//       <ErrorModal
//                               isErrorModalOpen={isErrorModalOpen}
//                               setErrorModalState={() => {
//                                   setErrorModalState(false);
//                               }}
//                               subheading={
//                                   errorModalMessage || "Please check your inputs and try again."
//                               }
//                           />
//     </div>
//   );
// };

// export default AccountSubscription;



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
interface PlanOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  tokens: number | string;
  subtitle: string;
  description: string;
  isLifetime?: boolean;
}

const accountPlanSchema = z.object({
  plan_id: z.string().min(1, "planType"),
  selectedPlan: z.string().min(1, "plan"),
});
type AccountPlanFormData = z.infer<typeof accountPlanSchema>;

interface Props {
  language: Language;
}

const getSubtitle = (duration: string, tokens: number, t: any) => {
  if (tokens === 0) return t.tokensPerYear;
  if (duration === "unlimited") return t.lifetimeTokens;
  return `${t.tokensFor} ${duration.replace("year", " year(s)")}`;
};

const getPlanIcon = (planName: string) => {
  switch (planName.toLowerCase()) {
    case "free":
    case "solid":
      return <Layers className="w-4 h-4 text-orange-500" />;
    case "fun":
    case "divebuster":
      return <Zap className="w-4 h-4 text-orange-500" />;
    default:
      return <Layers className="w-4 h-4 text-orange-500" />;
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
  const { data: singleSubscription, fetchNextPage: fetchSingleNextPage, hasNextPage: hasSingleNextPage, isLoading: isLoadingSinglePlan, isFetchingNextPage: isFetchingSingleNextPage } =
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
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex justify-center items-center">{plan.icon}</div>
                            <h3 className="text-sm font-medium">{plan.name}</h3>
                          </div>
                          <div className={`w-5 h-5 rounded-full border ${field.value === plan.id ? "bg-orange-500" : ""}`}></div>
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
