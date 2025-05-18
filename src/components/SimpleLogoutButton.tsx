"use client";

import React from "react";
import { performLogout } from "@/app/(auth)/utils/logout";
import LogoutIcon from "@/app/icons/(dashboard)/LogoutIcon";

export default function SimpleLogoutButton({ className = "" }: { className?: string }) {
  return (
    <button 
      onClick={performLogout}
      className={`w-full text-left p-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-2 ${className}`}
    >
      <LogoutIcon className="w-4 h-4" />
      <span>Sign Out</span>
    </button>
  );
}

