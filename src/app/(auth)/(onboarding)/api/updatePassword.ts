import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';

interface prop{
     phone_number: string;
        otp: string;
        new_password: string;
        confirm_password: string;
}
export const updatePassword = async ({phone_number,otp,new_password,confirm_password}:prop) => {
    
  const response = await adminAxios.post(`/user/auth/reset-password/`, {
      phone_number,
      otp,
      new_password,
      confirm_password
      
    });
    return response?.data;
};


export const useUpdatePassword = () =>

  useMutation({
    mutationFn: updatePassword
  })







