import { DashboardHeader } from "@/components/layout/dashboard";
import * as React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <main className="relative bg-main font-wix-display  bg-white">
        {children}
      </main>
    </>
  );
}
