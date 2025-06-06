import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Dialog, DialogBody, DialogContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core';
import { Switch } from '@/components/core';
import { Clock } from 'lucide-react';
import { CaretDown } from '@/components/icons';

// Define the validation schema with Zod
const moreLogDetailsSchema = z.object({
  isDecompressionDive: z.boolean().optional(),
  diveCategories: z.array(z.string()).optional(),
  surfaceInterval: z.string().optional(),
  weight: z.string().optional(),
  entryType: z.string().optional(),
  bodyOfWater: z.string().optional(),
});

export type MoreLogDetailsFormValues = z.infer<typeof moreLogDetailsSchema>;

interface EnvironmentalConditionProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialData?: Partial<MoreLogDetailsFormValues>;
  // onSave: (data: MoreLogDetailsFormValues) => void;
}

const EnvironmentalCondition: React.FC<EnvironmentalConditionProps> = ({
  isOpen,
  onClose,
  initialData = {},
  // onSave,
}) => {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    initialData.diveCategories || []
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState:{errors}
  } = useForm<MoreLogDetailsFormValues>({
    resolver: zodResolver(moreLogDetailsSchema),
    defaultValues: {
      isDecompressionDive: initialData.isDecompressionDive || false,
      diveCategories: initialData.diveCategories || [],
      surfaceInterval: initialData.surfaceInterval || '',
      weight: initialData.weight || '',
      entryType: initialData.entryType || '',
      bodyOfWater: initialData.bodyOfWater || '',
    },
  });

  // Update form value when categories change
  React.useEffect(() => {
    setValue('diveCategories', selectedCategories);
  }, [selectedCategories, setValue]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const onSubmit = (data: MoreLogDetailsFormValues) => {
    // onSave(data);
    // onClose();
  };

  if (!isOpen) return null;

  const frequentCategories = ['Fresh Water', 'Salt Water', 'Custom Density'];
 
  const entryTypes = ['None', 'Light Current', 'Morderate Current', 'Strong Current'];
  const bodyOfWaterTypes = ['Flat Condition', 'Small Waves', 'Large Waves'];

  return (
   <Dialog modal={true} open={isOpen}>
      <DialogContent className="w-full !max-w-[57.3125rem] ">
        <DialogBody className="p-0  px-4 md:px-8 pt-8  w-full !max-h-[95vh] md:!max-h-[90vh] !max-w-[57.3125rem] ">

        <div className=" border-gray-200 flex justify-between items-center border-b  border-opacity-55 pb-4">
          <h2 className="text-xl font-semibold font-archivo  text-[#101828]">Environmental Conditions</h2>
          
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
       
          <div className="w-full max-h-[60vh] md:max-h-[70vh]  overflow-auto">
            
            
            <div>
              <p className="block text-base md:text-base font-medium text-black font-archivo mt-4">Select all that Apply</p>
              <p className="text-sm md:text-base text-black mb-2 mt-3 font-archivo font-medium">Water Type (Select one)</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {frequentCategories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant="outlined"
                    className={`rounded-lg py-[10px] text-xs font-archivo px-4 ${
                      selectedCategories.includes(category)
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
           
            </div>
            
          
               <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5'>

              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Water Temperature</label>
              <Controller
                name="surfaceInterval"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={`border relative ${
                    errors.surfaceInterval ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
>
                      <SelectValue placeholder="3h 14" />
                      {/* <Clock className="h-4 w-4 ml-2" /> */}
                        <div className="absolute right-4"><CaretDown color='black'/></div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1h</SelectItem>
                      <SelectItem value="2h">2h</SelectItem>
                      <SelectItem value="3h">3h</SelectItem>
                      <SelectItem value="3h14">3h 14</SelectItem>
                      <SelectItem value="4h">4h</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
           
               <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr]  border-b border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5'>

              <label className="block text-sm font-medium text-gray-700 sm:mb-1">Maximum Water Temperature</label>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={`border relative ${
                    errors.weight ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
>
                      <SelectValue placeholder="Select weight" />
                      <div className="absolute right-4"><CaretDown color='black'/></div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5kg">5kg</SelectItem>
                      <SelectItem value="10kg">10kg</SelectItem>
                      <SelectItem value="15kg">15kg</SelectItem>
                      <SelectItem value="20kg">20kg</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
               <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr]  border-b border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5'>

              <label className="block text-sm font-medium text-gray-700 sm:mb-1">Average Water Temperature</label>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={`border relative ${
                    errors.weight ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
>
                      <SelectValue placeholder="Select weight" />
                      <div className="absolute right-4"><CaretDown color='black'/></div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5kg">5kg</SelectItem>
                      <SelectItem value="10kg">10kg</SelectItem>
                      <SelectItem value="15kg">15kg</SelectItem>
                      <SelectItem value="20kg">20kg</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
            <div className=' border-b border-[#EAECF0] border-opacity-50 py-4 '>
              <label className="block text-base font-semibold font-archivo text-black mb-2">Current (Select one)</label>
              <div className="flex flex-wrap py-3 gap-2">
                {entryTypes.map((type) => (
                  <Controller
                    key={type}
                    name="entryType"
                    control={control}
                    render={({ field }) => (
                      <Button
                        type="button"
                        variant="outlined"
                        className={`rounded-lg font-archivo text-sm ${
                          field.value === type
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                        onClick={() => field.onChange(type)}
                      >
                        {type}
                      </Button>
                    )}
                  />
                ))}
              </div>
            </div>
            
            <div className=' border-b border-[#EAECF0] border-opacity-50 py-4 '>
              <label className="text-base font-semibold font-archivo text-black mb-2">Surface Conditions (Select one)</label>
              <div className="flex flex-wrap mt-2 py-3 gap-2">
                {bodyOfWaterTypes.map((type) => (
                  <Controller
                    key={type}
                    name="bodyOfWater"
                    control={control}
                    render={({ field }) => (
                      <Button
                        type="button"
                        variant="outlined"
                        className={`rounded-lg font-archivo text-sm ${
                          field.value === type
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                        onClick={() => field.onChange(type)}
                      >
                        {type}
                      </Button>
                    )}
                  />
                ))}
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
     
      </DialogBody>
             </DialogContent>
           </Dialog> 
      
  );
};

export default EnvironmentalCondition;

