import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";




export interface acctType {
  country_id: string;
  lang: string;
  
}

const updateCountryAndLanguage = async ({country_id,lang}:acctType) => {
 const response = await adminAxios.put(`/profile`,{
country_id,lang });
    return response.data ;
}

export const useUpdateCountryAndLanguage = () => {
  return useMutation({
    mutationFn: updateCountryAndLanguage,
   
  });
};