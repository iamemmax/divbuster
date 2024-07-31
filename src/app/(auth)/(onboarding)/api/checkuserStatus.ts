import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';



export const checkUserLoginStatus = async ( phone_number:string) => {
    
  const response = await adminAxios.post(`user/get-un_authenticated_user-details/`, {
       phone_number
    });
    return response?.data;
};


export const useCheckUserLoginStatus = () =>

  useMutation({
    mutationFn: checkUserLoginStatus
  })







