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

const GoogleMap = ({ diveSites, fetchNextPage, hasNextPage, isFetchingNextPage }: prop) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<google.maps.Map | null>(null)
    const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    
    // Function to clear existing markers
    const clearMarkers = useCallback(() => {
        markersRef.current.forEach(marker => {
            marker.map = null // Remove marker from map
        })
        markersRef.current = []
    }, [])

    // Function to add markers for dive sites
    const addMarkers = useCallback(async (sites: diveSiteResult[], map: google.maps.Map) => {
        if (!sites || sites.length === 0) return

        try {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
                version: "quarterly",
                libraries: ["places"]
            })
            
            const { AdvancedMarkerElement } = await loader.importLibrary("marker") as google.maps.MarkerLibrary

            sites.forEach((site, index) => {
                const lat = Number(site?.lag)
                const lng = Number(site?.lon)
                
                // Only create marker if coordinates are valid
                if (!isNaN(lat) && !isNaN(lng)) {
                    const marker = new AdvancedMarkerElement({
                        position: {
                            lat: lat,
                            lng: lng
                        },
                        map: map,
                        title: site?.title || `Dive Site ${index + 1}`
                    })
                    
                    markersRef.current.push(marker)
                }
            })
        } catch (error) {
            console.error('Error adding markers:', error)
        }
    }, [])

    // Function to handle map bounds change (trigger load more data)
    const handleBoundsChanged = useCallback(() => {
        if (!mapInstance.current || !hasNextPage || isFetchingNextPage) return

        const bounds = mapInstance.current.getBounds()
        if (!bounds) return

        // Check if user has panned/zoomed significantly
        // You can adjust this logic based on your needs
        const center = mapInstance.current.getCenter()
        if (center) {
            // Fetch more data when bounds change
            fetchNextPage()
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    // Initialize map
    useEffect(() => {
        const initMap = async () => {
            try {
                const loader = new Loader({
                    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
                    version: "quarterly",
                    libraries: ["places"]
                })
                
                const { Map } = await loader.importLibrary("maps")
                
                // Calculate center from dive sites if available
                let centerLocation = { lat: 40.73061, lng: -73.935242 } // Default location
                
                if (diveSites && diveSites.length > 0) {
                    const validSites = diveSites.filter(site => 
                        site?.lag && site?.lon && 
                        !isNaN(Number(site.lag)) && !isNaN(Number(site.lon))
                    )
                    
                    if (validSites.length > 0) {
                        const avgLat = validSites.reduce((sum, site) => sum + Number(site.lag), 0) / validSites.length
                        const avgLng = validSites.reduce((sum, site) => sum + Number(site.lon), 0) / validSites.length
                        centerLocation = { lat: avgLat, lng: avgLng }
                    }
                }
                
                const options: google.maps.MapOptions = {
                    center: centerLocation,
                    zoom: diveSites && diveSites.length > 1 ? 10 : 15,
                    mapId: "map",
                    mapTypeControl: false,
                    fullscreenControl: false,
                    streetViewControl: false
                }
                
                const map = new Map(mapRef.current as HTMLElement, options)
                mapInstance.current = map
                
                // Add event listeners
                map.addListener('bounds_changed', () => {
                    // Debounce the bounds change to avoid too many API calls
                    setTimeout(handleBoundsChanged, 1000)
                })

                // Add idle listener (when map stops moving/zooming)
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
    }, [isMapLoaded, handleBoundsChanged])

    // Update markers when diveSites change
    useEffect(() => {
        if (isMapLoaded && mapInstance.current && diveSites) {
            clearMarkers()
            addMarkers(diveSites, mapInstance.current)
        }
    }, [diveSites, isMapLoaded, addMarkers, clearMarkers])

    // Manual load more function (you can call this from a button)
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
                            'Load More Sites'
                        )}
                    </button>
                </div>
            )}

            {/* Loading indicator */}
            
        </div>
    )
}

export default GoogleMap