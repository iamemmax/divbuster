import NotificationIcon from '@/app/icons/(dashboard)/NotificationIcon'
import { Button } from '@/components/core'
import { CaretDown } from '@/components/icons'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const getPageTitle = (pathname: string): string => {
  const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
  const lastSegment = pathSegments[pathSegments.length - 1];
  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  return (
    <div className='flex justify-between items-center px-4 lg:px-[2.625rem] border-b-[.0187rem] border-[#4453DD] border-opacity-50 h-[4.375rem] md:h-[5.625rem] w-full'>
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-white hover:bg-[#4453DD]/10 rounded-lg"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className='text-white font-bold font-verdana text-sm lg:text-2xl'>{getPageTitle(usePathname())}</h2>
      </div>
      <div className="flex items-center gap-4">
      <div className="md:w-[2.5rem] md:h-[2.5rem] h-[2rem] w-[2rem] rounded-full flex justify-center items-center bg-[#122251]"><Button className="p-0 bg-transparent">
        <NotificationIcon/>
          </Button></div>
        <div className="md:w-[2.5rem] md:h-[2.5rem] h-[2rem] w-[2rem] rounded-full flex justify-center items-center bg-[#122251]">
          <Image
          alt=''
          className='rounded-full'
          src={"/images/dashboard/userIcon.png"}
          height={40}
          width={40}

          />
        </div>
        
        <div className="flex items-end gap-2">
          <div className="text-[#A6A6A6] font-verdana font-normal text-sm max-sm:hidden"> 
            <h2 className='text-white font-verdana font-bold text-sm '>Annabelle Amapiano</h2>
            <p className='text-white/70 font-outfit text-xxs font-medium'>annabelleamapiano@gmail.com</p>
          </div>
          <Button className='p-0 bg-transparent h-fit'><CaretDown/></Button>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
