import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp {
  phone_number: string;
 
}


export const createUserDetailsRequest = async ({ phone_number }: planProp) => {
    
  const response = await adminAxios.post(`user/get-un_authenticated_user-details/`, {
      phone_number
    });
    return response?.data;
};


export const useCreateUserDetailsRequest = () =>

  useMutation({
    mutationFn: createUserDetailsRequest
  })







