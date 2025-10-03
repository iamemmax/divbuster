import React from 'react'
import AuthLayoutLeftSection from './components/AuthLayoutLeftSection'
import { LanguageProvider } from '@/hooks/useLanguage'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <LanguageProvider>
    <div className='grid grid-cols-1 md:grid-cols-2 h-[100vh]'>
        <div className="bg-[url('/images/onboarding/auth-layout-bg.svg')] max-md:hidden h-full bg-cover bg-no-repeat">
        <AuthLayoutLeftSection/>
        </div>
        <div className="h-full bg-white">{children}</div>
    </div>

    </LanguageProvider>
  )
}

export default layout