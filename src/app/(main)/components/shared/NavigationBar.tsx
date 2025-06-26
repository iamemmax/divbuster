"use client"
import React, { useEffect, useState } from "react";
import { cn } from "@/utils/classNames";
import { useActivePath } from "@/utils/navigation";
import Link from "next/link";
import useIsMobile from "@/hooks/UseMobile";
import BookingIcon from "@/app/icons/(dashboard)/BookingIcon";
import BuddiesIcon from "@/app/icons/(dashboard)/BuddiesIcon";
import BuddyIcon from "@/app/icons/(dashboard)/BuddyIcon";
import InsuranceIcon from "@/app/icons/(dashboard)/InsuranceIcon";
import LocationIcon from "@/app/icons/(dashboard)/LocationIcon";
import LogIcon from "@/app/icons/(dashboard)/LogIcon";
import ProfileIcon from "@/app/icons/(dashboard)/ProfileIcon";
import DashboardIcon from "@/app/icons/(dashboard)/Dashbaordicon";

interface NavigationBarProps {
  onItemClick?: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onItemClick }) => {
  const isActive = useActivePath();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  // Handle initial mounting
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };
  
  const navigationArray = [
    {
      name: "Dashboard",
      icon: <DashboardIcon className={cn(isActive("/") ? "text-[#F7931D] dark:text-[#F7931D] " : "text-[#4F4F4F] dark:text-white")} />,
      link: "/",
      hasBarge: false,
      bargeText: "",
    },
    {
      name: "Dive Buddies",
      icon: <BuddiesIcon className={cn(isActive("/div-buddies") ? "text-[#F7931D] dark:text-[#F7931D] " : "text-[#4F4F4F] dark:text-white")}
  
      />,
      link: "/div-buddies",
      hasBarge: false,
      bargeText: "",
    },
    {
      name: "Dive Log",
      icon: <LogIcon className={cn(isActive("/div-log") ? "text-[#F7931D] dark:text-[#F7931D] " : "text-[#4F4F4F] dark:text-white")}    />,
      link: "/div-log",
      hasBarge: false,
      bargeText: "",
    },
    {
      name: "Dive Sites",
      icon: <LocationIcon className={cn(isActive("/dive-sites") ? "text-[#F7931D] dark:text-[#F7931D] " : "text-[#4F4F4F] dark:text-white")} />,
      link: "/dive-sites",
      hasBarge: false,
      bargeText: "",
    },
    {
      name: "Buddy Finder",
      icon: <BuddyIcon className={cn(isActive("/div-finder") ? "text-[#F7931D] dark:text-[#F7931D] " : "text-[#4F4F4F] dark:text-white")} />,
      link: "/div-finder",
      hasBarge: true,
      bargeText: "New",
    },
    {
      name: "Bookings",
      icon: <BookingIcon className={cn(isActive("/bookings") ? "text-[#F7931D] dark:text-[#F7931D] " : "text-[#4F4F4F] dark:text-white")} />,
      link: "/bookings",
      hasBarge: false,
      bargeText: "",
    },
    {
      name: "My Profile",
      icon: <ProfileIcon className={cn(isActive("/profile") ? "text-[#F7931D] dark:text-[#F7931D] " : "text-[#4F4F4F] dark:text-white")} />,
      link: "/profile",
      hasBarge: false,
      bargeText: "",
    },
    {
      name: "Insurance",
      icon: <InsuranceIcon className={cn(isActive("/insurance") ? "text-[#F7931D] dark:text-[#F7931D] " : "text-[#4F4F4F] dark:text-white")} />,
      link: "/insurance",
      hasBarge: false,
      bargeText: "",
    },
  ];
  
  // If not mounted yet, render a placeholder
  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "transition-all duration-300"
    )}>
      <h2 className={cn(
        "text-[#BDBDBD] uppercase font-archivo font-medium",
        isMobile ? "text-[14px]" : "text-[17px]"
      )}>
        MENU
      </h2>
      <div className="mt-3">
        <nav>
            <ul className="flex flex-col gap-3">
                {
                    navigationArray.map((item) => (
                        <li key={item.name}>
                            <Link href={item.link} onClick={handleItemClick}>
                                <div className={cn(
                                  "flex items-center gap-4 py-2 px-3 transition-all duration-200",
                                  isActive(item.link) && "bg-[#F7931D]/10 text-[#F7931D] py-[11px] border-l-[4px] border-[#F7931D] rounded-[.25rem]"
                                )}>
                                    <div className={cn(
                                      isActive(item.link) ? "text-[#F7931D]" : "text-[#4F4F4F] w-[20px]"
                                    )}>
                                      {item.icon}
                                    </div>
                                    <div className={cn(
                                      "font-medium font-archivo",
                                      isMobile ? "text-xs" : "text-sm",
                                      isActive(item.link) ? "text-[#F7931D]" : "text-[#4F4F4F] dark:text-white"
                                    )}>
                                        {item.name}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
