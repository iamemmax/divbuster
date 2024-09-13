import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp {
  phone_number: string;
  first_name: string;

  last_name:string
}


export const createReferral = async ({ first_name,last_name,phone_number }: planProp) => {
    
  const response = await adminAxios.post(`referral/create_referral_code/`, {
       phone_number,
       last_name,
       first_name
    });
    return response?.data;
};


export const useCreateReferral = () =>

  useMutation({
    mutationFn: createReferral
  })







