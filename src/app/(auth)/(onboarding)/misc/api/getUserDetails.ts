
// import { adminLoanAxios } from '@/lib/axios';
 import { adminAxios } from '@/lib/axios';

import { useQuery } from 'react-query';

import { UserEntities } from '../types';

export interface NoPinError {
  error: string;
  message: string;
  create_transaction_pin_link: string;
}

export const getAuthenticatedUser = async (): Promise<UserEntities> => {
  const { data } = await adminAxios.get('/agency/user/get_user_details/');
  return data;
};

export const useUser = () =>
  useQuery('user-details', getAuthenticatedUser, { cacheTime: 1000 * 60 * 5 });
