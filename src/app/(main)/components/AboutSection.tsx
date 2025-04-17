'use client';

import React from "react";
import { motion } from "framer-motion";
import AboutDashboardImage1 from "@/app/icons/AboutDashboardImage1";
import AboutImageDashboard2 from "@/app/icons/AboutImage2";
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

          <div className="mt-5">
            <Button className="bg-transparent font-normal flex items-center gap-2 p-0 text-[#4649E5] font-outfit underline text-xl">
              Learn more
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.47 5.47007C13.6106 5.32962 13.8012 5.25073 14 5.25073C14.1988 5.25073 14.3894 5.32962 14.53 5.47007L20.53 11.4701C20.6705 11.6107 20.7493 11.8013 20.7493 12.0001C20.7493 12.1988 20.6705 12.3894 20.53 12.5301L14.53 18.5301C14.4613 18.6038 14.3785 18.6629 14.2865 18.7039C14.1945 18.7448 14.0952 18.7669 13.9945 18.7687C13.8938 18.7704 13.7938 18.7519 13.7004 18.7142C13.607 18.6765 13.5222 18.6203 13.451 18.5491C13.3797 18.4779 13.3236 18.3931 13.2859 18.2997C13.2482 18.2063 13.2296 18.1063 13.2314 18.0056C13.2332 17.9048 13.2552 17.8055 13.2962 17.7135C13.3372 17.6215 13.3963 17.5387 13.47 17.4701L18.19 12.7501H4C3.80109 12.7501 3.61032 12.6711 3.46967 12.5304C3.32902 12.3898 3.25 12.199 3.25 12.0001C3.25 11.8012 3.32902 11.6104 3.46967 11.4697C3.61032 11.3291 3.80109 11.2501 4 11.2501H18.19L13.47 6.53007C13.3295 6.38945 13.2507 6.19882 13.2507 6.00007C13.2507 5.80132 13.3295 5.6107 13.47 5.47007Z" fill="#4649E5" />
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
