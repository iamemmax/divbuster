import { LinkButton } from "@/components/core";
import React from "react";


interface Prop{
    title:string;
    subTitle:string;
    href?: string
}
const OnboardingSuccessPage = ({subTitle,title,href="/login"}:Prop) => {

  
  return (
    <div className="text-white relative border-[.0187rem] py-[3.875rem] xl:py-[8.5rem]  border-[#4649E5] px-6 md:px-[50px] 2xl:px-[6.1875rem] rounded-[1.25rem]">
       <div className="">
        <h2 className="text-white font-verdana font-bold text-[1rem] max-w-[20.75rem] xl:text-[1.8rem]">
       {title}
        </h2>
        <p className="font-outfit text-sm xl:text-base text-white mt-1  max-w-[20.75rem] text-opacity-70 font-light">
       {subTitle}
        </p>
       
      </div>
<div className="mt-[4.5rem]">
<LinkButton className="w-full bg-white font-bold mt-6  h-12 rounded-10 font-outfit text-[#2B3AA6] text-sm  max-w-[25.75rem] "  href={href}>Login</LinkButton>

</div>

    </div>
  );
};

export default OnboardingSuccessPage;
