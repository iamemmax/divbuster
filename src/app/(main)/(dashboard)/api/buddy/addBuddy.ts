import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";


interface addBuddyprop {
  user_id: number;
  invite_id: string;
  lang?: string;
  request_status?: string;
}




const addBuddy = async ({invite_id,lang,user_id,request_status}:addBuddyprop) => {
 const response = await adminAxios.post(`buddies/add`,{
    invite_id,lang,user_id,request_status
 });
    return response.data ;
}

export const useAddBuddy = () => {
  return useMutation({
    mutationFn: addBuddy,
  });
};