'use client';

import React from "react";
import { motion } from "framer-motion";
import AboutDashboardImage1 from "@/app/(main)/components/landing-images/AboutDashboardImage1";
import AboutImageDashboard2 from "@/app/(main)/components/landing-images/AboutImage2";
import { Button } from "@/components/core";

const AboutSection = () => {
  return (
    <section className="flex items-center h-screen w-full text-white px-4 overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center space-y-6 3xl:max-w-[95%]">
          <div className="flex items-center gap-x-3">
            <p className="font-verdana text-xl mb-2">About Us</p>
            <div>
              <svg width="81" height="2" viewBox="0 0 81 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_123)">
                  <g transform="matrix(0.0405 0 0 0.0005 40.5 2)">
                    <foreignObject x="-1000" y="-1000" width="2000" height="2000">
                      <div style={{
                        background:
                          'conic-gradient(from 90deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,1) 200.4deg, rgba(255,255,255,0) 360deg)',
                        height: '100%',
                        width: '100%',
                        opacity: 0.8,
                      }} />
                    </foreignObject>
                  </g>
                </g>
                <path d="M0 1.5H81V0.5H0V1.5Z" fill="white" opacity="0.2" />
                <defs>
                  <clipPath id="clip0_123">
                    <path d="M0 1.5H81V0.5H0V1.5Z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <h2 className="text-[3rem] max-xxscren:text-[1.8rem] lg:text-[2.5rem] 3xl:text-[5rem] font-verdana font-bold text-white text-opacity-30 leading-tight">
            Opticraft Trading Platform
          </h2>

          <p className="leading-relaxed font-outfit text-sm 2xl:text-xl">
            Opticraft is a cutting-edge trading investment platform designed to
            empower traders with real-time market insights, AI-driven trading
            signals, and secure investment solutions. Our goal is to make
            trading simpler, smarter, and more profitable for everyone.
          </p>

          <div className=" mt-5">
            <Button className="flex items-center gap-2 bg-white text-[#0A0B20] hover:bg-gray-200 transition-colors px-6 py-2 rounded-10 font-bold">
            Learn More
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#2B3AA6" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.735 8.73516C12.8053 8.66493 12.9006 8.62549 13 8.62549C13.0994 8.62549 13.1947 8.66493 13.265 8.73516L16.265 11.7352C16.3352 11.8055 16.3747 11.9008 16.3747 12.0002C16.3747 12.0995 16.3352 12.1948 16.265 12.2652L13.265 15.2652C13.2307 15.302 13.1893 15.3316 13.1433 15.352C13.0973 15.3725 13.0476 15.3836 12.9973 15.3845C12.9469 15.3853 12.8969 15.3761 12.8502 15.3572C12.8035 15.3384 12.7611 15.3103 12.7255 15.2747C12.6899 15.2391 12.6618 15.1967 12.6429 15.15C12.6241 15.1033 12.6148 15.0532 12.6157 15.0029C12.6166 14.9525 12.6276 14.9029 12.6481 14.8569C12.6686 14.8109 12.6982 14.7695 12.735 14.7352L15.095 12.3752H8C7.90054 12.3752 7.80516 12.3356 7.73483 12.2653C7.66451 12.195 7.625 12.0996 7.625 12.0002C7.625 11.9007 7.66451 11.8053 7.73483 11.735C7.80516 11.6647 7.90054 11.6252 8 11.6252H15.095L12.735 9.26516C12.6648 9.19485 12.6253 9.09953 12.6253 9.00016C12.6253 8.90078 12.6648 8.80547 12.735 8.73516Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Right Side Images with Framer Animation */}
        <div className="hidden max-lg:-mt-10 sm:flex flex-col relative items-end justify-end w-full">
          {/* First Image */}
          <motion.div
            className="pr-[5rem] 2xl:pr-[7rem]"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <AboutDashboardImage1 className="max-lg:max-w-[400px] max-2xl:max-w-[350px]" />
          </motion.div>

          {/* Second Image */}
          <motion.div
            className="-mt-[10rem] lg:-mt-[12rem] 3xl:-mt-[6.125rem] "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <AboutImageDashboard2 className="max-lg:max-w-[400px] max-2xl:max-w-[350px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
