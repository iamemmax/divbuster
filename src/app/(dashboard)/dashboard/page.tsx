import React from 'react'
import HospitalIcon from '../comp/icons/hospitalIcon'

export default function page() {
  return (
    <main className=''>
      <div className='bg-[#171F45] px-5 rounded-lg py-8'>
        <div className='bg-[#FFFFFF26] rounded-10 py-4 px-6'>
          <div className='bg-white rounded-10 flex py-1 pl-8 gap-3'>
            <div className='py-12 font-sans pr-8'>
              <p className='text-black text-xl font-bold'>Hello, <span className='text-[#1B1687]'>Abdulramon Keulere</span></p>
              <p className='text-base'>Enrollment Number:<span className='font-bold text-[#1B1687]'>330990663047</span></p>
            </div>
            <div className='border-[0.3px] border-[#bbb8ef] mr-5'></div>
            <div className='flex py-5 gap-6'>
              <div className='bg-[#19224A] rounded-10 text-white py-3 px-4 flex gap-4'>
                <div>
                  <h1 className='flex justify-center items-center text-lg font-medium'>1</h1>
                  <p className='mt-2 mb-0.5 text-[#FFFFFFCC] font-sans font-light flex justify-center text-xxs items-center '>Individual Plan</p>
                  <button className='rounded-full px-5 py-2 bg-[#FFFFFF4D]'>View details</button>
                </div>
                <div className='border-[0.05px] border-[#D6D6D6] h-16'></div>
                <div>
                  <h1 className='flex justify-center items-center text-lg font-medium'>0</h1>
                  <p className='mt-2 mb-0.5 text-[#FFFFFFCC] font-sans font-light flex justify-center text-xxs items-center '>Family Plan</p>
                  <button className='rounded-full px-5 py-2 bg-[#FFFFFF4D]'>View details</button>
                </div>
              </div>
              <div className='bg-[#19224A] rounded-10 gap-4 pl-6 py-9 flex pr-[26px]'>
                <HospitalIcon className='size-12' />
                <div>
                  <p className='text-white text-lg font-normal'>0</p>
                  <p className='text-[#FFFFFFCC] text-xs'>Total hospital visit</p>
                </div>
              </div>
              <div className='bg-[#19224A] rounded-10 gap-4 pl-6 py-9 flex pr-[57px]'>
                <HospitalIcon className='size-12' />
                <div>
                  <p className='text-white text-lg font-normal'>0</p>
                  <p className='text-[#FFFFFFCC] text-xs'>Total amount</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white mt-6 flex pt-8 pl-12 pb-1 gap-[72px] font-sans'>
          <div>
            <p className='text-[#1B1687] text-base font-medium'>Individual Insurance Plan</p>
            <div className='border border-[#5879FD] rounded-full'></div>
          </div>
          <p className=' text-base font-medium'>Family Insurance Plan</p>
        </div>
      </div>
    </main>
  )
}
