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
    <div className="fixed top-0 left-0 w-full z-20">
        <div className="text-white w-full ">
          <MainHeader />
        </div>
      </div>
        
        {/* Scrollable content area */}
        <div className="mt-5 bg-[url('/images/homepage/landing-page-bg.svg')]  bg-no-repeat bg-cover">
          {children}
        </div>
      </div>

  )
}

export default OnboardingLayout