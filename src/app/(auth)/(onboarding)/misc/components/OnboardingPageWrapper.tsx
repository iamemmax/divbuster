import * as React from 'react';
import { Balancer } from 'react-wrap-balancer';

import { cn } from '@/utils/classNames';

export function OnboardingPageWrapper({
  children,
  heading,
  subHeading,
  isCentered = false,
}: {
  children: React.ReactNode;
  heading: React.ReactNode;
  subHeading: React.ReactNode;
  isCentered?: boolean;
}) {
  return (
    <>
      <main className="relative mx-auto max-w-[32.375rem] md:h-auto md:min-h-0 md:w-full md:grow-0 md:overflow-y-auto ">
        <div className="relative h-auto px-6 pb-10 pt-[5vh] md:py-16 lg:px-14 ">
          <div
            className={cn(
              'absolute inset-0 rounded-[1.1875rem] from-[#EDF4FF] from-[-31.2%] to-white/20 to-[24.74%] opacity-20 bg-gradient-358'
            )}
          />
          <h1
            className={cn(
              'relative mb-1 font-clash text-2xl font-semibold leading-[normal] text-white lg:text-[2.125rem]',
              isCentered && 'text-center'
            )}
          >
            <Balancer className={cn(isCentered && 'text-center')}>
              {heading}
            </Balancer>
          </h1>
          <p
            className={cn(
              'relative mb-9 text-xs leading-[normal] text-white lg:text-sm',
              isCentered && 'text-center'
            )}
          >
            <Balancer className={cn(isCentered && 'text-center')}>
              {subHeading}
            </Balancer>
          </p>

          {children}
        </div>
      </main>
    </>
  );
}
