"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query'
import { buddyListProp, buddyResult } from '../../api/buddy/fetchBudies'
import CreateBuddyBooking from '../../bookings/components/modals/buddy-booking/CreateBuddyBooking'
import { useAuth } from '@/contexts/authentication'

interface prop {
    buddyList: buddyResult[]
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<buddyListProp, unknown>>
}

const BuddyLeafletMap = ({ fetchNextPage, buddyList, hasNextPage, isFetchingNextPage }: prop) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<any>(null)
    const markersRef = useRef<any[]>([])
    const [selectedBuddy, setSelectedBuddy] = useState("")
    const [showDivePlanModal, setShowDivePlanModal] = useState(false)
    const { authState } = useAuth()
    const { user } = authState

    const clearMarkers = useCallback(() => {
        markersRef.current.forEach(marker => {
            mapInstance.current?.removeLayer(marker)
        })
        markersRef.current = []
    }, [])

    const createInfoWindowContent = useCallback((buddy: buddyResult) => {
        const profilePicture = buddy.profile_details?.profile_picture || '/default-avatar.png'
        const fullName = `${buddy.first_name} ${buddy.last_name}`.trim() || buddy.username

        return `
            <div style="padding: 12px; min-width: 200px; font-family: Arial, sans-serif;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <img 
                        src="${profilePicture}" 
                        alt="${fullName}"
                        style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #e5e7eb;"
                    />
                    <div>
                        <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937;">${fullName}</h3>
                        <p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">@${buddy.username}</p>
                    </div>
                </div>
                
                ${buddy.diver_profile ? `
                    <div style="margin-bottom: 12px; font-size: 12px; color: #4b5563;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span>Certification Level:</span>
                            <strong>${buddy.diver_profile.certification_level || 'Not specified'}</strong>
                        </div>
                    </div>
                ` : ''}
                
                <button 
                    onclick="handleCreatePlan('${buddy?.username}')" 
                    style="
                        width: 100%; 
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
                        color: white; 
                        border: none; 
                        padding: 10px 16px; 
                        border-radius: 8px; 
                        font-size: 14px; 
                        font-weight: 600; 
                        cursor: pointer;
                        transition: all 0.2s ease;
                    "
                >
                    Create Dive Plan
                </button>
            </div>
        `
    }, [])

    const handleCreatePlan = (data: string) => {
        setSelectedBuddy(data)
        setShowDivePlanModal(true)
    }

    useEffect(() => {
        (window as any).handleCreatePlan = (buddyId: string) => {
            handleCreatePlan(buddyId as string)
        }

        return () => {
            delete (window as any).handleCreatePlan
        }
    }, [handleCreatePlan])

    const createCustomMarkerIcon = useCallback((buddy: buddyResult) => {
        const L = require('leaflet')
        const profilePicture = buddy.profile_details?.profile_picture
        const fullName = `${buddy.first_name} ${buddy.last_name}`.trim() || buddy.username
        const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        
        const markerContent = profilePicture 
            ? `<img src="${profilePicture}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 3px solid white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);" />`
            : `<div style="width: 40px; height: 40px; border-radius: 50%; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 3px solid white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">${initials}</div>`
        
        return L.divIcon({
            html: markerContent,
            className: 'custom-buddy-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        })
    }, [])

    const addMarkers = useCallback(async (buddies: buddyResult[]) => {
        if (!buddies || buddies.length === 0 || !mapInstance.current) return

        console.log('Adding markers for buddies:', buddies.length)
        const L = require('leaflet')

        buddies.forEach((buddy, index) => {
            const lat = Number(buddy?.current_location?.lat)
            const lng = Number(buddy?.current_location?.lon)
            
            console.log(`Buddy ${index}:`, { lat, lng, buddy: buddy.username })

            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = L.marker([lat, lng], { icon: createCustomMarkerIcon(buddy) })
                    .addTo(mapInstance.current)
                    .bindPopup(createInfoWindowContent(buddy))

                markersRef.current.push(marker)
                console.log(`Marker added for ${buddy.username} at [${lat}, ${lng}]`)
            } else {
                console.log(`Invalid coordinates for ${buddy.username}:`, { lat, lng })
            }
        })
    }, [createCustomMarkerIcon, createInfoWindowContent])

    useEffect(() => {
        const initMap = async () => {
            if (!mapRef.current || mapInstance.current) return

            const L = (await import('leaflet')).default

            let centerLocation = [40.73061, -73.935242] as [number, number]

            if (buddyList && buddyList.length > 0) {
                const validBuddies = buddyList.filter(buddy =>
                    buddy?.current_location?.lat && buddy?.current_location?.lon &&
                    !isNaN(Number(buddy.current_location?.lat)) && !isNaN(Number(buddy.current_location?.lon))
                )

                if (validBuddies.length > 0) {
                    const avgLat = validBuddies.reduce((sum, buddy) => sum + Number(buddy?.current_location?.lat), 0) / validBuddies.length
                    const avgLng = validBuddies.reduce((sum, buddy) => sum + Number(buddy?.current_location?.lon), 0) / validBuddies.length
                    centerLocation = [avgLat, avgLng]
                }
            }

            const map = L.map(mapRef.current).setView(centerLocation, buddyList && buddyList.length > 1 ? 10 : 15)

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map)

            mapInstance.current = map
        }

        initMap()

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove()
                mapInstance.current = null
            }
        }
    }, [])

    useEffect(() => {
        console.log('Buddy list updated:', buddyList?.length || 0)
        if (mapInstance.current && buddyList) {
            clearMarkers()
            addMarkers(buddyList)
        }
    }, [buddyList, addMarkers, clearMarkers])

    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    return (
        <div className="relative w-full h-[83vh] mt-[4rem] dark:bg-gray-900">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <style jsx global>{`
                .custom-buddy-icon {
                    background: transparent !important;
                    border: none !important;
                }
                .leaflet-div-icon {
                    background: transparent !important;
                    border: none !important;
                }
            `}</style>
            <div ref={mapRef} className="w-full h-full" id={`buddy-map-${Math.random().toString(36).substr(2, 9)}`} />

            {hasNextPage && (
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={handleLoadMore}
                        disabled={isFetchingNextPage}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isFetchingNextPage ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Loading...
                            </>
                        ) : (
                            'Load More Buddies'
                        )}
                    </button>
                </div>
            )}

            {isFetchingNextPage && (
                <div className="absolute top-4 right-4 px-3 py-2 bg-black bg-opacity-75 text-white rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Loading more buddies...
                    </div>
                </div>
            )}

            {showDivePlanModal && (
                <div className="!z-[999999999]">
                    <CreateBuddyBooking
                        isOpen={showDivePlanModal}
                        user={user}
                        setIsOpenCardModal={setShowDivePlanModal}
                        selectedBuddies={selectedBuddy}
                    />
                </div>
            )}
        </div>
    )
}

export default BuddyLeafletMap