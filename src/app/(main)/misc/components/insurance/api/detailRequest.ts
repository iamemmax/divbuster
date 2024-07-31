import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";
import { detailRequestType } from "../modals/CheckPhoneNumber";

export const checkRemitalUser = async ({ phone_number,referral_code }: detailRequestType) => {
    
  const response = await adminAxios.post(`check-remita-user/`, {
    phone_number: phone_number,
      referral_code:referral_code
    });
  // return response?.data;
   return { status: response.status, data: response?.data };
};
  



export const useCheckRemitalUser = () =>

  useMutation({
    mutationFn: checkRemitalUser
  })