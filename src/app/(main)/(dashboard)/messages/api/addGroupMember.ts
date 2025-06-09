import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";


interface groupProp {
  members: string[];
  group_id: string;
//   lang: string;
}


const addGroupMembers = async ({group_id,members}: groupProp) => {
  const response = await adminAxios.post("group-chat/add-participant", { group_id,members });
  return response.data;
};

/**
 * React Query hook for adding new group member
 * @returns Mutation object for adding new group member
 */
export const useAddGroupMembers = () => {
  return useMutation({
    mutationFn: addGroupMembers,
   
  });
}
