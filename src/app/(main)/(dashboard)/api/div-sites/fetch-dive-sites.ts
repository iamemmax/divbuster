import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";

export interface divSitesProp {
  detail: string;
  data: Data;
}

interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: diveSiteResult[];
}

export interface diveSiteResult {
  id: number;
  average_rating: number;
  ranking: string;
  title: string;
  slug: string;
  address: string;
  lon: string;
  lag: string;
  tag: null;
  entry_type: string;
  water_type: string;
  water_body: string;
  site_type: string;
  parking_available: boolean;
  max_depth: number;
  public_site: boolean;
  description: string;
  conditions: string;
  additional_information: string;
  under_water_map_url: string;
  emergency_info: null;
  created_on: string;
  updated_on: string;
  country: number;
}

interface filter {
  favorite?: string;
  lang: string;
  search: string;
}

const fetchDiveSites = async ({ lang, favorite, search, pageParam = 1 }: filter & { pageParam?: number }) => {
  try {
    // Build query parameters properly
    const params = new URLSearchParams();
    params.append('lang', lang);
    params.append('page', pageParam.toString());
    
    if (favorite === "yes") {
      params.append('favourite', 'yes'); // Note: 'favourite' not 'favorite'
    }
    if (search) {
      params.append("title", search);
    }
    
    const url = `dive/dive-sites?${params.toString()}`;
  
    const response = await adminAxios.get(url);
    return response.data as divSitesProp;
  } catch (error) {
    console.error('Error fetching dive sites:', error);
    throw error;
  }
};

export const useFetchDiveSites = ({ lang, favorite, search }: filter) => {
  // Normalize favorite to either "yes" or null for consistent caching
  const normalizedFavorite = favorite === "yes" ? "yes" : null;
  
  return useInfiniteQuery({
    queryKey: ["div-sites", normalizedFavorite, lang, search],
    queryFn: ({ pageParam = 1 }) => 
      fetchDiveSites({ 
        favorite: normalizedFavorite || undefined, 
        lang, 
        search, 
        pageParam 
      }),
    enabled: !!lang, // Only run query when lang is available
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
    
    // Infinite query specific options
    getNextPageParam: (lastPage) => {
      // Extract page number from next URL or return undefined if no more pages
      if (lastPage.data.next) {
        const url = new URL(lastPage.data.next);
        const nextPage = url.searchParams.get('page');
        return nextPage ? parseInt(nextPage, 10) : undefined;
      }
      return undefined;
    },
    
    getPreviousPageParam: (firstPage) => {
      // Extract page number from previous URL or return undefined if no previous pages
      if (firstPage.data.previous) {
        const url = new URL(firstPage.data.previous);
        const prevPage = url.searchParams.get('page');
        return prevPage ? parseInt(prevPage, 10) : undefined;
      }
      return undefined;
    },
    
    onError: (error) => {
      console.error('Infinite query error:', error);
    },
    onSuccess: (data) => {
      console.log('Infinite query success:', data);
    },
  });
};

// Helper hook to get flattened results from infinite query
export const useFlattenedDiveSites = ({ lang, favorite, search }: filter) => {
  const query = useFetchDiveSites({ lang, favorite, search });
  
  const flattenedData = query.data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data.results];
  }, [] as diveSiteResult[]) || [];
  
  const totalCount = query.data?.pages[0]?.data.count || 0;
  
  return {
    ...query,
    data: flattenedData,
    totalCount,
  };
};