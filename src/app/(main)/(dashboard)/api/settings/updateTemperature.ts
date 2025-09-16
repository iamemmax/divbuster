import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";




 interface tempMea {
  temp_unit: string;
  
}

const updateTemperature = async ({temp_unit}:tempMea) => {
 const response = await adminAxios.put(`/profile`,{
temp_unit });
    return response.data ;
}

export const useUpdateTemperature = () => {
  return useMutation({
    mutationFn: updateTemperature,
   
  });
};