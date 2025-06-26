import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronDown, Layers, Zap } from 'lucide-react';

// Types
interface PlanOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  tokens: number | string;
  subtitle: string;
  description: string;
  isLifetime?: boolean;
}

type PlanType = 'one' | 'two' | 'three';

// Zod schema
const accountPlanSchema = z.object({
  planType: z.string().min(1, 'Please select a plan type'),
  selectedPlan: z.string().min(1, 'Please select a plan')
});

type AccountPlanFormData = z.infer<typeof accountPlanSchema>;

// Plan data
const planTypes: PlanType[] = ['one', 'two', 'three'];

const planOptions: PlanOption[] = [
  {
    id: 'free',
    name: 'Free Plan',
    icon: <Layers className="w-4 h-4 text-orange-500" />,
    tokens: 0,
    subtitle: 'Token per year',
    description: 'Includes a manual dive upload which contain a max. of 10 photos and a minute video per dive.',
  },
  {
    id: 'solid',
    name: 'Solid Plan',
    icon: <Layers className="w-4 h-4 text-orange-500" />,
    tokens: 150,
    subtitle: 'Tokens for a Lifetime.',
    description: 'Includes a manual dive upload which can contain a maximum of 15 photos and Three (3 minute video) per dive.',
    isLifetime: true,
  },
  {
    id: 'fun',
    name: 'Fun Plan',
    icon: <Zap className="w-4 h-4 text-orange-500" />,
    tokens: 200,
    subtitle: 'Tokens for a Lifetime.',
    description: 'Includes a manual dive upload which can contain a maximum of 20 photos and Five (2 minute video) per dive.',
    isLifetime: true,
  },
  {
    id: 'divebuster',
    name: 'DiveBuster plan',
    icon: <Zap className="w-4 h-4 text-orange-500" />,
    tokens: 250,
    subtitle: '',
    description: 'Includes a manual dive upload which can contain a maximum of 25 photos and Six (3 minute video) per dive.',
    isLifetime: true,
  }
];

const AccountSubscription: React.FC = () => {
  const [isPlanTypeDropdownOpen, setIsPlanTypeDropdownOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<AccountPlanFormData>({
    resolver: zodResolver(accountPlanSchema),
    defaultValues: {
      planType: 'Lifetime Plan',
      selectedPlan: ''
    }
  });

  const selectedPlanType = watch('planType');
  const selectedPlan = watch('selectedPlan');

  const onSubmit = (data: AccountPlanFormData) => {
    console.log('Form submitted:', data);
    const selectedPlanDetails = planOptions.find(plan => plan.id === data.selectedPlan);
    console.log('Selected plan details:', selectedPlanDetails);
    // Handle form submission here
  };

  const formatTokenDisplay = (tokens: number | string, subtitle: string): React.ReactNode => {
    if (tokens === 0) {
      return (
        <div className="flex items-center gap-3 mb-2">
          <p className="lg:text-3xl text-lg   text-[#344054] font-semibold font-archivo mb-1">0</p>
          <p className="text-[#667085] font-archivo text-sm">{subtitle}</p>
        </div>
      );
    }
    
    return (
       <div className="flex items-center gap-3 mb-2">
          <p className="lg:text-3xl text-lg   text-[#344054] font-semibold font-archivo mb-1">{tokens}</p>
          <p className="text-[#667085] font-archivo text-sm">{subtitle}</p>
        </div>
    );
  };

  return (
    <div className="max-w-2xl ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="md:text-2xl text-xl font-medium text-[#09090B] font-archivo mb-1">
          My Account Plan
        </h1>
        <p className="text-[#36394A] font-archivo font-medium text-sm mb-6">
          Choose your preferred Account Plan
        </p>

        {/* Plan Type Dropdown */}
        <div className="mb-8">
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => setIsPlanTypeDropdownOpen(!isPlanTypeDropdownOpen)}
              className="w-full px-4 py-3 text-left text-sm  border border-[#ECEFF3]  bg-[#F6F8FA] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
              aria-haspopup="listbox"
              aria-expanded={isPlanTypeDropdownOpen}
            >
              <span className="text-gray-900 font-medium">{selectedPlanType}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isPlanTypeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isPlanTypeDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {planTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setValue('planType', type);
                      setIsPlanTypeDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    role="option"
                  >
                    {type} Year(s) Plan
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {errors.planType && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.planType.message}
            </p>
          )}
        </div>
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
                  className={`relative  bg-white rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                    field.value === plan.id
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => field.onChange(plan.id)}
                >
                  <div className="flex flex-col">
                    <div className="flex-1 w-full">

                      {/* Plan Header */}
                      <div className="flex items-center justify-between p-[.875rem] border-b border-[#EAECF0] ">
                        <div className="flex items-center gap-4 flex-1">
                       <div className="w-8 rounded-full bg-[#FEF6F4] flex justify-center items-center shrink-0 h-8"> {plan.icon}</div>
                        <h3 className="md:text-base text-sm font-medium text-[#344054] font-archivo  ml-3">
                          {plan.name}
                        </h3>
                        
                      </div>

                       {/* Radio Button */}
                    <div className=" p-3 flex-shrink-0">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        field.value === plan.id
                          ? 'border-[#FF6500] bg-[#FF6500]'
                          : 'border-[FF6500]'
                      }`}>
                        {field.value === plan.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                        </div>

                      {/* Token Display */}
                    </div>
                    <div className="p-[14px]">
                      {formatTokenDisplay(plan.tokens, plan.subtitle)}

                      {/* Plan Description */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {plan.description}
                      </p>

                    </div>

                   
                  {/* Selection Overlay */}
                  {field.value === plan.id && (
                    <div className="absolute inset-0 bg-blue-50 bg-opacity-20 rounded-lg pointer-events-none"></div>
                  )}
                  </div>

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
                         className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-8 py-3 rounded-md font-medium transition-colors"
          disabled={!selectedPlan}
        >
          Select Plan
        </button>
      </div>

    </div>
  );
};

export default AccountSubscription;
