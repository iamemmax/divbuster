import CheckIcon from "@/app/icons/CheckIcon";
import MoneyIcon from "@/app/icons/MoneyIcon";
import PlayIcon from "@/app/icons/PlayIcon";
import RightArrowIcon from "@/app/icons/RightArrow";
import UserGroupIcon from "@/app/icons/UserGroupIcon";
import WaveIcon from "@/app/icons/WaveIcon";
import { Button } from "@/components/core";
import React from "react";
import Marquee from "./Marquee";

const BannerLeftContainer = () => {

    const bannerItemArray =[
        {
            icon:<UserGroupIcon/>,
            name:"Investors",
            value:"800+"
        },
        {
            icon:<MoneyIcon/>,
            name:"Profit Margin",
            value:"100%"
        },
        {
            icon:<UserGroupIcon/>,
            name:"Success Rate",
            value:"100%"
        },
    ]
  return (
    <div>
      <div className="flex items-center bg-[#070430] gap-2 px-4 py-[.625rem] rounded-[1.875rem] max-w-[20rem] sm:max-w-[22.5rem]  justify-center">
        <p className="text-white text-xs sm:text-sm font-outfit font-medium">
          Your number one trading investment platform
        </p>
        <CheckIcon />
      </div>
      <div className="mt-2">
        <h2 className="text-white font-verdana font-bold max-sm:text-[2rem] text-[3rem] md:text-[2.6rem]  xl:leading-tight xl:text-[3.375rem] 3xl:text-[4.8rem]">Unleash your <span className="text-[#4649E5]">Financial Trading</span> Possibilities.</h2>
      <p className="mt-4 max-xxscren:text-sm max-w-[95%] xl:max-w-[75%] text-base xl:text-lg  font-outfit text-white/70">Building wealth takes more than just a savings account.
      its about taking control of your future with strategic trading investments.</p>
      </div>
      <div className="mt-8 flex items-center  gap-x-[4.5rem]">
        <div className="flex items-center  gap-6">
        <Button className="bg-white text-sm text-[#2B3AA6] rounded-10 rounded-s-[24px] rounded-e-[24px] gap-4 flex items-center  xl:px-6 py-[0.625rem] px-3 md:px-4 font-outfit">
          Get Started <RightArrowIcon color="#fff" background="#2B3AA6"/>
        </Button>
        <Button className="bg-transparent text-sm border-white text-white  border-opacity-60 rounded-10 rounded-s-[24px] rounded-e-[24px] gap-4 flex items-center xl:px-6 px-3 md-px-4 py-[0.625rem] font-outfit" variant={"outlined"}>
        See how it works <PlayIcon />
        </Button>
        </div>
        <div className="max-sm:hidden">
            <WaveIcon/>
        </div>
      </div>

      <div className="flex items-center mt-[2.5rem] xl:mt-[4.5rem] gap-6">
        {
            bannerItemArray?.map((item,idx:number)=>(
                <div className="flex items-start gap-2" key={idx}>
                    <div className="h-[2.5rem] w-[2.625rem] rounded-full shrink-0 bg-[#11143D] flex justify-center items-center">
                        {item?.icon}
                    </div>
                    <div className="">
                        <h3 className="text-white text-base font-semibold font-outfit">{item?.value}</h3>
                        <p className="text-white text-xs font-light mt-1 font-outfit">{item?.name}</p>
                    </div>
                </div>
            ))
        }
      </div>
      
    </div>
  );
};

export default BannerLeftContainer;
