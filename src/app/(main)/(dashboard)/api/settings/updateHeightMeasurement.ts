import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";




 interface tempMea {
  measurement_unit: string;
  
}

const updateHeightMeasurement = async ({measurement_unit}:tempMea) => {
 const response = await adminAxios.put(`/profile`,{
measurement_unit });
    return response.data ;
}

export const useUpdateHeightMeasurement = () => {
  return useMutation({
    mutationFn: updateHeightMeasurement,
   
  });
};