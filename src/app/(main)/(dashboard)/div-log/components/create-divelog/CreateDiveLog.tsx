"use client"
import CloseIcon from '@/app/icons/CloseIcon'
import { DialogClose, DialogHeader, DialogTitle } from '@/components/core'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useFetchDiveSites } from '../../../api/bookings/fetchDiveLocations'
import SelectField from '@/components/core/SelectField'
import { CustomDateRange } from '@/app/(main)/components/dashboard/MonthlySnapShot'
import moment from 'moment'
import DateRangePicker from '@/components/core/DateRangePicker'
import { User } from '@/app/(auth)/api/getAuthenticatedUser'
import { Language } from '@/app/(auth)/sign-up/translations'
import { createdivePlanTranslations } from '@/app/(main)/translation/diveLogTranslation'

interface prop {
    setStep: React.Dispatch<React.SetStateAction<number>>
    onClose: () => void
    setDiveLogData: React.Dispatch<React.SetStateAction<diveLogTypes>>
    diveLogData:diveLogTypes;
    user: User | null
}

const advancedDetailsSchema = z.object({
    name: z.string().min(1, { message: "name is " }),
    start_date: z.string().min(1),
    end_date: z.string().min(1),
    dive_site_id: z.string().min(1),
});

export type diveLogTypes = z.infer<typeof advancedDetailsSchema>;

const CreateDiveLog = ({ setStep, onClose,diveLogData,setDiveLogData,user }: prop) => {
      const language: Language = (user?.profile_details?.language as Language)
    const t = createdivePlanTranslations[language] || createdivePlanTranslations?.en;

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState<CustomDateRange>({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date(),
    });

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<diveLogTypes>({
        resolver: zodResolver(advancedDetailsSchema),
        defaultValues: {
            dive_site_id:diveLogData?.dive_site_id || "",
            name:diveLogData?.name ||  "",
            start_date: diveLogData?.start_date || "",
            end_date: diveLogData?.end_date || "",
        },
        mode: "onChange"
    });

    const {
        data: diveSitesData,
        fetchNextPage: fetchNextPageDiveSites,
        hasNextPage: hasNextPageDiveSite,
        isLoading: isLoadingDiveSites,
        isFetchingNextPage: isFetchingNextPageDiveSite,
    } = useFetchDiveSites();

    const diveLocation =
        diveSitesData?.pages.flatMap((page) =>
            page.data?.results.map((site) => ({
                label: site?.title,
                value: String(site?.id),
            }))
        ) ?? [];


        useEffect(() => {
            setValue('start_date', String(dateRange?.startDate));
        setValue('end_date', String(dateRange?.endDate));
        }, [])
        
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200 && // near bottom
                hasNextPageDiveSite &&
                !isFetchingNextPageDiveSite
            ) {
                fetchNextPageDiveSites();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPageDiveSite, isFetchingNextPageDiveSite, fetchNextPageDiveSites]);

    const handleDateRangeApply = (startDate: Date, endDate: Date) => {
        setDateRange({ startDate, endDate });
        setValue('start_date', String(startDate));
        setValue('end_date', String(endDate));
        setShowDatePicker(false);
    };

    const formatDateRange = () => {
        if (dateRange.startDate && dateRange.endDate) {
            return `${moment(dateRange.startDate).format("ll")} - ${moment(dateRange.endDate).format("ll")}`;
        }
        return t.dateSelect
    };

    const onSubmit = (data: diveLogTypes) => {
        setDiveLogData({
            dive_site_id:data?.dive_site_id,
            name:data?.name,
            start_date:data?.start_date,
            end_date:data?.end_date,
        })
        
        setStep(2)
        // Handle form submission
    };

    return (
        <div className='py-3'>
            <DialogHeader className="border-b flex items-center justify-between border-gray-200 dark:border-gray-700 pb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                 {t?.title}
                </DialogTitle>
                <DialogClose className="bg-transparent p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={onClose}>
                    <CloseIcon className="dark:text-white text-black" />
                </DialogClose>
            </DialogHeader>

            <form className="p-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                     {t?.nameLabel}
                    </label>
                    <input
                        type="text"
                        placeholder={t?.namePlaceholder}
                        {...register("name")}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 
              text-gray-900 dark:text-white placeholder-gray-400 
              transition-colors outline-none
              border ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name?.message}
                        </p>
                    )}
                </div>

                <div className="">
                    <Controller
                        name="dive_site_id"
                        control={control}
                        render={({ field }) => (
                            <SelectField
                                field={field}
                                label={t?.diveSpotLabel}
                                placeholder={t?.diveSpotPlaceholder}
                                options={diveLocation}
                                onReachEnd={() => {
                                    if (
                                        hasNextPageDiveSite &&
                                        !isFetchingNextPageDiveSite
                                    ) {
                                        fetchNextPageDiveSites();
                                    }
                                }}
                                loading={
                                    isFetchingNextPageDiveSite || isLoadingDiveSites
                                }
                                error={errors?.dive_site_id}
                            />
                        )}
                    />
                    {errors.dive_site_id && (
                        <p className="text-red-500 text-sm">
                            {errors.dive_site_id.message}
                        </p>
                    )}
                </div>

                <div className="">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                       {t?.dateLabel}
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowDatePicker(true)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {formatDateRange()}
                    </button>
                    {(errors.start_date || errors.end_date) && (
                        <p className="text-red-500 text-sm mt-1">
                           {t?.dateRequired}
                        </p>
                    )}

                    {showDatePicker && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-6xl">
                                <DateRangePicker
                                    initialStartDate={dateRange.startDate || undefined}
                                    initialEndDate={dateRange.endDate || undefined}
                                    onApply={handleDateRangeApply}
                                    onCancel={() => setShowDatePicker(false)}
                                />
                            </div>
                        </div>
                    )}

                </div>
                <div className="flex justify-end">
                    <button
                        className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg flex justify-center items-center gap-x-3 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t.proceed}
                    </button>
                </div>
            </form>

        </div>
    )
}

export default CreateDiveLog