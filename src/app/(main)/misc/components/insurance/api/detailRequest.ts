import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";
import { detailRequestType } from "../modals/CheckPhoneNumber";

export const checkRemitalUser = async ({ phone_number }: detailRequestType) => {
    console.log(phone_number);
    
    const response = await adminAxios.post(`life-insurance/check-remita-user/`, {phone_number:phone_number});
  // return response?.data;
   return { status: response.status, data: response?.data };
};
  



export const useCheckRemitalUser = () =>

  useMutation({
    mutationFn: checkRemitalUser
  })