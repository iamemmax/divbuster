import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


type userformProps = {
   
        first_name: string;
        last_name: string;
        phone_number: string;
 
}
export const updateUserData = async ({ phone_number,first_name,last_name }: userformProps) => {
    
  const response = await adminAxios.post(`/user/update_customer_names/`, {
        first_name,
        last_name,
        phone_number
    });
    return response?.data;
};


export const useUpdateUserData = () =>

  useMutation({
    mutationFn: updateUserData
  })







