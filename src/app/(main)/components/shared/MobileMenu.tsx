'use client';

import React, { useEffect } from 'react';
import { cn } from '@/utils/classNames';
import NavigationBar from './NavigationBar';
import CloseIcon from '@/app/icons/CloseIcon';
import { toggleBodyScroll } from '@/utils/inputs';
import CardContainer from './CardContainer';
import SupportContainer from './SupportContainer';
import DiveBusterLogo from '@/components/icons/DiveBusterLogo';
import { useAuth } from '@/contexts/authentication';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  // Disable body scroll when menu is open
  const {authState}= useAuth()
  const {user} = authState
  useEffect(() => {
    toggleBodyScroll(isOpen);
    return () => toggleBodyScroll(false);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 left-0 h-full w-[85%] max-w-[300px] bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 translate-x-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0] dark:border-gray-700">
            <DiveBusterLogo />
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close menu"
            >
              <CloseIcon className="text-black dark:text-gray-300" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <NavigationBar onItemClick={() => setIsOpen(false)} />
            <div className="mt-3">
              <CardContainer  user={user}/>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E9E9E9] dark:border-gray-700">
              <SupportContainer user={user}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;



