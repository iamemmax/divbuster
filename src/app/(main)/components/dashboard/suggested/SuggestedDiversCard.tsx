"use client"
import { Button, LinkButton } from "@/components/core"
import { cn } from "@/utils/classNames"
import Image from "next/image"

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
}

export function SuggestedDiverCard({ name, location, date, profileImage, backgroundImage, stats, className }: DiverCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {/* Background Image */}
  <div className="flex items-start gap-[.625rem]">
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
    <h2 className="font-archivo font-semibold text-base md:text-xl text-[#1F2C37]">
      {name ?? ''}
    </h2>
    <p className="font-archivo font-medium text-[#78828A] text-sm md:text-base">{location}</p>
    <p className="font-archivo font-medium text-[#78828A] text-xs md:text-sm">{date}</p>
  </div>
</div>
 <div
  className="relative h-[240px]  mt-[.9375rem] w-full rounded-[1rem] bg-no-repeat bg-cover"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  {/* Black overlay */}
  <div className="absolute inset-0 bg-black/70 rounded-[1rem] z-0" />

  {/* Content */}
  <div className="relative flex flex-col items-start justify-between h-full z-10">
    <div>
      {/* Add Buddy Button */}
      <LinkButton href={"/div-buddies/add-new-buddy"} className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/70 bg-transparent px-4 py-2 text-white font-archivo text-base font-medium transition-colors hover:bg-black/50">
        <span className="text-sm lg:text-xl">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99935 4.16663V15.8333M4.16602 9.99996H15.8327"
                  stroke="white" strokeWidth="1.67" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>
        </span> Buddy
      </LinkButton>
    </div>

    <div className="px-[2.125rem] w-full pb-[1.375rem]">
      <div className="rounded-full bg-[#F7931D] max-w-[19.1875rem] text-center px-2 py-1">
        <p className="font-archivo text-xs text-white font-medium">{stats.description}</p>
      </div>
      <div className="flex justify-between mt-[.625rem] w-full  text-white">
        <div className="flex gap-4">
          <div className="flex flex-col items-start gap-y-[5px]" >
            <span className="text-xs text-[#FFFFFF] font-archivo font-medium">Time in</span>
            <span className="font-archivo font-semibold text-base text-white">{stats.timeIn}</span>
          </div>
          <div className="flex flex-col items-start  gap-y-[5px]">
            <span className="text-xs text-[#FFFFFF] font-archivo font-medium">Time out</span>
            <span className="font-archivo font-semibold text-base text-white">{stats.timeOut}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-start  gap-y-[5px]">
            <span className="text-xs text-[#FFFFFF] font-archivo font-medium">Max Depth</span>
            <span className="font-archivo font-semibold text-base text-white">{stats.maxDepth}</span>
          </div>
          <div className="flex flex-col items-start  gap-y-[5px]">
            <span className="text-xs text-[#FFFFFF] font-archivo font-medium">Bottom Time</span>
            <span className="font-archivo font-semibold text-base text-white">{stats.bottomTime}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    </div>
  )
}
