"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { buddyResult } from '../../api/buddy/fetchBudies'
import CreateBuddyBooking from '../../bookings/components/modals/buddy-booking/CreateBuddyBooking'
import { useAuth } from '@/contexts/authentication'

interface prop {
    buddyList: buddyResult[]
    isLoading?: boolean
}

const CreateBuddyPlanMap = ({ buddyList, isLoading }: prop) => {
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
        const profilePicture = buddy.profile_details?.profile_picture
        const fullName = `${buddy.first_name} ${buddy.last_name}`.trim() || buddy.username
        const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        const lat = Number(buddy?.current_location?.lat)
        const lng = Number(buddy?.current_location?.lon)
        // const bio = buddy.profile_details?.bio || 'No bio available'

        const avatarContent = profilePicture 
            ? `<img 
                src="${profilePicture}" 
                alt="${fullName}"
                style="
                    width: 50px; 
                    height: 50px; 
                    border-radius: 50%; 
                    object-fit: cover; 
                    border: 2px solid #e5e7eb;
                    flex-shrink: 0;
                "
            />`
            : `<div style="
                width: 50px; 
                height: 50px; 
                border-radius: 50%; 
                background: #3b82f6; 
                color: white; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-weight: bold; 
                font-size: 18px; 
                border: 2px solid #e5e7eb;
                flex-shrink: 0;
            ">${initials}</div>`

      return `
    <div style="
        padding: 12px; 
        max-width: 300px; 
        width: calc(100vw - 40px);
        font-family: Arial, sans-serif;
    ">
        <div style="
            display: flex; 
            align-items: center; 
            gap: 12px; 
            margin-bottom: 12px;
            flex-wrap: wrap;
        ">
            ${avatarContent}
            <div style="flex: 1; min-width: 0;">
                <h3 style="
                    margin: 0; 
                    font-size: clamp(14px, 4vw, 16px); 
                    font-weight: 600; 
                    color: #1f2937;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                ">${fullName}</h3>
                <p style="
                    margin: 4px 0 0 0; 
                    font-size: clamp(11px, 3vw, 12px); 
                    color: #6b7280;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                ">@${buddy.username}</p>
            </div>
        </div>
        
        <div style="
            margin-bottom: 12px; 
            font-size: clamp(11px, 3vw, 13px); 
            color: #4b5563;
        ">
            <div style="
                margin-bottom: 8px;
            ">
                <div style="color: #6b7280; margin-bottom: 2px;">Location:</div>
                <strong style="
                    color: #1f2937;
                    font-size: clamp(11px, 3vw, 12px);
                    display: block;
                ">Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}</strong>
            </div>
            
            ${buddy.diver_profile ? `
                <div style="margin-bottom: 8px;">
                    <div style="color: #6b7280; margin-bottom: 2px;">Certification Level:</div>
                    <strong style="
                        color: #1f2937;
                        display: block;
                    ">${buddy.diver_profile.certification_level || 'Not specified'}</strong>
                </div>
            ` : ''}
        </div>
        
        <button 
            onclick="handleCreatePlan('${buddy?.username}')" 
            style="
                width: 100%; 
                max-width: 280px;
                background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
                color: white; 
                border: none; 
                padding: 10px 16px; 
                border-radius: 8px; 
                font-size: clamp(12px, 3.5vw, 14px); 
                font-weight: 600; 
                cursor: pointer;
                transition: opacity 0.2s;
            "
            onmouseover="this.style.opacity='0.9'"
            onmouseout="this.style.opacity='1'"
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
        console.log('CreateBuddyPlanMap - Adding markers for buddies:', buddies?.length || 0)
        if (!buddies || buddies.length === 0 || !mapInstance.current) {
            console.log('CreateBuddyPlanMap - No buddies or map not ready')
            return
        }

        const L = require('leaflet')

        buddies.forEach((buddy, index) => {
            const lat = Number(buddy?.current_location?.lat)
            const lng = Number(buddy?.current_location?.lon)
            
            console.log(`CreateBuddyPlanMap - Buddy ${index}:`, { lat, lng, buddy: buddy.username })

            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = L.marker([lat, lng], { icon: createCustomMarkerIcon(buddy) })
                    .addTo(mapInstance.current)
                    .bindPopup(createInfoWindowContent(buddy))

                markersRef.current.push(marker)
                console.log(`CreateBuddyPlanMap - Marker added for ${buddy.username} at [${lat}, ${lng}]`)
            } else {
                console.log(`CreateBuddyPlanMap - Invalid coordinates for ${buddy.username}:`, { lat, lng })
            }
        })
    }, [createCustomMarkerIcon, createInfoWindowContent])

    useEffect(() => {
        const initMap = async () => {
            if (!mapRef.current) return
            
            // Clean up existing map
            if (mapInstance.current) {
                mapInstance.current.remove()
                mapInstance.current = null
            }

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
        console.log('CreateBuddyPlanMap - Buddy list updated:', buddyList?.length || 0)
        if (mapInstance.current && buddyList) {
            clearMarkers()
            addMarkers(buddyList)
        }
    }, [buddyList, addMarkers, clearMarkers])



    return (
        <div className="relative w-full h-[83vh] mt-[4rem] dark:bg-gray-900">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <style jsx global>{`
                .custom-buddy-icon {
                    background: transparent !important;
                    border: none !important;
                }
            `}</style>
            <div ref={mapRef} className="w-full h-full" id={`buddy-map-${Math.random().toString(36).substr(2, 9)}`} />
            
            {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center z-[1000]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-300">Loading dive buddies...</p>
                    </div>
                </div>
            )}



            {showDivePlanModal && (
                <div className="fixed inset-0 z-[999999999999999999] flex items-center justify-center p-4">
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