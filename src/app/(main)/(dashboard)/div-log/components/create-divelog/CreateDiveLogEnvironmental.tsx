import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { Language } from '@/app/(auth)/sign-up/translations';
import { environmentalConditionTranslations } from '@/app/(main)/translation/diveLogTranslation';
import { Button, DialogHeader, DialogTitle } from '@/components/core'
import { useLanguage } from '@/hooks/useLanguage';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// Define the validation schema with Zod
const moreLogDetailsSchema = z.object({
    min_water_temperature: z.string().min(1),
    max_water_temperature: z.string().min(1),
    avg_water_temperature: z.string().min(1),

});

export type diveEnvironmentalFormValues = z.infer<typeof moreLogDetailsSchema>;


interface prop {
    setStep: React.Dispatch<React.SetStateAction<number>>
    setEvironmentalData: React.Dispatch<React.SetStateAction<diveEnvironmentalFormValues>>
    evironmentalData: diveEnvironmentalFormValues;
    user: User | null
}
const CreateDiveLogEnvironmental = ({ evironmentalData, setEvironmentalData, setStep,user }: prop) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<diveEnvironmentalFormValues>({
        resolver: zodResolver(moreLogDetailsSchema),
        defaultValues: {
            min_water_temperature: String(evironmentalData?.min_water_temperature) || "0",
            avg_water_temperature: String(evironmentalData?.avg_water_temperature || "0"),
            max_water_temperature: String(evironmentalData?.max_water_temperature) || "0",

        },
    });
     const {language}= useLanguage()
        const t = environmentalConditionTranslations[language] || environmentalConditionTranslations?.en;

    const onSubmit = (data: diveEnvironmentalFormValues) => {
        setEvironmentalData({ avg_water_temperature: data?.avg_water_temperature, max_water_temperature: data?.max_water_temperature, min_water_temperature: data?.min_water_temperature })
        setStep(5)
    }
    return (
        <div className='p-3'> <DialogHeader className="border-b flex items-center justify-between border-gray-200 dark:border-gray-700 pb-4">
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {t?.header}
            </DialogTitle>

        </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full max-h-[60vh] p-6 md:max-h-[70vh] overflow-auto">

                    {/* Minimum Temp */}
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                           {t.labels?.min}
                        </label>
                        <input
                            {...register('min_water_temperature')}
                            placeholder="0"
                            className={`border ${errors.min_water_temperature
                                ? "border-red-500 dark:border-red-400"
                                : "border-[#E2E8F0] dark:border-gray-600"
                                } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-700 font-archivo rounded-lg px-[.875rem] 
              focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors 
              placeholder-gray-400 dark:placeholder-gray-500`}
                        />
                        {errors.min_water_temperature && (
                            <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                {errors.min_water_temperature.message}
                            </p>
                        )}
                    </div>

                    {/* Maximum Temp */}
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
                           {t.labels?.max}
                        </label>
                        <input
                            {...register('max_water_temperature')}
                            placeholder="0"
                            className={`border ${errors.max_water_temperature
                                ? "border-red-500 dark:border-red-400"
                                : "border-[#E2E8F0] dark:border-gray-600"
                                } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-700 font-archivo rounded-lg px-[.875rem] 
              focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors 
              placeholder-gray-400 dark:placeholder-gray-500`}
                        />
                        {errors.max_water_temperature && (
                            <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                {errors.max_water_temperature.message}
                            </p>
                        )}
                    </div>

                    {/* Average Temp */}
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] py-4 items-center gap-2 sm:gap-5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
                           {t.labels.avg}
                        </label>
                        <input
                            {...register('avg_water_temperature')}
                            placeholder="0"
                            className={`border ${errors.avg_water_temperature
                                ? "border-red-500 dark:border-red-400"
                                : "border-[#E2E8F0] dark:border-gray-600"
                                } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-700 font-archivo rounded-lg px-[.875rem] 
              focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors 
              placeholder-gray-400 dark:placeholder-gray-500`}
                        />
                        {errors.avg_water_temperature && (
                            <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                {errors.avg_water_temperature.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                    <Button type="button" className='dark:border-white dark:text-white' variant="outlined" onClick={() => setStep(3)}>
                      {t.actions.cancel}
                    </Button>
                    <Button
                        type="submit"
                        className="bg-orange-500 flex justify-center items-center gap-x-3 hover:bg-orange-600 text-white"
                    >
                      {t.actions.save}
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default CreateDiveLogEnvironmental