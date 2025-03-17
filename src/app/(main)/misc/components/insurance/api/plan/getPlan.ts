import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


export interface plantypes {
  package_name: string;
  data: PlanData[];
}

export interface PlanData {
  id: number;
  plan_duration: Planduration;
  price: string;
  old_price: null | null | string;
  descriptions: string[];
}

interface Planduration {
  id: number;
  plan_type: Plantype;
  duration: number;
  min_members: number;
}

interface Plantype {
  id: number;
  name: string;
}
export const getPlan = async ( ) => {
    const {data} = await adminAxios.get(`insurance_plan/`);
    return data as plantypes[]
     
};
export const useGetPlan = ()=>{
 return useQuery({
    queryFn: getPlan,
    queryKey: ["get-plans"],
  });

}

