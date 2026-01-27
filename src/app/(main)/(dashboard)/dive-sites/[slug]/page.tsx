"use client"
import Header from '@/app/(main)/components/shared/Header'
import React from 'react'
import { useFetchSingleDiveSite } from '../../api/div-sites/fetchSingleDiveSite'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useFetchCountry } from '../../api/fetchCountry'
import CupIcon from '@/app/icons/(dashboard)/CupIcon'
import { DiveSiteSkeleton } from '@/components/core'
import { useLanguage } from '@/hooks/useLanguage'
import { diveSiteDetailsTranslations } from '@/app/(main)/translation/diveSitesTranslation'
import { useFetchDiveReview } from '../../api/div-sites/fetchDivSitesReview'

const DiveSiteDetailsPage = () => {
    const params = useParams()
    const { data, isLoading, error } = useFetchSingleDiveSite(String(params?.slug))
    const { data:diveReviewData, } = useFetchDiveReview(String(params?.slug))
  
    const { data: country } = useFetchCountry()
    const { language } = useLanguage()
    const t = diveSiteDetailsTranslations[language] || diveSiteDetailsTranslations.en
    
    const getCountry = (id: number) => {
        const filterCountry = country?.results?.find((con) => con?.id === id)
        return filterCountry
    }
    
    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-900">
                <Header title={t.title} subtitle="" />
                <div className="p-6">
                    <DiveSiteSkeleton />
                </div>
            </div>
        )
    }
    
    if (error || !data?.data) {
        return (
            <div className="bg-white dark:bg-gray-900">
                <Header title={t.title} subtitle="" />
                <div className="text-center py-8 text-red-600 dark:text-red-400">{t.error}</div>
            </div>
        )
    }
    
    const site = data.data
    
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <Header title={site.title} subtitle="" />
            
            <div className="p-6">
                {/* Hero Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                    <div 
                        className="relative rounded-lg overflow-hidden min-h-[300px] bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/dashboard/profile-Location.png')" }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-40" />
                        <div className="absolute top-0 text-white py-6 px-6 w-full flex justify-center flex-col h-full">
                            <div>
                                <div className="flex items-center flex-wrap gap-5 mb-4">
                                    <div className="relative h-[50px] w-[65px] overflow-hidden rounded">
                                        {getCountry(site?.country)?.alpha2code ? (
                                            <Image
                                                src={`https://flagcdn.com/w40/${getCountry(site?.country)?.alpha2code?.toLowerCase()}.png`}
                                                alt={`${getCountry(site?.country)?.name} flag`}
                                                fill
                                                className="object-cover rounded"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement
                                                    target.src = '/images/placeholder-flag.png'
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-300 rounded flex items-center justify-center">
                                                <span className="text-xs text-gray-600">?</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center flex-wrap gap-4">
                                        <p className="text-white font-archivo font-semibold text-2xl">
                                            {site?.title}
                                        </p>
                                        <div className="flex items-center bg-[#C5EFFF] min-w-[100px] justify-center gap-2 py-2 px-3 rounded-lg">
                                            <CupIcon />
                                            <p className="font-archivo text-sm text-[#132346] font-semibold">
                                                {t.rank}: {site?.ranking}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="font-semibold py-3 text-xl text-white mb-4">
                                    {site?.address}
                                </h2>

                                <div className="flex gap-x-3 py-3 flex-wrap mb-4">
                                    {site?.site_type?.split(",")?.map((tag, idx) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-2 rounded-2xl text-sm bg-[#EFF8FF] text-[#175CD3]"
                                        >
                                            {tag.trim()}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <p className="text-[#F7F7F7]">
                                        {t.latitude}: <span className="font-semibold">{site?.lag}</span>
                                    </p>
                                    <p className="text-[#F7F7F7]">
                                        {t.longitude}: <span className="font-semibold">{site?.lon}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.siteInformation}</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t.rating}:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{site.average_rating}/5 ⭐</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t.maxDepth}:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{site.max_depth}m</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t.diveCount}:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{site.dive_count}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t.entryType}:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{site.entry_type}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.siteDetails}</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t.waterType}:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{site.water_type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t.waterBody}:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{site.water_body}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t.parking}:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{site.parking_available ? `✅ ${t.available}` : `❌ ${t.notAvailable}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t.publicSite}:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{site.public_site ? `✅ ${t.yes}` : `❌ ${t.no}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Dive Animals */}
                {site.dive_animals && site.dive_animals.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.diveAnimals || 'Marine Life'}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {site.dive_animals.map((animal) => (
                                <div key={animal.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="relative w-full h-40 xl:h-44 mb-3 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600">
                                        {animal.image ? (
                                            <Image
                                                src={animal.image}
                                                alt={animal.name}
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/images/placeholder-animal.png';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-4xl">🐠</span>
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{animal.name}</h4>
                                    {animal.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{animal.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Description */}
                {site.description && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{t.description}</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{site.description}</p>
                    </div>
                )}
                
                {/* Conditions */}
                {site.conditions && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{t.conditions}</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{site.conditions}</p>
                    </div>
                )}
                
                {/* Additional Information */}
                {site.additional_information && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{t.additionalInfo}</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{site.additional_information}</p>
                    </div>
                )}
                
                {/* Underwater Map */}
                {site.under_water_map_url && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{t.underwaterMap}</h3>
                        <img 
                            src={site.under_water_map_url} 
                            alt="Underwater map" 
                            className="w-full max-w-2xl mx-auto rounded-lg"
                        />
                    </div>
                )}

                {/* Reviews Section */}
                {diveReviewData && diveReviewData.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Reviews ({diveReviewData.length})</h3>
                        <div className="space-y-4">
                            {diveReviewData.map((review) => (
                                <div key={review.id} className="border-b border-gray-200 dark:border-gray-600 pb-4 last:border-b-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg
                                                        key={star}
                                                        className={`w-4 h-4 ${
                                                            star <= review.score
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300 dark:text-gray-600'
                                                        }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                        />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {review.score}/5
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(review.created_on).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DiveSiteDetailsPage