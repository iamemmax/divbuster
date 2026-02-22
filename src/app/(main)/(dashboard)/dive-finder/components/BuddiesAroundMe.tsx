"use client"
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useFetchNearestUser } from '../../api/buddy/nearestUserAround'
import { useAddBuddy } from '../../api/buddy/addBuddy'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/(auth)/api/getAuthenticatedUser'
import toast from 'react-hot-toast'

interface BuddiesAroundMeProps {
  search?: string;
}

const BuddiesAroundMe = ({ search = "" }: BuddiesAroundMeProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const [mapReady, setMapReady] = useState(false)
  const router = useRouter()
  const { data: user } = useUser()
  const { data: nearestUsers, isLoading, error } = useFetchNearestUser()
  
  console.log('Nearest users data:', nearestUsers)
  console.log('Is loading:', isLoading)
  console.log('Error:', error)
  const { mutate: addBuddy } = useAddBuddy()

  // Filter nearest users based on search term
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return nearestUsers || [];

    const searchLower = search.toLowerCase();
    return (nearestUsers || []).filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchLower) ||
      user.nickname?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower)
    );
  }, [nearestUsers, search]);

  useEffect(() => {
    if (!mapRef.current) return
    
    import('leaflet').then(({ default: L }) => {
      if (!mapRef.current) return
      const map = L.map(mapRef.current).setView([40.73061, -73.935242], 10)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
      
      mapInstance.current = map
      setMapReady(true)
    })

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

    if (!mapReady || !mapInstance.current) {
      console.log('Marker conditions not met:', { mapReady, hasMap: !!mapInstance.current })
      return
    }

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstance.current?.removeLayer(marker)
    })
    markersRef.current = []

    if (!filteredUsers?.length) {
      console.log('No filtered users to display')
      return
    }

    console.log('Adding markers for users:', filteredUsers)

    import('leaflet').then(({ default: L }) => {
      filteredUsers.forEach((user) => {
        if (!user.latitude || !user.longitude) return

        const icon = L.divIcon({
          html: user.profile_picture
            ? `<div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 3px solid #f97316; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"><img src="${user.profile_picture}" style="width: 100%; height: 100%; object-fit: cover;"/></div>`
            : `<div style="width: 40px; height: 40px; border-radius: 50%; background: #f97316; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}</div>`,
          className: 'buddy-marker',
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        })

        const marker = L.marker([user.latitude, user.longitude], { icon })
          .addTo(mapInstance.current)

        const popup = `
          <div style="padding: 12px; min-width: 250px; font-family: Arial, sans-serif;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              ${user.profile_picture
                ? `<img src="${user.profile_picture}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"/>`
                : `<div style="width: 40px; height: 40px; border-radius: 50%; background: #f97316; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">${user.first_name?.[0] || ''}</div>`
              }
              <div>
                <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937;">${user.first_name} ${user.last_name}</h3>
                <p style="margin: 0; font-size: 12px; color: #6b7280;">@${user.nickname}</p>
              </div>
            </div>
            <div style="margin-bottom: 12px; font-size: 12px; color: #6b7280;">
              <p style="margin: 2px 0;">Total Dives: ${user.total_dives}</p>
              <p style="margin: 2px 0;">Max Depth: ${user.total_max_depth}m</p>
              <p style="margin: 2px 0;">Distance: ${user.distance?.toFixed(1)}km</p>
            </div>
            <div style="display: flex; gap: 8px;">
              <button onclick="viewProfile(${user.user_id})" style="flex: 1; background: #f97316; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">View Profile</button>
              ${!user.is_buddy
                ? `<button onclick="addBuddyAction(${user.user_id}, '${user.invite_id}')" style="flex: 1; background: #10b981; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">Add Buddy</button>`
                : `<span style="flex: 1; background: #6b7280; color: white; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center;">Already Buddy</span>`
              }
            </div>
          </div>
        `

        marker.bindPopup(popup)
        markersRef.current.push(marker)
      })

      if (filteredUsers[0]?.latitude && filteredUsers[0]?.longitude) {
        mapInstance.current.setView([filteredUsers[0].latitude, filteredUsers[0].longitude], 12)
      }
    })

    return () => {
      delete (window as any).viewProfile
      delete (window as any).addBuddyAction
    }
  }, [filteredUsers, router, addBuddy, user, mapReady])



  return (
    <div className="relative w-full h-[83vh] mt-[4rem]">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style jsx global>{`
        .buddy-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
      <div ref={mapRef} className="w-full h-full" />

      {!isLoading && filteredUsers.length === 0 && search.trim() && (
        <div className="absolute inset-0 flex items-center justify-center z-[100] bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
              No buddies found for "{search}"
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Try searching with different keywords
            </p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 z-[1000]">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
            <span className="text-sm">Loading buddies...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default BuddiesAroundMe