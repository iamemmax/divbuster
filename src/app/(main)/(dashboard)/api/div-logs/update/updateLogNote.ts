import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";


interface addBuddyprop {
    id:string
show_notes: boolean;
    public_note: string;
    private_note: string;
}



const updateLogNote = async ({private_note,public_note,show_notes,id}:addBuddyprop) => {
 const response = await adminAxios.put(`/dive/dive-log/${id}/edit`,{
    private_note,public_note,show_notes
 });
    return response.data ;
}

export const useUpdateLogNote = () => {
  return useMutation({
    mutationFn: updateLogNote,
   
  });
};