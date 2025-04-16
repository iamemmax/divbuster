import PhoneImage from '@/app/icons/PhoneImage';
import React from 'react';

const BannerRightContainer = () => {
  return (
    <div className="max-lg:hidden relative overflow-y-hidden flex justify-end items-center h-full w-full overflow-hidden">
      {/* Spinning background layer */}
      <div className="absolute inset-0 bg-[url('/images/homepage/landing-page-circe-bg.svg')] 2xl:bg-[url('/images/homepage/landing-page-circle.svg')] bg-contain bg-no-repeat :bg-[position:bottom_right] 2xl:bg-[position:bottom_right] pointer-events-none z-0 " />
      {/* Phone image (static) */}
      <div className="relative z-10">
        <PhoneImage />
      </div>
    </div>
  );
};

export default BannerRightContainer;
// landing-page-circe-bg.svg