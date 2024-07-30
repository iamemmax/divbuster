import { adminAxios } from "@/lib/axios";

interface currentPlanTypes {
  data: Data;
}

interface Data {
  enrolee_name: string;
  plan_type: string;
  enrolement_id: string;
  expires_on: string;
  status: string;
}


export const getUserCurrentPlan = async (phone:string) => {
  const { data } = await adminAxios.get(`current-plan/?phone_number=${phone}`);
  return data as currentPlanTypes;
};
