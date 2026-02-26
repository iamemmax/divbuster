import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface prop {
  payload: {
    question_ids: number[];
    answers: Record<string, string>;
    signature: string;
    parent_or_guardian_signature: string;
    dive_instructor_id: number;
    dive_school_id: number;
    lang: string;
  };
}

const submitDiveSchoolLiabilityReport = async ({ payload }: prop) => {
  const response = await adminAxios.post(`/liability-form-answer`, payload);
  return response.data;
};

export const useSubmitDiveSchoolLiabilityReport = () => {
  return useMutation({
    mutationFn: submitDiveSchoolLiabilityReport,
  });
};

