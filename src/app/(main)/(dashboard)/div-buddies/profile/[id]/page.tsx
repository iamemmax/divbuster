

//                 {/* Dive Sites */}
//                 {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/20 transition-colors duration-200">
//                   <div className="px-8">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200">
//                         Dive Sites
//                       </h2>
//                       <Button className="p-0 bg-transparent">
//                         <ThreeDot className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="p-4 px-8">
//                     <div className="grid grid-cols-3 gap-3 mb-4 overflow-x-hidden">
//                       {diveImage?.map((image, idx: number) => (
//                         <div
//                           key={idx}
//                           className="aspect-video rounded-lg overflow-hidden"
//                         >
//                           <img
//                             src={image}
//                             alt="Dive site"
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div className="border-t border-[#EAECF0] dark:border-gray-700 flex justify-end items-center py-4 transition-colors duration-200">
//                       <Button
//                         variant={"outlined"}
//                         className="py-[.625rem] px-4 text-sm font-archivo text-[#344054] dark:text-gray-300 font-medium border border-[#D0D5DD] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//                       >
//                         View all Dive sites
//                       </Button>
//                     </div>
//                   </div>
//                 </div> */}

//                 {/* Gallery */}
//                 {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/20 transition-colors duration-200">
//                   <div className="px-8">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200">
//                         Gallery
//                       </h2>
//                       <Button className="p-0 bg-transparent">
//                         <ThreeDot className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="p-8">
//                     <div className="flex gap-2 mb-4">
//                       {galleryImage?.map((image, idx: number) => (
//                         <div
//                           key={idx}
//                           className="aspect-square w-full rounded-lg overflow-hidden"
//                         >
//                           <img
//                             src={image}
//                             alt="Gallery photo"
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div className="border-t border-[#EAECF0] dark:border-gray-700 flex justify-end items-center py-4 transition-colors duration-200">
//                       <Button
//                         variant={"outlined"}
//                         className="py-[.625rem] px-4 text-sm font-archivo text-[#344054] dark:text-gray-300 font-medium border border-[#D0D5DD] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//                       >
//                         View all Gallery
//                       </Button>
//                     </div>
//                   </div>
//                 </div> */}

//                 {/* Expandable Sections */}
//                 {/* <div className="space-y-3 px-8">
//                   <div className="bg-white dark:bg-gray-800 rounded-lg p-[.875rem] border border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">
//                     <LinkButton
//                       href={"#"}
//                       className="w-full bg-transparent text-[#101828] dark:text-gray-100 flex items-center justify-between text-left transition-colors duration-200"
//                     >
//                       <span className="font-semibold text-lg text-[Gray/900] dark:text-gray-100 font-archivo">
//                         Gears
//                       </span>
//                       <AngleRight />
//                     </LinkButton>
//                   </div>
//                   <div className="bg-white dark:bg-gray-800 rounded-lg p-[.875rem] border border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">
//                     <LinkButton
//                       href={"#"}
//                       className="w-full bg-transparent text-[#101828] dark:text-gray-100 flex items-center justify-between text-left transition-colors duration-200"
//                     >
//                       <span className="font-semibold text-lg text-[Gray/900] dark:text-gray-100 font-archivo">
//                         View Bucket List
//                       </span>
//                       <AngleRight />
//                     </LinkButton>
//                   </div>
//                 </div> */}

//                 {/* Action Buttons */}




"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import { AxiosError } from "axios";
import { Star, MoreHorizontal } from "lucide-react";

import Header from "@/app/(main)/components/shared/Header";
import ShareIcon from "@/app/icons/(dashboard)/ShareIcon";
import { Button, ErrorModal, LinkButton } from "@/components/core";
import { getDiveSiteInfo } from "@/utils/getLocationCharacteristic";
import { Rating } from "react-simple-star-rating";
import CardHeadIcon from "@/app/icons/(dashboard)/CardHeadIcon";
import { cn } from "@/utils/classNames";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import { usefetchBuddyProfile } from "../../../api/buddy/fetchBuddyProfile";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { useAuth } from "@/contexts/authentication";

import MyBuddyList from "../MyBuddyList";
import { profileTranslations } from "@/app/(main)/translation/diveBuddiesTranslation";
import { Language } from "@/app/(auth)/sign-up/translations";

const DivingProfile = () => {
  const color = [
    { color1: "#F7931D", color2: "#F7931D" },
    { color1: "#132346", color2: "#012F94" }
  ];

  const router = useRouter();
  const params = useParams();
  const { authState } = useAuth();
  const { user } = authState;

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage
  } = useErrorModalState();

  // language state — replace with context or prop if you have
    const language: Language = (user?.profile_details?.language as Language);
  
  const t = profileTranslations[language] || profileTranslations?.en;

  // If no id param, redirect to own profile
  useEffect(() => {
    if (params?.id) {
      router.push(`/div-buddies/profile/${params.id}`);
    } else {
      router.push(`/profile`);
    }
  }, [params?.id, router]);

  const { data, error, isError, isLoading } = usefetchBuddyProfile(
    String(params?.id ?? user?.id ?? "")
  );

  useEffect(() => {
    if (isError && error) {
      const msg = formatAxiosErrorMessage(error as AxiosError);
      openErrorModalWithMessage(msg as string);
    }
  }, [isError, error, openErrorModalWithMessage]);

  const buddyProfile = data || user;

  const diveSiteInfo = getDiveSiteInfo({
    latitude: Number(buddyProfile?.current_location?.lat),
    longitude: Number(buddyProfile?.current_location?.lon)
  });

  const handleShare = useCallback((title: string): void => {
      if (navigator.share) {
        navigator.share({
          title: `Dive Profile: ${title}`,
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header title={t.title} subtitle="" />

  

      <div className="overflow-y-auto max-h-[88vh]">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            <div className="relative bg-white dark:bg-gray-900 transition-colors duration-200">
              {/* Banner + Profile image */}
              <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-200">
                <div className="relative h-28 md:h-60 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1463154545680-d59320fd685d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')"
                    }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 right-0 h-28 md:h-60 bg-cover bg-center opacity-30 dark:opacity-20"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')"
                    }}
                  ></div>
                </div>
                <div className="relative px-0 md:px-8 pb-3 bg-white dark:bg-gray-900 transition-colors duration-200">
                  <div className="absolute -top-16 left-8 flex items-center gap-5">
                    <div className="md:w-28 md:h-28 h-14 w-14 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden transition-colors duration-200">
                      <div
                        className="w-full h-full md:bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${buddyProfile?.profile_details?.profile_picture})`
                        }}
                      ></div>
                    </div>
                    <div className="pt-20">
                      <div className="mb-8">
                        <h1 className="2xl:text-3xl text-sm md:text-xl font-medium font-archivo text-[#101828] dark:text-gray-100 mb-1 transition-colors duration-200">
                          {buddyProfile?.profile_details?.nickname ?? ""}
                        </h1>
                        <p className="text-[#667085] dark:text-gray-400 font-archivo text-xs md:text-base transition-colors duration-200">
                          {buddyProfile?.username ?? ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-[4.5rem] md:top-8 right-8" >
                    <Button
                      variant={"outlined"}
                      className="bg-white dark:bg-gray-800 text-[#344054] dark:text-gray-300 px-4 py-[.625rem] font-archivo font-medium rounded-lg border border-[#D0D5DD] dark:border-gray-600 transition-colors duration-200 text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      {t.bookDive}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[6.125rem] px-3 md:px-6 py-6 grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-6">       
              {/* Left Column */}
              <div className="space-y-6 pb-12 border border-[#EAECF0] dark:border-gray-700 rounded-lg shadow-sm dark:shadow-gray-700/20 transition-colors duration-200">
                {/* Profile Details */}
                <div className="bg-white dark:bg-gray-800 rounded-lg pb-8 transition-colors duration-200">
                  <div className="p-7 border-b border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">
                    <div className="flex items-center flex-wrap justify-between">
                      <h2 className="text-xl font-medium text-[#101828] dark:text-gray-100 font-archivo transition-colors duration-200">
                        {t.profileDetails}
                      </h2>
                      <div className="flex items-center space-x-4">
                        <Button className="flex items-center bg-transparent space-x-2 px-4 py-[.625rem] rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200" onClick={()=>handleShare("profile")}>
                          <ShareIcon />
                          <span>{t.shareProfile}</span>
                        </Button>
                        <LinkButton
                          href={"/messages"}
                          className="flex items-center space-x-2 px-4 py-[.625rem] rounded-lg bg-[#F7931D] dark:bg-orange-600 text-white text-sm hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-200"
                        >
                          <span>{t.sendMessage}</span>
                        </LinkButton>
                      </div>
                    </div>
                  </div>

                  <div className="md:px-[1.875rem] mt-4">
                    <div
                      className="relative rounded-lg overflow-hidden"
                      style={{ height: "310px" }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url(/images/dashboard/profile-Location.png)"
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 transition-colors duration-200"></div>

                      <div className="absolute top-4 left-4 text-white py-8 px-[2.75rem]">
                        <div className="grid grid-cols-2 gap-12">
                          <div>
                            <p className="text-sm text-white font-archivo font-medium">
                              {t.latitude}
                            </p>
                            <p className="text-lg md:text-[1.625rem] text-white font-semibold font-archivo">
                              {buddyProfile?.current_location?.lat ?? ""}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-white font-archivo font-medium">
                              {t.longitude}
                            </p>
                            <p className="text-lg md:text-[1.625rem] text-white font-semibold font-archivo">
                              {buddyProfile?.current_location?.lon ?? ""}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="absolute flex justify-center items-center -bottom-4 left-4 right-4">
                        <div
                          className="bg-white dark:bg-gray-800 max-w-[500px] w-full rounded-[1.25rem] py-[1.45rem] px-[3.9375rem] transition-colors duration-200"
                          style={{
                            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.06)"
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
                                    initialValue={4}
                                    readonly
                                    allowFraction={false}
                                    size={18}
                                    SVGstyle={{ display: "inline-block" }}
                                    fillColor="#f59e0b"
                                    emptyColor="#e5e7eb"
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
                        {t.certifications}
                      </h2>
                      <Button className="p-0 bg-transparent">
                        <ThreeDot className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
                      </Button>
                    </div>
                  </div>

                  {buddyProfile && buddyProfile.certificates && buddyProfile.certificates.length > 0 ? (
                    <div className="grid lg:grid-cols-2 gap-5 py-6 px-8">
                      {buddyProfile.certificates.map((card, idx: number) => (
                        <div
                          key={idx}
                          className={cn(
                            `flex flex-col z-50 relative gap-4 rounded-[1.1944rem] px-[1.125rem] py-4`
                          )}
                          style={{
                            backgroundImage: `url(${card.image ?? ""})`,
                            backgroundColor: !card.image ? color[idx]?.color1 : ""
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-white text-base font-medium font-archivo">
                              {t.dateAdded}:{" "}
                              {moment(card.created_on).format("ll")}
                            </p>
                            <div className="h-[2.1437rem] mt-4 flex items-center justify-center w-[2.1437rem] border border-white rounded-full">
                              <CardHeadIcon />
                            </div>
                          </div>

                          <div>
                            <p className="text-white text-base font-medium font-archivo">
                              {t.issuer}:
                            </p>
                            <p className="text-white text-base font-semibold font-archivo">
                              {card.issuer}
                            </p>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-white text-[11.47px] font-medium font-archivo">
                                {t.diverNo}: {card.certification_no}
                              </p>
                              <p className="text-white text-xl font-semibold font-archivo">
                                {card.issuer_name}
                              </p>
                            </div>
                            <div className="px-3">
                              {/* icon svg */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center py-3">
                      <p className="font-archivo text-sm font-semibold">
                        {t.noCertifications}
                      </p>
                    </div>
                  )}

                  {buddyProfile && buddyProfile.certificates && buddyProfile.certificates.length > 0 && (
                    <div className="border-t border-[#EAECF0] dark:border-gray-700 flex justify-end items-center py-4 px-8 transition-colors duration-200">
                      <LinkButton
                        href={"/manage-certifications"}
                        variant={"outlined"}
                        className="py-[.625rem] px-4 text-sm font-archivo text-[#344054] dark:text-gray-300 font-medium border border-[#D0D5DD] dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        {t.manageCertification}
                      </LinkButton>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="border border-[#EAECF0] dark:border-none rounded-lg transition-colors duration-200">
                <MyBuddyList />
              </div>

              <div className="space-y-3 flex justify-center items-center flex-col">
                <Button className="w-full py-3 bg-[#A9B0C2] dark:bg-gray-600 max-w-[33.75rem] font-semibold text-lg border border-[#A9B0C2] dark:border-gray-600 text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200">
                  {t.unfriend}
                </Button>
                <Button className="w-full py-3 bg-transparent text-[#FF0000] dark:text-red-400 font-semibold text-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                  {t.blockUser}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {isErrorModalOpen && (
        <ErrorModal
          isErrorModalOpen={isErrorModalOpen}
          setErrorModalState={() => setErrorModalState(false)}
          subheading={errorModalMessage || "Error"}
        />
      )}
    </div>
  );
};

export default DivingProfile;
