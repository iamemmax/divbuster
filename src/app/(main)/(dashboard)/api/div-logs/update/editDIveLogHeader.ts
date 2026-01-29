import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";


interface addBuddyprop {
    id:string
 name: string;
    start_date: string;
    end_date: string;
}



const updateDiveLogHeader = async (payload:addBuddyprop) => {
 const response = await adminAxios.put(`/dive/dive-log/${payload?.id}/edit`,payload);
    return response.data ;
}

export const useUpdateDiveLogHeader = () => {
  return useMutation({
    mutationFn: updateDiveLogHeader,
   
  });
};