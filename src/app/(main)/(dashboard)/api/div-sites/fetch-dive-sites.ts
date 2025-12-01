export interface noPaginateData {
  detail: string;
  data: diveSiteResult[];
}
    import { useDebounce } from "@/hooks";
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
    paginate:string
  }

const fetchDiveSites = async ({
  lang,
  favorite,
  search,
  paginate,
  pageParam = 1,
}: filter & { pageParam?: number }) => {
  try {
    const params = new URLSearchParams();
    params.append("lang", lang);
    params.append("page", pageParam.toString());

    if (favorite === "yes") {
      params.append("favourite", "yes"); // API uses 'favourite'
    }
    if (search) {
      params.append("title", search);
    }
    // if (paginate === "yes") {
    //   params.append("no-paginate", paginate);
    // }

    const url = `dive/dive-sites?${params.toString()}`;
    const response = await adminAxios.get(url);
    return response.data as divSitesProp;
  } catch (error) {
    console.error("Error fetching dive sites:", error);
    throw error;
  }
};

 export const useFetchDiveSites = ({ lang, favorite, search, paginate }: filter) => {
  const normalizedFavorite = favorite === "yes" ? "yes" : null;
  const debouncedSearch = useDebounce(search, 300);

  return useInfiniteQuery({
    queryKey: ["div-sites", normalizedFavorite, lang, debouncedSearch, paginate],
    queryFn: ({ pageParam = 1 }) =>
      fetchDiveSites({
        favorite: normalizedFavorite || undefined,
        lang,
        search,
        pageParam,
        paginate,
      }),
    enabled: !!lang, // only run when lang exists

    getNextPageParam: (lastPage) => {
      if (lastPage.data.next) {
        const url = new URL(lastPage.data.next);
        const nextPage = url.searchParams.get("page");
        return nextPage ? parseInt(nextPage, 10) : undefined;
      }
      return undefined;
    },

    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.previous) {
        const url = new URL(firstPage.data.previous);
        const prevPage = url.searchParams.get("page");
        return prevPage ? parseInt(prevPage, 10) : undefined;
      }
      return undefined;
    },

    onError: (error) => console.error("Infinite query error:", error),
  });
};

// ------------------ Flattened Data Hook ------------------

export const useFlattenedDiveSites = ({ lang, favorite, search, paginate }: filter) => {
  const query = useFetchDiveSites({ lang, favorite, search, paginate });

  const flattenedData = query.data?.pages.reduce(
    (acc, page) => [...acc, ...page.data.results],
    [] as diveSiteResult[]
  ) || [];

  const totalCount = query.data?.pages[0]?.data.count || 0;

  return {
    ...query,
    data: flattenedData,
    totalCount,
  };
};