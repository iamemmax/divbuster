import { adminAxios } from "@/lib/axios";
interface hospitalAroundData {
  name: string;
  address: string;
  state: string;
  lga: string;
  provider_id: string;
}
export const getHospitalAroundFunc = async (phone:string) => {
  const { data } = await adminAxios.get(`life-insurance/hospitals-around-me/?phone_number=${phone}`);
  return data as hospitalAroundData[];
};
export const getHospitalVisitedFunc = async (phone:string) => {
  const { data } = await adminAxios.get(`life-insurance/family-plan/?phone_number=${phone}`);
  return data 
};