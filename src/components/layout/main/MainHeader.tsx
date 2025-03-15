"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/core/Button";
import { LinkButton } from "@/components/core/LinkButton";
import { cn } from "@/utils/classNames";

import { MobileMenuDialog } from "./MobileMenuModal";
import { Liberty, RightUpArrow } from "@/icons/core";
import {
  ClientOnly,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@/components/core";
import { useUser } from "@/app/(auth)/(onboarding)/misc";

const _OldHeaderButtons: React.FunctionComponent = () => {
  return (
    <ul className="hidden items-center gap-2 xl:flex lg:gap-4">
      <li>
        <Button
          className="rounded-lg border-0 px-0 text-sm font-semibold text-[#344051] md:px-3 lg:inline-flex lg:border-[.0313rem] lg:border-main-solid-light xl:min-w-[9.375rem] xl:px-6 xl:py-3"
          variant="unstyled"
        >
          <span>
            <span>Book </span>
            <span className="hidden lg:inline">a</span>
            <span> demo</span>
          </span>
        </Button>
      </li>

      <li>
        <Button className="rounded-lg bg-main-solid-light text-sm font-medium md:px-3 xl:min-w-[9.375rem] xl:px-6 xl:py-3">
          <span>
            <span>Request </span>
            <span className="hidden lg:inline">early</span>
            <span> access</span>
          </span>
        </Button>
      </li>
    </ul>
  );
};

const pagesWithColoredBg = [
  "/",
  "/faqs",
  "/hospital-around",
  "/contact-us",
  "/about-us",
];
import { useAuth } from "@/contexts/authentication"; // Import your authentication context
import { DesktopMenuBar } from "./DesktopMenuBar";

export function MainHeader() {
  const pathname = usePathname();
  const { authState } = useAuth();
  const isColored = pagesWithColoredBg.includes(pathname);
  const { data: users } = useUser();
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated } = authState;
  // const [userActive, setUserActive] = React.useState(false);
  // React.useEffect(() => {
  //   if (users?.is_active) {
  //     setUserActive(true);
  //   } else {
  //     setUserActive(false);
  //   }
  // }, [users]);

  return (
    <div className={cn(isColored && "bg-main")}>
      <header
        className={cn(
          "max-w-screen px-6 md:px-[3rem] 2xl:px-[7.5rem] overflow-x-hidden flex items-center justify-between gap-4 py-4 font-wix-display md:gap-2 md:py-8 lg:gap-4",
          isColored && "bg-main"
        )}
      >
        <div className="flex items-center gap-4 lg:gap-10 xl:gap-[5.625rem]">
          <Link href="/">
            <span className="sr-only">Go home</span>
            <Liberty className="max-lg:max-w-[100px]" />
           
          </Link>
        </div>

        <DesktopMenuBar isColored={isColored} />

        <div className="flex items-center gap-[31px]">
          {!isAuthenticated ? (
            <a
              className={cn(
                "hidden lg:flex bg-white text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 text-main items-center justify-between rounded-full max-w-max",
                "font-display"
              )}
              href="/login"
            >
              Login
              <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
                <RightUpArrow className="" height={12} width={12} />
              </span>
            </a>
          ) : (
            <LinkButton
              className={cn(
                "hidden lg:flex items-center border  justify-between md:max-lg:text-sm  text-primary text-left  bg-white rounded-full max-w-max",
                "font-display"
              )}

              href="/dashboard"
              // variant={"outlined"}
              // target="_blank"
              // variant="white"
            >
              Dashboard
            </LinkButton>
          )}

          <ClientOnly>
            <Dialog open={open} onOpenChange={setOpen}>
              {/* <DialogTrigger className="bg-[#fff] text-[#000] hidden md:flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 rounded-full max-w-max font-display">
                Get insurance
                <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-5">
                  <RightUpArrow className="" height={12} width={12} />
                </span>
              </DialogTrigger> */}

              <DialogContent>
                <DialogHeader className="bg-[#1B1687] ">
                  <DialogTitle className="text-[#fff]">
                    Details Request
                  </DialogTitle>

                  <DialogClose>Close</DialogClose>
                </DialogHeader>

                <DialogBody className="bg-[#34307A] w-full ">
                  <div className="py-1">
                    <div className="text-[#fff] font-light">
                      Kindly enter your phone number to process your application
                    </div>

                    <div className="my-5">
                      <form action="">
                        <div className="flex flex-col gap-1">
                          <p className="text-[#FFFFFF]">Phone number</p>
                          <Input
                            className="text-[#FFFFFF]"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div className="mt-6 md:mt-12">
                          <Button
                            type="submit"
                            className="font-display focus:shadow-outline w-full rounded-lg bg-[#fff] p-4 py-3 font-semibold tracking-wide
  shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                          >
                            Continue
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </DialogBody>
              </DialogContent>
            </Dialog>
          </ClientOnly>
        </div>

        <div className="flex items-center gap-6 lg:hidden">
          <LinkButton
            className="text-base text-white xl:text-xl"
            href={isAuthenticated ? "/dashboard" : "/login"}
            size="unstyled"
            variant="unstyled"
          >
            {isAuthenticated ? "Dashboard" : " Login"}
          </LinkButton>

          <MobileMenuDialog />
        </div>
      </header>
    </div>
  );
}
