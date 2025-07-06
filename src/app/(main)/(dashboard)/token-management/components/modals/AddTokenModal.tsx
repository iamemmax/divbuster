import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check, X, CreditCard } from 'lucide-react';
import { Dialog, DialogBody, DialogClose, DialogContent, DialogTitle } from '@/components/core';

// Zod schema for form validation
const tokenSchema = z.object({
  tokenPackage: z.string().min(1, 'Please select a token package'),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
  selectedCard: z.string().min(1, 'Please select a card'),
});


interface prop{
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
}
type TokenFormData = z.infer<typeof tokenSchema>;

// Token packages configuration
const tokenPackages = [
  { value: '250', label: '$250.00', tokens: 2250 },
  { value: '500', label: '$500.00', tokens: 4750 },
  { value: '1000', label: '$1000.00', tokens: 10000 },
];

const paymentMethods = [
  { value: 'card', label: 'Via Card Payment' },
  { value: 'paypal', label: 'Via PayPal' },
  { value: 'bank', label: 'Via Bank Transfer' },
];

const cards = [
  { value: 'visa-6098', label: 'VISA ******* 6098', type: 'visa' },
  { value: 'master-1234', label: 'MASTERCARD ******* 1234', type: 'mastercard' },
];

const AddTokenModal = ({isOpen,setIsOpen}:prop) => {
//   const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<TokenFormData>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      tokenPackage: '250',
      paymentMethod: 'card',
      selectedCard: 'visa-6098',
    },
    mode: 'onChange',
  });

  const watchedValues = watch();
  const selectedPackage = tokenPackages.find(pkg => pkg.value === watchedValues.tokenPackage);

  const onSubmit = (data: TokenFormData) => {
    console.log('Form submitted:', data);
    // Handle form submission here
    setIsOpen(false);
    reset();
  };

  const handleCancel = () => {
    setIsOpen(false);
    reset();
    setCurrentStep(1);
  };

  return (
    <div className="p-8 max-h-[90vh]">
     

      <Dialog modal={true} open={isOpen}>
          <DialogContent className="w-full !max-w-[917px] !max-h-[90vh] overflow-y-auto">
            <DialogBody className="p-0   w-full outline-none  ">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <DialogTitle className="text-2xl font-semibold text-gray-900">
                  Add Token to Account
                </DialogTitle>
                {/* <DialogClose asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </DialogClose> */}
              </div>

              {/* Progress Steps */}
              {/* <div className="flex items-center mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-16 h-0.5 bg-gray-300 ml-2"></div>
                </div>
                <div className="flex items-center ml-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div> */}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Add Token to Wallet Section */}
                {/* <div className="text-lg font-medium text-gray-900 mb-4">
                  Add Token to Wallet
                </div> */}

                {/* Select Token Package */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Token Package
                  </label>
                  <Controller
                    name="tokenPackage"
                    control={control}
                    render={({ field }) => (
                      <Select.Root value={field.value} onValueChange={field.onChange}>
                        <Select.Trigger className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between hover:border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all">
                          <Select.Value />
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                            <Select.Viewport className="p-1">
                              {tokenPackages.map((pkg) => (
                                <Select.Item
                                  key={pkg.value}
                                  value={pkg.value}
                                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 rounded flex items-center justify-between data-[highlighted]:bg-gray-50 data-[state=checked]:bg-orange-50"
                                >
                                  <Select.ItemText>{pkg.label}</Select.ItemText>
                                  <Select.ItemIndicator>
                                    <Check className="w-4 h-4 text-orange-500" />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    )}
                  />
                  {errors.tokenPackage && (
                    <p className="text-sm text-red-600">{errors.tokenPackage.message}</p>
                  )}
                </div>

                {/* You will Receive */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    You will Receive
                  </label>
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                    {selectedPackage?.tokens || 0} Tokens
                  </div>
                </div>

                {/* Select Payment Method */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Payment Method
                  </label>
                  <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                      <Select.Root value={field.value} onValueChange={field.onChange}>
                        <Select.Trigger className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between hover:border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all">
                          <Select.Value />
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                            <Select.Viewport className="p-1">
                              {paymentMethods.map((method) => (
                                <Select.Item
                                  key={method.value}
                                  value={method.value}
                                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 rounded flex items-center justify-between data-[highlighted]:bg-gray-50 data-[state=checked]:bg-orange-50"
                                >
                                  <Select.ItemText>{method.label}</Select.ItemText>
                                  <Select.ItemIndicator>
                                    <Check className="w-4 h-4 text-orange-500" />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    )}
                  />
                  {errors.paymentMethod && (
                    <p className="text-sm text-red-600">{errors.paymentMethod.message}</p>
                  )}
                </div>

                {/* Select Card */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Card
                  </label>
                  <Controller
                    name="selectedCard"
                    control={control}
                    render={({ field }) => (
                      <Select.Root value={field.value} onValueChange={field.onChange}>
                        <Select.Trigger className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between hover:border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                            <Select.Value />
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                            <Select.Viewport className="p-1">
                              {cards.map((card) => (
                                <Select.Item
                                  key={card.value}
                                  value={card.value}
                                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 rounded flex items-center justify-between data-[highlighted]:bg-gray-50 data-[state=checked]:bg-orange-50"
                                >
                                  <div className="flex items-center space-x-3">
                                    <CreditCard className="w-4 h-4 text-blue-600" />
                                    <Select.ItemText>{card.label}</Select.ItemText>
                                  </div>
                                  <Select.ItemIndicator>
                                    <Check className="w-4 h-4 text-orange-500" />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    )}
                  />
                  {errors.selectedCard && (
                    <p className="text-sm text-red-600">{errors.selectedCard.message}</p>
                  )}
                </div>

                {/* Payment Summary */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Payment Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Date of Payment</span>
                      <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900">
                        Wed, 27 May, 2024
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Total Amount</span>
                      <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm font-semibold text-gray-900">
                        ${selectedPackage?.value || '250'}.00
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 py   -4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    Buy Now
                  </button>
                </div>
              </form>
            </div>
         </DialogBody>
    </DialogContent>
    </Dialog>
    </div>
  );
};

export default AddTokenModal;