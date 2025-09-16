// components/GoogleAutocomplete.tsx
import { useEffect, useRef, useState, forwardRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { AutocompleteOptions, PlaceData } from '../../../../../google-maps';
// import { PlaceData, AutocompleteOptions } from '../types/google-maps';

interface GoogleAutocompleteProps {
  onPlaceSelected: (place: PlaceData) => void;
  placeholder?: string;
  className?: string;
  options?: AutocompleteOptions;
  disabled?: boolean;
  defaultValue?: string;
}

const GoogleAutocomplete = forwardRef<HTMLInputElement, GoogleAutocompleteProps>(({
  onPlaceSelected,
  placeholder = "Search for a location...",
  className = "",
  options = {},
  disabled = false,
  defaultValue = ""
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAutocomplete = async (): Promise<void> => {
      if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        setError('Google Maps API key is not configured');
        setIsLoading(false);
        return;
      }

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      try {
        await loader.load();
        
        if (inputRef.current) {
          const autocompleteOptions: google.maps.places.AutocompleteOptions = {
            types: options.types || ['establishment', 'geocode'],
            fields: options.fields || [
              'place_id',
              'name',
              'formatted_address',
              'geometry',
              'types',
              'url',
              'website',
              'formatted_phone_number'
            ],
            ...options
          };

          autocompleteRef.current = new google.maps.places.Autocomplete(
            inputRef.current,
            autocompleteOptions
          );

          autocompleteRef.current.addListener('place_changed', () => {
            if (!autocompleteRef.current) return;
            
            const place = autocompleteRef.current.getPlace();
            
            if (place && place.geometry && place.geometry.location) {
              const placeData: PlaceData = {
                placeId: place.place_id || '',
                name: place.name || '',
                address: place.formatted_address || '',
                location: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
                },
                types: place.types,
                url: place.url,
                website: place.website,
                phoneNumber: place.formatted_phone_number
              };
              
              onPlaceSelected(placeData);
            }
          });
        }
        
        setIsLoaded(true);
        setError(null);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps');
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoaded && !isLoading) {
      setIsLoading(true);
      initializeAutocomplete();
    }
  }, [onPlaceSelected, isLoaded, isLoading, options]);

  // Combine refs
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else {
        ref.current = inputRef.current;
      }
    }
  }, [ref]);

  if (error) {
    return (
      <div className="text-red-500 text-sm p-2">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder={isLoading ? "Loading..." : placeholder}
        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        } ${className}`}
        disabled={disabled || isLoading}
        defaultValue={defaultValue}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
});

GoogleAutocomplete.displayName = 'GoogleAutocomplete';

export default GoogleAutocomplete;