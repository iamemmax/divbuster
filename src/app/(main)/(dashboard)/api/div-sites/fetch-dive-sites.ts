import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


export interface divSitesProp {
  detail: string;
  data: Data;
}

interface Data {
  count: number;
  next: string;
  previous: null;
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

const fetchDiveSites = async () => {
 const response = await adminAxios.get(`dive/dive-sites`);
    return response.data as divSitesProp;
}

export const usefetchDiveSites = () => {
  return useQuery({
    queryKey: ["div-sites"],
    queryFn: fetchDiveSites,
  });
};