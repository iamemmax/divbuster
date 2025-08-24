"use client";
import { Button } from "@/components/core";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import LikeIcon from "@/app/icons/(dashboard)/LikeIcon";
import MessageIcon2 from "@/app/icons/(dashboard)/MessageIcon2";
import ShareIcon2 from "@/app/icons/(dashboard)/ShareIcon2";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import slugify from "react-slugify";
import PenIcon from "@/app/icons/(dashboard)/PenIcon";
import ColorCheckIcon from "@/app/icons/(dashboard)/ColorCheckIcon";
import CupIcon from "@/app/icons/(dashboard)/CupIcon";
import InfoIcon from "@/app/icons/(dashboard)/InfoIcon";
import BottleIcon from "@/app/icons/(dashboard)/BotleIcon";
import AddIcon from "@/app/icons/(dashboard)/AddIcon";
import ClockIcon from "@/app/icons/(dashboard)/ClockIcon";
import CloudIcon2 from "@/app/icons/(dashboard)/CloudIcon2";
import { useFetchDiveLogs } from "../../api/div-logs/fetchDivLogs";
import moment from "moment";
import PrivateIcon from "@/app/icons/(dashboard)/PrivateIcon";
import EyeIcon from "@/app/icons/EyeIcon";
import { useFetchCountry } from "../../api/fetchCountry";
import { LocationDisplay } from "@/utils/GetLocationFromCordinate";
import { SmallSpinner } from "@/icons/core";
import { useAuth } from "@/contexts/authentication";
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

const buddies = [
  {
    name: "Phoenix Baker",
    rating: 4,
    reviews: 22,
    avatar: "PB",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Lana Steiner",
    rating: 5,
    reviews: 29,
    avatar: "LS",
    color: "bg-green-100 text-green-700",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
  {
    name: "Demi Wilkinson",
    rating: 4,
    reviews: 22,
    avatar: "DW",
    color: "bg-blue-100 text-blue-700",
    img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=40&h=40&fit=crop&crop=face",
  },
  {
    name: "Candice Wu",
    rating: 4,
    reviews: 22,
    avatar: "CW",
    color: "bg-pink-100 text-pink-700",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    name: "Natali Craig",
    rating: 4,
    reviews: 22,
    avatar: "NC",
    color: "bg-yellow-100 text-yellow-700",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
  },
  {
    name: "Orlando Diggs",
    rating: 4,
    reviews: 22,
    avatar: "OD",
    color: "bg-indigo-100 text-indigo-700",
    img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=80&h=80&fit=crop",
  },
];

interface Prop {
  data_type?: string;
  date_from?: string;
  date_to?: string;
}
const DiveLogContainer = ({ data_type, date_from, date_to }: Prop) => {
  const { authState } = useAuth();
  const { user } = authState;
  const { data: fetchCountry } = useFetchCountry();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const [selectedVisibility, setSelectedVisibility] =
    useState<string>("public");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const visibilityOptions: VisibilityOption[] = [
    {
      value: "public",
      label: "Public",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ),
      color: "green",
    },
    {
      value: "private",
      label: "Private",
      icon: <PrivateIcon />,
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

  const handleToggle = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };
const handleSelect = ({ id, option }: { id: string | number; option: VisibilityOption }) => {
    setSelectedVisibility(option.value);
    setOpenDropdownId(null); // close dropdown after selection
    console.log(`Item ${id} set to ${option.value}`);
  };


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useFetchDiveLogs({
      data_type,
      date_from,
      date_to,
    });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 && // near bottom
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  const getCountry = (id: number) => {
    const filterCountry = fetchCountry?.results?.find((con) => con?.id === id);
    return filterCountry;
  };

  return (
    <div className="mt-[13rem] 2xl:mt-[1.125rem]  py-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 w-full">
      {isLoading ? (
        <div className="flex justify-center items-center py-5">
          <SmallSpinner color="#F7931D" />
        </div>
      ) : (
        <div className="space-y-6 ">
          {data?.pages.flatMap((items, idx: number) =>
            items?.results?.map((item) => (
              <div
                className="bg-white rounded-lg border border-[#EAECF0] cursor-pointer p-[1.875rem] px-4 md:px-[2.2813rem]"
                key={idx}
               
              >
                <div className="flex items-center justify-between w-full  mb-6">
                  <div className="flex items-start space-x-4 w-full">
                    <div className="relative shrink-0 md:h-[60px]  md:w-[60px] h-[40px] w-[40px] rounded-full">
                      <Image
                        src={
                          (user?.profile_details?.profile_picture as string) ??
                          "/"
                        }
                        alt="img"
                        fill
                        className="object-cover rounded-full" // or object-contain, depending on your desired behavior
                      />
                    </div>
                    <div className=" flex items-start w-full  justify-between">
                      <div className="flex flex-col flex-1"  onClick={() => router.push(`/div-log/${slugify(item?.id)}`)}>
                        <h2 className="text-sm md:text-lg font-medium text-[#1F2C37] font-archivo">
                          {item?.name}
                        </h2>
                        <p className="text-[#78828A] font-archivo font-medium text-xxs md:text-sm py-2">
                          {moment(item?.dive_plan?.created_on).format(
                            "dddd, MMMM D, YYYY"
                          )}
                          <span className="px-2"> • </span>
                          {moment(item?.dive_plan?.created_on).format(
                            "hh:mm A"
                          )}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <h2 className="text-sm md:text-xl font-archivo font-medium text-[#132346]">
                            {item?.dive_plan?.dive_site?.title}
                          </h2>
                          <PenIcon />
                        </div>
                      </div>

                    

<div className="relative" ref={dropdownRef}>
  <button
    onClick={() => handleToggle(String(item.id))}
    className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${getColorClasses(currentOption.color).bg} ${getColorClasses(currentOption.color).border}`}
    aria-expanded={openDropdownId === String(item.id)}
    aria-haspopup="true"
  >
    <div className={getColorClasses(currentOption?.color).icon}>
      {currentOption?.icon}
    </div>
    <span
      className={`font-medium text-sm font-archivo ${getColorClasses(
        currentOption?.color
      ).text}`}
    >
      {currentOption?.label}
    </span>
    <div
      className={`${getColorClasses(currentOption?.color).icon} transition-transform ${
        openDropdownId === String(item.id) ? "rotate-180" : ""
      }`}
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
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </button>

  {openDropdownId === String(item.id) && (
    <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
      {visibilityOptions.map((option: VisibilityOption) => (
        <button
          key={option.value}
          defaultValue={
            item?.dive_plan?.dive_site?.public_site ? "public" : "private"
          }
          onClick={() => handleSelect({ id: item?.id, option })}
          className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
            selectedVisibility === option.value ? "bg-gray-50" : ""
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

<div className="w-full"  onClick={() => router.push(`/div-log/${slugify(item?.id)}`)}>

                <div
                  className="relative rounded-lg overflow-hidden mt-6"
                  style={{ height: "15.6875rem" }}
                >
                  {/* Satellite/Map Background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={
                      {
                        // backgroundImage: `url(${item.location.backgroundImage})`,
                      }
                    }
                  ></div>

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                  {/* Coordinates Overlay */}
                  <div className="absolute top-2 left-4 text-white py-4 px-6 md:px-[2.75rem] w-full">
                    <div className="flex justify-end max-md:pr-2 items-center w-full">
                      <Button className="bg-white px-[1.0688rem] py-[.5206rem] rounded-2xl text-[#F7931D] text-xs md:text-sm font-medium flex items-center gap-[.3125rem]">
                        <ColorCheckIcon />
                        {/* {item.post.status} */}
                      </Button>
                    </div>
                    <div className="">
                      <div className="flex items-center flex-wrap gap-[10px]">
                        <div className="relative h-[40px] rounded w-[52px]">
                          <div className="relative h-[40px] rounded w-[52px]">
                            <Image
                              src={`https://flagcdn.com/${getCountry(item?.dive_plan?.dive_site?.country)?.alpha2code?.toLowerCase()}.svg`}
                              alt="img"
                              fill
                              className="object-cover rounded" // or object-contain, depending on your desired behavior
                            />

                            <img
                              src={`https://flagcdn.com/${getCountry(item?.dive_plan?.dive_site?.country)?.alpha2code?.toLowerCase()}.svg`}
                              alt={`${getCountry(item?.id)?.name} flag`}
                              className="w-5 h-5 rounded-sm object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-[10px]">
                          <p className="text-white font-archivo font-semibold text-xs md:text-lg">
                            {item?.dive_plan?.meet_up_address}
                          </p>
                          <div className="flex items-center bg-[#C5EFFF] max-w-[100px] justify-center gap-[.3531rem] py-1 px-[.4063rem] rounded-10 ">
                            <CupIcon />
                            <p className="font-archivo text-xxs text-[#132346] font-semibold">
                              Rank:{item?.dive_plan?.dive_site?.ranking}
                            </p>
                          </div>
                          <InfoIcon />
                        </div>
                      </div>
                      <h2 className="font-semibold py-3 text-sm md:text-base lg:text-[1.875rem] font-archivo text-white">
                        {/* {item.location.city}, {item.location.region} */}
                        <LocationDisplay
                          lat={item?.dive_plan?.dive_site?.lag as string}
                          lon={item?.dive_plan?.dive_site?.lon as string}
                          fallback="Location unavailable"
                          showTime={false}
                          timeFormat="relative"
                        />
                      </h2>
                      <div className="flex gap-x-2 py-3 items-center">
                        {item?.dive_plan?.dive_site?.site_type
                          ?.split(",")
                          .map((tag, idx) => (
                            <div
                              key={idx}
                              className="px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] text-[#175CD3] cursor-pointer"
                            >
                              {tag?.trim()}
                            </div>
                          ))}
                      </div>

                      <div className="py-2">
                        <p className="text-xs text-[#F7F7F7] md:text-base font-archivo ">
                          Latitude:{" "}
                          <span className="font-semibold">
                            {item?.dive_plan?.latitude}{" "}
                          </span>{" "}
                          <span className="px-2">•</span> Longitude:{" "}
                          <span className="font-semibold">
                            {item?.dive_plan.longitude}
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
                      <CloudIcon2 />
                    </div>
                    <div className="">
                      <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                        Max Depth{" "}
                      </p>
                      <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                        {item?.dive_plan?.dive_site?.max_depth}
                      </p>
                      <p className="font-archivo font-semibold text-sm md:text-xl text-[#F7931D]">
                        {/* {item?.stats?.maxDepth?.imperial} */}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-x-4 items-start">
                    <div className="">
                      <ClockIcon />
                    </div>
                    <div className="">
                      <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                        Bottom Time{" "}
                      </p>
                      <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                        {item?.bottom_time}
                      </p>
                      {/* <p  className="font-archivo font-semibold text-sm md:text-xl text-[#F7931D]">{item?.stats?.bottomTime?.duration}</p> */}
                    </div>
                  </div>
                  <div className="flex gap-x-4 items-start">
                    <div className="">
                      <BottleIcon />
                    </div>
                    <div className="">
                      <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                        Pressure Used{" "}
                      </p>
                      <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346]">
                        {item?.average_pressure_of_oxygen}
                      </p>
                      <p className="font-archivo font-semibold text-sm md:text-xl text-[#F7931D]">
                        {item?.maximum_pressure_of_oxygen}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between flex-wrap gap-3 items-center">
                  {/* <div className="flex items-center gap-2">
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
                    </div> */}

                  <div className="flex items-center gap-3 relative">
                    {/* <Button className="bg-[#F9FAFB] h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center">
                    <LikeIcon />
                  </Button> */}
                    <Button className="bg-[#F9FAFB] relative h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center">
                      <div className="relative">
                        <LikeIcon />
                        <div className="absolute -top-4 -right-3 w-[.875rem] p-3 flex justify-center items-center h-[.875rem] bg-[#F7931D] rounded-full">
                          <p className="font-archivo text-xs font-bold text-white">
                            {item?.likes ?? 0}
                          </p>
                        </div>
                      </div>
                    </Button>
                    <Button className="bg-[#F9FAFB] relative h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center">
                      <div className="relative">
                        <MessageIcon2 />
                        <div className="absolute -top-4 -right-3 w-[.875rem] p-3 flex justify-center items-center h-[.875rem] bg-[#F7931D] rounded-full">
                          <p className="font-archivo text-xs font-bold text-white">
                            12
                          </p>
                        </div>
                      </div>
                    </Button>
                    <Button className="bg-[#F9FAFB] h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center">
                      <ShareIcon2 />
                    </Button>
                  </div>
                </div>
</div>
              </div>
            ))
          )}
        </div>
      )}
      <div className=" border border-[#EAECF0] rounded-lg ">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold font-archivo text-base text-[#101828]">
              Suggested Buddies
            </h3>
            {/* <p className="text-xs text-[#78828A] font-medium font-archivo">46 Dive Buddies</p> */}
          </div>
          <div className="p-4">
            <div className="">
              {buddies.map((buddy, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-between py-3"
                >
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
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {buddy.name}
                      </div>
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
                    <AddIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex py-3 justify-center items-center w-full">
            <Button
              variant={"outlined"}
              className=" mt-4 text-center text-sm text-gray-600 hover:text-gray-800"
            >
              View more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiveLogContainer;
