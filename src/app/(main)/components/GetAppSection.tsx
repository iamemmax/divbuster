import React from "react";
import PhoneImage from "./landing-images/PhoneImages";
import { Button, LinkButton } from "@/components/core";
import AppStore from "./landing-images/AppStore";
import PlayStore from "./landing-images/PlayStore";

const GetAppSection = () => {
  return (
    <div className="py-6 md:py-[6.375rem] sm:px-[1rem] xl:px-[6.9375rem] w-full">
      <div className="bg-gradient-to-r from-[#0C0A3A] grid grid-cols-1 py-8 md:py-[3.125rem] md:grid-cols-[1.2fr_1fr]  w-full to-[#171D33] 0% px-6  md:px-[2.625rem] rounded-lg">
        <div className=" w-full flex gap-3 flex-col justify-center items-start">
          <h2 className="font-verdana font-bold text-[1.2rem] md:text-[1.8rem] xl:text-[2.25rem] text-white">
            Get The App Now
          </h2>
          <p className="text-white text-opacity-70 font-outfit md:text-[1.1rem] xl:text-[1.3rem] 2xl:text-[2rem]  xl:max-w-[80%]   font-normal">
            You can download the mobile app on Google Play store or Apple store{" "}
          </p>
          <div className="md:py-6 py-3 flex items-center  gap-4">
            <LinkButton href={"#"} className="p-0 bg-transparent">
              <AppStore className="max-sm:w-[120px]" />
            </LinkButton>
            <LinkButton href={"#"} className="p-0 bg-transparent">
              <PlayStore className="max-sm:w-[120px]" />
            </LinkButton>
          </div>
        </div>
        <div className="relative max-md:hidden ">
          <div className=" absolute -top-[7.6rem] 2xl:top-[-6rem] right-0">
            <PhoneImage className="w-[100%] h-[430px]"/>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#0C0A3A] mt-6  md:mt-[3.2rem] flex items-center justify-between flex-wrap gap-6  w-full to-[#171D33]  py-[1.8125rem] px-6 md:px-[2.625rem] rounded-lg">
        <p className="text-white text-opacity-70 font-outfit md:text-[0.8rem] text-sm md:max-w-[330px] xl:text-[0.9rem]  font-normal">
          Get ready to invest on Opticraft trading platform and enjoy maximum
          profit
        </p>
        <div className="flex ">
          <Button className="flex items-center gap-2 bg-white text-[#0A0B20] hover:bg-gray-200 transition-colors px-6 py-2 rounded-10 font-bold">
            Get Started
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
    </div>
  );
};

export default GetAppSection;
