"use client"
import { User } from '@/app/(auth)/api/getAuthenticatedUser'
import { Language } from '@/app/(auth)/sign-up/translations'
import { creatediveLogDetailsTranslations } from '@/app/(main)/translation/diveLogTranslation'
// import CloseIcon from '@/app/icons/CloseIcon'
import { Button, DialogClose, DialogHeader, DialogTitle } from '@/components/core'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface prop {
    setStep: React.Dispatch<React.SetStateAction<number>>
    setDiveLogDetails: React.Dispatch<React.SetStateAction<diveLogDetailsTypes>>
    diveLogDetails: diveLogDetailsTypes
    user: User | null
}


const advancedDetailsSchema = z.object({
    bottom_time: z.string().min(1, { message: "bottom time is required" }),
    dive_depth: z.string().min(1),

});
export type diveLogDetailsTypes = z.infer<typeof advancedDetailsSchema>;

const CreateDiveLogDetails = ({ setStep, diveLogDetails, setDiveLogDetails, user }: prop) => {
    const language: Language = (user?.profile_details?.language as Language)
    const t = creatediveLogDetailsTranslations[language] || creatediveLogDetailsTranslations?.en;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<diveLogDetailsTypes>({
        resolver: zodResolver(advancedDetailsSchema),
        defaultValues: {
            bottom_time: diveLogDetails?.bottom_time || "",
            dive_depth: diveLogDetails?.dive_depth || "",

        },
        mode: "onChange"
    });



    const onSubmit = (data: diveLogDetailsTypes) => {
        setDiveLogDetails({ bottom_time: data?.bottom_time, dive_depth: data?.dive_depth })
        setStep(3)
        // Handle form submission
    };

    return (
        <div className='py-3'>
            <DialogHeader className="border-b flex items-center justify-between border-gray-200 dark:border-gray-700 pb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {t?.title}
                </DialogTitle>

            </DialogHeader>

            <form className="p-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t?.bottomTimeLabel}
                    </label>
                    <input
                        type="text"
                        placeholder={t?.bottomTimePlaceholder}
                        {...register("bottom_time")}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 
              text-gray-900 dark:text-white placeholder-gray-400 
              transition-colors outline-none
              border ${errors.bottom_time ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    />

                    {errors.bottom_time && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.bottom_time?.message}
                        </p>
                    )}
                </div>
                <div className="">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t?.depthLabel}
                    </label>
                    <input
                        type="text"
                        placeholder={t?.depthPlaceholder}
                        {...register("dive_depth")}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 
              text-gray-900 dark:text-white placeholder-gray-400 
              transition-colors outline-none
              border ${errors.dive_depth ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    />

                    {errors.dive_depth && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.dive_depth?.message}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        variant={"outlined"}
                        className="px-8 py-3 border-dark dark:border-white dark:text-white  text-black font-medium rounded-lg flex justify-center items-center gap-x-3  transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setStep(1)}
                    >
                        {t.back}
                    </Button>
                    <Button
                        className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg flex justify-center items-center gap-x-3 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t.proceed}
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default CreateDiveLogDetails
