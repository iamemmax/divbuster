'use client';

// import { motion } from 'framer-motion';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { useBooleanStateControl, useRouteChangeEvent } from '@/hooks';

// import { linkGroups } from './DesktopMenuBar';
import { Button, DrawerMenu } from '@/components/core';
import { DrawerClose } from '@/components/core/Drawer';
import { cn } from '@/utils/classNames';
import { linkGroups } from './DesktopMenuBar';

// const staggerSpring = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1, // Adjust the stagger interval as needed
//     },
//   },
// };

// const fadeInFromBottom = {
//   initial: { opacity: 0, y: 50 },
//   animate: { opacity: 1, y: 0 },
// };

export function MobileMenuDialog() {
  const _pathname = usePathname();


  const {
    // state: isModalOpen,
    // setState: setModalState,
    setFalse: closeModal,
  } = useBooleanStateControl();

  useRouteChangeEvent(() => closeModal());

  return (
    <>
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

{
  //  link: string;
  //  text: string;
  //  icon: undefined;
  //  disabled: boolean;
  //  isExternal: boolean;
  linkGroups.map((link, index)=>(
    <li className="border-b-[0.15px] border-b-white/30 p-2" key={index}>
      <Link href={link.link}>{link.text}</Link>
      </li>
  ))
}

          </ul>
        </div>
      </DrawerMenu>
    </>
  );
}
