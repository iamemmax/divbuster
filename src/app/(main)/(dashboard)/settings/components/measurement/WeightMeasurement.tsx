import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Layers } from 'lucide-react';

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
// gear______gear
// Plan data
const planOptions: PlanOption[] = [
  {
    id: 'xxs',
    name: 'XX-Small',
    icon: <Layers className="size-5 text-orange-500" />,
    description: 'Extra Extra Small size for petite builds',
    isDefault: false,
  },
  {
    id: 'xs',
    name: 'X-Small',
    icon: <Layers className="size-5 text-orange-500" />,
    description: 'Extra Small size for smaller builds',
  },
  {
    id: 's',
    name: 'Small',
    icon: <Layers className="size-5 text-orange-500" />,
    description: 'Small size for compact builds',
  },
  {
    id: 'm',
    name: 'Medium',
    icon: <Layers className="size-5 text-orange-500" />,
    description: 'Medium size for average builds',
    isDefault: true,
  },
  {
    id: 'l',
    name: 'Large',
    icon: <Layers className="size-5 text-orange-500" />,
    description: 'Large size for bigger builds',
  },
  {
    id: 'xl',
    name: 'X-Large',
    icon: <Layers className="size-5 text-orange-500" />,
    description: 'Extra Large size for extended builds',
  },
  {
    id: 'xxl',
    name: 'XX-Large',
    icon: <Layers className="size-5 text-orange-500" />,
    description: 'Extra Extra Large size for maximum builds',
  },
  {
    id: 'xxxl',
    name: 'XXX-Large',
    icon: <Layers className="size-5 text-orange-500" />,
    description: 'Triple Extra Large size for the largest builds',
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

  const onSubmit = () => {
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
                      <div className="size-10 rounded-full bg-[#F7F7F7] flex items-center justify-center shrink-0">
                        {plan.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-medium text-gray-900">
                        {plan.name}
                      </h3>
                    </div>

                    {/* Radio Button */}
                    <div className={`size-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      field.value === plan.id
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-orange-500'
                    }`}>
                      {field.value === plan.id && (
                        <div className="size-2 bg-white rounded-full"></div>
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
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full shrink-0">
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
