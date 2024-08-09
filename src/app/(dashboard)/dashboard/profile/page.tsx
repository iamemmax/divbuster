import React from "react";
import DashboardPlanHeader from "../../comp/components/DashboardPlanHeader";

const page = () => {
  return (
    <div className="relative bg-[#f5f9fe] w-full h-screen">
      <div className="bg-main px-6  md:px-[4.5rem] lg:px-[7.5rem]"></div>

      <div className="w-full h-32 bg-main py-10"></div>
      <div className="relative ">
        <div className=" inset-x-0 top-[-4rem] absolute px-6  md:px-[4.5rem] lg:px-[7.5rem]">
          <div className="bg-white h-full grid grid-cols-1 rounded-10 px-5 py-[2.8125rem] xl:px-[4.5rem]">
            <div className="">
              <h2 className="font-bold text-2xl text-[#032282]">
                Personal Information
              </h2>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className=""></div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
