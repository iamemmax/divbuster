"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useFetchNearestUser } from '../../api/buddy/nearestUserAround'
import { useAddBuddy } from '../../api/buddy/addBuddy'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/(auth)/api/getAuthenticatedUser'
import toast from 'react-hot-toast'

interface NearestUser {
  user_id: number;
  profile_picture: null | string;
  nickname: string;
  invite_id: string;
  first_name: string;
  last_name: string;
  email: string;
  total_dives: number;
  total_max_depth: number;
  total_bottom_time: number;
  total_reviews: number;
  distance: number;
  buddies_count: number;
  buddies_pictures: string[];
  longitude: number;
  latitude: number;
  is_buddy: boolean;
}

const BuddiesAroundMe = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const [mapReady, setMapReady] = useState(false)
  const router = useRouter()
  const { data: user } = useUser()
  const { data: nearestUsers, isLoading } = useFetchNearestUser()
  
  console.log('Nearest users data:', nearestUsers)
  console.log('Is loading:', isLoading)
  const { mutate: addBuddy, isLoading: isAddingBuddy } = useAddBuddy()

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }

      try {
        const L = (await import('leaflet')).default
        
        // Ensure DOM element is ready
        await new Promise(resolve => setTimeout(resolve, 100))
        
        if (!mapRef.current) return
        
        const map = L.map(mapRef.current, {
          preferCanvas: true
        }).setView([40.73061, -73.935242], 10)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map)

        mapInstance.current = map
        setMapReady(true)
        
        // Force map resize after initialization
        setTimeout(() => {
          if (mapInstance.current) {
            mapInstance.current.invalidateSize()
          }
        }, 200)
      } catch (error) {
        console.error('Map initialization failed:', error)
      }
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
    ;(window as any).viewProfile = (userId: number) => {
      router.push(`/div-buddies/profile/${userId}`)
    }
    
    ;(window as any).addBuddyAction = (userId: number, inviteId: string) => {
      addBuddy({
        user_id: userId,
        invite_id: inviteId,
        lang: user?.data?.profile_details?.language || 'en'
      }, {
        onSuccess: () => {
          toast.success('Buddy request sent successfully')
        },
        onError: () => {
          toast.error('Failed to send buddy request')
        }
      })
    }

    if (!mapReady || !mapInstance.current || !nearestUsers || !Array.isArray(nearestUsers) || nearestUsers.length === 0) {
      return
    }

    const addMarkersAsync = async () => {
      try {
        const L = (await import('leaflet')).default
        
        // Clear existing markers
        mapInstance.current.eachLayer((layer: any) => {
          if (layer instanceof L.Marker) {
            mapInstance.current.removeLayer(layer)
          }
        })

        // Add markers for each user
        nearestUsers.forEach((nearestUser) => {
          if (nearestUser.latitude && nearestUser.longitude && !isNaN(nearestUser.latitude) && !isNaN(nearestUser.longitude)) {
            const createUserIcon = () => {
              return L.divIcon({
                html: nearestUser.profile_picture 
                  ? `<div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 3px solid #3b82f6; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"><img src="${nearestUser.profile_picture}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;"/></div>`
                  : `<div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #3b82f6; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">${nearestUser.first_name[0]}${nearestUser.last_name[0]}</div>`,
                className: 'custom-div-icon',
                iconSize: [40, 40],
                iconAnchor: [20, 40]
              })
            }

            const marker = L.marker([nearestUser.latitude, nearestUser.longitude], { icon: createUserIcon() })
              .addTo(mapInstance.current)

            const popupContent = `
              <div style="padding: 12px; min-width: 250px; font-family: Arial, sans-serif;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  ${nearestUser.profile_picture 
                    ? `<img src="${nearestUser.profile_picture}" alt="Profile" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"/>` 
                    : `<div style="width: 40px; height: 40px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; color: #6b7280; font-weight: bold;">${nearestUser.first_name[0]}</div>`
                  }
                  <div>
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937;">${nearestUser.first_name} ${nearestUser.last_name}</h3>
                    <p style="margin: 0; font-size: 12px; color: #6b7280;">@${nearestUser.nickname}</p>
                  </div>
                </div>
                <div style="margin-bottom: 12px; font-size: 12px; color: #6b7280;">
                  <p style="margin: 2px 0;">Email: ${nearestUser.email}</p>
                  <p style="margin: 2px 0;">Total Dives: ${nearestUser.total_dives}</p>
                  <p style="margin: 2px 0;">Max Depth: ${nearestUser.total_max_depth}m</p>
                  <p style="margin: 2px 0;">Distance: ${nearestUser.distance.toFixed(1)}km</p>
                </div>
                <div style="display: flex; gap: 8px;">
                  <button onclick="viewProfile(${nearestUser.user_id})" style="flex: 1; background: #3b82f6; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">View Profile</button>
                  ${!nearestUser.is_buddy 
                    ? `<button onclick="addBuddyAction(${nearestUser.user_id}, '${nearestUser.invite_id}')" style="flex: 1; background: #10b981; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">Add Buddy</button>`
                    : `<span style="flex: 1; background: #6b7280; color: white; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center;">Already Buddy</span>`
                  }
                </div>
              </div>
            `

            marker.bindPopup(popupContent)
          }
        })

        // Center map on first user or default location
        if (nearestUsers.length > 0 && nearestUsers[0].latitude && nearestUsers[0].longitude) {
          mapInstance.current.setView([nearestUsers[0].latitude, nearestUsers[0].longitude], 12)
        }
      } catch (error) {
        console.error('Error adding markers:', error)
      }
    }

    addMarkersAsync()

    return () => {
      delete (window as any).viewProfile
      delete (window as any).addBuddyAction
    }
  }, [nearestUsers, router, addBuddy, user, mapReady])

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading nearby buddies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[83vh] mt-[4rem]">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style jsx global>{`
        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
      <div ref={mapRef} className="w-full h-full" />
      
      {(!nearestUsers || nearestUsers.length === 0) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <div className="text-center">
            <p className="text-gray-600 text-lg">No nearby buddies found</p>
            <p className="text-gray-500 text-sm mt-2">Try expanding your search area</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BuddiesAroundMe