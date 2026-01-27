import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface singlediveProp {
  detail: string;
  data: Data;
}

interface Data {
  id: number;
  average_rating: number;
  ranking: string;
  dive_animals: Diveanimal[];
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
  dive_count: number;
  created_on: string;
  updated_on: string;
  country: number;
}

interface Diveanimal {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
}
const fetchSingleDiveSite = async (slug: string):Promise<singlediveProp> => {
  // if (!slug) return null;
  try {
    const response = await adminAxios.get(`/dive/dive-sites/${slug}`);
    return response.data as singlediveProp;
  } catch (error) {
    throw error;
  }
};


// export const usefetchBuddyProfile = (id:string) => {
//   return useQuery({
//     queryKey: ["buddy-profile",id],
//     queryFn: ()=>fetchBuddyProfile(id),
//     enabled:!!id
//   });
// };

export const useFetchSingleDiveSite = (slug: string | null) => {
  return useQuery({
    queryKey: ["singleDive-site", slug],
    queryFn: () => {
      if (!slug) return Promise.resolve(null);
      return fetchSingleDiveSite(slug);
    },
    enabled: !!slug,
  });
};