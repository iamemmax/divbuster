"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Dialog, DialogBody, DialogContent, ErrorModal, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core';
import { Clock } from 'lucide-react';
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

// Define the validation schema with Zod
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
  initialData?: singleDiveProp | undefined
  // onSave: (data: GearLogDetailsFormValues) => void;
}

const EditBuuddyGear: React.FC<AdvancedDetailsModalProps> = ({
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
  const {mutate:handleUpdate,isLoading}=useUpdateLogGearDetails()
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

  const queryClient = useQueryClient()
  const onSubmit = (data: GearLogDetailsFormValues) => {
    // onSave(data);
    // onClose();
    handleUpdate({
          id: String(initialData?.data?.id),
         data
    
        }, {
          onSuccess: () => {
            setShowUpdatedModal(true)
            queryClient.invalidateQueries({queryKey:["single-div-log"]})
            queryClient.invalidateQueries({queryKey:["div-logs"]})
    
    
          }, onError: (error) => {
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
          },
        })
  };

  if (!isOpen) return null;

  const gasMixture = ["air", "eanx32", "eanx36", "eanx40", "enriched", "rebreather"]
  const weightArray = ["light", "good", "heavy"]
  const maskArray = ["regular", "full_mask", "other"]
  const wetSuitArray = ["dry", "3mm_full", "5mm_full", "7mm_full", "shorty", "semi_dry", "wet", "none"]



  return (
    <Dialog modal={true} open={isOpen}>
      <DialogContent className="w-full !max-w-[57.3125rem] ">
        <DialogBody className="p-0  px-4 md:px-8 pt-8  w-full !max-h-[95vh] md:!max-h-[90vh] !max-w-[57.3125rem] ">
          <div className=" flex w-full  flex-col   z-50 ">
            <div className=" border-gray-200 flex justify-between items-center border-b  border-opacity-55 pb-4">
              <h2 className="text-xl font-semibold font-archivo  text-[#101828]">Log your Gear</h2>

            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
              <div className="w-full max-h-[78vh] md:max-h-[70vh]  overflow-auto">
                <div className="grid grid-cols-1  gap-4">
                  <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Gas Mixture</label>
                    <Controller
                      name="gas_mixture"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={`border relative ${errors.gas_mixture ? "border-red-500" : "border-[#E2E8F0]"
                            } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder="Nitrox" />
                            <div className="absolute right-4"><CaretDown color='black' /></div>

                          </SelectTrigger>
                          <SelectContent>
                            {
                              gasMixture?.map((mix, idx: number) => (
                                <SelectItem className='text-black' value={mix} key={idx}>{capitalizeFirstLetter(mix)}</SelectItem>

                              ))
                            }

                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                    <label className="block text-sm font-medium text-gray-700 mb-1">BCD Type</label>
                    <Controller
                      name="bcd"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={`border relative ${errors.bcd ? "border-red-500" : "border-[#E2E8F0]"
                            } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder="Nitrox" />
                            <div className="absolute right-4"><CaretDown color='black' /></div>

                          </SelectTrigger>
                          <SelectContent className='text-black'>
                            <SelectItem value="true">True</SelectItem>
                            <SelectItem value="false">False</SelectItem>

                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight Type</label>
                    <Controller
                      name="weight"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={`border relative ${errors.weight ? "border-red-500" : "border-[#E2E8F0]"
                            } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder="select weight type" />
                            <div className="absolute right-4"><CaretDown color='black' /></div>

                          </SelectTrigger>
                          <SelectContent className='text-black'>
                            {
                              weightArray?.map((weight, idx: number) => (
                                <SelectItem value={weight} key={idx}>{capitalizeFirstLetter(weight)}</SelectItem>

                              ))
                            }


                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>



                  <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Mask</label>
                    <Controller
                      name="mask"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={`border relative ${errors.mask ? "border-red-500" : "border-[#E2E8F0]"
                            } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder="Nitrox" />
                            <div className="absolute right-4"><CaretDown color='black' /></div>

                          </SelectTrigger>
                          <SelectContent>
                            {
                              maskArray?.map((max, idx: number) => (
                                <SelectItem className='text-black' value={max} key={idx}>{convertKebabAndSnakeToTitleCase(max)}</SelectItem>

                              ))
                            }
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Regulator</label>
                    <Controller
                      name="regulator"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={`border relative ${errors.regulator ? "border-red-500" : "border-[#E2E8F0]"
                            } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder="Nitrox" />
                            <div className="absolute right-4"><CaretDown color='black' /></div>

                          </SelectTrigger>
                          <SelectContent className='text-black'>
                            <SelectItem value="true">True</SelectItem>
                            <SelectItem value="false">False</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                    <Controller
                      name="fin"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={`border relative ${errors.fin ? "border-red-500" : "border-[#E2E8F0]"
                            } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder="Nitrox" />
                            <div className="absolute right-4"><CaretDown color='black' /></div>

                          </SelectTrigger>
                          <SelectContent className='text-black'>
                            <SelectItem value="true">True</SelectItem>
                            <SelectItem value="false">False</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Wet Suit</label>
                    <Controller
                      name="wetsuit"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={`border relative ${errors.wetsuit ? "border-red-500" : "border-[#E2E8F0]"
                            } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                          >
                            <SelectValue placeholder="Nitrox" />
                            <div className="absolute right-4"><CaretDown color='black' /></div>

                          </SelectTrigger>
                          <SelectContent>
                            {
                              wetSuitArray?.map((wetsuit, idx: number) => (
                                <SelectItem className='text-black' value={wetsuit} key={idx}>{convertKebabAndSnakeToTitleCase(wetsuit)}</SelectItem>

                              ))
                            }

                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>


                </div>
              </div>


              <div className="py-4 border-t border-gray-200 flex justify-end space-x-2">
                <Button type="button" variant="outlined" onClick={() => setShowDiscardModal(true)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-500 flex justify-center items-center gap-x-3 hover:bg-orange-600 text-white">
                  Save Changes {isLoading && <SmallSpinner color='#fff' />}
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
                            errorModalMessage || "Please check your inputs and try again."
                          }
                        />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

export default EditBuuddyGear;
