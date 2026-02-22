import { adminAxios } from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

const setDefaultCertification = async (id: number) => {
  // Backend endpoint may vary; this uses a reasonable default path.
  const response = await adminAxios.post(`/certificates/default/${id}`);
  return response.data;
};

export const useSetDefaultCertification = () => {
  const queryClient = useQueryClient();
  return useMutation(setDefaultCertification, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-certifications"] });
    },
  });
};
