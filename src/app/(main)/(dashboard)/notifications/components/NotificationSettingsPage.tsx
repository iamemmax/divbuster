'use client'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Zod schema for notification settings
const notificationSchema = z.object({
  myDiveBuddies: z.boolean(),
  newFriendRequest: z.boolean(),
  logValidation: z.boolean(),
  newDivesite: z.boolean(),
  subscriptionAlerts: z.boolean(),
})

type NotificationFormData = z.infer<typeof notificationSchema>

interface NotificationSettingsProps {
  isOpen?: boolean
  onClose?: () => void
  onSave?: (data: NotificationFormData) => void
}

const NotificationSettings = ({ isOpen = true, onClose, onSave }: NotificationSettingsProps) => {
  const { control, handleSubmit, reset } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      myDiveBuddies: true,
      newFriendRequest: true,
      logValidation: true,
      newDivesite: true,
      subscriptionAlerts: true,
    }
  })

  const onSubmit = (data: NotificationFormData) => {
    console.log('Form submitted:', data)
    onSave?.(data)
    onClose?.()
  }

  const handleCancel = () => {
    reset()
    onClose?.()
  }

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className={`relative w-11 h-6 rounded-full transition-all duration-200 outline-none border-0 ${
        checked ? 'bg-orange-500' : 'bg-gray-300'
      }`}>
        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 outline-none border-0 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`} />
      </div>
    </label>
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Notification Settings</h2>
            <p className="text-gray-500 mb-8">
              You can control for which situations you would like to receive notifications.
            </p>

            <div className="space-y-0">
              {/* New Message */}
              <div className="py-6 border-[#EAECF0] border-b ">
                    <h3 className="font-medium text-gray-900 mb-1">New Message</h3>
                <div className="flex justify-between border py-[10px] px-[1.25rem] border-[#EAECF0] rounded-10 items-center">
                  <div>
                    <p className="text-sm text-gray-500">My Dive Buddies</p>
                  </div>
                  <Controller
                    name="myDiveBuddies"
                    control={control}
                    render={({ field }) => ( 
                      <Toggle
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Friend Request */}
              <div className="py-6 border-[#EAECF0] border-b ">
                    <h3 className="font-medium text-gray-900 mb-1">Friend Request</h3>
                <div className="flex justify-between border py-[10px] px-[1.25rem] border-[#EAECF0] rounded-10 items-center">
                  <div>
                    <p className="text-sm text-gray-500">New Friend Request</p>
                  </div>
                  <Controller
                    name="newFriendRequest"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Dive Log Validation */}
              <div className="py-6 border-[#EAECF0] border-b ">
                    <h3 className="font-medium text-gray-900 mb-1">Dive Log Validation</h3>
                <div className="flex justify-between border py-[10px] px-[1.25rem] border-[#EAECF0] rounded-10 items-center">
                  <div>
                    <p className="text-sm text-gray-500">Log Validation</p>
                  </div>
                  <Controller
                    name="logValidation"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>

              {/* New Dive Site around you */}
              <div className="py-6 border-[#EAECF0] border-b ">
                    <h3 className="font-medium text-gray-900 mb-1">New Dive Site around you</h3>
                <div className="flex justify-between border py-[10px] px-[1.25rem] border-[#EAECF0] rounded-10 items-center">
                  <div>
                    <p className="text-sm text-gray-500">New Dive Site</p>
                  </div>
                  <Controller
                    name="newDivesite"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Subscriptions */}
              <div className="py-4">
                    <h3 className="font-medium text-gray-900 mb-1">Subscriptions</h3>
                 <div className="flex justify-between border py-[10px] px-[1.25rem] border-[#EAECF0] rounded-10 items-center">
                  <div>
                    <p className="text-sm text-gray-500">Subscription Alerts</p>
                  </div>
                  <Controller
                    name="subscriptionAlerts"
                    control={control}
                    render={({ field }) => (
                      <Toggle
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationSettings