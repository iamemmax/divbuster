import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";


interface diveSitesProp {
  detail: string;
  data: Data;
}

interface Data {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

interface Result {
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
const fetchDiveSites = async ({ pageParam = "dive/dive-sites" }) => {
  // If next is a full URL, strip the domain part
  const relativeUrl = pageParam.replace(/^https?:\/\/[^/]+/, "");
  const response = await adminAxios.get(relativeUrl);
  return response.data as diveSitesProp;
};


export const useFetchDiveSites = () => {
  return useInfiniteQuery({
    queryKey: ["dive-sites-location"],
    queryFn: fetchDiveSites,
    getNextPageParam: (lastPage) => lastPage.data?.next ?? undefined,
  });
};

