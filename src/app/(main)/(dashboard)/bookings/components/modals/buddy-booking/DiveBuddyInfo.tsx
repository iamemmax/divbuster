import { useFetchDiveSites } from '@/app/(main)/(dashboard)/api/bookings/fetchDiveLocations';
import { CustomDateRange } from '@/app/(main)/components/dashboard/MonthlySnapShot';
import DateRangePicker from '@/components/core/DateRangePicker';
import SelectField from '@/components/core/SelectField';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { PlaceData } from '../../../../../../../../google-maps';
import GoogleAutocomplete from '@/app/(main)/components/google/Autocomplete';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { divePlanBuddiesTranslations } from '@/app/(main)/translation/diveLogTranslation';
import { useLanguage } from '@/hooks/useLanguage';


interface prop{
     setStep: React.Dispatch<React.SetStateAction<number>>
   user: User | null
      setStepOneLogDetails: React.Dispatch<React.SetStateAction<diveLogTypes>>
}

const advancedDetailsSchema = z.object({
    name: z.string().min(1, { message: "name is required" }),
    start_date: z.string().min(1),
    end_date: z.string().min(1),
    dive_site_id: z.string().min(1),
    // meet_up_address: z.string().min(1, { message: "meet up address is required" }),
    meet_up_address: z.string().optional(),
    
});

export type diveLogTypes = z.infer<typeof advancedDetailsSchema>;

const DiveBuddyInfo: React.FC<prop> = ({setStep, setStepOneLogDetails,user}) => {
             const {language}= useLanguage()
                const t = divePlanBuddiesTranslations[language] || divePlanBuddiesTranslations?.en;
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState<CustomDateRange>({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date(),
    });
    const [selectedMeetupPlace, setSelectedMeetupPlace] = useState<PlaceData | null>(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<diveLogTypes>({
        resolver: zodResolver(advancedDetailsSchema),
        defaultValues: {
            dive_site_id: "",
            name: "",
            start_date: "",
            end_date: "",
            meet_up_address: "",
          
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
    useEffect(() => {
      setValue("start_date",String(dateRange.startDate))
      setValue("end_date",String(dateRange.endDate))
    }, [])
    

    const diveLocation =
        diveSitesData?.pages.flatMap((page) =>
            page.data?.results.map((site) => ({
                label: site?.title,
                value: String(site?.id),
            }))
        ) ?? [];

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

    const handleMeetupPlaceSelected = (place: PlaceData) => {
        setSelectedMeetupPlace(place);
        setValue('meet_up_address', place.address);
    };

    const formatDateRange = () => {
        if (dateRange.startDate && dateRange.endDate) {
            return `${moment(dateRange.startDate).format("ll")} - ${moment(dateRange.endDate).format("ll")}`;
        }
        return t.fields.date.placeholder
    };

    const onSubmit = ({dive_site_id,end_date,name,start_date,meet_up_address}: diveLogTypes) => {
     setStepOneLogDetails({dive_site_id,end_date,name,start_date,meet_up_address})
     setStep(2)   
     // Handle form submission
    }


    return (
        <div>
            <form className="p-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                     {t.fields.name.label}
                    </label>
                    <input
                        type="text"
                        placeholder={t.fields.name.placeholder}
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
                                label={t.fields.diveSpot?.label}
                                placeholder={t.fields.diveSpot?.placeholder}
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
                       {t.fields.date.label}
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
                          {t.fields.date.error}
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

                {/* Google Autocomplete for Meet-up Address */}
                <div className="">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.fields.meetUpAddress.label}
                    </label>
                    <GoogleAutocomplete
                        onPlaceSelected={handleMeetupPlaceSelected}
                        placeholder={t.fields.meetUpAddress.placeholder}
                        className={`${errors.meet_up_address ? "border-red-500" : ""}  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white`}
                        options={{
                            types: ['establishment', 'geocode'],
                            // You can add country restrictions if needed
                            // componentRestrictions: { country: 'us' }
                        }}
                    />
                    {errors.meet_up_address && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.meet_up_address?.message}
                        </p>
                    )}
                    
                
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg flex justify-center items-center gap-x-3 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t.buttons.proceed}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DiveBuddyInfo