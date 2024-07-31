import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';

interface withdrawProp {
  account_name: string;
  bank_name: string;
  account_number: string;
  bank_code: string;
  amount: number;
  narration: string;
}

export const withdrawalReferral = async ({ account_number,bank_code,bank_name,account_name,narration,amount }: withdrawProp) => {
    
  const response = await adminAxios.post(`wallet/referral_reward_withdrawal/`, {
      account_name,
      bank_name,
      account_number,
      bank_code,
      narration,
      amount
    });
    return response?.data;
};


export const useWithdrawalReferral = () =>

  useMutation({
    mutationFn: withdrawalReferral
  })







