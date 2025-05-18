'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Lottie from 'lottie-react';
import loadingAnimation from '@/animations/loading-animation.json';

export function RouteChangeLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Store the current route
  const currentRoute = pathname + searchParams.toString();
  
  // Use a ref to track the previous route
  const previousRouteRef = React.useRef(currentRoute);

  // Show loading state when route changes
  useEffect(() => {
    // If the route has changed
    if (previousRouteRef.current !== currentRoute) {
      setIsLoading(true);
      
      // Hide loader after a short delay to prevent flashing
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // Adjust timing as needed
      
      // Update the previous route ref
      previousRouteRef.current = currentRoute;
      
      return () => clearTimeout(timer);
    }
  }, [currentRoute]);

  // Also show loading on initial page load
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-32 h-32">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
}