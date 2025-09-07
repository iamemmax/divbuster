"use client";
import React, { useEffect, useState } from "react";
import { Star, MoreHorizontal } from "lucide-react";
import Header from "@/app/(main)/components/shared/Header";
import ShareIcon from "@/app/icons/(dashboard)/ShareIcon";
import { Button, ErrorModal, LinkButton } from "@/components/core";
import { getDiveSiteInfo } from "@/utils/getLocationCharacteristic";
import { Rating } from "react-simple-star-rating";
import CardHeadIcon from "@/app/icons/(dashboard)/CardHeadIcon";
import { cn } from "@/utils/classNames";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import AngleLeft from "@/app/icons/(dashboard)/AngleLeft";
import AngleRight from "@/app/icons/(dashboard)/AngleRight";
import { usefetchBuddyProfile } from "../../../api/buddy/fetchBuddyProfile";
import { useParams } from "next/navigation";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import moment from "moment";
import { useAuth } from "@/contexts/authentication";

// Move the buddies array inside the component or to a separate file
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

const DivingProfile = () => {
  const color = [
    { color1: "#F7931D", color2: "#F7931D" },
    { color1: "#132346", color2: "#012F94" },
  ];
  // const diveImage = [
  //   "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=200&h=120&fit=crop",
  //   "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=120&fit=crop",
  //   "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=200&h=120&fit=crop",
  // ];
  // const galleryImage = [
  //   "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=80&h=80&fit=crop",
  //   "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=80&h=80&fit=crop",
  //   "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=80&h=80&fit=crop",
  //   "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=80&h=80&fit=crop",
  //   "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=80&h=80&fit=crop",
  //   "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=80&h=80&fit=crop",
  // ];

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const params = useParams();
  const { authState } = useAuth();
  const { user } = authState;

  const { data, error, isError, isLoading } = usefetchBuddyProfile(
    String(params?.id)
  );
  useEffect(() => {
    if (isError && error) {
      const errorMessage = formatAxiosErrorMessage(error as AxiosError);
      openErrorModalWithMessage(String(errorMessage));
    }
  }, [isError, error]);

  const buddyProfile = params?.id ? data : user;

  const diveSiteInfo = getDiveSiteInfo({
    latitude: Number(buddyProfile?.current_location?.lat),
    longitude: Number(buddyProfile?.current_location?.lon),
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header title="My Dive Buddies" subtitle="" />
      {/* Header with plant background */}
      <div className="overflow-y-auto max-h-[88vh]">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            <div className="relative bg-white dark:bg-gray-900 transition-colors duration-200">
              {/* Background Banner Image */}
              <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-200">
                {/* Header with plant background */}
                <div className="relative h-60 overflow-hidden">
                  {/* Plant background image */}
                  <div
                    className="absolute top-0 left-0 right-0 h-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1463154545680-d59320fd685d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')",
                    }}
                  ></div>

                  {/* Underwater overlay with reduced opacity */}
                  <div
                    className="absolute top-0 left-0 right-0 h-60 bg-cover bg-center opacity-30 dark:opacity-20"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')",
                    }}
                  ></div>
                </div>

                {/* Profile section */}
                <div className="relative px-8 pb-3 bg-white dark:bg-gray-900 transition-colors duration-200">
                  {/* Profile image positioned over the header */}
                  <div className="absolute -top-16 left-8 flex items-center gap-5">
                    <div className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden transition-colors duration-200">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${buddyProfile?.profile_details?.profile_picture})`,
                        }}
                      ></div>
                    </div>
                    {/* Profile content */}
                    <div className="pt-20">
                      {/* Name and handle */}
                      <div className="mb-8">
                        <h1 className="2xl:text-3xl text-xl font-medium font-archivo text-[#101828] dark:text-gray-100 mb-1 transition-colors duration-200">
                          {buddyProfile?.profile_details?.nickname ?? ""}
                        </h1>
                        <p className="text-[#667085] dark:text-gray-400 font-archivo text-base transition-colors duration-200">
                          {buddyProfile?.username ?? ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Book a Dive Plan button */}
                  <div className="absolute top-8 right-8">
                    <Button
                      variant={"outlined"}
                      className="bg-white dark:bg-gray-800 text-[#344054] dark:text-gray-300 px-4 py-[.625rem] font-archivo font-medium rounded-lg border border-[#D0D5DD] dark:border-gray-600 transition-colors duration-200 text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Book a Dive Plan
                    </Button>
                  </div>
                </div>
              </div>

              {/* Profile Section */}
            </div>

            <div className="mt-[6.125rem] px-6 py-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
              {/* Left Column - Main Content */}
              <div className="space-y-6 pb-12 border border-[#EAECF0] dark:border-gray-700 rounded-lg shadow-sm dark:shadow-gray-700/20 transition-colors duration-200">
                {/* Profile Details Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg pb-8 transition-colors duration-200">
                  <div className="p-7 border-b border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">
                    <div className="flex items-center flex-wrap justify-between">
                      <h2 className="text-xl font-medium text-[#101828] dark:text-gray-100 font-archivo transition-colors duration-200">
                        Profile Details
                      </h2>
                      <div className="flex items-center space-x-4">
                        <Button className="flex items-center bg-transparent space-x-2 px-4 py-[.625rem] rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                          <ShareIcon />
                          <span>Share Profile</span>
                        </Button>
                        <LinkButton
                          href={"/messages"}
                          className="flex items-center space-x-2 px-4 py-[.625rem] rounded-lg bg-[#F7931D] dark:bg-orange-600 text-white text-sm hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-200"
                        >
                          <span>Send Message</span>
                        </LinkButton>
                      </div>
                    </div>
                  </div>

                  {/* Map/Location Section */}
                  <div className="px-[1.875rem] mt-4">
                    <div
                      className="relative rounded-lg overflow-hidden"
                      style={{ height: "310px" }}
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
                      <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 transition-colors duration-200"></div>

                      {/* Coordinates Overlay */}
                      <div className="absolute top-4 left-4 text-white py-8 px-[2.75rem]">
                        <div className="grid grid-cols-2 gap-12">
                          <div>
                            <p className="text-sm text-white font-archivo font-medium">
                              Latitude
                            </p>
                            <p className="text-[1.625rem] text-white font-semibold font-archivo">
                              {buddyProfile?.current_location?.lat ?? ""}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-white font-archivo font-medium">
                              Longitude
                            </p>
                            <p className="text-[1.625rem] text-white font-semibold font-archivo">
                              {buddyProfile?.current_location?.lon ?? ""}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dive Site Card */}
                      <div className="absolute flex justify-center items-center -bottom-4 left-4 right-4">
                        <div
                          className="bg-white dark:bg-gray-800 max-w-[500px] w-full rounded-[1.25rem] py-[1.45rem] px-[3.9375rem] transition-colors duration-200"
                          style={{
                            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-16 h-16 flex items-center justify-center relative overflow-hidden">
                              <img
                                src={diveSiteInfo?.logo?.flagUrl}
                                alt="Dive Site Logo"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                                  {diveSiteInfo?.name}
                                </h3>
                                <div className="flex items-center">
                                  <Rating
                                    initialValue={4} // Value between 0–5
                                    readonly // No interaction
                                    allowFraction={false} // Only full stars
                                    size={18} // Size of stars
                                    SVGstyle={{ display: "inline-block" }}
                                    fillColor="#f59e0b" // Filled star color (e.g., amber)
                                    emptyColor="#e5e7eb" // Empty star color (e.g., light gray)
                                  />
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-200">
                                {diveSiteInfo?.location.country}
                              </p>
                              <div className="flex gap-x-2 items-center">
                                <div className="text-[#6941C6] bg-[#F9F5FF] dark:bg-purple-900/30 dark:text-purple-300 px-[.8125rem] py-1 rounded-2xl text-xs font-medium cursor-pointer transition-colors duration-200">
                                  Ocean
                                </div>
                                <div className="px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] dark:bg-blue-900/30 text-[#175CD3] dark:text-blue-300 cursor-pointer transition-colors duration-200">
                                  Reef
                                </div>
                                <div className="px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] dark:bg-blue-900/30 text-[#175CD3] dark:text-blue-300 cursor-pointer transition-colors duration-200">
                                  Shore
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white dark:bg-gray-800 rounded-lg mt-[4rem] border border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">
                  <div className="p-4">
                    <div className="flex items-center py-2 justify-between">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200">
                        Certifications
                      </h2>
                      <Button className="p-0 bg-transparent">
                        <ThreeDot className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
                      </Button>
                    </div>
                  </div>

                  <>
                    {buddyProfile && buddyProfile?.certificates?.length > 0 ? (
                      <div className="grid lg:grid-cols-2 gap-5 py-6 px-8">
                        {buddyProfile?.certificates?.map(
                          (card, idx: number) => (
                            <div
                              className={`${cn(`flex flex-col z-50 relative gap-4 bg-[url('/images/dashboard/swimmer.svg')] rounded-[1.1944rem] px-[1.125rem] py-4 bg-[${color[idx]?.color1}] bg-cover bg-no-repeat`)}`}
                              key={idx}
                            >
                              <div className="flex justify-between items-start">
                                <p className="text-white text-base font-medium font-archivo">
                                  Date Added:{" "}
                                  {moment(card?.created_on)?.format("ll")}
                                </p>
                                <div className="h-[2.1437rem] mt-4 flex items-center justify-center w-[2.1437rem] border border-white rounded-full">
                                  <CardHeadIcon />
                                </div>
                              </div>

                              <div className="">
                                <p className="text-white text-base font-medium font-archivo">
                                  Issuer:
                                </p>
                                <p className="text-white text-base font-semibold font-archivo">
                                  {card?.issuer}
                                </p>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="">
                                  <p className="text-white text-[11.47px] font-medium font-archivo">
                                    Diver No: {card?.certification_no}
                                  </p>
                                  <p className="text-white text-xl font-semibold font-archivo">
                                    {card?.issuer_name}
                                  </p>
                                </div>
                                <div className="px-3">
                                  <svg
                                    width="17"
                                    height="35"
                                    viewBox="0 0 17 35"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.66847 0L11.1332 0.0768103C14.1568 0.245793 16.5674 2.50914 16.6748 5.47659C16.7823 8.40307 16.722 11.3372 16.7246 14.2688C16.7246 19.62 16.7246 24.972 16.7246 30.3248C16.7246 33.8555 15.5665 35 12.0083 35C9.35667 35 6.70505 35 4.05342 35C1.48302 34.9846 0.0131009 33.5508 0.00786055 31.0315C-0.00262018 22.7905 -0.00262018 14.5496 0.00786055 6.3087C0.00786055 2.61156 2.33196 0.212509 6.09717 0.0844916M2.57302 11.8058V13.8541H14.2328V11.8058H2.57302Z"
                                      fill="white"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center py-3">
                        <p className="font-archivo text-sm font-semibold">
                          No Certfication Found
                        </p>
                      </div>
                    )}
                  </>
                  {/* {buddyProfile && buddyProfile?.certificates?.length > 0 && (
                    <div className="border-t border-[#EAECF0] dark:border-gray-700 flex justify-end items-center py-4 px-8 transition-colors duration-200">
                      <Button
                        variant={"outlined"}
                        className="py-[.625rem] px-4 text-sm font-archivo text-[#344054] dark:text-gray-300 font-medium border border-[#D0D5DD] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        Manage Certification
                      </Button>
                    </div>
                  )} */}
                </div>

                {/* Dive Sites */}
                {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/20 transition-colors duration-200">
                  <div className="px-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200">
                        Dive Sites
                      </h2>
                      <Button className="p-0 bg-transparent">
                        <ThreeDot className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 px-8">
                    <div className="grid grid-cols-3 gap-3 mb-4 overflow-x-hidden">
                      {diveImage?.map((image, idx: number) => (
                        <div
                          key={idx}
                          className="aspect-video rounded-lg overflow-hidden"
                        >
                          <img
                            src={image}
                            alt="Dive site"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#EAECF0] dark:border-gray-700 flex justify-end items-center py-4 transition-colors duration-200">
                      <Button
                        variant={"outlined"}
                        className="py-[.625rem] px-4 text-sm font-archivo text-[#344054] dark:text-gray-300 font-medium border border-[#D0D5DD] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        View all Dive sites
                      </Button>
                    </div>
                  </div>
                </div> */}

                {/* Gallery */}
                {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/20 transition-colors duration-200">
                  <div className="px-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200">
                        Gallery
                      </h2>
                      <Button className="p-0 bg-transparent">
                        <ThreeDot className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex gap-2 mb-4">
                      {galleryImage?.map((image, idx: number) => (
                        <div
                          key={idx}
                          className="aspect-square w-full rounded-lg overflow-hidden"
                        >
                          <img
                            src={image}
                            alt="Gallery photo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#EAECF0] dark:border-gray-700 flex justify-end items-center py-4 transition-colors duration-200">
                      <Button
                        variant={"outlined"}
                        className="py-[.625rem] px-4 text-sm font-archivo text-[#344054] dark:text-gray-300 font-medium border border-[#D0D5DD] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        View all Gallery
                      </Button>
                    </div>
                  </div>
                </div> */}

                {/* Expandable Sections */}
                {/* <div className="space-y-3 px-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-[.875rem] border border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">
                    <LinkButton
                      href={"#"}
                      className="w-full bg-transparent text-[#101828] dark:text-gray-100 flex items-center justify-between text-left transition-colors duration-200"
                    >
                      <span className="font-semibold text-lg text-[Gray/900] dark:text-gray-100 font-archivo">
                        Gears
                      </span>
                      <AngleRight />
                    </LinkButton>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-[.875rem] border border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">
                    <LinkButton
                      href={"#"}
                      className="w-full bg-transparent text-[#101828] dark:text-gray-100 flex items-center justify-between text-left transition-colors duration-200"
                    >
                      <span className="font-semibold text-lg text-[Gray/900] dark:text-gray-100 font-archivo">
                        View Bucket List
                      </span>
                      <AngleRight />
                    </LinkButton>
                  </div>
                </div> */}

                {/* Action Buttons */}
              </div>

              {/* Right Sidebar */}
              <div className="border border-[#EAECF0] dark:border-gray-700 rounded-lg transition-colors duration-200">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/20 transition-colors duration-200">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700 transition-colors duration-200">
                    <h3 className="font-semibold font-archivo text-base text-[#101828] dark:text-gray-100 transition-colors duration-200">
                      Bart's Buddies
                    </h3>
                    <p className="text-xs text-[#78828A] dark:text-gray-400 font-medium font-archivo transition-colors duration-200">
                      46 Dive Buddies
                    </p>
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
                            <div className="absolute left-5 top-12 w-[2px] h-6 bg-gray-200 dark:bg-gray-600 transition-colors duration-200"></div>
                          )}

                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="relative z-10 flex-shrink-0">
                              <img
                                src={buddy.img}
                                alt={buddy.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate transition-colors duration-200">
                                {buddy.name}
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < buddy.rating ? "text-orange-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
                                  />
                                ))}
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 transition-colors duration-200">
                                  {buddy.reviews} Reviews
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="flex items-center justify-center hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors duration-200 p-1 flex-shrink-0">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15ZM10 20C8.61667 20 7.31667 19.7417 6.1 19.225C4.88333 18.6917 3.825 17.975 2.925 17.075C2.025 16.175 1.30833 15.1167 0.775 13.9C0.258333 12.6833 0 11.3833 0 10C0 8.61667 0.258333 7.31667 0.775 6.1C1.30833 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31667 6.1 0.799999C7.31667 0.266666 8.61667 0 10 0C11.3833 0 12.6833 0.266666 13.9 0.799999C15.1167 1.31667 16.175 2.025 17.075 2.925C17.975 3.825 18.6833 4.88333 19.2 6.1C19.7333 7.31667 20 8.61667 20 10C20 11.3833 19.7333 12.6833 19.2 13.9C18.6833 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6917 13.9 19.225C12.6833 19.7417 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                                fill="#A9B0C2"
                                className="dark:fill-gray-500"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex py-3 justify-center items-center w-full">
                    <Button
                      variant={"outlined"}
                      className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      View more
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3 flex justify-center items-center flex-col">
                <Button className="w-full py-3 bg-[#A9B0C2] dark:bg-gray-600 max-w-[33.75rem] font-semibold text-lg border border-[#A9B0C2] dark:border-gray-600 text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200">
                  Unfriend Bart
                </Button>
                <Button className="w-full py-3 bg-transparent text-[#FF0000] dark:text-red-400 font-semibold text-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                  Block User
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      ></ErrorModal>
    </div>
  );
};

export default DivingProfile;
