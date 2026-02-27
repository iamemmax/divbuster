import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/core';
import { useLanguage } from '../contexts/LanguageContext';
// Try a different approach for QR code rendering
import { QRCodeCanvas } from 'qrcode.react';
import { translations } from '../translations';

// Validation schema
const mfaSchema = z.object({
  mfa_code: z.string().min(6, 'MFA code is required')
});

type MFAFormValues = z.infer<typeof mfaSchema>;

interface MFAVerificationFormProps {
  activeTab: "qr" | "email";
}

const MFAVerificationForm = ({ activeTab }: MFAVerificationFormProps) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  // This would typically come from your API
  const qrCodeValue = 'otpauth://totp/DiveBuster:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=DiveBuster';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MFAFormValues>({
    resolver: zodResolver(mfaSchema),
    defaultValues: {
      mfa_code: '',
    },
  });

  const onSubmit = async () => {
    try {
      // Here you would verify the MFA code with your API
      
     
    } catch (error) {
      console.error('MFA verification error:', error);
    }
  };

  const handleRegenerateQR = async () => {
    setIsRegenerating(true);
    try {
      // Here you would call your API to regenerate the QR code
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert(t.mfaVerification.qrRegeneratedMessage);
    } catch (error) {
      console.error('Error regenerating QR code:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  if (activeTab !== "qr") return null;

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <QRCodeCanvas value={qrCodeValue} size={160} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label htmlFor="mfa_code" className="block text-sm font-medium text-[#1E1B39] mb-2">
            {t.mfaVerification.generatedCodeLabel}
          </label>
          <input
            id="mfa_code"
            type="text"
            placeholder={t.mfaVerification.generatedCodePlaceholder}
            className={`w-full px-3 py-2 border ${
              errors.mfa_code ? 'border-red-500' : 'border-[#E2E8F0]'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7931D] h-[3rem] text-sm font-archivo`}
            {...register('mfa_code')}
          />
          {errors.mfa_code && (
            <p className="text-red-500 text-xs mt-1">{t.mfaVerification.errors.mfaCodeRequired}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-3 bg-[#F7931D] text-white rounded-lg font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? t.mfaVerification.submittingText : t.mfaVerification.submitButton}
        </Button>

        <div className="text-center mt-6">
          <p className="text-[#1E1B39] text-sm inline-flex items-center">
            {t.mfaVerification.noCodeText}{' '}
            <button
              type="button"
              onClick={handleRegenerateQR}
              className="text-[#F7931D] font-medium ml-1"
              disabled={isRegenerating}
            >
              {isRegenerating ? t.mfaVerification.regeneratingText : t.mfaVerification.regenerateButton}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default MFAVerificationForm;







