"use client"
import MessageIcon from "@/app/icons/(dashboard)/MessageIcon";
import NotificationIcon from "@/app/icons/(dashboard)/NotificationIcon";
// import WarningIcon from "@/app/icons/(dashboard)/WarningIcon";
import LogoutIcon from "@/app/icons/(dashboard)/LogoutIcon";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, LinkButton } from "@/components/core";
import React, { useState, useEffect, useRef } from "react";
import useIsMobile from "@/hooks/UseMobile";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { useAuth } from "@/contexts/authentication";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/app/(auth)/utils";
import { deleteAxiosDefaultToken } from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header = ({ subtitle, title }: HeaderProps) => {
  const router = useRouter();
  const { authState, authDispatch } = useAuth();
  
  // Extract user details and authentication state
  const { user} = authState;
  const isMobile = useIsMobile();
  const { setMobileMenuOpen } = useMobileMenu();
  const [showMobileActions, setShowMobileActions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileActions = () => {
    setShowMobileActions(!showMobileActions);
  };
  const userData = user

  const handleLogout = () => {
    if (authDispatch) {
      // Clear token from localStorage
      tokenStorage.clearToken();
      tokenStorage.clearAll();
      
      // Remove token from axios headers
      deleteAxiosDefaultToken();
      
      // Dispatch logout action to clear auth state
      authDispatch({ type: "LOGOUT" });
      
      // Close the dropdown
      setShowMobileActions(false);
      
      // Redirect to login page
      router.push("/login");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMobileActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // console.log(user);
  

  return (
    <div className="py-4 xl:py-6 md:px-[1.9375rem] px-3 w-full border-b border-[#E2E8F0] dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-200 flex justify-between items-center">
      <div className="flex items-center gap-3 ">
        {isMobile && (
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="mr-0 flex items-center justify-center py-2 pr-2 rounded-md focus:outline-none"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-white"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-white"/>
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-white"/>
            </svg>
          </button>
        )}
        <div className="">
          {title && (
            <h2 className="font-archivo font-semibold text-[#101828] dark:text-white text-xm sm:text-lg xl:text-[1.625rem] ">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="font-archivo font-medium text-[#78828A] dark:text-white/70 text-xs xl:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 xl:gap-4">
          {/* <Button className="bg-transparent p-0">
            <div className="border border-[#EEEEEE] flex justify-center items-center w-[2rem] xl:w-[2.5rem] h-[2rem] xl:h-[2.5rem] rounded-full ">
              <WarningIcon className="text-[#132346] dark:text-white"  />
            </div>
          </Button> */}
          <LinkButton href={"/messages"} className="bg-transparent p-0">
            <div className="border border-[#EEEEEE] flex justify-center items-center size-8 xl:size-10 rounded-full ">
              <MessageIcon className="text-[#132346] dark:text-white" />
            </div>
          </LinkButton>
          <LinkButton href={"/notifications"} className="bg-transparent p-0">
            <div className="border border-[#EEEEEE] flex justify-center items-center size-8 xl:size-10 rounded-full ">
              <NotificationIcon className="text-[#132346] dark:text-white" />
            </div>
          </LinkButton>
        </div>
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <div 
            onClick={isMobile ? toggleMobileActions : undefined}
            className="relative flex items-center"
            aria-label="User profile"
          >
          <div className="relative">
  <div className="xl:size-10 size-8 rounded-full overflow-hidden border-2 border-white dark:border-gray-700">
    {userData?.profile_details?.profile_picture ? (
      <Image
        src={userData.profile_details.profile_picture}
        alt="Diver profile"
        className="size-full object-cover"
        sizes="(max-width: 1280px) 32px, 40px"
        fill
      />
    ) : (
      <div className="size-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center">
        <span className="text-white dark:text-gray-100 text-base font-semibold font-archivo uppercase">
          {userData?.first_name?.charAt(0) || ""}
          {userData?.last_name?.charAt(0) || ""}
          {!userData?.first_name && !userData?.last_name && "??"}
        </span>
      </div>
    )}
  </div>
  <div className="absolute bottom-0 right-0 size-3 bg-green-500 dark:bg-green-400 rounded-full border-2 border-white dark:border-gray-700"></div>
</div>
            {/* Dropdown icon for mobile */}
            {isMobile && (
              <svg 
                className="ml-1 size-4 text-gray-500 dark:text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={showMobileActions ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  className="dark:stroke-white"
                ></path>
              </svg>
            )}
          </div>
          
          {/* Desktop user info with dropdown */}
          <div className="hidden md:block  ">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none">
                <div>
                  <p className="font-archivo font-medium text-[#344054] text-xs xl:text-base dark:text-white/70 text-left">
                    {userData?.first_name ??""} {userData?.last_name ??""}
                  </p>
                  <div className="flex items-center gap-1">
                  <p className="font-archivo font-medium text-[#78828A] text-xs xl:text-sm text-left">
                    {userData?.email ??""} 
                  </p>
                  <svg 
                className="ml-1 size-4 text-gray-500 dark:text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={showMobileActions ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  className="dark:stroke-white"
                ></path>
              </svg>
                  </div>
                </div>
              
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <DropdownMenuItem 
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogoutIcon className="size-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Actions Dropdown */}
          {isMobile && showMobileActions && (
            <div className="absolute top-full right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="font-archivo font-medium text-[#344054] text-sm dark:text-white/70">
                {userData?.first_name ??""} {userData?.last_name ??""}
                </p>
                <p className="font-archivo font-medium text-[#78828A] text-xs">
                 {userData?.email ??""}
                </p>
              </div>
              <div className="p-2">
                <Link href={"/messages"} className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <div className="border border-[#EEEEEE] dark:border-gray-600 flex justify-center items-center size-8 rounded-full">
                    <MessageIcon className="text-[#132346] dark:text-white"/>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-white/70">Messages</span>
                </Link>
                <Link href={"/notifications"} className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <div className="border border-[#EEEEEE] dark:border-gray-600 flex justify-center items-center size-8 rounded-full">
                    <NotificationIcon className="text-[#132346] dark:text-white"/>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-white/70">Notifications</span>
                </Link>
              </div>
              <div className="p-2 border-t border-gray-200 dark:border-gray-700">
               
                <Button 

                  className="bg-transparent p-2 cursor-pointer flex gap-3 text-sm font-medium text-gray-700 dark:text-white/70"
                  onClick={handleLogout}
                >
                <div className="border border-[#EEEEEE] dark:border-gray-600  flex justify-center items-center size-8 rounded-full">
                    <LogoutIcon />
                  </div>  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
