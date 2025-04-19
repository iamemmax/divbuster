import LandingPageCircle from '@/app/icons/LandingPageCircle';
import PhoneImage from '@/app/icons/PhoneImage';
import React from 'react';

const BannerRightContainer = () => {
  return (
    <div className="relative w-full overflow-y-hidden select-none">
      <div className="overflow-x-hidden">
        <div 
          className="pointer-events-none"
          onDragStart={(e) => e.preventDefault()}
        >
          <LandingPageCircle 
            className='w-[500px] h-[500px] 
              sm:w-[600px] sm:h-[600px]
              md:w-[650px] md:h-[650px]
              lg:w-[700px] lg:h-[700px]
              xl:w-[800px] xl:h-[800px]
              2xl:w-[78.5rem] 2xl:h-[70.375rem] 
              animate-spin-slow' 
          />
        </div>
        <div 
          className="absolute -top-3 
            lg:top-0
            xl:top-4
            2xl:top-[12rem]
            3xl:top-[15rem] 
            right-0 pointer-events-none"
        >
          <PhoneImage 
            className='w-[300px]
              sm:w-[350px]
              md:w-[375px]
              lg:w-[400px]
              xl:w-[450px]
              2xl:w-[500px]
              3xl:w-[550px]' 
          />
        </div>
      </div>
    </div>
  );
};

export default BannerRightContainer;
// landing-page-circe-bg.svg
