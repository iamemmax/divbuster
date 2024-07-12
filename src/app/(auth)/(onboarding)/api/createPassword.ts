import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


type passwordformProps = {
   
        email: string;
        password: string;
    confirmpassword: string;
    phone: string;
 
}
export const changePassword = async ({ email,password,phone,confirmpassword }: passwordformProps) => {
    
  const response = await adminAxios.post(`life-insurance/create-password/?phone_number=${phone}`, {
        email,
        password1:password,
        password2:confirmpassword,
    });
    return response?.data;
};


export const useChangePassword = () =>

  useMutation({
    mutationFn: changePassword
  })







