"use client";

import { useAuth } from "@/contexts/authentication";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import FullPageLoader from "../(main)/loading";
import { tokenStorage } from "./utils";
import { deleteAxiosDefaultToken } from "@/lib/axios";

export default function ProtectedRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState, authDispatch } = useAuth();
  const { isAuthenticated, isLoading } = authState;
  const pathname = usePathname();
  const router = useRouter();

  // Define protected routes
  const protectedRoutes = [
    "/",
    "/div-buddies",
    "/div-log",
    "/settings",
    "/dive-sites",
    "/messages",
    "/bookings",
    "/dive-finder",
    "/profile",
    "/token-management",
    "/manage-certifications",
  ];

  // Check if current path is protected
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  useEffect(() => {
    if (!isLoading && isProtected && !isAuthenticated) {
      // Ensure cleanup runs only once
      tokenStorage.clearToken();
      tokenStorage.clearAll();
      deleteAxiosDefaultToken();
      authDispatch({ type: "LOGOUT" });

      // Redirect to login page
      router.replace("/login");
    }
  }, [isLoading, isProtected, isAuthenticated, authDispatch, router]);

  // Show loader while verifying auth or redirecting
  if (isProtected && (isLoading || (!isAuthenticated && typeof window !== "undefined"))) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
}
