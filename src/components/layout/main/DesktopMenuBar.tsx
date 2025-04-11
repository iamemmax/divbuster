"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { cn } from "@/utils/classNames";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/core";
import { useAuth } from "@/contexts/authentication";


interface DesktopMenuLinkProps {
  link: string;
  text: string;
  disabled: boolean;
  isExternal: boolean;
  className?: string;
  isDropdown?: boolean;
  dropdownMenu?: {
    text: string;
    link?: string;
    action?: () => void;
  }[];
}

export function DesktopMenuLink({
  text,
  link,
  disabled,
  isExternal,
  className,
  isDropdown,
  dropdownMenu,
}: DesktopMenuLinkProps) {
  const pathname = usePathname();
  const isSelected = pathname === link;

  if (isExternal) {
    return (
      <a
        className={cn(
          "inline-block px-3 py-2.5 text-sm min-w-max text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 xl:px-4 xl:py-[1.375rem] xl:text-base",
          className
        )}
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {text}
      </a>
    );
  }


  return disabled ? (
    <>
      <button
        className={cn(
          "inline-block cursor-not-allowed px-3 py-2.5 text-sm min-w-max text-white opacity-50 xl:px-4 xl:py-[1.375rem] xl:text-base",
          isSelected && "font-bold",
          className
        )}
        disabled
      >
        {text}
      </button>
    </>
  ) : isDropdown ? (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex gap-2 px-3 py-2.5 text-sm text-white transition-all  duration-300 ease-in-out hover:-translate-y-0.5 xl:px-4 xl:py-[1.375rem] xl:text-base",
          isSelected && "font-bold",
          className
        )}
      >
        {text}
        <div className="mt-1">
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.825.158 5 3.975 1.175.158 0 1.333l5 5 5-5z"
              fill="#fff"
            />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownMenu?.map((menu) => (
          <DropdownMenuItem className="text-[#1B1687]">
            <p onClick={menu.action}>{menu.text}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link
      className={cn(
        "inline-block px-3 py-2.5 text-sm text-white transition-all min-w-max duration-300 ease-in-out hover:-translate-y-0.5 xl:px-4 xl:py-[1.375rem] xl:text-base",
        isSelected && "font-bold",
        className
      )}
      href={link}
    >
      {text}
    </Link>
  );
}
const pathname = typeof window !== "undefined" ? window.location.pathname : "";
export const linkGroups = [
  {
    link: "/",
    text: "Home",
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  {
    link: "/about-us",
    text: "About us",
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  {
    
    link: pathname?.includes("/plan/aproko-doctor")?"/plan/aproko-doctor?select-plan=true":"/plan",
    text: "Plans",
    icon: undefined,
    disabled: false,
    isExternal: false,
    isDropdown: false,
  },
  {
    link: "/hospital-around",
    text: "Hospitals around",
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  
  {
    link: "/faqs",
    text: "Faqs",
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  // {
  //   link: "/",
  //   text: "Blogs",
  //   icon: undefined,
  //   disabled: false,
  //   isExternal: false,
  // },
  {
    link: "/contact-us",
    text: "Contact us",
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
  {
    link: "/my-benefits",
    text: "Benefits",
    icon: undefined,
    disabled: false,
    isExternal: false,
  },
];

interface DesktopMenuBarProps {
  isColored: boolean;
}

export function DesktopMenuBar({ isColored }: DesktopMenuBarProps) {
  const pathname = usePathname();
  const { authState } = useAuth();
  const { isAuthenticated } = authState;

  const linkGroups = [
    {
      link: "/",
      text: "Home",
      icon: undefined,
      disabled: false,
      isExternal: false,
    },
    {
      link: "/about-us",
      text: "About us",
      icon: undefined,
      disabled: false,
      isExternal: false,
    },
    {
      link: pathname?.includes("/plan/aproko-doctor") ? "/plan/aproko-doctor?select-plan=true" : "/plan",
      text: "Plans",
      icon: undefined,
      disabled: false,
      isExternal: false,
      isDropdown: false,
    },
    {
      link: "/hospital-around",
      text: "Hospitals around",
      icon: undefined,
      disabled: false,
      isExternal: false,
    },
    {
      link: "/my-benefits",
      text: "Benefits",
      icon: undefined,
      disabled: false,
      isExternal: false,
    },
    {
      link: "/faqs",
      text: "FAQs",
      icon: undefined,
      disabled: false,
      isExternal: false,
    },
    {
      link: "/contact-us",
      text: "Contact us",
      icon: undefined,
      disabled: false,
      isExternal: false,
    },
    ...(isAuthenticated
      ? [
          {
            link: "/dashboard",
            text: "Dashboard",
            icon: undefined,
            disabled: false,
            isExternal: false,
          },
        ]
      : []),
  ];


  

  return (
    <nav className="hidden md:block">
      <ul
        className={cn(
          "flex font-display items-center text-sm gap-x-0 transition-all duration-300 ease-in-out",
          isColored && "bg-transparent"
        )}
      >
        {linkGroups.map(({ link, text, disabled, isExternal, isDropdown }) => (
          <li key={link}>
            <DesktopMenuLink
              disabled={disabled}
              isExternal={isExternal}
              link={link}
              text={text}
              className="!text-xs"
              isDropdown={isDropdown}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
