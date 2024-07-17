import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


type passwordformProps = {
   
        email: string;
        password: string;
    confirm_password: string;
    // phone?: string;
 
}
export const changePassword = async ({ email,password,confirm_password }: passwordformProps) => {
    
  const response = await adminAxios.post(`user/auth/create-password/`, {
        email,
        password,
        confirm_password,
    });
    return response?.data;
};


export const useChangePassword = () =>

  useMutation({
    mutationFn: changePassword
  })







