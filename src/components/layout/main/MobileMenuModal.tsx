'use client';

<<<<<<< HEAD
import { motion } from 'framer-motion';
=======
// import { motion } from 'framer-motion';
>>>>>>> c5e893c155537ff82bef4dad7f3880e94da312e8

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

<<<<<<< HEAD
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/core/Dialog';
import { LinkButton } from '@/components/core/LinkButton';
import { useBooleanStateControl, useRouteChangeEvent } from '@/hooks';

import { linkGroups } from './DesktopMenuBar';

const staggerSpring = {
  animate: {
    transition: {
      staggerChildren: 0.1, // Adjust the stagger interval as needed
    },
  },
};

const fadeInFromBottom = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export function MobileMenuDialog() {
  const pathname = usePathname();


  const {
    state: isModalOpen,
    setState: setModalState,
=======
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
>>>>>>> c5e893c155537ff82bef4dad7f3880e94da312e8
    setFalse: closeModal,
  } = useBooleanStateControl();

  useRouteChangeEvent(() => closeModal());

  return (
    <>
<<<<<<< HEAD
      <Dialog open={isModalOpen} onOpenChange={setModalState}>
        <DialogTrigger
          className="h-max bg-main-solid-light px-6 py-1.5 text-sm text-white  md:hidden"
          size="unstyled"
          variant="unstyled"
        >
          Menu
        </DialogTrigger>

        <DialogContent
          className="inset-0 h-screen max-h-screen  w-full place-self-center rounded-none bg-light-accent-bg font-wix-display sm:fixed sm:my-0 sm:max-w-none sm:rounded-none md:hidden"
          overlayClassName="md:hidden items-center justify-center"
        >
          <DialogHeader className="bg-transparent p-4">
            <DialogTitle className="text-white">
              <span className="sr-only">Menu</span>

              <Link href="/">
                <span className="sr-only">Go home</span>

                <svg
                  aria-label="The Paybox by LibertyPay logo"
                  fill="none"
                  height={44}
                  viewBox="0 0 102 44"
                  width={102}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.684 24.445H.782V6.975h9.674c4.146 0 6.753 2.373 6.753 6.518 0 4.146-2.607 6.545-6.753 6.545H5.684v4.407ZM9.908 11.38H5.684v4.25h4.224c1.721 0 2.425-.338 2.425-2.138 0-1.773-.704-2.112-2.425-2.112ZM22.5 24.705c-2.973 0-4.641-1.356-4.641-3.598 0-1.851 1.277-3.181 4.25-3.468l5.345-.521v-.261c0-1.33-.574-1.538-2.32-1.538-1.617 0-2.113.312-2.113 1.408v.104H18.12v-.052c0-3.494 2.92-5.737 7.38-5.737 4.588 0 6.805 2.243 6.805 5.92v7.483h-4.59V21.68h-.26c-.495 1.85-2.112 3.024-4.954 3.024Zm.287-3.91c0 .416.417.494 1.173.494 2.373 0 3.337-.286 3.468-1.46l-4.015.47c-.444.052-.626.208-.626.495Zm13.864 8.082h-2.373v-4.432h3.807c.391 0 .704-.053.913-.157l-6.284-12.985h5.58l2.268 5.163.939 3.024h.339l.86-3.076 1.956-5.11h5.475L43.9 24.965c-1.408 3.103-3.416 3.911-7.249 3.911Zm18.602-4.432h-4.589V6.975h4.902v7.718h.26c.392-2.19 1.852-3.65 4.955-3.65 3.859 0 6.023 2.555 6.023 6.83 0 4.25-2.216 6.832-6.232 6.832-3.076 0-4.64-1.2-5.058-3.807h-.26v3.547Zm.313-6.545c0 1.903 1.043 2.32 3.233 2.32 2.269 0 3.051-.6 3.051-2.346 0-1.747-.782-2.373-3.05-2.373-2.19 0-3.234.365-3.234 2.216v.183Zm19.815 6.805c-4.563 0-7.666-2.581-7.666-6.831 0-4.276 3.103-6.832 7.666-6.832 4.563 0 7.666 2.556 7.666 6.832 0 4.25-3.103 6.831-7.666 6.831Zm0-4.328c2.216 0 2.816-.6 2.816-2.503 0-1.904-.6-2.53-2.816-2.53-2.216 0-2.816.626-2.816 2.53 0 1.903.6 2.503 2.816 2.503ZM89.1 24.445h-5.919l4.902-6.363v-.26l-4.902-6.519h5.997l2.686 3.963h.26l2.582-3.963h5.919l-4.902 6.44v.261l4.902 6.44h-5.997l-2.686-3.858h-.26L89.1 24.444ZM1.212 40.74H.587v-6.55h.694v3.07h.049c.205-.831.9-1.447 2.063-1.447 1.515 0 2.347 1.046 2.347 2.513 0 1.466-.832 2.513-2.406 2.513-1.075 0-1.848-.558-2.073-1.526h-.049v1.428Zm.069-2.336c0 1.144.723 1.799 1.887 1.799 1.154 0 1.868-.48 1.868-1.877 0-1.398-.734-1.868-1.848-1.868-1.223 0-1.907.665-1.907 1.858v.088Zm5.947 3.999h-.606v-.636h.733c.49 0 .675-.146.86-.547l.236-.489-2.396-4.82h.763l1.417 2.874.538 1.183h.059l.518-1.193 1.34-2.864h.762l-2.62 5.505c-.352.743-.802.987-1.604.987Zm11.538-1.662h-4.85V34.19h.695v5.915h4.155v.636Zm1.478-5.446h-.694V34.19h.694v1.105Zm0 5.446h-.694v-4.83h.694v4.83Zm1.794 0h-.626V34.19h.694v3.07h.05c.205-.831.899-1.447 2.062-1.447 1.516 0 2.347 1.046 2.347 2.513 0 1.466-.831 2.513-2.405 2.513-1.076 0-1.848-.558-2.073-1.526h-.049v1.428Zm.068-2.337c0 1.144.724 1.799 1.887 1.799 1.154 0 1.868-.48 1.868-1.877 0-1.398-.733-1.868-1.848-1.868-1.222 0-1.907.665-1.907 1.858v.088Zm7.61 2.435c-1.555 0-2.542-.978-2.542-2.513 0-1.467.978-2.513 2.532-2.513 1.418 0 2.425.821 2.425 2.258 0 .177-.02.323-.049.45H27.83c.04 1.086.596 1.74 1.877 1.74 1.134 0 1.663-.42 1.663-1.124v-.068h.694v.068c0 1.007-.998 1.702-2.347 1.702Zm-.02-4.45c-1.251 0-1.818.646-1.867 1.702h3.647v-.147c0-1.017-.645-1.554-1.78-1.554Zm4.05 4.352h-.694v-4.83h.626v1.32h.049c.146-.773.694-1.418 1.701-1.418 1.115 0 1.604.821 1.604 1.72v.48h-.695v-.372c0-.821-.342-1.222-1.183-1.222-.978 0-1.408.616-1.408 1.701v2.62Zm7.052 0h-1.046c-.958 0-1.574-.401-1.574-1.535v-2.699h-.86v-.596h.86v-1.154h.704v1.154h1.916v.596h-1.916v2.738c0 .675.332.86 1.036.86h.88v.636Zm1.397 1.662h-.606v-.636h.733c.49 0 .675-.146.86-.547l.236-.489-2.396-4.82h.763l1.418 2.874.537 1.183h.059l.518-1.193 1.34-2.864h.762l-2.62 5.505c-.352.743-.802.987-1.604.987Zm5.588-1.662h-.695V34.19H50.1c1.418 0 2.415.811 2.415 2.21 0 1.407-.997 2.219-2.415 2.219h-2.317v2.122Zm2.258-5.916h-2.258v3.158h2.258c1.154 0 1.77-.469 1.77-1.583 0-1.096-.616-1.575-1.77-1.575Zm4.565 6.014c-.949 0-1.594-.45-1.594-1.232 0-.792.655-1.135 1.555-1.232l2.298-.255v-.371c0-.939-.411-1.31-1.467-1.31-1.037 0-1.584.371-1.584 1.222v.039h-.694v-.04c0-1.016.84-1.847 2.327-1.847 1.466 0 2.092.84 2.092 1.906v3.022h-.626v-1.3h-.048c-.284.89-1.135 1.398-2.26 1.398Zm-.9-1.281c0 .489.323.743 1.056.743 1.174 0 2.103-.518 2.103-1.682v-.04l-2.083.236c-.724.068-1.076.244-1.076.743Zm5.61 2.845h-.606v-.636h.733c.489 0 .675-.146.86-.547l.235-.489-2.395-4.82h.762l1.418 2.874.538 1.183h.059l.518-1.193 1.34-2.864h.762l-2.62 5.505c-.352.743-.802.987-1.604.987Z"
                    fill="#032282"
                  />
                </svg>
              </Link>
            </DialogTitle>

            <div className="flex items-center gap-6">
              {/* {status !== 'loading' && (
                <LinkButton
                  className="font-wix-display text-base text-main-solid xl:text-xl"
                  href={status === 'authenticated' ? '/dashboard' : '/login'}
                  size="unstyled"
                  variant="unstyled"
                >
                  {status === 'authenticated' ? 'Dashboard' : ' Log in'}
                </LinkButton>
              )} */}

              <DialogClose className="ml-auto h-max bg-main-solid-light py-1.5 font-wix-display text-sm text-white">
                Close
              </DialogClose>
            </div>
          </DialogHeader>

          <DialogBody className="px-4">
            <DialogDescription className="sr-only max-w-[11.8125rem] text-light-text">
              Paybox website menu
            </DialogDescription>

            <nav>
              <ul className="text-white">
                <motion.ul
                  animate="animate"
                  className="space-y-8"
                  initial="initial"
                  variants={staggerSpring}
                >
                  <div className="space-y-1 md:space-y-2">
                    {linkGroups.map(({ link, text, disabled }) => {
                      const isSelected = pathname === link;

                      return disabled || isSelected ? undefined : (
                        <motion.li key={link} variants={fadeInFromBottom}>
                          <Link
                            className="block border-b border-b-blue-700/20 pb-2 pt-8 font-wix-display text-xl text-main-solid hover:opacity-60"
                            href={link}
                          >
                            {text}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </div>

                  <motion.li variants={fadeInFromBottom}>
                    <LinkButton
                      className="flex w-full justify-start gap-3 font-normal"
                      href="/request-early-access"
                      variant="white"
                    >
                      <span className="text-left text-xl">
                        <span>Request </span>
                        <span>early</span>
                        <span> access</span>
                      </span>

                      <span>
                        <svg
                          fill="none"
                          height={14}
                          viewBox="0 0 14 14"
                          width={14}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.917 10.617a.446.446 0 0 0 .291-.117l8.167-8.166c.175-.175.175-.409 0-.584a.458.458 0 0 0-.642 0L2.567 9.917a.458.458 0 0 0 0 .642c.116.058.233.058.35.058Z"
                            fill="var(--main-solid)"
                          />
                          <path
                            d="M11.083 8.459a.46.46 0 0 0 .467-.467v-5.95a.46.46 0 0 0-.467-.467H5.075a.46.46 0 0 0-.467.467c0 .292.175.467.467.467h5.542V8.05c0 .234.233.409.466.409Z"
                            fill="var(--main-solid)"
                          />
                        </svg>
                      </span>
                    </LinkButton>
                  </motion.li>
                </motion.ul>
              </ul>
            </nav>
          </DialogBody>
        </DialogContent>
      </Dialog>
=======
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
>>>>>>> c5e893c155537ff82bef4dad7f3880e94da312e8
    </>
  );
}
