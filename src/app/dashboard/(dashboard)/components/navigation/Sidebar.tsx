import DashboardIcon from '@/app/icons/(dashboard)/DashboardIcon'
import HistoryIcon from '@/app/icons/(dashboard)/HistoryIcon'
import HomeIcon from '@/app/icons/(dashboard)/HomeIcon'
import ProfileIcon from '@/app/icons/(dashboard)/ProfileIcon'
import SettingsIcon from '@/app/icons/(dashboard)/SettingsIcon'
import TradingIcon from '@/app/icons/(dashboard)/TrandingIcon'
import TransactionIcon from '@/app/icons/(dashboard)/TransactionIcon'
import OpticalLogo from '@/app/icons/Logo'
import { LinkButton } from '@/components/core'
import { useActivePath } from '@/utils/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isActive = useActivePath();
  
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
        href:"/dashboard/referral",
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
    <motion.div 
      className="relative h-screen"
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
        {/* Collapse Button */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-[#4453DD] text-white shadow-md hover:bg-[#2B3AA6]"
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
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
        </motion.button>

        {/* Main Sidebar Content Container */}
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className={`flex items-center border-b-[.0187rem] border-[#4453DD] border-opacity-50 h-[5.625rem] ${isCollapsed ? 'px-4 justify-center' : 'px-[1.875rem]'}`}>
              <LinkButton 
                href={"/"} 
                className='bg-transparent font-verdana outline-none border-none font-bold text-base p-0 flex items-center'
                onClick={(e) => e.preventDefault()}
              >
                <OpticalLogo/> 
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span 
                      className='pl-1'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      Opticraft Trading
                    </motion.span>
                  )}
                </AnimatePresence>
              </LinkButton>
          </div>

          {/* Navigation and Help Section Container */}
          <div className="flex flex-col h-[calc(100%-5.625rem)] overflow-hidden">
            {/* Navigation Section */}
            <div className={`flex-1 overflow-y-auto py-[2.75rem] ${isCollapsed ? 'px-2' : 'px-[1.875rem]'}`}>
              <nav>
                <ul className='flex flex-col gap-3'>
                  {navLinks?.map((links,idx:number)=>(
                    <motion.li 
                      className='' 
                      key={idx}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link 
                        href={links?.href} 
                        className={`flex items-center gap-[.625rem] text-white font-verdana text-sm font-medium py-[.8125rem] px-2 rounded-[10px] transition-all duration-200
                          ${isActive(links.href) 
                            ? 'bg-[#4453DD]/10 border-l-[4px] border-[#4453DD] text-white' 
                            : 'text-white/80 hover:bg-[#4453DD]/10 hover:border-l-[4px] hover:border-[#4453DD]'
                          }`}
                        title={isCollapsed ? links.title : ''}
                      >
                        <div className={`w-[30px] h-[30px] flex justify-center items-center ${isActive(links.href) ? 'text-[#4453DD]' : ''}`}>
                          {links?.icon}
                        </div> 
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.2 }}
                            >
                              {links?.title}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Help Section - Fixed at Bottom */}
            <div className={`p-4 mt-auto ${isCollapsed ? 'px-2' : ''}`}>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 border-[0.5px] border-[#4453DD] rounded-10 flex justify-center gap-[1.375rem] py-[2.5875rem] items-center flex-col"
                  >
                    <p className="bg-gradient-to-r from-[#DADADA] to-[#4453DD] text-center bg-clip-text text-transparent font-verdana font-bold text-lg">
                      Opticraft Trading Platform
                    </p>
                    <p className='text-white font-medium font-verdana text-xs'>24/7 Customer Support</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
    </motion.div>
  )
}

export default Sidebar
