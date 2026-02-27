"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleAuth } from "@/app/(auth)/api/googleAuth";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: handleGoogleAuth } = useGoogleAuth();
  const { openErrorModalWithMessage } = useErrorModalState();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    
    if (error) {
      console.error("Google OAuth error:", error);
      openErrorModalWithMessage(`Google login failed: ${error}`);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }
    
    if (code) {
       
      // Exchange code for token and authenticate
      handleGoogleAuth(
        { 
          token: code,
          language: "english" // Default language
        },
        {
          onSuccess: () => {
                       router.push("/");
          },
          onError: (error) => {
            console.error("Google auth API error:", error);
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
        }
      );
    } else {
      // If no code, redirect back to login
      router.push("/login");
    }
  }, [router, searchParams, handleGoogleAuth, openErrorModalWithMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Processing Google Login</h2>
        <p className="text-gray-600 mb-6">Please wait while we complete your authentication...</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full size-12 border-b-2 border-[#F7931D]"></div>
        </div>
      </div>
    </div>
  );
}