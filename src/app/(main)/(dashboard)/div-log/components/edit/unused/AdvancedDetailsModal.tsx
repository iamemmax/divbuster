import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core';
import { Clock } from 'lucide-react';
import { CaretDown } from '@/components/icons';

// Define the validation schema with Zod
const advancedDetailsSchema = z.object({
  concentration: z.string().optional(),
  endingN2Loading: z.string().optional(),
  bottomN2Loading: z.string().optional(),
  pO2Average: z.string().optional(),
  pO2Maximum: z.string().optional(),
  averageElevation: z.string().optional(),
  averageIntervalMinutes: z.string().optional(),
});

export type AdvancedDetailsFormValues = z.infer<typeof advancedDetailsSchema>;

interface AdvancedDetailsModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialData?: Partial<AdvancedDetailsFormValues>;
  // onSave: (data: AdvancedDetailsFormValues) => void;
}

const AdvancedDetailsModal: React.FC<AdvancedDetailsModalProps> = ({
  isOpen,
  onClose,
  initialData = {},
  // onSave,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AdvancedDetailsFormValues>({
    resolver: zodResolver(advancedDetailsSchema),
    defaultValues: {
      concentration: initialData.concentration || '',
      endingN2Loading: initialData.endingN2Loading || '',
      bottomN2Loading: initialData.bottomN2Loading || '',
      pO2Average: initialData.pO2Average || '',
      pO2Maximum: initialData.pO2Maximum || '',
      averageElevation: initialData.averageElevation || '',
      averageIntervalMinutes: initialData.averageIntervalMinutes || '',
    },
  });

  const onSubmit = () => {
    // onSave(data);
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div className=" flex w-full   items-center justify-center z-50">
      
        
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
         <div className="w-full max-h-[60vh] md:max-h-[70vh]  overflow-auto">
            <div className="grid grid-cols-1  gap-4">
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-1">Concentration</label>
                <Controller
                  name="concentration"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.concentration ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
>
                        <SelectValue placeholder="Nitrox" />
                                                <div className="absolute right-4"><CaretDown color='black'/></div>
                        
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nitrox">Nitrox</SelectItem>
                        <SelectItem value="air">Air</SelectItem>
                        <SelectItem value="trimix">Trimix</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-1">Ending N2 Loading</label>
                <input
                  {...register('endingN2Loading')}
                  placeholder="52%"
                  className={`border ${
                    errors.endingN2Loading ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}

                />
              </div>
              
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-1">Bottom N2 Loading</label>
                <input
                  {...register('bottomN2Loading')}
                  placeholder="65%"
                              className={`border ${
                    errors.bottomN2Loading ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}

                />
              </div>
              
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-1">PO2 (Average)</label>
                <input
                  {...register('pO2Average')}
                  placeholder="0.5 ATA"
                                  className={`border ${
                    errors.pO2Average ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
 
                />
              </div>
              
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-1">PO2 (Maximum)</label>
                <input
                  {...register('pO2Maximum')}
                  placeholder="0.7 ATA"
                                  className={`border ${
                    errors.pO2Maximum ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
 
                />
              </div>
              
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-1">Average Elevation</label>
                <input
                  {...register('averageElevation')}
                  placeholder="Average Elevation"
                                  className={`border ${
                    errors.averageElevation ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
 
                />
              </div>
              
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-1">Average Interval Minutes</label>
                <Controller
                  name="averageIntervalMinutes"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border ${
                    errors.averageIntervalMinutes ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] relative w-full text-black text-sm flex-1  bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
>
                        <SelectValue placeholder="4 mins" />
                          <Clock className="h-4 w-4 ml-2 justify-end absolute right-4" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 mins</SelectItem>
                        <SelectItem value="4">4 mins</SelectItem>
                        <SelectItem value="5">5 mins</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
          
          
                  <div className="py-4 border-t border-gray-200 flex justify-end space-x-2">
                    <Button type="button" variant="outlined" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                      Save Changes
                    </Button>
                  </div>
        </form>
    </div>
  );
};

export default AdvancedDetailsModal;