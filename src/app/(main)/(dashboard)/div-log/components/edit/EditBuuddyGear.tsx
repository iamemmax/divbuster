"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  ErrorModal,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/core';
import { CaretDown } from '@/components/icons';
import { DiveLogUpdatedModal } from './DiveLogUpdatedModal';
import { capitalizeFirstLetter, formatAxiosErrorMessage } from '@/utils';
import { convertKebabAndSnakeToTitleCase } from '@/utils/strings';
import { useUpdateLogGearDetails } from '../../../api/div-logs/update/updateLogGearDetails';
import { useQueryClient } from 'react-query';
import { useErrorModalState } from '@/hooks';
import { singleDiveProp } from '../../../api/div-logs/fetchSingleDivLog';
import { AxiosError } from 'axios';
import { SmallSpinner } from '@/icons/core';
import { UnsavedChangesModal } from '@/app/(main)/components/shared/modal/UnsavedChangeModal';
import { User } from '@/app/(auth)/api/getAuthenticatedUser';
import { Language } from '@/app/(auth)/sign-up/translations';
import { gearLogTranslations } from '@/app/(main)/translation/diveLogTranslation';
import { useLanguage } from '@/hooks/useLanguage';

// Validation schema
const advancedDetailsSchema = z.object({
  gas_mixture: z.string().optional(),
  bcd: z.string().optional(),
  weight: z.string().optional(),
  mask: z.string().optional(),
  regulator: z.string(),
  fin: z.string(),
  wetsuit: z.string().optional(),
});

export type GearLogDetailsFormValues = z.infer<typeof advancedDetailsSchema>;

interface AdvancedDetailsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  initialData?: singleDiveProp | undefined;
  user: User | null;
}

const EditBuuddyGear: React.FC<AdvancedDetailsModalProps> = ({
  isOpen,
  onClose,
  initialData,
  user
}) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showUpdatedModal, setShowUpdatedModal] = useState(false);
  const { mutate: handleUpdate, isLoading } = useUpdateLogGearDetails();

  const {language}= useLanguage()
  const t = gearLogTranslations[language] || gearLogTranslations?.en;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GearLogDetailsFormValues>({
    resolver: zodResolver(advancedDetailsSchema),
    defaultValues: {
      gas_mixture: initialData?.data.dive_equipment?.gas_mixture || '',
      bcd: String(initialData?.data.dive_equipment?.bcd) || "",
      weight: initialData?.data.dive_equipment?.weight || '',
      mask: initialData?.data.dive_equipment?.mask || '',
      regulator: String(initialData?.data.dive_equipment?.regulator) || "",
      fin: String(initialData?.data.dive_equipment?.fin) || "",
      wetsuit: initialData?.data.dive_equipment?.wetsuit || '',
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = (data: GearLogDetailsFormValues) => {
    handleUpdate(
      {
        id: String(initialData?.data?.id),
        data,
      },
      {
        onSuccess: () => {
          setShowUpdatedModal(true);
          queryClient.invalidateQueries({ queryKey: ["single-div-log"] });
          queryClient.invalidateQueries({ queryKey: ["div-logs"] });
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  if (!isOpen) return null;

  const gasMixture = ["air", "eanx32", "eanx36", "eanx40", "enriched", "rebreather"];
  const weightArray = ["light", "good", "heavy"];
  const maskArray = ["regular", "full_mask", "other"];
  const wetSuitArray = ["dry", "3mm_full", "5mm_full", "7mm_full", "shorty", "semi_dry", "wet", "none"];

  return (
    <Dialog modal={true} open={isOpen}>
      <DialogContent className="w-full !max-w-[57.3125rem] dark:bg-gray-900 dark:text-white">
        <DialogBody className="p-0 px-4 md:px-8 pt-8 w-full !max-h-[95vh] md:!max-h-[90vh] !max-w-[57.3125rem]">
          <div className="flex w-full flex-col z-50">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 border-opacity-55 pb-4">
              <h2 className="text-xl font-semibold font-archivo text-[#101828] dark:text-gray-100">
                {t?.title}
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="w-full max-h-[78vh] md:max-h-[70vh] overflow-auto">
                <div className="grid grid-cols-1 gap-4">
                  {/** Each field row */}
                  {[
                    { name: "gas_mixture", label: t?.fields?.gasMixture, options: gasMixture },
                    { name: "bcd", label: t?.fields?.bcd, options: ["true", "false"] },
                    { name: "weight", label: t?.fields?.weight, options: weightArray },
                    { name: "mask", label: t?.fields?.mask, options: maskArray },
                    { name: "regulator", label: t?.fields?.regulator, options: ["true", "false"] },
                    { name: "fin", label: t?.fields?.fin, options: ["true", "false"] },
                    { name: "wetsuit", label: t?.fields?.wetsuit, options: wetSuitArray },
                  ].map((fieldConfig, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] dark:border-gray-700 border-opacity-50 py-2 items-center gap-5"
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {fieldConfig.label}
                      </label>
                      <Controller
                        name={fieldConfig.name as keyof GearLogDetailsFormValues}
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger
                              className={`border relative ${
                                errors[fieldConfig.name as keyof GearLogDetailsFormValues]
                                  ? "border-red-500"
                                  : "border-[#E2E8F0] dark:border-gray-600"
                              } outline-none py-[.8125rem] w-full text-sm flex-1 font-archivo h-[48px] rounded-lg px-[.875rem] 
                              focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors
                              bg-white dark:bg-gray-800 dark:text-gray-100`}
                            >
                              <SelectValue placeholder="Select..." />
                              <div className="absolute right-4">
                                <CaretDown color="currentColor" className='dark:hidden' />
                              </div>
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                              {fieldConfig.options.map((opt, i) => (
                                <SelectItem
                                  key={i}
                                  value={opt}
                                  className="text-black dark:text-gray-100"
                                >
                                  {convertKebabAndSnakeToTitleCase(opt)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => setShowDiscardModal(true)}
                  className="dark:border-gray-600 dark:text-gray-200"
                >
                  {t?.actions?.cancel}
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-500 flex justify-center items-center gap-x-3 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700"
                >
                  {t?.actions?.saveChanges} {isLoading && <SmallSpinner color="#fff" />}
                </Button>
              </div>
            </form>
          </div>

          {showDiscardModal && (
            <UnsavedChangesModal
              isOpen={showDiscardModal}
              onClose={() => setShowDiscardModal(false)}
              onDiscard={() => onClose()}
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
            subheading={errorModalMessage || t?.messages?.error}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default EditBuuddyGear;
