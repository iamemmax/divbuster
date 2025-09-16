import { adminAxios } from "@/lib/axios";
import { useMutation, useQuery } from "react-query";


 interface divSitesProp {
 plan_id: number;
  lang: string;
  return_url: string;
  cancel_url: string;

}

interface walletResult {
  detail: string;
}

const fundWallet = async ({cancel_url,lang,plan_id,return_url}:divSitesProp) => {
 const response = await adminAxios.post(`fund-wallet`,{cancel_url,lang,plan_id,return_url});
    return response.data as walletResult;
}

export const useFundWallet = () => {
  return useMutation({
    mutationFn: fundWallet,
  });
};