'use client';


import Home from '@/app/(dashboard)/comp/icons/home';
import Logo from '@/app/(dashboard)/comp/icons/logo';
import Notifications from '@/app/(dashboard)/comp/icons/notification';

import * as React from 'react';


export function DashboardHeader() {


  return (
    <>
      <div className='bg-main flex justify-between items-center px-[120px] py-8'>
        <div className='flex text-white gap-3'>
          <Logo className='h-[45px] w-[42px]' />
          <div className='font-wix-display'>
            <p className='font-extrabold capitalize text-xl'>liberty life</p>
            <p className='font-thin text-sm'>by LibertyAssured</p>
          </div>
        </div>
        <div className='flex'>
          <div className='flex gap-3 pr-6'>
            <div className='rounded-full bg-[#FFFFFF4D] p-2'>
              <Home />
            </div>
            <div className='rounded-full bg-[#FFFFFF4D] p-2'>
              <Notifications />
            </div>
          </div>
          <div>
            <p className='text-white bg-[#FFFFFF4D] p-2 rounded-full font-bold '>AK</p>
          </div>
          <div className='text-white pl-3'>
            <p className='text-sm font-bold'>Abdulramon Keulere</p>
            <p className='text-xs'>abdulramonkeulere@gmail.com</p>
          </div>
          </div>
      </div>
    </>
  );
}
