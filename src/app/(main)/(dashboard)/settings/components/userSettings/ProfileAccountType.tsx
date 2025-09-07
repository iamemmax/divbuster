import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretDown } from '@/components/icons';
import { useLanguage } from '@/app/(auth)/sign-up/contexts/LanguageContext';
import CheckIcon from '@/app/icons/(dashboard)/CheckIcon';
import DiamondIcon from '@/app/icons/(dashboard)/DiamondIcon';
import { acctType, useUpdateAccountType } from '../../../api/settings/updateAccountType';
import { useErrorModalState } from '@/hooks';
import { useQueryClient } from 'react-query';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { ErrorModal } from '@/components/core';
import { SmallSpinner } from '@/icons/core';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/authentication';

// Account type selection schema with translations
const createAccountTypeSelectionSchema = (t: any) =>
  z.object({
    diver_type: z
      .string()
      .min(1, { message: t.accountTypeSelection.errors.diverTypeRequired }),
    account_type: z
      .string()
      .min(1, { message: t.accountTypeSelection.errors.accountTypeRequired }),
  });
  

const ProfileAccountType = () => {

   const {
      isErrorModalOpen,
      setErrorModalState,
      openErrorModalWithMessage,
      errorModalMessage,
    } = useErrorModalState();
  const { t } = useLanguage();
  const [diverTypeOpen, setDiverTypeOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] =
    useState('recreative');
 const { authState } = useAuth();
  const { user } = authState;
  const userData = user;
  // Create schema with translated error messages
  const accountTypeSelectionSchema = createAccountTypeSelectionSchema(t);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(accountTypeSelectionSchema),
    defaultValues: {
      diver_type: '',
      account_type: '',
    },
    mode: 'onChange',
  });

  const diverType = watch('diver_type');

  useEffect(() => {
    if(userData){
setValue("account_type", userData?.profile_details?.account_type)
setValue("diver_type", userData?.diver_profile?.diver_type)
    }
  }, [userData])
  

  const handleDiverTypeChange = (value: string) => {
    setValue('diver_type', value, { shouldValidate: true });
  };

  const handleAccountTypeChange = (value: string) => {
    setValue('account_type', value, { shouldValidate: true });
    setSelectedAccountType(value);
  };
  const {mutate: handleUpdate, isLoading: isSubmitting}=useUpdateAccountType()
  const queryClient = useQueryClient()

  const onSubmit = ({account_type,diver_type}: acctType) => {
     handleUpdate({
          account_type,
          diver_type
    
        }, {
          onSuccess: () => {
            toast.success("Updated Successfully")
            queryClient.invalidateQueries({ queryKey: ["user-details"] })
    
    
    
          }, onError: (error) => {
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
          },
        })
  };

  return (
    <div className="max-w-2xl">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold font-archivo text-[#09090B] dark:text-white mb-2">
          Account Type
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        {/* Diver type dropdown */}
        <div className="mb-6">
          <label className="block text-[#36394A] dark:text-gray-300 text-xs sm:text-sm font-archivo font-medium mb-2">
            {t.accountTypeSelection.diverTypeLabel}
          </label>
          <div className="relative">
            <button
              type="button"
              className="border border-[#ECEFF3] dark:border-gray-700 w-full bg-[#F6F8FA] dark:bg-gray-800 text-[#09090B] dark:text-gray-100 text-left outline-none h-[3rem] text-sm rounded-lg px-4 pr-5 flex items-center justify-between"
              onClick={() => setDiverTypeOpen(!diverTypeOpen)}
            >
              {diverType === 'scuba'
                ? t.accountTypeSelection.scubaDiver
                : t.accountTypeSelection.freeDiver}
              <CaretDown
                color="#8D9196"
                className={`transition-transform duration-200 ${
                  diverTypeOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {diverTypeOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
                <div
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    handleDiverTypeChange('scuba');
                    setDiverTypeOpen(false);
                  }}
                >
                  {t.accountTypeSelection.scubaDiver}
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
            <p className="text-red-500 text-xs mt-1 dark:text-red-400">
              {errors.diver_type.message as string}
            </p>
          )}
        </div>

        {/* Account type cards */}
        <div className="space-y-4 mb-6">
          {[
            {
              id: 'recreative',
              title: t.accountTypeSelection.recreativeTitle,
              desc: t.accountTypeSelection.recreativeDescription,
              example: t.accountTypeSelection.recreativeExample,
              badge: t.accountTypeSelection.peoplesChoice,
            },
            {
              id: 'professional',
              title: t.accountTypeSelection.professionalTitle,
              desc: t.accountTypeSelection.professionalDescription,
              example: t.accountTypeSelection.professionalExample,
            },
            {
              id: 'combined',
              title: t.accountTypeSelection.combinedTitle,
              desc: t.accountTypeSelection.combinedDescription,
              example: t.accountTypeSelection.combinedBenefit,
            },
          ].map((item) => (
            <div
              key={item.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedAccountType === item.id
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
              onClick={() => handleAccountTypeChange(item.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <DiamondIcon />
                  <h3 className="font-medium dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center">
                  {item.badge && (
                    <span className="text-[#027A48] text-xs mr-2 bg-[#ECFDF3] dark:bg-green-900/40 dark:text-green-400 px-2 py-[.125rem] rounded-2xl">
                      {item.badge}
                    </span>
                  )}
                  {selectedAccountType === item.id && (
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[#667085] dark:text-gray-300 text-xs sm:text-sm font-archivo max-w-lg font-medium">
                {item.desc}
              </p>
              {item.example && (
                <p className="text-[#667085] dark:text-gray-400 text-xs sm:text-sm font-archivo max-w-lg font-medium mt-2">
                  {item.example}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-12 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-orange-500 text-white flex justify-center items-center gap-x-3 font-medium rounded-lg hover:bg-orange-600 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none dark:focus:ring-offset-gray-900"
          >
      Save changes {isSubmitting && <SmallSpinner color="#fff" />}
          </button>
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
    </div>
  );
};

export default ProfileAccountType;
