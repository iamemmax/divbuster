import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface Prop{
  verifiedPhoneNumber:string, pin:string
}

export const checkRemitalOtp = async ({verifiedPhoneNumber,pin}:Prop) => {
  
    
    const response = await adminAxios.post(`user/auth/verify/`, {
      recipient: verifiedPhoneNumber,
      otp:pin
    });
    return response?.data;
};


export const useCheckRemitalOtp = () =>

  useMutation({
    mutationFn: checkRemitalOtp
  })