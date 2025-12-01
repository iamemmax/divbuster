"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  diveSiteResult,
  divSitesProp,
  useFetchDiveSites,
} from "../../api/div-sites/fetch-dive-sites";
import Image from "next/image";
import { Button, ErrorModal } from "@/components/core";
import { useFetchCountry } from "../../api/fetchCountry";
import HeartIcon from "@/app/icons/(dashboard)/HeartIcon";
import ShareIcon2 from "@/app/icons/(dashboard)/ShareIcon2";
import MessageIcon2 from "@/app/icons/(dashboard)/MessageIcon2";
import LikeIcon from "@/app/icons/(dashboard)/LikeIcon";
import { useAddFouriteDivSIte } from "../../api/div-sites/add-favorite-dive-site";
import { useAuth } from "@/contexts/authentication";
import { SmallSpinner } from "@/icons/core";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useQueryClient,
} from "react-query";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import CupIcon from "@/app/icons/(dashboard)/CupIcon";
import InfoIcon from "@/app/icons/(dashboard)/InfoIcon";
import toast from "react-hot-toast";
import { userDetails } from "@/app/(auth)/api/getAuthenticatedUser";
import { recentDivetranslations } from "@/app/(main)/translation/diveSitesTranslation";
import { useLanguage } from "@/hooks/useLanguage";
import InfiniteScroll from 'react-infinite-scroll-component';
import RatingModal from './RatingModal';
import { DiveSiteSkeleton } from '@/components/core';
import { useRouter } from "next/navigation";

interface prop {
  user: userDetails | undefined;
  data: InfiniteData<divSitesProp> | undefined;
  loading: boolean;
  search: string;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<divSitesProp, unknown>>;
}


const RecentDiveSites = ({
  data,
  loading,
  search,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: prop) => {
  const { authState } = useAuth();
  const { user } = authState;
  const userData = user;
  const { language } = useLanguage();
  const t = recentDivetranslations[language] || recentDivetranslations.en;
  const favoriteSites = user?.diver_profile.favourite_sites || [];
  const [loadingItemId, setLoadingItemId] = useState<number | null>(null);
  const [myFavourite, setMyFavourite] = useState<number[]>(favoriteSites);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedDiveSite, setSelectedDiveSite] = useState<diveSiteResult | null>(null);

  useEffect(() => {
    setMyFavourite(favoriteSites);
  }, [favoriteSites]);

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const { data: country } = useFetchCountry();
  const getCountry = (id: number) => {
    const filterCountry = country?.results?.find((con) => con?.id === id);
    return filterCountry;
  };

  const queryClient = useQueryClient();
  const { mutate: handleAddTofavorite } = useAddFouriteDivSIte();

  const handleSave = (item: diveSiteResult) => {
    setLoadingItemId(item.id);
    handleAddTofavorite(
      {
        action: "add",
        dive_site_id: item?.id,
        lang: String(userData?.profile_details?.language),
      },
      {
        onSuccess: () => {
          if (myFavourite.includes(item?.id)) {
            const removeFrmFav = myFavourite.filter((x) => x !== item?.id);
            setMyFavourite(removeFrmFav);
            toast.success(t.removed);
          } else {
            setMyFavourite((prev) => [...prev, item?.id]);
            toast.success(t.added);
          }
          queryClient.invalidateQueries({ queryKey: ["user-details"] });
          queryClient.invalidateQueries({ queryKey: ["div-sites"] });
          setLoadingItemId(null);
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModalWithMessage(String(errorMessage));
          setLoadingItemId(null);
        },
      }
    );
  };

  const allDiveSites = data?.pages?.flatMap((page) => page.data.results) || [];
  const totalCount = data?.pages?.[0]?.data.count || 0;

  const fetchMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRatingClick = (diveSite: diveSiteResult) => {
    setSelectedDiveSite(diveSite);
    setRatingModalOpen(true);
  };

  const handleShare = async (item: diveSiteResult, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/dive-sites/${item.slug}`;
    const shareData = {
      title: item.title,
      text: `Check out this dive site: ${item.title} at ${item.address}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

const router = useRouter()
  return (
    <div className="transition-colors">
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <DiveSiteSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <>
          {search && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {allDiveSites.length} of {totalCount} {t.diveSite}
                {totalCount !== 1 ? "s" : ""} found
              </p>
            </div>
          )}

          {allDiveSites.length === 0 && search && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {t.noResults} {search}
              </p>
            </div>
          )}

          <InfiniteScroll
            dataLength={allDiveSites.length}
            next={fetchMore}
            hasMore={hasNextPage || false}
            height={600}
            scrollThreshold={0.8}
            loader={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 mt-6">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <DiveSiteSkeleton key={idx} />
                ))}
              </div>
            }
            endMessage={
              allDiveSites.length > 0 ? (
                <div className="flex justify-center items-center py-8">
                  <span className="text-gray-500 text-sm">{t.end}</span>
                </div>
              ) : null
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
              {allDiveSites.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={()=>router.push(`/dive-sites/${item?.slug}`)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer p-2 px-2 md:px-4 border border-gray-200 dark:border-gray-700"
                >
                  <div 
                    className="relative rounded-lg overflow-hidden min-h-[250px] bg-cover bg-center "
                    style={{ backgroundImage: "url('/images/dashboard/profile-Location.png')" }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <div className="absolute top-0 text-white py-4 px-3 md:px-2 2xl:px-[0.75rem] w-full  flex justify-center flex-col  h-full">
                      <div>
                        <div className="flex items-center flex-wrap gap-[10px] md:gap-[20px]">
                          <div className="relative h-[30px] xl:h-[40px] w-[40px] xl:w-[52px] overflow-hidden rounded">
                            {getCountry(item?.country)?.alpha2code ? (
                              <Image
                                src={`https://flagcdn.com/w40/${getCountry(item?.country)?.alpha2code?.toLowerCase()}.png`}
                                alt={`${getCountry(item?.country)?.name} flag`}
                                fill
                                className="object-cover rounded"
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
                          <div className="flex items-center flex-wrap gap-[10px]">
                            <p className="text-white font-archivo font-semibold text-xs lg:text-sm 2xl:text-lg">
                              {item?.title}
                            </p>
                            <div className="flex items-center bg-[#C5EFFF] min-w-[80px] justify-center gap-[.3531rem] py-1 px-[.4063rem] rounded-lg">
                              <CupIcon />
                              <p className="font-archivo text-xxs text-[#132346] font-semibold">
                                {t.rank}:{item?.ranking}
                              </p>
                            </div>
                            <InfoIcon />
                          </div>
                        </div>

                        <h2 className="font-semibold py-1 md:py-3 text-xs  xl:text-lg lg:text-xl 2xl:text-2xl text-white">
                          {item?.address}
                        </h2>

                        <div className="flex gap-x-2 py-2 md:py-3 flex-wrap">
                          {item?.site_type?.split(",")?.map((tag, idx) => (
                            <div
                              key={idx}
                              className="px-[.8125rem] py-1 rounded-2xl text-xs bg-[#EFF8FF] text-[#175CD3]"
                            >
                              {tag.trim()}
                            </div>
                          ))}
                        </div>

                        <div className="py-2">
                          <p className="text-xs text-[#F7F7F7] md:text-sm font-archivo">
                            {t.latitude}: <span className="font-semibold pr-2">{item?.lag}</span> • {t.longitude}:{" "}
                            <span className="font-semibold">{item?.lon}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-2 sm:gap-5">
                      <Button
                        className={`${myFavourite?.includes(item?.id)
                            ? "bg-[#F7931D] text-white"
                            : "bg-white text-[#4D5869]"
                          } h-[2.2rem] w-[2rem] md:h-[2.8125rem] md:w-[3.75rem] rounded-2xl shrink-0 p-0 font-archivo text-xs font-medium flex items-center gap-[.3125rem]`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave(item);
                        }}
                        disabled={loadingItemId === item?.id}
                      >
                        {loadingItemId === item.id ? (
                          <SmallSpinner color={myFavourite.includes(item?.id) ? "#fff" : "#F7931D"} />
                        ) : (
                          <HeartIcon fill={myFavourite.includes(item?.id) ? "#fff" : "#fff"} />
                        )}
                      </Button>
                      {/* <Button title={t.share} className="bg-[#F9FAFB] hover:bg-gray-100 p-0 h-[2.2rem] w-[2rem] md:h-[2.8125rem] md:w-[3.75rem] rounded-xl flex justify-center items-center">
                        <LikeIcon />
                      </Button> */}
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRatingClick(item);
                        }}
                        className="bg-[#F9FAFB] hover:bg-gray-100 relative h-[2.2rem] w-[2rem] md:h-[2.8125rem] md:w-[3.75rem] rounded-xl flex justify-center items-center"
                      >
                        <div className="relative">
                          <MessageIcon2 />
                          <div className="absolute -top-4 -right-3 w-[1.3rem] h-[1.3rem] bg-[#F7931D] rounded-full flex items-center justify-center">
                            <p className="text-xs font-bold text-white">12</p>
                          </div>
                        </div>
                      </Button>
                      <Button 
                        title={t.share} 
                        onClick={(e) => handleShare(item, e)}
                        className="bg-[#F9FAFB] hover:bg-gray-100 p-0 h-[2.2rem] w-[2rem] md:h-[2.8125rem] md:w-[3.75rem] rounded-xl flex justify-center items-center"
                      >
                        <ShareIcon2 />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>

          {!search && allDiveSites.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t.noSites}</p>
            </div>
          )}
        </>
      )}

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => setErrorModalState(false)}
        subheading={errorModalMessage || "Please check your inputs and try again."}
      />
      
      {selectedDiveSite && (
        <RatingModal
          isOpen={ratingModalOpen}
          onClose={() => {
            setRatingModalOpen(false);
            setSelectedDiveSite(null);
          }}
          // onSubmit={handleRatingSubmit}
           removeModal={setRatingModalOpen}
          
          diveSiteId={selectedDiveSite.id}
          diveSiteName={selectedDiveSite.title}
        />
      )}
    </div>
  );
};

export default RecentDiveSites;