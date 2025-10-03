import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { Dialog, DialogBody, DialogContent, DialogTitle, ErrorModal } from '@/components/core';
import { useFetchPaymentOptions } from '../../../api/payment/fetchPaymentPlans';
import { useFundWallet } from '../../../api/payment/fundWallet';
import { useUser } from '@/app/(auth)/api/getAuthenticatedUser';
import { useErrorModalState } from '@/hooks';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { SmallSpinner } from '@/icons/core';
import { useLanguage } from '@/hooks/useLanguage';
import { addTokenTranslations } from '@/app/(main)/translation/tokenTranslation';

// Zod schema for form validation
const tokenSchema = z.object({
  plan_id: z.string().min(1, 'Please select a token package'),
});

interface prop {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;

}
type TokenFormData = z.infer<typeof tokenSchema>;


const AddTokenModal = ({ isOpen, setIsOpen,  }: prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TokenFormData>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      plan_id: "",
    },
    mode: 'onChange',
  });

  const user = useUser();
  const router = useRouter();
  const { data } = useFetchPaymentOptions();
  const { mutate: handleSubmitData, isLoading } = useFundWallet();
const {language}=useLanguage()
  const t = addTokenTranslations[language] || addTokenTranslations.en;

  const onSubmit = (data: TokenFormData) => {
    handleSubmitData(
      {
        cancel_url: `${process.env.NEXT_PUBLIC_URL}token-management`,
        lang: String(user?.data?.data?.profile_details?.language),
        plan_id: Number(data?.plan_id),
        return_url: `${process.env.NEXT_PUBLIC_URL}token-management`,
      },
      {
        onSuccess: (data) => {
          router.push(data?.detail);
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  const handleCancel = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <div className="p-8 max-h-[90vh]">
      <Dialog open={isOpen}>
        <DialogContent className="w-full !max-w-[500px] !max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <DialogBody className="p-0 w-full outline-none">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {t.title}
                </DialogTitle>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t.selectOption}
                  </label>
                  <Controller
                    name="plan_id"
                    control={control}
                    render={({ field }) => (
                      <Select.Root value={field.value} onValueChange={field.onChange}>
                        <Select.Trigger className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-between hover:border-gray-400 dark:hover:border-gray-500 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 dark:focus:ring-orange-400/20 transition-all text-gray-900 dark:text-white">
                          <Select.Value />
                          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-2xl overflow-hidden z-50">
                            <Select.Viewport className="p-1">
                              {data?.map((pkg) => (
                                <Select.Item
                                  key={pkg.id}
                                  value={String(pkg?.id)}
                                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded flex items-center justify-between data-[highlighted]:bg-gray-50 dark:data-[highlighted]:bg-gray-700 data-[state=checked]:bg-orange-50 dark:data-[state=checked]:bg-orange-900/20 text-gray-900 dark:text-white"
                                >
                                  <Select.ItemText>{`EUR ${pkg?.amount}-${pkg?.coin_value} tokens`}</Select.ItemText>
                                  <Select.ItemIndicator>
                                    <Check className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    )}
                  />
                  {errors.plan_id && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {t.validation}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 py-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="flex-1 px-6 py-3 bg-orange-500 flex justify-center items-center gap-x-4 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    {t.buyNow} {isLoading && <SmallSpinner color="white" />}
                  </button>
                </div>
              </form>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={errorModalMessage || t.errorDefault}
      />
    </div>
  );
};

export default AddTokenModal;
