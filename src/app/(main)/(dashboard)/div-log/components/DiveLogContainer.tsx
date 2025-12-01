"use client";
import { Button } from "@/components/core";
import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import LikeIcon from "@/app/icons/(dashboard)/LikeIcon";
import MessageIcon2 from "@/app/icons/(dashboard)/MessageIcon2";
import ShareIcon2 from "@/app/icons/(dashboard)/ShareIcon2";
import { useRouter } from "next/navigation";
import slugify from "react-slugify";
import PenIcon from "@/app/icons/(dashboard)/PenIcon";
import CupIcon from "@/app/icons/(dashboard)/CupIcon";
import InfoIcon from "@/app/icons/(dashboard)/InfoIcon";
import BottleIcon from "@/app/icons/(dashboard)/BotleIcon";
import ClockIcon from "@/app/icons/(dashboard)/ClockIcon";
import CloudIcon2 from "@/app/icons/(dashboard)/CloudIcon2";
import moment from "moment";
import PrivateIcon from "@/app/icons/(dashboard)/PrivateIcon";
import { useFetchCountry } from "../../api/fetchCountry";
import { LocationDisplay } from "@/utils/GetLocationFromCordinate";
import { SmallSpinner } from "@/icons/core";
import { useAuth } from "@/contexts/authentication";
import SuggestedBuddies from "../../div-buddies/SuggestedBuddies";
import { useUpdateDiveLogVisibility } from "../../api/div-logs/update/updateDivelogVisibility";
import { Language } from "@/app/(auth)/sign-up/translations";
import { diveLogContainerTranslations } from "@/app/(main)/translation/diveLogTranslation";
import { capitalizeFirstLetter } from "@/utils";
import { useFetchDiveLogs } from "../../api/div-logs/fetchDivLogs";
import { useLanguage } from "@/hooks/useLanguage";
import InfiniteScroll from 'react-infinite-scroll-component';
import DiveLogSkeleton from './DiveLogSkeleton';

export interface VisibilityOption {
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

interface Prop {
  data_type?: string;
  date_from?: string;
  date_to?: string;
}

const DiveLogContainer = ({ data_type, date_from, date_to }: Prop) => {
  const { authState } = useAuth();
  const { user } = authState;
  const { data: fetchCountry } = useFetchCountry();

  // Separate state for each item's visibility and loading state
  const [itemVisibilities, setItemVisibilities] = useState<Record<string, string>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [updatingItems, setUpdatingItems] = useState<string[]>([]);
  const [showBuddies, setShowBuddies] = useState(false);

  const { mutate: updateVisibility } = useUpdateDiveLogVisibility();

  const { language } = useLanguage()
  const t = diveLogContainerTranslations[language] || diveLogContainerTranslations?.en;


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

  const getColorClasses = (color: "green" | "red"): ColorClasses => {
    const colors = {
      green: {
        bg: "bg-[#ECFDF3] dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-700",
        text: "text-[#027A48] dark:text-green-400",
        icon: "text-green-600 dark:text-green-400",
      },
      red: {
        bg: "bg-[#FFDDDD] dark:bg-red-900/20",
        border: "border-red-200 dark:border-red-700",
        text: "text-[#FF0000] dark:text-red-400",
        icon: "text-[#FF0000] dark:text-red-400",
      },
    };
    return colors[color];
  };

  // Memoized function to get current visibility for each item
  const getCurrentVisibility = useCallback((item: any) => {
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



  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isLoading: loading, isFetchingNextPage } =
    useFetchDiveLogs({
      data_type,
      date_from,
      date_to,
    });



  const allDiveLogs = data?.pages?.flatMap((items) => 
    Array.isArray(items?.results) ? items.results : []
  ) || [];

  const fetchMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const getCountry = (id: number) => {
    const filterCountry = fetchCountry?.results?.find((con) => con?.id === id);
    return filterCountry;
  };

  // const handleShare = useCallback((title: string): void => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: `Dive Plan: ${title}`,
  //       text: 'Check out this dive plan!',
  //       url: window.location.href,
  //     }).catch((err) => console.log('Error sharing:', err));
  //   } else {
  //     // Fallback for browsers without Web Share API
  //     navigator.clipboard?.writeText(window.location.href);
  //     // You might want to show a toast notification here
  //     console.log('Link copied to clipboard');
  //   }
  // }, []);



  return (
    <div className="2xl:mt-[1.125rem] py-6 grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-6 w-full ">
      {/* Mobile Buddies Button */}
      <button
        onClick={() => setShowBuddies(!showBuddies)}
        className="xl:hidden fixed bottom-4 right-4 z-50 bg-[#F7931D] text-white p-3 rounded-full shadow-lg hover:bg-[#E8841A] transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.01 3.01 0 0 0 16.96 6c-.8 0-1.54.37-2.01.97L12 10.5 9.05 6.97A3.01 3.01 0 0 0 6.04 6c-1.28 0-2.4.8-2.84 2.01L.66 16H3.5v6h2v-6h2.12l2.88-8.64L12 9.5l1.5-2.14L16.38 16H18.5v6h2zM8 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2z"/>
        </svg>
      </button>
      
      <div className="overflow-y-auto h-full">
        {loading ? (
          <DiveLogSkeleton />
        ) : (
          <InfiniteScroll
            dataLength={allDiveLogs.length}
            next={fetchMore}
            hasMore={hasNextPage || false}
            height={"calc(100vh - 200px)"}
            loader={
              <div className="flex justify-center items-center py-4">
                <SmallSpinner color="#F7931D" />
                <span className="ml-2 text-gray-600">Loading more...</span>
              </div>
            }
            endMessage={
              allDiveLogs.length > 0 ? (
                <div className="flex justify-center items-center py-8">
                  <span className="text-gray-500 text-sm">No more items</span>
                </div>
              ) : null
            }
          >
          <div className="space-y-6">
            {allDiveLogs.map((item, itemIndex) => {
              const itemId = String(item.id);
              const currentVisibility = getCurrentVisibility(item);
              const currentOption =
                visibilityOptions.find(
                  (option) => option.value === currentVisibility
                ) || visibilityOptions[1]; // default to private if not found
              const isItemUpdating = updatingItems.includes(itemId);
              const isDropdownOpen = openDropdownId === itemId;

              return (
                <div
                  className="bg-white dark:bg-gray-800 rounded-lg border border-[#EAECF0] dark:border-gray-700 cursor-pointer p-[1.875rem] max-md:py-4 px-4 md:px-[2.2813rem] transition-colors duration-200"
                  key={`${item.id}-${itemIndex}`}
                >
                  <div className="flex items-center justify-between w-full z-50 mb-4">
                    <div className="flex items-start space-x-4 w-full">
                      {/* Profile section */}
                      <div className="relative shrink-0 md:h-[60px] md:w-[60px] h-[40px] w-[40px] rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        {user?.profile_details?.profile_picture ? (
                          <Image
                            src={user.profile_details.profile_picture}
                            alt="Profile"
                            fill
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-white text-base font-semibold font-archivo">
                            {user?.first_name?.[0]}{user?.last_name?.[0]}
                          </span>
                        )}
                      </div>
                      <div className="flex items-start  gap-y-2 max-md:flex-wrap w-full justify-between">
                        <div
                          className="flex flex-col w-full cursor-pointer"
                          onClick={() => router.push(`/div-log/${slugify(item?.id)}`)}
                        >
                          <h2 className="text-sm md:text-lg font-medium text-[#1F2C37] dark:text-gray-100 font-archivo">
                            {item?.name}
                          </h2>
                          <p className="text-[#78828A] dark:text-gray-400 font-archivo font-medium text-xs md:text-sm py-1">
                            {moment(item?.dive_plan?.created_on).format(
                              "dddd, MMMM D, YYYY"
                            )}
                            <span className="px-2"> • </span>
                            {moment(item?.dive_plan?.created_on).format(
                              "hh:mm A"
                            )}
                          </p>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm md:text-xl font-archivo font-medium text-[#132346] dark:text-gray-100">
                              {item?.dive_plan?.dive_site?.title}
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
                            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer hover:opacity-80 transition-opacity focus:outline-none disabled:opacity-50 ${
                              getColorClasses(currentOption.color).bg
                            } ${getColorClasses(currentOption.color).border}`}
                          >
                            {isItemUpdating ? (
                              <SmallSpinner
                                color={currentOption.color === "green" ? "#027A48" : "#FF0000"}
                              />
                            ) : (
                              <div className={getColorClasses(currentOption.color).icon}>
                                {currentOption.icon}
                              </div>
                            )}
                            <span
                              className={`font-medium text-xs md:text-sm font-archivo ${getColorClasses(
                                currentOption.color
                              ).text}`}
                            >
                              {currentOption.label}
                            </span>
                            <svg
                              width="11"
                              height="7"
                              viewBox="0 0 11 7"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`${getColorClasses(currentOption.color).icon} transition-transform ${
                                isDropdownOpen ? "rotate-180" : ""
                              }`}
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
                                    handleSelect({ id: item.id, option });
                                  }}
                                  className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                    currentVisibility === option.value
                                      ? "bg-gray-50 dark:bg-gray-700"
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
                      
                   

                  {/* Rest of the dive log content */}
                  <div className="w-full" onClick={() => router.push(`/div-log/${slugify(item?.id)}`)}>
                    <div
                      className="relative rounded-lg bg-cover bg-center min-h-[12rem] md:min-h-[17.6875rem] font-archivo overflow-hidden mt-4"
                      style={{  backgroundImage: "url('/images/dashboard/profile-Location.png')" }}
                    >
                      {/* Satellite/Map Background */}
                      <div className="absolute inset-0 bg-cover bg-center"></div>

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60"></div>

                      {/* Coordinates Overlay */}
                      <div className="absolute top-2 left-4 max-md:left-2 text-white  md:py-4 px-3 md:px-[2.75rem] w-full">
                        
                        <div className="">
                          <div className="flex items-center flex-wrap gap-[5px] xl:gap-[20px]">

                            <div className="flex items-center flex-wrap gap-[10px] xl:gap-[20px] pr-3">
                            <div className="relative h-[30px] w-[42px] md:h-[40px] rounded md:w-[52px]">
                              <Image
                                src={`https://flagcdn.com/${getCountry(item?.dive_plan?.dive_site?.country)?.alpha2code?.toLowerCase()}.svg`}
                                alt="img"
                                fill
                                className="object-cover rounded"
                              />

                              <img
                                src={`https://flagcdn.com/${getCountry(item?.dive_plan?.dive_site?.country)?.alpha2code?.toLowerCase()}.svg`}
                                alt={`${getCountry(item?.id)?.name} flag`}
                                className="w-5 h-5 rounded-sm object-cover"
                              />
                            </div>
                              <p className="text-white font-archivo max-w-[220px]  md:max-w-[600px] font-semibold text-xxs md:text-base 2xl:text-xl">
                                {item?.dive_plan?.meet_up_address}
                              </p>
                              <div className="flex items-center bg-[#C5EFFF] dark:bg-blue-900/50 max-w-[100px] justify-center gap-[.3531rem] py-1 px-[.4063rem] rounded-10">
                                <CupIcon className="dark:text-white"/>
                                <p className="font-archivo text-xxs text-[#132346] dark:text-blue-100 font-semibold">
                                  {t?.rank}:{item?.dive_plan?.dive_site?.ranking}
                                </p>
                              </div>
                              <InfoIcon className="max-sm:hidden" />
                            </div>
                          </div>
                          <h2 className="font-semibold py-3 text-[1.5rem] lg:text-[1.875rem] font-archivo text-white">
                            <LocationDisplay
                              lat={item?.dive_plan?.dive_site?.lag as string}
                              lon={item?.dive_plan?.dive_site?.lon as string}
                              // fallback={t?.locationUnavailable}
                              fallback={"Bonaire, Caribbean Netherlands."}
                              className="lg:text-[1.7rem] max-sm:!text-[1.3rem] !text-[1.5rem] font-archivo  leading-7"
                            // showTime={false}
                            // timeFormat="relative"
                            />
                          </h2>
                          <div className="flex gap-x-2 py-1 items-center">
                            {item?.dive_plan?.dive_site?.site_type
                              ?.split(",")
                              .map((tag, idx) => (
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
                              {t?.latitude}:{" "}
                              <span className="font-semibold">
                                {item?.dive_plan?.latitude}{" "}
                              </span>{" "}
                              <span className="px-2">•</span> {t?.longitude}:{" "}
                              <span className="font-semibold">
                                {item?.dive_plan.longitude}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4  py-5 pb-0">
                      <div className="flex gap-x-4 items-start">
                        <div className="">
                          <CloudIcon2 />
                        </div>
                        <div className="">
                          <p className="font-archivo font-semibold text-sm xl:text-xl text-[#132346] dark:text-gray-100">
                            {t?.maxDepth}{" "}
                          </p>
                          <p className="font-archivo font-semibold text-sm xl:text-xl text-[#132346] dark:text-gray-100">
                            {item?.dive_plan?.dive_site?.max_depth}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-x-4 items-start">
                        <div className="">
                          <ClockIcon className="dark:text-white" />
                        </div>
                        <div className="">
                          <p className="font-archivo font-semibold text-sm xl:text-xl text-[#132346] dark:text-gray-100">
                            {t?.bottomTime}{" "}
                          </p>
                          <p className="font-archivo font-semibold text-sm xl:text-xl text-[#132346] dark:text-gray-100">
                            {item?.bottom_time}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-x-4 items-start">
                        <div className="">
                          <BottleIcon />
                        </div>
                        <div className="">
                          <p className="font-archivo font-semibold text-sm xl:text-xl text-[#132346] dark:text-gray-100">
                            {t?.pressureUsed}{" "}
                          </p>
                          <p className="font-archivo font-semibold text-sm xl:text-xl text-[#132346] dark:text-gray-100">
                            {item?.average_pressure_of_oxygen}
                          </p>
                          <p className="font-archivo font-semibold text-sm xl:text-xl text-[#F7931D]">
                            {item?.maximum_pressure_of_oxygen}
                          </p>
                        </div>
                      </div>
                    </div>
{/* social icons */}
                    {/* <div className=" flex mt-1  justify-between flex-wrap gap-3 items-center">
                      <div className="flex items-center gap-3 relative">
                        <Button className="bg-[#F9FAFB] dark:bg-gray-700 relative h-[2.8125rem] w-[3.75rem] px-[1.125rem] md:py-[.625rem] rounded-xl flex justify-center items-center border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                          <div className="relative">
                            <LikeIcon />
                            <div className="absolute -top-4 -right-3 w-[.875rem] p-3 flex justify-center items-center h-[.875rem] bg-[#F7931D] rounded-full">
                              <p className="font-archivo text-xs font-bold text-white">
                                {item?.likes ?? 0}
                              </p>
                            </div>
                          </div>
                        </Button>
                        <Button className="bg-[#F9FAFB] dark:bg-gray-700 relative h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                          <div className="relative">
                            <MessageIcon2 />
                            <div className="absolute -top-4 -right-3 w-[.875rem] p-3 flex justify-center items-center h-[.875rem] bg-[#F7931D] rounded-full">
                              <p className="font-archivo text-xs font-bold text-white">
                                12
                              </p>
                            </div>
                          </div>
                        </Button>
                        <Button className="bg-[#F9FAFB] dark:bg-gray-700 h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200" onClick={() => handleShare('Dive Log')}>
                          <ShareIcon2 />
                        </Button>
                      </div>
                    </div> */}
                  </div>
                </div>
              );
            })}
          </div>
          </InfiniteScroll>
        )}
      </div>
      <div className={`w-full rounded-lg overflow-y-auto h-full ${showBuddies ? 'xl:block' : 'hidden xl:block'}`}>
        <SuggestedBuddies />
      </div>
      
      {/* Mobile Buddies Modal */}
      {showBuddies && (
        <div className="xl:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setShowBuddies(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-lg max-h-[70vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-archivo">Suggested Buddies</h3>
              <button 
                onClick={() => setShowBuddies(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M12.854 4.854a.5.5 0 0 0-.708-.708L8 8.293 3.854 4.146a.5.5 0 1 0-.708.708L7.293 9l-4.147 4.146a.5.5 0 0 0 .708.708L8 9.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 9l4.147-4.146z"/>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(70vh-80px)]">
              <SuggestedBuddies />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiveLogContainer;