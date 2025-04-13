"use client"
import { LinkButton } from '@/components/core'
import React, { useEffect } from 'react'
import OpticalLogo from '../icons/Logo'
import HomeIcon from '../icons/HomeIcon'
import { MainHeader } from './components/MainHeader'

const OnboardingLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Add iOS-specific height fix
  

  return (
    <div className='w-full h-screen '>
    <div className="fixed top-0 left-0 w-full z-20 bg-black">
        <div className="text-white w-full px-4 md:px-[2rem] xl:px-[4.5rem] pt-[1rem] xl:pt-[1.25rem]">
          <MainHeader />
        </div>
      </div>
        
        {/* Scrollable content area */}
        <div className="">
          {children}
        </div>
      </div>

  )
}

export default OnboardingLayout