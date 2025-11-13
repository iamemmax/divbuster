"use client"
import Header from '@/app/(main)/components/shared/Header'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useState, useRef } from 'react'

import Image from 'next/image'
import { Button } from '@/components/core'
import DiveTimeChart from '../components/TimeChart'
import ThreeDot from '@/app/icons/(dashboard)/ThreeDot'
import { CylinderIcon } from '@/app/icons/(dashboard)/CylinderIcon'
import DiveLogCharts from '../components/DiveLogCharts'
import SingleDIveLogSidebar from '../components/SingleDiveLogSidebar'
import { usefetchSingleDivLog } from '../../api/div-logs/fetchSingleDivLog'
import { useAuth } from '@/contexts/authentication'
import moment from 'moment'
import { useFetchCountry } from '../../api/fetchCountry'
import { LocationDisplay } from '@/utils/GetLocationFromCordinate'
import { SmallSpinner } from '@/icons/core'
import PenIcon from '@/app/icons/(dashboard)/PenIcon'
import ColorCheckIcon from '@/app/icons/(dashboard)/ColorCheckIcon'
import CupIcon from '@/app/icons/(dashboard)/CupIcon'
import InfoIcon from '@/app/icons/(dashboard)/InfoIcon'
import { Language } from '@/app/(auth)/sign-up/translations'
import { DiveLogDetailsTranslations } from '@/app/(main)/translation/diveLogTranslation'
import { useLanguage } from '@/hooks/useLanguage'
import { VisibilityOption } from '../components/DiveLogContainer'
import { capitalizeFirstLetter } from '@/utils'
import PrivateIcon from '@/app/icons/(dashboard)/PrivateIcon'
import { useUpdateDiveLogVisibility } from '../../api/div-logs/update/updateDivelogVisibility'
import DiveLogDetailsSkeleton from '../components/DiveLogDetailsSkeleton'

const DiveLogId = () => {
  const params = useParams()
  const { authState } = useAuth();
  const { user } = authState;
  const { data: fetchCountry } = useFetchCountry();
  const { data, isLoading } = usefetchSingleDivLog(params?.id as string)
  const { mutate: updateVisibility } = useUpdateDiveLogVisibility();
  const { language } = useLanguage()
  const t = DiveLogDetailsTranslations[language] || DiveLogDetailsTranslations?.en;

  // Add missing state declarations
  const [itemVisibilities, setItemVisibilities] = useState<Record<string, string>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [updatingItems, setUpdatingItems] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Add the getColorClasses function
  const getColorClasses = (color: string) => {
    if (color === "green") {
      return {
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-700",
        text: "text-green-700 dark:text-green-300",
        icon: "text-green-600 dark:text-green-400"
      };
    }
    return {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-700",
      text: "text-red-700 dark:text-red-300",
      icon: "text-red-600 dark:text-red-400"
    };
  };

  const metrics = [
    { label: t?.metrics?.diveTime, value: `${data?.data?.bottom_time}` },
    { label: t?.metrics?.air, value: t?.labels?.gas },
    { label: t?.metrics?.avgDepth, value: `${data?.data?.dive_depth}` },
    { label: t?.metrics?.maxDepth, value: `${data?.data?.dive_plan?.dive_site?.max_depth}` },
    { label: t?.metrics?.water, value: data?.data?.dive_plan?.dive_site?.water_type ?? "" }
  ];

  const visibilityOptions: VisibilityOption[] = [
    {
      value: "public",
      label: capitalizeFirstLetter(t?.public || "Public"),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ),
      color: "green",
    },
    {
      value: "private",
      label: capitalizeFirstLetter(t?.private || "Private"),
      icon: <PrivateIcon />,
      color: "red",
    },
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

  const getCountry = (id: number) => {
    const filterCountry = fetchCountry?.results?.find((con) => con?.id === id);
    return filterCountry;
  };

  const getCurrentVisibility = useCallback((item: any) => {
    if (!item) return "private";
    const itemId = String(item.id);
    // Check local state first, then fall back to server data
    const localVisibility = itemVisibilities[itemId];
    const serverVisibility = item?.public ? "public" : "private";

    if (localVisibility) return localVisibility;

    // Return standardized values: "public" or "private"
    return serverVisibility;
  }, [itemVisibilities]);

  const handleToggle = useCallback((id: string) => {
    setOpenDropdownId(prevId => prevId === id ? null : id);
  }, []);

  const handleSelect = useCallback(
    ({ id, option }: { id: string | number; option: VisibilityOption }) => {
      const itemId = String(id);
      setUpdatingItems((prev) => [...prev, itemId]);
      setItemVisibilities((prev) => ({ ...prev, [itemId]: option.value }));
      setOpenDropdownId(null);
console.log(itemId);

      updateVisibility(
        { id: itemId, isPublic: option.value === "public" },
        {
          onSuccess: () => {
            setUpdatingItems((prev) => prev.filter((x) => x !== itemId));
          },
          onError: () => {
            setItemVisibilities((prev) => {
              const updated = { ...prev };
              delete updated[itemId];
              return updated;
            });
            setUpdatingItems((prev) => prev.filter((x) => x !== itemId));
          },
        }
      );
    },
    [updateVisibility]
  );

  // Handle outside click for all dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Define variables for visibility dropdown (fixed to use data?.data)
  const itemId = data?.data?.id ? String(data.data.id) : '';
  const currentVisibility = getCurrentVisibility(data?.data);
  const currentOption = visibilityOptions.find(opt => opt.value === currentVisibility) || visibilityOptions[0];
  const isDropdownOpen = openDropdownId === itemId;
  const isItemUpdating = updatingItems.includes(itemId);

  return (
    <div className="text-black dark:text-white">
      <Header
        title={t?.title}
        subtitle=""
      />

      {isLoading ? (
        <DiveLogDetailsSkeleton />
      ) : (
        <div className="md:px-[1.875rem] h-[83vh]">
          {/* Mobile sidebar toggle button */}
          <div className="xl:hidden mb-4">
            <Button
              onClick={() => {
                setShowSidebar(!showSidebar);
                if (!showSidebar && sidebarRef.current && mainContainerRef.current) {
                  const mainScrollTop = mainContainerRef.current.scrollTop;
                  setTimeout(() => sidebarRef.current?.scrollTo(0, mainScrollTop), 0);
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 mt-3 rounded-lg font-medium text-sm"
            >
              {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
            </Button>
          </div>

          <div className={`2xl:mt-[1.125rem] py-6 grid gap-6 w-full h-full ${showSidebar ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-[3fr_1fr]'}`}>
            {/* Main content with independent scroll */}
            <div ref={mainContainerRef} className={`overflow-y-auto h-full ${showSidebar ? 'hidden xl:block' : ''}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-[#EAECF0] dark:border-gray-700 cursor-pointer p-[1.875rem] px-4 md:px-[2.2813rem]">
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="flex items-start space-x-4 w-full">
                    <div className="relative shrink-0 md:h-[60px] md:w-[60px] h-[40px] w-[40px] rounded-full">
                      {user?.profile_details?.profile_picture ? (
                        <Image
                          src={(user?.profile_details?.profile_picture as string) ?? "/"}
                          alt="img"
                          fill
                          className="object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-[#fff] text-base font-semibold font-archivo">
                          {user?.first_name[0]}{user?.last_name[0]}
                        </span>
                      )}
                    </div>
                    <div className=" flex items-start w-full  justify-between">
                      <div className="flex flex-col flex-1">
                        <h2 className="text-sm md:text-lg font-medium text-[#1F2C37] dark:text-white font-archivo">
                          {data?.data?.name}
                        </h2>
                        <p className="text-[#78828A] dark:text-gray-400 font-archivo font-medium text-xxs md:text-sm py-2">
                          {moment(data?.data?.dive_plan?.created_on).format("dddd, MMMM D, YYYY")}
                          <span className="px-2"> • </span>
                          {moment(data?.data?.dive_plan?.created_on).format("hh:mm A")}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <h2 className="text-sm md:text-xl font-archivo font-medium text-[#132346] dark:text-gray-200">
                            {data?.data?.dive_plan?.dive_site?.title}
                          </h2>
                          <PenIcon />
                        </div>
                      </div>

                      {/* Visibility Dropdown */}
                      <div className="relative" data-dropdown>
                        <button
                          data-dropdown
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(itemId);
                          }}
                          disabled={isItemUpdating}
                          className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer hover:opacity-80 transition-opacity focus:outline-none disabled:opacity-50 ${getColorClasses(currentOption.color).bg} ${getColorClasses(currentOption.color).border}`}
                        >
                          {isItemUpdating ? (
                            <SmallSpinner color={currentOption.color === "green" ? "#027A48" : "#FF0000"} />
                          ) : (
                            <div className={getColorClasses(currentOption.color).icon}>
                              {currentOption.icon}
                            </div>
                          )}
                          <span className={`font-medium text-xs md:text-sm font-archivo ${getColorClasses(currentOption.color).text}`}>
                            {currentOption.label}
                          </span>
                          <svg
                            width="11"
                            height="7"
                            viewBox="0 0 11 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${getColorClasses(currentOption.color).icon} transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                          >
                            <path
                              d="M1 1.25L5.5 5.75L10 1.25"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {isDropdownOpen && !isItemUpdating && (
                          <div className="absolute top-full -left-3 mt-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg py-1 z-50">
                            {visibilityOptions.map((option) => (
                              <button
                                key={option.value}
                                data-dropdown
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelect({ id: Number(data?.data?.id), option });
                                }}
                                className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 ${currentVisibility === option.value ? "bg-gray-50 dark:bg-gray-700" : ""}`}
                              >
                                <div className={getColorClasses(option.color).icon}>
                                  {option.icon}
                                </div>
                                <span className={`font-medium ${getColorClasses(option.color).text}`}>
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
                  className="relative rounded-lg bg-cover bg-center font-archivo overflow-hidden mt-4"
                  style={{ minHeight: "17.6875rem", backgroundImage: "url('/images/dashboard/profile-Location.png')" }}
                >
                  {/* Satellite/Map Background */}
                  <div className="absolute inset-0 bg-cover bg-center"></div>

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60"></div>

                  {/* Coordinates Overlay */}
                  <div className="absolute top-2 left-4 max-md:left-2 text-white  md:py-4 px-3 md:px-[2.75rem] w-full">
                    <div className="flex justify-end max-md:pr-2 items-center w-full">
                      <Button className="bg-transparent border-none py-[.5206rem] rounded-2xl text-[#F7931D] dark:text-[#F7931D] text-xs md:text-sm font-medium flex items-center gap-[.3125rem] border dark:border-gray-600">
                        {/* <ColorCheckIcon /> */}
                      </Button>
                    </div>
                    <div className="">
                      <div className="flex items-center flex-wrap gap-[5px] xl:gap-[20px]">
                        <div className="flex items-center flex-wrap gap-[10px] xl:gap-[20px] pr-3">
                          <div className="relative h-[30px] w-[42px] md:h-[40px] rounded md:w-[52px]">
                            <Image
                              src={`https://flagcdn.com/${getCountry(Number(data?.data?.dive_plan?.dive_site?.country))?.alpha2code?.toLowerCase()}.svg`}
                              alt="img"
                              fill
                              className="object-cover rounded"
                            />

                            <img
                              src={`https://flagcdn.com/${getCountry(Number(data?.data?.dive_plan?.dive_site?.country))?.alpha2code?.toLowerCase()}.svg`}
                              alt={`${getCountry(Number(data?.data?.id))?.name} flag`}
                              className="w-5 h-5 rounded-sm object-cover"
                            />
                          </div>
                          <p className="text-white font-archivo max-w-[220px]  md:max-w-[600px] font-semibold text-xxs md:text-base 2xl:text-xl">
                            {data?.data?.dive_plan?.meet_up_address}
                          </p>
                          <div className="flex items-center bg-[#C5EFFF] dark:bg-blue-900/50 max-w-[100px] justify-center gap-[.3531rem] py-1 px-[.4063rem] rounded-10">
                            <CupIcon className="dark:text-white" />
                            <p className="font-archivo text-xxs text-[#132346] dark:text-blue-100 font-semibold">
                              {t?.labels.rank}:{data?.data?.dive_plan?.dive_site?.ranking}
                            </p>
                          </div>
                          <InfoIcon className="max-sm:hidden" />
                        </div>
                      </div>
                      <h2 className="font-semibold py-3 text-[1.5rem] lg:text-[1.875rem] font-archivo text-white">
                        <LocationDisplay
                          lat={data?.data?.dive_plan?.dive_site?.lag as string}
                          lon={data?.data?.dive_plan?.dive_site?.lon as string}
                          fallback={"Bonaire, Caribbean Netherlands."}
                          className="lg:text-[1.7rem] max-sm:!text-[1.3rem] !text-[1.5rem] font-archivo  leading-7"
                        />
                      </h2>
                      <div className="flex gap-x-2 py-1 items-center">
                        {data?.data?.dive_plan?.dive_site?.site_type?.split(",").map((tag, idx) => (
                          <div
                            key={idx}
                            className="px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] dark:bg-blue-900/30 text-[#175CD3] dark:text-blue-200 cursor-pointer border dark:border-blue-700"
                          >
                            {tag?.trim()}
                          </div>
                        ))}
                      </div>

                      <div className="py-2">
                        <p className="text-xs text-[#F7F7F7] dark:text-gray-300 md:text-base font-archivo">
                          {t?.labels.latitude}:{" "}
                          <span className="font-semibold">{data?.data?.dive_plan?.latitude} </span>{" "}
                          <span className="px-2">•</span> {t?.labels?.pressureUsed}:{" "}
                          <span className="font-semibold">{data?.data?.dive_plan.longitude}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className=" divide-x grid grid-cols-2 sm:grid-cols-3 gap-5 lg:grid-cols-5 py-4 px-4 md:px-8 divide-gray-200 dark:divide-gray-600 border border-[#EAECF0] dark:border-gray-700 rounded-lg mt-5">
                  {metrics.map((metric, index) => (
                    <div key={index} className="flex-1 px-4 first:pl-8 last:pr-8">
                      <div className="text-gray-400 dark:text-gray-500 text-base font-normal mb-4">
                        {metric.label}
                      </div>
                      <div className="text-[#101828] dark:text-white font-archivo text-base md:text-xl font-bold leading-none">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                <DiveTimeChart data={data} />

                <div className="border border-[#EAECF0] dark:border-gray-700 rounded-lg mt-[1.875rem] w-full p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-[#101828] dark:text-white font-archivo">
                      {t?.buttons?.airUsage}
                    </h3>
                    <Button className="bg-transparent p-0 rounded-2xl text-[#F7931D] dark:text-orange-400 text-sm font-medium ">
                      <ThreeDot />
                    </Button>
                  </div>

                  <div className=" w-full mt-2">
                    {cylinderData.map((cylinder) => (
                      <div className="w-full grid grid-cols-[3fr_1fr]" key={cylinder?.id}>
                        <div className="bg-[#fef6f4] dark:bg-gray-700 rounded-s-[1.25rem] py-[1.1875rem] px-5 lg:px-[2.3125rem] grid grid-cols-[1fr_3fr_3fr] gap-3 lg:gap-9">
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
                              <p className="text-xs lg:text-sm font-archivo text-[#132346] dark:text-gray-300 font-medium py-1">
                                {t?.labels?.startPressure}
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346] dark:text-white">
                                {" "}
                                {cylinder.startPressure.bar} bar
                              </h3>
                              <p className="font-archivo font-medium text-[#132346] dark:text-gray-300 text-sm">
                                {cylinder?.startPressure?.psi}
                              </p>
                            </div>
                            <div className="">
                              <p className="text-xs lg:text-sm font-archivo text-[#132346] dark:text-gray-300 font-medium py-1">
                                {t?.labels?.cylinderType}
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346] dark:text-white">
                                {" "}
                                {cylinder.cylinderType} bar
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-col gap-5 justify-between">
                            <div className="">
                              <p className="text-xs lg:text-sm font-archivo text-[#132346] dark:text-gray-300 font-medium py-1">
                                {t?.labels?.endPressure}
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346] dark:text-white">
                                {" "}
                                {cylinder.endPressure.bar} Bar
                              </h3>
                              <p className="font-archivo font-medium text-[#132346] dark:text-gray-300 text-sm">
                                {cylinder?.endPressure?.psi}
                              </p>
                            </div>
                            <div className="">
                              <p className="text-xs lg:text-sm font-archivo text-[#132346] dark:text-gray-300 font-medium py-1">
                                {t?.labels?.gas}
                              </p>
                              <h3 className="font-archivo font-semibold text-base lg:text-xl text-[#132346] dark:text-white">
                                {" "}
                                {cylinder.gas}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="w-full rounded-e-[1.25rem] bg-[#E4881C] dark:bg-orange-600 flex flex-col gap-5 justify-center items-center py-[2.125rem] px-5 lg:px-[2.3125rem]">
                          <div className="">
                            <p className="text-xs lg:text-sm font-archivo text-white font-medium py-1">
                              {t?.labels?.pressureUsed}
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

                <DiveLogCharts user={user} data={data} />
              </div>
            </div>

            {/* Sidebar with independent scroll */}
            <div ref={sidebarRef} className={`${showSidebar ? 'block' : 'hidden'} xl:block overflow-y-auto h-full`}>
              <SingleDIveLogSidebar data={data} user={user} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DiveLogId