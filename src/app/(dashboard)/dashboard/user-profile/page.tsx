// "use client"


// import Image from 'next/image'
// import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

// import { Button, FormError, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core'
// import { useQuery, useQueryClient } from 'react-query'
// import { fetchReferralCode } from '../api/referral/fetchReferralCode'
// import { useUser } from '@/app/(auth)/(onboarding)/misc'
// import { Label } from '@radix-ui/react-label'
// import { Controller, useForm, useWatch } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useClipboard, useErrorModalState } from '@/hooks'
// import { fetchHospitalListByLga, fetchRegionByState, fetchStateList, useUserHospitalChoice } from '@/app/(main)/misc/components/insurance/api/remital/remtalUserDetails'
// import { capitalizeFirstLetter } from '@/utils'
// import { components } from 'react-select'


// interface Prop {
//   setShowPasswordModal: Dispatch<SetStateAction<boolean>>;
//   OpenRemitalUserDetail: true;
//   userId: string;
//   userEmail: string;
//   setOpenShowRemitalPlan: Dispatch<SetStateAction<boolean>>;
//   verifyResponse: {
//     nin: string;
//     bvn: string;
//     address: string;
//     email: string;
//     id: string;
//   };
// }
// interface SuccessMsg {
//   // message: string;
//   id: string;
//   first_name: string;
//   last_name: string;
//   phone_number: string;
//   gender: string;
//   hospitals: Hospitals;
//   phone_verified: boolean;
//   nin: null;
//   bvn: string;
//   email: string;
//   address: string;
// }

// interface Hospitals {
//   state: string;
//   lga: string;
//   provider_id: string;
//   hospital: string;
// }

// interface Hospitals {
//   lga: string;
//   state: string;
//   hospital: string;
//   provider_id: string;
// }

// const formValues = z.object({
//   hospitaldata: z.object({
//     email: z
//       .string()
//       .email({ message: "Invalid email format" })
//       .min(1, { message: "Email is required" }),
//     state: z.string().trim().min(1, { message: "Please select a state." }),
//     lga: z.string().trim().min(1, { message: "Please select a lga." }),
//     hospital: z
//       .string()
//       .trim()
//       .min(1, { message: "Please select a hospital." }),
//   }),
// });

// const baseSchema = z.object({
//   address: z
//     .string({ required_error: "Enter your address" })
//     .min(2, { message: "Address should be at least 2 characters" }),
//   email: z
//     .string()
//     .email({ message: "Invalid email format" })
//     .min(1, { message: "Email is required" }),
//   selectedOption: z.union([z.literal("nin"), z.literal("bvn")]),
//   bvn: z.string().trim(),
//   nin: z.string().trim(),
// });

// // Extend the base schema for NIN
// const ninSchema = baseSchema.extend({
//   nin: z
//     .string()
//     .trim()
//     .min(10, { message: "NIN should be at least 10 digits" }),
// });

// // Extend the base schema for BVN
// const bvnSchema = baseSchema.extend({
//   bvn: z
//     .string()
//     .trim()
//     .min(11, { message: "BVN should be at least 11 digits" }),
// });


// export default function Page({
//   userId,
//   verifyResponse,
//   userEmail
// }:Prop) {




//   const { data: userData } = useUser();
//   const queryClient = useQueryClient();

//   const { copy } = useClipboard();

//   const {
//     data
//   } = useQuery({
//     queryFn: () => fetchReferralCode(userData?.user_id as string),
//     queryKey: ["generate-referral-code", userData?.user_id],
//     enabled: false,
//     onSuccess: () => {
//       // Invalidate user details query to refetch data
//       queryClient.invalidateQueries(["user-details", data?.referral_code]);
//     },
//   });

//   const {
//     control,
//     handleSubmit,
//     register,
//     formState: { errors },
//     setValue,
//   } = useForm<formValues>({
//     resolver: zodResolver(formValues),
//     defaultValues: {
//       hospitaldata: {
//         email: verifyResponse?.email || userEmail,
//         hospital: "",
//         lga: "",
//         state: "",
//       },
//     },
//   });

//   type formValues = z.infer<typeof formValues>;


//   const selectedState = useWatch({
//     control,
//     name: "hospitaldata.state",
//   });

//   const selectedlga = useWatch({
//     control,
//     name: "hospitaldata.lga",
//   });

//   const { data: stateList } = useQuery({
//     queryFn: fetchStateList,
//     queryKey: ["fetch-state-list"],
//   });

//   const { data: lgaList, isLoading: loadinglga } = useQuery({
//     queryFn: () => fetchRegionByState(selectedState),
//     queryKey: ["fetch-lga-list", selectedState],
//   });

//   const uniqueStates = Array.from(new Set(stateList));

//   const { data: hospitalList } = useQuery({
//     queryFn: () => fetchHospitalListByLga(selectedlga),
//     queryKey: ["fetch-hospital-list", selectedlga],
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);
//   const { mutate: handleSubmitHospital} =
//     useUserHospitalChoice();
//   // const router = useRouter();
//   const onSubmit = (data: formValues) => {
//     const selectedlgaData = hospitalList?.data?.find(
//       (hos) =>
//         hos?.lga?.toLowerCase() === data?.hospitaldata?.lga?.toLowerCase()
//     );

//     handleSubmitHospital (
//       {
//         userId,
//         email: data?.hospitaldata?.email,
//         state: data?.hospitaldata.state,
//         hospital: data?.hospitaldata.hospital,
//         provider_id: String(selectedlgaData?.provider_id),
//         lga: String(selectedlgaData?.lga),
//       },
//     );
//   };

//   const stateOptions = uniqueStates?.map((state) => ({
//     value: state,
//     label: state,
//   }));
//   const lgaOption = lgaList?.map((state) => ({
//     value: state,
//     label: state,
//   }));

//   const style = {
//     control: (base: any) => ({
//       ...base,
//       border: 0,
//       background: "#2a304f",
//       height: "2.875rem",
//       boxShadow: "none",
//       color: "#fff",
//     }),
//     option: (provided: any) => ({
//       ...provided,
//       color: "#333",
//       background: "#fff",
//       "&:hover": {
//         background: "#f0f0f0",
//       },
//     }),
//     singleValue: (provided: any) => ({
//       ...provided,
//       color: "#fff",
//       fontSize: "12px",








//       textTransform: "capitalize",
//     }),
//   };

//   const hospitalOptions = hospitalList?.data?.map((hospital) => ({
//     value: capitalizeFirstLetter(hospital.name),
//     label: hospital?.name,
//     name: hospital?.name,
//     address: hospital?.address,
//   }));



//   const CustomOption = (props: any) => {
//     const { data } = props;
//     return (
//       <components.Option {...props}>
//         <div className="w-[20rem]">
//           <h2 className="text-[#1B1687]  text-xs">{data?.name}</h2>
//           <p className="text-[.625rem] text-[#080D27]">
//             {data?.address?.toLowerCase()}
//           </p>
//         </div>
//       </components.Option>
//     );
//   };


//   return (
//     <div className='bg-[#F5F9FE]'>
//       <div className='bg-main min-h-36'></div>
//       <section className="h-full w-full px-6 md:px-[7.5rem] min-h-screen pb-[1.88rem] relative -mt-32">
//         <div className='bg-white w-full h-screen mx-auto pt-[2.625rem] px-[4.5rem] rounded-[.625rem]'>
//           <p className='text-[#032282] font-sans font-bold text-2xl'>Personal Information</p>
//           <section className='mt-8 flex justify-between'>
//             <div className='flex justify-between items-center gap-4'>
//               <div className='flex'>
//                 <Image
//                   alt="profile"
//                   src={`/images/dashboard/ProfileImage.png`}
//                   height={100}
//                   width={100}
//                   className="rounded-full"
//                 />
//                 <div className='mt-[3.8rem] -ml-[1.5rem]'>
//                   <Photo />
//                 </div>
//               </div>
//               <label htmlFor='upload'></label>
//               <input type="file" name="" id="upload" className='hidden' />
//               <Button className='bg-[#F5F9FE] gap-1 border-[0.3px] border-[#032282] px-4 py-3' id='upload'>
//                 <Upload /><p className='text-[#032282] font-medium'>Upload</p>
//               </Button>
//               <Button className='bg-[#F5F9FE] gap-1 px-4 py-3'>
//                 <Delete /><p className='text-[#032282] font-medium'>Remove</p>
//               </Button>
//             </div>

//             <div className='flex gap-4 justify-between items-center'>
//               <div className="flex items-center gap-2">
//                 <div
//                   className="flex items-center justify-center flex-col gap-x-2 border-[0.3px] border-[#032282] bg-white px-4 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
//                   onClick={() =>
//                     copy(
//                       ` https://liberty-life.vercel.app/?get-started=true&referral_code=${userData?.referral_code}` ??
//                       ""
//                     )
//                   }
//                 >
//                   <p className="text-[#032282] text-xxs">
//                     Referral link
//                   </p>
//                   <div className="flex">
//                     <p className="text-[#032282] max-w-[6.25rem] text-xxs truncate">
//                       {` https://liberty-life.vercel.app/?referral_code=${userData?.referral_code}`}
//                     </p>
//                     <Button className=" text-[#032282] px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
//                       <CopyIcon4 height={15} width={15} fill='' />
//                     </Button>
//                   </div>
//                 </div>
//                 <div
//                   className="flex items-center justify-center flex-col gap-x-2 bg-white border-[0.3px] border-[#032282] px-6 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
//                   onClick={() => copy(userData?.referral_code ?? "")}
//                 >
//                   <p className="text-[#032282] text-xxs">
//                     Referral Code
//                   </p>
//                   <div className="flex">
//                     <p className="text-[black] max-w-[3.25rem] text-xxs truncate">
//                       {userData?.referral_code ?? ""}
//                     </p>
//                     <Button className=" text-[#032282] px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
//                       <CopyIcon4 height={15} width={15} />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//               <Button className='bg-[#099976] py-[18px] px-7 text-xs rounded-10 items-stretch'>Edit Profile</Button>
//             </div>
//           </section>
//           <div className='border-b-[0.3px] mt-4'></div>
//           <section>
//             <div className='mt-10'>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div  className='grid grid-cols-2 gap-x-10 gap-y-6 font-sans text-sm'>
//               <div >
//                 <Label
//                   htmlFor='name'
//                   className='text-[#032282]'
//                 >
//                   Name
//                 </Label>
//                 <Input
//                   placeholder='Enter name'
//                   type='text'
//                   id='name'
//                   className='py-3 bg-[#F5F9FE] mt-2'
//                 />
//               </div>
//               <div>
//                 <Label
//                   htmlFor='email'
//                   className='text-[#032282]'
//                 >
//                   Email
//                 </Label>
//                 <Input
//                   placeholder='Enter email'
//                   type='text'
//                   id='email'
//                   className='py-3 bg-[#F5F9FE]  mt-2'
//                 />
//               </div>
//               <div>
//                 <Label
//                   htmlFor='Phone_number'
//                   className='text-[#032282]'
//                 >
//                   Phone number
//                 </Label>
//                 <Input
//                   placeholder='Enter phone number'
//                   type='number'
//                   id='phone_number'
//                   className='py-3 bg-[#F5F9FE]  mt-2'
//                 />
//               </div>
//               <div className="">
//                     <Label
//                       className="mt-5 mb-1 block text-xs text-[#fff]"
//                       htmlFor="State"
//                     >
//                       State
//                     </Label>

//                     <Controller
//                       control={control}
//                       name="hospitaldata.state"
//                       render={({ field: { onChange, value, ref } }) => (
//                         <Select
//                           value={stateOptions.find(
//                             (c) => c.value === String(value)
//                           )}
//                           options={stateOptions}
//                           placeholder="Select State"
//                           ref={ref}
//                           onChange={(selectedOption: { value: any }) => {
//                             onChange(selectedOption?.value);
//                             setValue("hospitaldata.lga", "");
//                           }}
//                           styles={style}
//                           components={{
//                             IndicatorSeparator: () => null,
//                           }}
//                         />
//                       )}
//                     />
//                   </div>
//                   <div className="">
//                     <Label
//                       className="mt-5 mb-1 block text-xs text-[#fff]"
//                       htmlFor="State"
//                     >
//                       Lga
//                     </Label>

//                     <Controller
//                       control={control}
//                       name="hospitaldata.lga"
//                       render={({ field: { onChange, value, ref } }) => (
//                         <Select
//                           value={lgaOption?.find(
//                             (c) => c.value === String(value)
//                           )}
//                           options={lgaOption}
//                           placeholder="Select Lga"
//                           ref={ref}
//                           onChange={(lgaOption: { value: any }) => {
//                             onChange(lgaOption?.value);
//                           }}
//                           styles={style}
//                           components={{
//                             IndicatorSeparator: () => null,
//                           }}
//                         />
//                       )}
//                     />
//                   </div>
//                   <div className="w-full mt-[1rem] text-sm font-normal">
//                     <label
//                       className="mb-1 block text-xs text-[#fff]"
//                       htmlFor="hospital"
//                     >
//                       Hospital ({hospitalList?.data?.length ?? 0})
//                     </label>
//                     <div className="relative mt-[.25rem]">
//                       <Controller
//                         control={control}
//                         name="hospitaldata.hospital"
//                         render={({ field }) => (
//                           <Select
//                             {...field}
//                             options={hospitalOptions}
//                             placeholder="Select Hospital"
//                             onChange={(option) => field.onChange(option?.value)}
//                             value={hospitalOptions?.find(
//                               (option) => option.value === field.value
//                             )}
//                             styles={style}
//                             components={{
//                               Option: CustomOption,
//                               IndicatorSeparator: () => null,
//                             }}
//                           />
//                         )}
//                       />
//                       {errors?.hospitaldata?.hospital && (
//                         <p className="text-red-600 text-xs mt-1">
//                           {errors.hospitaldata.hospital.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//               </div>
//             </form>
//             </div>
//           </section>
//           <div className='border-b-[0.3px] mt-4'></div>
//           <div className='mt-6'>
//           <Button className='bg-[#099976] py-[18px] px-7 text-xs rounded-10 items-stretch'>Save Changes</Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


import * as React from 'react';

const Page = () => {
    return (

        <>
        </>
    )

}

export default Page;
