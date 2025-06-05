"use client";
import { Button } from "@/components/core";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { diveLogData } from ".";
import LikeIcon from "@/app/icons/(dashboard)/LikeIcon";
import MessageIcon2 from "@/app/icons/(dashboard)/MessageIcon2";
import ShareIcon2 from "@/app/icons/(dashboard)/ShareIcon2";
import { buddies } from "../../div-buddies/profile/[id]/page";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import slugify from 'react-slugify';
interface VisibilityOption {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: "green" | "red";
}

interface ColorClasses {
  bg: string;
  border: string;
  text: string;
  icon: string;
}
const DiveLogContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedVisibility, setSelectedVisibility] =
    useState<string>("Public");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const visibilityOptions: VisibilityOption[] = [
    {
      value: "Public",
      label: "Public",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ),
      color: "green",
    },
    {
      value: "Private",
      label: "Private",
      icon: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.875 3.3125L15.125 15.6875"
            stroke="#FF0000"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.3924 11.5814C10.8404 12.0833 10.1117 12.3453 9.36653 12.3098C8.62138 12.2743 7.92084 11.9443 7.41902 11.3923C6.91721 10.8403 6.65521 10.1116 6.69068 9.36645C6.72616 8.6213 7.05618 7.92076 7.60816 7.41895"
            stroke="#FF0000"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0293 6.7373C10.6272 6.85181 11.1719 7.15724 11.5814 7.60772C11.9909 8.0582 12.2432 8.6294 12.3004 9.23551"
            stroke="#FF0000"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.1688 12.3899C16.7016 11.0174 17.3759 9.50001 17.3759 9.50001C17.3759 9.50001 15.1259 4.43751 9.50094 4.43751C9.01383 4.43684 8.52749 4.47635 8.04688 4.55563"
            stroke="#FF0000"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.70312 5.32324C2.83648 6.77449 1.625 9.4998 1.625 9.4998C1.625 9.4998 3.875 14.5623 9.5 14.5623C10.818 14.5726 12.1195 14.269 13.2969 13.6764"
            stroke="#FF0000"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      color: "red",
    },
  ];

  const currentOption =
    visibilityOptions.find((option) => option.value === selectedVisibility) ||
    visibilityOptions[0];

  const getColorClasses = (color: "green" | "red"): ColorClasses => {
    const colors = {
      green: {
        bg: "bg-[#ECFDF3]",
        border: "border-green-200",
        text: "text-[#027A48]",
        icon: "text-green-600",
      },
      red: {
        bg: "bg-[#FFDDDD]",
        border: "border-red-200",
        text: "text-[#FF0000]",
        icon: "text-[#FF0000]",
      },
    };
    return colors[color];
  };

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: VisibilityOption): void => {
    setSelectedVisibility(option.value);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 const router =useRouter()
  return (
    <div className="mt-[13rem] 2xl:mt-[1.125rem]  py-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 w-full">
      <div className="space-y-6 ">
        {diveLogData?.map((item, idx: number) => (
          <div
            className="bg-white rounded-lg border border-[#EAECF0] cursor-pointer p-[1.875rem] px-4 md:px-[2.2813rem]"
            key={idx}
            onClick={()=>router.push(`/div-log/${slugify(item?.dive.title)}`)}
          >
            <div className="flex items-center justify-between w-full  mb-6">
              <div className="flex items-start space-x-4 w-full">
                <div className="relative shrink-0 md:h-[60px]  md:w-[60px] h-[40px] w-[40px] rounded-full">
                  <Image
                    src={item.diver.profileImage}
                    alt="img"
                    fill
                    className="object-cover rounded-full" // or object-contain, depending on your desired behavior
                  />
                </div>
                <div className=" flex items-start w-full  justify-between">
                  <div className="flex flex-col flex-1">
                    <h2 className="text-sm md:text-lg font-medium text-[#1F2C37] font-archivo">
                      {item.diver.name}
                    </h2>
                    <p className="text-[#78828A] font-archivo font-medium text-xxs md:text-sm py-2">
                      {item.post.timestamp} <span className="px-2"> • </span>
                      {item.post.time}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <h2 className="text-sm md:text-xl font-archivo font-medium text-[#132346]">
                        {item.dive.title}
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
                  <div className="relative" ref={dropdownRef}>
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
                  </div>
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
                  backgroundImage: `url(${item.location.backgroundImage})`,
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
                    {item.post.status}
                  </Button>
                </div>
                <div className="">
                  <div className="flex items-center flex-wrap gap-[10px]">
                    <div className="relative h-[40px] rounded w-[52px]">
                      <Image
                        src={item.location.backgroundImage}
                        alt="img"
                        fill
                        className="object-cover rounded" // or object-contain, depending on your desired behavior
                      />
                    </div>

                    <div className="flex items-center gap-[10px]">
                      <p className="text-white font-archivo font-semibold text-xs md:text-lg">
                        {item.location.site}
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
                          Rank:{item.location.rank}
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
                    {item.location.city}, {item.location.region}
                  </h2>
                  <div className="flex gap-x-2 py-3 items-center">
                    {item.location.tags.map((tag, idx) => (
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
                        {item.location.coordinates.latitude}{" "}
                      </span>{" "}
                      <span className="px-2">•</span> Longitude:{" "}
                      <span className="font-semibold">
                        {item.location.coordinates.longitude}
                      </span>
                    </p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:px-[55px] py-5">
              <div className="flex gap-x-4 items-start">
                <div className="">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.5L19.3839 6.8839C18.8179 6.3179 18.0504 6 17.25 6C16.4496 6 15.6821 6.3179 15.1161 6.8839L14.8839 7.1161C14.3179 7.6821 13.5504 8 12.75 8C11.9496 8 11.1821 7.6821 10.6161 7.1161L10.3839 6.8839C9.8179 6.3179 9.0504 6 8.25 6C7.4496 6 6.6821 6.3179 6.1161 6.8839L5.8839 7.1161C5.3179 7.6821 4.5504 8 3.75 8C2.9496 8 2.1821 7.6821 1.6161 7.1161L1 6.5M20 2.5L19.3839 1.8839C18.8179 1.3179 18.0504 1 17.25 1C16.4496 1 15.6821 1.3179 15.1161 1.8839L14.8839 2.1161C14.3179 2.6821 13.5504 3 12.75 3C11.9496 3 11.1821 2.6821 10.6161 2.1161L10.3839 1.8839C9.8179 1.3179 9.0504 1 8.25 1C7.4496 1 6.6821 1.3179 6.1161 1.8839L5.8839 2.1161C5.3179 2.6821 4.5504 3 3.75 3C2.9496 3 2.1821 2.6821 1.6161 2.1161L1 1.5M10.5 11L10.5 19M10.5 19L13.5 16M10.5 19L7.5 16"
                      stroke="#132346"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="">
                  <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                    Max Depth{" "}
                  </p>
                  <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                    {item?.stats?.maxDepth?.metric}
                  </p>
                  <p className="font-archivo font-semibold text-sm md:text-xl text-[#F7931D]">
                    {item?.stats?.maxDepth?.imperial}
                  </p>
                </div>
              </div>
              <div className="flex gap-x-4 items-start">
                <div className="">
                  <svg
                    width="24"
                    height="23"
                    viewBox="0 0 24 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6048 18.7918L16.6882 20.8752L21.3757 16.1877M22.4018 12.073C22.4121 11.8833 22.4173 11.6924 22.4173 11.5002C22.4173 5.7472 17.7536 1.0835 12.0007 1.0835C6.24768 1.0835 1.58398 5.7472 1.58398 11.5002C1.58398 17.162 6.10118 21.7689 11.7282 21.9133M12.0007 5.25016V11.5002L15.8948 13.4472"
                      stroke="#132346"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="">
                  <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                    Bottom Time{" "}
                  </p>
                  <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                    {item?.stats?.bottomTime?.duration}
                  </p>
                  {/* <p  className="font-archivo font-semibold text-sm md:text-xl text-[#F7931D]">{item?.stats?.bottomTime?.duration}</p> */}
                </div>
              </div>
              <div className="flex gap-x-4 items-start">
                <div className="">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.25 22.5H10.25C10.0511 22.5 9.86032 22.421 9.71967 22.2803C9.57902 22.1397 9.5 21.9489 9.5 21.75V9.75C9.5 8.75544 9.89509 7.80161 10.5983 7.09835C11.3016 6.39509 12.2554 6 13.25 6C14.2446 6 15.1984 6.39509 15.9017 7.09835C16.6049 7.80161 17 8.75544 17 9.75V21.75C17 21.9489 16.921 22.1397 16.7803 22.2803C16.6397 22.421 16.4489 22.5 16.25 22.5Z"
                      stroke="#132346"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.92773 15.75H16.7849"
                      stroke="#132346"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.25 6V3"
                      stroke="#132346"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.5 3.42871H15.9286"
                      stroke="#132346"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="">
                  <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                    Pressure Used{" "}
                  </p>
                  <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                    {item?.stats?.pressureUsed?.metric}
                  </p>
                  <p className="font-archivo font-semibold text-sm md:text-xl text-[#F7931D]">
                    {item?.stats?.pressureUsed?.imperial}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-between flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {item?.social?.photos?.thumbnails?.slice(0, 4).map((avatar, index) => (
                          <img
                            key={index}
                            src={avatar}
                            alt=""
                            className="w-10 h-10 rounded-full border border-white object-cover"
                          />
                        ))}
                        {item?.social?.photos?.count > 4 && (
                          <div className="flex items-center gap-2">

                          <div className="w-10 h-10 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs text-gray-600">
                            +{item?.social?.photos?.count - 4} 
                          </div>
                            <p className="text-sm font-archivo font-medium text-[#475467]">Like this dive</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 relative">
                     <Button className="bg-[#F9FAFB] h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center">
                      <LikeIcon/>
                     </Button>
                     <Button  className="bg-[#F9FAFB] relative h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center">
                      
                      <div className="relative"><MessageIcon2/>
                      <div className="absolute -top-4 -right-3 w-[.875rem] p-3 flex justify-center items-center h-[.875rem] bg-[#F7931D] rounded-full">
                        <p className="font-archivo text-xs font-bold text-white">12</p>
                      </div>
                      </div>
                     </Button>
                     <Button className="bg-[#F9FAFB] h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center">
                      <ShareIcon2/>
                     </Button>
                    </div>
            </div>
          </div>
        ))}
      </div>
        <div className=" border border-[#EAECF0] rounded-lg ">
            <div className="bg-white rounded-lg shadow-sm">
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
                    <div className="relative z-10 flex-shrink-0">
                      <img
                        src={buddy.img}
                        alt={buddy.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
                     
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">{buddy.name}</div>
                      <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < buddy.rating ? "text-orange-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            {buddy.reviews} Reviews
                          </span>
                        </div>
                    </div>
                  </div>
                  <button className="flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 transition-colors p-1 flex-shrink-0">
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
  );
};

export default DiveLogContainer;
