"use client";
import DivebusterLogo from "@/components/icons/Logo";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AuthLayoutLeftSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderContent = [
    {
      title: "Find and Connect with Dive Buddies",
      description:
        "Easily find and connect with dive buddies around the world. Share your adventures and dive together.",
    },
    {
      title: "Discover Amazing Dive Spots",
      description:
        "Explore the best diving locations recommended by experienced divers from our community.",
    },
    {
      title: "Track Your Diving Journey",
      description:
        "Keep a record of all your dives, certifications, and equipment in one convenient place.",
    },
  ];

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === sliderContent.length - 1;

  const nextSlide = () => {
    if (!isLastSlide) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (!isFirstSlide) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col justify-between px-[2.8125rem] py-[3.375rem] h-full">
      <div className="">
        <DivebusterLogo />
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="text-white px-6 py-8 max-w-[27.625rem] bg-white/30 rounded-lg backdrop-blur-sm font-archivo">
          <AnimatePresence mode="wait">
            {sliderContent.map(
              (content, index) =>
                index === currentSlide && (
                  <motion.div
                    key={index}
                    className="slide-content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-[1.5625rem] xl:text-[1.875rem] font-archivo max-w-[19.3125rem] font-semibold mb-4">
                      {content.title}
                    </h1>
                    <p className="text-base  xl:text-lg font-archivo font-medium text-white/90 mb-8">
                      {content.description}
                    </p>
                  </motion.div>
                )
            )}
          </AnimatePresence>
          <div className="flex justify-end gap-3">
            <motion.button
              onClick={prevSlide}
              disabled={isFirstSlide}
              className={`w-[2.1875rem] h-[2.8125rem] rounded-[1.75rem] border-[#FEF6F4] border flex items-center justify-center transition-all duration-200 ${
                isFirstSlide 
                  ? 'bg-orange-300 cursor-not-allowed opacity-50' 
                  : 'bg-orange-400 hover:bg-orange-500'
              }`}
              whileHover={!isFirstSlide ? { scale: 1.1 } : {}}
              whileTap={!isFirstSlide ? { scale: 0.9 } : {}}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 8.5H1.5M1.5 8.5L8.5 15.5M1.5 8.5L8.5 1.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
            <motion.button
              onClick={nextSlide}
              disabled={isLastSlide}
              className={`w-[2.1875rem] h-[2.8125rem] rounded-[1.75rem] border-[#FEF6F4] border flex items-center justify-center transition-all duration-200 ${
                isLastSlide 
                  ? 'bg-orange-300 cursor-not-allowed opacity-50' 
                  : 'bg-orange-400 hover:bg-orange-500'
              }`}
              whileHover={!isLastSlide ? { scale: 1.1 } : {}}
              whileTap={!isLastSlide ? { scale: 0.9 } : {}}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 12.5H19.5M19.5 12.5L12.5 5.5M19.5 12.5L12.5 19.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutLeftSection;