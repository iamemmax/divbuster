
import { adminAxios } from '@/lib/axios';

import { useQuery } from 'react-query';

export interface NoPinError {
  error: string;
  message: string;
  create_transaction_pin_link: string;
}

export interface BankLists {
  message: string;
  bank: BankEntity[];
}

export interface BankEntity {
  bank_code: string;
  cbn_code?: string;
  name: string;
  bank_short_name?: string;
}

export const getBanks = async (): Promise<BankLists> => {
  const { data } = await adminAxios.get('accounts/bank_list/');
  return data;
};

export const useBanks = () =>
  useQuery('all-banks', getBanks, {});
