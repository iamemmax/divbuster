import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp{
    userId: string;

    plan_duration:string
}

export const createPlanRequest = async ({ userId,plan_duration }: planProp) => {
    
  const response = await adminAxios.post(`life-insurance/create-health-plan/`, {
        user_id:userId,
        duration:plan_duration
    });
    return response?.data;
};


export const useCreatePlanRequest = () =>

  useMutation({
    mutationFn: createPlanRequest
  })







