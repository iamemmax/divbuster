import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp {
  phone_number: string;
 
}


export const checkUserActivePlan = async ({ phone_number }: planProp) => {
    
  const response = await adminAxios.post(`/check_user_active_health_plan/`, {
      phone_number
    });
    return response?.data;
};


export const useCheckUserActivePlan = () =>{
    return useMutation({
        mutationFn:checkUserActivePlan
    })
}








