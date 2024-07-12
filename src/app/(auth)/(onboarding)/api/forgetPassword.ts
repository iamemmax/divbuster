import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


export const forgetPassword = async (  phone_number: string) => {
    
  const response = await adminAxios.post(`/user/auth/change-password/`, {
        phone_number,
      
    });
    return response?.data;
};


export const useForgetPassword = () =>

  useMutation({
    mutationFn: forgetPassword
  })







