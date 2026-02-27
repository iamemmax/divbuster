import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Dialog, DialogBody, DialogContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core';
import { CaretDown } from '@/components/icons';
import DiveWatch from '@/app/icons/(dashboard)/DiveWatch';

// Define the validation schema with Zod
const advancedDetailsSchema = z.object({
  device_type: z.string().optional(),
  device_brand: z.string().optional(),
  device_model: z.string().optional(),
  device_id: z.string().min(1),
  authorization_token: z.string().optional(),
  regulator: z.string().optional(),

});

export type GearLogDetailsFormValues = z.infer<typeof advancedDetailsSchema>;

interface AdvancedDetailsModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialData?: Partial<GearLogDetailsFormValues>;
  // onSave: (data: GearLogDetailsFormValues) => void;
}

const DiveComputer: React.FC<AdvancedDetailsModalProps> = ({
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
      device_type: initialData.device_type || '',
      device_brand: initialData.device_brand || '',
      device_model: initialData.device_model || '',
      device_id: initialData.device_id || '',
      authorization_token: initialData.authorization_token || '',
      regulator: initialData.regulator || '',
    
    },
  });

  const onSubmit = (_data: GearLogDetailsFormValues) => {
    // onSave(data);
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog modal={true} open={isOpen}>
      <DialogContent className="w-full !max-w-[57.3125rem] ">
        <DialogBody className="p-0  px-4 md:px-8 pt-8  w-full !max-h-[95vh] overflow-y-hidden md:!max-h-[90vh] !max-w-[57.3125rem] ">
               <div className=" flex w-full  flex-col   z-50 ">
                
       <div className=" border-gray-200 flex justify-between items-center border-b  border-opacity-55 pb-4">
          <h2 className="text-xl font-semibold font-archivo  text-[#101828]">Dive Computer</h2>
          
        </div>

       
      
      {/* Connection Status */}
     
        
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>

            
         <div className="w-full max-h-[60vh] md:max-h-[73vh]  overflow-y-auto">
              <div className="px-6 py-4 flex justify-center items-center">
        <div className="bg-[#ECFDF3] rounded-full px-4 py-2 flex items-center gap-2 w-fit">
          <div className="w-2 h-2 bg-[#027A48] rounded-full"></div>
          <span className="text-[#027A48] font-archivo text-sm font-semibold">Device Connected</span>
        </div>
      </div>
           <div className="relative bg-white flex justify-center" >
        <div className="relative">
          {/* Watch Body */}
           <DiveWatch/>
         
        </div>
      </div>
            <div className="grid grid-cols-1  gap-4">
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-1">Divice Type</label>
                <Controller
                  name="device_type"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.device_type ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
>
                        <SelectValue placeholder="Nitrox" />
                                                <div className="absolute right-4"><CaretDown color='black'/></div>
                        
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="watch">Watch</SelectItem>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-1">Device Brand</label>
                <Controller
                  name="device_brand"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.device_brand ? "border-red-500" : "border-[#E2E8F0]"
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

                <label className="block text-sm font-medium text-gray-700 mb-1">Device Model</label>
                <Controller
                  name="device_model"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.device_model ? "border-red-500" : "border-[#E2E8F0]"
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

                <label className="block text-sm font-medium text-gray-700 mb-1">Device Id</label>
                <input
                  {...register('device_id')}
                  placeholder="52%"
                  className={`border ${
                    errors.device_id ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}

                />
              </div>
<div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-1">Authorization Token</label>
                <input
                  {...register('authorization_token')}
                  placeholder="52%"
                  className={`border ${
                    errors.authorization_token ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}

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
            
              
           
            </div>
          </div>
          
          
                  <div className="py-4 border-t border-gray-200 flex justify-end space-x-2 max-h-[10vh]">
                    <Button type="button" variant="outlined" className='py-3' onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#ff0000] py-3 text-white">
                     Remove Dive Equipment
                    </Button>
                  </div>
        </form>
    </div>
        </DialogBody>
             </DialogContent>
           </Dialog> 
  );
}

export default DiveComputer;

