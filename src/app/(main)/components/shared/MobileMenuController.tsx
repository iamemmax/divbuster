'use client';

import React from 'react';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import MobileMenu from './MobileMenu';
import DiveBusterLogo from '@/components/icons/DiveBusterLogo';

const MobileMenuController = () => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useMobileMenu();
  
  return (
    <>
      <div className='flex items-center justify-between overflow-y-auto px-4 py-3 border-b border-[#E2E8F0] dark:border-gray-700 dark:bg-gray-900'>
        <DiveBusterLogo />
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center justify-center p-2 rounded-md focus:outline-none"
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setMobileMenuOpen} />
    </>
  );
};

export default MobileMenuController;