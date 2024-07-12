import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp{
  userId: string;
    duration:number
}

export const makeRemitalPayment = async ({ userId,duration }: planProp) => {
    
  const response = await adminAxios.post(`/life-insurance/create-health-plan/`, {
       user_id:userId, 
  duration
    
    });
    return response?.data;
};


export const useMakeRemitalPayment = () =>

  useMutation({
    mutationFn: makeRemitalPayment
  })







