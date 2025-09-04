"use client";

import { useAuth } from "@/contexts/authentication";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FullPageLoader from "../(main)/loading";

// Define public routes that don't require authentication


export default function ProtectedRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const { authState } = useAuth();
  const { isAuthenticated, isLoading } = authState;
  const pathname = usePathname();
  const router = useRouter();
  const path = pathname; // Access pathname using useRouter


  // Handle routing based on authentication state
 const protectedRoutes = ["/","/div-buddies","/div-log","/settings","div-sites","/messages","/bookings"]; // Define your protected routes here

  useEffect(() => {
    if (!isLoading && !isAuthenticated && protectedRoutes.includes(path)) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, path, router]);
  // Show loading state while checking authentication
  if ((isLoading || !isAuthenticated) && protectedRoutes.includes(path)) {
    return <FullPageLoader />;
  }

  // Render children once authentication is checked
  return <>{children}</>;
}
