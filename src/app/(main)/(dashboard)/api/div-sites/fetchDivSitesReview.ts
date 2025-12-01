import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";




interface diveReview {
 id: number;
  score: number;
  comment: string;
  created_on: string;
  user: number;
  dive_site: number;
}
const fetchDiveReview = async (slug: string):Promise<diveReview[]> => {
  // if (!slug) return null;
  try {
    const response = await adminAxios.get(`/dive/dive-site/rating/${slug}`);
    return response.data as diveReview[];
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

export const useFetchDiveReview = (slug: string | null) => {
  return useQuery({
    queryKey: ["dive-site-review", slug],
    queryFn: () => {
      if (!slug) return Promise.resolve(null);
      return fetchDiveReview(slug);
    },
    enabled: !!slug,
  });
};