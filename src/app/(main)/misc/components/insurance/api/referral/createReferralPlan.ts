import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp {
  phone_number: string;
  packages: string;
  number_of_recipient: number;
  duration: number;
  referral_code:string
}


export const createReferralPlanRequest = async ({ packages, referral_code,phone_number,number_of_recipient,duration }: planProp) => {
    
  const response = await adminAxios.post(`new_user_request/`, {
       package:packages,phone_number,number_of_recipient,duration,referral_code
    });
    return response?.data;
};


export const useCreateReferralPlanRequest = () =>

  useMutation({
    mutationFn: createReferralPlanRequest
  })







