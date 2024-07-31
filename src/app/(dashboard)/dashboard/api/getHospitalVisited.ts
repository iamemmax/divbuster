import { adminAxios } from "@/lib/axios";

interface HospitalVisit {
  sn: number;
  date: string;
  name: string;
}

interface VisitData {
  hospital_visit: HospitalVisit[];
  count: number;
}
export const getHospitalVisitedFunc = async (phone:string) => {
  const { data } = await adminAxios.get(`hospital-visits/?phone_number=${phone}`);
  return data as VisitData
};