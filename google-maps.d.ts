// types/google-maps.d.ts
export interface PlaceData {
  placeId: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  types?: string[];
  url?: string;
  website?: string;
  phoneNumber?: string;
}

export interface AutocompleteOptions {
  types?: string[];
  fields?: string[];
  componentRestrictions?: google.maps.places.ComponentRestrictions;
  bounds?: google.maps.LatLngBounds;
  strictBounds?: boolean;
}

declare global {
  interface Window {
    google: typeof google;
  }
}