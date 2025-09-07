import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";


interface addBuddyprop {
  id:string
   data:{
     mask?: string;
    gas_mixture?: string;
    bcd?: string;
    weight?: string;
    regulator?: string;
    fin?: string;
    wetsuit?: string;
   }
}



const updateLogGearDetails = async ({data:{bcd,fin,gas_mixture,mask,regulator,weight,wetsuit},id}:addBuddyprop) => {
 const response = await adminAxios.put(`/dive/dive-log/${id}/edit`,{

    
    bcd,fin,gas_mixture,mask,regulator,weight,wetsuit
  

    
 });
    return response.data ;
}

export const useUpdateLogGearDetails = () => {
  return useMutation({
    mutationFn: updateLogGearDetails,
   
  });
};