"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { diveSiteResult, divSitesProp } from '../../api/div-sites/fetch-dive-sites'
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query'

interface prop {
    diveSites: diveSiteResult[]
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<divSitesProp, unknown>>
}

const GoogleMap = ({ diveSites}: prop) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<google.maps.Map | null>(null)
    const markersRef = useRef<google.maps.Marker[]>([])
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    
    // Function to clear existing markers
    const clearMarkers = useCallback(() => {
        markersRef.current.forEach(marker => {
            marker.setMap(null)
        })
        markersRef.current = []
    }, [])

    // Function to add markers for dive sites
    const addMarkers = useCallback((sites: diveSiteResult[], map: google.maps.Map) => {
        if (!sites || sites.length === 0) return

        sites.forEach((site, index) => {
            const lat = Number(site?.lag)
            const lng = Number(site?.lon)

            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = new google.maps.Marker({
                    position: { lat, lng },
                    map: map,
                    title: site?.title || `Dive Site ${index + 1}`
                })

                markersRef.current.push(marker)
            }
        })
    }, [])



    // Initialize map once
    useEffect(() => {
        const initMap = async () => {
            if (!mapRef.current || mapInstance.current) return
            
            try {
                const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                if (!apiKey) {
                    console.error('Google Maps API key is missing')
                    return
                }
                
                const loader = new Loader({
                    apiKey,
                    version: "quarterly",
                    libraries: ["places"]
                })
                
                const { Map } = await loader.importLibrary("maps")
                
                const options: google.maps.MapOptions = {
                    center: { lat: 40.73061, lng: -73.935242 },
                    zoom: 10,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    streetViewControl: false
                }
                
                const map = new Map(mapRef.current, options)
                mapInstance.current = map
                setIsMapLoaded(true)
                
            } catch (error) {
                console.error('Error initializing Google Maps:', error)
            }
        }

        initMap()
    }, [])

    // Update markers when diveSites change
    useEffect(() => {
        if (isMapLoaded && mapInstance.current && diveSites?.length > 0) {
            clearMarkers()
            addMarkers(diveSites, mapInstance.current)
            
            // Center map on dive sites
            const validSites = diveSites.filter(site => 
                site?.lag && site?.lon && 
                !isNaN(Number(site.lag)) && !isNaN(Number(site.lon))
            )
            
            if (validSites.length > 0) {
                const avgLat = validSites.reduce((sum, site) => sum + Number(site.lag), 0) / validSites.length
                const avgLng = validSites.reduce((sum, site) => sum + Number(site.lon), 0) / validSites.length
                mapInstance.current.setCenter({ lat: avgLat, lng: avgLng })
                mapInstance.current.setZoom(validSites.length > 1 ? 10 : 15)
            }
        }
    }, [diveSites, isMapLoaded, addMarkers, clearMarkers])

  

    return (
        <div className="relative w-full h-[83vh] mt-[4rem] dark:bg-gray-900">
            {!isMapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
                    </div>
                </div>
            )}
            <div ref={mapRef} className="w-full h-full" />
        </div>
    )
}

export default GoogleMap