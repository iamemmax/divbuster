import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp{
    userId: string;
    plan_duration:string;
    plan_type:string
}


export const createIndividualPlanRequest = async ({ userId,plan_duration,plan_type }: planProp) => {
    
  const response = await adminAxios.post(`create-health-plan/`, {
        user_id:userId,
        duration:plan_duration,
        plan_type
    });
    return response?.data;
};


export const useCreateIndividualPlanRequest = () =>

  useMutation({
    mutationFn: createIndividualPlanRequest
  })







