import * as React from "react";

import { MainHeader } from "@/components/layout/main";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-main">
      <MainHeader />
      <main className="relative font-wix-display">{children}</main>
    </div>
  );
}
