import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


export const resentOtp = async (phone_number:string) => {
    
  const response = await adminAxios.post(`/user/auth/resend-otp/`,{phone_number});
    return response?.data;
};


export const useResentOtp = () =>

  useMutation({
    mutationFn: resentOtp
  })







