import { adminAxios } from "@/lib/axios";


interface plantypes {
  package_name: string;
  data: Datum[];
}

interface Datum {
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
    const {data} = await adminAxios.get(`life-insurance/insurance_plan/`);
    return data as plantypes[]
     
};

