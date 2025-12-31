import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, ErrorModal, } from '@/components/core';
// import { useLanguage } from '../contexts/LanguageContext';
import MFAVerificationForm from './MFAVerificationForm';
import DiveBusterBlackLogo from '@/components/icons/DiveBusterBlackLogo';
import { useVerifyEmail } from '../../api/verification/verifyEmail';
import { useRouter } from 'next/navigation';
import { SmallSpinner } from '@/icons/core';
import { useResendVerifyEmail } from '../../api/verification/resendVerification';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { ErrorAlert } from '@/components/core/ErrorAlert';
import { useErrorModalState } from '@/hooks';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '../translations';

// Validation schema
const verificationSchema = z.object({
  token: z.string().min(5, 'Verification code is required')
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

interface EmailVerificationFormProps {
  lang: string;
  email: string;
  onNext: () => void;
  onBack: () => void;
}

const EmailVerificationForm = ({ email, lang }: EmailVerificationFormProps) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { language } = useLanguage();
  const t = translations[language] || translations.en
  const [activeTab, setActiveTab] = useState<'email' | 'qr'>('email');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      token: '',
    },
  });

  const { mutate: verifyEmail, isLoading: isVerifying } = useVerifyEmail();
  const { mutate: resendverifyEmail, isLoading: isResending } = useResendVerifyEmail();

  const onSubmit = async (data: VerificationFormValues) => {
    // Clear any previous error messages
    setErrorMessage(null);

    verifyEmail({ email, token: data?.token, lang }, {
      onSuccess: (data) => {
        setSuccessMessage(data?.message);
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      }
    });
  };

  const handleResend = async () => {
    // Clear any previous error messages
    setErrorMessage(null);

    resendverifyEmail({
      email,
      lang
    }, {
      onSuccess: (data) => {
        
        setSuccessMessage(data?.detail);
        setTimeout(() => setSuccessMessage(null), 3000);
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      }
    });
  };

  return (
    <div className="xl:px-[9.125rem] w-full md:px-[30px] h-full px-6 py-[30px] xl:py-[7rem]">
      {activeTab === 'email' && <>
        {/* {errorMessage && (
        <div className="mb-4">
          <ErrorAlert message={errorMessage} onClose={() => setErrorMessage(null)} />
        </div>
      )} */}

      </>}
      <div className="flex justify-center mb-7 items-center md:hidden">
        <DiveBusterBlackLogo />
      </div>

      <div className="text-center flex justify-center items-center flex-col mb-3">
        <h2 className="text-2xl font-bold text-[#1E1B39] dark:text-white mb-2">
          {activeTab === 'email' ? t.emailVerification.title : t.emailVerification.mfaTitle}
        </h2>
        <p className="text-[#8D9196] text-sm max-w-[390px]">
          {activeTab === 'email'
            ? t.emailVerification.subtitle
            : t.emailVerification.mfaSubtitle}
        </p>
      </div>

      {/* Display success message if there is one */}
      {successMessage!==null && (
        <div className="mb-4">
          <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded relative">
            <span className="block sm:inline">{successMessage}</span>
            <button 
              className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" 
              onClick={() => setSuccessMessage(null)}
            >
              <svg className="fill-current h-6 w-6 text-green-500 dark:text-green-400" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>{t.emailVerification.closeButton}</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex-1 py-3 font-medium text-sm ${activeTab === 'email'
              ? 'text-[#F7931D] border-b-2 border-[#F7931D]'
              : 'text-[#8D9196]'
            }`}
          onClick={() => setActiveTab('email')}
        >
          {t.emailVerification.emailTabLabel}
        </button>
        <button
          className={`flex-1 py-3 font-medium text-sm ${activeTab === 'qr'
              ? 'text-[#F7931D] border-b-2 border-[#F7931D]'
              : 'text-[#8D9196]'
            }`}
          onClick={() => setActiveTab('qr')}
        >
          {t.emailVerification.qrTabLabel}
        </button>
      </div>

      {activeTab === 'email' ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="token" className="block text-sm font-medium text-[#1E1B39] mb-2">
              {t.emailVerification.verificationCodeLabel}
            </label>
            <input
              id="token"
              type="text"
              placeholder={t.emailVerification.verificationCodePlaceholder}
              className={`w-full px-3 py-2 border ${errors.token ? 'border-red-500' : 'border-[#E2E8F0]'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7931D] h-[3rem] text-sm font-archivo`}
              {...register('token')}
            />
            {errors.token && (
              <p className="text-red-500 text-xs mt-1">{t.emailVerification.errors.tokenRequired}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-3 bg-[#F7931D] text-white rounded-lg font-medium"
            disabled={isVerifying}
          >
            {isVerifying ? <SmallSpinner /> : t.emailVerification.submitButton}
          </Button>

          <div className="text-center mt-6">
            <p className="text-[#1E1B39] dark:text-white text-sm inline-flex items-center">
              {t.emailVerification.noCodeText}{' '}
              <button
                type="button"
                onClick={handleResend}
                className="text-[#F7931D] font-medium ml-1"
                disabled={isResending}
              >
                {isResending ? t.emailVerification.resendingText : t.emailVerification.resendButton}
              </button>
            </p>
          </div>
        </form>
      ) : (
        <div className="flex justify-center mb-6">
          <MFAVerificationForm
            activeTab={activeTab}
          />
        </div>
      )}


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

export default EmailVerificationForm;


