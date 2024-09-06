import * as React from "react";

import { cn } from "@/utils/classNames";
// import { ScrollingFeatures } from "./(onboarding)/login/misc/components";
// import ScrollAnimationSVG from "./(onboarding)/login/misc/components/ScrollfeatureSvg";
import { LinkButton } from "@/components/core";
import Link from "next/link";
import { Liberty } from "@/icons/core";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen justify-between overflow-auto bg-[#080D27] md:flex md:flex-row-reverse md:justify-normal md:pb-0 p-2">
      <div className="relative min-h-screen bg-[radial-gradient(circle_at_center,_#202A57_0%,_#080D27_100%)]   rounded-[20px] md:flex md:basis-1/2 md:flex-col md:justify-center md:overflow-y-auto md:py-8 p-2 md:[@media(min-height:520px)]:items-center">
        <div
          className="absolute inset-y-0 left-[-10%] right-0 md:fixed md:left-auto md:w-[50vw]"
          aria-hidden
        >
          <div
            className={cn(
              "absolute inset-0 -scale-x-100 from-black/80 from-[50.08%] to-[#032282]/80 to-[104.44%] bg-gradient-225"
            )}
          />
        </div>

        <div className="relative md:hidden my-2 p-2 mb-5">
          <div className="flex items-center justify-between gap-4 lg:gap-10 xl:gap-[5.625rem]">
            <Link href="/">
              <span className="sr-only">Go home</span>

              <Liberty className="max-sm:max-w-[100px]"/>
            </Link>

            <LinkButton
              className="bg-[#FFFFFF4D] flex items-center gap-2 font-semibold text-base rounded-[20px]"
              href={"/"}
            >
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 19V10.5C20 10.3448 19.9639 10.1916 19.8944 10.0528C19.825 9.91393 19.7242 9.79315 19.6 9.7L12.6 4.45C12.4269 4.32018 12.2164 4.25 12 4.25C11.7836 4.25 11.5731 4.32018 11.4 4.45L4.4 9.7C4.2758 9.79315 4.175 9.91393 4.10557 10.0528C4.03614 10.1916 4 10.3448 4 10.5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H9C9.26522 20 9.51957 19.8946 9.70711 19.7071C9.89464 19.5196 10 19.2652 10 19V16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15H13C13.2652 15 13.5196 15.1054 13.7071 15.2929C13.8946 15.4804 14 15.7348 14 16V19C14 19.2652 14.1054 19.5196 14.2929 19.7071C14.4804 19.8946 14.7348 20 15 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19Z"
                  fill="white"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </LinkButton>
          </div>
        </div>
        {children}
      </div>

      <div className="hidden md:basis-1/2 md:block min-h-screen md:p-8">
        <div className="flex items-end justify-end">
          <LinkButton
            className="bg-[#FFFFFF4D] flex items-center gap-2 font-semibold text-base rounded-[20px]"
            href={"/"}
          >
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 19V10.5C20 10.3448 19.9639 10.1916 19.8944 10.0528C19.825 9.91393 19.7242 9.79315 19.6 9.7L12.6 4.45C12.4269 4.32018 12.2164 4.25 12 4.25C11.7836 4.25 11.5731 4.32018 11.4 4.45L4.4 9.7C4.2758 9.79315 4.175 9.91393 4.10557 10.0528C4.03614 10.1916 4 10.3448 4 10.5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H9C9.26522 20 9.51957 19.8946 9.70711 19.7071C9.89464 19.5196 10 19.2652 10 19V16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15H13C13.2652 15 13.5196 15.1054 13.7071 15.2929C13.8946 15.4804 14 15.7348 14 16V19C14 19.2652 14.1054 19.5196 14.2929 19.7071C14.4804 19.8946 14.7348 20 15 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19Z"
                fill="white"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span>Home</span>
          </LinkButton>
        </div>
        <div className="hidden md:flex justify-center items-center size-full bg-[url('/images/auth.svg')] bg-no-repeat bg-cover bg-center">
          {/* <div className="relative">
            <ScrollingFeatures />
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
              <ScrollAnimationSVG />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
//  <div className="flex h-screen w-screen bg-[url('/images/landing-page/background-loading.jpg')] bg-no-repeat bg-cover bg-center items-center justify-center">
