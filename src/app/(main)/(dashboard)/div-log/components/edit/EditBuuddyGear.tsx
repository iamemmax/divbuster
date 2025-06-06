import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Dialog, DialogBody, DialogContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core';
import { Clock } from 'lucide-react';
import { CaretDown } from '@/components/icons';

// Define the validation schema with Zod
const advancedDetailsSchema = z.object({
  smartWatches: z.string().optional(),
  divComputer: z.string().optional(),
  bcd: z.string().optional(),
  weight: z.string().optional(),
  mask: z.string().optional(),
  regulator: z.string().optional(),
  fins: z.string().optional(),
  wetSuit: z.string().optional(),
});

export type GearLogDetailsFormValues = z.infer<typeof advancedDetailsSchema>;

interface AdvancedDetailsModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialData?: Partial<GearLogDetailsFormValues>;
  // onSave: (data: GearLogDetailsFormValues) => void;
}

const EditBuuddyGear: React.FC<AdvancedDetailsModalProps> = ({
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
  } = useForm<GearLogDetailsFormValues>({
    resolver: zodResolver(advancedDetailsSchema),
    defaultValues: {
      smartWatches: initialData.smartWatches || '',
      divComputer: initialData.divComputer || '',
      bcd: initialData.bcd || '',
      weight: initialData.weight || '',
      mask: initialData.mask || '',
      regulator: initialData.regulator || '',
      fins: initialData.fins || '',
      wetSuit: initialData.wetSuit || '',
    },
  });

  const onSubmit = (data: GearLogDetailsFormValues) => {
    // onSave(data);
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog modal={true} open={isOpen}>
      <DialogContent className="w-full !max-w-[57.3125rem] ">
        <DialogBody className="p-0  px-4 md:px-8 pt-8  w-full !max-h-[95vh] md:!max-h-[90vh] !max-w-[57.3125rem] ">
               <div className=" flex w-full  flex-col   z-50 ">
       <div className=" border-gray-200 flex justify-between items-center border-b  border-opacity-55 pb-4">
          <h2 className="text-xl font-semibold font-archivo  text-[#101828]">Log your Gear</h2>
          
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
         <div className="w-full max-h-[60vh] md:max-h-[70vh]  overflow-auto">
            <div className="grid grid-cols-1  gap-4">
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-1">Smart Watches</label>
                <Controller
                  name="smartWatches"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.smartWatches ? "border-red-500" : "border-[#E2E8F0]"
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

                <label className="block text-sm font-medium text-gray-700 mb-1">Dive Computer</label>
                <Controller
                  name="divComputer"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.divComputer ? "border-red-500" : "border-[#E2E8F0]"
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

                <label className="block text-sm font-medium text-gray-700 mb-1">BCD</label>
                <Controller
                  name="bcd"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.bcd ? "border-red-500" : "border-[#E2E8F0]"
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

                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                <Controller
                  name="weight"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.weight ? "border-red-500" : "border-[#E2E8F0]"
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

                <label className="block text-sm font-medium text-gray-700 mb-1">Mask</label>
                <Controller
                  name="mask"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.mask ? "border-red-500" : "border-[#E2E8F0]"
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

                <label className="block text-sm font-medium text-gray-700 mb-1">Regulator</label>
                <Controller
                  name="regulator"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.regulator ? "border-red-500" : "border-[#E2E8F0]"
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

                <label className="block text-sm font-medium text-gray-700 mb-1">Fins</label>
                <Controller
                  name="fins"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.fins ? "border-red-500" : "border-[#E2E8F0]"
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

                <label className="block text-sm font-medium text-gray-700 mb-1">WetSuit</label>
                <Controller
                  name="wetSuit"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.wetSuit ? "border-red-500" : "border-[#E2E8F0]"
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
        </DialogBody>
             </DialogContent>
           </Dialog> 
  );
}

export default EditBuuddyGear;
