import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";




 interface tempMea {
  plan_id: number;
  lang?: string;
}

const createSubscription = async ({plan_id,lang}:tempMea) => {
 const response = await adminAxios.post(`/subscribe`,{
plan_id,lang });
    return response.data ;
}

export const useCreateSubscription = () => {
  return useMutation({
    mutationFn: createSubscription,
   
  });
};