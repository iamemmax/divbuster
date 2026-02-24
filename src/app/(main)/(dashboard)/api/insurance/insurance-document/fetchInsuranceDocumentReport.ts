import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";

export interface InsuranceDocumentTypes {
  detail: string;
  data: Datum[];
}


interface Datum {
  id: number;
  insurance_report: string;
  issuer_name: string;
  policy_number: string;
  issued_on: string;
  start_date: string;
  expires_on: string;
  created_on: string;
  updated_on: string;
  user: number;
}
const fetchInsuranceDocument = async () => {
 const response = await adminAxios.get<InsuranceDocumentTypes>(`/dive-insurance-document/list`);
    return response.data;
}



export const useFetchInsuranceDocument = () => {
  return useQuery({
    queryKey: ["insurance-document"],
    queryFn: fetchInsuranceDocument,
  });
};

