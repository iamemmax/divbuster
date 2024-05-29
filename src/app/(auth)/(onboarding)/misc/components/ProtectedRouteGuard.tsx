'use client';

import * as React from 'react';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/authentication'; // Import your authentication context
import { ScrollingFeatures } from '../../login/misc/components';
import ScrollAnimationSVG from '../../login/misc/components/ScrollfeatureSvg';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRouteGuard({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { authState } = useAuth();

  const protectedRoutes = ['/']; // Define your protected routes here

  const { isAuthenticated, isLoading } = authState;

  const path = pathname; // Access pathname using useRouter

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && protectedRoutes.includes(path)) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, path, router]);

  if ((isLoading || !isAuthenticated) && protectedRoutes.includes(path)) {
    return (
      <div className="flex h-screen w-screen bg-[url('/images/landing-page/background-loading.jpg')] bg-no-repeat bg-cover bg-center items-center justify-center">

        <div className="flex h-screen w-screen  backdrop-blur-md bg-[#080D27]/90 items-center justify-center">
          <div className="relative ">
            <ScrollingFeatures />
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
              <ScrollAnimationSVG />
            </div>
          </div>
        </div>

      </div>

    );
  }

  return <>{children}</>;
}