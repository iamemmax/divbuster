import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

const deletePhysicianReport = async (id: number) => {
  const response = await adminAxios.delete(
    `/dive-physician-report/${id}/delete`
  );
  return response.data;
};

export const useDeletePhysicianReport = () => {
  return useMutation({
    mutationFn: deletePhysicianReport,
  });
};

