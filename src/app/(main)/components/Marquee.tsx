'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EthereumeIcon from '@/app/icons/EthereumeIcon';
import BitcoinIcon from '@/app/icons/BitcoinIcon';
import RippleIcon from '@/app/icons/RippleIcon';

const Marquee = () => {
  const [width, setWidth] = useState(0);
  // Fix TypeScript error by properly typing the ref
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const cryptoData = [
    {
      icon: <RippleIcon />,
      name: "Ripple",
      value: "₦10,000"
    },
    {
      icon: <EthereumeIcon />,
      name: "Ethereume",
      value: "₦10,000"
    },
    {
      icon: <BitcoinIcon />,
      name: "Bitcoin",
      value: "₦10,000"
    },
    {
      icon: <RippleIcon />,
      name: "Ripple",
      value: "₦10,000"
    },
    {
      icon: <EthereumeIcon />,
      name: "Ethereume",
      value: "₦10,000"
    },
    {
      icon: <BitcoinIcon />,
      name: "Bitcoin",
      value: "₦10,000"
    },
  ];

  // Create a repeated array to ensure continuous scrolling
  const fullArray = [...cryptoData, ...cryptoData, ...cryptoData];

  useEffect(() => {
    if (marqueeRef.current) {
      // Set the width of the container with null check
      setWidth(marqueeRef.current.scrollWidth / 3);
    }
  }, []);

  return (
    <div className="w-full bg-white py-4  2xl:py-6 overflow-hidden relative">
      {/* Animation overlay effects */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
      
      <div className="flex items-center">
        <motion.div
          ref={marqueeRef}
          className="flex gap-10" 
          animate={{
            x: isPaused ? 0 : [-width, 0],
          }}
          transition={{
            x: {
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {fullArray.map((item, idx) => (
            <motion.div 
              className="flex items-center gap-3 px-2" 
              key={idx}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.2 } 
              }}
            >
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ rotate: 10 }}
              >
                {item?.icon}
              </motion.div>
              <p className="font-medium text-sm sm:text-lg font-verdana whitespace-nowrap">
                {`${item?.name} - ${item?.value}`}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;