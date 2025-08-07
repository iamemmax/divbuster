
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import moment from "moment"
interface LocationDisplayProps {
  lat: string
  lon: string
  fallback?: string
  showTime?: boolean
  timeFormat?: "relative" | "absolute" | "both"
}

interface CachedLocation {
  location: string
  timestamp: number
  fetchTime: number
}

// Cache to store successful geocoding results with timestamps
const locationCache = new Map<string, CachedLocation>()

export const LocationDisplay: React.FC<LocationDisplayProps> = ({
  lat,
  lon,
  fallback = "Location unavailable",
  showTime = false,
  timeFormat = "relative",
}) => {
  const [location, setLocation] = useState("Loading...")
  const [loading, setLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const [fetchTime, setFetchTime] = useState<number | null>(null)
  const [cacheTime, setCacheTime] = useState<number | null>(null)

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp)

    switch (timeFormat) {
      case "absolute":
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      case "relative": {
        const now = Date.now()
        const diff = now - timestamp
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (days > 0) return `${days}d ago`
        if (hours > 0) return `${hours}h ago`
        if (minutes > 0) return `${minutes}m ago`
        return "just now"
      }
      case "both": {
        const now = Date.now()
        const diff = now - timestamp
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        let relativeTime: string
        if (days > 0) relativeTime = `${days}d ago`
        else if (hours > 0) relativeTime = `${hours}h ago`
        else if (minutes > 0) relativeTime = `${minutes}m ago`
        else relativeTime = "just now"

        const absoluteTime = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })

        return `${absoluteTime} (${relativeTime})`
      }
      default:
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
    }
  }

  useEffect(() => {
    const cacheKey = `${lat},${lon}`

    // Check cache first
    if (locationCache.has(cacheKey)) {
      const cached = locationCache.get(cacheKey)!
      setLocation(cached.location)
      setFetchTime(cached.fetchTime)
      setCacheTime(cached.timestamp)
      setLoading(false)
      return
    }

    const fetchLocation = async () => {
      const startTime = Date.now()

      if (!lat || !lon || lat === "None" || lon === "None" || lat === "" || lon === "") {
        setLocation(fallback)
        setLoading(false)
        return
      }

      // Validate coordinates
      const latitude = Number.parseFloat(lat)
      const longitude = Number.parseFloat(lon)
      if (
        isNaN(latitude) ||
        isNaN(longitude) ||
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180
      ) {
        setLocation(fallback)
        setLoading(false)
        return
      }

      const services = [
        // Service 1: OpenCage (if API key is available)
        async () => {
          if (!process.env.NEXT_PUBLIC_GEO_CODING_API) {
            throw new Error("No OpenCage API key")
          }

          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.NEXT_PUBLIC_GEO_CODING_API}&limit=1&no_annotations=1`,
            {
              headers: {
                "User-Agent": "DiveBusters App",
              },
              signal: AbortSignal.timeout(10000), // 10 second timeout
            },
          )

          if (!response.ok) {
            throw new Error(`OpenCage API error: ${response.status}`)
          }

          const data = await response.json()

          if (data?.results?.[0]) {
            const result = data.results[0]
            const address = result.components

            const city = address?.city || address?.town || address?.village || address?.hamlet || ""
            const state = address?.state || address?.province || address?.region || ""
            const country = address?.country || ""

            let locationStr = ""
            if (city) locationStr += city
            if (state) locationStr += (locationStr ? ", " : "") + state
            if (country) locationStr += (locationStr ? ", " : "") + country

            return locationStr || result.formatted
          }
          throw new Error("No results from OpenCage")
        },

        // Service 2: Nominatim (Free, but rate limited)
        async () => {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
            {
              headers: {
                "User-Agent": "DiveBusters App (contact@divebusters.com)",
              },
              signal: AbortSignal.timeout(10000),
            },
          )

          if (!response.ok) {
            throw new Error(`Nominatim API error: ${response.status}`)
          }

          const data = await response.json()

          if (data?.address) {
            const address = data.address
            const city = address?.city || address?.town || address?.village || address?.hamlet || ""
            const state = address?.state || address?.province || address?.region || ""
            const country = address?.country || ""

            let locationStr = ""
            if (city) locationStr += city
            if (state) locationStr += (locationStr ? ", " : "") + state
            if (country) locationStr += (locationStr ? ", " : "") + country

            return locationStr || data.display_name
          }
          throw new Error("No results from Nominatim")
        },

        // Service 3: BigDataCloud (Free tier available)
        async () => {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
            {
              signal: AbortSignal.timeout(10000),
            },
          )

          if (!response.ok) {
            throw new Error(`BigDataCloud API error: ${response.status}`)
          }

          const data = await response.json()

          if (data) {
            const city = data.city || data.locality || ""
            const state = data.principalSubdivision || ""
            const country = data.countryName || ""

            let locationStr = ""
            if (city) locationStr += city
            if (state) locationStr += (locationStr ? ", " : "") + state
            if (country) locationStr += (locationStr ? ", " : "") + country

            return locationStr || `${lat}, ${lon}`
          }
          throw new Error("No results from BigDataCloud")
        },
      ]

      // Try each service with exponential backoff
      for (let i = 0; i < services.length; i++) {
        try {
          console.log(`Trying geocoding service ${i + 1}...`)
          const result = await services[i]()

          if (result && result.trim()) {
            const endTime = Date.now()
            const fetchDuration = endTime - startTime

            // Cache successful result with timing information
            const cachedData: CachedLocation = {
              location: result,
              timestamp: endTime,
              fetchTime: fetchDuration,
            }

            locationCache.set(cacheKey, cachedData)
            setLocation(result)
            setFetchTime(fetchDuration)
            setCacheTime(endTime)
            setLoading(false)
            return
          }
        } catch (error) {
          console.warn(`Geocoding service ${i + 1} failed:`, error)

          // Add delay between service attempts
          if (i < services.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)))
          }
        }
      }

      // If all services fail, try retry with exponential backoff
      if (retryCount < 2) {
        console.log(`All services failed, retrying in ${2 ** retryCount} seconds...`)
        setTimeout(
          () => {
            setRetryCount((prev) => prev + 1)
          },
          1000 * 2 ** retryCount,
        )
        return
      }

      // Final fallback
      setLocation(fallback)
      setLoading(false)
    }

    fetchLocation()
  }, [lat, lon, fallback, retryCount, timeFormat])

  if (loading) {
    return (
      <span className="text-gray-400">
        Loading...
        {retryCount > 0 && <span className="text-xs"> (retry {retryCount})</span>}
      </span>
    )
  }

  return (
    <span className="flex flex-col">
      <span>{location}</span>
      {showTime && cacheTime && (
        <p className="font-archivo font-medium mt-1 text-[#78828A] text-sm">
          
          {fetchTime && <span className="">{moment(cacheTime).format("MMMM D, YYYY")}</span>}
        </p>
      )}
    </span>
  )
}
