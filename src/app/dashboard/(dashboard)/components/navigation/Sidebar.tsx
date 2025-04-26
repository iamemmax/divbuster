import DashboardIcon from '@/app/icons/(dashboard)/DashboardIcon'
import HistoryIcon from '@/app/icons/(dashboard)/HistoryIcon'
import HomeIcon from '@/app/icons/(dashboard)/HomeIcon'
import ProfileIcon from '@/app/icons/(dashboard)/ProfileIcon'
import SettingsIcon from '@/app/icons/(dashboard)/SettingsIcon'
import TradingIcon from '@/app/icons/(dashboard)/TrandingIcon'
import TransactionIcon from '@/app/icons/(dashboard)/TransactionIcon'
import OpticalLogo from '@/app/icons/Logo'
import { LinkButton } from '@/components/core'
import Link from 'next/link'
import React, { useState } from 'react'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinks = [
    {
        title:"Home",
        href:"/",
        icon:<HomeIcon/>
    },
    {
        title:"Dashboard",
        href:"/dashboard",
        icon:<DashboardIcon/>
    },
    {
        title:"Transaction",
        href:"/dashboard/transaction",
        icon:<TransactionIcon width={25} height={30}/>
    },
    {
        title:"Trading Signal",
        href:"/dashboard/trading-signal",
        icon:<TradingIcon/>
    },
    {
        title:"History (Graph)",
        href:"/",
        icon:<HistoryIcon/>
    },
    {
        title:"Referral",
        href:"/referral",
        icon:<HistoryIcon/>
    },
    {
        title:"Profile",
        href:"/dashboard/profile",
        icon:<ProfileIcon/>
    },
    {
        title:"Settings",
        href:"/dashboard/settings",
        icon:<SettingsIcon/>
    },
  ]

  return (
    <div className={`relative transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-[280px]'}`}>
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-3 top-12 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-[#4453DD] text-white shadow-md transition-transform duration-300 hover:bg-[#2B3AA6] ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current"
          >
            <path
              d="M15 6L9 12L15 18"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={`flex items-center border-b-[.0187rem] border-[#4453DD] border-opacity-75 py-[2.8125rem] ${isCollapsed ? 'px-4 justify-center' : 'px-[1.875rem]'}`}>
            <LinkButton 
              href={"/"} 
              className='bg-transparent font-verdana outline-none border-none font-bold text-base p-0 flex items-center'
              onClick={(e) => e.preventDefault()}
            >
              <OpticalLogo/> 
              {!isCollapsed && (
                <span className='pl-1 transition-opacity duration-200'>
                  Opticraft Trading
                </span>
              )}
            </LinkButton>
        </div>

        <div className={`flex flex-col mt-[2.75rem] gap-[3rem] justify-between h-full ${isCollapsed ? 'px-2' : 'px-[1.875rem]'}`}>
          <div className="flex-1 mb-auto h-full">
            <nav>
              <ul className='flex flex-col gap-1 xl:gap-3'>
                {navLinks?.map((links,idx:number)=>(
                  <li className='' key={idx}>
                    <Link 
                      href={links?.href} 
                      className={`flex items-center gap-[.625rem] text-white font-verdana text-sm font-medium py-[.8125rem] hover:bg-[#4453DD]/10 rounded-[10px] hover:border-l-[4px] hover:border-[#4453DD] transition-colors ${
                        isCollapsed ? 'justify-center px-2' : 'px-4'
                      }`}
                      title={isCollapsed ? links.title : ''}
                    >
                      <div className="w-[30px] h-[30px] flex justify-center items-center">
                        {links?.icon}
                      </div> 
                      {!isCollapsed && <span>{links?.title}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        {/* Help Section - Fixed at Bottom */}
        <div className={`mt-auto ${isCollapsed ? 'px-2' : ''} `}>
          {!isCollapsed && (
            <div className="px-4  border-[0.5px] border-[#4453DD] rounded-10 flex justify-center gap-[1.375rem] py-[2.5875rem] items-center flex-col">
              <p className="bg-gradient-to-r from-[#DADADA] to-[#4453DD] text-center  bg-clip-text text-transparent font-verdana font-bold text-lg">
                Opticraft Trading Platform
              </p>
              <p className='text-white font-medium font-verdana text-xs'>24/7 Customer Support</p>
            </div>
          )}
        </div>
        </div>
    </div>
  )
}

export default Sidebar
