import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";
interface liabilityForm {
  detail: string;
  data: Data;
}

interface Data {
  id: number;
  answers: Answers;
  participant_name: null;
  signature: string;
  parent_or_guardian_signature: string;
  last_signed_on: string;
  created_on: string;
  updated_on: string;
  questions: number[];
}

interface Answers {
  [key: string]: string;
}
const fetchLiabilityReport = async () => {
  const response = await adminAxios.get<liabilityForm>(`/liability-form-answer`);
  return response.data;
}

export const useFetchLiabilityReport = () => {
  return useQuery({
    queryKey: ["user-liability-report"],
    queryFn: fetchLiabilityReport,
  });
};

