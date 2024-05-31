import * as React from 'react';

import {
  MainHeader,
} from '@/components/layout/main';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainHeader />
      {/* <LandingHeader /> */}
      

      <main className="relative font-wix-display">{children}</main>
    </>
  );
}
