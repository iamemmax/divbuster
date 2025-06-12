import { adminAxios } from "@/lib/axios";
import { useMutation, useQuery } from "react-query";


 interface divSitesProp {

  dive_site_id: number;
  action: string;
  lang: string;

}



const addFouriteDivSIte = async ({action,dive_site_id,lang}:divSitesProp) => {
 const response = await adminAxios.post(`dive/dive-site/favourite`,{action,dive_site_id,lang});
    return response.data as divSitesProp;
}

export const useAddFouriteDivSIte = () => {
  return useMutation({
    mutationFn: addFouriteDivSIte,
  });
};