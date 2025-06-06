import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core';
import { Clock } from 'lucide-react';
import { CaretDown } from '@/components/icons';

// Define the validation schema with Zod
const logSummarySchema = z.object({
  name: z.string().min(1, { message: "Dive name is required" }),
  diveType: z.string().min(1, { message: "Dive type is required" }),
  diveNumber: z.string().min(1, { message: "Dive number is required" }),
  maximumDepth: z.string().min(1, { message: "Maximum depth is required" }),
  diveDuration: z.string().min(1, { message: "Dive duration is required" }),
  diveDate: z.string().min(1, { message: "Dive date is required" }),
  diveTime: z.string().min(1, { message: "Dive time is required" }),
  diveLocation: z.string().min(1, { message: "Dive location is required" }),
});

export type LogSummaryFormValues = z.infer<typeof logSummarySchema>;

interface LogSummaryModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialData?: Partial<LogSummaryFormValues>;
  // onSave: (data: LogSummaryFormValues) => void;
}

const LogSummaryModal: React.FC<LogSummaryModalProps> = ({
  isOpen,
  onClose,
  initialData = {},
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LogSummaryFormValues>({
    resolver: zodResolver(logSummarySchema),
    defaultValues: {
      name: initialData.name || '',
      diveType: initialData.diveType || '',
      diveNumber: initialData.diveNumber || '',
      maximumDepth: initialData.maximumDepth || '',
      diveDuration: initialData.diveDuration || '',
      diveDate: initialData.diveDate || '',
      diveTime: initialData.diveTime || '',
      diveLocation: initialData.diveLocation || '',
    },
  });

  const onSubmit = (data: LogSummaryFormValues) => {
    // onSave(data);
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div className=" flex items-center justify-center z-50">
      <div className="w-full">
       
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-h-[60vh] md:max-h-[70vh]  overflow-auto">
            <div className="grid grid-cols-1 gap-4">
              <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>
                <label className="block  text-sm font-medium text-gray-700 mb-1">Dive Name</label>
                <input
                  {...register('name')}
                  placeholder="Olvia"
                  className={`border ${
                    errors.name ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              
               <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dive Type</label>
                <Controller
                  name="diveType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger  className={`border relative ${
                    errors.diveType ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
>
                        <SelectValue placeholder="Single Gas" />
                          <div className="absolute right-4"><CaretDown color='black'/></div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-gas">Single Gas</SelectItem>
                        <SelectItem value="multi-gas">Multi Gas</SelectItem>
                        <SelectItem value="rebreather">Rebreather</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.diveType && <p className="text-red-500 text-xs mt-1">{errors.diveType.message}</p>}
              </div>
              
               <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dive Number</label>
                <input
                  {...register('diveNumber')}
                  placeholder="#DV123789"
                 className={`border ${
                    errors.diveNumber ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                />
                {errors.diveNumber && <p className="text-red-500 text-xs mt-1">{errors.diveNumber.message}</p>}
              </div>
              
           <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Depth</label>
                <input
                  {...register('maximumDepth')}
                  placeholder="Enter the Max. Depth"
               className={`border ${
                    errors.maximumDepth ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                />
                {errors.maximumDepth && <p className="text-red-500 text-xs mt-1">{errors.maximumDepth.message}</p>}
              </div>
              
           <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dive Duration</label>
                <input
                  {...register('diveDuration')}
                  placeholder="Enter Dive Duration"
                 className={`border ${
                    errors.diveDuration ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
       
                />
                {errors.diveDuration && <p className="text-red-500 text-xs mt-1">{errors.diveDuration.message}</p>}
              </div>
              
           <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dive Date</label>
                <Controller
                  name="diveDate"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.diveDate ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
>
                        <SelectValue placeholder="Select Date" />
                          <div className="absolute right-4"><CaretDown color='black'/></div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="custom">Custom Date</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.diveDate && <p className="text-red-500 text-xs mt-1">{errors.diveDate.message}</p>}
              </div>
              
           <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dive Time</label>
                <Controller
                  name="diveTime"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border ${
                    errors.diveTime ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black flex relative  text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
>
                        <SelectValue placeholder="Pacific Standard Time (PST)" className=''/>
                        <Clock className="h-4 w-4 ml-2 justify-end absolute right-4" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.diveTime && <p className="text-red-500 text-xs mt-1">{errors.diveTime.message}</p>}
              </div>
              
           <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dive Location</label>
                <Controller
                  name="diveLocation"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`border relative ${
                    errors.diveLocation ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
>
                        <SelectValue placeholder="Select Enter Dive Location" />
                          <div className="absolute right-4"><CaretDown color='black'/></div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="location1">Bali, Indonesia</SelectItem>
                        <SelectItem value="location2">Great Barrier Reef, Australia</SelectItem>
                        <SelectItem value="location3">Red Sea, Egypt</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.diveLocation && <p className="text-red-500 text-xs mt-1">{errors.diveLocation.message}</p>}
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
    </div>
  );
};

export default LogSummaryModal;