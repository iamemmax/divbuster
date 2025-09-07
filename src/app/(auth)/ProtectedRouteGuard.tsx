"use client";

import { useAuth } from "@/contexts/authentication";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import FullPageLoader from "../(main)/loading";

export default function ProtectedRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState } = useAuth();
  const { isAuthenticated, isLoading } = authState;
  const pathname = usePathname();
  const router = useRouter();

  // Define protected route patterns
  const protectedRoutes = [
    "/",
    "/div-buddies",
    "/div-log", // will cover /div-log and /div-log/[id]
    "/settings",
    "/div-sites",
    "/messages",
    "/bookings",
    "/profile",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated && isProtected) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, isProtected, router]);

  if ((isLoading || !isAuthenticated) && isProtected) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
}
