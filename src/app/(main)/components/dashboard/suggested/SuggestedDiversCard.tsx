
"use client"
import { Button, LinkButton } from "@/components/core"
import { SmallSpinner } from "@/icons/core"
import { cn } from "@/utils/classNames"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"

export interface DiverCardProps {
  id: string
  name: string
  location: React.JSX.Element
  date: string
  profileImage: string
  backgroundImage: string
  stats: {
    description: string
    timeIn: string
    timeOut: string
    maxDepth: string
    bottomTime: string
  }
  className?: string
  addBuddyFunc: () => void
  isLoading: boolean
  linkUrl?: string // New prop for the link URL
}

export function SuggestedDiverCard({ 
  id,
  name, 
  location, 
  date, 
  profileImage, 
  backgroundImage, 
  stats, 
  className,
  addBuddyFunc,
  isLoading,
  linkUrl = `/div-buddies/profile/${id}` // Default link URL using the id
}: DiverCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-gray-700/20 border border-gray-100 dark:border-gray-700 transition-colors duration-200", className)}>
      {/* Clickable overlay that covers the entire card but allows button clicks through */}
      <Link href={linkUrl} className="absolute inset-0 z-10 cursor-pointer" />
      
      {/* Profile Section */}
      <div className="flex items-start gap-[.625rem] relative">
        <div className="relative xl:h-[3.4375rem] xl:w-[3.4375rem] w-[2rem] h-[2rem] rounded-full overflow-hidden bg-[#F7931D] flex items-center justify-center ">
          {profileImage ? (
            <Image
              alt="img"
              src={profileImage}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-[#fff] text-xl font-semibold font-archivo">
              {name
                ?.split(' ')
                .map((n) => n[0])
                .slice(0,1)
                .join('')
                .toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-y-[.3125rem] h-[5rem]">
          <h2 className="font-archivo font-semibold text-base md:text-xl text-[#1F2C37] dark:text-gray-100 transition-colors duration-200">
            {name ?? ''}
          </h2>
          <p className="font-archivo font-medium text-[#78828A] dark:text-gray-400 text-sm md:text-base transition-colors duration-200">{location}</p>
          <p className="font-archivo font-medium text-[#78828A] dark:text-gray-400 text-xs md:text-sm transition-colors duration-200">{date}</p>
        </div>
      </div>

      {/* Background Image Card */}
      <div
        className="relative h-[240px] mt-[.9375rem] w-full rounded-[1rem] bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/70 dark:bg-black/80 rounded-[1rem] z-0 transition-colors duration-200" />

        {/* Content */}
        <div className="relative flex flex-col items-start justify-between h-full z-10">
          <div>
            {/* Add Buddy Button - positioned above the link overlay */}
            <Button 
              onClick={addBuddyFunc}
              disabled={isLoading!}
              className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/70 dark:border-white/60 bg-transparent px-4 py-2 text-white font-archivo text-base font-medium transition-all duration-200 hover:bg-black/50 dark:hover:bg-white/20 hover:border-white/90 dark:hover:border-white/80 z-20 "
            >
              <span className="text-sm lg:text-xl">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99935 4.16663V15.8333M4.16602 9.99996H15.8327"
                        stroke="white" strokeWidth="1.67" strokeLinecap="round"
                        strokeLinejoin="round"/>
                </svg>
              </span> Buddy {isLoading && <SmallSpinner color="#F7931D"/>}
            </Button>
          </div>

          <div className="px-[2.125rem] w-full pb-[1.375rem]">
            <div className="rounded-full bg-[#F7931D] dark:bg-orange-500 max-w-[19.1875rem] text-center px-2 py-1 transition-colors duration-200">
              <p className="font-archivo text-xs text-white font-medium">{stats.description}</p>
            </div>
            <div className="flex justify-between mt-[.625rem] w-full text-white">
              <div className="flex gap-4">
                <div className="flex flex-col items-start gap-y-[5px]" >
                  <span className="text-xs text-[#FFFFFF] dark:text-gray-200 font-archivo font-medium transition-colors duration-200">Time in</span>
                  <span className="font-archivo font-semibold text-sm text-white dark:text-gray-100 transition-colors duration-200">{moment(stats.timeIn).format("ll")}</span>
                </div>
                <div className="flex flex-col items-start gap-y-[5px]">
                  <span className="text-xs text-[#FFFFFF] dark:text-gray-200 font-archivo font-medium transition-colors duration-200">Time out</span>
                  <span className="font-archivo font-semibold text-sm text-white dark:text-gray-100 transition-colors duration-200">{moment(stats.timeOut).format("ll")}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-start gap-y-[5px]">
                  <span className="text-xs text-[#FFFFFF] dark:text-gray-200 font-archivo font-medium transition-colors duration-200">Max Depth</span>
                  <span className="font-archivo font-semibold text-sm text-white dark:text-gray-100 transition-colors duration-200">{stats.maxDepth}</span>
                </div>
                <div className="flex flex-col items-start gap-y-[5px]">
                  <span className="text-xs text-[#FFFFFF] dark:text-gray-200 font-archivo font-medium transition-colors duration-200">Bottom Time</span>
                  <span className="font-archivo font-semibold text-sm text-white dark:text-gray-100 transition-colors duration-200">{stats.bottomTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}