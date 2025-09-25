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
  if (!sites || sites.length === 0) return;

  try {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "quarterly",
      libraries: ["places"]
    });

    const { AdvancedMarkerElement } = await loader.importLibrary("marker") as google.maps.MarkerLibrary;

    sites.forEach((site, index) => {
      const lat = Number(site?.lag);
      const lng = Number(site?.lon);

      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = new AdvancedMarkerElement({
          position: { lat, lng },
          title: site?.title || `Dive Site ${index + 1}`
        });

        marker.map = map; // ✅ attach marker to map
        markersRef.current.push(marker);
      }
    });
  } catch (error) {
    console.error("Error adding markers:", error);
  }
}, []);



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
              
                
                setIsMapLoaded(true)
                
            } catch (error) {
                console.error('Error initializing Google Maps:', error)
            }
        }

        if (!isMapLoaded) {
            initMap()
        }
    }, [])

    // Update markers when diveSites change
    useEffect(() => {
        if (isMapLoaded && mapInstance.current && diveSites) {
            clearMarkers()
            addMarkers(diveSites, mapInstance.current)
        }
    }, [diveSites, isMapLoaded, addMarkers, clearMarkers])

  

    return (
        <div className="relative w-full h-[83vh] mt-[4rem] dark:bg-gray-900">
            <div ref={mapRef} className="w-full h-full" />
            
          
            
        </div>
    )
}

export default GoogleMap