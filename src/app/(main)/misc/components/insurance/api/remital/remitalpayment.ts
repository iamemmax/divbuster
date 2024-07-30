import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp{
  userId: string;
  plan_type: string;
    duration:number
}

export const makeRemitalPayment = async ({ userId,duration,plan_type }: planProp) => {
    
  const response = await adminAxios.post(`/create-health-plan/`, {
       user_id:userId, 
    duration,
  plan_type
    
    });
    return response?.data;
};


export const useMakeRemitalPayment = () =>

  useMutation({
    mutationFn: makeRemitalPayment
  })







