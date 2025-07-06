import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, HelpCircle, ChevronDown } from 'lucide-react';
import MastercardIcon from '@/app/icons/(dashboard)/card/MatercardIcon';
import { Dialog, DialogBody, DialogContent } from '@/components/core';

// Zod validation schema
const cardFormSchema = z.object({
  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Please enter a valid 16-digit card number'),
  cardName: z
    .string()
    .min(1, 'Name on card is required')
    .min(2, 'Name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  expiryDate: z
    .string()
    .min(1, 'Expiry date is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please use MM/YY format')
    .refine((date) => {
      const [month, year] = date.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      const cardYear = parseInt(year, 10);
      const cardMonth = parseInt(month, 10);
      
      if (cardYear > currentYear) return true;
      if (cardYear === currentYear && cardMonth >= currentMonth) return true;
      return false;
    }, 'Card has expired'),
  cvv: z
    .string()
    .min(1, 'CVV is required')
    .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
  country: z
    .string()
    .min(1, 'Please select a country'),
  setAsDefault: z.boolean()
});

type FormData = z.infer<typeof cardFormSchema>;

interface Props {
  isOpen: boolean;
  setIsOpenCardModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewCardForm: React.FC<Props> = ({ isOpen, setIsOpenCardModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      country: '',
      setAsDefault: true
    }
  });

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string): string => {
    let formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length >= 2) {
      formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
    }
    return formattedValue;
  };

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Form submitted:', data);
      // Handle form submission here
      // e.g., API call to save card
      setIsOpenCardModal(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    setIsOpenCardModal(false);
  };

  return (
 <Dialog modal={true} open={isOpen}>
              <DialogContent className="!max-w-[917px] max-h-[80vh]  bg-[#F9FAFB]">
                <DialogBody className="p-6    w-full outline-none  ">
          <div className="p-6 w-full outline-none">
            <div className="">
              
              {/* <div className="">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Add New Card</h1>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-16 h-0.5 bg-gray-300"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div> */}

              <form onSubmit={handleSubmit(onSubmit)}>
                   <h2 className="md:text-2xl text-base font-semibold text-[#101828] mb-8">Add new Card to Account</h2>
                <div className="rounded-2xl  max-h-[74vh] overflow-y-auto">
                  
                  <div className="space-y-6">
                    {/* Card Number */}
                    <div className='border-y-[0.5px] py-3 border-opacity-55'>
                      <label className="block text-sm font-archivo font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <Controller
                          name="cardNumber"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="0000 0000 0000 0000"
                              maxLength={19}
                              className={`w-full px-4 py-3 border ${
                                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                              } rounded-lg focus:ring-2 focus:ring-transparent focus:border-transparent outline-none text-lg font-mono tracking-wider`}
                              onChange={(e) => {
                                const formatted = formatCardNumber(e.target.value);
                                field.onChange(formatted);
                              }}
                            />
                          )}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                         <MastercardIcon/>
                        </div>
                      </div>
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                      )}
                    </div>

                    {/* Name on Card */}
                     <div className='border-y-[0.5px] py-3 border-opacity-55'>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on the Card
                      </label>
                      <Controller
                        name="cardName"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter name on card"
                            className={`w-full px-4 py-3 border ${
                              errors.cardName ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-transparent focus:border-transparent outline-none`}
                          />
                        )}
                      />
                      {errors.cardName && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardName.message}</p>
                      )}
                    </div>

                    {/* Expiry Date and CVV */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <Controller
                          name="expiryDate"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="MM/YY"
                              maxLength={5}
                              className={`w-full px-4 py-3 border ${
                                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                              } rounded-lg focus:ring-2 focus:ring-transparent focus:border-transparent outline-none font-mono`}
                              onChange={(e) => {
                                const formatted = formatExpiryDate(e.target.value);
                                field.onChange(formatted);
                              }}
                            />
                          )}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <div className="relative">
                          <Controller
                            name="cvv"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="000"
                                maxLength={4}
                                className={`w-full px-4 py-3 border ${
                                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-transparent focus:border-transparent outline-none font-mono`}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '').substring(0, 4);
                                  field.onChange(value);
                                }}
                              />
                            )}
                          />
                          <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        {errors.cvv && (
                          <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                     <div className='border-y-[0.5px] py-3 border-opacity-55'>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country or Region
                        </label>
                        <div className="relative">
                          <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                              <select
                                {...field}
                                className={`w-full px-4 py-3 border ${
                                  errors.country ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-transparent focus:border-transparent outline-none appearance-none bg-white`}
                              >
                                <option value="">Select Country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="UK">United Kingdom</option>
                                <option value="DE">Germany</option>
                                <option value="FR">France</option>
                                <option value="NG">Nigeria</option>
                              </select>
                            )}
                          />
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                        {errors.country && (
                          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Set as Default */}
                    <div className="flex items-start gap-3 border-opacity-55 ">
                      <div className="flex items-center h-5">
                        <Controller
                          name="setAsDefault"
                          control={control}
                          render={({ field: { value, onChange, onBlur, name } }) => (
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              name={name}
                              className="w-5 h-5 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-transparent focus:ring-2"
                            />
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className='max-w-[80%]'>
                        <label className="text-base font-medium text-gray-900">
                          Set as Default
                        </label>
                        <p className="text-sm text-gray-500 mt-1">
                          Token payment will be automatically deducted from this card.
                        </p>
                      </div>
                    {/* Terms */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        By saving your card information, you allow{' '}
                        <span className="text-orange-500 font-medium">Divebusters</span>{' '}
                        to charge your card for future payments in accordance with their terms.
                      </p>
                    </div>

                      </div>
                    </div>


                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors bg-white font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Adding...' : 'Add Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
       </DialogBody>
    </DialogContent>
    </Dialog>
  
  );
};

export default AddNewCardForm;