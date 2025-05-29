import React, { useState } from 'react';
import { Button } from '@/components/core';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretDown } from '@/components/icons';
import { useLanguage } from '../contexts/LanguageContext';
import DiveBusterBlackLogo from '@/components/icons/DiveBusterBlackLogo';

// Account type selection schema with translations
const createAccountTypeSelectionSchema = (t: any) => z.object({
  diver_type: z.string().min(1, { message: t.accountTypeSelection.errors.diverTypeRequired }),
  account_type: z.string().min(1, { message: t.accountTypeSelection.errors.accountTypeRequired }),
});

type AccountTypeSelectionFormProps = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

const AccountTypeSelectionForm = ({ formData, updateFormData, onNext, onBack }: AccountTypeSelectionFormProps) => {
  const { t } = useLanguage();
  const [diverTypeOpen, setDiverTypeOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState(formData.account_type || 'recreative');
  
  // Create schema with translated error messages
  const accountTypeSelectionSchema = createAccountTypeSelectionSchema(t);
  
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(accountTypeSelectionSchema),
    defaultValues: {
      diver_type: formData.diver_type || 'scuba',
      account_type: formData.account_type || 'free',
    },
    mode: 'onChange'
  });

  const diverType = watch('diver_type');

  const handleDiverTypeChange = (value: string) => {
    setValue('diver_type', value, { shouldValidate: true });
  };

  const handleAccountTypeChange = (value: string) => {
    setValue('account_type', value, { shouldValidate: true });
    setSelectedAccountType(value);
  };

  const onSubmit = (data: any) => {
    updateFormData({
      diver_type: data.diver_type,
      account_type: data.account_type,
    });
    onNext();
  };

  // Custom SVG icon component
  const DiamondIcon = () => (
    <div className="flex items-center justify-center mr-3 w-8 h-8 bg-[#FFECD5] border-[#FFF7EE] border-[4px] rounded-full">
      <svg 
        width="16" 
        height="12" 
        viewBox="0 0 16 12" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M1.33398 7.66667L8.00065 11L14.6673 7.66667M8.00065 1L1.33398 4.33333L8.00065 7.66667L14.6673 4.33333L8.00065 1Z" 
          stroke="#F7931D" 
          strokeWidth="1.33333" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  return (
     <div className=" xl:px-[9.125rem] w-full md:px-[30px]  px-6 py-[30px] xl:py-[7rem]">

     <div className="flex justify-center mb-5 items-center md:hidden">
        <DiveBusterBlackLogo />
      </div>

      <div className="flex justify-center items-center flex-col">
        <h2 className="font-archivo text-base md:-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39]">
          {t.accountTypeSelection.title}
        </h2>
        <p className="font-archivo text-[#8D9196] max-sm:text-center font-medium text-xs 2xl:text-base">
          {t.accountTypeSelection.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='mt-[30px]'>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            {t.accountTypeSelection.diverTypeLabel}
          </label>
          <div className="relative">
            <button
              type="button"
              className="border border-gray-300 w-full text-left outline-none h-[3rem] text-sm rounded-lg px-4 pr-10 flex items-center justify-between"
              onClick={() => setDiverTypeOpen(!diverTypeOpen)}
            >
              {diverType === 'scuba' ? t.accountTypeSelection.scubaDiver : t.accountTypeSelection.freeDiver}
              <CaretDown 
                color="#8D9196"
                className={`transition-transform duration-200 ${
                  diverTypeOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {diverTypeOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <div 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleDiverTypeChange('scuba');
                    setDiverTypeOpen(false);
                  }}
                >
                  {t.accountTypeSelection.scubaDiver}
                </div>
                <div 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleDiverTypeChange('free');
                    setDiverTypeOpen(false);
                  }}
                >
                  {t.accountTypeSelection.freeDiver}
                </div>
              </div>
            )}
          </div>
          {errors.diver_type && (
            <p className="text-red-500 text-xs mt-1">{errors.diver_type.message as string}</p>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <div 
            className={`border rounded-lg p-4 cursor-pointer ${
              selectedAccountType === 'recreative' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-300'
            }`}
            onClick={() => handleAccountTypeChange('recreative')}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <DiamondIcon />
                <h3 className="font-medium">{t.accountTypeSelection.recreativeTitle}</h3>
              </div>
              <div className="flex items-center">
                <span className="text-[#027A48] text-xs mr-2 bg-[#ECFDF3] px-2 py-[.125rem] rounded-2xl">{t.accountTypeSelection.peoplesChoice}</span>
                {selectedAccountType === 'recreative' && (
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {t.accountTypeSelection.recreativeDescription}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {t.accountTypeSelection.recreativeExample}
            </p>
          </div>

          <div 
            className={`border rounded-lg p-4 cursor-pointer ${
              selectedAccountType === 'professional' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-300'
            }`}
            onClick={() => handleAccountTypeChange('professional')}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <DiamondIcon />
                <h3 className="font-medium">{t.accountTypeSelection.professionalTitle}</h3>
              </div>
              {selectedAccountType === 'professional' && (
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm">
              {t.accountTypeSelection.professionalDescription}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {t.accountTypeSelection.professionalExample}
            </p>
          </div>

          <div 
            className={`border rounded-lg p-4 cursor-pointer ${
              selectedAccountType === 'combined' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-300'
            }`}
            onClick={() => handleAccountTypeChange('combined')}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center ">
                <div className="">
                <DiamondIcon />
                </div>
                <h3 className="font-medium">{t.accountTypeSelection.combinedTitle}</h3>
              </div>
              {selectedAccountType === 'combined' && (
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm">
              {t.accountTypeSelection.combinedDescription}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {t.accountTypeSelection.combinedBenefit}
            </p>
          </div>
        </div>

       
               <div className="flex gap-4">
                 <Button
                   type="button"
                   onClick={onBack}
                   className="flex-1 bg-white border border-[#F7931D] text-[#F7931D] py-3 rounded-lg font-medium"
                 >
                   {t.accountTypeSelection.backButton}
                 </Button>
                 <Button
                   type="submit"
                   className="flex-1 bg-[#F7931D] text-white py-3 rounded-lg font-medium"
                 >
                   {t.accountTypeSelection.continueButton}
                 </Button>
               </div>
      </form>
    </div>
  );
};

export default AccountTypeSelectionForm;


