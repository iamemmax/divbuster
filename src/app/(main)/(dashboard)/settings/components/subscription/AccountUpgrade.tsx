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

// Plan data - corrected to match your original structure
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
    subtitle: 'Tokens for a Lifetime.',
    description: 'Includes a manual dive upload which can contain a maximum of 25 photos and Six (3 minute video) per dive.',
    isLifetime: true,
  }
];

// Current benefits data - matching your UI
const currentBenefits = [
  {
    id: 'manual-dive',
    name: 'Manual Dive',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    status: 'Active',
    value: '0',
    subtitle: 'Token per Dive forever.',
    description: 'You can upload a maximum of 10 photos and a minute Video per dive for free.'
  },
  {
    id: 'dive-sync',
    name: 'Dive Sync',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    status: 'Active',
    value: '1',
    subtitle: 'Token per Dive forever.',
    description: 'Your dives will automatically sync to your account via your smart watch. You can unsubscribe or unlink your device any time.'
  },
  {
    id: 'view-buddy-certificate',
    name: 'View Buddy Certificate',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    status: 'Active',
    value: '4',
    subtitle: 'Token per dive for 24 hours.',
    description: 'You will be able to view your buddy official certificate for just 24 hours.'
  },
  {
    id: 'find-buddy',
    name: 'Find Buddy',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    status: 'Inactive',
    value: '75',
    subtitle: 'Token per Buddy search.',
    description: 'Find your close buddy/friends or family around you via our sophisticated map search.'
  },
  {
    id: 'book-trip-equipment',
    name: 'Book a Trip & Equipment',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    status: 'Active',
    value: '4.5%',
    subtitle: 'of total amount spent.',
    description: 'Your dives will automatically sync to your account via your smart watch. You can unsubscribe anytime.'
  },
  {
    id: 'book-trip',
    name: 'Book a Trip',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    status: 'Inactive',
    value: '3.5%',
    subtitle: 'of total amount spent.',
    description: 'Book a one time trip with your buddy/Friends or family with our Trip booking system'
  },
  {
    id: 'rent-equipment',
    name: 'Rent Equipment',
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    status: 'Inactive',
    value: '2%',
    subtitle: 'of total amount spent.',
    description: 'Book a one time trip with your buddy/Friends or family with our Trip booking system'
  }
];

const AccountUpgrade: React.FC = () => {
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
          <p className="lg:text-3xl text-lg text-[#344054] font-semibold font-archivo mb-1">0</p>
          <p className="text-[#667085] font-archivo text-sm">{subtitle}</p>
        </div>
      );
    }
    
    return (
       <div className="flex items-center gap-3 mb-2">
          <p className="lg:text-3xl text-lg text-[#344054] font-semibold font-archivo mb-1">{tokens}</p>
          <p className="text-[#667085] font-archivo text-sm">{subtitle}</p>
        </div>
    );
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Current Account Benefits Section */}
      <div>
        <h2 className="text-xl font-medium text-[#09090B] font-archivo mb-6">
          Current Account Upgrade/Benefits
        </h2>
        
        <div className="space-y-4">
          {currentBenefits.map((benefit) => (
            <div key={benefit.id} className="bg-white rounded-lg border border-[#EAECF0]">
              <div className="flex items-center justify-between mb-3 border-b  p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FEF6F4] flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-base font-medium text-[#344054] font-archivo">
                    {benefit.name}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  benefit.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {benefit.status}
                </span>
              </div>
              
              <div className="flex items-center gap-3  px-4 pt-2">
                <p className="text-2xl font-semibold text-[#344054] font-archivo">
                  {benefit.value}
                </p>
                <p className="text-[#667085] font-archivo text-sm">
                  {benefit.subtitle}
                </p>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed px-4 py-2">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default AccountUpgrade;
