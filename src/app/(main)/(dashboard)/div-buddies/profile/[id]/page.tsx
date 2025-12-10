


"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import { AxiosError } from "axios";

import Header from "@/app/(main)/components/shared/Header";
import ShareIcon from "@/app/icons/(dashboard)/ShareIcon";
import { Button,  LinkButton } from "@/components/core";
import { Rating } from "react-simple-star-rating";
import CardHeadIcon from "@/app/icons/(dashboard)/CardHeadIcon";
import { cn } from "@/utils/classNames";
import ThreeDot from "@/app/icons/(dashboard)/ThreeDot";
import { certificates, usefetchBuddyProfile } from "../../../api/buddy/fetchBuddyProfile";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { useAuth } from "@/contexts/authentication";
import { useFetchCountry } from "../../../api/fetchCountry";

import MyBuddyList from "../MyBuddyList";
import { profileTranslations } from "@/app/(main)/translation/diveBuddiesTranslation";
import CreateBuddyBooking from "../../../bookings/components/modals/buddy-booking/CreateBuddyBooking";
import { useLanguage } from "@/hooks/useLanguage";
import CertificateModal from "@/app/(main)/components/certifications/CertificateModal";
import { selectedCardBg } from "@/app/(main)/components/shared/CardContainer";

const DivingProfile = () => {
  

  const router = useRouter();
  const params = useParams();
  const { authState } = useAuth();
  const { user } = authState;
    const [showBookWithBuddy, setShowBookWithBuddy] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<certificates |null>(null)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [showBuddyList, setShowBuddyList] = useState(false)
  const [locationName, setLocationName] = useState<string>('')
  

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage
  } = useErrorModalState();

  // language state — replace with context or prop if you have
    const {language}=useLanguage()
 
  
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

  const { data: country } = useFetchCountry();
  const getCountry = (id: number) => {
    const filterCountry = country?.results?.find((con) => con?.id === id);
    return filterCountry;
  };

  useEffect(() => {
    if (isError && error) {
      const msg = formatAxiosErrorMessage(error as AxiosError);
      openErrorModalWithMessage(msg as string);
    }
  }, [isError, error, openErrorModalWithMessage]);

  const buddyProfile = data?.data || user;



  useEffect(() => {
    const getLocationName = async () => {
      if (buddyProfile?.current_location?.lat && buddyProfile?.current_location?.lon) {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${buddyProfile.current_location.lat}+${buddyProfile.current_location.lon}&key=YOUR_API_KEY`
          )
          const data = await response.json()
          if (data.results && data.results.length > 0) {
            const result = data.results[0]
            const city = result.components.city || result.components.town || result.components.village
            const country = result.components.country
            setLocationName(city ? `${city}, ${country}` : country)
          }
        } catch (error) {
          console.error('Error fetching location:', error)
        }
      }
    }
    getLocationName()
  }, [buddyProfile?.current_location])

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
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
      <Header title={t.title} subtitle="" />

  

      <div className="h-[88vh]">
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
                    onClick={()=>setShowBookWithBuddy(true)}
                    >
                      {t.bookDive}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[6.125rem] px-3 md:px-6 py-6 grid grid-cols-1 2xl:grid-cols-[3fr_1fr] gap-6 h-full">
              {/* Mobile Buddy List Button */}
              <button
                onClick={() => setShowBuddyList(!showBuddyList)}
                className="xl:hidden fixed bottom-4 right-4 z-[60] bg-[#F7931D] text-white p-3 rounded-full shadow-lg hover:bg-[#E8841A] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.01 3.01 0 0 0 16.96 6c-.8 0-1.54.37-2.01.97L12 10.5 9.05 6.97A3.01 3.01 0 0 0 6.04 6c-1.28 0-2.4.8-2.84 2.01L.66 16H3.5v6h2v-6h2.12l2.88-8.64L12 9.5l1.5-2.14L16.38 16H18.5v6h2zM8 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2z"/>
                </svg>
              </button>       
              {/* Left Column */}
              <div className="space-y-6 pb-12 border border-[#EAECF0] dark:border-gray-700 rounded-lg shadow-sm dark:shadow-gray-700/20 transition-colors duration-200 overflow-y-auto h-full">
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
                          href={`/messages?userId=${buddyProfile?.id}`}
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
                      style={{ height: "210px" }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url(/images/dashboard/profile-Location.png)"
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 transition-colors duration-200"></div>

                      {/* <div className="absolute top-4 left-4 text-white py-8 px-[2.75rem]">
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
                      </div> */}

                      <div className="absolute flex justify-center items-center -bottom-4 left-4 right-4">
                        <div
                          className="bg-white dark:bg-gray-800 max-w-[500px] w-full rounded-[1.25rem] py-[1.45rem] px-[3.9375rem] transition-colors duration-200"
                          style={{
                            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.06)"
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-16 h-16 flex items-center justify-center relative overflow-hidden rounded">
                              {buddyProfile?.profile_details?.country && getCountry(buddyProfile.profile_details.country)?.alpha2code ? (
                                <img
                                  src={`https://flagcdn.com/w40/${getCountry(buddyProfile.profile_details.country)?.alpha2code?.toLowerCase()}.png`}
                                  alt={`${getCountry(buddyProfile.profile_details.country)?.name} flag`}
                                  className="w-full h-full object-cover rounded"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/images/placeholder-flag.png';
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-300 rounded flex items-center justify-center">
                                  <span className="text-xs text-gray-600">?</span>
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                                  {buddyProfile?.diver_profile?.last_dive_detail?.name}
                                </h3>
                                {/* <div className="flex items-center">
                                  <Rating
                                    initialValue={4}
                                    readonly
                                    allowFraction={false}
                                    size={18}
                                    SVGstyle={{ display: "inline-block" }}
                                    fillColor="#f59e0b"
                                    emptyColor="#e5e7eb"
                                  />
                                </div> */}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-200">
                                {buddyProfile?.profile_details?.country ? getCountry(buddyProfile.profile_details.country)?.name : 'Location not available'}
                              </p>
                              <div className="flex gap-x-2 items-center">
                               {buddyProfile?.diver_profile?.last_dive_detail?.water_type&& <div className="text-[#6941C6] bg-[#F9F5FF] dark:bg-purple-900/30 dark:text-purple-300 px-[.8125rem] py-1 rounded-2xl text-xs font-medium cursor-pointer transition-colors duration-200">
                                    {buddyProfile?.diver_profile?.last_dive_detail?.water_type}
                                </div>}
                               {buddyProfile?.diver_profile?.last_dive_detail?.water_body&& <div className="px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] dark:bg-blue-900/30 text-[#175CD3] dark:text-blue-300 cursor-pointer transition-colors duration-200">
                                   {buddyProfile?.diver_profile?.last_dive_detail?.water_body}
                                </div>}
                               {buddyProfile?.diver_profile?.last_dive_detail?.entry_type&& <div className="px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] dark:bg-blue-900/30 text-[#175CD3] dark:text-blue-300 cursor-pointer transition-colors duration-200">
                                 {buddyProfile?.diver_profile?.last_dive_detail?.entry_type}
                                </div>}
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
                      {/* <Button className="p-0 bg-transparent">
                        <ThreeDot className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
                      </Button> */}
                    </div>
                  </div>

                  {buddyProfile && buddyProfile.certificates && buddyProfile.certificates.length > 0 ? (
                    <div className="grid lg:grid-cols-2 gap-5 py-6 px-8">
                      {buddyProfile.certificates.map((card, idx: number) => (
                        <div
                          key={idx}
                          className={cn(
                            `flex flex-col z-50 relative gap-4 rounded-[1.1944rem] px-[1.125rem] py-4 cursor-pointer hover:opacity-90 transition-opacity dark:brightness-75`
                          )}
                          style={{
                             backgroundColor: selectedCardBg(card?.certificate_type)?.bg,
                            color: selectedCardBg(card?.certificate_type)?.text,
                          }}
                          onClick={() => {
                            setSelectedCertificate(card)
                            setShowCertificateModal(true)
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

                {/* Achievements */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">
                  <div className="p-4">
                    <div className="flex items-center py-2 justify-between">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200">
                        Achievements
                      </h2>
                      {/* <Button className="p-0 bg-transparent">
                        <ThreeDot className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
                      </Button> */}
                    </div>
                  </div>

                  {buddyProfile?.user_archievements && buddyProfile.user_archievements.length > 0 ? (
                    <div className="grid lg:grid-cols-2 gap-5 py-6 px-8">
                      {buddyProfile.user_archievements.flatMap(ua => ua.archievements).map((achievement, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-r from-orange-400 to-orange-600 flex flex-col gap-4 rounded-lg px-4 py-4 text-white"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold font-archivo mb-2">
                                {achievement.title}
                              </h3>
                              <p className="text-sm opacity-90 font-archivo">
                                {achievement.description}
                              </p>
                            </div>
                            {achievement.image && (
                              <div className="w-12 h-12 rounded-full overflow-hidden ml-3">
                                <img
                                  src={achievement.image}
                                  alt={achievement.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="flex flex-col">
                              <span className="font-archivo">
                                Type: {achievement.achievement_type}
                              </span>
                              <span className="font-archivo">
                                Earned: {moment(achievement.created_on).format("MMM DD, YYYY")}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="font-archivo block">
                                Dives: {achievement.dive_count}
                              </span>
                              {achievement.reward_amount > 0 && (
                                <span className="font-archivo block">
                                  Reward: ${achievement.reward_amount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center py-8">
                      <p className="font-archivo text-sm text-gray-500 dark:text-gray-400">
                        No achievements yet
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="hidden 2xl:block border border-[#EAECF0] dark:border-none rounded-lg transition-colors duration-200 overflow-y-auto h-full">
                <MyBuddyList />
              </div>

              {/* Mobile Buddy List Modal */}
              {showBuddyList && (
                <div className="2xl:hidden absolute inset-x-0 bottom-0 z-[70] bg-black bg-opacity-50 animate-fade-in" onClick={() => setShowBuddyList(false)}>
                  <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-lg max-h-[70vh] overflow-hidden animate-slide-up" onClick={(e) => e.stopPropagation()}>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-archivo">Buddy List</h3>
                      <button 
                        onClick={() => setShowBuddyList(false)} 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M12.854 4.854a.5.5 0 0 0-.708-.708L8 8.293 3.854 4.146a.5.5 0 1 0-.708.708L7.293 9l-4.147 4.146a.5.5 0 0 0 .708.708L8 9.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 9l4.147-4.146z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="overflow-y-auto max-h-[calc(70vh-80px)]">
                      <MyBuddyList />
                    </div>
                  </div>
                </div>
              )}

              {/* <div className="space-y-3 flex justify-center items-center flex-col">
                <Button className="w-full py-3 bg-[#A9B0C2] dark:bg-gray-600 max-w-[33.75rem] font-semibold text-lg border border-[#A9B0C2] dark:border-gray-600 text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200">
                  {t.unfriend}
                </Button>
                <Button className="w-full py-3 bg-transparent text-[#FF0000] dark:text-red-400 font-semibold text-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                  {t.blockUser}
                </Button>
              </div> */}
            </div>
          </>
        )}
      </div>
            {showBookWithBuddy && <CreateBuddyBooking isOpen={showBookWithBuddy} setIsOpenCardModal={setShowBookWithBuddy} user={user} selectedBuddies=""/>}
      
      <CertificateModal 
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        certificate={selectedCertificate}
      />
      

      {/* {isErrorModalOpen && (
        <ErrorModal
          isErrorModalOpen={isErrorModalOpen}
          setErrorModalState={() => setErrorModalState(false)}
          subheading={errorModalMessage || "Error"}
        />
      )} */}
    </div>
  );
};

export default DivingProfile;
