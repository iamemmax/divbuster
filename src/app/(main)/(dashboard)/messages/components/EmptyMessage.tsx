import EmptyMessageIcon from '@/app/icons/(dashboard)/EmptyMessageIcon'
import React from 'react'

const EmptyMessage = () => {
  return (
  <div className="flex justify-center items-center flex-col w-full h-full">
  <div>
    <EmptyMessageIcon />
  </div>
  <div className="mt-2 text-center">
    <h2 className="font-archivo font-semibold text-2xl text-gray-600 dark:text-gray-300">
      Start Messaging!
    </h2>
    <p className="font-archivo text-base text-gray-600 dark:text-gray-400">
      Your chats will appear here.!
    </p>
  </div>
</div>

  )
}

export default EmptyMessage