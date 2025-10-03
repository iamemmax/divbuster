

"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query'
import { buddyListProp, buddyResult } from '../../api/buddy/fetchBudies'
import { createRoot } from "react-dom/client";
import MapMarker from '@/app/icons/(dashboard)/MapMarker'
import CreateBuddyBooking from '../../bookings/components/modals/buddy-booking/CreateBuddyBooking'
import { useAuth } from '@/contexts/authentication'


interface prop {
    buddyList: buddyResult[]
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<buddyListProp, unknown>>
}

// Create a single loader instance outside the component
const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: "quarterly",
    libraries: ["places"]
})

const CreateBuddyPlanMap = ({ fetchNextPage, buddyList, hasNextPage, isFetchingNextPage }: prop) => {

    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<google.maps.Map | null>(null)
    const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])
    const infoWindowsRef = useRef<google.maps.InfoWindow[]>([])
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    const [selectedBuddy, setSelectedBuddy] = useState("")
    const [showDivePlanModal, setShowDivePlanModal] = useState(false)
    const { authState } = useAuth()
    const { user } = authState

    // Function to clear existing markers and info windows
    const clearMarkers = useCallback(() => {
        markersRef.current.forEach(marker => {
            marker.map = null
        })
        infoWindowsRef.current.forEach(infoWindow => {
            infoWindow.close()
        })
        markersRef.current = []
        infoWindowsRef.current = []
    }, [])

    // Function to create info window content
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
                    onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.4)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
                >
                    Create Dive Plan
                </button>
            </div>
        `
    }, [])

    // Function to handle create plan button click
    const handleCreatePlan = (data: string) => {
        console.log(data);
        
        setSelectedBuddy(data)
        setShowDivePlanModal(true)
    }

    // Make handleCreatePlan available globally for the info window
    useEffect(() => {
        (window as any).handleCreatePlan = (buddyId:string) => {
            handleCreatePlan(buddyId as string)
        }

        return () => {
            delete (window as any).handleCreatePlan
        }
    }, [handleCreatePlan])

    // Function to create custom marker element
    const createCustomMarkerElement = useCallback(() => {
        const container = document.createElement("div")
        const root = createRoot(container)
        root.render(
            <div className="w-10 h-10 flex items-center justify-center rounded-full shadow-lg ">
                <MapMarker className="w-10 h-10 text-blue-500" />
            </div>
        )
        return container
    }, [])

    // Function to add markers for buddies
    const addMarkers = useCallback(async (buddies: buddyResult[], map: google.maps.Map) => {
        if (!buddies || buddies.length === 0) return

        try {
            // Use the shared loader instance
            const { AdvancedMarkerElement } = await loader.importLibrary("marker") as google.maps.MarkerLibrary
            const { InfoWindow } = await loader.importLibrary("maps") as google.maps.MapsLibrary

            buddies.forEach((buddy, index) => {
                const lat = Number(buddy?.current_location?.lat)
                const lng = Number(buddy?.current_location?.lon)

                // Only create marker if coordinates are valid
                if (!isNaN(lat) && !isNaN(lng)) {
                    const marker = new AdvancedMarkerElement({
                        position: { lat, lng },
                        map,
                        content: createCustomMarkerElement(),
                        title: buddy.username,
                    })

                    // Create info window
                    const infoWindow = new InfoWindow({
                        content: createInfoWindowContent(buddy),
                        ariaLabel: `${buddy.first_name} ${buddy.last_name}`.trim() || buddy.username
                    })

                    // Add click listener to marker
                    marker.addListener('click', () => {
                        // Close all other info windows
                        infoWindowsRef.current.forEach(iw => iw.close())

                        // Open this info window
                        infoWindow.open({
                            anchor: marker,
                            map: map
                        })
                    })

                    markersRef.current.push(marker)
                    infoWindowsRef.current.push(infoWindow)
                }
            })
        } catch (error) {
            console.error('Error adding markers:', error)
        }
    }, [createCustomMarkerElement, createInfoWindowContent])

    // Function to handle map bounds change (trigger load more data)
    const handleBoundsChanged = useCallback(() => {
        if (!mapInstance.current || !hasNextPage || isFetchingNextPage) return

        const bounds = mapInstance.current.getBounds()
        if (!bounds) return

        const center = mapInstance.current.getCenter()
        if (center) {
            fetchNextPage()
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    // Initialize map
    useEffect(() => {
        const initMap = async () => {
            try {
                // Use the shared loader instance
                const { Map } = await loader.importLibrary("maps")

                // Calculate center from buddy locations if available
                let centerLocation = { lat: 40.73061, lng: -73.935242 } // Default location

                if (buddyList && buddyList.length > 0) {
                    const validBuddies = buddyList.filter(buddy =>
                        buddy?.current_location?.lat && buddy?.current_location?.lon &&
                        !isNaN(Number(buddy.current_location?.lat)) && !isNaN(Number(buddy.current_location?.lon))
                    )

                    if (validBuddies.length > 0) {
                        const avgLat = validBuddies.reduce((sum, buddy) => sum + Number(buddy?.current_location?.lat), 0) / validBuddies.length
                        const avgLng = validBuddies.reduce((sum, buddy) => sum + Number(buddy?.current_location?.lon), 0) / validBuddies.length
                        centerLocation = { lat: avgLat, lng: avgLng }
                    }
                }

                const options: google.maps.MapOptions = {
                    center: centerLocation,
                    zoom: buddyList && buddyList.length > 1 ? 10 : 15,
                    mapId: "map",
                    mapTypeControl: false,
                    fullscreenControl: false,
                    streetViewControl: false
                }

                const map = new Map(mapRef.current as HTMLElement, options)
                mapInstance.current = map

                // Add event listeners
                map.addListener('bounds_changed', () => {
                    setTimeout(handleBoundsChanged, 1000)
                })

                map.addListener('idle', () => {
                    if (hasNextPage && !isFetchingNextPage) {
                        // Optional: Auto-fetch when map becomes idle
                        // fetchNextPage()
                    }
                })

                setIsMapLoaded(true)

            } catch (error) {
                console.error('Error initializing Google Maps:', error)
            }
        }

        if (!isMapLoaded) {
            initMap()
        }
    }, [isMapLoaded, handleBoundsChanged, buddyList])

    // Update markers when buddyList changes
    useEffect(() => {
        if (isMapLoaded && mapInstance.current && buddyList) {
            clearMarkers()
            addMarkers(buddyList, mapInstance.current)
        }
    }, [buddyList, isMapLoaded, addMarkers, clearMarkers])

    // Manual load more function
    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    return (
        <div className="relative w-full h-[83vh] mt-[4rem] dark:bg-gray-900">
            <div ref={mapRef} className="w-full h-full" />

            {/* Load More Button */}
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

            {/* Loading indicator */}
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

export default CreateBuddyPlanMap