"use client"
import React, { useEffect, useRef, useState } from 'react'
import type L from 'leaflet'
import { diveSiteResult } from '../../api/div-sites/fetchdivesites'
import { useRouter } from 'next/navigation'
import RatingModal from '../../dive-sites/components/RatingModal'

interface DiveSiteLeafletMapProps {
    diveSites: diveSiteResult[]
    isLoading?: boolean
}

const DiveSiteLeafletMap = ({ diveSites, isLoading }: DiveSiteLeafletMapProps) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<L.Map | null>(null)
    const LRef = useRef<typeof L | null>(null)
    const router = useRouter()
    const [ratingModalOpen, setRatingModalOpen] = useState(false)
    const [selectedDiveSite, setSelectedDiveSite] = useState<diveSiteResult | null>(null)

    useEffect(() => {
        const initMap = async () => {
            if (!mapRef.current || mapInstance.current) return

            const L = (await import('leaflet')).default
            LRef.current = L

            const map = L.map(mapRef.current).setView([40.73061, -73.935242], 10)

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
        (window as any).viewSite = (slug: string) => {
            router.push(`/dive-sites/${slug}`)
        }
        
        (window as any).rateSite = (siteId: string) => {
            const site = diveSites?.find(s => s.id === Number(siteId))
            if (site) {
                setSelectedDiveSite(site)
                setRatingModalOpen(true)
            }
        }


        if (!mapInstance.current || !diveSites?.length || !LRef.current) {
            return
        }

        const L = LRef.current

        if (!mapInstance.current) return

        mapInstance.current.eachLayer((layer: any) => {
            if (layer instanceof L.Marker && mapInstance.current) {
                mapInstance.current.removeLayer(layer)
            }
        })

        const validSites = diveSites.filter(site => {
            const lat = Number(site?.lag)
            const lng = Number(site?.lon)
            const isValid = site?.lag && site?.lon && !isNaN(lat) && !isNaN(lng)
            if (!isValid) {
            }
            return isValid
        })
        

        if (validSites.length > 0) {
            const createCustomIcon = () => {
                return L.divIcon({
                    html: `
                        <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="87" height="87" rx="43.5" fill="white"/>
<path d="M64.3327 39.3334V37.7031C64.3327 33.6623 64.3327 31.6418 63.1123 30.3865C61.8919 29.1312 59.9277 29.1312 55.9994 29.1312H51.6688C49.7576 29.1312 49.7419 29.1274 48.0233 28.2674L41.0824 24.7941C38.1844 23.3439 36.7354 22.6188 35.1918 22.6691C33.6482 22.7195 32.2468 23.5377 29.444 25.174L26.886 26.6675C24.8272 27.8694 23.7979 28.4704 23.2319 29.4701C22.666 30.4699 22.666 31.6874 22.666 34.1224V51.2411C22.666 54.4405 22.666 56.0402 23.3791 56.9306C23.8535 57.523 24.5184 57.9212 25.2535 58.0533C26.3582 58.2517 27.7108 57.462 30.4158 55.8828C32.2526 54.8104 34.0204 53.6966 36.2178 53.9987C38.0591 54.2518 39.7702 55.4135 41.416 56.2371" stroke="#F7931D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M35.166 22.6667L35.166 53.9167" stroke="#F7931D" stroke-width="3" stroke-linejoin="round"/>
<path d="M49.75 28.9167V38.2917" stroke="#F7931D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M56.643 63.6739C56.1913 64.0969 55.5875 64.3333 54.9592 64.3333C54.3308 64.3333 53.7271 64.0969 53.2754 63.6739C49.1389 59.7771 43.5954 55.4239 46.2988 49.1038C47.7605 45.6866 51.2692 43.5 54.9592 43.5C58.6492 43.5 62.1579 45.6866 63.6196 49.1038C66.3196 55.4159 60.7897 59.7905 56.643 63.6739Z" stroke="#F7931D" stroke-width="3"/>
<path d="M54.959 52.875H54.9777" stroke="#F7931D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


                        </div>
                    `,
                    className: 'custom-dive-icon',
                    iconSize: [40, 40],
                    iconAnchor: [20, 40]
                })
            }
            
            validSites.forEach((site, index) => {
                const lat = Number(site.lag)
                const lng = Number(site.lon)
                
                
                try {
                    const rating = site.average_rating || 0
                    const fullStars = Math.floor(rating)
                    const hasHalfStar = rating % 1 >= 0.5
                    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
                    
                    const starDisplay = '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars)
                    
                    const tooltipContent = `
                        <div style="padding: 12px; min-width: 200px; font-family: Arial, sans-serif;">
                            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${site.title}</h3>
                            <div style="margin: 0 0 8px 0; display: flex; align-items: center; gap: 4px;">
                                <span style="color: #fbbf24; font-size: 14px;">${starDisplay}</span>
                                <span style="font-size: 12px; color: #6b7280;">(${rating.toFixed(1)})</span>
                            </div>
                            <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${site.address}</p>
                            <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${site.description || 'No description available'}</p>
                            <p style="margin: 0 0 12px 0; font-size: 12px; color: #6b7280;"><strong>Coordinates:</strong> Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}</p>
                            <div style="display: flex; gap: 8px;">
                                <button onclick="viewSite('${site.slug}')" style="flex: 1; background: #3b82f6; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">View</button>
                                <button onclick="rateSite('${site.id}')" style="flex: 1; background: #f59e0b; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">Rate</button>
                            </div>
                        </div>
                    `
                    
                    const _marker = L.marker([lat, lng], { icon: createCustomIcon() })
                        .addTo(mapInstance.current!)
                        .bindPopup(tooltipContent)
                    
                } catch (error) {
                    console.error(`Error creating marker ${index} for ${site.title}:`, error)
                }
            })

            const markers = validSites.map(site => L.marker([Number(site.lag), Number(site.lon)]))
            const group = L.featureGroup(markers)
            mapInstance.current!.fitBounds(group.getBounds().pad(0.1))
        }
    }, [diveSites])

    return (
        <div className="relative w-full h-[83vh] mt-16">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <style jsx>{`
                .custom-dive-icon {
                    background: transparent !important;
                    border: none !important;
                }
            `}</style>
            <div ref={mapRef} className="size-full" id={`dive-map-${Math.random().toString(36).substr(2, 9)}`} />
            
            {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center z-[1000]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full size-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-300">Loading nearest dive sites...</p>
                    </div>
                </div>
            )}
            
           {ratingModalOpen && selectedDiveSite && <RatingModal
                isOpen={ratingModalOpen}
                onClose={() => {
                    setRatingModalOpen(false)
                    setSelectedDiveSite(null)
                }}
                removeModal={() => {
                    setRatingModalOpen(false)
                    setSelectedDiveSite(null)
                }}
                diveSiteId={selectedDiveSite?.id || 0}
                diveSiteName={selectedDiveSite?.title || ''}
            />}
        </div>
    )
}

export default DiveSiteLeafletMap