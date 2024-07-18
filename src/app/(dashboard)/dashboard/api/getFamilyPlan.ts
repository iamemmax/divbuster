import { adminAxios } from "@/lib/axios";

interface familyPlanType {
  inactive_plan: string;
  message: string;
  button: string;
}
export const getFamilyPlan = async (phone:string) => {
  const { data } = await adminAxios.get(`life-insurance/family-plan/?phone_number=${phone}`);
  return data as familyPlanType ;
};