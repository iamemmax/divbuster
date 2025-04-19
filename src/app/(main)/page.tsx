"use client";

import React from "react";
import { motion } from "framer-motion";
import { MainHeader } from "./components/MainHeader";
import BannerLeftContainer from "./components/BannerLeftContainer";
import BannerRightContainer from "./components/BannerRightContainer";
import Marquee from "./components/Marquee";
import AboutSection from "./components/AboutSection";
import BenefitsSection from "./components/BenefitsSection";
import StepSection from "./components/StepSection";
import MarketTrend from "./components/MarketTrend";
import FaqSection from "./components/FaqSection";
import GetAppSection from "./components/GetAppSection";
import Footer from "./components/Footer";

const Page = () => {
  return (
    <div className=" overflow-y-scroll pb-[3rem]">
      {/* scroll-smooth snap-y snap-mandatory */}

      <motion.section
        className="relative snap-start h-screen  flex flex-col justify-between"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10 overflow-x-hidden  overflow-hidden first-line: flex-1">
          <div className="px-4 max-lg:py-16  flex justify-center relative items-center md:px-[2rem] xl:px-[4.5rem] max-md:max-w-[100%] max-lg:max-w-[55%]">
            <BannerLeftContainer />
          </div>
          <div className="h-full max-lg:hidden   relative overflow-hidden">
            <BannerRightContainer />
          </div>
        </div>
      </motion.section>

      {/* Section 2 - About */}
      <motion.section
        className="snap-start min-h-screen   flex items-center  bg-[url('/images/homepage/landing-page-bg-2.svg')] z-[999999] bg-[position:top]  bg-no-repeat bg-cover  px-4 md:px-[2rem] xl:px-[4.5rem] justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <AboutSection />
      </motion.section>
      {/* Section 2 - About */}
      <motion.section
        className="snap-start min-h-screen  flex items-center justify-center px-4 md:px-[2rem] pb-5 xl:py-[50px] xl:px-[4.5rem] bg-[#0C0A3A]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <BenefitsSection />
      </motion.section>
      <motion.section
        className="snap-start min-h-screen bg-[url('/images/homepage/map.svg')]  rounded-t-md bg-cover  bg-no-repeat bg-opacity-50  flex items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <StepSection />
      </motion.section>
      <motion.section
        className="snap-start    flex items-center  bg-[url('/images/homepage/trending-page-bg.svg')] z-[999999]   bg-no-repeat bg-cover  px-4 md:px-[2rem] xl:px-[4.5rem] justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <MarketTrend />
      </motion.section>

      <motion.section
        className="snap-start    flex items-center   z-[999999]   bg-no-repeat bg-cover  px-4 md:px-[2rem] xl:px-[4.5rem] justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <FaqSection />
      </motion.section>

      <motion.section
        className="snap-start    flex items-center   z-[999999] bg-[url('/images/homepage/landing-page-app-bg.svg')]   bg-no-repeat bg-cover bg-[position:bottom]  px-4 md:px-[2rem] xl:px-[4.5rem] justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GetAppSection />
      </motion.section>

      <motion.section
        className="snap-start    flex items-center   z-[999999] bg-[#02010d]  px-4 md:px-[2rem] xl:px-[4.5rem] justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Footer />
      </motion.section>

      <div className="fixed bottom-0 lg:bottom-0 2xl:-bottom-0 left-0 w-full z-[99999999999] shadow-md">
        <Marquee />
      </div>
    </div>
  );
};

export default Page;
