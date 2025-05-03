"use client"
import React, { useState } from 'react'
import { Button, Switch } from '@/components/core'

const Notification = () => {
  const [notificationSettings, setNotificationSettings] = useState([
    {
      title: "Email Notifications",
      description: "Opticraft can send you email notifications for any new direct messages.",
      isEnabled: true,
      subSettings: [
        {
          id: "news-updates",
          label: "News and Update Settings",
          description: "The latest news about the latest features and investments update settings",
          isChecked: true
        },
        {
          id: "newsletter",
          label: "Newsletter",
          description: "Articles on latest trading investment and market news",
          isChecked: false
        }
      ]
    },
    {
      title: "Account Updates",
      description: "Opticraft can send you push notifications for your profile and security alerts",
      isEnabled: true,
      subSettings: [
        {
          id: "profile-changes",
          label: "Profile Changes",
          description: "Get notifications about your profile changes",
          isChecked: true
        },
        {
          id: "security-alerts",
          label: "Security Alerts",
          description: "Get notifications about change of password and transaction pin",
          isChecked: false
        }
      ]
    },
    {
      title: "Transaction Alerts",
      description: "Opticraft can send you push notifications for any new direct messages.",
      isEnabled: true,
      subSettings: [
        {
          id: "deposit-alerts",
          label: "Deposit Alerts",
          description: "Get notifications about your deposits",
          isChecked: true
        },
        {
          id: "withdrawal-alerts",
          label: "Withdrawal Alerts",
          description: "Get notifications about your withdrawals",
          isChecked: false
        }
      ]
    },
    {
      title: "Trading Signals",
      description: "Opticraft can send you push notifications about new trading signals and market trends",
      isEnabled: true,
      subSettings: [
        {
          id: "trading-signals",
          label: "Trading Signals",
          description: "Get notifications about new trading signals",
          isChecked: true
        },
        {
          id: "market-trends",
          label: "Market Trends",
          description: "Get notifications about new market trends",
          isChecked: false
        }
      ]
    },
    {
      title: "System Notifications",
      description: "Opticraft can send you push notifications about platform maintenance or upgrade",
      isEnabled: true,
      subSettings: [
        {
          id: "maintenance",
          label: "Maintenance",
          description: "Get notifications about platform maintenance",
          isChecked: true
        },
        {
          id: "upgrades",
          label: "Upgrades",
          description: "Get notifications about platform upgrades",
          isChecked: false
        }
      ]
    }
  ]);

  const handleMainToggle = (index: number) => {
    setNotificationSettings(prev => prev.map((setting, i) => 
      i === index ? { ...setting, isEnabled: !setting.isEnabled } : setting
    ));
  };

  const handleSubSettingToggle = (mainIndex: number, subIndex: number) => {
    setNotificationSettings(prev => prev.map((setting, i) => 
      i === mainIndex ? {
        ...setting,
        subSettings: setting.subSettings.map((subSetting, j) => 
          j === subIndex ? { ...subSetting, isChecked: !subSetting.isChecked } : subSetting
        )
      } : setting
    ));
  };

  return (
    <div className='w-full mx-auto rounded-xl p-8'>
      <div className="mb-6">
        <h1 className="text-xl font-verdana font-medium text-white mb-1">
          Notifications
        </h1>
        <p className="text-sm text-white/70">
          Get notified what's happening right now, you can turn off at any time.
        </p>
      </div>

      <div className="space-y-6">
        {notificationSettings?.map((section, index) => (
          <div key={index} className="border-y border-white/10 py-[1.625rem]">
            <div className="grid lg:grid-cols-[1fr_2fr]  2xl:grid-cols-[1fr_3fr] max-md: grid-cols-1 gap-8 lg:gap-10 2xl:gap-[12.5rem]">
              <div className="text-white">
                <h2 className='text-sm font-verdana font-bold text-white'>{section?.title}</h2>
                <p className='text-sm font-outfit font-normal text-white/70'>{section?.description}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Switch
                    checked={section.isEnabled}
                    onCheckedChange={() => handleMainToggle(index)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <span className="text-sm text-white/70">{section.isEnabled ? 'On' : 'Off'}</span>
                </div>

                {section.subSettings?.map((subSetting, subIndex) => (
                  <div key={subSetting.id} 
                       className={`flex items-start gap-11 md:gap-12 ${!section.isEnabled ? 'opacity-50' : ''}`}>
                    <input
                      type="checkbox"
                      checked={subSetting.isChecked}
                      onChange={() => handleSubSettingToggle(index, subIndex)}
                      disabled={!section.isEnabled}
                      className="mt-1 h-[1.2188rem] w-[1.2188rem] rounded border-white bg-transparent 
                               checked:bg-white checked:border-white
                               focus:ring-0 focus:ring-offset-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-white text-sm font-verdana font-bold">{subSetting.label}</h3>
                      <p className="text-sm text-white/80 font-outfit mt-1">{subSetting.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-start gap-4 mt-8">
        <Button className="px-6 py-2 rounded-lg border border-white/20 text-white 
                         hover:bg-white/5 transition-colors text-sm" variant={"outlined"}>
          Cancel
        </Button>
        <Button className="px-6 py-2 rounded-lg bg-white text-[#2B3AA6] 
                         hover:bg-blue-700 transition-colors text-sm">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default Notification
