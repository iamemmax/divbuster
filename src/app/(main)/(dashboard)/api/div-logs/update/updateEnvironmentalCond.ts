import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";


interface addBuddyprop {
    id:string
 min_water_temperature: string;
    max_water_temperature: string;
    avg_water_temperature: string;
}



const updateEnvironmentalCon = async ({avg_water_temperature,max_water_temperature,min_water_temperature,id}:addBuddyprop) => {
 const response = await adminAxios.put(`/dive/dive-log/${id}/edit`,{
avg_water_temperature,max_water_temperature,min_water_temperature });
    return response.data ;
}

export const useUpdateEnvironmentalCon = () => {
  return useMutation({
    mutationFn: updateEnvironmentalCon,
   
  });
};