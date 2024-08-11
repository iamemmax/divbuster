import React from "react";
import DashboardPlanHeader from "../../comp/components/DashboardPlanHeader";
import Image from "next/image";
import CameraIcon from "../../comp/icons/CameraIcon";
import { Button } from "@/components/core";
import UploadIcon from "../../comp/icons/UploadIcon";
import RemoveIcon from "../../comp/icons/RemoveIcon";

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
            <div className="mt-6 flex justify-between items-center relative">
              <div className="relative flex items-center gap-10">
                <div className="relative">
                <div className="relative  ">
                  <Image
                  src={"/images/userIcon.png"}
                  width={100}
                  height={100}
                  alt="user Profile"
                  className="rounded-full"
                  />
                </div>
              <input type="file" id="BtnBrowseHidden" name="files" className="hidden"/>
       <div className="absolute -right-9 bottom-3 z-[9999]">
         <label htmlFor="BtnBrowseHidden" id="LblBrowse">
         <Button className="bg-transparent"> <CameraIcon/></Button>
        </label></div>

                </div>
                <div className="flex items-center gap-4">
          <Button variant={"outlined"} className="border-[#032282] bg-[#F5F9FE] py-3 border-[.0187rem] flex items-center gap-x-2 rounded-10"><UploadIcon/> Upload</Button>
          <Button className="bg-[#F5F9FE] text-[#032282] flex items-center gap-x-2 py-3"><RemoveIcon/> Remove</Button>
        </div>
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
