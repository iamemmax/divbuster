import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


export interface publicUserProp {
  id: number;
  email: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  invite_id: string;
  nickname: null | string;
  online: boolean;
}

const fetchPublicUser = async (search:string) => {
  // if (!slug) return null;
  try {
    const response = await adminAxios.get(`public-users?search=${search}`);
    return response.data as publicUserProp[]
  } catch (error) {
    throw error;
  }
};




export const useFetchPulicUsers = (search:string) => {
  return useQuery({
    queryKey: ["public-user-around",search],
    queryFn: ()=> fetchPublicUser(search)

  });
};