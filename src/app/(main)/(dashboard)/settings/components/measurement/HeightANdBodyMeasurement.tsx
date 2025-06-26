import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Layers, Zap, Check } from 'lucide-react';

// Types
interface MeasurementOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isDefault?: boolean;
}

// Zod schema
const measurementSchema = z.object({
  heightUnit: z.string().min(1, 'Please select a height unit'),
  bodyType: z.string().min(1, 'Please select a body type')
});

type MeasurementFormData = z.infer<typeof measurementSchema>;

// Height measurement options
const heightOptions: MeasurementOption[] = [
  {
    id: 'centimeters',
    name: 'Centimeters',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    description: 'Centimeters are metric units of measurement that are useful for measuring lengths of small objects.',
    isDefault: true,
  },
  {
    id: 'feet',
    name: 'Feet (FT)',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    description: 'one foot comprises 12 inches, and one yard comprises three feet.',
  },
  {
    id: 'inches',
    name: 'Inches',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    description: 'A unit of linear measure equal to one twelfth of a foot (2.54 cm).',
  },
];

// Body type options
const bodyTypeOptions: MeasurementOption[] = [
  {
    id: 'muscular',
    name: 'Muscular',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    description: 'Having well-developed muscles; brawny',
    isDefault: true,
  },
  {
    id: 'slim',
    name: 'Slim',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    description: 'An attractively thin and well-shaped body',
  },
  {
    id: 'plump',
    name: 'Plump (Fat)',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    description: 'The degree to which a person is overweight.',
  },
];

const MeasurementSection: React.FC<{
  title: string;
  options: MeasurementOption[];
  fieldName: 'heightUnit' | 'bodyType';
  control: any;
  selectedValue: string;
}> = ({ title, options, fieldName, control, selectedValue }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <>
              {options.map((option) => (
                <div
                  key={option.id}
                  className="relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
                  onClick={() => field.onChange(option.id)}
                >
                  {/* Header section with conditional orange border */}
                  <div className={`flex items-center justify-between p-4 border-b border-gray-200 rounded-t-lg ${
                    field.value === option.id
                      ? 'border border-orange-400 bg-[#F7F7F7]'
                      : ''
                  }`}>
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full bg-[#F7F7F7] flex items-center justify-center flex-shrink-0">
                        {option.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-medium text-gray-900">
                        {option.name}
                      </h3>
                    </div>

                    {/* Radio Button */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      field.value === option.id
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-orange-500'
                    }`}>
                      {field.value === option.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Description section */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-gray-600 text-sm leading-relaxed max-w-[80%] flex-1">
                        {option.description}
                      </p>
                      
                      {option.isDefault && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex-shrink-0">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
};

const HeightAndBodyMeasurement: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<MeasurementFormData>({
    resolver: zodResolver(measurementSchema),
    defaultValues: {
      heightUnit: 'centimeters',
      bodyType: 'muscular'
    }
  });

  const selectedHeightUnit = watch('heightUnit');
  const selectedBodyType = watch('bodyType');

  const onSubmit = (data: MeasurementFormData) => {
    console.log('Form submitted:', data);
    const selectedHeightDetails = heightOptions.find(option => option.id === data.heightUnit);
    const selectedBodyTypeDetails = bodyTypeOptions.find(option => option.id === data.bodyType);
    console.log('Selected height unit:', selectedHeightDetails);
    console.log('Selected body type:', selectedBodyTypeDetails);
  };

  return (
    <div className="max-w-2xl min-h-screen p-6">
      {/* Header */}
   

      {/* Height Measurement Section */}
      <MeasurementSection
        title="Height Measurement"
        options={heightOptions}
        fieldName="heightUnit"
        control={control}
        selectedValue={selectedHeightUnit}
      />

      {/* Body Type Section */}
      <MeasurementSection
        title="Body Type"
        options={bodyTypeOptions}
        fieldName="bodyType"
        control={control}
        selectedValue={selectedBodyType}
      />

      {/* Error Messages */}
      {(errors.heightUnit || errors.bodyType) && (
        <div className="mb-4 space-y-1">
          {errors.heightUnit && (
            <p className="text-sm text-red-600" role="alert">
              {errors.heightUnit.message}
            </p>
          )}
          {errors.bodyType && (
            <p className="text-sm text-red-600" role="alert">
              {errors.bodyType.message}
            </p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          disabled={!selectedHeightUnit || !selectedBodyType}
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default HeightAndBodyMeasurement;