import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp{
    phone_number: string;
  packages: string;
  number_of_recipient: number;
  duration: number;
}


export const createBeneficiaryPlanRequest = async ({ packages,phone_number,number_of_recipient,duration }: planProp) => {
    
  const response = await adminAxios.post(`beneficiary/`, {
    data:[{
        package: packages,
        phone_number,
        number_of_recipient,
        duration
    
    }]
  
    });
    return response?.data;
};


export const useCreateBeneficiaryPlanRequest = () =>

  useMutation({
    mutationFn: createBeneficiaryPlanRequest
  })







