// Types and Interfaces
interface Coordinate {
  lon: string;
  lat: string;
}

interface RecentDiveInfo {
  start_date: string | null;
  end_date: string | null;
  bottom_time: string | null;
  depth: string | null;
  other_divers: string | null;
  dive_image: string | null;
}

interface SuggestedDiver {
  id: number;
  full_name: string;
  profile_picture: string | null;
  coordinate: Coordinate;
  invite_id: string;
  recent_dive_info: RecentDiveInfo;
}

interface LocationResponse {
  success: boolean;
  location: string;
  city?: string;
  state?: string;
  country?: string;
  countryCode?: string;
  error?: string;
  placeId?: string;
}

interface DiverWithLocation extends SuggestedDiver {
  locationInfo: LocationResponse;
}

// OpenCage API Response Types
interface OpenCageComponents {
  city?: string;
  town?: string;
  village?: string;
  state?: string;
  country?: string;
  country_code?: string;
}

interface OpenCageResult {
  formatted: string;
  components: OpenCageComponents;
}

interface OpenCageResponse {
  results: OpenCageResult[];
}

// Google Maps API Response Types
interface GoogleMapsResult {
  formatted_address: string;
  place_id: string;
}

interface GoogleMapsResponse {
  status: string;
  results: GoogleMapsResult[];
}

// Nominatim (OpenStreetMap) Response Types
interface NominatimAddress {
  city?: string;
  town?: string;
  village?: string;
  state?: string;
  country?: string;
  country_code?: string;
}

interface NominatimResponse {
  display_name: string;
  address: NominatimAddress;
}

// Option 1: Using OpenCage Geocoding API (Recommended - has free tier)
export const getLocationFromCoordinates = async (
  lat: string,
  lon: string,
): Promise<LocationResponse> => {
  try {
    // Handle invalid coordinates
    if (!lat || !lon || lat === "None" || lon === "None" || lat === "null" || lon === "null") {
      return {
        success: false,
        location: "Location not available",
        error: "Invalid coordinates"
      };
    }

    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.NEXT_PUBLIC_GEO_CODING_API}&limit=1`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: OpenCageResponse = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        success: true,
        location: result.formatted,
        city: result.components.city || result.components.town || result.components.village,
        state: result.components.state,
        country: result.components.country,
        countryCode: result.components.country_code?.toUpperCase()
      };
    } else {
      return {
        success: false,
        location: "Location not found",
        error: "No results found"
      };
    }
  } catch (error) {
    console.error('Error fetching location:', error);
    return {
      success: false,
      location: "Location unavailable",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};