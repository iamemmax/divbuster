import React, { useState } from 'react';
import { Button } from '@/components/core';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretDown } from '@/components/icons';
import { useLanguage } from '@/app/(auth)/sign-up/contexts/LanguageContext';

// Account type selection schema with translations
const createAccountTypeSelectionSchema = (t: any) => z.object({
  diver_type: z.string().min(1, { message: t.accountTypeSelection.errors.diverTypeRequired }),
  account_type: z.string().min(1, { message: t.accountTypeSelection.errors.accountTypeRequired }),
});


const ProfileAccountType = () => {
  const { t } = useLanguage();
  const [diverTypeOpen, setDiverTypeOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState('recreative');
  
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
      diver_type:  'scuba',
      account_type: 'free',
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
     <div className=" max-w-2xl ">

    

      <div className="flex  flex-col">
        <h2 className="text-2xl font-semibold font-archivo text-[#09090B] mb-2">
          Account Type
        </h2>
        
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
        <div className="mb-6">
          <label className="block text-[#36394A] text-xs sm:text-sm font-archivo font-medium mb-2">
            {t.accountTypeSelection.diverTypeLabel}
          </label>
          <div className="relative">
            <button
              type="button"
              className="border border-[#ECEFF3] w-full bg-[#F6F8FA] text-left outline-none h-[3rem] text-sm rounded-lg px-4 pr-5 flex items-center justify-between"
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
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
             <p className="text-[#667085] text-xs sm:text-sm font-archivo max-w-lg font-medium ">
              {t.accountTypeSelection.recreativeDescription}
            </p>
            <p className="text-[#667085] text-xs sm:text-sm font-archivo max-w-lg font-medium ">
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
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              )}
            </div>
             <p className="text-[#667085] text-xs sm:text-sm font-archivo max-w-lg font-medium ">
              {t.accountTypeSelection.professionalDescription}
            </p>
            <p className="text-[#667085] text-xs sm:text-sm font-archivo max-w-lg font-medium mt-2">
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
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              )}
            </div>
            <p className="text-[#667085] text-xs sm:text-sm font-archivo max-w-lg font-medium ">
              {t.accountTypeSelection.combinedDescription}
            </p>
            <p className="text-[#667085] text-xs sm:text-sm font-archivo max-w-lg font-medium  mt-2">
              {t.accountTypeSelection.combinedBenefit}
            </p>
          </div>
        </div>

       
                <div className="mt-12 flex justify-end">
          <button
            type="submit"
            // disabled={isSubmitting}
            className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
           Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileAccountType;


