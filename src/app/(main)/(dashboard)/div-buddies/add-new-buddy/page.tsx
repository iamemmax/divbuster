"use client";
import Header from "@/app/(main)/components/shared/Header";
import AngleLeft from "@/app/icons/(dashboard)/AngleLeft";
import { CylinderIcon } from "@/app/icons/(dashboard)/CylinderIcon";
import GreenCheckMark from "@/app/icons/(dashboard)/GreenCheckMark";
import PlusIcon from "@/app/icons/(dashboard)/PlusIcon";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import { Button } from "@/components/core";
import {  Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';



// TypeScript interfaces
interface WeightData {
  month: string;
  previousWeight: number;
  presentWeight: number;
}

interface WeightTrackerData {
  currentWeight: string;
  unit: string;
  data: WeightData[];
}
const AddNewBuddyPage = () => {
  const router = useRouter();
   const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setColumns(4); // 2xl
      } else if (width >= 1024) {
        setColumns(3); // lg
      } else if (width >= 640) {
        setColumns(2); // sm
      } else {
        setColumns(1); // mobile
      }
    };

    updateColumns(); // On mount
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const cylinderData = [
    {
      id: 1,
      volume: "12L",
      startPressure: {
        bar: 200,
        psi: 1600,
      },
      endPressure: {
        bar: 50,
        psi: 750,
      },
      pressureUsed: {
        bar: 150,
        psi: 1200,
      },
      cylinderType: "Aluminum",
      gas: "EAN32",
    },
  ];

 

 interface GearItem {
  id: number
  brand: string
  model: string
  details: string
  category: string
}

const gearData: GearItem[] = [
  {
    id: 1,
    brand: "Atomic",
    model: "X1 Standard",
    details: "Open Heel L Red",
    category: "1st Stage Mares",
  },
  {
    id: 2,
    brand: "Atomic",
    model: "BC1 Other",
    details: "M Black/Red",
    category: "2nd Stage Mares",
  },
  {
    id: 3,
    brand: "Atomic",
    model: "SV2 Clear",
    details: "",
    category: "",
  },
  {
    id: 4,
    brand: "",
    model: "62X",
    details: "",
    category: "",
  },
  {
    id: 5,
    brand: "",
    model: "Epic",
    details: "",
    category: "",
  },
  {
    id: 6,
    brand: "",
    model: "M Black/Red",
    details: "",
    category: "Guage/Console Sherwood",
  },
  {
    id: 7,
    brand: "Tusa",
    model: "Tri-Quest",
    details: "Panoramic Clear",
    category: "",
  },
  {
    id: 8,
    brand: "Akona",
    model: "Tropic Other XL",
    details: "Black/Green/Blue 2.5MM",
    category: "",
  },
  {
    id: 9,
    brand: "Poseidon",
    model: "2 MM 9 US",
    details: "",
    category: "",
  },
  {
    id: 10,
    brand: "Spacefish Army",
    model: "Blue Octo Power",
    details: "",
    category: "",
  },
  {
    id: 11,
    brand: "Oceanic",
    model: "Apple Watch",
    details: "Ultra 2 Watch",
    category: "",
  },
  {
    id: 12,
    brand: "Weight",
    model: "12 lbs",
    details: "",
    category: "",
  },
]

   const buddies = [
    {
      name: "Phoenix Baker",
      rating: 4,
      reviews: 22,
      avatar: "PB",
      img:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Lana Steiner",
      rating: 5,
      reviews: 29,
      avatar: "LS",
      color: "bg-green-100 text-green-700",
      img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    {
      name: "Demi Wilkinson",
      rating: 4,
      reviews: 22,
      avatar: "DW",
      color: "bg-blue-100 text-blue-700",
      img:"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=40&h=40&fit=crop&crop=face",
    },
    {
      name: "Candice Wu",
      rating: 4,
      reviews: 22,
      avatar: "CW",
      color: "bg-pink-100 text-pink-700",
      img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    {
      name: "Natali Craig",
      rating: 4,
      reviews: 22,
      avatar: "NC",
      color: "bg-yellow-100 text-yellow-700",
      img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
    {
      name: "Orlando Diggs",
      rating: 4,
      reviews: 22,
      avatar: "OD",
      color: "bg-indigo-100 text-indigo-700",
      img:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=80&h=80&fit=crop",
    },
  ];
  interface DiveData {
    id: number;
    duration: {
      timeIn: string;
      timeOut: string;
    };
    bottomTime: string;
    depth: {
      maxDepth: string;
      maxDepthFeet: string;
    };
  }
  const diveData: DiveData[] = [
    {
      id: 1,
      duration: {
        timeIn: "3:30 PM",
        timeOut: "4:45 PM",
      },
      bottomTime: "1 h 14m",
      depth: {
        maxDepth: "15m",
        maxDepthFeet: "(45ft)",
      },
    },
  ];



  const weightTrackerData: WeightTrackerData = {
    currentWeight: '76.7',
    unit: 'kg',
    data: [
    { month: 'Jan', previousWeight: 74.2, presentWeight: 73.8 },
    { month: 'Feb', previousWeight: 73.8, presentWeight: 73.5 },
    { month: 'Mar', previousWeight: 74.5, presentWeight: 74.1 },
    { month: 'Apr', previousWeight: 74.8, presentWeight: 74.3 },
    { month: 'May', previousWeight: 75.2, presentWeight: 74.8 },
    { month: 'Jun', previousWeight: 75.8, presentWeight: 75.2 },
    { month: 'Jul', previousWeight: 75.5, presentWeight: 74.9 },
    { month: 'Aug', previousWeight: 76.2, presentWeight: 75.8 },
    { month: 'Sep', previousWeight: 77.1, presentWeight: 76.5 },
    { month: 'Oct', previousWeight: 76.8, presentWeight: 76.2 },
    { month: 'Nov', previousWeight: 77.3, presentWeight: 76.8 },
    { month: 'Dec', previousWeight: 78.1, presentWeight: 76.7 }
  ]
  };

   // Custom legend component
  const CustomLegend = () => (
    <div className="flex justify-end items-center gap-6 mb-4">
      <div className="flex items-center gap-2">
        <div className="size-3 bg-orange-500 rounded-full"></div>
        <span className="text-gray-500 text-sm">Previous Weight</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="size-3 bg-orange-300 rounded-full"></div>
        <span className="text-gray-500 text-sm">Present Weight</span>
      </div>
    </div>
  );
  return (
    <>
      <div>
        <div className="">
          <Header title={`Add New Buddy`} subtitle="" />
        </div>
        <div className="h-[89vh] overflow-y-auto">
          {/* Background Banner Image */}
          <div className="w-full bg-white">
            {/* Header with plant background */}
            <div className="relative h-60 overflow-hidden">
              {/* Plant background image */}
              <div
                className="absolute top-0 inset-x-0 h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url(/images/onboarding/auth-layout-bg.svg)",
                }}
              ></div>

              {/* Underwater overlay with reduced opacity */}
              <div className="">
                <div className="absolute px-[1.875rem] py-[1.3125rem] top-0 left-0 size-full bg-black/50 z-[99999]">
                  <Button
                    className="size-12 rounded-full p-0 bg-white flex justify-center items-center"
                    onClick={() => router.back()}
                  >
                    <AngleLeft />
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile section */}
            <div className="relative px-8 pb-3 bg-white">
              {/* Profile image positioned over the header */}
              <div className="absolute -top-1.5 xl:-top-16 left-8 flex items-center flex-wrap gap-5">
                <div className="size-20 shrink-0 xl:size-28 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <div
                    className="size-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80')",
                    }}
                  ></div>
                </div>
                {/* Profile content */}
                <div className="pt-20">
                  {/* Name and handle */}
                  <div className="mb-8">
                    <div className="flex items-center gap-[.625rem]">
                      <h1 className="2xl:text-3xl text-xl font-medium font-archivo text-[#101828] mb-1">
                        Timothy Blackwell
                      </h1>
                      <div className="bg-[#ECFDF3] rounded-2xl flex items-center py-[.3125rem] px-4 gap-1 justify-center">
                        <div className="size-2 rounded-full bg-[#12B76A]" />
                        <p className="font-archivo font-medium text-sm text-[#027A48]">
                          Online
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-[#667085] font-archivo text-base mt-1 gap-x-4">
                      <div className="">
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 9C18.2426 9 19.25 7.99264 19.25 6.75C19.25 5.50736 18.2426 4.5 17 4.5C15.7574 4.5 14.75 5.50736 14.75 6.75C14.75 7.99264 15.7574 9 17 9Z"
                            stroke="#4F4F4F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.25 18.151C11 12.555 14 23.445 20.75 17.8491"
                            stroke="#4F4F4F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.25 14.401C11 8.80502 14 19.695 20.75 14.0991"
                            stroke="#4F4F4F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.2731 15.5231L12.8862 10.1363C11.1985 8.4484 8.90941 7.50011 6.5225 7.5H4.25"
                            stroke="#4F4F4F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.99609 12.7537L11.6477 9.10217"
                            stroke="#4F4F4F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="">15+ Dives</p>
                      <li className="">
                        <span className="-ml-2">Max depth: 7 mi.</span>
                      </li>
                      <li>
                        <span className="-ml-2">Dive spots: 10</span>
                      </li>
                    </div>
                    <div className="flex items-center text-[#667085] font-archivo text-base gap-x-4 mt-[6px]">
                      <GreenCheckMark />
                      <p>15 of 40 Dives Validated</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add buddy button */}
              <div className="absolute top-5 right-8 flex items-center gap-3">
                <Button
                  variant={"outlined"}
                  className=" text-white px-4 py-[.625rem] bg-[#F7931D] flex items-center gap-3 font-archivo font-medium rounded-lg border border-[#F7931D]  transition-colors text-sm shadow-sm"
                >
                  <PlusIcon /> Add Buddy
                </Button>
                <Button
                  variant={"outlined"}
                  className="bg-white text-[#344054] px-4 py-[.625rem]  flex items-center gap-3    font-archivo font-medium rounded-lg border border-[#D0D5DD]  transition-colors text-sm shadow-sm"
                >
                  <svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7182 2.32846C13.4834 0.957691 11.533 1.51009 10.3613 2.39001C9.88089 2.7508 9.64068 2.93119 9.49935 2.93119C9.35802 2.93119 9.11781 2.7508 8.63739 2.39001C7.4657 1.51009 5.51525 0.957691 3.28055 2.32846C0.347739 4.12745 -0.315884 10.0624 6.44896 15.0695C7.73745 16.0232 8.38169 16.5 9.49935 16.5C10.617 16.5 11.2613 16.0232 12.5497 15.0695C19.3146 10.0624 18.651 4.12745 15.7182 2.32846Z"
                      stroke="#344054"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Add to Favourite
                </Button>
              </div>
            </div>


            
          </div>

         
        <div className="mt-52 2xl:mt-[6.125rem] p-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
              {/* Main Content - 8 columns */}
              <div className="border border-[#EAECF0] rounded-lg  p-[1.875rem]">
                {/* Navigation Tabs */}

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-[#101828] font-archivo">
                    Profile Details
                  </h3>
                  <Button
                    variant={"outlined"}
                    className="bg-white text-[#344054] px-4 py-[.625rem]  flex items-center gap-3    font-archivo font-medium rounded-lg border border-[#D0D5DD]  transition-colors text-sm shadow-sm"
                  >
                    Create a Dive Plan
                  </Button>
                </div>

                <div
                  className="relative rounded-lg overflow-hidden mt-6"
                  style={{ height: "13.6875rem" }}
                >
                  {/* Satellite/Map Background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(/images/dashboard/profile-Location.png)",
                    }}
                  ></div>

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                  {/* Coordinates Overlay */}
                  <div className="absolute top-4 left-4 text-white py-4 px-11 w-full">
                    <div className="flex justify-end items-center w-full">
                      <Button className="bg-white px-[1.0688rem] py-[.5206rem] rounded-2xl text-[#F7931D] text-sm font-medium flex items-center gap-[.3125rem]">
                        <svg
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.16602 12C3.94673 12.2745 3.16602 12.6962 3.16602 13.1691C3.16602 13.9962 5.55383 14.6667 8.49935 14.6667C11.4449 14.6667 13.8327 13.9962 13.8327 13.1691C13.8327 12.6962 13.052 12.2745 11.8327 12"
                            stroke="#F7931D"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M10.1654 6.00004C10.1654 6.92052 9.41917 7.66671 8.4987 7.66671C7.57822 7.66671 6.83203 6.92052 6.83203 6.00004C6.83203 5.07957 7.57822 4.33337 8.4987 4.33337C9.41917 4.33337 10.1654 5.07957 10.1654 6.00004Z"
                            stroke="#F7931D"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M9.33697 11.6624C9.11211 11.879 8.81157 12 8.4988 12C8.18602 12 7.88549 11.879 7.66063 11.6624C5.60157 9.66723 2.84216 7.4384 4.18784 4.20253C4.91543 2.45292 6.66199 1.33337 8.4988 1.33337C10.3356 1.33337 12.0822 2.45292 12.8098 4.20253C14.1537 7.43432 11.4011 9.67411 9.33697 11.6624Z"
                            stroke="#F7931D"
                            strokeWidth="1.2"
                          />
                        </svg>
                        Locate site
                      </Button>
                    </div>
                    <div className="">
                      <p className="text-[#F7931D] font-archivo text-sm lg:text-base">
                        Recent Visited Dive Site
                      </p>
                      <h2 className="font-semibold text-base lg:text-[1.875rem] font-archivo text-white">
                        Maria la Gorda, Guanacabibes
                      </h2>
                      <p className="text-xs lg:text-sm font-archivo text-white/90 py-1">
                        Washington County, Tennessee, United States
                      </p>
                      <div className="flex items-center gap-x-2">
                        <p className="text-xs lg:text-sm font-archivo text-white/90">
                          Max depth: 35 ft
                        </p>
                        <li>
                          <span className="-ml-2">Distance: 34.8mi.</span>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" border border-[#EAECF0] rounded-lg mt-[1.875rem] w-full  p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-[#101828] font-archivo">
                      Air Usage
                    </h3>
                    <Button className="bg-transparent p-0 rounded-2xl text-[#F7931D] text-sm font-medium ">
                      <ThreeDot />
                    </Button>
                  </div>

                  <div className=" w-full mt-2">
                    {cylinderData.map((cylinder) => (
                      <div
                        className="w-full grid grid-cols-[3fr_1fr]"
                        key={cylinder?.id}
                      >
                        <div className="bg-[#132346] rounded-s-[1.25rem] py-[1.1875rem] px-5 lg:px-[2.3125rem] grid grid-cols-[1fr_3fr_3fr] gap-3 lg:gap-9">
                          <div className="flex items-end">
                            <CylinderIcon
                              volume={cylinder?.volume}
                              className="w-8 h-16"
                            />
                          </div>
                          <div className="flex flex-col gap-5 justify-between">
                            <div className="">
                              <p className=" text-xs lg:text-sm font-archivo text-white font-medium py-1">
                                Start Pressure
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-[1.625rem] text-white">
                                {" "}
                                {cylinder.startPressure.bar} bar
                              </h3>
                              <p className="font-archivo font-medium text-white text-sm">
                                {cylinder?.startPressure?.psi}
                              </p>
                            </div>
                            <div className="">
                              <p className=" text-xs lg:text-sm font-archivo text-white font-medium py-1">
                                Cylinder Type
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-[1.625rem] text-white">
                                {" "}
                                {cylinder.cylinderType} bar
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-col gap-5 justify-between">
                            <div className="">
                              <p className=" text-xs lg:text-sm font-archivo text-white font-medium py-1">
                                End Pressure
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-[1.625rem] text-white">
                                {" "}
                                {cylinder.endPressure.bar} Bar
                              </h3>
                              <p className="font-archivo font-medium text-white text-sm">
                                {cylinder?.endPressure?.psi}
                              </p>
                            </div>
                            <div className="">
                              <p className=" text-xs lg:text-sm font-archivo text-white font-medium py-1">
                                Gas
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-[1.625rem] text-white">
                                {" "}
                                {cylinder.gas}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="w-full rounded-e-[1.25rem] bg-[#E4881C] flex flex-col gap-5 justify-center items-center py-[2.125rem] px-5 lg:px-[2.3125rem]">
                          <div className="">
                            <p className=" text-xs lg:text-sm font-archivo text-white font-medium py-1">
                              Pressure Used
                            </p>
                            <h3 className="font-archivo font-semibold text-base lg:text-[1.625rem] text-white">
                              {" "}
                              {cylinder.pressureUsed.bar} Bar
                            </h3>
                            <p className="font-archivo font-medium text-white text-sm">
                              {cylinder?.pressureUsed?.psi}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className=" w-full mt-5">
                    {diveData.map((cylinder) => (
                      <div
                        className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-5"
                        key={cylinder?.id}
                      >
                        <div className="w-full grid grid-cols-[2fr_1.3fr]">
                          <div className="bg-[#C5EFFF] rounded-s-[1.25rem] py-[1.1875rem] px-5 lg:px-[2.3125rem] grid grid-cols-[1fr_1fr] gap-3 lg:gap-9">
                            <div className="flex flex-col gap-5 justify-between">
                              <div className="">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 9.5V13.5L14.5 15M12 5C7.30558 5 3.5 8.80558 3.5 13.5C3.5 18.1944 7.30558 22 12 22C16.6944 22 20.5 18.1944 20.5 13.5C20.5 8.80558 16.6944 5 12 5ZM12 5V2M10 2H14M20.329 5.59204L18.829 4.09204L19.579 4.84204M3.67102 5.59204L5.17102 4.09204L4.42102 4.84204"
                                    stroke="#132346"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                Duration
                              </div>
                              <div className="">
                                <p className=" text-xs lg:text-sm font-archivo text-[#132346] font-medium py-1">
                                  Time in
                                </p>
                                <h3 className="font-archivo font-semibold text-base lg:text-[1.625rem] text-[#132346]">
                                  {" "}
                                  {cylinder.duration.timeIn}
                                </h3>
                              </div>
                            </div>
                            <div className="flex flex-col gap-5 items-end">
                              <div className="">
                                <p className=" text-xs lg:text-sm font-archivo text-[#132346] font-medium py-1">
                                  Time Out
                                </p>
                                <h3 className="font-archivo font-semibold text-base lg:text-[1.625rem] text-[#132346]">
                                  {cylinder?.duration?.timeOut}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="w-full rounded-e-[1.25rem] bg-[#0FB4F5] flex flex-col gap-5 justify-center items-center py-[2.125rem] px-5 lg:px-[2.3125rem]">
                            <div className="">
                              <p className=" text-xs lg:text-sm font-archivo text-white font-medium py-1">
                                Bottom Time
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-[1.625rem] text-white">
                                {" "}
                                {cylinder.bottomTime}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="w-full rounded-[1.25rem] bg-[#d3eccd] flex flex-col gap-5 justify-between items-start py-[2.125rem] px-5 lg:px-[2.3125rem]">
                          <div className="flex items-center gap-2">
                              <svg
                                width="22"
                                height="21"
                                viewBox="0 0 22 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.5 8L19.8839 7.3839C19.3179 6.8179 18.5504 6.5 17.75 6.5C16.9496 6.5 16.1821 6.8179 15.6161 7.3839L15.3839 7.6161C14.8179 8.1821 14.0504 8.5 13.25 8.5C12.4496 8.5 11.6821 8.1821 11.1161 7.6161L10.8839 7.3839C10.3179 6.8179 9.5504 6.5 8.75 6.5C7.9496 6.5 7.1821 6.8179 6.6161 7.3839L6.3839 7.6161C5.8179 8.1821 5.0504 8.5 4.25 8.5C3.4496 8.5 2.6821 8.1821 2.1161 7.6161L1.5 7M20.5 3L19.8839 2.3839C19.3179 1.8179 18.5504 1.5 17.75 1.5C16.9496 1.5 16.1821 1.8179 15.6161 2.3839L15.3839 2.6161C14.8179 3.1821 14.0504 3.5 13.25 3.5C12.4496 3.5 11.6821 3.1821 11.1161 2.6161L10.8839 2.3839C10.3179 1.8179 9.5504 1.5 8.75 1.5C7.9496 1.5 7.1821 1.8179 6.6161 2.3839L6.3839 2.6161C5.8179 3.1821 5.0504 3.5 4.25 3.5C3.4496 3.5 2.6821 3.1821 2.1161 2.6161L1.5 2M11 11.5L11 19.5M11 19.5L14 16.5M11 19.5L8 16.5"
                                  stroke="#132346"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>{" "}
                            <p className=" text-xs lg:text-sm font-archivo text-[#132346] font-medium py-1">
                              Depth
                            </p>

                          </div>
                            <div className="">
                              <p className="font-archivo font-medium text-sm lg:text-base text-[#132346]">
                                Max Depth
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-[1.625rem] text-[#132346]">
                                {" "}
                                15m(45ft)
                              </h3>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dive Profile Chart with Recharts */}
             
      <div className="w-full   mt-[1.875rem]">
        
        {/* Weight Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-5">
            <h1 className="text-2xl font-semibold text-[#101828]">Weight</h1>
            <button className="text-gray-400 hover:text-gray-600">
              <ThreeDot/>
            </button>
          </div>

          {/* Current Weight Display */}
          <div className="mb-5">
            <h2 className="text-base text-[#4F4F4F] mb-2">Current Weight</h2>
            <p className="text-5xl font-bold text-gray-900">
              {weightTrackerData.currentWeight}
              <span className="text-xl font-bold font-archivo">{weightTrackerData.unit}</span>
            </p>
          </div>

          {/* Custom Legend */}
          <CustomLegend />

          {/* Chart */}
          <div className="">
          <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weightTrackerData?.data}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
          <Line type="monotone" dataKey="previousWeight" stroke="#f97316" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="presentWeight" stroke="#fdba74" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
          </div>
        </div>

     
      </div>
                {/* Equipment Details */}

                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-[#101828] font-archivo">
                     Gear
                    </h3>
                    <Button className="bg-transparent p-0 rounded-2xl text-[#F7931D] text-sm font-medium ">
                      <ThreeDot />
                    </Button>
                  </div>
                
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mt-5">
      {gearData.map((gear, index) => {
        const isLastInRow = (index + 1) % columns === 0;

        return (
          <div
            key={gear.id}
            className={`${
              isLastInRow ? "" : "border-r border-[#132346]"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  {gear?.brand}
                </h4>
                <p className="text-xl font-semibold font-archivo text-[#132346]">
                  {gear?.model}
                </p>
              </div>
            </div>
            <div className="text-xl font-semibold font-archivo text-gray-700">
              {gear?.details}
            </div>
          </div>
        );
      })}
    </div>
                </div>


                {/* Notes Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Notes
                  </h3>
                  <div className="text-gray-600 text-sm">
                    <textarea
                      className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add your dive notes here..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Sidebar - 4 columns */}
             <div className=" border border-[#EAECF0] rounded-lg w-full ">
                       <div className="bg-white rounded-lg shadow-sm w-full">
                         <div className="p-4 border-b border-gray-100">
                           <h3 className="font-semibold font-archivo text-base text-[#101828]">Suggested Buddies</h3>
                           {/* <p className="text-xs text-[#78828A] font-medium font-archivo">46 Dive Buddies</p> */}
                         </div>
                         <div className="p-4">
                           <div className="">
                           
           
                               {buddies.map((buddy, index) => (
                           <div key={index} className="relative flex items-center justify-between py-3">
                             {/* Connecting line */}
                             {index < buddies.length - 1 && (
                               <div className="absolute left-5 top-12 w-[2px] h-6 bg-gray-200"></div>
                             )}
                             
                             <div className="flex items-center gap-3 flex-1 min-w-0">
                               <div className="relative z-10 shrink-0">
                                 <img
                                   src={buddy.img}
                                   alt={buddy.name}
                                   className="size-10 rounded-full object-cover"
                                 />
                                 
                                   <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border border-white"></div>
                                
                               </div>
                               <div className="flex-1 min-w-0">
                                 <div className="font-medium text-gray-900 text-sm truncate">{buddy.name}</div>
                                 <div className="flex items-center space-x-1">
                                     {[...Array(5)].map((_, i) => (
                                       <Star
                                         key={i}
                                         className={`size-3 ${i < buddy.rating ? "text-orange-400 fill-current" : "text-gray-300"}`}
                                       />
                                     ))}
                                     <span className="text-xs text-gray-500 ml-1">
                                       {buddy.reviews} Reviews
                                     </span>
                                   </div>
                               </div>
                             </div>
                             <button className="flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-colors p-1 shrink-0">
                               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15ZM10 20C8.61667 20 7.31667 19.7417 6.1 19.225C4.88333 18.6917 3.825 17.975 2.925 17.075C2.025 16.175 1.30833 15.1167 0.775 13.9C0.258333 12.6833 0 11.3833 0 10C0 8.61667 0.258333 7.31667 0.775 6.1C1.30833 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31667 6.1 0.799999C7.31667 0.266666 8.61667 0 10 0C11.3833 0 12.6833 0.266666 13.9 0.799999C15.1167 1.31667 16.175 2.025 17.075 2.925C17.975 3.825 18.6833 4.88333 19.2 6.1C19.7333 7.31667 20 8.61667 20 10C20 11.3833 19.7333 12.6833 19.2 13.9C18.6833 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6917 13.9 19.225C12.6833 19.7417 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#A9B0C2"/>
                               </svg>
                             </button>
                           </div>
                         ))}
                           </div>
                         </div>
                           <div className="flex py-3 justify-center items-center w-full">
           
                           <Button variant={"outlined"} className=" mt-4 text-center text-sm text-gray-600 hover:text-gray-800">
                             View more
                           </Button>
                           </div>
                       </div>
                     </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default AddNewBuddyPage;
