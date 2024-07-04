import { adminAxios } from "@/lib/axios";

export interface plantypes {
  duration: number;
  amount: number;
}
export const getPlan = async ( ) => {
    const {data} = await adminAxios.get(`life-insurance/insurance_plan/`);
    return data as plantypes[]
     
};

