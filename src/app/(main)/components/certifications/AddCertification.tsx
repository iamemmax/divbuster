import React, { useCallback, useEffect, useState } from 'react'
import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogHeader, DialogTitle, ErrorModal, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core";
import CloseIcon from '@/app/icons/CloseIcon';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Certificate, CERTIFICATE_ISSUER_CHOICES, CERTIFICATE_TYPE_CHOICES, certificateSchema } from '.';
import CaretDownIcon from '@/icons/core/CaretDown';
import { capitalizeFirstLetter, formatAxiosErrorMessage } from '@/utils';
import CloudIcon from '@/app/icons/(dashboard)/CloudIcon';
import { useErrorModalState } from '@/hooks';
import { useAddCertification } from '../../(dashboard)/certifications/addCertification';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@/app/(auth)/api/getAuthenticatedUser';
import { SmallSpinner } from '@/icons/core';
import { useQueries, useQueryClient } from 'react-query';
import { certificateResult } from '../../(dashboard)/certifications/fetchCertifications';
import { useUpdateCertification } from '../../(dashboard)/certifications/editCertification';
import { convertKebabAndSnakeToTitleCase } from '@/utils/strings';
import { useLanguage } from '@/hooks/useLanguage';
import { addCertificationFormtranslations } from '../../translation/certificationTranslation';
interface Props {
    setIsOpenCardModal: React.Dispatch<React.SetStateAction<boolean>>;
    certificateData: certificateResult | undefined
    type:string;
    setStep: React.Dispatch<React.SetStateAction<number>>
    selectedCard: string | null
}


const AddCertification = ({ setIsOpenCardModal,certificateData,type,selectedCard,setStep }: Props) => {
    const user = useUser()
    const {language} =useLanguage()
    const t = addCertificationFormtranslations[language] || addCertificationFormtranslations.en
     const {
            isErrorModalOpen,
            setErrorModalState,
            openErrorModalWithMessage,
            errorModalMessage,
        } = useErrorModalState();
    const [dragOver, setDragOver] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const {
  register,
  handleSubmit,
  control,
  setValue,
  reset,
  formState: { errors },
} = useForm<Certificate>({
  resolver: zodResolver(certificateSchema),
  defaultValues: {
    certificate_no: certificateData?.certification_no || "",
    certificate_type: selectedCard as any,
    full_name: certificateData?.full_name || "",
    image: "" as any, // start empty, set later if editing
    issuer: certificateData?.issuer as any || "padi",
    issuer_name: certificateData?.issuer_name || "",
    school_name: certificateData?.school_name || "",
    trainer_name: certificateData?.trainer_name || "",
    trainer_phone: certificateData?.trainer_no || "",
    dob: certificateData?.date_of_birth
      ? certificateData.date_of_birth.split("T")[0] // format YYYY-MM-DD
      : "",
    issue_date: certificateData?.issue_date
      ? certificateData.issue_date.split("T")[0]
      : "",
  },
  mode: "onChange",
});


    useEffect(() => {
  if (certificateData?.image) {
    setImagePreview(certificateData.image); // assuming it's a URL
    // setValue("image", certificateData.image as any); 
  }
}, [certificateData, setValue]);
useEffect(() => {

    setValue("certificate_type", String(selectedCard) as any)

}, [selectedCard, setValue])


    const handleImageUpload = useCallback(
        (file: File) => {
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreview(e.target?.result as string);
                };
                reader.readAsDataURL(file);

                // Save file to react-hook-form
                setValue("image", file as any, { shouldValidate: true });
            }
        },
        [setValue]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setDragOver(false);
            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
                handleImageUpload(files[0]);
            }
        },
        [handleImageUpload]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const removeImage = () => {
        setImagePreview("");
        setValue("image", "" as any);
    };
        const { mutate: handleCreate, isLoading } = useAddCertification();
        const { mutate: handleUpdate, isLoading:isUpdating } = useUpdateCertification();
    const queryclient = useQueryClient()

    const onSubmit = ({certificate_no,certificate_type,dob,full_name,image,issue_date,issuer,issuer_name,school_name,trainer_name,trainer_phone}: Certificate) => {
      
      if(type==="add"){
          handleCreate({
          certificate_no,certificate_type,
          dob:String(dob),
          full_name,image,issue_date:String(issue_date),issuer,issuer_name:String(issuer_name),
          lang:String(user?.data?.data?.profile_details?.language),school_name,trainer_name,trainer_phone
        }, {
              onSuccess: () => {
                  toast.success("Dive Certificate created successfully")
                  queryclient.invalidateQueries({queryKey:["user-details"]})
                  queryclient.invalidateQueries({queryKey:["fetch-certifications"]})
                  setIsOpenCardModal(false);
              },
              onError: (error) => {
                  const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                  openErrorModalWithMessage(String(errorMessage));
              },
          })

      }else{
  handleUpdate({
    id:String(certificateData?.id),
          certificate_no,certificate_type,
          dob:String(dob),
          full_name,image,issue_date:String(issue_date),issuer,issuer_name:String(issuer_name),
          lang:String(user?.data?.data?.profile_details?.language),school_name,trainer_name,trainer_phone
        }, {
              onSuccess: () => {
                  toast.success("Dive Certificate updated successfully")
                  queryclient.invalidateQueries({queryKey:["user-details"]})
                   queryclient.invalidateQueries({queryKey:["fetch-certifications"]})
                  setIsOpenCardModal(false);
              },
              onError: (error) => {
                  const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                  openErrorModalWithMessage(String(errorMessage));
              },
          })
      }
    };

 

    return (
        <>
        
        
                    <form action="" className='p-6 md:px-8 ' onSubmit={handleSubmit(onSubmit)}>
                        <div className="max-h-[70vh] space-y-6 overflow-y-auto">
                            <div className="max-h-[70vh] space-y-6 overflow-y-auto">
                                {/* Image Upload Section */}
                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 text-center ${dragOver ? "border-orange-500" : "border-gray-300"
                                        }`}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                >
                                    {imagePreview ? (
                                        <div className="relative inline-block">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-h-40 rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='flex flex-col items-center justify-center'>
                                         <div className="h-[2.5rem] w-[2.5rem] border-[0.375rem] border-[#F9FAFB] dark:border-gray-600 rounded-full flex justify-center items-center bg-[#F2F4F7] dark:bg-gray-600 mb-2">
                                                              <CloudIcon className="w-6 h-6 text-gray-400 dark:text-white" />
                                                            </div>
                                                             <label
                                                htmlFor="fileInput"
                                                className="mt-2 inline-block cursor-pointer px-3 py-1 text-orange-500  text-sm rounded-lg"
                                            >
                                             {t.upload}
                                            </label>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                               {t.dragDrop}
                                            </p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileInput}
                                                className="hidden"
                                                id="fileInput"
                                            />
                                           
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{t.issuer}</label>
                                <Controller
                                    name="issuer"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className={`border relative ${errors.issuer ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                                } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}>
                                                <SelectValue placeholder="Nitrox" />
                                                <div className="absolute right-4"><CaretDownIcon color='black' className='dark:hidden' /></div>

                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    CERTIFICATE_ISSUER_CHOICES?.map((mix, idx: number) => (
                                                        <SelectItem className='text-black uppercase' value={mix} key={idx}>{convertKebabAndSnakeToTitleCase(mix)}</SelectItem>

                                                    ))
                                                }

                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{t.certType}</label>
                                <Controller
                                    name="certificate_type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className={`border relative ${errors.certificate_type ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                                } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}>
                                                <SelectValue placeholder="Nitrox" />
                                                <div className="absolute right-4"><CaretDownIcon color='black' className='dark:hidden' /></div>

                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    CERTIFICATE_TYPE_CHOICES?.map((mix, idx: number) => (
                                                        <SelectItem className='text-black' value={mix} key={idx}>{convertKebabAndSnakeToTitleCase(mix)}</SelectItem>

                                                    ))
                                                }

                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>


                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-2 sm:gap-5">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
                                   {t.certNo}
                                </label>
                                <input
                                    {...register('certificate_no')}
                                    placeholder=""
                                    className={`border relative ${errors.certificate_no ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                        } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}
                                />
                                {errors.certificate_no && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                        {errors.certificate_no.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-2 sm:gap-5">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
                                    {t.certDate}
                                </label>
                                <input
                                    type='date'
                                    {...register('issue_date')}
                                    placeholder=""
                                    className={`border relative ${errors.issue_date ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                        } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}
                                />
                                {errors.issue_date && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                        {errors.issue_date.message}
                                    </p>
                                )}
                            </div>


                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-2 sm:gap-5">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
                                  {t.diverName}
                                </label>
                                <input
                                    {...register('full_name')}
                                    placeholder=""
                                    className={`border relative ${errors.full_name ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                        } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}
                                />
                                {errors.full_name && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                        {errors.full_name.message}
                                    </p>
                                )}
                            </div>



                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-2 sm:gap-5">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
                                   {t.dob}
                                </label>
                                <input
                                    type='date'
                                    {...register('dob')}
                                    placeholder=""
                                    className={`border relative ${errors.dob ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                        } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}
                                />
                                {errors.dob && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                        {errors.dob.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-2 sm:gap-5">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
                                   {t.school}
                                </label>
                                <input
                                    type='text'
                                    {...register('school_name')}
                                    placeholder=""
                                    className={`border relative ${errors.school_name ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                        } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}
                                />
                                {errors.school_name && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                        {errors.school_name.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-2 sm:gap-5">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
                                   {t.trainer}
                                </label>
                                <input
                                    type='text'
                                    {...register('trainer_name')}
                                    placeholder={``}
                                    className={`border relative ${errors.trainer_name ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                        } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}
                                />
                                {errors.trainer_name && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                        {errors.trainer_name.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-2 sm:gap-5">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
                                   {t.instructor}
                                </label>
                                <input
                                    type='text'
                                    {...register('trainer_phone')}
                                    placeholder=""
                                    className={`border relative ${errors.trainer_phone ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                        } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}
                                />
                                {errors.trainer_phone && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                        {errors.trainer_phone.message}
                                    </p>
                                )}
                            </div>

                        </div>

                        <div className="py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">

                            <Button
                            variant={"outlined"}
                                size={"lg"}
                                type="submit"
                                className="flex dark:border-white border-black  justify-center items-center gap-x-3 text-black hover:bg-orange-100 dark:text-white"
                            onClick={()=>setStep(1)}
                            >
                                {t.back}
                            </Button>
                            <Button
                                size={"lg"}
                                type="submit"
                                className="bg-orange-500 flex justify-center items-center gap-x-3 hover:bg-orange-600 text-white"
                            >
                                {t.proceed} {isLoading || isUpdating && <SmallSpinner color='#fff'/>}
                            </Button>
                        </div>
                    </form>
                
               <ErrorModal
                        isErrorModalOpen={isErrorModalOpen}
                        setErrorModalState={() => {
                            setErrorModalState(false);
                        }}
                        subheading={
                            errorModalMessage || "Please check your inputs and try again."
                        }
                    />
        </>
    )
}

export default AddCertification