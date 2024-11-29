import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface Prop{
  verifiedPhoneNumber:string, pin:string
}

export interface successProp {
  message: string;
}
export const validateOtp = async ({verifiedPhoneNumber,pin}:Prop) => {
  
    
    const response = await adminAxios.post(`user/validate_otp/`, {
        phone_number: verifiedPhoneNumber,
        code:pin
    });
    return response?.data as successProp;
};


export const useValidateOtp = () =>

  useMutation({
    mutationFn: validateOtp
  })