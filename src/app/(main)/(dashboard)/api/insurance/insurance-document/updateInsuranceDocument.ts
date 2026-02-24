import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface UpdateInsuranceDocumentPayload {
  id: number;
   insurance_report: string;
  issuer_name: string;
  date_issued: string;
  start_date: string;
  end_date: string;
  policy_number: string;
}



const updateInsuranceDocument = async (payload: UpdateInsuranceDocumentPayload) => {
  const response = await adminAxios.put(
    `/dive-insurance-document/${payload.id}/edit`,payload);
  return response.data;
};

export const useUpdateInsuranceDocument = () => {
  return useMutation({
    mutationFn: updateInsuranceDocument,
  });
};



