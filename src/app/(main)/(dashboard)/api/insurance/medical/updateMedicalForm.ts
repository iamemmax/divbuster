import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";



interface prop{
     payload: {
      id:string

      question_ids: number[];
    answers: Record<string, string>;
    signature: string;
    parent_or_guardian_signature: string;
    physician_name: string;
    hospital_name: string;
    physician_email: string;
    physician_signature: string;
    dive_instructor_id: number;
    physician_report: string;
    lang: string;
  
}
}



const updateMedalReport = async ({payload}:prop) => {
 const response = await adminAxios.put(`/medical-form-answer/${payload.id}`,payload);
    return response.data ;
}

export const useUpdateMedalReport = () => {
  return useMutation({
    mutationFn: updateMedalReport,
   
  });
};