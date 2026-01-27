"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";

import Header from "@/app/(main)/components/shared/Header";
import ShareIcon from "@/app/icons/(dashboard)/ShareIcon";
import { Button, LinkButton } from "@/components/core";
import CardHeadIcon from "@/app/icons/(dashboard)/CardHeadIcon";
import { cn } from "@/utils/classNames";
import { certificates, Userarchievement, Archievement } from "../../api/buddy/fetchBuddyProfile";
import { useAuth } from "@/contexts/authentication";
import { useFetchCountry } from "../../api/fetchCountry";
import { profileTranslations } from "@/app/(main)/translation/diveBuddiesTranslation";
import { useLanguage } from "@/hooks/useLanguage";
import CertificateModal from "@/app/(main)/components/certifications/CertificateModal";
import { selectedCardBg } from "@/app/(main)/components/shared/CardContainer";

const UserProfile = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const { user } = authState;
  const [selectedCertificate, setSelectedCertificate] = useState<certificates | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [locationName, setLocationName] = useState<string>('');

  const { language } = useLanguage();
  const t = profileTranslations[language] || profileTranslations?.en;

  const { data: country } = useFetchCountry();
  const getCountry = (id: number) => {
    const filterCountry = country?.results?.find((con) => con?.id === id);
    return filterCountry;
  };

  useEffect(() => {
    const getLocationName = async () => {
      if (user?.current_location?.lat && user?.current_location?.lon) {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${user.current_location.lat}+${user.current_location.lon}&key=YOUR_API_KEY`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const result = data.results[0];
            const city = result.components.city || result.components.town || result.components.village;
            const country = result.components.country;
            setLocationName(city ? `${city}, ${country}` : country);
          }
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      }
    };
    getLocationName();
  }, [user?.current_location]);

  const handleShare = useCallback((title: string): void => {
    if (navigator.share) {
      navigator.share({
        title: `Dive Profile: ${title}`,
        text: 'Check out this dive plan!',
        url: window.location.href,
      }).catch((err) => console.log('Error sharing:', err));
    } else {
      navigator.clipboard?.writeText(window.location.href);
      console.log('Link copied to clipboard');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header title={t.title} subtitle="" />

      <div className="h-[88vh]">
        <div className="relative bg-white dark:bg-gray-900 transition-colors duration-200">
          <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="relative h-28 md:h-60 overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1463154545680-d59320fd685d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')"
                }}
              ></div>
            </div>
            <div className="relative px-0 md:px-8 pb-3 bg-white dark:bg-gray-900 transition-colors duration-200">
              <div className="absolute -top-16 left-8 flex items-center gap-5">
                <div className="md:w-28 md:h-28 h-14 w-14 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden transition-colors duration-200">
                  <div
                    className="w-full h-full md:bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${user?.profile_details?.profile_picture})`
                    }}
                  ></div>
                </div>
                <div className="pt-20">
                  <div className="mb-8">
                    <h1 className="2xl:text-3xl text-sm md:text-xl font-medium font-archivo text-[#101828] dark:text-gray-100 mb-1 transition-colors duration-200">
                      {user?.profile_details?.nickname ?? ""}
                    </h1>
                    <p className="text-[#667085] dark:text-gray-400 font-archivo text-xs md:text-base transition-colors duration-200">
                      {user?.username ?? ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute top-[4.5rem] md:top-8 right-8">
                <Button
                  variant={"outlined"}
                  className="bg-white dark:bg-gray-800 text-[#344054] dark:text-gray-300 px-4 py-[.625rem] font-archivo font-medium rounded-lg border border-[#D0D5DD] dark:border-gray-600 transition-colors duration-200 text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => router.push('/settings')}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[6.125rem] px-3 md:px-6 py-6">
          <div className="space-y-6 pb-12 border border-[#EAECF0] dark:border-gray-700 rounded-lg shadow-sm dark:shadow-gray-700/20 transition-colors duration-200 overflow-y-auto h-full">
            {/* Profile Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg pb-8 transition-colors duration-200">
              <div className="p-7 border-b border-[#EAECF0] dark:border-gray-700 transition-colors duration-200">
                <div className="flex items-center flex-wrap justify-between">
                  <h2 className="text-xl font-medium text-[#101828] dark:text-gray-100 font-archivo transition-colors duration-200">
                    {t.profileDetails}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <Button className="flex items-center bg-transparent space-x-2 px-4 py-[.625rem] rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200" onClick={() => handleShare("profile")}>
                      <ShareIcon />
                      <span>{t.shareProfile}</span>
                    </Button>
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

                  <div className="absolute flex justify-center items-center -bottom-4 left-4 right-4">
                    <div
                      className="bg-white dark:bg-gray-800 max-w-[500px] w-full rounded-[1.25rem] py-[1.45rem] px-[3.9375rem] transition-colors duration-200"
                      style={{
                        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.06)"
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-16 h-16 flex items-center justify-center relative overflow-hidden rounded">
                          {user?.profile_details?.country && getCountry(user.profile_details.country)?.alpha2code ? (
                            <img
                              src={`https://flagcdn.com/w40/${getCountry(user.profile_details.country)?.alpha2code?.toLowerCase()}.png`}
                              alt={`${getCountry(user.profile_details.country)?.name} flag`}
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
                              {user?.diver_profile?.last_dive_detail?.name || 'No dive location'}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-200">
                            {user?.profile_details?.country ? getCountry(user.profile_details.country)?.name : 'Location not available'}
                          </p>
                          <div className="flex gap-x-2 items-center">
                            {user?.diver_profile?.last_dive_detail?.water_type && <div className="text-[#6941C6] bg-[#F9F5FF] dark:bg-purple-900/30 dark:text-purple-300 px-[.8125rem] py-1 rounded-2xl text-xs font-medium cursor-pointer transition-colors duration-200">
                              {user.diver_profile.last_dive_detail.water_type}
                            </div>}
                            {user?.diver_profile?.last_dive_detail?.water_body && <div className="px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] dark:bg-blue-900/30 text-[#175CD3] dark:text-blue-300 cursor-pointer transition-colors duration-200">
                              {user.diver_profile.last_dive_detail.water_body}
                            </div>}
                            {user?.diver_profile?.last_dive_detail?.entry_type && <div className="px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] dark:bg-blue-900/30 text-[#175CD3] dark:text-blue-300 cursor-pointer transition-colors duration-200">
                              {user.diver_profile.last_dive_detail.entry_type}
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
                </div>
              </div>

              {user?.certificates && user.certificates.length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-5 py-6 px-8">
                  {user.certificates.map((card: certificates, idx: number) => (
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

              {user?.certificates && user.certificates.length > 0 && (
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
                </div>
              </div>

              {user?.user_archievements && user.user_archievements.length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-5 py-6 px-8">
                  {user.user_archievements.flatMap((ua: Userarchievement) => ua.archievements).map((achievement: Archievement, idx: number) => (
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
        </div>
      </div>

      <CertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        certificate={selectedCertificate}
      />
    </div>
  );
};

export default UserProfile;