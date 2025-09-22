// components/GoogleAutocomplete.tsx
"use client"
import { useEffect, useRef, useState, forwardRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { AutocompleteOptions, PlaceData } from '../../../../../google-maps';

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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });
      
      try {
        await loader.load();
        
        if (inputRef.current && !autocompleteRef.current) {
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

          // Fix z-index and positioning issues
          const pacContainer = document.querySelector('.pac-container') as HTMLElement;
          if (pacContainer) {
            pacContainer.style.zIndex = '9999';
            pacContainer.style.position = 'absolute';
          }

          // Remove "powered by Google" branding
          setTimeout(() => {
            const poweredByElements = document.querySelectorAll('[style*="background-image"]');
            poweredByElements.forEach((element: Element) => {
              const htmlElement = element as HTMLElement;
              if (htmlElement.style.backgroundImage && htmlElement.style.backgroundImage.includes('powered_by_google')) {
                htmlElement.style.display = 'none';
              }
            });
            
            // Also hide any elements with Google branding text
            const allElements = document.querySelectorAll('*');
            allElements.forEach((element: Element) => {
              if (element.textContent?.toLowerCase().includes('powered by google')) {
                (element as HTMLElement).style.display = 'none';
              }
            });
          }, 500);

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
            } else {
              console.warn('Invalid place selected:', place);
            }
          });

          setIsLoaded(true);
          setError(null);
        }
        
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAutocomplete();
  }, [onPlaceSelected, options]);

  // Handle z-index and pointer events issues
  useEffect(() => {
    const fixDropdownIssues = () => {
      setTimeout(() => {
        const pacContainers = document.querySelectorAll('.pac-container');
        pacContainers.forEach((container: Element) => {
          const htmlContainer = container as HTMLElement;
          htmlContainer.style.zIndex = '99999';
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
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div className="text-red-500 text-sm p-2">
        Error: {error}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder={isLoading ? "Loading..." : placeholder}
        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        } ${className}`}
        disabled={disabled || isLoading}
        defaultValue={defaultValue}
        autoComplete="off"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Add global styles for Google Places dropdown */}
      <style jsx global>{`
        .pac-container {
          z-index: 9999999999999 !important;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          background: white;
          pointer-events: auto !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          max-height: 500px;
          overflow-y: auto;
        }
        
        .pac-item {
          padding: 12px 16px;
          cursor: pointer !important;
          border-bottom: 1px solid #f3f4f6;
          pointer-events: auto !important;
          user-select: none;
          line-height: 1.4;
          font-size: 14px;
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
          display: none;
        }
        
        /* Hide Google branding */
        .pac-logo:after {
          display: none !important;
        }
        
        .hdpi.pac-logo:after {
          display: none !important;
        }
        
        .pac-container:after {
          display: none !important;
        }
        
        [style*="powered_by_google"] {
          display: none !important;
        }
        
        /* Dark mode support */
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
        
        .dark .pac-item-selected,
        .dark .pac-item:focus {
          background-color: #3b82f6 !important;
        }
      `}</style>
    </div>
  );
});

GoogleAutocomplete.displayName = 'GoogleAutocomplete';

export default GoogleAutocomplete;