import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";


interface divSitesProp {
  dive_site_id: number;
  score: number;
  comment: string;
  lang: string;
} 



const RateDiveSite = async ({comment,score,dive_site_id,lang}:divSitesProp) => {
 const response = await adminAxios.post(`dive/dive-site/rating/add`,{comment,score,dive_site_id,lang});
    return response.data ;
}

export const useRateDiveSite = () => {
  return useMutation({
    mutationFn: RateDiveSite,
  });
};