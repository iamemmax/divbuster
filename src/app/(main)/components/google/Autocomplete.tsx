// components/GoogleAutocomplete.tsx
"use client"
import { useEffect, useRef, useState, forwardRef, useCallback, useMemo } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { AutocompleteOptions, PlaceData } from '../../../../../google-maps';

// TypeScript declarations


// Singleton loader instance to prevent multiple initializations
let loaderInstance: Loader | null = null;
let loadPromise: Promise<typeof google> | null = null;

const getGoogleMapsLoader = async (apiKey: string): Promise<typeof google> => {
  // Return existing load promise if already loading
  if (loadPromise) {
    return loadPromise;
  }

  // Check if already loaded
  if (window.google?.maps?.places) {
    return Promise.resolve(window.google);
  }

  // Create loader only once
  if (!loaderInstance) {
    loaderInstance = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places']
    });
  }

  // Store and return the load promise
  loadPromise = loaderInstance.load();
  return loadPromise;
};

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
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize autocomplete options to prevent re-initialization
  const autocompleteOptions = useMemo<google.maps.places.AutocompleteOptions>(() => ({
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
  }), [options]);

  // Memoize place selection handler
  const handlePlaceChanged = useCallback(() => {
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
    } else {
      console.warn('Invalid place selected:', place);
    }
  }, [onPlaceSelected]);

  // Initialize Google Maps Autocomplete
  useEffect(() => {
    let mounted = true;

    const initializeAutocomplete = async (): Promise<void> => {
      if (isLoaded || !inputRef.current) {
        setIsLoading(false);
        return;
      }

      if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        setError('Google Maps API key is not configured');
        setIsLoading(false);
        return;
      }

      try {
        // Load Google Maps using singleton loader
        await getGoogleMapsLoader(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
        
        if (!mounted || !inputRef.current || autocompleteRef.current) {
          return;
        }
        
        autocompleteRef.current = new google.maps.places.Autocomplete(
          inputRef.current,
          autocompleteOptions
        );

        // Fix z-index and positioning issues
        const timeoutId = setTimeout(() => {
          const pacContainer = document.querySelector('.pac-container') as HTMLElement;
          if (pacContainer) {
            pacContainer.style.zIndex = '10000';
            pacContainer.style.position = 'absolute';
          }
        }, 100);
        
        timeoutIdsRef.current.push(timeoutId);

        autocompleteRef.current.addListener('place_changed', handlePlaceChanged);

        if (mounted) {
          setIsLoaded(true);
          setError(null);
        }
        
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        if (mounted) {
          setError('Failed to load Google Maps. Please try again.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAutocomplete();

    return () => {
      mounted = false;
    };
  }, [isLoaded, autocompleteOptions, handlePlaceChanged]);

  // Handle z-index and pointer events issues
  useEffect(() => {
    if (!isLoaded) return;

    const fixDropdownIssues = () => {
      const timeoutId = setTimeout(() => {
        const pacContainers = document.querySelectorAll('.pac-container');
        pacContainers.forEach((container: Element) => {
          const htmlContainer = container as HTMLElement;
          htmlContainer.style.zIndex = '10000';
          htmlContainer.style.position = 'absolute';
          htmlContainer.style.pointerEvents = 'auto';
          htmlContainer.style.display = 'block';
          htmlContainer.style.visibility = 'visible';
          htmlContainer.style.opacity = '1';
          
          // Fix individual items
          const items = htmlContainer.querySelectorAll('.pac-item');
          items.forEach((item: Element) => {
            const htmlItem = item as HTMLElement;
            htmlItem.style.pointerEvents = 'auto';
            htmlItem.style.cursor = 'pointer';
          });
        });
      }, 50);

      timeoutIdsRef.current.push(timeoutId);
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', fixDropdownIssues);
      inputElement.addEventListener('input', fixDropdownIssues);
      
      return () => {
        inputElement.removeEventListener('focus', fixDropdownIssues);
        inputElement.removeEventListener('input', fixDropdownIssues);
      };
    }
  }, [isLoaded]);

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

  // Cleanup
  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeoutIdsRef.current.forEach(clearTimeout);
      timeoutIdsRef.current = [];
      
      // Clear Google Maps listeners
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, []);

  // Retry handler for failed loads
  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setIsLoaded(false);
  }, []);

  if (error) {
    return (
      <div className="w-full p-3 border border-red-300 rounded-lg bg-red-50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-red-800 text-sm font-medium">Error loading location search</p>
            <p className="text-red-600 text-xs mt-1">{error}</p>
          </div>
          <button
            onClick={handleRetry}
            className="ml-3 text-xs text-red-600 hover:text-red-800 font-medium underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder={isLoading ? "Loading..." : placeholder}
        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        } ${className}`}
        disabled={disabled || isLoading}
        defaultValue={defaultValue}
        autoComplete="off"
        aria-label="Location search"
        aria-busy={isLoading}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Global styles for Google Places dropdown - injected once */}
      <style jsx global>{`
        .pac-container {
          z-index: 10000 !important;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          background: white;
          pointer-events: auto !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          max-height: 400px;
          overflow-y: auto;
          margin-top: 2px;
        }
        
        .pac-item {
          padding: 12px 16px;
          cursor: pointer !important;
          border-bottom: 1px solid #f3f4f6;
          pointer-events: auto !important;
          user-select: none;
          line-height: 1.4;
          font-size: 14px;
          transition: background-color 150ms ease;
        }
        
        .pac-item:hover {
          background-color: #f9fafb !important;
        }
        
        .pac-item:last-child {
          border-bottom: none;
        }
        
        .pac-item-selected,
        .pac-item:focus {
          background-color: #eff6ff !important;
          outline: none;
        }
        
        .pac-matched {
          font-weight: 600;
          color: #1f2937;
        }
        
        .pac-icon {
          margin-right: 8px;
          width: 15px;
          height: 20px;
          background-size: contain;
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .dark .pac-container {
            background: #374151;
            border-color: #4b5563;
            color: white;
          }
          
          .dark .pac-item {
            color: white;
            border-color: #4b5563;
          }
          
          .dark .pac-item:hover {
            background-color: #4b5563 !important;
          }
          .pac-container:after {
  display: none !important;
  visibility: hidden !important;
}

          .dark .pac-item-selected,
          .dark .pac-item:focus {
            background-color: #3b82f6 !important;
          }
          
          .dark .pac-matched {
            color: #e5e7eb;
          }
        }
      `}</style>
    </div>
  );
});

GoogleAutocomplete.displayName = 'GoogleAutocomplete';

export default GoogleAutocomplete;