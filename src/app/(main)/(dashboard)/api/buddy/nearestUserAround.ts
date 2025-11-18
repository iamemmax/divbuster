import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface nearestUser {
  user_id: number;
  profile_picture: null | string;
  nickname: string;
  invite_id: string;
  first_name: string;
  last_name: string;
  email: string;
  total_dives: number;
  total_max_depth: number;
  total_bottom_time: number;
  total_reviews: number;
  distance: number;
  buddies_count: number;
  buddies_pictures: string[];
  longitude: number;
  latitude: number;
  is_buddy: boolean;
}
const fetchNearestUser = async () => {
  // if (!slug) return null;
  try {
    const response = await adminAxios.get(`near-by-users`);
    return response.data as nearestUser[];
  } catch (error) {
    throw error;
  }
};




export const useFetchNearestUser = () => {
  return useQuery({
    queryKey: ["nearest-user-around"],
    queryFn:  fetchNearestUser

  });
};