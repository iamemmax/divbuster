"use client"
import Header from '@/app/(main)/components/shared/Header'
import { useParams } from 'next/navigation'
import React from 'react'
import slugify from 'react-slugify'
import { diveLogData } from '../components'
import Image from 'next/image'
import { Button } from '@/components/core'
import DiveTimeChart from '../components/TimeChart'
import ThreeDot from '@/app/icons/(dashboard)/ThreeDot'
import { CylinderIcon } from '@/app/icons/(dashboard)/CylinderIcon'
import DiveLogCharts from '../components/DiveLogCharts'
import SingleDIveLogSidebar from '../components/SingleDiveLogSidebar'

const DiveLogId = () => {
    const params = useParams()

 const singleDivLog = diveLogData?.find((_item) => slugify(_item?.dive.title) === params?.name);
const metrics = [
    { label: "Dive Time", value: "33:48" },
    { label: "Air", value: "Gas" },
    { label: "Avg. Depth", value: "13.4m" },
    { label: "Max Depth", value: "24.3m" },
    { label: "Water", value: "Salt" }
  ];
  
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

 
  return (
   <div className="text-black dark:text-white">

    <Header
  title={
    params?.name
      ? String(params.name)
          ?.replace(/-/g, ' ')
          ?.replace(/\b\w/g, char => char.toUpperCase())
      : ''
  }
  subtitle=""
/>



      {/* Dashboard content */}
      <div className="mt-[2.125rem] md:px-[1.875rem] h-[83vh] overflow-y-auto">
        <div className="mt-[13rem] 2xl:mt-[1.125rem]  py-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 w-full">
        <div className="">
            <div
            className="bg-white rounded-lg border border-[#EAECF0] cursor-pointer p-[1.875rem] px-4 md:px-[2.2813rem]"
          >
            <div className="flex items-center justify-between w-full  mb-6">
              <div className="flex items-start space-x-4 w-full">
                <div className="relative shrink-0 md:h-[60px]  md:w-[60px] h-[40px] w-[40px] rounded-full">
                  <Image
                    src={singleDivLog?.diver.profileImage as string}
                    alt="img"
                    fill
                    className="object-cover rounded-full" // or object-contain, depending on your desired behavior
                  />
                </div>
                <div className=" flex items-start w-full  justify-between">
                  <div className="flex flex-col flex-1">
                    <h2 className="text-sm md:text-lg font-medium text-[#1F2C37] font-archivo">
                      {singleDivLog?.diver.name}
                    </h2>
                    <p className="text-[#78828A] font-archivo font-medium text-xxs md:text-sm py-2">
                      {singleDivLog?.post.timestamp} <span className="px-2"> • </span>
                      {singleDivLog?.post.time}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <h2 className="text-sm md:text-xl font-archivo font-medium text-[#132346]">
                        {singleDivLog?.dive.title}
                      </h2>
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 15.5L16.6666 16.4117C16.2245 16.8951 15.6251 17.1667 15.0001 17.1667C14.3751 17.1667 13.7757 16.8951 13.3337 16.4117C12.891 15.9293 12.2916 15.6584 11.6668 15.6584C11.042 15.6584 10.4426 15.9293 9.99998 16.4117M2.5 17.1667H3.89545C4.3031 17.1667 4.50693 17.1667 4.69874 17.1206C4.8688 17.0798 5.03138 17.0125 5.1805 16.9211C5.34869 16.818 5.49282 16.6739 5.78107 16.3856L16.25 5.91669C16.9404 5.22634 16.9404 4.10705 16.25 3.41669C15.5597 2.72634 14.4404 2.72634 13.75 3.41669L3.28105 13.8856C2.9928 14.1739 2.84867 14.318 2.7456 14.4862C2.65422 14.6353 2.58688 14.7979 2.54605 14.968C2.5 15.1598 2.5 15.3636 2.5 15.7713V17.1667Z"
                          stroke="#98A2B3"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={handleToggle}
                      onKeyDown={handleKeyDown}
                      className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${getColorClasses(currentOption.color).bg} ${getColorClasses(currentOption.color).border}`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <div
                        className={getColorClasses(currentOption?.color).icon}
                      >
                        {currentOption?.icon}
                      </div>
                      <span
                        className={`font-medium text-sm font-archivo ${getColorClasses(currentOption?.color).text}`}
                      >
                        {currentOption?.label}
                      </span>
                      <div
                        className={`${getColorClasses(currentOption?.color).icon} transition-transform ${isOpen ? "rotate-180" : ""}`}
                      >
                        <svg
                          width="11"
                          height="7"
                          viewBox="0 0 11 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1.25L5.5 5.75L10 1.25"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
                        {visibilityOptions.map((option: VisibilityOption) => (
                          <button
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            onKeyDown={(e: React.KeyboardEvent) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleSelect(option);
                              }
                            }}
                            className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                              selectedVisibility === option.value
                                ? "bg-gray-50"
                                : ""
                            }`}
                          >
                            <div className={getColorClasses(option.color).icon}>
                              {option.icon}
                            </div>
                            <span
                              className={`font-medium ${getColorClasses(option.color).text}`}
                            >
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
            </div>

            <div
              className="relative rounded-lg overflow-hidden mt-6"
              style={{ height: "15.6875rem" }}
            >
              {/* Satellite/Map Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${singleDivLog?.location.backgroundImage})`,
                }}
              ></div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              {/* Coordinates Overlay */}
              <div className="absolute top-2 left-4 text-white py-4 px-6 md:px-[2.75rem] w-full">
                <div className="flex justify-end max-md:pr-2 items-center w-full">
                  <Button className="bg-white px-[1.0688rem] py-[.5206rem] rounded-2xl text-[#F7931D] text-xs md:text-sm font-medium flex items-center gap-[.3125rem]">
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.61448 1.99931C7.08128 2.53251 6.55291 2.78005 5.79275 2.78005C5.12902 2.78005 4.1847 2.65132 3.66602 3.17437C3.15143 3.69329 3.27958 4.63372 3.27958 5.29322C3.27958 6.0534 3.03202 6.58177 2.49881 7.11498C1.61029 8.0035 1.16602 8.44776 1.16602 8.99982C1.16603 9.55188 1.6103 9.99618 2.49883 10.8847C3.09615 11.482 3.27958 11.8677 3.27958 12.7064C3.27958 13.3702 3.15086 14.3145 3.67392 14.8332C4.19284 15.3477 5.13325 15.2196 5.79274 15.2196C6.60226 15.2196 6.99209 15.3779 7.56982 15.9557C8.06179 16.4477 8.72126 17.3332 9.49937 17.3332C10.2775 17.3332 10.9369 16.4476 11.4289 15.9557C12.0066 15.3779 12.3964 15.2196 13.206 15.2196C13.8655 15.2196 14.8059 15.3477 15.3248 14.8332C15.8478 14.3145 15.7191 13.3702 15.7191 12.7064C15.7191 11.8677 15.9025 11.482 16.4999 10.8847C17.3884 9.99618 17.8327 9.55188 17.8327 8.99982C17.8327 8.44776 17.3884 8.0035 16.4999 7.11498C15.9026 6.51765 15.7191 6.13199 15.7191 5.29322C15.7191 4.6295 15.8478 3.6852 15.3248 3.1665C14.8059 2.65189 13.8655 2.78005 13.206 2.78005C12.4456 2.78005 11.9173 2.53239 11.3842 1.99931C10.4957 1.11077 10.0514 0.666504 9.49935 0.666504C8.94728 0.666504 8.50301 1.11077 7.61448 1.99931Z"
                        fill="#F7931D"
                      />
                      <path
                        d="M15.3248 14.8332H15.3327M15.3248 14.8332C14.8059 15.3477 13.8655 15.2196 13.206 15.2196C12.3964 15.2196 12.0066 15.3779 11.4289 15.9557C10.9369 16.4476 10.2775 17.3332 9.49937 17.3332C8.72126 17.3332 8.06179 16.4477 7.56982 15.9557C6.99209 15.3779 6.60226 15.2196 5.79274 15.2196C5.13325 15.2196 4.19284 15.3477 3.67392 14.8332C3.15086 14.3145 3.27958 13.3702 3.27958 12.7064C3.27958 11.8677 3.09615 11.482 2.49883 10.8847C1.6103 9.99618 1.16603 9.55187 1.16602 8.99982C1.16602 8.44776 1.61029 8.0035 2.49881 7.11498C3.03202 6.58177 3.27958 6.0534 3.27958 5.29322C3.27958 4.63372 3.15143 3.69329 3.66602 3.17437C4.1847 2.65132 5.12902 2.78005 5.79275 2.78005C6.55291 2.78005 7.08128 2.53251 7.61448 1.99931C8.50301 1.11077 8.94728 0.666504 9.49935 0.666504C10.0514 0.666504 10.4957 1.11077 11.3842 1.99931C11.9173 2.53239 12.4456 2.78005 13.206 2.78005C13.8655 2.78005 14.8059 2.65189 15.3248 3.1665C15.8478 3.6852 15.7191 4.6295 15.7191 5.29322C15.7191 6.13199 15.9026 6.51765 16.4999 7.11498C17.3884 8.0035 17.8327 8.44776 17.8327 8.99982C17.8327 9.55187 17.3884 9.99618 16.4999 10.8847C15.9025 11.482 15.7191 11.8677 15.7191 12.7064C15.7191 13.3702 15.8478 14.3145 15.3248 14.8332Z"
                        stroke="#F7931D"
                        stroke-width="1.1"
                      />
                      <path
                        d="M7 9.74388L8.5 11.0832L12 6.9165"
                        stroke="white"
                        stroke-width="1.1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    {singleDivLog?.post.status}
                  </Button>
                </div>
                <div className="">
                  <div className="flex items-center flex-wrap gap-[10px]">
                    <div className="relative h-[40px] rounded w-[52px]">
                      <Image
                        src={String(singleDivLog?.location.backgroundImage)}
                        alt="img"
                        fill
                        className="object-cover rounded" // or object-contain, depending on your desired behavior
                      />
                    </div>

                    <div className="flex items-center gap-[10px]">
                      <p className="text-white font-archivo font-semibold text-xs md:text-lg">
                        {singleDivLog?.location.site}
                      </p>
                      <div className="flex items-center bg-[#C5EFFF] max-w-[100px] justify-center gap-[.3531rem] py-1 px-[.4063rem] rounded-10 ">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1793_6131)">
                            <path
                              d="M7.46891 4.75631C7.84067 4.72453 8.167 4.56814 8.44039 4.28964C9.38002 3.33245 9.35147 1.1992 9.34981 1.10887C9.34673 0.941112 9.2099 0.806742 9.04208 0.806619L7.49392 0.805603V0.153988C7.49392 0.0689249 7.42496 0 7.33993 0H2.6587C2.57367 0 2.50471 0.0689249 2.50471 0.153988V0.805541L0.956581 0.806588C0.788796 0.806711 0.651962 0.941081 0.648852 1.10884C0.647158 1.1992 0.618639 3.33242 1.55827 4.28961C1.83166 4.56811 2.15802 4.7245 2.52975 4.75628C2.67194 5.75175 3.41768 6.55471 4.38339 6.78221V8.72039H3.6032C3.55285 8.72039 3.5057 8.745 3.4769 8.7863L2.79935 9.75793C2.76652 9.80499 2.76261 9.8664 2.78916 9.91728C2.81568 9.96813 2.86831 10 2.92568 10C2.92568 10 7.07344 9.99997 7.07369 10C7.15872 10 7.22767 9.93108 7.22767 9.84601C7.22767 9.80875 7.21206 9.77841 7.19241 9.74795L6.52182 8.78627C6.49303 8.74497 6.44588 8.72036 6.39552 8.72036H5.61533V6.78224C6.58099 6.55471 7.32672 5.75178 7.46891 4.75631ZM8.72912 1.42232C8.6994 2.10397 8.53839 3.31055 8.00085 3.85813C7.85234 4.00938 7.68526 4.09986 7.49395 4.13254V1.42149L8.72912 1.42232ZM1.26982 1.42232L2.50471 1.42152V4.13254C2.31355 4.09986 2.14666 4.00963 1.99828 3.85863C1.46178 3.31268 1.3001 2.10467 1.26982 1.42232ZM3.72328 2.57021L4.60501 2.44209L4.99935 1.64311L5.39368 2.44209L6.27541 2.57021L5.63738 3.19214L5.78801 4.07033L4.99938 3.6557L4.21074 4.07033L4.36137 3.19214L3.72328 2.57021Z"
                              fill="#132346"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1793_6131">
                              <rect width="10" height="10" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="font-archivo text-xxs text-[#132346] font-semibold">
                          Rank:{singleDivLog?.location.rank}
                        </p>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 13.625C11.1066 13.625 13.625 11.1066 13.625 8C13.625 4.8934 11.1066 2.375 8 2.375C4.8934 2.375 2.375 4.8934 2.375 8C2.375 11.1066 4.8934 13.625 8 13.625Z"
                          stroke="#F7931D"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.53125 7.53125C7.65557 7.53125 7.7748 7.58064 7.86271 7.66854C7.95061 7.75645 8 7.87568 8 8V10.3438C8 10.4681 8.04939 10.5873 8.13729 10.6752C8.2252 10.7631 8.34443 10.8125 8.46875 10.8125"
                          stroke="#F7931D"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.76562 6.125C8.15395 6.125 8.46875 5.8102 8.46875 5.42188C8.46875 5.03355 8.15395 4.71875 7.76562 4.71875C7.3773 4.71875 7.0625 5.03355 7.0625 5.42188C7.0625 5.8102 7.3773 6.125 7.76562 6.125Z"
                          fill="#F7931D"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="font-semibold py-3 text-sm md:text-base lg:text-[1.875rem] font-archivo text-white">
                    {singleDivLog?.location.city}, {singleDivLog?.location.region}
                  </h2>
                  <div className="flex gap-x-2 py-3 items-center">
                    {singleDivLog?.location?.tags.map((tag, idx:number) => (
                      <div
                        key={idx}
                        className=" px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] text-[#175CD3] cursor-pointer"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="py-2">
                    <p className="text-xs text-[#F7F7F7] md:text-base font-archivo ">
                      Latitude:{" "}
                      <span className="font-semibold">
                        {singleDivLog?.location.coordinates.latitude}{" "}
                      </span>{" "}
                      <span className="px-2">•</span> Longitude:{" "}
                      <span className="font-semibold">
                        {singleDivLog?.location.coordinates.longitude}
                      </span>
                    </p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
         {/* <div className="flex justify-center flex-wrap items-center border border-[#EAECF0] rounded-lg  "> */}
        {/* Desktop Layout */}
        <div className="flex divide-x flex-wrap py-4  px-4 md:px-8 divide-gray-200 border border-[#EAECF0] rounded-lg mt-5">
          {metrics.map((metric, index) => (
            <div key={index} className="flex-1 px-4 first:pl-8 last:pr-8">
              <div className="text-gray-400 text-base font-normal mb-4">
                {metric.label}
              </div>
              <div className="text-[#101828] font-archivo text-base md:text-xl font-bold leading-none">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
        
      
    {/* </div> */}
            
            <DiveTimeChart/>

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
                        <div className="bg-[#fef6f4] rounded-s-[1.25rem] py-[1.1875rem] px-5 lg:px-[2.3125rem] grid grid-cols-[1fr_3fr_3fr] gap-3 lg:gap-9">
                          <div className="flex items-end">
                            <CylinderIcon
                              volume={cylinder?.volume}
                              className="w-8 h-16"
                              bgColor='#132346'
                              textColor='#fff'
                            />
                          </div>
                          <div className="flex flex-col gap-5 justify-between">
                            <div className="">
                              <p className=" text-xs lg:text-sm font-archivo text-[#132346] font-medium py-1">
                                Start Pressure
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346]">
                                {" "}
                                {cylinder.startPressure.bar} bar
                              </h3>
                              <p className="font-archivo font-medium text-[#132346] text-sm">
                                {cylinder?.startPressure?.psi}
                              </p>
                            </div>
                            <div className="">
                              <p className=" text-xs lg:text-sm font-archivo text-[#132346] font-medium py-1">
                                Cylinder Type
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346]">
                                {" "}
                                {cylinder.cylinderType} bar
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-col gap-5 justify-between">
                            <div className="">
                              <p className=" text-xs lg:text-sm font-archivo text-[#132346] font-medium py-1">
                                End Pressure
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346]">
                                {" "}
                                {cylinder.endPressure.bar} Bar
                              </h3>
                              <p className="font-archivo font-medium text-[#132346] text-sm">
                                {cylinder?.endPressure?.psi}
                              </p>
                            </div>
                            <div className="">
                              <p className=" text-xs lg:text-sm font-archivo text-[#132346] font-medium py-1">
                                Gas
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346]">
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
                            <h3 className="font-archivo font-semibold text-base lg:text-xl text-white">
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

                </div>

                <DiveLogCharts/>
       </div>


        </div>
        <div className="">
            <SingleDIveLogSidebar/>
        </div>

        </div>
</div>

</div>
  )
}

export default DiveLogId