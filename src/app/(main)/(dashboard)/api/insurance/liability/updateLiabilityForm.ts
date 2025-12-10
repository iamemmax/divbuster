import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";



interface prop {
  payload: {
    id: string
    question_ids: number[];
    answers: Record<string, string>;
    signature: string;
    parent_or_guardian_signature: string;
    dive_instructor_id: number;
    lang: string;
  }
}



const updateLiabilityReport = async ({ payload }: prop) => {
  const response = await adminAxios.put(`/liability-form-answer/${payload.id}`, payload);
  return response.data;
}

export const useUpdateLiabilityReport = () => {
  return useMutation({
    mutationFn: updateLiabilityReport,

  });
};