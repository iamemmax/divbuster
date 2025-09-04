import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";


interface groupProp {
  id: string;
//   lang: string;
}


const existGroup = async ({id}: groupProp) => {
  const response = await adminAxios.delete(`group-chat/exit/${id}`);
  return response.data;
};

/**
 * React Query hook for adding new group member
 * @returns Mutation object for adding new group member
 */
export const useExistGroup = () => {
  return useMutation({
    mutationFn: existGroup,
   
  });
}
