import React from 'react'
import { Button,  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core';
// import { DialogTitle } from '@radix-ui/react-dialog';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretDown } from '@/components/icons';
import { convertKebabAndSnakeToTitleCase } from '@/utils/strings';
import { capitalizeFirstLetter } from '@/utils';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { Language } from '@/app/(auth)/sign-up/translations';
import { gearLogTranslations } from '@/app/(main)/translation/diveLogTranslation';
import { useLanguage } from '@/hooks/useLanguage';

interface prop {
    setPlanGearData: React.Dispatch<React.SetStateAction<createGearLogDetailsFormValues>>
    user: User | null
    setStep: React.Dispatch<React.SetStateAction<number>>
}


const advancedDetailsSchema = z.object({
    gas_mixture: z.string().min(1),
    bcd: z.string().min(1),
    weight: z.string().min(1),
    mask: z.string().min(1),
    regulator: z.string().min(1),
    fin: z.string().min(1),
    wetsuit: z.string().min(1),
});
export type createGearLogDetailsFormValues = z.infer<typeof advancedDetailsSchema>;


const CreateDrivePlanGear: React.FC<prop> = ({ setPlanGearData, setStep, user }) => {
   const {language}= useLanguage()
    const t = gearLogTranslations[language] || gearLogTranslations?.en;
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<createGearLogDetailsFormValues>({
        resolver: zodResolver(advancedDetailsSchema),
        defaultValues: {
            gas_mixture: '',
            bcd: "",
            weight: '',
            mask: '',
            regulator: "",
            fin: "",
            wetsuit: '',
        },
    });

    const gasMixture = ["air", "eanx32", "eanx36", "eanx40", "enriched", "rebreather"]
    const weightArray = ["light", "good", "heavy"]
    const maskArray = ["regular", "full_mask", "other"]
    const wetSuitArray = ["dry", "3mm_full", "5mm_full", "7mm_full", "shorty", "semi_dry", "wet", "none"]


    const onSubmit = (data: createGearLogDetailsFormValues) => {
        setPlanGearData({ bcd: data?.bcd, fin: data?.fin, gas_mixture: data?.gas_mixture, mask: data?.mask, regulator: data?.regulator, weight: data?.weight, wetsuit: data?.wetsuit })
        setStep(3)
    }
    return (
        <div className='py-3'>
            {/* <DialogHeader className="border-b flex items-center justify-between border-gray-200 dark:border-gray-700 pb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                   Log your Gear
                </DialogTitle>
               
            </DialogHeader> */}

            <form onSubmit={handleSubmit(onSubmit)} className='w-full p-6 space-y-8'>
                <div className="w-full max-h-[78vh] md:max-h-[70vh]  overflow-auto">
                    <div className="grid grid-cols-1  gap-4">
                        <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{t.fields.gasMixture}</label>
                            <Controller
                                name="gas_mixture"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={`border relative ${errors.gas_mixture ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                            } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}>
                                            <SelectValue placeholder={t.placeholders.gasMixture} />
                                            <div className="absolute right-4"><CaretDown color='black' className='dark:hidden' /></div>

                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                gasMixture?.map((mix, idx: number) => (
                                                    <SelectItem className='text-black' value={mix} key={idx}>{capitalizeFirstLetter(mix)}</SelectItem>

                                                ))
                                            }

                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{t.fields.bcd}</label>
                            <Controller
                                name="bcd"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={`border relative ${errors.bcd ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                            } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}                                       >
                                            <SelectValue placeholder={t.placeholders.bcd} />
                                            <div className="absolute right-4"><CaretDown color='black' className='dark:hidden' /></div>

                                        </SelectTrigger>
                                        <SelectContent className='text-black'>
                                            <SelectItem value="true">True</SelectItem>
                                            <SelectItem value="false">False</SelectItem>

                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{t.fields.weight}</label>
                            <Controller
                                name="weight"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={`border relative ${errors.weight ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                            } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}                                        >
                                            <SelectValue placeholder={t.placeholders.weight} />
                                            <div className="absolute right-4"><CaretDown color='black' className='dark:hidden' /></div>

                                        </SelectTrigger>
                                        <SelectContent className='text-black'>
                                            {
                                                weightArray?.map((weight, idx: number) => (
                                                    <SelectItem value={weight} key={idx}>{capitalizeFirstLetter(weight)}</SelectItem>

                                                ))
                                            }


                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>



                        <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{t.fields.mask}</label>
                            <Controller
                                name="mask"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={`border relative ${errors.mask ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                            } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}                    >
                                            <SelectValue placeholder={t.placeholders.mask} />
                                            <div className="absolute right-4"><CaretDown color='black' className='dark:hidden' /></div>

                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                maskArray?.map((max, idx: number) => (
                                                    <SelectItem className='text-black' value={max} key={idx}>{convertKebabAndSnakeToTitleCase(max)}</SelectItem>

                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{t.fields.regulator}</label>
                            <Controller
                                name="regulator"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={`border relative ${errors.regulator ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                            } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}                             >
                                            <SelectValue placeholder={t.placeholders.regulator} />
                                            <div className="absolute right-4"><CaretDown color='black' className='dark:hidden' /></div>

                                        </SelectTrigger>
                                        <SelectContent className='text-black'>
                                            <SelectItem value="true">True</SelectItem>
                                            <SelectItem value="false">False</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{t.fields.fin}</label>
                            <Controller
                                name="fin"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={`border relative ${errors.fin ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                            } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}                                        >
                                            <SelectValue placeholder={t.placeholders.fin} />
                                            <div className="absolute right-4"><CaretDown color='black' className='dark:hidden' /></div>

                                        </SelectTrigger>
                                        <SelectContent className='text-black'>
                                            <SelectItem value="true">True</SelectItem>
                                            <SelectItem value="false">False</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className='grid grid-cols-[1fr_2fr]  border-opacity-50 py-2 items-center gap-5'>

                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{t.placeholders.wetsuit}</label>
                            <Controller
                                name="wetsuit"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={`border relative ${errors.weight ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                            } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}                                        >
                                            <SelectValue placeholder={t.placeholders.wetsuit} />
                                            <div className="absolute right-4"><CaretDown color='black' className='dark:hidden' /></div>

                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                wetSuitArray?.map((wetsuit, idx: number) => (
                                                    <SelectItem className='text-black' value={wetsuit} key={idx}>{convertKebabAndSnakeToTitleCase(wetsuit)}</SelectItem>

                                                ))
                                            }

                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>


                    </div>
                </div>


                <div className="py-4 border-t border-[#EAECF0] border-opacity-50 flex justify-end space-x-2">
                    <Button type="button"
                        className="px-8 py-3 border-dark dark:border-white dark:text-white  text-black font-medium rounded-lg flex justify-center items-center gap-x-3  transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"

                        variant="outlined" onClick={() => setStep(1)}>
                        {t.actions.cancel}
                    </Button>
                    <Button type="submit" className="bg-orange-500 flex justify-center items-center gap-x-3 hover:bg-orange-600 text-white">
                        {t.actions.saveChanges}
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default CreateDrivePlanGear