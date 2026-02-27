import React, { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Button, ErrorModal, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core";
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Certificate, CERTIFICATE_ISSUER_CHOICES, CERTIFICATE_TYPE_CHOICES, certificateSchema } from '.';
import CaretDownIcon from '@/icons/core/CaretDown';
import {  formatAxiosErrorMessage } from '@/utils';
import CloudIcon from '@/app/icons/(dashboard)/CloudIcon';
import { useErrorModalState } from '@/hooks';
import { useAddCertification } from '../../(dashboard)/api/certifications/addCertification';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@/app/(auth)/api/getAuthenticatedUser';
import { SmallSpinner } from '@/icons/core';
import {  useQueryClient } from 'react-query';
import { certificateResult } from '../../(dashboard)/api/certifications/fetchCertifications';
import { useUpdateCertification } from '../../(dashboard)/api/certifications/editCertification';
import { convertKebabAndSnakeToTitleCase } from '@/utils/strings';
import { useLanguage } from '@/hooks/useLanguage';
import { addCertificationFormtranslations } from '../../translation/certificationTranslation';
import { useFetchDiveSchools } from '../../(dashboard)/api/bookings/fetchDivingSchools';
import { Search, ChevronDown } from 'lucide-react';
interface Props {
    setIsOpenCardModal: React.Dispatch<React.SetStateAction<boolean>>;
    certificateData: certificateResult | undefined
    type:string;
    setStep: React.Dispatch<React.SetStateAction<number>>
    selectedCard: string | null
}


const AddCertification = ({ setIsOpenCardModal,certificateData,type,selectedCard }: Props) => {
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

    // Dive school dropdown state
    const [searchQuery, setSearchQuery] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedSchool, setSelectedSchool] = useState<any>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const { data: diveSchoolsData, isLoading: isLoadingSchools, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchDiveSchools(undefined, searchQuery)
    const {
  register,
  handleSubmit,
  control,
  setValue,
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
    default: false,
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

// Initialize selected school from certificateData
useEffect(() => {
  if (certificateData?.school_name) {
    setSelectedSchool({ name: certificateData.school_name })
  }
}, [certificateData])

// Handle infinite scroll for dive schools
const handleScroll = useCallback(() => {
  if (!scrollContainerRef.current) return

  const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
  const isNearBottom = scrollHeight - scrollTop - clientHeight < 100

  if (isNearBottom && hasNextPage && !isFetchingNextPage) {
    fetchNextPage()
  }
}, [hasNextPage, isFetchingNextPage, fetchNextPage])

// Close dropdown when clicking outside
React.useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)
}, [])

// Get all schools from all pages
const allSchools = React.useMemo(() => {
  return diveSchoolsData?.pages?.flatMap(page => page.results) || []
}, [diveSchoolsData])

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

    const onSubmit = ({certificate_no,certificate_type,dob,full_name,image,issue_date,issuer,issuer_name,school_name,trainer_name,trainer_phone,default: isDefault}: Certificate) => {

      if(type==="add"){
          handleCreate({
          certificate_no,certificate_type,
          dob:String(dob),
          full_name,image,issue_date:String(issue_date),issuer,issuer_name:String(issuer_name),
          lang:String(user?.data?.data?.profile_details?.language),school_name,trainer_name,trainer_phone,
          default: isDefault
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
          lang:String(user?.data?.data?.profile_details?.language),school_name,trainer_name,trainer_phone,
          default: Boolean(isDefault)
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
                                            <Image
                                                src={imagePreview}
                                                alt="Preview"
                                                width={160}
                                                height={160}
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
                                    type="text"
                                    inputMode="numeric"
                                    {...register('certificate_no')}
                                    placeholder=""
                                    maxLength={11}
                                    onKeyDown={(e) => {
                                      if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                                        e.preventDefault()
                                      }
                                    }}
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
                                <div ref={dropdownRef} className="relative">
                                  {/* Search Input */}
                                  <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                      <Search size={18} />
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="Search dive schools..."
                                      value={isDropdownOpen ? searchQuery : (selectedSchool?.name || '')}
                                      onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setIsDropdownOpen(true)
                                      }}
                                      onFocus={() => setIsDropdownOpen(true)}
                                      className={`border relative ${errors.school_name ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                        } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg pl-10 pr-10 focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                      <ChevronDown size={18} />
                                    </div>
                                  </div>

                                  {/* Dropdown Menu */}
                                  {isDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
                                      {/* Loading State */}
                                      {isLoadingSchools && allSchools.length === 0 ? (
                                        <div className="p-4 text-center">
                                          <div className="inline-block">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                                          </div>
                                        </div>
                                      ) : allSchools.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                          No dive schools found
                                        </div>
                                      ) : (
                                        <div
                                          ref={scrollContainerRef}
                                          onScroll={handleScroll}
                                          className="max-h-64 overflow-y-auto"
                                        >
                                          {allSchools.map((school: any) => (
                                            <button
                                              key={school.id}
                                              type="button"
                                              onClick={() => {
                                                setSelectedSchool(school)
                                                setValue('school_name', school.name)
                                                setIsDropdownOpen(false)
                                                setSearchQuery('')
                                              }}
                                              className={`w-full text-left px-4 py-3 border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors ${
                                                selectedSchool?.id === school.id
                                                  ? 'bg-orange-50 dark:bg-orange-900/20 border-l-4 border-l-orange-500'
                                                  : ''
                                              }`}
                                            >
                                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {school.name}
                                              </p>
                                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {school.address}
                                              </p>
                                              {school.contact_info && (
                                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                                  {school.contact_info}
                                                </p>
                                              )}
                                            </button>
                                          ))}
                                          {/* Loading spinner when fetching more schools */}
                                          {isFetchingNextPage && (
                                            <div className="p-4 text-center">
                                              <div className="inline-block">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
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
                                    inputMode="numeric"
                                    {...register('trainer_phone')}
                                    placeholder=""
                                    maxLength={11}
                                    onKeyDown={(e) => {
                                      if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                                        e.preventDefault()
                                      }
                                    }}
                                    className={`border relative ${errors.trainer_phone ? "border-red-500 dark:border-red-400" : "border-[#E2E8F0] dark:border-gray-600"
                                        } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-800 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 dark:focus:ring-[#F7931D]/30 transition-colors`}
                                />
                                {errors.trainer_phone && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                        {errors.trainer_phone.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-2 sm:gap-5">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
                                    Set as Default
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        {...register('default')}
                                        className="w-4 h-4 text-orange-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-500 cursor-pointer"
                                    />
                                    <label className="ml-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                                        Make this your default certificate
                                    </label>
                                </div>
                            </div>

                        </div>

                        <div className="py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">

                            {/* <Button
                            variant={"outlined"}
                                size={"lg"}
                                type="submit"
                                className="flex dark:border-white border-black  justify-center items-center gap-x-3 text-black hover:bg-orange-100 dark:text-white"
                            onClick={()=>setStep(1)}
                            >
                                {t.back}
                            </Button> */}
                            <Button
                            disabled={isLoading || isUpdating}
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