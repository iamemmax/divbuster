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
const fetchSingleSchoolMedicalReport = async (id:string) => {
  const response = await adminAxios.get(`/dive-school-medical-form/${id}`);
  return response.data;
}

export const useFetchSingleSchoolMedicalReport = (id:string) => {
  return useQuery({
    queryKey: ["single-School-Medical-report",id],
    queryFn: ()=>fetchSingleSchoolMedicalReport(id),
    enabled:!!id
  });
};

