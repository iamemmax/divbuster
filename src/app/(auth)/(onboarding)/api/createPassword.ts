import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


type passwordformProps = {
   
        email: string;
        password: string;
    confirm_password: string;
    phone_number: string;
 
}
export const changePassword = async ({ email,password,confirm_password,phone_number }: passwordformProps) => {
    
  const response = await adminAxios.post(`user/auth/create-password/`, {
        email,
        password,
    confirm_password,
        phone_number
    });
    return response?.data;
};


export const useChangePassword = () =>

  useMutation({
    mutationFn: changePassword
  })







