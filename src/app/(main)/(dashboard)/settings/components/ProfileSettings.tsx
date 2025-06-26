import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/core";
import { CaretDown } from "@/components/icons";
import AngleRight from "@/app/icons/(dashboard)/AngleRight";
import { useAuth, User } from "@/contexts/authentication";
import PersonalQRCode from "./PersonalQrcode";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { ConfirmSaveModal } from "@/app/(main)/components/shared/modal/ConfirmSave";

// Zod schema for form validation
const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female", "Other"]),
  bio: z.string().optional(),
  weight: z.string().min(1, "Weight is required"),
  height: z.string().min(1, "Height is required"),
  body_size: z.string().min(1, "Body size is required"),
  shoe_size: z.string().min(1, "Shoe size is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Profile Picture Section Component
interface ProfilePictureSectionProps {
  profileImage: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteAccount: () => void;
}


const ProfilePictureSection: React.FC<ProfilePictureSectionProps> = ({
  profileImage,
  onImageChange,
  
}) => {
      const { authState } = useAuth();
        const { user} = authState;
         const userData = user as User;
  
  const [isModalOpen, setIsModalOpen] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
      const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);

     const handleClose = ()=>setIsDeleteModalOpen(false)
     const handleDelete = ()=>{
      setShowConfirmSaveModal(true)
      setIsDeleting(false)
    
    }
  return (
  <div>
    <h3 className="md:text-lg x text-sm font-semibold text-gray-900 my-4">
      Profile picture
    </h3>
    <div className="flex flex-wrap  items-start  md:items-center gap-4">
      <div className="flex items-center gap-3">
      <div className="relative shrink-0">
        <img
          src={profileImage}
          alt="Profile"
          className="w-12 h-12 md:w-20 md:h-20 shrink-0 rounded-full object-cover border-1 border-gray-200"
        />
      </div>
<div className="">
   <label className="bg-orange-500 hover:bg-orange-600 max-xxscren:text-xxs text-white px-4  py-2 rounded-md  text-xs text-nowrap lg:text-sm font-medium cursor-pointer transition-colors">
          Change picture
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
          onClick={()=>setIsModalOpen(true)}
          className="bg-gray-200 hover:bg-gray-300 text-[#09090B] max-xxscren:text-xxs px-4 py-2 text-nowrap rounded-md text-xs lg:text-sm font-medium transition-colors"
        >
          View Personal QR Code
        </button>
        <button
          type="button"
          onClick={()=>setIsDeleteModalOpen(true)}
          className="bg-[#FEE4E2] hover:bg-red-200 text-[#FF0000] max-xxscren:text-xxs px-4 py-2 text-nowrap rounded-md text-xs lg:text-sm font-medium transition-colors"
        >
          Delete Account
        </button>
      </div>
    </div>
     {isModalOpen&& <PersonalQRCode isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userData={userData}/>}

     {
      isDeleteModalOpen &&  <DeleteConfirmationModal
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
            title="Account Deleted"
            description="You have successfully deleted your account. You will be redirected to our official page in a minute."
          />
        )}
  </div>

  )
}
  

// Footer Links Component
const FooterLinks = () => (
  <div className="mt-12 space-y-4 max-w-5xl">
    <button className="flex items-center py-4 px-5 rounded-10 justify-between  text-xs w-full text-left text-[#333333] border border-[#EBEBEB] hover:text-gray-900 transition-colors">
      <span>Terms of Use & Privacy Policy</span>
      <AngleRight/>
    </button>
    <button className="flex items-center py-4 px-5 rounded-10 justify-between text-xs  w-full text-left text-[#333333] border border-[#EBEBEB] hover:text-gray-900 transition-colors">
      <span>FAQs (Frequently Asked Questions)</span>
       <AngleRight/>
    </button>
  </div>
);

// Profile Component
const ProfileSettings = () => {
  
  const { authState } = useAuth();
   const { user} = authState;
  const [profileImage, setProfileImage] = useState(user?.profile_details?.profile_picture);
  const gender = ["Male", "Female", "Other"]; 
  
    

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      gender: "Male",
      bio: "",
      weight: "",
      height: String(user?.diver_profile?.height),
      body_size:String(user?.diver_profile?.body_size),
      shoe_size: String(user?.diver_profile?.shoe_size),
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    alert("Profile updated successfully!");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Account deletion requested");
    }
  };

  return (
    <div className="">
      <div className="">
        {/* Profile Form */}
        <div className="bg-white rounded-lg shadow-sm px-4 lg:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Picture Section */}
            <ProfilePictureSection
              profileImage={profileImage as string}
              onImageChange={handleImageChange}
              onDeleteAccount={handleDeleteAccount}
            />

            {/* Profile Name Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Profile name
              </h3>
              <div className="bg-[#FDFDFC] border border-[#EBEBEB] max-w-5xl 2xl:pr-12 rounded-10 p-2 md:p-5 lg:p-10">
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr] py-4 items-center gap-2 ">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
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
                            className={`w-full px-4 py-3 border text-xs md:text-sm ${errors?.first_name ? "border-red-500" : "border-gray-300"} rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="Enter first_name"
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
                            className={`w-full px-4 py-3 border text-xs md:text-sm ${errors?.last_name ? "border-red-500" : "border-gray-300"} rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="Enter last_name"
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

                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr]  border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className={`border ${
                            errors.email ? "border-red-500" : "border-[#E2E8F0]"
                          } outline-none py-[.8125rem] w-full text-black  flex-1 text-xs md:text-sm bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          placeholder="Enter email address"
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
                
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr] text-xs md:text-sm  border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                  </label>
                  <div className="">
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`border relative ${
                              errors.gender
                                ? "border-red-500"
                                : "border-[#E2E8F0]"
                            } outline-none py-[.8125rem] w-full text-black  flex-1 text-xs md:text-sm bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder="Select Date" />
                            <div className="absolute right-4">
                              <CaretDown color="black" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
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

                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr]   border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Bio
                  </label>
                  <div>
                    <Controller
                      name="bio"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className={`border ${
                            errors.bio ? "border-red-500" : "border-[#E2E8F0]"
                          } outline-none py-[.8125rem] w-full text-black  flex-1 text-xs md:text-sm bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          placeholder="Add your Bio (Optional)"
                        />
                      )}
                    />
                    {errors.bio && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.bio.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr]  border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight
                  </label>
                  <div>
                    <Controller
                      name="weight"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className={`border ${
                            errors.weight ? "border-red-500" : "border-[#E2E8F0]"
                          } outline-none py-[.8125rem] w-full text-black text-xs md:text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          placeholder="70kg"
                        />
                      )}
                    />
                    {errors.weight && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.weight.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr]  border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height
                  </label>
                  <div>
                    <Controller
                      name="height"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className={`border ${
                            errors.height ? "border-red-500" : "border-[#E2E8F0]"
                          } outline-none py-[.8125rem] w-full text-blacktext-xs md:text-smflex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          placeholder="70m"
                        />
                      )}
                    />
                    {errors.height && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.height.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid max-xxscren:grid-cols-2 md:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_6fr]  border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Body size
                  </label>
                  <div>
                    <Controller
                      name="body_size"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className={`border ${
                            errors.body_size ? "border-red-500" : "border-[#E2E8F0]"
                          } outline-none py-[.8125rem] w-full text-black text-xs md:text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          placeholder="70kg"
                        />
                      )}
                    />
                    {errors.body_size && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.body_size.message}
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
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-8 py-3 rounded-md font-medium transition-colors"
              >
                {isSubmitting ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>

          <FooterLinks />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
