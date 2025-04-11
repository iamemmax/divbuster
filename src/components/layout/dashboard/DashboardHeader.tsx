"use client";

import { Button, DrawerMenu } from "@/components/core";
import { DrawerClose } from "@/components/core/Drawer";
import { cn } from "@/utils/classNames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import CaretDown from "./CaretDown";
import HomeIcon from "@/app/(dashboard)/comp/icons/home";
import Notifications from "@/app/(dashboard)/comp/icons/notification";
import {  useUser } from "@/app/(auth)/(onboarding)/misc";
import CloseIcon from "@/app/(main)/misc/icons/CLoseIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
// import { useQueryClient } from "react-query";
// import { useAuth } from "@/contexts/authentication";
import { Liberty } from "@/icons/core";
import LogoutModal from "./LogoutModal";
export function DashboardHeader() {
  const { data: userData, isLoading } = useUser();
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter();
  const navLinks = [
    {
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      title: "Hospitals around",
      link: "/dashboard/hospital-around-me",
    },
    {
      title: "My Benefits",
      link: "/dashboard/my-benefits",
    },
    {
      title: "My Profile",
      link: "/dashboard/my-profile",
    },
  ];



  const [showLogoutModal, setShowLogoutModal] = React.useState(false)

  return (
    <>
      <header className="bg-main px-6  lg:px-[4.5rem] 2xl:px-[7.5rem] py-3 md:py-6 border-b border-[#2B303C]">
        <div className="z-50 flex items-center justify-between">
          <a href={"/"} className="flex text-white items-center gap-3">
            <Liberty className="max-lg:max-w-[100px]" />
            {/* <div className="font-wix-display">
              <h2 className="font-extrabold capitalize text-base md:text-xl text-nowrap leading-3">
                Liberty Life
              </h2>
              <p className="text-[.625rem] text-white text-opacity-65">
                by LibertyAssured.
              </p>
            </div> */}
          </a>

          <div className="hidden lg:block">
            <nav>
              <ul className="flex items-center gap-[2.875rem]">
                {navLinks?.map((link, idx: number) => (
                  <Link
                    href={link?.link}
                    className={cn(
                      "text-white text-sm text-opacity-65 hover:text-main-bg",
                      pathname === link.link && "text-main-bg font-bold"
                    )}
                    key={idx}
                    title={link?.title}
                  >
                    {link?.title}
                  </Link>
                ))}
              </ul>
            </nav>
          </div>


          <div className="flex  items-center gap-x-3 ">
            <div className="flex items-center gap-x-3 lg:hidden">

              <DrawerMenu
                trigger={
                  <Button
                    className={cn(
                      "lg:hidden bg-white/10 px-5 py-2.5 rounded-full",
                      "font-display"
                    )}
                  >
                    Menu
                  </Button>
                }
                contentClass="bg-main border-main"
              >

                <div className="text-white p-5 pb-0 gap-5">
                  <header className="flex items-center justify-between">
                    <h6 className="font-semibold text-lg">Menu Content</h6>
                    <DrawerClose
                      className={cn(
                        "bg-white/10 h-8 w-8 flex justify-center items-center  rounded-full text-white/50 rotate-12 text-lg hover:text-white",
                        "font-display"
                      )}
                    >
                      <CloseIcon color="#fff" />
                    </DrawerClose>
                  </header>

                  <ul
                    className={cn(
                      "font-display",
                      "flex flex-col gap-8 font-normal mt-10"
                    )}
                  >
                    {navLinks?.map((link, idx: number) => (
                      <li
                        className="border-b-[.0094rem] border-b-white/30 p-2"
                        key={idx}
                      >
                        <a
                          href={link?.link}
                          className={cn(
                            "text-white text-sm text-opacity-65 hover:text-main-bg",
                            pathname === link.link && "text-main-bg font-bold"
                          )}
                          title={link?.title}
                        >
                          {link?.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </DrawerMenu>
            </div>

            <div className="flex ">
              <div className="flex items-center w-full gap-4">
                <Link href="/">
                  <Button className="rounded-full w-9 h-9 hidden lg:flex justify-center items-center shrink-0 bg-[#FFFFFF4D] p-2">
                    <HomeIcon height={15} width={16} />
                  </Button>
                </Link>
                <Button className="rounded-full w-9 h-9 hidden lg:flex justify-center items-center shrink-0 bg-[#FFFFFF4D] p-2">
                  <Notifications height={20} width={20} />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="rounded-full  text-sm text-white flex justify-center items-center shrink-0 bg-transparent p-2">
                      {!isLoading && (
                        <Button className="rounded-full w-9 h-9 text-sm text-white flex justify-center items-center shrink-0 bg-[#FFFFFF4D] p-1">
                          {`${userData?.first_name?.slice(0, 1) ?? ""}${userData?.last_name?.slice(0, 1) ?? ""}`}
                        </Button>
                      )} <CaretDown />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-white z-[999] mt-2 rounded-md shadow-md p-2">
                    <DropdownMenuItem
                      className="p-2 border-b  text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                      onClick={() => router.push("/")}
                    >
                      Home
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="p-2 rounded-md text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                      onClick={() => router.push("/dashboard/my-profile")}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
                    <DropdownMenuItem
                      onClick={()=>setShowLogoutModal(true)}
                      className="p-2 rounded-md text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {
          showLogoutModal && <LogoutModal setShowSuccessModal={setShowLogoutModal} showSuccessModal={showLogoutModal}/>
        }
      </header>
    </>
  );
}
