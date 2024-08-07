import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp {
  phone_number: string;
  packages: string;
  number_of_recipient: number;
  duration: number;
}


export const createReferralPlanRequest = async ({ packages,phone_number,number_of_recipient,duration }: planProp) => {
    
  const response = await adminAxios.post(`new_user_request/`, {
       package:packages,phone_number,number_of_recipient,duration
    });
    return response?.data;
};


export const useCreateReferralPlanRequest = () =>

  useMutation({
    mutationFn: createReferralPlanRequest
  })







