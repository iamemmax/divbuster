"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/shared/Header";
import { useUser } from "@/app/(auth)/api/getAuthenticatedUser";
import { diveSiteResult, useFetchDiveSites } from "../api/div-sites/fetch-dive-sites";

interface DiveSite {
  id: string;
  title: string;
  lat: string; // Fixed from previous 'lag' typo
  lon: string;
}

// Map Component - using direct script loading instead of conflicting loaders
function MapComponent({ diveSites }: { diveSites: diveSiteResult[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    // Load Google Maps script if not already loaded
    if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=marker`;
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!ref.current || !isLoaded || !window.google?.maps) return;

    const initializeMap = () => {
      if (!mapRef.current) {
        mapRef.current = new google.maps.Map(ref.current!, {
          center: { lat: 18.427, lng: -66.063 },
          zoom: 4,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        });
      }

      // Clear old markers
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];

      const bounds = new google.maps.LatLngBounds();

      diveSites?.forEach((site) => {
        // Using 'lag' from your data structure - consider fixing this in your API to 'lat'
        if (!site?.lag || !site?.lon) return;

        const lat = parseFloat(site.lag);
        const lng = parseFloat(site.lon);
        
        // Validate coordinates
        if (isNaN(lat) || isNaN(lng)) {
          console.warn(`Invalid coordinates for site ${site.title}: lat=${site.lag}, lng=${site.lon}`);
          return;
        }

        const position = { lat, lng };

        // Use the standard google.maps.Marker (not the new advanced markers)
        const marker = new google.maps.Marker({
          position,
          map: mapRef.current!,
          title: site.title,
          icon: {
            url: "/images/marker.png",
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 32), // Center the icon properly
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; min-width: 150px;">
              <h3 style="margin: 0 0 4px 0; font-weight: 600; color: #1f2937;">${site.title}</h3>
              <p style="margin: 0; font-size: 12px; color: #6b7280;">Dive Site</p>
            </div>
          `,
        });

        marker.addListener("click", () => {
          // Close any open info windows first
          markersRef.current.forEach((m) => {
            if (m?.infoWindow) {
              m?.infoWindow.close();
            }
          });
          infoWindow.open(mapRef.current!, marker);
        });

        // Store info window reference for cleanup
        (marker as any).infoWindow = infoWindow;
        markersRef.current.push(marker);
        bounds.extend(position);
      });

      if (diveSites.length > 0 && !bounds.isEmpty()) {
        mapRef.current!.fitBounds(bounds, {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        });

        // Prevent over-zooming
        const listener = google.maps.event.addListenerOnce(mapRef.current!, "bounds_changed", () => {
          const zoom = mapRef.current?.getZoom();
          if (zoom && zoom > 12) {
            mapRef.current!.setZoom(12);
          }
        });
      }
    };

    initializeMap();
  }, [diveSites, isLoaded]);

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-full">Loading map...</div>;
  }

  return <div ref={ref} className="w-full h-full" />;
}

// Nearest Dive Site Component - simplified without Wrapper
function NearestDiveSite({ diveSites }: { diveSites: diveSiteResult[] }) {
  return (
    <div className="flex-1">
      <MapComponent diveSites={diveSites} />
    </div>
  );
}

// Create Dive Plan Component
function CreateDivePlan() {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Dive Plan</h2>
        {/* Add your dive plan form here */}
      </div>
    </div>
  );
}

// Find Buddy Component
function FindBuddy() {
  const [searchBuddy, setSearchBuddy] = useState("");
  const [certificationLevel, setCertificationLevel] = useState("");

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Find Buddy</h2>
        {/* Add your find buddy form here */}
      </div>
    </div>
  );
}

// Main DiveMap Component
export default function DiveMap() {
  const { data: user } = useUser();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("nearest");

  const apiParams = {
    lang: user?.data?.profile_details?.language || "en",
    favorite: "",
    search,
  };

  const {
    data,
    refetch,
    isLoading,
    isError,
    error,
  } = useFetchDiveSites(apiParams);

  const diveSites = data?.pages?.flatMap((page) => page?.data?.results) || [];

  const tabs = [
    { id: "nearest", label: "Nearest Dive Site", component: <NearestDiveSite diveSites={diveSites} /> },
    { id: "plan", label: "Create Dive Plan", component: <CreateDivePlan /> },
    { id: "buddy", label: "Find Buddy", component: <FindBuddy /> },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header title="Dive Finder" subtitle="" />

      {/* Tabs */}
      <div className="flex gap-4 p-4 bg-white shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === tab.id
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {tabs.find(tab => tab.id === activeTab)?.component}
    </div>
  );
}