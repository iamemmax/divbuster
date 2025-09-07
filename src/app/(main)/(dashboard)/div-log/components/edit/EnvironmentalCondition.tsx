"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Dialog, DialogBody, DialogContent, ErrorModal } from '@/components/core';
import { useErrorModalState } from '@/hooks';
import { singleDiveProp } from '../../../api/div-logs/fetchSingleDivLog';
import { useUpdateEnvironmentalCon } from '../../../api/div-logs/update/updateEnvironmentalCond';
import { useQueryClient } from 'react-query';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { SmallSpinner } from '@/icons/core';
import { UnsavedChangesModal } from '@/app/(main)/components/shared/modal/UnsavedChangeModal';
import { DiveLogUpdatedModal } from './DiveLogUpdatedModal';


// Define the validation schema with Zod
const moreLogDetailsSchema = z.object({
  min_water_temperature: z.string(),
  max_water_temperature: z.string(),
  avg_water_temperature: z.string(),

});

export type MoreEnvironmentalFormValues = z.infer<typeof moreLogDetailsSchema>;

interface EnvironmentalConditionProps {
  isOpen?: boolean;
  onClose: () => void;
  initialData?: singleDiveProp | undefined
}

const EnvironmentalCondition: React.FC<EnvironmentalConditionProps> = ({
  isOpen,
  onClose,
  initialData
  // onSave,
}) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [showDiscardModal, setShowDiscardModal] = useState(false)
  const [showUpdatedModal, setShowUpdatedModal] = useState(false)
  const { mutate: handleUpdate, isLoading } = useUpdateEnvironmentalCon()


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MoreEnvironmentalFormValues>({
    resolver: zodResolver(moreLogDetailsSchema),
    defaultValues: {
      min_water_temperature: String(initialData?.data?.min_water_temperature) || "0",
      avg_water_temperature: String(initialData?.data?.avg_water_temperature || "0"),
      max_water_temperature: String(initialData?.data?.max_water_temperature) || "0",

    },
  });



  const queryClient = useQueryClient()
  const onSubmit = ({ avg_water_temperature, max_water_temperature, min_water_temperature }: MoreEnvironmentalFormValues) => {
   
    handleUpdate({
      id: String(initialData?.data?.id),
      avg_water_temperature, max_water_temperature, min_water_temperature

    }, {
      onSuccess: () => {
        setShowUpdatedModal(true)
        queryClient.invalidateQueries({ queryKey: ["single-div-log"] })
        queryClient.invalidateQueries({ queryKey: ["div-logs"] })


      }, onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      },
    })
  };
  if (!isOpen) return null;


  return (
  <Dialog modal={true} open={isOpen}>
  <DialogContent className="w-full !max-w-[57.3125rem] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
    <DialogBody className="p-0 px-4 md:px-8 pt-8 w-full !max-h-[95vh] md:!max-h-[90vh] !max-w-[57.3125rem]">
      
      {/* Header */}
      <div className="border-gray-200 dark:border-gray-700 flex justify-between items-center border-b border-opacity-55 pb-4">
        <h2 className="text-xl font-semibold font-archivo text-[#101828] dark:text-gray-100">
          Environmental Conditions
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-h-[60vh] md:max-h-[70vh] overflow-auto">
          
          {/* Minimum Temp */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-4 items-center gap-2 sm:gap-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Minimum Water Temperature
            </label>
            <input
              {...register('min_water_temperature')}
              placeholder="0"
              className={`border ${
                errors.min_water_temperature
                  ? "border-red-500 dark:border-red-400"
                  : "border-[#E2E8F0] dark:border-gray-600"
              } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-700 font-archivo rounded-lg px-[.875rem] 
              focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors 
              placeholder-gray-400 dark:placeholder-gray-500`}
            />
            {errors.min_water_temperature && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                {errors.min_water_temperature.message}
              </p>
            )}
          </div>

          {/* Maximum Temp */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-4 items-center gap-2 sm:gap-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
              Maximum Water Temperature
            </label>
            <input
              {...register('max_water_temperature')}
              placeholder="0"
              className={`border ${
                errors.max_water_temperature
                  ? "border-red-500 dark:border-red-400"
                  : "border-[#E2E8F0] dark:border-gray-600"
              } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-700 font-archivo rounded-lg px-[.875rem] 
              focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors 
              placeholder-gray-400 dark:placeholder-gray-500`}
            />
            {errors.max_water_temperature && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                {errors.max_water_temperature.message}
              </p>
            )}
          </div>

          {/* Average Temp */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-4 items-center gap-2 sm:gap-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-1">
              Avg Water Temperature
            </label>
            <input
              {...register('avg_water_temperature')}
              placeholder="0"
              className={`border ${
                errors.avg_water_temperature
                  ? "border-red-500 dark:border-red-400"
                  : "border-[#E2E8F0] dark:border-gray-600"
              } outline-none py-[.8125rem] w-full text-black dark:text-white text-sm flex-1 bg-white dark:bg-gray-700 font-archivo rounded-lg px-[.875rem] 
              focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors 
              placeholder-gray-400 dark:placeholder-gray-500`}
            />
            {errors.avg_water_temperature && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                {errors.avg_water_temperature.message}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
          <Button type="button" className='dark:border-white dark:text-white' variant="outlined"  onClick={() => setShowDiscardModal(true)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-orange-500 flex justify-center items-center gap-x-3 hover:bg-orange-600 text-white"
          >
            Save Changes {isLoading && <SmallSpinner color="#fff" />}
          </Button>
        </div>
      </form>

      {/* Modals */}
      {showDiscardModal && (
        <UnsavedChangesModal
          isOpen={showDiscardModal}
          onClose={() => setShowDiscardModal(false)}
          onDiscard={() => onClose()}
          loading={isLoading}
        />
      )}

      {showUpdatedModal && (
        <DiveLogUpdatedModal isOpen={showUpdatedModal} onClose={() => onClose()} />
      )}

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={errorModalMessage || "Please check your inputs and try again."}
      />
    </DialogBody>
  </DialogContent>
</Dialog>


  );
};

export default EnvironmentalCondition;

