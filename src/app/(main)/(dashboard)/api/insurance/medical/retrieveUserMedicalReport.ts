import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";

interface medicalReport {
  detail: string;
  data: Data;
}

interface Data {
  id: number;
  questions: Question[];
  answers: Answers;
  signature: string;
  parent_or_guardian_signature: string;
  physician_name: string;
  hospital_name: string;
  physician_email: string;
  physician_signature: string;
  physician_report: string;
  last_signed_on: string;
  created_on: string;
  updated_on: string;
}
interface Answers {
  [key: string]: string;
}
interface Question {
  id: number;
  text: string;
  question_slug: string;
  question_type: string;
  created_on: string;
}
const fetchMedicalReport = async () => {
 const response = await adminAxios.get<medicalReport>(`/medical-form-answer`);
    return response.data;
}



export const useFetchMedicalReport = () => {
  return useQuery({
    queryKey: ["user-medical report"],
    queryFn: fetchMedicalReport,
  });
};

