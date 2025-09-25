"use client"
import React, { useState, useEffect } from 'react'
import NavigationBar from './NavigationBar'
import MobileMenu from './MobileMenu'
import useIsMobile from '@/hooks/UseMobile'
import CardContainer from './CardContainer'
import SupportContainer from './SupportContainer'
import DiveBusterLogo from '@/components/icons/DiveBusterLogo'
import { useMobileMenu } from '@/contexts/MobileMenuContext'
import SimpleLogoutButton from "@/components/SimpleLogoutButton";
import { useUser } from '@/app/(auth)/api/getAuthenticatedUser'
import { useLanguage } from '@/hooks/useLanguage'
import { useAuth } from '@/contexts/authentication'

const SideBar = () => {
  const {authState}= useAuth()
  const {user}=authState
  const isMobile = useIsMobile();
  const { isMobileMenuOpen, setMobileMenuOpen } = useMobileMenu();
  const [mounted, setMounted] = useState(false);
  
  // Handle initial mounting
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // If not mounted yet, render a placeholder with the same dimensions
  if (!mounted) {
    return (
      <div className="h-[56px] border-b border-[#E2E8F0] dark:border-gray-700 dark:bg-gray-900">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-full"></div>
      </div>
    );
  }

  // For mobile, render the MobileMenu component when it's open
  if (isMobile) {
    return (
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setMobileMenuOpen} />
    );
  }

  // For desktop, render the full sidebar
  return (
    <div className='border-r border-[#E2E8F0] dark:border-gray-700 h-[100vh] py-6 xl:py-[1.9375rem] flex flex-col gap-6 dark:bg-gray-900'>
      <div className="flex justify-center items-center px-8">
        <DiveBusterLogo />
      </div>
      <div className="overflow-y-auto">
        <div className="px-8">
          <NavigationBar/>
        </div>
        <div className="px-8 mt-2">
          <CardContainer user={user}/>
        </div>
        <div className="border-t border-[#E9E9E9] dark:border-gray-700 px-8 py-[1.3438rem]">
          <SupportContainer user={user}/>
        </div>
      </div>
    </div>
  )
}

export default SideBar
