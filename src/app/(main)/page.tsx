import React from 'react'
import { MainHeader } from './components/MainHeader'
import BannerLeftContainer from './components/BannerLeftContainer'
import BannerRightContainer from './components/BannerRightContainer'
import Marquee from './components/Marquee'

const page = () => {
  return (
    <div className='h-[100dvh]'>
    <div className='text-white w-full px-4 md:px-[2rem] xl:px-[4.5rem] pt-[1rem] xl:pt-[1.25rem]'>

<MainHeader/>

<div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 mt-[3rem] xl:mt-[4.5rem]">
  <div className=" h-full"><BannerLeftContainer/></div>
  <div className="border h-full max-lg:hidden"><BannerRightContainer/></div>
</div>
    </div>
<div className="">
        <Marquee/>
      </div>
    </div>
  )
}

export default page