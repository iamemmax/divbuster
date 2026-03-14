import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";



interface prop{
     payload: {
    question_ids: number[];
    answers: Record<string, string>;
    signature: string;
    parent_or_guardian_signature: string;
    physician_name?: string;
    hospital_name?: string;
    physician_email?: string;
    physician_signature?: string;
    dive_instructor_id: number;
    physician_report?: string;
    show_physician_details?: boolean;
    lang: string;
    dive_school_id: number;

}
}



const submitDiveSchoolMedalReport = async ({payload}:prop) => {
 const response = await adminAxios.post(`/medical-form-answer`,payload);
    return response.data ;
}

export const useSubmitMedalSchoolReport = () => {
  return useMutation({
    mutationFn: submitDiveSchoolMedalReport,
   
  });
};