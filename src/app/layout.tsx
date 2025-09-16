"use client";
import { DM_Sans, Wix_Madefor_Display, Outfit, Archivo } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/classNames";
import { Suspense } from "react";
import ReactQueryProvider from "@/lib/reactQuery";
import { AuthProvider } from "@/contexts/authentication";
import { Toaster } from "react-hot-toast";
import FullPageLoader from "./(main)/loading";
import ProtectedRouteGuard from "./(auth)/ProtectedRouteGuard";
import { Wrapper } from "./(auth)/Wrapper";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouteChangeLoader } from "@/components/core/RouteChangeLoader";

// Updated Google Client ID from environment variables
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

// Add this to get the current origin for redirect URIs


const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Wix_Madefor_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Choose desired weights
  variable: "--font-archivo",          // optional: for Tailwind integration
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn(sans.variable, display.variable, outfit.variable, archivo.variable)}
      lang="en"
    >
      <body className="">
        <Toaster
          containerStyle={{
            zIndex: 99999,
          }}
          position="top-center"
          toastOptions={{
            style: {
              zIndex: 999999,
            },
          }}
        />
        <GoogleOAuthProvider 
          clientId={GOOGLE_CLIENT_ID as string}
          
          onScriptLoadSuccess={() => console.log("Google OAuth script loaded successfully")}
        >
          <ReactQueryProvider>
            <AuthProvider>
              <ProtectedRouteGuard>
                <RouteChangeLoader />
                <Suspense fallback={<FullPageLoader />}>
                  <Wrapper>{children}</Wrapper>
                </Suspense>
              </ProtectedRouteGuard>
            </AuthProvider>
          </ReactQueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
