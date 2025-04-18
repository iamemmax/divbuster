"use client"
import { LinkButton } from '@/components/core'
import React, { useEffect } from 'react'
import OpticalLogo from '../icons/Logo'
import HomeIcon from '../icons/HomeIcon'

const OnboardingLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Add iOS-specific height fix
  useEffect(() => {
    // Fix for iOS viewport height issues
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    
    window.addEventListener('resize', appHeight);
    appHeight();
    
    return () => window.removeEventListener('resize', appHeight);
  }, []);

  return (
    <div className={`w-full h-screen bg-[url('/images/homepage/landing-page-bg.svg')]  overflow-hidden grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] `}  style={{ height: 'var(--app-height)' }}>
      <div className="w-full h-full bg-[#02010D]  flex flex-col overflow-hidden">
        {/* Fixed header section */}
        <div className="flex justify-between items-center w-full px-4 md:px-[2rem] xl:px-[4.5rem] py-6  xl:pt-[2rem]">
          <div>
            <LinkButton className='text-white px-0 lg:px-[1rem] font-verdana font-bold text-xs md:text-base' href={"/"}>
              <OpticalLogo/> Opticraft Trading
            </LinkButton>
          </div>
          <div>
            <LinkButton className='text-white px-[1.5rem] py-1.5 lg:py-2 font-normal font-outfit gap-2 border-[#4649E5] border-[0.5px] border-opacity-50 rounded-[1.25rem] text-base' href={"/"} variant={'outlined'}>
              <HomeIcon/> <span className="hidden lg:block">Home</span>
            </LinkButton>
          </div>
        </div>
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-[2rem]  flex justify-center items-center mt-[1rem] xl:mt-[2rem] pb-[2.625rem]">
          <div className="w-full max-w-[40.75rem] ">

          {children}
          </div>
        </div>
      </div>
      <div className="max-lg:hidden w-full  border-l border-[#4453DD] bg-[url('/images/onboarding/phone-img.svg')] max-xl:bg-contain bg-no-repeat bg-[position:center_right] xl:bg-[position:bottom_right]">
      </div>
    </div>
  )
}

export default OnboardingLayout

// bg-[url('/images/homepage/landing-page-bg.svg')] 