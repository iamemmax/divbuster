

"use client"

import { useState, useEffect } from "react"

interface LocationDisplayProps {
  lat: string
  lon: string
  fallback?: string
  className?: string
}

interface CachedLocation {
  location: string
  timestamp: number
}

// Cache successful lookups
const locationCache = new Map<string, CachedLocation>()

export const LocationDisplay: React.FC<LocationDisplayProps> = ({
  lat,
  lon,
  fallback = "Location unavailable",
  className,
}) => {
  const [location, setLocation] = useState("Loading...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cacheKey = `${lat},${lon}`

    if (!lat || !lon || lat === "None" || lon === "None") {
      setLocation(fallback)
      setLoading(false)
      return
    }

    // ✅ Use cached result if available
    if (locationCache.has(cacheKey)) {
      const cached = locationCache.get(cacheKey)!
      setLocation(cached.location)
      setLoading(false)
      return
    }

    const fetchLocation = async () => {
      setLoading(true)

      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
          { signal: AbortSignal.timeout(10000) }
        )

        if (!response.ok) throw new Error("Failed to fetch")

        const data = await response.json()

        // Extract main parts
        const city = data.city || data.locality || ""
        const state = data.principalSubdivision || ""
        const country = data.countryName || ""

        const extra =
          data.localityInfo?.administrative?.find(
            (a: any) =>
              a.description?.toLowerCase().includes("district") ||
              a.description?.toLowerCase().includes("suburb")
          )?.name || ""

        // ✅ Format: City, State, Country (Extra)
        let locationStr = [city, state, country].filter(Boolean).join(", ")
        if (extra && !locationStr.includes(extra)) {
          locationStr += ` (${extra})`
        }

        // ✅ Remove anything inside parentheses (like "(Kingdom of the)")
        const cleanLocation = locationStr.replace(/\s*\([^)]*\)\s*/g, "").trim() || fallback

        // Cache
        locationCache.set(cacheKey, {
          location: cleanLocation,
          timestamp: Date.now(),
        })

        setLocation(cleanLocation)
      } catch {
        setLocation(fallback)
      } finally {
        setLoading(false)
      }
    }

    fetchLocation()
  }, [lat, lon, fallback]) // ✅ Only refetch on coordinate change

  return (
    <span className={`text-sm text-gray-200 ${className}`}>
      {loading ? "Loading..." : location}
    </span>
  )
}
