import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";
import { pinType } from "../../modals/remital/RemitalModalDetails";


export const checkRemitalOtp = async ({ pin }: pinType) => {
  
    
    const response = await adminAxios.post(`life-insurance/check-remita-user/`, {
        pin
    });
    return response?.data;
};


export const useCheckRemitalOtp = () =>

  useMutation({
    mutationFn: checkRemitalOtp
  })