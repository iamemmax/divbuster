"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FullPageLoader from "@/app/(main)/loading";

const PageLoadWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading animation on route change
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800); // adjust to match your animation or data loading

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (loading) return <FullPageLoader />;
  return <>{children}</>;
};

export default PageLoadWrapper;
