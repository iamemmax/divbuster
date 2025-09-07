// Add this API hook (create a new file or add to existing API file)
import { adminAxios } from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

interface UpdateVisibilityProps {
  id: string;
  isPublic: boolean; // Changed from 'public' to 'isPublic'
}

const updateDiveLogVisibility = async ({ id, isPublic }: UpdateVisibilityProps) => {
  const response = await adminAxios.put(`/dive/dive-log/${id}/edit`, {
    public: isPublic // Use bracket notation or map the property
  });
  return response.data;
};

export const useUpdateDiveLogVisibility = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateDiveLogVisibility,
    onSuccess: () => {
      // Invalidate and refetch dive logs
      queryClient.invalidateQueries(["div-logs"]);
    },
  });
};