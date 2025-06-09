"use client"
import React from 'react'
import { usefetchDiveSites } from '../../api/div-sites/fetch-dive-sites'
import Image from 'next/image'
import { Button, LoaderModal } from '@/components/core'
import { useFetchCountry } from '../../api/fetchCountry'
import { Heart, HeartIcon } from 'lucide-react'

const RecentDiveSites = () => {
    const {data,isLoading} = usefetchDiveSites()
    const {data:country}= useFetchCountry()
    const getCountry = (id:number) =>{
        const filterCountry = country?.results?.find((con) =>con?.id === id)
        return filterCountry
    }
  return (
    <div>
{
isLoading ?<LoaderModal/> :
<>

{data?.data?.results?.map((item, idx: number) => (
 <div
   className="bg-white rounded-lg  cursor-pointer p-[1.875rem] px-4 "
   key={idx}
   
 >
   

   <div
     className="relative rounded-lg overflow-hidden mt-2"
     style={{ height: "15.6875rem" }}
   >
     {/* Satellite/Map Background */}
     <div
       className="absolute inset-0 bg-cover bg-center"
       style={{
         backgroundImage: `url(/images/dashboard/profile-Location.png)`,
       }}
     ></div>

     {/* Dark overlay */}
     <div className="absolute inset-0 bg-black bg-opacity-40"></div>

     {/* Coordinates Overlay */}
     <div className="absolute top-2 left-4 text-white py-4 px-6 md:px-[2.75rem] w-full">
       <div className="flex justify-end max-md:pr-2 items-center w-full">
         <Button  className="bg-white px-[1.0688rem] py-[.5206rem] rounded-2xl text-[#F7931D] text-xs font-medium flex items-center gap-[.3125rem]">
           <HeartIcon/>
           
           Add to Favourite
         </Button>
       </div>
       <div className="">
         <div className="flex items-center flex-wrap gap-[10px] md:gap-[20px]">
           <div className="relative h-[40px] rounded w-[52px]">
             <Image
              src={`https://flagcdn.com/${getCountry(item?.country)?.alpha2code?.toLowerCase()}.svg`}
               alt="img"
               fill
               className="object-cover rounded" // or object-contain, depending on your desired behavior
             />

              <img
               src={`https://flagcdn.com/${getCountry(item?.country)?.alpha2code?.toLowerCase()}.svg`}
               alt={`${getCountry(item?.id)?.name} flag`}
               className="w-5 h-5 rounded-sm object-cover"
             />
           </div>

           <div className="flex items-center gap-[10px]">
             <p className="text-white font-archivo font-semibold text-xs md:text-lg">
               {item?.title}
             </p>
             <div className="flex items-center bg-[#C5EFFF] max-w-[100px] justify-center gap-[.3531rem] py-1 px-[.4063rem] rounded-10 ">
               <svg
                 width="10"
                 height="10"
                 viewBox="0 0 10 10"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <g clip-path="url(#clip0_1793_6131)">
                   <path
                     d="M7.46891 4.75631C7.84067 4.72453 8.167 4.56814 8.44039 4.28964C9.38002 3.33245 9.35147 1.1992 9.34981 1.10887C9.34673 0.941112 9.2099 0.806742 9.04208 0.806619L7.49392 0.805603V0.153988C7.49392 0.0689249 7.42496 0 7.33993 0H2.6587C2.57367 0 2.50471 0.0689249 2.50471 0.153988V0.805541L0.956581 0.806588C0.788796 0.806711 0.651962 0.941081 0.648852 1.10884C0.647158 1.1992 0.618639 3.33242 1.55827 4.28961C1.83166 4.56811 2.15802 4.7245 2.52975 4.75628C2.67194 5.75175 3.41768 6.55471 4.38339 6.78221V8.72039H3.6032C3.55285 8.72039 3.5057 8.745 3.4769 8.7863L2.79935 9.75793C2.76652 9.80499 2.76261 9.8664 2.78916 9.91728C2.81568 9.96813 2.86831 10 2.92568 10C2.92568 10 7.07344 9.99997 7.07369 10C7.15872 10 7.22767 9.93108 7.22767 9.84601C7.22767 9.80875 7.21206 9.77841 7.19241 9.74795L6.52182 8.78627C6.49303 8.74497 6.44588 8.72036 6.39552 8.72036H5.61533V6.78224C6.58099 6.55471 7.32672 5.75178 7.46891 4.75631ZM8.72912 1.42232C8.6994 2.10397 8.53839 3.31055 8.00085 3.85813C7.85234 4.00938 7.68526 4.09986 7.49395 4.13254V1.42149L8.72912 1.42232ZM1.26982 1.42232L2.50471 1.42152V4.13254C2.31355 4.09986 2.14666 4.00963 1.99828 3.85863C1.46178 3.31268 1.3001 2.10467 1.26982 1.42232ZM3.72328 2.57021L4.60501 2.44209L4.99935 1.64311L5.39368 2.44209L6.27541 2.57021L5.63738 3.19214L5.78801 4.07033L4.99938 3.6557L4.21074 4.07033L4.36137 3.19214L3.72328 2.57021Z"
                     fill="#132346"
                   />
                 </g>
                 <defs>
                   <clipPath id="clip0_1793_6131">
                     <rect width="10" height="10" fill="white" />
                   </clipPath>
                 </defs>
               </svg>
               <p className="font-archivo text-xxs text-[#132346] font-semibold">
                 Rank:{item?.ranking}
               </p>
             </div>
             <svg
               width="16"
               height="16"
               viewBox="0 0 16 16"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="M8 13.625C11.1066 13.625 13.625 11.1066 13.625 8C13.625 4.8934 11.1066 2.375 8 2.375C4.8934 2.375 2.375 4.8934 2.375 8C2.375 11.1066 4.8934 13.625 8 13.625Z"
                 stroke="#F7931D"
                 stroke-linecap="round"
                 stroke-linejoin="round"
               />
               <path
                 d="M7.53125 7.53125C7.65557 7.53125 7.7748 7.58064 7.86271 7.66854C7.95061 7.75645 8 7.87568 8 8V10.3438C8 10.4681 8.04939 10.5873 8.13729 10.6752C8.2252 10.7631 8.34443 10.8125 8.46875 10.8125"
                 stroke="#F7931D"
                 stroke-linecap="round"
                 stroke-linejoin="round"
               />
               <path
                 d="M7.76562 6.125C8.15395 6.125 8.46875 5.8102 8.46875 5.42188C8.46875 5.03355 8.15395 4.71875 7.76562 4.71875C7.3773 4.71875 7.0625 5.03355 7.0625 5.42188C7.0625 5.8102 7.3773 6.125 7.76562 6.125Z"
                 fill="#F7931D"
               />
             </svg>
           </div>
         </div>
         <h2 className="font-semibold py-3 text-sm md:text-base lg:text-[1.875rem] font-archivo text-white">
           {item?.address}
         </h2>
         <div className="flex gap-x-2 py-3 items-center">
           {item?.site_type?.split(",")?.map((tag, idx) => (
             <div
               key={idx}
               className=" px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] text-[#175CD3] cursor-pointer"
             >
               {tag}
             </div>
           ))}
         </div>
         <div className="py-2">
           <p className="text-xs text-[#F7F7F7] md:text-base font-archivo ">
             Latitude:{" "}
             <span className="font-semibold">
               {item?.lag}{" "}
             </span>{" "}
             <span className="px-2">•</span> Longitude:{" "}
             <span className="font-semibold">
               {item?.lon}
             </span>
           </p>
           <p></p>
         </div>
       </div>
     </div>
   </div>

   {/* <div className="mt-3 flex justify-between flex-wrap gap-3 items-center">
     <div className="flex items-center gap-2">
             <div className="flex -space-x-1">
               {item?.social?.photos?.thumbnails?.slice(0, 4).map((avatar, index) => (
                 <img
                   key={index}
                   src={avatar}
                   alt=""
                   className="w-10 h-10 rounded-full border border-white object-cover"
                 />
               ))}
               {item?.social?.photos?.count > 4 && (
                 <div className="flex items-center gap-2">

                 <div className="w-10 h-10 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs text-gray-600">
                   +{item?.social?.photos?.count - 4} 
                 </div>
                   <p className="text-sm font-archivo font-medium text-[#475467]">Like this dive</p>
                 </div>
               )}
             </div>
           </div>
           <div className="flex items-center gap-3 relative">
            <Button className="bg-[#F9FAFB] h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center">
             <LikeIcon/>
            </Button>
            <Button  className="bg-[#F9FAFB] relative h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center">
             
             <div className="relative"><MessageIcon2/>
             <div className="absolute -top-4 -right-3 w-[.875rem] p-3 flex justify-center items-center h-[.875rem] bg-[#F7931D] rounded-full">
               <p className="font-archivo text-xs font-bold text-white">12</p>
             </div>
             </div>
            </Button>
            <Button className="bg-[#F9FAFB] h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center">
             <ShareIcon2/>
            </Button>
           </div>
   </div> */}
 </div>
))}
</>

}
    </div>
  )
}

export default RecentDiveSites