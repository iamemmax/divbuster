"use client"
import React, { useState } from 'react'
import { Button, Modal } from '@/components/core'
import EyeIcon from '@/app/icons/EyeIcon'
import { toast } from 'sonner'
import ChromeIcon from '@/app/icons/broswer/ChromeIcon'
import PercentageChart from '@/components/core/PercentageChart'
import FirefoxIcon from '@/app/icons/broswer/FirefoxIcon'
import OperaIcon from '@/app/icons/broswer/OperaIcon'
import EdgeIcon from '@/app/icons/broswer/EdgeIcon'
import PhoenixIcon from '@/app/icons/broswer/PhoenixIcon'
import CloseIcon from '@/app/icons/CloseIcon'

const AccountSecurity = () => {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [sessions, setSessions] = useState([
    {
      id: 1,
      browser: "Chrome on mac OS",
      status: "Current session",
      location: "Lagos, Nigeria",
      lastLogged: "Current session"
    },
    {
      id: 2,
      browser: "opera on Tecno 30 pro",
      status: "Active",
      location: "Lagos, Nigeria",
      lastLogged: "30 mins ago"
    },
    {
      id: 3,
      browser: "firefox on mac OS",
      status: "Active",
      location: "Lagos, Nigeria",
      lastLogged: "3 days ago"
    },
    {
      id: 4,
      browser: "edge on Hp",
      status: "Active",
      location: "Lagos, Nigeria",
      lastLogged: "3 months ago"
    }
  ])

  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const handleRemoveClick = (sessionId: number) => {
    setSelectedSession(sessionId);
  };

  const handleConfirmRemove = () => {
    if (selectedSession) {
      setSessions(prev => prev.filter(session => session.id !== selectedSession));
      toast("Chrome on mac OS removed", {
        action: {
          label: "Undo",
          onClick: () => setSessions(prev => [...prev, sessions.find(s => s.id === selectedSession)!])
        },
      });
      setSelectedSession(null);
    }
  };

  const handleRemoveAllOtherSessions = () => {
    setSessions(prev => prev.filter(session => session.status === "Current session"))
  }

  const getBrowserIcon = (browser: string) => {
    const browserName = browser.toLowerCase();
    
    if (browserName.startsWith('chrome')) {
      return <ChromeIcon width={80} height={30}/>;
    } else if (browserName.startsWith('firefox')) {
      return <FirefoxIcon width={80} height={30}/>;
    } else if (browserName.startsWith('opera')) {
      return <OperaIcon width={80} height={30}/>;
    } else if (browserName.startsWith('edge')) {
      return <EdgeIcon width={80} height={30}/>; 
    } else if (browserName.startsWith('phoenix')) {
      return <PhoenixIcon width={80} height={30}/>;
    }
    
    // Default to Chrome icon if browser is not recognized
    return <ChromeIcon width={80} height={30}/>;
  };
  const currentSession = sessions.find(session => session.status === "Current session");
  const otherSessions = sessions.filter(session => session.status !== "Current session");
  
  return (
    <div className='w-full mx-auto'>
      {/* Security Alert Banner */}
      <div className="bg-[#0B1739] w-full border-l-[10px] border-[#4453DD] mb-4 md:mb-6 rounded-[1.25rem] py-4 lg:py-[1.75rem]">
        <div className="w-full 2xl:max-w-[1400px] px-4 ll   lg:px-[2.625rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
          <div className="flex items-center gap-2 lg:gap-3">
            <div >
              <PercentageChart 
                percentage={80}
                size={60}
                mobileSize={24}
                className="w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-white font-bold font-verdana text-base lg:text-lg">Your account security is 80%</h3>
              <p className="text-xs lg:text-sm font-outfit text-white/80">Please review your account security settings regularly and update your password</p>
            </div>
          </div>
          <Button 
            variant="outlined" 
            className="text-white/70 border-white/60 text-sm lg:text-base w-full md:w-auto"
          >
            Dismiss
          </Button>
        </div>
      </div>

      <div className="bg-[#090E2980] rounded-[1.25rem] p-4 md:p-[2.625rem]">
        {/* Security Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6 max-w-[1400px]">
          <div>
            <h1 className="text-lg md:text-xl font-verdana font-medium text-white mb-1">Security</h1>
            <p className="text-sm text-white/70">Update your password for security reasons</p>
          </div>
          <Button variant="outlined" className="text-white/70 border-white w-full md:w-auto">
            Forgot Withdrawal Pin?
          </Button>
        </div>

        {/* Password Change Form */}
        <div className=" border-y-[0.5px] border-[#696969] py-6 border-opacity-50">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 max-w-[1400px]">
          <div>
            <label className="block text-white mb-2">Old Password</label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter your old password"
                className="outline-none w-full bg-transparent rounded-lg px-4 py-3 text-white border border-white/20"
              />
              <button
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <EyeIcon />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                className="outline-none w-full bg-transparent rounded-lg px-4 py-3 text-white border border-white/20"
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <EyeIcon />
              </button>
            </div>
            <p className="text-xs text-white/50 mt-1">Must be at least 8 characters long - uppercase, lowercase, number, special characters (@*!_)</p>
          </div>

          <div>
            <label className="block text-white mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your new password"
                className="outline-none w-full bg-transparent rounded-lg px-4 py-3 text-white border border-white/20"
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <EyeIcon />
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Sessions Section */}
        <div className="mb-6 border-b-[0.5px] border-[#696969] py-6 border-opacity-50">
          <div className=" border-b-[0.5px] border-[#696969] py-6 border-opacity-50">
            <div className="max-w-[1400px] flex flex-col md:flex-row justify-between  items-start md:items-center gap-4 md:gap-0 mb-4">
            <div className=''>
                            <h2 className="text-lg font-medium text-white">Sessions</h2>
              <p className="text-sm text-white/70">Browsers and devices you've logged into Opticraft</p>
            </div>
            <Button
              variant="outlined"
              className="text-white/70 w-full md:w-auto rounded-lg border-[#1C2850] hover:bg-[#1C2850] transition-colors"
              onClick={handleRemoveAllOtherSessions}
            >
              Remove all other sessions
            </Button>

            </div>
          </div>

          <div className="space-y-4 max-w-[1400px]">
            {/* Current Session */}
            {currentSession && (
              <div key={currentSession.id}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center relative h-10 w-10 bg-white rounded-full p-1 justify-center">
                      {getBrowserIcon(currentSession.browser)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{currentSession.browser}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                        <span className="w-2 h-2 rounded-full bg-[#4453DD]" />
                        <span>{currentSession.status}</span>
                        <span className="w-2 h-2 rounded-full bg-[#696969]" />
                        <span>{currentSession.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outlined"
                    className="text-white/70 border-[#1C2850] hover:bg-[#1C2850] transition-colors rounded-lg w-full md:w-auto"
                    disabled={true}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}

            {/* Other Sessions */}
            {otherSessions.length > 0 && (
              <p className='font-verdana font-bold text-white text-base mt-8 mb-6'>
                {otherSessions.length} Other Sessions
              </p>
            )}
            
            {otherSessions.map((session) => (
              <div key={session.id}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center relative h-10 w-10 bg-white rounded-full p-1 justify-center">
                      {getBrowserIcon(session.browser)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{session.browser}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                        <span>Last logged in {session.lastLogged}</span>
                        <span className="w-2 h-2 rounded-full bg-[#696969]" />
                        <span>{session.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outlined"
                    className="text-white/70 border-[#1C2850] hover:bg-[#1C2850] transition-colors rounded-lg w-full md:w-auto"
                    onClick={() => handleRemoveClick(session.id)}
                  >
                    Remove
                  </Button>
                </div>
                
                {/* Confirmation Container */}
                {selectedSession === session.id && (
                  <div className="mt-2 p-4 bg-[#090E29] rounded-[20px] border-l-[8px] absolute px-7 py-4 right-0 z-[999] border-[#4453DD] max-w-[24.375rem]">
                    <div className="flex justify-between items-center gap-5">
                      <div className="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9987 14.6666C4.3167 14.6666 1.33203 11.6819 1.33203 7.99992C1.33203 4.31792 4.3167 1.33325 7.9987 1.33325C11.6807 1.33325 14.6654 4.31792 14.6654 7.99992C14.6654 11.6819 11.6807 14.6666 7.9987 14.6666ZM7.9987 13.3333C9.41319 13.3333 10.7697 12.7713 11.7699 11.7712C12.7701 10.771 13.332 9.41441 13.332 7.99992C13.332 6.58543 12.7701 5.22888 11.7699 4.22868C10.7697 3.22849 9.41319 2.66659 7.9987 2.66659C6.58421 2.66659 5.22766 3.22849 4.22746 4.22868C3.22727 5.22888 2.66536 6.58543 2.66536 7.99992C2.66536 9.41441 3.22727 10.771 4.22746 11.7712C5.22766 12.7713 6.58421 13.3333 7.9987 13.3333ZM7.9987 4.66658C8.17551 4.66658 8.34508 4.73682 8.4701 4.86185C8.59513 4.98687 8.66536 5.15644 8.66536 5.33325V8.66658C8.66536 8.8434 8.59513 9.01297 8.4701 9.13799C8.34508 9.26301 8.17551 9.33325 7.9987 9.33325C7.82189 9.33325 7.65232 9.26301 7.52729 9.13799C7.40227 9.01297 7.33203 8.8434 7.33203 8.66658V5.33325C7.33203 5.15644 7.40227 4.98687 7.52729 4.86185C7.65232 4.73682 7.82189 4.66658 7.9987 4.66658ZM7.9987 11.3333C7.82189 11.3333 7.65232 11.263 7.52729 11.138C7.40227 11.013 7.33203 10.8434 7.33203 10.6666C7.33203 10.4898 7.40227 10.3202 7.52729 10.1952C7.65232 10.0702 7.82189 9.99992 7.9987 9.99992C8.17551 9.99992 8.34508 10.0702 8.4701 10.1952C8.59513 10.3202 8.66536 10.4898 8.66536 10.6666C8.66536 10.8434 8.59513 11.013 8.4701 11.138C8.34508 11.263 8.17551 11.3333 7.9987 11.3333Z" fill="white"/>
                        </svg>
                        <p className="text-white/70 text-sm font-outfit font-medium ">{`"${session.browser}" will be remove`}</p>
                      </div>
                      <Button className='bg-transparent p-0 border-none' onClick={() => setSelectedSession(null)}>
                        <CloseIcon />
                      </Button>
                    </div>
                    <div className="flex gap-6 items-center mt-3">
                      <Button 
                        variant="default"
                        className="text-white/70 p-0 border-none bg-transparent text-sm font-outfit transition-colors"
                        onClick={() => setSelectedSession(null)}
                      >
                        Dismiss
                      </Button>
                      <Button
                        className="bg-transparent text-white border-none font-outfit font-medium text-sm p-0 transition-colors"
                        onClick={handleConfirmRemove}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Remove Session Confirmation Modal */}
       

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-start gap-4 mt-8">
          <Button variant="outlined" className="px-6 py-2 text-white border-white/20 w-full md:w-auto">
            Cancel
          </Button>
          <Button className="px-6 py-2 bg-white text-[#2B3AA6] w-full md:w-auto">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AccountSecurity
