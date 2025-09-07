import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";


interface addBuddyprop {
    id:string
  bottom_time: string;
  max_depth: string;
}



const updateLogDetails = async ({max_depth, bottom_time,id}:addBuddyprop) => {
 const response = await adminAxios.put(`/dive/dive-log/${id}/edit`,{
    max_depth, bottom_time
 });
    return response.data ;
}

export const useUpdateLogDetails = () => {
  return useMutation({
    mutationFn: updateLogDetails,
   
  });
};