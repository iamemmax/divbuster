'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MainHeader } from './components/MainHeader';
import BannerLeftContainer from './components/BannerLeftContainer';
import BannerRightContainer from './components/BannerRightContainer';
import Marquee from './components/Marquee';
import AboutSection from './components/AboutSection';

const Page = () => {
  return (
    <div className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-20 bg-black">
        <div className="text-white w-full px-4 md:px-[2rem] xl:px-[4.5rem] pt-[1rem] xl:pt-[1.25rem]">
          <MainHeader />
        </div>
      </div>

      {/* Section 1 - Banner + Marquee */}
      <motion.section
        className="relative snap-start pt-[80px] h-screen flex flex-col justify-between"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 mt-[3rem] xl:mt-[4.5rem] flex-1">
          <div className="px-4 max-lg:py-16 md:px-[2rem] xl:px-[4.5rem]">
            <BannerLeftContainer />
          </div>
          <div className="h-full max-xl:hidden">
            <BannerRightContainer />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10 shadow-md">
          <Marquee />
        </div>
      </motion.section>

      {/* Section 2 - About */}
      <motion.section
        className="snap-start min-h-screen px-4 max-lg:py-16 md:px-[2rem] xl:px-[4.5rem] flex items-center justify-center bg-[#080628]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <AboutSection />
      </motion.section>
    </div>
  );
};

export default Page;
