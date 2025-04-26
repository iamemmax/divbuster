"use client"
import React from 'react'
import DashboardHeader from './(dashboard)/components/navigation/DashboardHeader'
import Sidebar from './(dashboard)/components/navigation/Sidebar'

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
   <div className="w-full h-screen grid grid-cols-[auto_1fr]">
    <div className="bg-[#090E29] h-full">
        <Sidebar/>
    </div>
    <div className="w-full h-full">
        <DashboardHeader/>
        {children}</div>
   </div>
  )
}

export default DashboardLayout
