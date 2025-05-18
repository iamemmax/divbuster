"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LinkedInCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    
    if (code) {
      // Close this window and send the code back to the opener
      if (window.opener) {
        window.opener.postMessage({ type: "linkedin-oauth", code }, window.location.origin);
        window.close();
      } else {
        // If no opener, redirect back to login
        router.push("/login");
      }
    } else {
      // If no code, redirect back to login
      router.push("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing LinkedIn Login</h1>
        <p>Please wait while we complete your authentication...</p>
      </div>
    </div>
  );
}