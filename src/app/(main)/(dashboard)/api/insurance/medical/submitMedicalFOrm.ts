import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";



interface prop{
     payload: {
    question_ids: number[];
    answers: Record<string, string>;
    signature: string;
    parent_or_guardian_signature: string;
    physician_name: string;
    hospital_name: string;
    physician_email: string;
    physician_signature: string;
    dive_instructor_id: number;
    doctor_report: string;
    lang: string;
}
}



const submitMedalReport = async ({payload}:prop) => {
 const response = await adminAxios.post(`/medical-form-answer`,payload);
    return response.data ;
}

export const useSubmitMedalReport = () => {
  return useMutation({
    mutationFn: submitMedalReport,
   
  });
};