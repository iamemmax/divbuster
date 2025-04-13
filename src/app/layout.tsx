"use client";
import { DM_Sans, Wix_Madefor_Display,Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/classNames";
import { Suspense } from "react";
import ReactQueryProvider from "@/lib/reactQuery";
import { AuthProvider } from "@/contexts/authentication";
// import { useUser } from "./(auth)/(onboarding)/misc";
import { Toaster } from "react-hot-toast";
import ProtectedRouteGuard from "./(auth)/(onboarding)/misc/ProtectedRouteGuard";
import { Wrapper } from "./(auth)/(onboarding)/misc/Wrapper";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html className={cn(sans.variable, display.variable, outfit.variable)} lang="en">
      <head>
       

        <link rel="shortcut icon" href="/icon.ico" />
      </head>
      <body className=" bg-main">
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
        <ReactQueryProvider>
          <AuthProvider>
            <ProtectedRouteGuard>
              <Suspense fallback={"Loading"}>
                {" "}
                {/* Using the Loading component here */}
                <Wrapper>{children}</Wrapper>
              </Suspense>
            </ProtectedRouteGuard>
          </AuthProvider>
          

         
        </ReactQueryProvider>
</body>

      {/* Heala Configuration */}
    </html>
  );
}
