import { useEffect, useRef, useState } from 'react';

// Define an interface for the options that can be passed to useMediaQuery.
export interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

// Define a callback type for media query changes.
type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;

/**
 * Older versions of Safari do not support addEventListener on matchMedia.
 * This function provides a workaround by using addListener/removeListener
 * if addEventListener is not available.
 */
function attachMediaListener(
  query: MediaQueryList,
  callback: MediaQueryCallback
) {
  try {
    // Attempt to use addEventListener for modern browsers.
    query.addEventListener('change', callback);
    return () => query.removeEventListener('change', callback);
  } catch (e) {
    // Fall back to addListener for older browsers.
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}

/**
 * Helper function to get the initial value for the media query.
 * It checks if 'matchMedia' is available in the window object.
 */
function getInitialValue(query: string, initialValue?: boolean) {
  if (typeof initialValue === 'boolean') {
    return initialValue;
  }

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    return window.matchMedia(query).matches;
  }

  return false;
}

/**
 * The main useMediaQuery hook function.
 * It takes a media query string, an optional initial value, and options.
 * The hook returns a boolean value indicating whether the media query matches.
 */
export default function useMediaQuery(
  query: string,
  initialValue?: boolean,
  { getInitialValueInEffect }: UseMediaQueryOptions = {
    getInitialValueInEffect: true,
  }
) {
  // Initialize state for whether the media query matches.
  // Use the provided initial value or compute it based on the query and options.
  const [matches, setMatches] = useState(
    getInitialValueInEffect
      ? initialValue
      : getInitialValue(query, initialValue)
  );

  // Create a ref to store the MediaQueryList object.
  const queryRef = useRef<MediaQueryList>();

  useEffect(() => {
    if ('matchMedia' in window) {
      // Create a MediaQueryList object for the specified query.
      queryRef.current = window.matchMedia(query);

      // Set the initial matches state based on the MediaQueryList.
      setMatches(queryRef.current.matches);

      // Attach a listener to update the matches state when the media query changes.
      return attachMediaListener(queryRef.current, event =>
        setMatches(event.matches)
      );
    }

    // Return undefined if 'matchMedia' is not available (server-side rendering).
    return undefined;
  }, [query]); // Re-run this effect whenever the query string changes.

  // Return the current matches state, indicating whether the media query matches.
  return matches;
}
