import EmptyMessageIcon from '@/app/icons/(dashboard)/EmptyMessageIcon'
import React from 'react'

const EmptyMessage = () => {
  return (
    <div className='flex justify-center items-center flex-col w-full h-full'>
        <div className="">
            <EmptyMessageIcon/>
        </div>
        <div className="mt-2">
            <h2 className='font-archivo font-semibold text-2xl text-[#666876]'>Start Messaging!</h2>
            <p className='font-archivo  text-base text-[#666876]'>Your chats will appear here.!</p>
        </div>
    </div>
  )
}

export default EmptyMessage