import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core';
import { Switch } from '@/components/core';
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

interface MoreLogDetailsModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialData?: Partial<MoreLogDetailsFormValues>;
  // onSave: (data: MoreLogDetailsFormValues) => void;
}

const MoreLogDetailsModal: React.FC<MoreLogDetailsModalProps> = ({
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

  const onSubmit = () => {
    // onSave(data);
    // onClose();
  };

  if (!isOpen) return null;

  const frequentCategories = ['Wall', 'Warm water', 'Recreational'];
  const otherCategories = [
    'Cave', 'Cold water', 'Commercial', 'Deep', 'Drift', 
    'Freediving', 'Ice', 'Wreck', 'Scientific', 'Sidemount', 
    'Reef/Ocean', 'Pool', 'Refresher', 'Night', 'Search & Rescue', 
    'Technical', 'Wreck', 'Spearfishing', 'Training/Certification'
  ];

  const entryTypes = ['Shore', 'Boat', 'Others'];
  const bodyOfWaterTypes = ['Quarry', 'Lake', 'Ocean', 'River', 'Others'];

  return (
    <div className=" flex items-center w-full justify-center z-50">
     
        
        <form onSubmit={handleSubmit(onSubmit)}>
       
          <div className="w-full max-h-[60vh] md:max-h-[70vh]  overflow-auto">
            <div>
              <div className="flex rounded-lg items-center border py-3 px-5 border-[#EAECF0] border-opacity-80  justify-between mb-2">
                <label className="text-base font-semibold font-archivo text-[#101828]">Decompression Dive</label>
                <Controller
                  name="isDecompressionDive"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            
            <div>
              <p className="block text-base md:text-xl font-medium text-black font-archivo mt-4">Select all that Apply</p>
              <p className="text-sm md:text-base text-black mb-2 mt-3 font-archivo font-medium">Frequently used</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {frequentCategories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant="outlined"
                    className={`rounded-lg py-[10px] px-4 ${
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
              
              <p className="text-base font-semibold font-archivo text-black mb-2">Others</p>
              <div className="flex flex-wrap gap-2 md:gap-5 mb-4">
                {otherCategories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant="outlined"
                    className={`rounded-lg py-[10px] px-4 text-xs ${
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
            
          
               <div className='grid grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-2 items-center gap-5'>

              <label className="block text-sm font-medium text-gray-700 mb-1">Surface Interval</label>
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
              <label className="block text-base font-semibold font-archivo text-black mb-2">Entry Type</label>
              <div className="flex flex-wrap gap-2">
                {entryTypes.map((type) => (
                  <Controller
                    key={type}
                    name="entryType"
                    control={control}
                    render={({ field }) => (
                      <Button
                        type="button"
                        variant="outlined"
                        className={`rounded-lg ${
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
              <label className="text-base font-semibold font-archivo text-black mb-2">Body of Water</label>
              <div className="flex flex-wrap mt-2 gap-2">
                {bodyOfWaterTypes.map((type) => (
                  <Controller
                    key={type}
                    name="bodyOfWater"
                    control={control}
                    render={({ field }) => (
                      <Button
                        type="button"
                        variant="outlined"
                        className={`rounded-lg ${
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
      </div>
  );
};

export default MoreLogDetailsModal;

