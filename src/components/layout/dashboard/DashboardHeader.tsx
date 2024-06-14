'use client';


import Home from '@/app/(dashboard)/comp/icons/home';
import Logo from '@/app/(dashboard)/comp/icons/logo';
import Notifications from '@/app/(dashboard)/comp/icons/notification';
import Link from 'next/link';

import * as React from 'react';


export function DashboardHeader() {


  return (
    <>
      <div className='bg-main flex flex-row justify-between items-center px-[10px] md:px-[120px] py-8'>
        <div className='flex text-white gap-1 md:gap-3'>
          <Logo className='h-[25px] md:h-[45px] w-[22px] md:w-[42px]' />
          <div className='font-wix-display'>
            <p className='font-extrabold capitalize text-base md:text-xl text-nowrap leading-3'>liberty life</p>
            <p className='font-thin text-xxs md:text-sm'>by LibertyAssured</p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row mt-2 md:mt-0'>
          <div className='flex gap-3 pr-6'>
            <Link href='/' className='rounded-full bg-[#FFFFFF4D] p-2'>
              <Home />
            </Link>
            <div className='rounded-full bg-[#FFFFFF4D] p-2'>
              <Notifications />
            </div>
          </div>
          <div>
            <p className='text-white bg-[#FFFFFF4D] p-2 rounded-full font-bold max-w-max'>AK</p>
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