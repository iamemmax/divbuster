import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';

interface verifyProp {
  account_number: string;
  bank_code: string;
}


export const verifyAccountNumber = async ({ account_number,bank_code }: verifyProp) => {
    
  const response = await adminAxios.post(`wallet/bank_verification/`, {
      account_number,bank_code
    });
    return response?.data;
};


export const useVerifyAccountNumber = () =>

  useMutation({
    mutationFn: verifyAccountNumber
  })







