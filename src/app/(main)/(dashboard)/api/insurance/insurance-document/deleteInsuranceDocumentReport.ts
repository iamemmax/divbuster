import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

const deleteInsuranceDocumentReport = async (id: number) => {
  const response = await adminAxios.delete(
    `/dive-insurance-document/${id}/delete`
  );
  return response.data;
};

export const useDeleteInsuranceDocumentReport = () => {
  return useMutation({
    mutationFn: deleteInsuranceDocumentReport,
  });
};

