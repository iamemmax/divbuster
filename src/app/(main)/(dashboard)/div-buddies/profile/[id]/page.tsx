"use client";
import React, { useState } from "react";
import { Star, MoreHorizontal } from "lucide-react";
import Header from "@/app/(main)/components/shared/Header";
import ShareIcon from "@/app/icons/(dashboard)/ShareIcon";
import { Button, LinkButton } from "@/components/core";
import { getDiveSiteInfo } from "@/utils/getLocationCharacteristic";
import { Rating } from "react-simple-star-rating";
import CardHeadIcon from "@/app/icons/(dashboard)/CardHeadIcon";
import { cn } from "@/utils/classNames";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import AngleLeft from "@/app/icons/(dashboard)/AngleLeft";
import AngleRight from "@/app/icons/(dashboard)/AngleRight";
export default function DivingProfile() {
  const buddies = [
    {
      name: "Phoenix Baker",
      rating: 4,
      reviews: 22,
      avatar: "PB",
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Lana Steiner",
      rating: 5,
      reviews: 29,
      avatar: "LS",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Demi Wilkinson",
      rating: 4,
      reviews: 22,
      avatar: "DW",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Candice Wu",
      rating: 4,
      reviews: 22,
      avatar: "CW",
      color: "bg-pink-100 text-pink-700",
    },
    {
      name: "Natali Craig",
      rating: 4,
      reviews: 22,
      avatar: "NC",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      name: "Orlando Diggs",
      rating: 4,
      reviews: 22,
      avatar: "OD",
      color: "bg-indigo-100 text-indigo-700",
    },
  ];

  const diveSiteInfo = getDiveSiteInfo({
    latitude: 6.6237432,
    longitude: 3.2905898,
  });

  const cardArray = [
    {
      date: "21/06/24",
      issuer: "Padi Dive",
      color1: "#CC6F00",
      color2: "#F7931D",
      driver_number: " 328173343",
      position: "Rescue Diver",
    },
    {
      date: "21/06/24",
      issuer: "Padi Dive",
      color1: "#132346",
      color2: "#012F94",
      driver_number: "328173343",
      position: "Rescue Diver",
    },
  ];

  const diveImage = [
    "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=200&h=120&fit=crop",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=120&fit=crop",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=200&h=120&fit=crop",
  ];
  const galleryImage = [
    "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=80&h=80&fit=crop",
     "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=80&h=80&fit=crop",
  ];
  return (
    <div className="min-h-screen bg-white">
      <Header title="My Dive Buddies" subtitle="" />
      {/* Header with plant background */}
      <div className="overflow-y-auto max-h-[88vh]">
        <div className="relative bg-white ">
          {/* Background Banner Image */}
          <div className="w-full bg-white">
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
                className="absolute top-0 left-0 right-0 h-60 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')",
                }}
              ></div>
            </div>

            {/* Profile section */}
            <div className="relative px-8 pb-3 bg-white">
              {/* Profile image positioned over the header */}
              <div className="absolute -top-16 left-8 flex items-center gap-5">
                <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
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
                    <h1 className="2xl:text-3xl text-xl font-medium font-archivo text-[#101828] mb-1">
                      Bart Bright
                    </h1>
                    <p className="text-[#667085] font-archivo text-base">
                      @bart3383
                    </p>
                  </div>
                </div>
              </div>

              {/* Book a Dive Plan button */}
              <div className="absolute top-8 right-8">
                <Button
                  variant={"outlined"}
                  className="bg-white text-[#344054] px-4 py-[.625rem] font-archivo font-medium rounded-lg border border-[#D0D5DD]  transition-colors text-sm shadow-sm"
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
          <div className=" space-y-6 pb-12 border border-[#EAECF0] rounded-lg shadow-sm ">
            {/* Profile Details Section */}
            <div className="bg-white rounded-lg pb-8">
              <div className="p-7 border-b border-[#EAECF0]">
                <div className="flex items-center flex-wrap justify-between">
                  <h2 className="text-xl font-medium text-[#101828] font-archivo">
                    Profile Details
                  </h2>
                  <div className="flex items-center space-x-4">
                    <Button className="flex items-center bg-transparent space-x-2 px-4 py-[.625rem] rounded-lg border border-gray-300  text-sm text-gray-700 hover:bg-gray-50">
                      <ShareIcon />
                      <span>Share Profile</span>
                    </Button>
                    <Button className="flex items-center space-x-2 px-4 py-[.625rem] rounded-lg bg-[#F7931D] text-white  text-sm hover:bg-orange-600">
                      <span>Send Message</span>
                    </Button>
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
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                  {/* Coordinates Overlay */}
                  <div className="absolute top-4 left-4 text-white py-8 px-[2.75rem]">
                    <div className="grid grid-cols-2 gap-12">
                      <div>
                        <p className="text-sm text-white font-archivo font-medium">
                          Latitude
                        </p>
                        <p className="text-[1.625rem] text-white font-semibold font-archivo">
                          12.166502
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-white font-archivo font-medium">
                          Longitude
                        </p>
                        <p className="text-[1.625rem] text-white font-semibold font-archivo">
                          -68.287672
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dive Site Card */}
                  <div className="absolute flex justify-center items-center -bottom-4 left-4 right-4">
                    <div
                      className="bg-white max-w-[500px] w-full rounded-[1.25rem] py-[1.45rem] px-[3.9375rem]"
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
                            <h3 className="font-semibold text-gray-900">
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
                          <p className="text-sm text-gray-600 mb-2">
                            {diveSiteInfo?.location.country}
                          </p>
                          <div className="flex gap-x-2 items-center">
                            <div className="text-[#6941C6] bg-[#F9F5FF] px-[.8125rem] py-1 rounded-2xl text-xs font-medium cursor-pointer">
                              Ocean
                            </div>
                            <div className=" px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] text-[#175CD3] cursor-pointer">
                              Reef
                            </div>
                            <div className=" px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] text-[#175CD3] cursor-pointer">
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
            <div className="bg-white rounded-lg mt-[4rem] border border-[#EAECF0]">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Certifications
                  </h2>
                  <Button className="p-0 bg-transparent">
                    {" "}
                    <ThreeDot className="w-5 h-5 text-gray-400" />
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-5 py-6 px-8">
                {cardArray?.map((card, idx: number) => (
                  <div
                    className={`${cn(`flex flex-col z-50 relative gap-4 bg-[url('/images/dashboard/swimmer.svg')] rounded-[1.1944rem] px-[1.125rem] py-4 bg-[${card?.color1}] bg-cover bg-no-repeat`)}`}
                    key={idx}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-white text-base font-medium font-archivo">
                        Date Added: {card?.date}
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
                          Diver No: {card?.driver_number}
                        </p>
                        <p className="text-white text-xl font-semibold font-archivo">
                          {card?.position}
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
                ))}
              </div>
              <div className=" border-t border-[#EAECF0] flex justify-end items-center py-4 px-8">
                <Button
                  variant={"outlined"}
                  className="py-[.625rem] px-4 text-sm font-archivo text-[#344054] font-medium border border-[#D0D5DD]"
                >
                  Manage Certification
                </Button>
              </div>
            </div>

            {/* Dive Sites */}
            <div className="bg-white rounded-lg shadow-sm ">
              <div className="px-8 ">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Dive Sites
                  </h2>
                 <Button className="p-0 bg-transparent">
                    {" "}
                    <ThreeDot className="w-5 h-5 text-gray-400" />
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
                <div className=" border-t border-[#EAECF0] flex justify-end items-center py-4 ">
                  <Button
                    variant={"outlined"}
                    className="py-[.625rem] px-4 text-sm font-archivo text-[#344054] font-medium border border-[#D0D5DD]"
                  >
                    View all Dive sites
                  </Button>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Gallery</h2>
                 <Button className="p-0 bg-transparent">
                    {" "}
                    <ThreeDot className="w-5 h-5 text-gray-400" />
                  </Button>
                </div>
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  
                  {
                    galleryImage?.map((image, idx: number) => (
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
                    ))
                  }
                </div>
               <div className=" border-t border-[#EAECF0] flex justify-end items-center py-4 ">

                 <Button
                    variant={"outlined"}
                    className="py-[.625rem] px-4 text-sm font-archivo text-[#344054] font-medium border border-[#D0D5DD]"
                  >
                      View all Gallery
                  </Button>
               </div>
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-3 px-8">
              <div className="bg-white rounded-lg  p-[.875rem] border border-[#EAECF0]">
                <LinkButton href={"#"} className="w-full bg-transparent text-[#101828] flex  items-center justify-between text-left ">
                  <span className="font-semibold text-lg text-[Gray/900] font-archivo">Gears</span>
                  <AngleRight/>
                </LinkButton>
              </div>
              <div className="bg-white rounded-lg  p-[.875rem]  border border-[#EAECF0]">
                <LinkButton href={"#"} className="w-full bg-transparent text-[#101828] flex  items-center justify-between text-left ">
                  <span className="font-semibold text-lg text-[Gray/900] font-archivo">
                    View Bucket List
                  </span>
                    <AngleRight/>
                </LinkButton>
              </div>
            </div>

            {/* Action Buttons */}
           
          </div>

          {/* Right Sidebar */}
          <div className=" border border-[#EAECF0] rounded-lg ">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-900">Bart's Buddies</h3>
                <p className="text-sm text-gray-500">46 Dive Buddies</p>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {buddies.map((buddy, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium ${buddy.color}`}
                      >
                        {buddy.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {buddy.name}
                        </p>
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
                      <button className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 text-sm font-medium">
                        +
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-sm text-gray-600 hover:text-gray-800">
                  View more
                </button>
              </div>
            </div>
          </div>

           <div className="space-y-3 flex justify-center items-center flex-col">
              <Button className="w-full py-3 bg-[#A9B0C2] max-w-[33.75rem] font-semibold text-lg border border-[#A9B0C2] text-white rounded-md ">
                Unfriend Bart
              </Button>
              <Button className="w-full py-3 bg-transparent text-[#FF0000] font-semibold text-lg ">
                Block User
              </Button>
            </div>
        </div>

        
      </div>
    </div>
  );
}
