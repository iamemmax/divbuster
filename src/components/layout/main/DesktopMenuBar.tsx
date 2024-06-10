'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { cn } from '@/utils/classNames';

interface DesktopMenuLinkProps {
  link: string;
  text: string;
  disabled: boolean;
  isExternal: boolean;
<<<<<<< HEAD
=======
  className?:string
>>>>>>> c5e893c155537ff82bef4dad7f3880e94da312e8
}

export function DesktopMenuLink({
  text,
  link,
  disabled,
  isExternal,
<<<<<<< HEAD
=======
  className
>>>>>>> c5e893c155537ff82bef4dad7f3880e94da312e8
}: DesktopMenuLinkProps) {
  const pathname = usePathname();
  const isSelected = pathname === link;

  if (isExternal) {
    return (
      <a
<<<<<<< HEAD
        className="inline-block px-3 py-2.5 text-sm text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 xl:px-6 xl:py-[1.375rem] xl:text-base"
=======
        className={cn("inline-block px-3 py-2.5 text-sm min-w-max text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 xl:px-6 xl:py-[1.375rem] xl:text-base, className")}
>>>>>>> c5e893c155537ff82bef4dad7f3880e94da312e8
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {text}
      </a>
    );
  }

  return disabled ? (
    <button
      className={cn(
<<<<<<< HEAD
        'inline-block cursor-not-allowed px-3 py-2.5 text-sm text-white opacity-50 xl:px-6 xl:py-[1.375rem] xl:text-base',
        isSelected && 'font-bold'
=======
        'inline-block cursor-not-allowed px-3 py-2.5 text-sm min-w-max text-white opacity-50 xl:px-6 xl:py-[1.375rem] xl:text-base',
        isSelected && 'font-bold', className
>>>>>>> c5e893c155537ff82bef4dad7f3880e94da312e8
      )}
      disabled
    >
      {text}
    </button>
  ) : (
    <Link
      className={cn(
<<<<<<< HEAD
        'inline-block px-3 py-2.5 text-sm text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 xl:px-6 xl:py-[1.375rem] xl:text-base',
        isSelected && 'font-bold'
=======
        'inline-block px-3 py-2.5 text-sm text-white transition-all min-w-max duration-300 ease-in-out hover:-translate-y-0.5 xl:px-6 xl:py-[1.375rem] xl:text-base',
        isSelected && 'font-bold', className
>>>>>>> c5e893c155537ff82bef4dad7f3880e94da312e8
      )}
      href={link}
    >
      {text}
    </Link>
  );
}

export const linkGroups = [
  {
    link: '/',
    text: 'Home',
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  {
    link: '/plan',
    text: 'Plan',
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  {
    link: '/about-us',
    text: 'About us',
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  {
    link: '/faqs',
    text: 'FAQs',
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  // {
  //   link: 'https://blog.paybox.biz/',
  //   text: 'Blog',
  //   icon: undefined,
  //   disabled: false,
  //   isExternal: true,
  // },
  {
    link: '/contact-us',
    text: 'Contact us',
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
];

interface DesktopMenuBarProps {
  isColored: boolean;
}

export function DesktopMenuBar({ isColored }: DesktopMenuBarProps) {
  return (
    <nav className="hidden md:block">
      <ul
        className={cn(
          'flex font-display items-center text-sm gap-x-px transition-all duration-300 ease-in-out',
          isColored && 'bg-transparent'
        )}
      >
        {linkGroups.map(({ link, text, disabled, isExternal }) => {
          return (
            <li key={link}>
              <DesktopMenuLink
                disabled={disabled}
                isExternal={isExternal}
                link={link}
                text={text}
<<<<<<< HEAD
=======
                className="!text-xs"
>>>>>>> c5e893c155537ff82bef4dad7f3880e94da312e8
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
