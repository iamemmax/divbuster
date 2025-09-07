import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";




export interface acctType {
  account_type: string;
  diver_type: string;
  
}

const updateAccountType = async ({account_type,diver_type}:acctType) => {
 const response = await adminAxios.put(`/profile`,{
account_type,diver_type });
    return response.data ;
}

export const useUpdateAccountType = () => {
  return useMutation({
    mutationFn: updateAccountType,
   
  });
};