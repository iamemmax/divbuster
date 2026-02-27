"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ErrorModal,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core";
import { CaretDown } from "@/components/icons";
import { useAuth } from "@/contexts/authentication";
import PersonalQRCode from "./PersonalQrcode";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { ConfirmSaveModal } from "@/app/(main)/components/shared/modal/ConfirmSave";
import { bodySizes, shoeSize, shoeValues } from "@/app/(main)/utils/ListTypes";
import { useUpdateUserProfile } from "../../api/settings/updateUserProfile";
import { useErrorModalState } from "@/hooks";
import { useQueryClient } from "react-query";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { SmallSpinner } from "@/icons/core";
import toast from "react-hot-toast";
import { Language } from "@/app/(auth)/sign-up/translations";
import { profileDetailsTranslations } from "@/app/(main)/translation/profileTranslation";

// Zod schema for form validation
const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female", "Other"]),
  height: z.string().min(1, "Height is required") || "",
  body_size: z.string().min(1, "Body size is required"),
  shoe_size: z.string().min(1, "Shoe size is required"),
  shoe_value: z.string().min(1, "Shoe value is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Profile Picture Section Component
interface ProfilePictureSectionProps {
  profileImage: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteAccount: () => void;
  language:Language
}


const ProfilePictureSection: React.FC<ProfilePictureSectionProps> = ({
  profileImage,
  onImageChange,
  language

}) => {
  const { authState } = useAuth();
  const { user } = authState;
  const userData = user;
        const t = profileDetailsTranslations[language] || profileDetailsTranslations?.en;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);

  const handleClose = () => setIsDeleteModalOpen(false)
  const handleDelete = () => {
    setShowConfirmSaveModal(true)
    setIsDeleting(false)

  }


  
  return (
    <div>
      <h3 className="md:text-lg  text-sm font-semibold text-gray-900 dark:text-white my-4">
       {t.profilePicture}
      </h3>
      <div className="flex flex-wrap  items-start  md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <Image
              src={profileImage}
              alt="Profile"
              width={80}
              height={80}
            />
          </div>
          <div className="">
            <label className="bg-orange-500 hover:bg-orange-600 max-xxscren:text-xxs text-white px-4  py-2 rounded-md  text-xs text-nowrap lg:text-sm font-medium cursor-pointer transition-colors">
              {t.changePicture}
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-200 hover:bg-gray-300 text-[#09090B] max-xxscren:text-xxs px-4 py-2 text-nowrap rounded-md text-xs lg:text-sm font-medium transition-colors"
          >
           {t.viewQRCode}
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-[#FEE4E2] hover:bg-red-200 text-[#FF0000] max-xxscren:text-xxs px-4 py-2 text-nowrap rounded-md text-xs lg:text-sm font-medium transition-colors"
          >
           {t.deleteAccount}
          </button>
        </div>
      </div>
      {isModalOpen && <PersonalQRCode isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userData={userData} />}

      {
        isDeleteModalOpen && <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleClose}
          onConfirm={handleDelete}
          loading={isDeleting}


        // setIsDeleting={setIsDeleting}
        />
      }
      {showConfirmSaveModal && (
        <ConfirmSaveModal
          isOpen={showConfirmSaveModal}
          onSave={() => {
            setShowConfirmSaveModal(false);
            handleClose();
          }}
          title={t.accountDeleted}
          description={t.accountDeletedDesc}
        />
      )}
    </div>

  )
}



// Profile Component

interface prop{
  language:Language
}
const ProfileSettings = ({language}:prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [selectedImage, setSelectedImage] = useState<File>()

  const { authState } = useAuth();
  const { user } = authState;
     const t = profileDetailsTranslations[language] || profileDetailsTranslations?.en;
  const [profileImage, setProfileImage] = useState(user?.profile_details?.profile_picture);
  const gender = ["Male", "Female", "Other"];
  const heights = ["0.7", "0.8", "0.9", "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4"]
  const queryClient = useQueryClient()

  
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      gender: "Male",
      height: String(user?.diver_profile?.height),
      body_size: String(user?.diver_profile?.body_size),
      shoe_size: String(user?.diver_profile?.shoe_size),
      shoe_value: String(user?.diver_profile?.shoe_value),
    },
  });
  const { mutate: handleUpdate, isLoading: isSubmitting } = useUpdateUserProfile()

  useEffect(() => {
    if(user){
      setValue("height", user?.diver_profile?.height)
      setValue("shoe_size", user?.diver_profile?.shoe_size)
      setValue("shoe_size", user?.diver_profile?.shoe_size)
    }
  }, [user])
  const onSubmit = async (data: ProfileFormData) => {
    const payload = {
      ...data,
      profile_picture: selectedImage as File

    }

    handleUpdate({
      data: payload,

    }, {
      onSuccess: () => {
        toast.success("Profile updated successfully")
        queryClient.invalidateQueries({ queryKey: ["user-details"] })



      }, onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      },
    })

  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = ""
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
       t.deleteConfirm
      )
    ) {
      alert("Account deletion requested");
    }
  };

  return (
    <div className="">
      <div className="">
        {/* Profile Form */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm px-4 lg:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Picture Section */}
            <ProfilePictureSection
              profileImage={profileImage as string}
              onImageChange={handleImageChange}
              onDeleteAccount={handleDeleteAccount}
              language={language}
            />

            {/* Profile Name Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
               {t.profileName}
              </h3>
              <div className="bg-[#FDFDFC] dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 max-w-5xl 2xl:pr-12 rounded-10 p-2 md:p-5 lg:p-10">
                {/* Full Name */}
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr] py-4 items-center gap-2 ">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   {t.fullName}
                  </label>
                  <div className="grid max-xxscren:grid-cols-1 grid-cols-2 gap-5 w-full ">
                    <div className="w-full">
                      <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-4 py-3 border text-xs md:text-sm ${errors?.first_name
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                              } rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                            placeholder="Enter first name"
                          />
                        )}
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-4 py-3 border text-xs md:text-sm ${errors?.last_name
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                              } rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                            placeholder="Enter last name"
                          />
                        )}
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr] border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.emailAddress}
                  </label>
                  <div>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className={`border ${errors.email
                              ? "border-red-500"
                              : "border-[#E2E8F0] dark:border-gray-600"
                            } outline-none py-[.8125rem] w-full text-black dark:text-gray-100 flex-1 text-xs md:text-sm bg-white dark:bg-gray-700 font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          placeholder={t.emailPlaceholder}
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr] text-xs md:text-sm border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   {t.gender}
                  </label>
                  <div className="">
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger
                            className={`border relative ${errors.gender
                                ? "border-red-500"
                                : "border-[#E2E8F0] dark:border-gray-600"
                              } outline-none py-[.8125rem] w-full text-black dark:text-gray-100 flex-1 text-xs md:text-sm bg-white dark:bg-gray-700 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder={t.selectGender} />
                            <div className="absolute right-4">
                              <CaretDown className="dark:hidden" color="currentColor" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                            {gender?.map((x, idx: number) => (
                              <SelectItem value={x} key={idx}>
                                {x}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>




                {/* Height */}
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr] text-xs md:text-sm border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   {t.height}
                  </label>
                  <div className="">
                    <Controller
                      name="height"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger
                            className={`border relative ${errors.height
                                ? "border-red-500"
                                : "border-[#E2E8F0] dark:border-gray-600"
                              } outline-none py-[.8125rem] w-full text-black dark:text-gray-100 flex-1 text-xs md:text-sm bg-white dark:bg-gray-700 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder={t.selectHeight} />
                            <div className="absolute right-4">
                              <CaretDown className="dark:hidden" color="currentColor" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                            {heights?.map((x, idx: number) => (
                              <SelectItem value={x} key={idx}>
                                {x}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.height && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.height.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* body-size */}
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr] text-xs md:text-sm border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.bodySize}
                  </label>
                  <div className="">
                    <Controller
                      name="body_size"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger
                            className={`border relative ${errors.height
                                ? "border-red-500"
                                : "border-[#E2E8F0] dark:border-gray-600"
                              } outline-none py-[.8125rem] w-full text-black dark:text-gray-100 flex-1 text-xs md:text-sm bg-white dark:bg-gray-700 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder={t.selectBodySize} />
                            <div className="absolute right-4">
                              <CaretDown className="dark:hidden" color="currentColor" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                            {bodySizes?.map((x, idx: number) => (
                              <SelectItem value={x} key={idx}>
                                {x}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.height && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.height.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Shoe Value */}
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr] text-xs md:text-sm border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   {t.shoeValue}
                  </label>
                  <div className="">
                    <Controller
                      name="shoe_value"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger
                            className={`border relative ${errors.shoe_value
                                ? "border-red-500"
                                : "border-[#E2E8F0] dark:border-gray-600"
                              } outline-none py-[.8125rem] w-full text-black dark:text-gray-100 flex-1 text-xs md:text-sm bg-white dark:bg-gray-700 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder={t.selectShoeValue} />
                            <div className="absolute right-4">
                              <CaretDown className="dark:hidden" color="currentColor" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                            {shoeValues?.map((x, idx: number) => (
                              <SelectItem value={x} key={idx}>
                                {x}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.shoe_value && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shoe_value.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr] text-xs md:text-sm border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   {t.shoeSize}
                  </label>
                  <div className="">
                    <Controller
                      name="shoe_size"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger
                            className={`border relative ${errors.shoe_size
                                ? "border-red-500"
                                : "border-[#E2E8F0] dark:border-gray-600"
                              } outline-none py-[.8125rem] w-full text-black dark:text-gray-100 flex-1 text-xs md:text-sm bg-white dark:bg-gray-700 font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder={t.selectShoeSize} />
                            <div className="absolute right-4">
                              <CaretDown className="dark:hidden" color="currentColor" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                            {shoeSize?.map((x, idx: number) => (
                              <SelectItem value={x} key={idx}>
                                {x}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.shoe_size && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shoe_size.message}
                      </p>
                    )}
                  </div>
                </div>


              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end max-w-5xl ">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 flex justify-center items-center gap-x-3 text-white px-8 py-3 rounded-md font-medium transition-colors dark:bg-orange-600 dark:hover:bg-orange-700 dark:disabled:bg-orange-400"
              >
                {t.saveChanges} {isSubmitting && <SmallSpinner color="#fff" />}
              </button>
            </div>
          </form>

          {/* <FooterLinks /> */}
        </div>
      </div>
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      />
    </div>

  );
};

export default ProfileSettings;
