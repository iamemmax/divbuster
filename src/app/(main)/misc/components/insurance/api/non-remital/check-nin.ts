import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";
import { detailRequestNiNType } from "../../modals/non-remital/NonRemitalModal";


export const checkNinUser = async ({ phone_number,email,nin }: detailRequestNiNType) => {
    console.log(phone_number);
    
    const response = await adminAxios.post(`life-insurance/check-nin-user/`, {phone_number,nin,email});
    return response?.data;
};


export const useCheckNinUser = () =>

  useMutation({
    mutationFn: checkNinUser
  })