import OpticalLogo from "@/app/icons/Logo";
import FacebookIcon from "@/app/icons/social-media/Facebook";
import InstagramIcon from "@/app/icons/social-media/InstagramIcon";
import Linkdin from "@/app/icons/social-media/Linkdin";
import XIcon from "@/app/icons/social-media/XIcon";
import YoutubeIcon from "@/app/icons/social-media/YoutubeIcon";
import { Button, LinkButton } from "@/components/core";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const footerNav = [
    {
      name: "Trading",
      url: "#",
    },
    {
      name: "Investment",
      url: "#",
    },
    {
      name: "Onlending",
      url: "#",
    },
    {
      name: "Consultation",
      url: "#",
    },
  ];
  const footerLinks = [
    {
      name: "FAQs",
      url: "#",
    },
    {
      name: "Contact",
      url: "#",
    },
    {
      name: "Terms & Privacy",
      url: "#",
    },
  ];

  const socialMedia = [
    {
      name: "Facebook",
      url: "#",
      icon:<FacebookIcon/>
    },
    {
      name: "Twitter",
      url: "#",
      icon:<XIcon/>
    },
    {
      name: "Instagram",
      url: "#",
      icon:<InstagramIcon/>
    },
    {
      name: "Youtube",
      url: "#",
      icon:<YoutubeIcon/>
    },
    
    {
      name: "Lindkin",
      url: "#",
      icon:<Linkdin/>
    },
  ]
  return (
    <div className="py-[4.5rem] px-4">
      <div className="grid grid-cols-2 gap-[1.75rem] xl:gap-[2.375rem] 2xl:gap-[4.375rem]  sm:grid-cols-[1.4fr_1fr_1fr] lg:grid-cols-[1.3fr_1fr_1fr_1fr]  2xl:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="max-md:col-span-2">
          <LinkButton
            className="text-white bg-transparent font-verdana font-bold text-lg p-0 gap-2"
            href="/"
          >
            <OpticalLogo /> Opticraft Trading
          </LinkButton>
          <p className="font-outfit text-xs sm:text-sm mt-3 md:max-w-[80%] text-white text-opacity-70">
            Building wealth takes more than just a savings account. its about
            taking control of your future with strategic trading investments.
          </p>
        </div>
        <div className="">
          <nav>
            <p className="text-white font-outfit font-semibold text-sm uppercase">
              Features
            </p>
            <ul className="flex  mt-4 flex-col gap-3">
              {footerNav?.map((nav, idx: number) => (
                <li key={idx}>
                  <Link
                    className="text-white text-opacity-70 font-outfit font-normal text-xs sm:text-sm"
                    href="#"
                  >
                    {nav?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="">
          <nav>
            <p className="text-white font-outfit font-semibold text-sm uppercase">
              QUICK LINKS
            </p>
            <ul className="flex  mt-4 flex-col gap-3">
              {footerLinks?.map((nav, idx: number) => (
                <li key={idx}>
                  <Link
                    className="text-white text-opacity-70 font-outfit font-normal text-xs sm:text-sm"
                    href="#"
                  >
                    {nav?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="max-md:col-span-2">
          <p className="text-white font-outfit font-semibold text-sm uppercase">
            CONTACT US
          </p>
          <p className="font-outfit text-xs sm:text-sm mt-4 text-white text-opacity-70  lg:max-w-[300px]">
            Send us a message or call us 70-3234-7071 You can also send us an
            email at Opticraftrade@gmail.com
          </p>
        </div>
      </div>
        
        <div className=" grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5  gap-5 w-full border-b-[0.3px] py-6 border-white grid items-start">
          <div className="">
            <p className="font-verdana text-[.8125rem] font-semibold  text-white">SOCIAL MEDIA LINKS</p>
          <div className="flex items-center gap-3 mt-3">
            {
              socialMedia?.map((icon)=>(
                <div className="flex items-center gap-4 border-[0.5px] border-[#4453DD] h-[2.5rem] w-[2.5rem] justify-center rounded-10" key={icon?.name}>
                  {icon?.icon}
                </div>
              ))
            }
          </div>
          </div>
          <div className="">

            <p className="font-verdana text-sm  text-white">Subscribe to our <span className="text-lg font-bold">Newsletter</span></p>
            <div className="flex ">
              <input type="text" className="bg-[#4453DD] h-[44px] w-full text-xs px-3 outline-none text-white rounded-l-10" placeholder="Enter your email" />
              <Button className="bg-transparent border-[0.5px] border-[#4453DD] text-white h-[44px] rounded-r-10 rounded-l-[0px] font-outfit  ">Subscribe</Button>
            </div>
          </div>
          <div className="">
            <p className="text-white font-outfit text-sm lg:pl-6">Get our app on</p>
          </div>
        </div>
<div className="flex justify-between flex-wrap gap-4 items-center mt-5">
  <p className="text-white font-outfit text-sm">© Opticraft Trading, All Rights Reserved</p>
  <motion.button
    onClick={() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className="border-[0.3px] border-[#4453DD] text-white px-4 py-2 rounded-lg hover:bg-[#4453DD]/10 transition-colors"
  >
    <motion.div
      className="flex items-center text-sm gap-2"
      initial={{ y: 0 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ 
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      Back to top
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 20V4M5 11L12 4L19 11" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  </motion.button>
</div>

    </div>
  );
};

export default Footer;
