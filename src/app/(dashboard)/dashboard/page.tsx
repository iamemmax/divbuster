"use client";
import { Button } from "@/components/core";
import Image from "next/image";
import React from "react";
import TopCards from "../comp/components/cards/TopCards";
import HospitalAround from "../comp/components/cards/hospital/table/HospitalAround";
import HospitalVisited from "../comp/components/cards/hospital/table/HospitalVisited";
import TransactionsTable from "../comp/components/transactions/table/TransactionsTable";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import { capitalizeFirstLetter } from "@/utils";
import { Spinner } from "@/icons/core";
import Marquee from "@/app/(main)/misc/components/Marquee";
import ActiveIcon from "../comp/icons/ActiveIcon";

const Dashboard = () => {
  const { data: userData, isLoading } = useUser();
  return (
    <div className="relative bg-[#f5f9fe] w-full h-screen">
      <div className="bg-main w-full flex justify-between py-6 px-6 md:px-[7.5rem] ">
        <div className="flex items-center gap-x-3 mb-[5rem] w-full">
          <div className="text-white h-[2.5rem] w-[2.5rem]">
            <Image
              alt="user icon"
              src={`/images/usericon.png`}
              height={40}
              width={40}
              className="rounded-full"
            />
          </div>

          {isLoading ? (
            <Spinner color="red" />
          ) : (
            <div className="flex  flex-col w-full ">
              <h2 className="text-white text-sm md:text-base font-medium">
                {capitalizeFirstLetter(String(userData?.first_name))}{" "}
                {capitalizeFirstLetter(String(userData?.last_name))}
              </h2>
              <div className="flex justify-between items-center w-full ">
                <div className="flex items-center gap-x-3 flex-1">
                  <p className="text-[#6E6E8B] text-xs md:text-sm font-medium">
                    Welcome, How are you today?
                  </p>
                  {userData?.is_active? 
                  <div className="bg-[#142D22] rounded-lg py-2 px-3 flex items-center gap-[.375rem]">
                    <ActiveIcon/>
                    <p className="text-[.625rem] text-[#12B669]">Active plan</p>
                  </div> : 
                  <div className="bg-[#F6CE7F26] rounded-lg py-2 px-3 flex items-center gap-[.375rem]">
                     <ActiveIcon color="#DB8C00"/>
                    <p className="text-[.625rem] text-[#DB8C00]">Inactive plan</p>
                  </div>
                  }
                </div>
                <div className="hidden lg:block">

                 <Button className="bg-[#099976] text-white text-xs font-medium">
                    Renew plan
                  </Button> 
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" relative w-full px-6 md:px-[7.5rem] h-full ">
        <div className="relative">
          <div className=" inset-x-0 top-[-4rem] absolute">
            <div className="">
              <TopCards userData={userData} />
            </div>
            <div className="mt-4 grid grid-cols-1  gap-3 lg:grid-cols-2">
              <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4">
                <HospitalAround userData={userData} />
              </div>
              <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4">
                <HospitalVisited userData={userData} />
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4 mt-4">
              <TransactionsTable userData={userData} />
            </div>
          </div>
        </div>
      </div>
      {/* <Marquee/> */}
    </div>
  );
};

export default Dashboard;