import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Layers, Zap, Check } from 'lucide-react';

// Types
interface PlanOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isDefault?: boolean;
}

// Zod schema
const accountPlanSchema = z.object({
  selectedPlan: z.string().min(1, 'Please select a plan')
});

type AccountPlanFormData = z.infer<typeof accountPlanSchema>;

// Plan data
const planOptions: PlanOption[] = [
  {
    id: 'mile',
    name: 'Kilogram (KG)',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    description: 'The SI unit of mass (equivalent to approximately 2.205 lb), first introduced as a unit of mass for the metric system.',
    isDefault: true,
  },
  {
    id: 'metre',
    name: 'Pound (lb)',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    description: 'The pound or pound-mass is a unit of mass used in both the British imperial and United States customary systems of measurement.',
  },
  {
    id: 'kilometre',
    name: 'Gram',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    description: 'The gram is a unit of mass in the International System of Units (SI) equal to one thousandth of a kilogram.',
  },
];

const WeightMeasurement: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<AccountPlanFormData>({
    resolver: zodResolver(accountPlanSchema),
    defaultValues: {
      selectedPlan: 'mile'
    }
  });

  const selectedPlan = watch('selectedPlan');

  const onSubmit = (data: AccountPlanFormData) => {
    console.log('Form submitted:', data);
    const selectedPlanDetails = planOptions.find(plan => plan.id === data.selectedPlan);
    console.log('Selected plan details:', selectedPlanDetails);
  };

  return (
    <div className="max-w-2xl  min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Distance Measurement
        </h1>
      </div>

      {/* Plan Selection */}
      <div className="space-y-4">
        <Controller
          name="selectedPlan"
          control={control}
          render={({ field }) => (
            <>
              {planOptions.map((plan) => (
                <div
                  key={plan.id}
                  className="relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-all "
                  onClick={() => field.onChange(plan.id)}
                >
                  {/* Header section with conditional orange border */}
                  <div className={`flex items-center justify-between p-4 border-b border-gray-200 rounded-t-lg ${
                    field.value === plan.id
                      ? 'border border-orange-400 bg-[#F7F7F7] '
                      : ''
                  }`}>
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full bg-[#F7F7F7] flex items-center justify-center flex-shrink-0">
                        {plan.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-medium text-gray-900">
                        {plan.name}
                      </h3>
                    </div>

                    {/* Radio Button */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      field.value === plan.id
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-orange-500'
                    }`}>
                      {field.value === plan.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Description section */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-gray-600 text-sm leading-relaxed max-w-[80%] flex-1">
                        {plan.description}
                      </p>
                      
                      {plan.isDefault && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex-shrink-0">
                          Default
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Selected overlay */}
                  {/* {field.value === plan.id && (
                    <div className="absolute inset-0 bg-orange-50 bg-opacity-50 rounded-lg pointer-events-none"></div>
                  )} */}
                </div>
              ))}
            </>
          )}
        />
        
        {errors.selectedPlan && (
          <p className="text-sm text-red-600" role="alert">
            {errors.selectedPlan.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-8 py-3 rounded-lg font-medium transition-colors "
          disabled={!selectedPlan}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default WeightMeasurement;
