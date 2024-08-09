"use client";

import { Button, DrawerMenu } from "@/components/core";
import { DrawerClose } from "@/components/core/Drawer";
import { cn } from "@/utils/classNames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import CaretDown from "./CaretDown";
import Logo from "@/app/(dashboard)/comp/icons/logo";
import HomeIcon from "@/app/(dashboard)/comp/icons/home";
import Notifications from "@/app/(dashboard)/comp/icons/notification";
import { getAuthenticatedUser, useUser } from "@/app/(auth)/(onboarding)/misc";
import CloseIcon from "@/app/(main)/misc/icons/CLoseIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { useQueryClient } from "react-query";
import { useAuth } from "@/contexts/authentication";
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
      title: "Hospital around",
      link: "/dashboard/hospital-around-me",
    },
    {
      title: "My Benefits",
      link: "/dashboard/my-benefits",
    },
  ];

  const { replace } = useRouter();
  const queryClient = useQueryClient();
  // const user = await getAuthenticatedUser();
  //     authDispatch({ type: "LOGIN", payload: user });
  const { authDispatch } = useAuth();
  const handleLogoutClick = () => {
    if (authDispatch) authDispatch({ type: "LOGOUT" });
    queryClient.clear();
    replace("/login");
  };

  return (
    <>
      <header className="bg-main px-6  md:px-[4.5rem] lg:px-[7.5rem]  py-6 border-b border-[#2B303C]">
        <div className="z-50 flex items-center justify-between">
          <a href={"/"} className="flex text-white items-center gap-3">
            <Logo className="" />
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
          <div className="hidden lg:flex">
            <div className="flex gap-4">
              <Link href="/">
                <Button className="rounded-full w-9 h-9 flex justify-center items-center shrink-0 bg-[#FFFFFF4D] p-2">
                  <HomeIcon height={15} width={16} />
                </Button>
              </Link>
              <Button className="rounded-full w-9 h-9 flex justify-center items-center shrink-0 bg-[#FFFFFF4D] p-2">
                <Notifications height={20} width={20} />
              </Button>
              {!isLoading && (
                <Button className="rounded-full w-9 h-9 text-sm text-white flex justify-center items-center shrink-0 bg-[#FFFFFF4D] p-1">
                  {/* {`${userData?.first_name?.slice(0, 1) ?? ""}${userData?.last_name?.slice(0, 1) ?? ""}`} */}

                  <img
                    src="/images/userIcon.png"
                    style={{ width: "100%", height: "100%" }}
                    alt="user"
                  />
                </Button>
              )}
              {/* <Button className="rounded-full w-9 h-9 text-sm text-white flex justify-center items-center shrink-0 bg-transparent p-2">
                <CaretDown />
              </Button> */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full w-9 h-9 text-sm text-white flex justify-center items-center shrink-0 bg-transparent p-2">
                    <CaretDown />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white z-[999] rounded-md shadow-md p-2">
                  <DropdownMenuItem
                    className="p-2 rounded-md text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={() => router.push("/dashboard/profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
                  <DropdownMenuItem
                    onClick={handleLogoutClick}
                    className="p-2 rounded-md text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

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
                    "bg-white/10 h-8 w-8 rounded-full text-white/50 rotate-12 text-lg hover:text-white",
                    "font-display"
                  )}
                >
                  <CloseIcon />
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
      </header>
    </>
  );
}
