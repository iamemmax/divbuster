import LandingPageCircle from '@/app/icons/LandingPageCircle';
import PhoneImage from '@/app/icons/PhoneImage';
import React from 'react';

const BannerRightContainer = () => {
  return (
    <div className=" relative w-full z-10 overflow-y-hidden  ">
      <div className=" overflow-x-hidden">
      <LandingPageCircle className='max-xl:w-[700px] max-xl:h-[700px]  max-2xl:w-[62.5rem] max-2xl:h-[59.375rem]  animate-spin-slow ' />
      <div className="absolute  -top-3 3xl:top-[15rem] 2xl:top-[12rem]    right-0 ">
        <PhoneImage className='max-2xl:w-[400px] max-3xl:w-[500px] ' />

      </div>

      </div>
     
    </div>
  );
};

export default BannerRightContainer;
// landing-page-circe-bg.svg