import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface questionProps {
  detail: string;
  data: Datum[];
}

interface Datum {
  id: number;
  text: string;
  question_slug: string;
  question_type: string;
  created_on: string;
}
const fetchInsuranceQuestions = async (type:"medical"| 'liability') => {
 const response = await adminAxios.get<questionProps>(`/dive-insurance-questions?type=${type}`);
    return response.data;
}



export const useFetchInsuranceQuestions = (type:"medical"| 'liability') => {
  return useQuery({
    queryKey: ["insurance-question", type],
    queryFn: ()=>fetchInsuranceQuestions(type),
    enabled:!!type
  });
};