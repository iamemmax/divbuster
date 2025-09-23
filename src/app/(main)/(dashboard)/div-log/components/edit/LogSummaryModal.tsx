import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, ErrorModal, } from '@/components/core';
import { DiveLogUpdatedModal } from './DiveLogUpdatedModal';
import { singleDiveProp } from '../../../api/div-logs/fetchSingleDivLog';
import { useUpdateLogDetails } from '../../../api/div-logs/update/updateLogDetails';
import { useErrorModalState } from '@/hooks';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { SmallSpinner } from '@/icons/core';
import { useQueryClient } from 'react-query';
import { UnsavedChangesModal } from '@/app/(main)/components/shared/modal/UnsavedChangeModal';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { Language } from '@/app/(auth)/sign-up/translations';
import { logSummaryTranslations } from '@/app/(main)/translation/diveLogTranslation';

// Define the validation schema with Zod



interface LogSummaryModalProps {
  isOpen?: boolean;
  onClose: () => void;
  // initialData?: Partial<LogSummaryFormValues>;
  data: singleDiveProp | undefined;
    user: User | null
  // onSave: (data: LogSummaryFormValues) => void;
}

const LogSummaryModal: React.FC<LogSummaryModalProps> = ({
  isOpen,
  onClose,
  // initialData = {},
  data,
  user
}) => {
   const language: Language = (user?.profile_details?.language as Language)
      const t = logSummaryTranslations[language] || logSummaryTranslations?.en;
      const logSummarySchema = z.object({
  bottom_time: z.string().min(1, { message: t.errors.bottomTime }),
  max_depth: z.string().min(1, { message: t.errors.maxDepth }),
  
});
 type LogSummaryFormValues = z.infer<typeof logSummarySchema>;
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [showDiscardModal, setShowDiscardModal] = useState(false)
  const [showUpdatedModal, setShowUpdatedModal] = useState(false)
  const { mutate: handleUpdate ,isLoading} = useUpdateLogDetails()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LogSummaryFormValues>({
    resolver: zodResolver(logSummarySchema),
    defaultValues: {
      bottom_time: data?.data?.bottom_time || '',
      max_depth: String(data?.data?.dive_plan?.dive_site?.max_depth) || '',

    },
  });

  const queryclient = useQueryClient()
  const onSubmit = ({ bottom_time, max_depth }: LogSummaryFormValues) => {
    // onSave(data);
    // onClose();
    handleUpdate({
      id: String(data?.data?.id),
      bottom_time,
      max_depth

    }, {
      onSuccess: () => {
        setShowUpdatedModal(true)
        queryclient.invalidateQueries({queryKey:["single-div-log"]})
        queryclient.invalidateQueries({queryKey:["div-logs"]})


      }, onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      },
    })


  };

  if (!isOpen) return null;

  return (
    <div className=" flex items-center justify-center z-50">
      <div className="w-full">

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full max-h-[60vh] md:max-h-[70vh]  overflow-auto">
            <div className="grid grid-cols-1 gap-4">
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] dark:border-gray-600 border-opacity-50 py-2 items-center gap-5'>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{t?.labels?.bottomTime}</label>
                <input
                  {...register('bottom_time')}
                  placeholder="0"
                  className={`border ${errors.bottom_time ? "border-red-500" : "border-[#E2E8F0] dark:border-gray-600"
                    } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-700 font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors placeholder-gray-400 dark:placeholder-gray-500`}
                />
                {errors.bottom_time && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.bottom_time.message}</p>}
              </div>



              <div className='grid grid-cols-[1fr_2fr]  dark:border-gray-600 border-opacity-50 py-2 items-center gap-5'>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{t?.labels?.maxDepth}</label>
                <input
                  {...register('max_depth')}
                  placeholder="0"
                  className={`border ${errors.max_depth ? "border-red-500" : "border-[#E2E8F0] dark:border-gray-600"
                    } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-700 font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors placeholder-gray-400 dark:placeholder-gray-500`}
                />
                {errors.max_depth && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.max_depth.message}</p>}
              </div>

            </div>
          </div>


          <div className="py-4 mt-3 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-2">
            <Button type="button" className='dark:text-white border-white' variant="outlined" onClick={() => setShowDiscardModal(true)}>
             {t?.buttons?.cancel}
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white flex justify-center items-center gap-x-3">
             {t?.buttons?.save} {isLoading && <SmallSpinner color='#fff' />}
            </Button>
          </div>
        </form>
      </div>
      {
        showDiscardModal && <UnsavedChangesModal
          isOpen={showDiscardModal}
          onClose={() => setShowDiscardModal(false)}
          onDiscard={() => onClose()}
        // onSave={()=>void}

        />
      }

      {
        showUpdatedModal && <DiveLogUpdatedModal
          isOpen={showUpdatedModal}
          onClose={() => onClose()}
        />
      }

       <ErrorModal
                isErrorModalOpen={isErrorModalOpen}
                setErrorModalState={() => {
                  setErrorModalState(false);
                }}
                subheading={
                  errorModalMessage || t?.messages?.error
                }
              />
    </div>
  );
};

export default LogSummaryModal;