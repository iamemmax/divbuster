import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";

export interface physicianReportTypes {
  detail: string;
  data: Datum[];
}

interface Datum {
  id: number;
  hospital_name: string;
  physician_name: string;
  physician_email: string;
  physician_report: string;
  physician_phone: string;
  physician_license_number: string;
  issued_on: string;
  expires_on: string;
  created_on: string;
  updated_on: string;
  user: number;
}
const fetchPhysicianReport = async () => {
 const response = await adminAxios.get<physicianReportTypes>(`/dive-physician-report/list`);
    return response.data;
}



export const useFetchPhysicianReport = () => {
  return useQuery({
    queryKey: ["user-physician-report"],
    queryFn: fetchPhysicianReport,
  });
};

