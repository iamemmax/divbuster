import { Button } from "@/components/core";
import Image from "next/image";
import React from "react";
import TopCards from "../comp/components/cards/TopCards";
import HospitalAround from "../comp/components/cards/hospital/table/HospitalAround";
import HospitalVisited from "../comp/components/cards/hospital/table/HospitalVisited";
import TransactionsTable from "../comp/components/transactions/table/TransactionsTable";
import Marquee from "@/app/(main)/misc/components/Marquee";

const page = () => {
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

          <div className="flex  flex-col w-full ">
            <h2 className="text-white text-sm md:text-base font-medium">
              Olamide Adewale
            </h2>
            <div className="flex justify-between items-center w-full ">
              <div className="flex items-center gap-x-3 flex-1">
                <p className="text-[#6E6E8B] text-xs md:text-sm font-medium">
                  Welcome, How are you today?
                </p>
                <div className="bg-[#142D22] rounded-lg py-2 px-3 flex items-center gap-[.375rem]">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="5" cy="5" r="5" fill="#12B669" />
                    <path
                      d="M4.58224 7.17C4.49378 7.17 4.40975 7.13462 4.34783 7.0727L3.09619 5.82106C2.96794 5.6928 2.96794 5.48051 3.09619 5.35225C3.22445 5.22399 3.43675 5.22399 3.56501 5.35225L4.58224 6.36948L6.85553 4.09619C6.98378 3.96794 7.19608 3.96794 7.32434 4.09619C7.4526 4.22445 7.4526 4.43675 7.32434 4.56501L4.81664 7.0727C4.75472 7.13462 4.67069 7.17 4.58224 7.17Z"
                      fill="white"
                    />
                  </svg>

                  <p className="text-[.625rem] text-[#12B669]">Active plan</p>
                </div>
              </div>
              <div className="hidden lg:block">
                <Button className="bg-[#099976] text-white text-xs font-medium">
                  Renew plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" relative w-full px-6 md:px-[7.5rem] h-full ">
        {" "}
        <div className="relative">
          <div className=" inset-x-0 top-[-4rem] absolute">
            <div className="">
              <TopCards />
            </div>
            <div className="mt-4 grid grid-cols-1  gap-3 lg:grid-cols-2">
              <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4">
                <HospitalAround />
              </div>
              <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4">
                <HospitalVisited />
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-10 py-[1.125rem] px-4 mt-4">
              <TransactionsTable />
            </div>
          </div>
        </div>
      </div>
      <Marquee/>
    </div>
  );
};

export default page;
