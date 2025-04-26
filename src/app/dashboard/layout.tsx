"use client"
import React, { useState } from 'react'
import DashboardHeader from './(dashboard)/components/navigation/DashboardHeader'
import Sidebar from './(dashboard)/components/navigation/Sidebar'
import MobileNav from './(dashboard)/components/navigation/MobileNav'

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
   <div className="w-full h-screen">
    {/* Desktop Layout */}
    <div className="hidden lg:grid lg:grid-cols-[auto_1fr] h-full">
      <div className="bg-[#090E29] h-full">
        <Sidebar/>
      </div>
      <div className="w-full h-full">
        <DashboardHeader/>
        <main className="p-6 overflow-y-auto h-[calc(100vh-98px)]">
          {children}
        </main>
      </div>
    </div>

    {/* Mobile Layout */}
    <div className="lg:hidden flex flex-col h-screen">
      <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
      <main className="flex-1 p-4 overflow-y-auto">
        {children}
      </main>
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
   </div>
  )
}

export default DashboardLayout
