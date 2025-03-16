"use client";
import { Button } from "@/components/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TopCards from "../comp/components/cards/TopCards";
import HospitalAround from "../comp/components/cards/hospital/table/HospitalAround";
import HospitalVisited from "../comp/components/cards/hospital/table/HospitalVisited";
import TransactionsTable from "../comp/components/transactions/table/TransactionsTable";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import DashboardPlanHeader from "../comp/components/DashboardPlanHeader";

const Dashboard = () => {
  const { data: userData, isLoading } = useUser();

  return (
    <div className="relative bg-[#f5f9fe] w-full h-screen">
   
      <DashboardPlanHeader />
      <div className="w-full h-12 bg-main py-10"></div>
      <div className=" relative w-full px-3  md:px-[3rem] 2xl:[4rem]  3xl:px-[7.5rem]  h-full ">
        <div className="relative">
          <div className=" inset-x-0 top-[-4rem] absolute">
            <div className="">
              <TopCards userData={userData} loadinUser={isLoading} />
            </div>
            <div className="mt-4 grid grid-cols-1  gap-3 lg:grid-cols-2">
              <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4">
                <HospitalAround userData={userData} loadinUser={isLoading} />
              </div>
              <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4">
                <HospitalVisited userData={userData} loadinUser={isLoading} />
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4 mt-4">
              <TransactionsTable userData={userData} loadinUser={isLoading} />
            </div>
          </div>
        </div>
      </div>
      {/* <Marquee/> */}
    </div>
  );
};

export default Dashboard;
