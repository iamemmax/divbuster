import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";
// import { detailRequestNiNType } from "../../modals/non-remital/NonRemitalModal";


interface Prop{
    address:string, userId:string,nin:string,email:string
}
export const checkNinUser = async ({userId,nin,email,address}:Prop) => {
    // console.log(phone_number);
    
    const response = await adminAxios.post(`/user/update_non_remita_users_details/${userId}`, { nin,email,address});
    return response?.data;
};


export const useCheckNinUser = () =>

  useMutation({
    mutationFn: checkNinUser
  })
//   37315057084
//   21563101196