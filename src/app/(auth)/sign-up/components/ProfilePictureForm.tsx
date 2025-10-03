import React, { useState, useRef } from "react";
import { Button, ErrorModal } from "@/components/core";
import { firstStepProps, fourthStepProps, secondStepProps, thirdStepProps } from ".";
import { useSignup, SignupPayload } from "@/app/(auth)/api/signup";
import { useRouter } from "next/navigation";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "../translations";

type ProfilePictureFormProps = {
  formData: any;
  stepOneData: firstStepProps;
  stepTwoData: secondStepProps;
  stepThreeData: thirdStepProps;
  stepFourData: fourthStepProps;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

const ProfilePictureForm = ({
  formData,
  stepOneData,
  stepTwoData,
  stepThreeData,
  stepFourData,
  updateFormData,
  onNext,
  onBack,
}: ProfilePictureFormProps) => {
   const {
          isErrorModalOpen,
          setErrorModalState,
          openErrorModalWithMessage,
          errorModalMessage,
        } = useErrorModalState();
  const { language } = useLanguage();
    const t = translations[language] || translations.en;
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
  const [profilePicture, setProfilePicture] = useState<File | null>(formData.profile_picture || null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  // Use the signup mutation
  const { mutate: signupMutate, isLoading, isError, error } = useSignup();
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      updateFormData({ profile_picture: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = ""; // Reset input value to allow selecting the same file again
  };
  
  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setProfilePicture(file);
      updateFormData({ profile_picture: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the payload according to the API requirements
    const payload: SignupPayload = {
      first_name: stepTwoData.first_name,
      last_name: stepTwoData.last_name,
      password: stepThreeData.password,
      phone_number: stepThreeData.phone_number,
      nickname: stepThreeData.nickname,
      email: stepTwoData.email,
      lang: stepOneData.lang || "en",
      dob: stepThreeData.dob,
      profile_picture: profilePicture,
      account_type: formData.account_type || "scuba",
      referral_code: formData.referral_code || "",
      body_size: stepFourData.body_size,
      // height: formData.height || "",
      measurement_unit: stepFourData.unit_of_measure,
      temp_choice: stepFourData.temperature,
      shoe_size: stepFourData.shoe_size,
      shoe_value: formData.shoe_value || 0,
      diver_type: formData.diver_type || "scuba",
      country_id: parseInt(stepFourData.country) || 0,
      actionType:"withImg"
    };

    console.log("Submitting registration data:", payload);
    
    // Use React Query mutation to submit the form
    signupMutate(payload, {
      onSuccess: (data) => {
        setSuccessMessage(data?.message);
        setTimeout(() => {
          onNext();
          
        }, 1500);
      },
      onError: (error) => {
       const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                   openErrorModalWithMessage(String(errorMessage));
       
      }
    });
  };
  
  // Handle skip
  const handleSkip = () => {
    updateFormData({ profile_picture: null });
   const payload: SignupPayload = {
      first_name: stepTwoData.first_name,
      last_name: stepTwoData.last_name,
      password: stepThreeData.password,
      phone_number: stepThreeData.phone_number,
      nickname: stepThreeData.nickname,
      email: stepTwoData.email,
      lang: stepOneData.lang || "en",
      dob: stepThreeData.dob,
      profile_picture: profilePicture,
      account_type: formData.account_type || "scuba",
      referral_code: formData.referral_code || "",
      body_size: stepFourData.body_size,
      // height: formData.height || "",
      measurement_unit: stepFourData.unit_of_measure,
      temp_choice: stepFourData.temperature,
      shoe_size: stepFourData.shoe_size,
      shoe_value: formData.shoe_value || 0,
      diver_type: formData.diver_type || "scuba",
      country_id: parseInt(stepFourData.country) || 0,
      actionType:"skip"
    };

    console.log("Submitting registration data:", payload);
    
    // Use React Query mutation to submit the form
    signupMutate(payload, {
      onSuccess: (data) => {
        setSuccessMessage(data?.message);
        setTimeout(() => {
          onNext();
          
        }, 1500);
      },
      onError: (error) => {
       const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                   openErrorModalWithMessage(String(errorMessage));
       
      }
    });
  };

  return (
    <div className="xl:px-[9.125rem] w-full md:px-[30px] px-6 py-[30px] xl:py-[7rem]">
      <div className="flex justify-center items-center flex-col">
        <h2 className="font-archivo text-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39]">
          {t.profilePicture.title}
        </h2>
        <p className="font-archivo text-[#8D9196] font-medium text-xs 2xl:text-base">
          {t.profilePicture.subtitle}
        </p>
      </div>
      
      {isError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error instanceof Error ? error.message : 'Failed to sign up. Please try again.'}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mt-[3.125rem]">
        <div 
          className="border border-dashed border-gray-300 rounded-lg p-8 mb-6 flex flex-col items-center justify-center cursor-pointer"
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <div className="mb-4 relative">
              <img 
                src={previewUrl} 
                alt="Profile preview" 
                className="w-24 h-24 rounded-full object-cover"
              />
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setProfilePicture(null);
                  setPreviewUrl(null);
                  updateFormData({ profile_picture: null });
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-full p-3 mb-4">
              <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8326 12.3334L10.4992 9.00003M10.4992 9.00003L7.1659 12.3334M10.4992 9.00003V16.5M17.4909 14.325C18.3037 13.8819 18.9458 13.1808 19.3158 12.3322C19.6858 11.4837 19.7627 10.5361 19.5344 9.63894C19.3061 8.74182 18.7855 7.94629 18.0548 7.3779C17.3241 6.80951 16.425 6.50064 15.4992 6.50003H14.4492C14.197 5.5244 13.7269 4.61864 13.0742 3.85085C12.4215 3.08307 11.6033 2.47324 10.681 2.0672C9.7587 1.66116 8.75636 1.46949 7.74933 1.5066C6.7423 1.5437 5.75679 1.80861 4.86688 2.28142C3.97697 2.75422 3.20583 3.42261 2.61142 4.23635C2.01701 5.05008 1.61481 5.98797 1.43505 6.97952C1.25529 7.97107 1.30266 8.99047 1.57358 9.96108C1.8445 10.9317 2.33194 11.8282 2.99923 12.5834" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
            className="hidden"
          />
          
          <p className="text-xs">
            <span className="text-[#F7931D] text-xs font-medium">{t.profilePicture.uploadText}</span> {t.profilePicture.dragDropText}
          </p>
          <p className="text-gray-500 text-xs mt-1">{t.profilePicture.fileTypeText}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={onBack}
              className="bg-white w-full md:flex-1 border max-sm:px-3 border-[#F7931D] text-[#F7931D] py-3 rounded-lg font-medium"
            >
              {t.profilePicture.backButton}
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="md:flex-1 w-full bg-[#F7931D] max-sm:px-3 text-white py-3 rounded-lg font-medium"
            >
              {isLoading ? "Submitting..." : t.profilePicture.submitButton}
            </Button>
          </div>
          
          <Button
            type="button"
            onClick={handleSkip}
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium"
          >
            {t.profilePicture.skipButton}
          </Button>
        </div>
      </form>

       <ErrorModal
                            isErrorModalOpen={isErrorModalOpen}
                            setErrorModalState={() => {
                              setErrorModalState(false);
                            }}
                            subheading={
                              errorModalMessage ||
                              "Please check your inputs and try again."
                            }
                          ></ErrorModal>
    </div>
  );
};

export default ProfilePictureForm;


