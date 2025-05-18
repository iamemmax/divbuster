"use client";

import { useAuth } from "@/contexts/authentication";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FullPageLoader from "../(main)/loading";

// Define public routes that don't require authentication
const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export default function ProtectedRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState } = useAuth();
  const { isAuthenticated, isLoading } = authState;
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle routing based on authentication state
  useEffect(() => {
    if (!isClient || isLoading) return;

    try {
      const isPublicRoute = publicRoutes.some((route) => 
        pathname?.startsWith(route)
      );

      if (!isAuthenticated && !isPublicRoute) {
        console.log("Not authenticated, redirecting to login");
        router.push("/login");
      } else if (isAuthenticated && isPublicRoute) {
        console.log("Already authenticated, redirecting to dashboard");
        router.push("/");
      }
    } catch (error) {
      console.error("Error in ProtectedRouteGuard:", error);
    }
  }, [isAuthenticated, isLoading, pathname, router, isClient]);

  // Show loading state while checking authentication
  if (!isClient || isLoading) {
    return <FullPageLoader />;
  }

  // Render children once authentication is checked
  return <>{children}</>;
}
