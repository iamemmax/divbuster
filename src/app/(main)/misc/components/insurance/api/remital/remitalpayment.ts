import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp{
  userId: string;
  plan_type: string;
  duration: number,
  number_of_recipient: number
}

export const makeRemitalPayment = async ({ userId,duration,plan_type,number_of_recipient }: planProp) => {
    
  const response = await adminAxios.post(`create-health-plan/`, {
       user_id:userId, 
    duration,
    plan_type,
  number_of_recipient
    
    });
    return response?.data;
};


export const useMakeRemitalPayment = () =>

  useMutation({
    mutationFn: makeRemitalPayment
  })







