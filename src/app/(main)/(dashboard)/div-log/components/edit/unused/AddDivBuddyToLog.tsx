import React, { useState } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus } from 'lucide-react';
import { Button, Dialog, DialogBody, DialogContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core';
import { CaretDown } from '@/components/icons';

// Zod validation schema
const diveBuddySchema = z.object({
  buddyName: z.string().min(1, 'Dive buddy name is required'),
  email: z.string().email('Please enter a valid email address'),
  certificationIssuer: z.string().min(1, 'Certification issuer is required'),
  certificateName: z.string().min(1, 'Certificate name is required'),
  nameOnCertificate: z.string().min(1, 'Name on certificate is required'),
  certificateNumber: z.string().min(1, 'Certificate number is required'),
  diveInstructor: z.string().min(1, 'Dive instructor name is required'),
  instructorNumber: z.string().min(1, 'Instructor number is required'),
});

type DiveBuddyFormData = z.infer<typeof diveBuddySchema>;

interface SuggestedBuddy {
  name: string;
  image: string;
}

const suggestedBudd: SuggestedBuddy[] = [
  { name: 'Kinslee', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=80&h=80&fit=crop&crop=face' },
  { name: 'king', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=80&h=80&fit=crop&crop=face' },
  { name: 'Malayah', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=80&h=80&fit=crop&crop=face' },
  { name: 'emmatech', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=80&h=80&fit=crop&crop=face' },
  { name: 'Averie', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=face' },
  { name: 'Jensen', image: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?w=80&h=80&fit=crop&crop=face' },
  { name: 'Aniyah', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=face' },
  { name: 'Peck', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=80&h=80&fit=crop&crop=face' },
];

const certificationIssuers = ['PADI', 'NAUI', 'SSI', 'CMAS', 'BSAC'];
const certificateNames = [
  'Open Water Diver',
  'Advanced Open Water',
  'Rescue Diver',
  'Divemaster',
  'Instructor',
];



interface AdvancedDetailsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  // onSave: (data: GearLogDetailsFormValues) => void;
}
export default function AddDiveBuddyToLogModal({isOpen,onClose}:AdvancedDetailsModalProps) {
  const [showNewBuddyForm, setShowNewBuddyForm] = useState(false);
  const [suggestedBuddies, setSuggestedBuddies] = useState(suggestedBudd)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DiveBuddyFormData>({
    resolver: zodResolver(diveBuddySchema),
    defaultValues: {
      buddyName: 'Cassidy Sandoval',
      email: 'Bart@divebusters.com',
      certificationIssuer: 'PADI',
      certificateName: 'Advanced Open Water',
      nameOnCertificate: 'Bart Samson James',
      certificateNumber: '0123ab465y00453',
      diveInstructor: 'James Brown',
      instructorNumber: '00000000000',
    },
  });

  const onSubmit = () => {
  };

  const handleCancel = () => {
    onClose();
  };
  if (!isOpen) return null;
  const selectSuggestedBuddy = (buddy: SuggestedBuddy) => {
    setValue('buddyName', buddy.name);
  };

  const removeSuggetesBuddy = (name:string)=>{
    const removeFromList = suggestedBuddies?.filter((suggest)=>suggest?.name !== name)
    setSuggestedBuddies(removeFromList)
  }


  return (
       <Dialog modal={true} open={isOpen}>
          <DialogContent className="w-full !max-w-[57.3125rem] ">
            <DialogBody className="p-0  px-4 md:px-8 pt-8  w-full outline-none !max-h-[95vh] md:!max-h-[90vh] !max-w-[57.3125rem] ">
    

        <div className="p-6">
           <div className=" flex w-full  flex-col   z-50 ">
       <div className=" border-gray-200 flex justify-between items-center border-b  border-opacity-55 pb-4">
          <h2 className="text-xl font-semibold font-archivo  text-[#101828]">Add Dive Buddy to Log</h2>
          </div>
        </div>
          
         <div className="w-full max-h-[60vh] md:max-h-[65vh] mt-3  overflow-auto">

            {/* Dive Buddy Selection */}
            <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5'>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select/Enter Dive buddy name
              </label>
              <Controller
                name="buddyName"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={`border relative ${
                    errors.buddyName ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
>
                      <SelectValue placeholder="3h 14" />
                      {/* <Clock className="h-4 w-4 ml-2" /> */}
                        <div className="absolute right-4"><CaretDown color='black'/></div>
                    </SelectTrigger>
                    <SelectContent>
                   {
                    suggestedBuddies?.map((item,idx:number)=>(
                      <SelectItem value={item?.name} key={idx}>{item?.name}</SelectItem>   
                    ))
                   }
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.buddyName && (
                <p className="text-red-500 text-sm mt-1">{errors.buddyName.message}</p>
              )}
            </div>
             <div className="border-b border-[#EAECF0] border-opacity-50 py-4">
                 
              <Button
                type="button"
                onClick={() => setShowNewBuddyForm(!showNewBuddyForm)}
                className="flex items-center gap-2 text-[#A7A7A7] p-0 bg-transparent mt-3 text-sm"
              >
                <Plus size={16} />
                Add New Dive buddy
              </Button>
             </div>


            {/* Suggested Dive Buddies */}
            <div>
              <h3 className="text-lg  text-[#1F2C37] font-semibold font-archivo mb-4 mt-7">Suggested Dive buddy</h3>
              <div className="flex gap-7 overflow-x-auto pb-2">
                {suggestedBuddies.map((buddy) => (
                  <div
                    key={buddy.name}
                    className="flex flex-col items-center cursor-pointer hover:opacity-75 shrink-0"
                    onClick={() => selectSuggestedBuddy(buddy)}
                  >
                    <div className="relative">
                      <Image
                        src={buddy.image}
                        alt={buddy.name}
                        width={80}
                        height={80}
                        className="md:size-20 size-10 rounded-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute bottom-1 -right-1 bg-gray-300 rounded-full p-1 hover:bg-gray-400"
                      >
                        <X size={12} className="text-gray-600" onClick={()=>removeSuggetesBuddy(buddy?.name)} />
                      </button>
                    </div>
                    <span className="text-sm text-gray-700 mt-2">{buddy.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Address */}
              <h3 className="text-lg font-semibold text-orange-500 mt-4">Email Address</h3>
            <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5'>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
              <div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      className={`border ${
                    errors.email ? "border-red-500" : "border-[#E2E8F0]"
                  } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                             placeholder="Enter email address"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Dive Certification */}
            <div>
              <h3 className="text-lg font-semibold text-orange-500 mt-5 mb-1">Dive Certification</h3>
              <div>
                 <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5'>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Certification Issuer
                  </label>
                  <div className="">
                  <Controller
                    name="certificationIssuer"
                    control={control}
                     render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                          <SelectTrigger className={`border relative ${
                                        errors.certificationIssuer ? "border-red-500" : "border-[#E2E8F0]"
                                      } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                    >
                                            <SelectValue placeholder="Select Date" />
                                              <div className="absolute right-4"><CaretDown color='black'/></div>
                                          </SelectTrigger>
                                          <SelectContent>
                                        
                                          {
                                            certificationIssuers?.map((cert,idx:number)=>(
                                                    <SelectItem value={cert} key={idx}>{cert}</SelectItem>
                                            ))
                                          }
                                          </SelectContent>
                                        </Select>
                                      )}
                  />
                  {errors.certificationIssuer && (
                    <p className="text-red-500 text-sm mt-1">{errors.certificationIssuer.message}</p>
                  )}

                  </div>
                </div>

                 <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5'>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Name
                  </label>
                  <Controller
                    name="certificateName"
                    control={control}
                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                          <SelectTrigger className={`border relative ${
                                        errors.certificateName ? "border-red-500" : "border-[#E2E8F0]"
                                      } outline-none py-[.8125rem] w-full text-black text-sm flex-1 bg-white font-archivo h-[48px] rounded-lg px-[.875rem] focus:border-[#F7931D] focus:ring-2 focus:ring-[#F7931D]/20 transition-colors`}
                    >
                                            <SelectValue placeholder="Select Date" />
                                              <div className="absolute right-4"><CaretDown color='black'/></div>
                                          </SelectTrigger>
                                          <SelectContent>
                                        
                                          {
                                            certificateNames?.map((cert,idx:number)=>(
                                                    <SelectItem value={cert} key={idx}>{cert}</SelectItem>
                                            ))
                                          }
                                          </SelectContent>
                                        </Select>
                                      )}
                  />
                  {errors.certificateName && (
                    <p className="text-red-500 text-sm mt-1">{errors.certificateName.message}</p>
                  )}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5'>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on the Certificate
                  </label>
                  <Controller
                    name="nameOnCertificate"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter name on certificate"
                      />
                    )}
                  />
                  {errors.nameOnCertificate && (
                    <p className="text-red-500 text-sm mt-1">{errors.nameOnCertificate.message}</p>
                  )}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5'>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Number
                  </label>
                  <Controller
                    name="certificateNumber"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter certificate number"
                      />
                    )}
                  />
                  {errors.certificateNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.certificateNumber.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Dive Instructor/Professional */}
            <div>
              <h3 className="text-lg font-semibold text-orange-500 mb-4">Dive Instructor/Professional</h3>
              <div >
                <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5'>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dive Instructor
                  </label>
                  <Controller
                    name="diveInstructor"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter instructor name"
                      />
                    )}
                  />
                  {errors.diveInstructor && (
                    <p className="text-red-500 text-sm mt-1">{errors.diveInstructor.message}</p>
                  )}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-[#EAECF0] border-opacity-50 py-4 items-center gap-2 sm:gap-5'>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dive Number of Dive Instructor *
                  </label>
                  <Controller
                    name="instructorNumber"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter instructor number"
                      />
                    )}
                  />
                  {errors.instructorNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.instructorNumber.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
          </div>
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
              >
                Save Changes
              </button>
            </div>
        </div>

    </DialogBody>
    </DialogContent>
    </Dialog>
  );
}