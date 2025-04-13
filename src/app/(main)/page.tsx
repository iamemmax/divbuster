import React from 'react'
import { MainHeader } from './components/MainHeader'
import BannerLeftContainer from './components/BannerLeftContainer'
import BannerRightContainer from './components/BannerRightContainer'

const page = () => {
  return (
    <div className='text-white h-[100dvh] px-4 md:px-[2rem] xl:px-[4.5rem] pt-[1.5rem] xl:pt-[1.25rem]'>
<MainHeader/>

<div className="border grid grid-cols-1 lg:grid-cols-2 w-full ">
  <div className="border h-full"><BannerLeftContainer/></div>
  <div className="border h-full"><BannerRightContainer/></div>
</div>
    </div>
  )
}

export default page