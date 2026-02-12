"use client"
import React, { useEffect, useState } from 'react'
import SideBar from './components/shared/SideBar'
import useRouteChangeEvent from '@/hooks/useRouteChangeEvent'
import { MobileMenuProvider } from '@/contexts/MobileMenuContext'
import { LanguageProvider } from '@/hooks/useLanguage'
import { DarkModeProvider } from '@/contexts/darkMode'

const OnboardingLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [isChangingRoute, setIsChangingRoute] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle initial mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle route changes
  useRouteChangeEvent(() => {
    setIsChangingRoute(true);

    // Hide the progress bar after a delay
    setTimeout(() => {
      setIsChangingRoute(false);
    }, 800);
  });

  return (
    <DarkModeProvider>
      <LanguageProvider>
        <MobileMenuProvider>
          <div className="flex flex-col h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            {/* Progress bar for route changes */}
            <div
              className={`fixed top-0 left-0 z-[100000] h-1 bg-[#F7931D] transition-all duration-300 ${
                isChangingRoute ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`}
            >
              <div className="h-full w-full origin-[0_50%] animate-indeterminate-progress"></div>
            </div>

            <div className="flex flex-1 h-full overflow-hidden">
              <SideBar />
              <main className={`flex-1 overflow-y-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 ${
                !mounted ? 'animate-pulse' : ''
              }`}>
                {children}
              </main>
            </div>
          </div>
        </MobileMenuProvider>
      </LanguageProvider>
    </DarkModeProvider>
  );
};

export default OnboardingLayout
