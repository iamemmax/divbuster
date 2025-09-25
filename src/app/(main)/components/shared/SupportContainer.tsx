import { User, userDetails, useUser } from '@/app/(auth)/api/getAuthenticatedUser'
import Moonicon from '@/app/icons/(dashboard)/Moonicon'
import SettingsIcon from '@/app/icons/(dashboard)/SettingsIcon'
import { Switch } from '@/components/core'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { UseQueryResult } from 'react-query'

interface prop{
   user: User | null
}
const SupportContainer = ({user}:prop) => {
  const [darkMode, setDarkMode] = useState(false)


  // Check for user's preference in localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', newMode.toString())
    
    // Toggle dark class on html element
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div>
      <h2 className='font-archivo font-medium text-[17px] text-[#BDBDBD] '>SUPPORT</h2>

      <div className="flex flex-col gap-4 mt-3">
        <Link href="/settings" className="flex items-center gap-4">
          <SettingsIcon />
          <p className='font-archivo font-medium text-[#4F4F4F] dark:text-white text-sm'>Settings</p>
        </Link>
        <div className="flex items-center gap-4">
          <Moonicon/>
          <p className='font-archivo font-medium text-[#4F4F4F] text-sm dark:text-white'>Dark mode</p>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
        </div>
      </div>
      <div className="mt-10 dark:text-white">
        <p className='font-archivo font-medium text-[#4F4F4F] text-sm dark:text-white'>Logged in as {user?.first_name} {user?.last_login && "on"} {user?.last_login}</p>
        <p className='font-archivo font-medium text-[#4F4F4F] text-sm dark:text-white'>Version 1.0.0.0</p>
      </div>
    </div>
  )
}

export default SupportContainer
