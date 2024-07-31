"use client";

import { Button, DrawerMenu } from "@/components/core";
import { DrawerClose } from "@/components/core/Drawer";
import { cn } from "@/utils/classNames";
import Link from "next/link";

import * as React from "react";
import CaretDown from "./CaretDown";
import Logo from "@/app/(dashboard)/comp/icons/logo";
import HomeIcon from "@/app/(dashboard)/comp/icons/home";
import Notifications from "@/app/(dashboard)/comp/icons/notification";
import { useUser } from "@/app/(auth)/(onboarding)/misc";

export function DashboardHeader() {
  const { data: userData, isLoading } = useUser();

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
  return (
    <>
      <header className="bg-main px-6 md:px-[7.5rem] py-6 border-b border-[#2B303C]">
        <div className="z-50  flex items-center justify-between">
          <Link href={"/"} className="flex text-white items-center gap-3">
            <Logo className="" height={42} width={42} />
            <div className="font-wix-display">
              <h2 className="font-extrabold capitalize text-base md:text-xl text-nowrap leading-3">
                Liberty Life
              </h2>
              <p className="text-[.625rem] text-white text-opacity-65">
                by LibertyAssured.
              </p>
            </div>
          </Link>

          <div className="hidden lg:block">
            <nav>
              <ul className="flex items-center gap-[2.875rem]">
                {navLinks?.map((link, idx: number) => (
                  <Link
                    href={link?.link}
                    className="text-white text-sm text-opacity-65 hover:text-main-bg"
                    key={idx}
                    title={link?.title}
                  >
                    {link?.title}
                  </Link>
                ))}
              </ul>
            </nav>
          </div>
          <div className=" hidden lg:flex">
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
                <Button className="rounded-full  w-9 h-9 text-sm text-white flex justify-center items-center shrink-0 bg-[#FFFFFF4D] p-2">
                  {`${userData?.first_name?.slice(0, 1) ?? ""}${userData?.last_name?.slice(0, 1) ?? ""}`}
                </Button>
              )}
              <Button className="rounded-full w-9 h-9 text-sm text-white flex justify-center items-center shrink-0 bg-transparent p-2">
                <CaretDown />
              </Button>
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
                  x
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
                    <Link
                      href={link?.link}
                      className="text-white text-sm text-opacity-65 hover:text-main-bg"
                      title={link?.title}
                    >
                      {link?.title}
                    </Link>
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
