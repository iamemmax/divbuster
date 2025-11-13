"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "@/contexts/authentication";
import BasicInfoForm from './components/BasicInfoForm';
import AccountDetailsForm from './components/AccountDetailsForm';
import DiveProfileForm from './components/DiveProfileForm';
import AccountTypeForm from './components/AccountTypeForm';
import ProfilePictureForm from './components/ProfilePictureForm';
import { LanguageProvider } from "./contexts/LanguageContext";

import FullPageLoader from "@/app/(main)/loading";
import { firstStepProps, fourthStepProps, secondStepProps, thirdStepProps } from './components';
import AccountTypeSelectionForm from './components/AccountTypeSelectionForm';
import EmailVerificationForm from './components/EmailVerificationForm';
// import MFAVerificationForm from './components/MFAVerificationForm';

// Define the steps of the signup process
type SignupStep = 
  | 'basic-info'
  | 'account-details'
  | 'dive-profile'
  | 'measurement'
  | 'account-type'
  | 'profile-picture'
  | 'email-verification'
  // | 'mfa-verification';

// Fast and snappy animation variants
const stepVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 150 : -150, // Minimal distance
    opacity: 0,
    scale: 0.99, // Very subtle scaling
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200, // High stiffness for fast motion
      damping: 25,    // Quick settling
      duration: 0.25, // Very short duration
      opacity: { 
        duration: 0.2,
        ease: "easeOut"
      }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 150 : -150,
    opacity: 0,
    scale: 0.99,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 30,
      duration: 0.2, // Very fast exit
      opacity: { 
        duration: 0.15,
        ease: "easeIn"
      }
    }
  })
};

// Minimal container animation
const containerVariants = {
  initial: { 
    opacity: 0
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.2, // Very fast
      ease: "easeOut",
      when: "beforeChildren"
    }
  }
};

// Faster stagger animation
const staggerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.03, // Much faster stagger
      delayChildren: 0.05    // Minimal delay
    }
  }
};



const SignupPage = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [currentStep, setCurrentStep] = useState<SignupStep>('basic-info');
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // Prevent multiple transitions
  const [stepOneData, setStepOneData] = useState<firstStepProps>({lang: '' })
  const [stepTwoData, setStepTwoData] = useState<secondStepProps>({  first_name: '',last_name: '',email: '' })
  const [stepThreeData, setStepThreeData] = useState<thirdStepProps>({
    phone_number: '',
    confirm_password: '',
    password: '',
    nickname: '',
    dob: '',
  })
  const [stepFourData, setStepFourData] = useState<fourthStepProps>({
    unit_of_measure: '',
    temperature: '',
    body_size: '',
    shoe_size: '',
    country: '',
 
  })
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    // Basic info
    first_name: '',
    last_name: '',
    email: '',
    
    // Account details
    phone_number: '',
    password: '',
    confirm_password: '',
    nickname: '',
    dob: '',
    language: '',
    
    // Dive profile
    unit_of_measure: '',
    temperature: '',
    body_size: '',
    shoe_size: '',
    country: '',
    
    // Account type
    diver_type: 'scuba',
    account_type: 'recreative',
    
    // Profile picture
    profile_picture: null as File | null,
    
    // Verification
    verification_code: '',
    mfa_code: ''
  });

  // Step order for navigation logic
  const stepOrder: SignupStep[] = [
    'basic-info',
    'account-details',
    'dive-profile',
    'measurement',
    'account-type',
    'profile-picture',
    'email-verification',
    // 'mfa-verification'
  ];

  // Get step index for direction calculation
  const getStepIndex = (step: SignupStep) => stepOrder.indexOf(step);

  // Check if user is already authenticated
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Slightly longer to ensure stability
    
    return () => clearTimeout(timer);
  }, []);

  // Prevent authenticated users from accessing signup
  useEffect(() => {
    if (!isLoading && authState.isAuthenticated) {
      console.log("User already authenticated, redirecting to home");
      router.push('/');
    }
  }, [authState.isAuthenticated, isLoading, router]);

  // Handle form data updates from child components
  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Fast navigation with minimal transition guards
  const goToNextStep = () => {
    if (isTransitioning) return; // Prevent multiple rapid transitions
    
    const currentIndex = getStepIndex(currentStep);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < stepOrder.length) {
      setIsTransitioning(true);
      setDirection(1);
      setCurrentStep(stepOrder[nextIndex]);
      
      // Reset transition guard quickly
      setTimeout(() => setIsTransitioning(false), 250);
    } else {
      handleFinalSubmit();
    }
  };

  const goToPreviousStep = () => {
    if (isTransitioning) return; // Prevent multiple rapid transitions
    
    const currentIndex = getStepIndex(currentStep);
    const prevIndex = currentIndex - 1;
    
    if (prevIndex >= 0) {
      setIsTransitioning(true);
      setDirection(-1);
      setCurrentStep(stepOrder[prevIndex]);
      
      // Reset transition guard quickly
      setTimeout(() => setIsTransitioning(false), 250);
    }
  };

  // Handle final form submission
  const handleFinalSubmit = async () => {
    try {
      console.log('Submitting form data:', formData);
      router.push('/login');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Show loading state
  if (isLoading) {
    return <FullPageLoader />;
  }

  const renderCurrentStep = () => {
    const stepComponents = {
      'basic-info': (
        <BasicInfoForm 
          stepOneData={stepOneData} 
          setStepOneData={setStepOneData} 
          onNext={goToNextStep} 
        />
      ),
      'account-details': (
        <AccountDetailsForm 
          stepTwoData={stepTwoData} 
          setStepTwoData={setStepTwoData} 
          onNext={goToNextStep} 
          onBack={goToPreviousStep}
        />
      ),
      'dive-profile': (
        <DiveProfileForm 
          stepThreeData={stepThreeData} 
          setStepThreeData={setStepThreeData} 
          onNext={goToNextStep} 
          onBack={goToPreviousStep}
        />
      ),
      'measurement': (
        <AccountTypeForm 
          stepFourData={stepFourData} 
          setStepFourData={setStepFourData} 
          onNext={goToNextStep} 
          onBack={goToPreviousStep}
        />
      ),
      'account-type': (
        <AccountTypeSelectionForm 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={goToNextStep} 
          onBack={goToPreviousStep}
        />
      ),
      'profile-picture': (
        <ProfilePictureForm 
          formData={formData}
          stepOneData={stepOneData}
          stepTwoData={stepTwoData}
          stepThreeData={stepThreeData}
          stepFourData={stepFourData}
          updateFormData={updateFormData}
          onNext={goToNextStep}
          onBack={goToPreviousStep}
        />
      ),
      'email-verification': (
        <div className="w-full">
          <EmailVerificationForm
            email={stepTwoData?.email}
            lang={stepOneData?.lang}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        </div>
      )
    };

    return stepComponents[currentStep] || <div>Unknown step</div>;
  };

  return (
    <LanguageProvider>
      <motion.div 
        className="flex flex-col lg:flex-row w-full items-center h-screen justify-center overflow-hidden"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Main content area - fast transitions */}
        <div className="w-full max-w-4xl flex items-center justify-center px-4">
          <AnimatePresence 
            mode="wait" 
            custom={direction} 
            initial={false}
          >
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex justify-center items-center"
            >
              <motion.div
                variants={staggerVariants}
                initial="initial"
                animate="animate"
                className="w-full"
              >
                {renderCurrentStep()}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </LanguageProvider>
  );
};

export default SignupPage;