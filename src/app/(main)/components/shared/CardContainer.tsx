import { Button } from '@/components/core'
import React from 'react'

const CardContainer = () => {
  return (
    <div className='relative'>
        <div className="flex flex-col z-50 relative gap-4 bg-[url('/images/dashboard/swimmer.svg')] rounded-10 px-[1.125rem] py-4 bg-[#2fc05c] bg-cover bg-no-repeat">
        <div className="">
            <p className='text-white text-xs font-medium font-archivo'>Date Added: 21/06/24</p>
        </div>
        <div className="">
            <p className='text-white text-xxs font-medium font-archivo'>Issuer:</p>
            <p className='text-white text-xs font-semibold font-archivo'>Padi Dive</p>
        </div>
        <div className="">
            <p className='text-white text-xxs font-medium font-archivo'>Diver No: 328173343</p>
            <p className='text-white text-base font-semibold font-archivo'>Master Scuba Diver</p>
        </div>
        
        </div>
        
        {/* New container with #132346 background */}
        {/* New container with #132346 background */}
        {/* New container with #132346 background */}
        <div className="px-2">
        <div className="-mt-2 z-10 flex flex-col relative gap-4 rounded-10 px-[1.125rem] py-2 bg-[#132346]">
         
        </div>

        </div>
        <div className="mt-4 flex justify-center items-center">
            <Button variant={"outlined"} className='bg-transparent text-[#344054] font-medium text-sm font-archivo'>Manage your Certifications</Button>
        </div>
    </div>
  )
}

export default CardContainer
