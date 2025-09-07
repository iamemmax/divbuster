import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";




interface passwordProp {
  old_password: string;
  new_password: string;
  confirm_password: string;
  lang?: string;
}

const changeUserPassword = async ({confirm_password,new_password,old_password}:passwordProp) => {
 const response = await adminAxios.post(`/change-password`,{
confirm_password,new_password,old_password });
    return response.data ;
}

export const useChangeUserPassword = () => {
  return useMutation({
    mutationFn: changeUserPassword,
   
  });
};