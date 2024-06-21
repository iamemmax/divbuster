'use client';


import Home from '@/app/(dashboard)/comp/icons/home';
import Logo from '@/app/(dashboard)/comp/icons/logo';
import Notifications from '@/app/(dashboard)/comp/icons/notification';
import { Button, DrawerMenu } from '@/components/core';
import { DrawerClose } from '@/components/core/Drawer';
import { cn } from '@/utils/classNames';
import Link from 'next/link';

import * as React from 'react';


export function DashboardHeader() {


  return (
    <>
      <header className='bg-main px-[.625rem] md:px-[7.5rem] py-8'>
        <div className='  flex items-center justify-between'>
          <div className='flex text-white gap-1 md:gap-3'>
            <Logo className='h-[1.5625rem] md:h-[2.8125rem] w-[1.375rem] md:w-[2.625rem]' />
            <div className='font-wix-display'>
              <p className='font-extrabold capitalize text-base md:text-xl text-nowrap leading-3'>liberty life</p>
              <p className='font-thin text-xxs md:text-sm'>by LibertyAssured</p>
            </div>

          </div>

          <div className=' hidden md:flex mt-2 md:mt-0'>
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


        <DrawerMenu
          trigger={
            <Button className={cn("md:hidden bg-white/10 px-5 py-2.5 rounded-full", "font-display")}>
              Menu
            </Button>
          }
          contentClass="bg-main border-main"
        >
          <div className="text-white p-5 pb-0 gap-5">
            <header className="flex items-center justify-between">
              <h6 className="font-semibold text-lg">Menu Content</h6>
              <DrawerClose className={cn("bg-white/10 h-8 w-8 rounded-full text-white/50 rotate-12 text-lg hover:text-white", "font-display")}>x</DrawerClose>
            </header>

            <ul className={cn("font-display", "flex flex-col gap-8 font-normal mt-10")}>
              <li className="border-b-[.0094rem] border-b-white/30 p-2">
                <Link href='/'>Home</Link>
              </li>
              <li className="border-b-[.0094rem] border-b-white/30 p-2">
                <Link href='/'>Products</Link>
              </li>
              <li className="border-b-[.0094rem] border-b-white/30 p-2">
                <Link href='/'>Company</Link>
              </li>
              <li className="border-b-[.0094rem] border-b-white/30 p-2">
                <Link href='/'>About us</Link>
              </li>
              <li className="border-b-[.0094rem] border-b-white/30 p-2">
                <Link href='/'>Contact us</Link>
              </li>
            </ul>
          </div>

        </DrawerMenu>
              </div>

      </header>
    </>
  );
}