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
const fetchInsuranceQuestions = async (type:"medical"| 'liability', lang:string) => {
 const response = await adminAxios.get<questionProps>(`/dive-insurance-questions?type=${type}&lang=${lang}`);
    return response.data;
}



export const useFetchInsuranceQuestions = (type:"medical"| 'liability',lang:string) => {
  return useQuery({
    queryKey: ["insurance-question", type,lang],
    queryFn: ()=>fetchInsuranceQuestions(type, lang),
    enabled:!!type && !!lang
  });
};