import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";
export interface SchoolliabilityForm {
  id: number;
  answers: Answers;
  participant_name: null;
  signature: string;
  parent_or_guardian_signature: string;
  last_signed_on: string;
  created_on: string;
  updated_on: string;
  dive_school: {
      id: number;
  name: string;
  address: string;
  contact_info: string;

  };
  questions: number[];
}
interface Answers {
  [key: string]: string;
}
const fetchSingleSchoolLiabilityReport = async (id:string) => {
  const response = await adminAxios.get<SchoolliabilityForm>(`/dive-school-liability-form/${id}`);
  return response.data;
}

export const useFetchSingleSchoolLiabilityReport = (id:string) => {
  return useQuery({
    queryKey: ["single-School-liability-report",id],
    queryFn: ()=>fetchSingleSchoolLiabilityReport(id),
    enabled:!!id
  });
};

