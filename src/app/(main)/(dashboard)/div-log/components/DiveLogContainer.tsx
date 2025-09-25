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
import ColorCheckIcon from "@/app/icons/(dashboard)/ColorCheckIcon";
import CupIcon from "@/app/icons/(dashboard)/CupIcon";
import InfoIcon from "@/app/icons/(dashboard)/InfoIcon";
import BottleIcon from "@/app/icons/(dashboard)/BotleIcon";
import ClockIcon from "@/app/icons/(dashboard)/ClockIcon";
import CloudIcon2 from "@/app/icons/(dashboard)/CloudIcon2";
import moment from "moment";
import PrivateIcon from "@/app/icons/(dashboard)/PrivateIcon";
import EyeIcon from "@/app/icons/EyeIcon";
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
  
  const { mutate: updateVisibility } = useUpdateDiveLogVisibility();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const {language}= useLanguage()
  const t = diveLogContainerTranslations[language] || diveLogContainerTranslations?.en;
  
  // Debug translations
  console.log('Translations:', { language, t: { public: t?.public, private: t?.private } });
 
  const visibilityOptions: VisibilityOption[] = [
    {
      value: t?.public,
      label: capitalizeFirstLetter(t?.public),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ),
      color: "green",
    },
    {
      value: t?.private,
      label: capitalizeFirstLetter(t?.private),
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
    
    // Debug logging
    console.log('getCurrentVisibility for item:', itemId, {
      localVisibility,
      itemPublic: item?.public,
      translationsPublic: t?.public,
      translationsPrivate: t?.private
    });
    
    if (localVisibility) return localVisibility;
    
    // Return standardized values: "public" or "private"
    return item?.public ? "public" : "private";
  }, [itemVisibilities, t?.public, t?.private]);

  const handleToggle = useCallback((id: string) => {
    setOpenDropdownId(prevId => prevId === id ? null : id);
  }, []);

  const handleSelect = useCallback(({ id, option }: { id: string | number; option: VisibilityOption }) => {
    const itemId = String(id);
    
    console.log('handleSelect called:', { itemId, optionValue: option.value, optionLabel: option.label });
    
    // Add item to updating array
    setUpdatingItems(prev => [...prev, itemId]);
    
    // Update local state immediately for optimistic UI
    setItemVisibilities(prev => {
      const updated = { ...prev, [itemId]: option.value };
      console.log('Updated itemVisibilities:', updated);
      return updated;
    });
    
    // Close dropdown
    setOpenDropdownId(null);
    
    // Make API call to update visibility
    updateVisibility({
      id: itemId,
      isPublic: option.value === "public"
    }, {
      onSuccess: () => {
        console.log('API call successful for item:', itemId);
        // Remove item from updating array on success
        setUpdatingItems(prev => prev.filter(id => id !== itemId));
      },
      onError: (error) => {
        console.error('API call failed for item:', itemId, error);
        // Revert local state on error
        setItemVisibilities(prev => {
          const updated = { ...prev };
          delete updated[itemId];
          console.log('Reverted itemVisibilities:', updated);
          return updated;
        });
        
        // Remove item from updating array
        setUpdatingItems(prev => prev.filter(id => id !== itemId));
        
        console.error('Error updating visibility:', error);
      }
    });
  }, [updateVisibility, t?.public]);

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

   const handleShare = useCallback((title: string): void => {
      if (navigator.share) {
        navigator.share({
          title: `Dive Plan: ${title}`,
          text: 'Check out this dive plan!',
          url: window.location.href,
        }).catch((err) => console.log('Error sharing:', err));
      } else {
        // Fallback for browsers without Web Share API
        navigator.clipboard?.writeText(window.location.href);
        // You might want to show a toast notification here
        console.log('Link copied to clipboard');
      }
    }, []);

  return (
    <div className="2xl:mt-[1.125rem] py-6 grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-6 w-full">
      {isLoading ? (
        <div className="flex justify-center items-center py-5">
          <SmallSpinner color="#F7931D" />
        </div>
      ) : (
        <div className="space-y-6">
          {data?.pages.flatMap((items, idx: number) =>
            items?.results?.map((item, itemIndex) => {
              const itemId = String(item.id);
              const currentVisibility = getCurrentVisibility(item);
              const currentOption = visibilityOptions.find((option) => option.value === currentVisibility) || visibilityOptions[1]; // default to private if not found
              const isItemUpdating = updatingItems.includes(itemId);
              const isDropdownOpen = openDropdownId === itemId;
              
              // Debug logging
              console.log('Rendering item:', itemId, {
                currentVisibility,
                currentOption: currentOption?.label,
                currentOptionValue: currentOption?.value,
                visibilityOptions: visibilityOptions.map(opt => ({ value: opt.value, label: opt.label })),
                isItemUpdating,
                isDropdownOpen
              });
              
              return (
                <div
                  className="bg-white dark:bg-gray-800 rounded-lg border border-[#EAECF0] dark:border-gray-700 cursor-pointer p-[1.875rem] px-4 md:px-[2.2813rem] transition-colors duration-200"
                  key={`${idx}-${item.id}-${itemIndex}`}
                >
                  <div className="flex items-center justify-between w-full z-50 mb-6">
                    <div className="flex items-start space-x-4 w-full">
                      {/* Profile section */}
                      <div className="relative shrink-0 md:h-[60px] md:w-[60px] h-[40px] w-[40px] rounded-full">
                        <Image
                          src={
                            (user?.profile_details?.profile_picture as string) ??
                            "/"
                          }
                          alt="img"
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div className="flex items-start w-full justify-between">
                        <div 
                          className="flex flex-col flex-1 cursor-pointer"
                          onClick={() => router.push(`/div-log/${slugify(item?.id)}`)}
                        >
                          <h2 className="text-sm md:text-lg font-medium text-[#1F2C37] dark:text-gray-100 font-archivo">
                            {item?.name}
                          </h2>
                          <p className="text-[#78828A] dark:text-gray-400 font-archivo font-medium text-xxs md:text-sm py-2">
                            {moment(item?.dive_plan?.created_on).format(
                              "dddd, MMMM D, YYYY"
                            )}
                            <span className="px-2"> • </span>
                            {moment(item?.dive_plan?.created_on).format(
                              "hh:mm A"
                            )}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <h2 className="text-sm md:text-xl font-archivo font-medium text-[#132346] dark:text-gray-100">
                              {item?.dive_plan?.dive_site?.title}
                            </h2>
                            <PenIcon />
                          </div>
                        </div>

                        <div className="relative" ref={dropdownRef}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggle(itemId);
                            }}
                            disabled={isItemUpdating}
                            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${getColorClasses(currentOption.color).bg} ${getColorClasses(currentOption.color).border}`}
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="true"
                          >
                            {isItemUpdating ? (
                              <SmallSpinner color={currentOption.color === 'green' ? '#027A48' : '#FF0000'} />
                            ) : (
                              <div className={getColorClasses(currentOption?.color).icon}>
                                {currentOption?.icon}
                              </div>
                            )}
                            <span
                              className={`font-medium text-sm font-archivo ${getColorClasses(
                                currentOption?.color
                              ).text}`}
                            >
                              {currentOption?.label}
                            </span>
                            <div
                              className={`${getColorClasses(currentOption?.color).icon} transition-transform ${
                                isDropdownOpen ? "rotate-180" : ""
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

                          {isDropdownOpen && !isItemUpdating && (
                            <div className="absolute top-full -left-3 mt-1  bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg py-1 z-50">
                              {visibilityOptions.map((option: VisibilityOption) => (
                                <button
                                  key={option.value}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect({ id: item?.id, option });
                                  }}
                                  className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700 focus:outline-none transition-colors duration-200 ${
                                    currentVisibility === option.value ? "bg-gray-50 dark:bg-gray-700" : ""
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
                      className="relative rounded-lg overflow-hidden mt-6"
                      style={{ height: "15.6875rem" }}
                    >
                      {/* Satellite/Map Background */}
                      <div className="absolute inset-0 bg-cover bg-center"></div>

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60"></div>

                      {/* Coordinates Overlay */}
                      <div className="absolute top-2 left-4 text-white py-4 px-6 md:px-[2.75rem] w-full">
                        <div className="flex justify-end max-md:pr-2 items-center w-full">
                          <Button className="bg-transparent border-none py-[.5206rem] rounded-2xl text-[#F7931D] dark:text-[#F7931D] text-xs md:text-sm font-medium flex items-center gap-[.3125rem] border dark:border-gray-600">
                            {/* <ColorCheckIcon /> */}
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
                                  className="object-cover rounded"
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
                              <div className="flex items-center bg-[#C5EFFF] dark:bg-blue-900/50 max-w-[100px] justify-center gap-[.3531rem] py-1 px-[.4063rem] rounded-10">
                                <CupIcon />
                                <p className="font-archivo text-xxs text-[#132346] dark:text-blue-100 font-semibold">
                                  {t?.rank}:{item?.dive_plan?.dive_site?.ranking}
                                </p>
                              </div>
                              <InfoIcon />
                            </div>
                          </div>
                          <h2 className="font-semibold py-3 text-sm md:text-base lg:text-[1.875rem] font-archivo text-white">
                            <LocationDisplay
                              lat={item?.dive_plan?.dive_site?.lag as string}
                              lon={item?.dive_plan?.dive_site?.lon as string}
                              fallback={t?.locationUnavailable}
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

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:px-[55px] py-5">
                      <div className="flex gap-x-4 items-start">
                        <div className="">
                          <CloudIcon2 />
                        </div>
                        <div className="">
                          <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346] dark:text-gray-100">
                          {t?.maxDepth}{" "}
                          </p>
                          <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346] dark:text-gray-100">
                            {item?.dive_plan?.dive_site?.max_depth}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-x-4 items-start">
                        <div className="">
                          <ClockIcon className="dark:text-white" />
                        </div>
                        <div className="">
                          <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346] dark:text-gray-100">
                            {t?.bottomTime}{" "}
                          </p>
                          <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346] dark:text-gray-100">
                            {item?.bottom_time}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-x-4 items-start">
                        <div className="">
                          <BottleIcon />
                        </div>
                        <div className="">
                          <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346] dark:text-gray-100">
                           {t?.pressureUsed}{" "}
                          </p>
                          <p className="font-archivo font-semibold text-sm md:text-xl text-[#132346] dark:text-gray-100">
                            {item?.average_pressure_of_oxygen}
                          </p>
                          <p className="font-archivo font-semibold text-sm md:text-xl text-[#F7931D]">
                            {item?.maximum_pressure_of_oxygen}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between flex-wrap gap-3 items-center">
                      <div className="flex items-center gap-3 relative">
                        <Button className="bg-[#F9FAFB] dark:bg-gray-700 relative h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
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
                        <Button className="bg-[#F9FAFB] dark:bg-gray-700 h-[2.8125rem] w-[3.75rem] px-[1.125rem] py-[.625rem] rounded-xl flex justify-center items-center border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"   onClick={() => handleShare('Dive Log')}>
                          <ShareIcon2 />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
      <div className="w-full rounded-lg">
        <SuggestedBuddies />
      </div>
    </div>
  );
};

export default DiveLogContainer;