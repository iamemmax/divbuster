import { adminAxios } from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

const setDefaultCertification = async (id: number) => {
  // Backend endpoint - sends PUT request to set certificate as default
  const formData = new FormData();
  formData.append("default", "true");

  const response = await adminAxios.put(`/certificates/edit/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useSetDefaultCertification = () => {
  const queryClient = useQueryClient();
  return useMutation(setDefaultCertification, {
    onSuccess: () => {
      // Invalidate both certifications and user details to update default certificate across the app
      queryClient.invalidateQueries({ queryKey: ["fetch-certifications"] });
      queryClient.invalidateQueries({ queryKey: ["user-details"] });
    },
  });
};
