import React from 'react'
import PhoneImage from './landing-images/PhoneImages'
import { Button } from '@/components/core'

const GetAppSection = () => {
  return (
    <div className='py-[6.375rem] mb-8 sm:px-[2rem] md:px-[8.9375rem] w-full'>
        <div className="bg-gradient-to-r from-[#0C0A3A] grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] md:grid-cols-[1.2fr_1fr] w-full to-[#171D33] 0% py-[4.625rem] px-[2rem] md:px-[2.625rem] rounded-lg">
          <div className="">
          <h2 className='font-verdana font-bold text-[1.2rem] md:text-[1.8rem] xl:text-[2.25rem] text-white'>Get The App Now</h2>
          <p className='text-white text-opacity-70 font-outfit md:text-[1.1rem] xl:text-[1.3rem] 2xl:text-[2.5rem] md:max-w-[80%] 2xl:max-w-[700px] font-normal'>You can download the mobile app on Google Play store or Apple store </p>
         <div className="py-6 flex items-center gap-4">
<Button>
</Button>
<Button>sssssssss</Button>
         </div>
          </div>
          <div className="relative  h-full">
          <div className="sm:absolute top-[-7rem] 2xl:top-[-8rem] right-0">
            <PhoneImage height={410} className='max-xl:h-[23.75rem]   max-md:w-[12.5rem] '/>
          </div>
          </div>
        </div>
    </div>
  )
}

export default GetAppSection
