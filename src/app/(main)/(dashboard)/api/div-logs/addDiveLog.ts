import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";



interface payload {
   data:{
     private_note: string;
    public_note: string;
    show_notes: boolean;
    min_water_temperature: string;
    max_water_temperature: string;
    avg_water_temperature: string;
    bottom_time: string;
    dive_depth: string;
    name: string;
    start_date: string;
    end_date: string;
    dive_site_id: string;
    gas_mixture: string;
    bcd: string;
    weight: string;
    mask: string;
    regulator: string;
    fin: string;
    wetsuit: string;
    email: string[];
    buddies: string;
   }
}




const createDiveLog = async ({data}:payload) => {
 const response = await adminAxios.post(`/dive/dive-log/add`,{
   data:{...data,dive_site_id:Number(data?.dive_site_id)}
 });
    return response.data ;
}

export const useCreateDiveLog = () => {
  return useMutation({
    mutationFn: createDiveLog,
   
  });
};