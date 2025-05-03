"use client"
import React, { useState } from 'react'
import { Button } from '@/components/core'

const Preference = () => {
  const [contentPreferences, setContentPreferences] = useState([
    {
      title: "Content Preferences",
      description: "Select what type of content you want to get from Opticraft.",
      subSettings: [
        {
          id: "newsletters",
          label: "Newsletters",
          description: "Get trading and investment articles via our newsletters",
          isChecked: true
        },
        {
          id: "product-updates",
          label: "Product Updates",
          description: "The latest news about the latest features and investments update.",
          isChecked: false
        },
        {
          id: "event-invitations",
          label: "Event Invitations",
          description: "The latest news about our events and lot more...",
          isChecked: false
        }
      ]
    },
    {
      title: "Email Frequency",
      description: "Select the number of times you want to get emails from Opticraft.",
      subSettings: [
        {
          id: "daily",
          label: "Daily",
          description: "Get emails daily",
          isChecked: true
        },
        {
          id: "weekly",
          label: "Weekly",
          description: "Get emails weekly",
          isChecked: false
        },
        {
          id: "monthly",
          label: "Monthly",
          description: "Get emails monthly",
          isChecked: false
        }
      ]
    },
    {
      title: "Communication Channels",
      description: "Select your preferred channel of communication.",
      subSettings: [
        {
          id: "email",
          label: "Email",
          description: "Get updates via email",
          isChecked: true
        },
        {
          id: "sms",
          label: "SMS",
          description: "Get updates via SMS",
          isChecked: false
        }
      ]
    }
  ]);

  const handleSubSettingToggle = (mainIndex: number, subIndex: number) => {
    setContentPreferences(prev => prev.map((setting, i) => 
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
      <div className="flex justify-between 2xl:max-w-[1400px] items-start mb-6">
        <div>
          <h1 className="text-xl font-verdana font-medium text-white mb-1">
            Preferences
          </h1>
          <p className="text-sm text-white/70">
            Update your password for security reasons
          </p>
        </div>
        <Button className="text-sm text-white/70 hover:text-white/90 border-white" variant={"outlined"}>
          Forgot Withdrawal Pin?
        </Button>
      </div>

      <div className="space-y-6">
        {contentPreferences?.map((section, index) => (
          <div key={index} className="border-y border-white/10 py-[1.625rem]">
            <div className="grid lg:grid-cols-[1fr_2fr] 2xl:grid-cols-[1fr_3.5fr] max-md:grid-cols-1 gap-8 lg:gap-10 2xl:gap-[15.5rem]">
              <div className="text-white">
                <h2 className='text-sm font-verdana font-bold text-white'>{section?.title}</h2>
                <p className='text-sm font-outfit font-normal text-white/70'>{section?.description}</p>
              </div>

              <div className="space-y-6">
                {section.subSettings?.map((subSetting, subIndex) => (
                  <div key={subSetting.id} className="flex items-start gap-11 md:gap-12">
                    <input
                      type="checkbox"
                      checked={subSetting.isChecked}
                      onChange={() => handleSubSettingToggle(index, subIndex)}
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

export default Preference
