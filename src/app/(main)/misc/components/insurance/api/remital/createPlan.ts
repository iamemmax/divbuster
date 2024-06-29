import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp{
    verifiedPhoneNumber: string;
    plan_type: string,
    plan_duration:string
}

export const createPlanRequest = async ({ verifiedPhoneNumber, plan_type,plan_duration }: planProp) => {
    
  const response = await adminAxios.post(`life-insurance/create-health-plan/?phone_number=${verifiedPhoneNumber}`, {
        plan_type,
        plan_duration
    });
    return response?.data;
};


export const useCreatePlanRequest = () =>

  useMutation({
    mutationFn: createPlanRequest
  })







