import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface prop {
  payload: {
    id: number;
    question_ids: number[];
    answers: Record<string, string>;
    signature: string;
    parent_or_guardian_signature: string;
    dive_instructor_id: number;
    dive_school_id: number;
    lang: string;
  };
}

const updateDiveSchoolLiabilityReport = async ({ payload }: prop) => {
  const response = await adminAxios.put(
    `/medical-form-answer/${payload.id}`,
    payload
  );
  return response.data;
};

export const useUpdateDiveSchoolMedical = () => {
  return useMutation({
    mutationFn: updateDiveSchoolLiabilityReport,
  });
};

