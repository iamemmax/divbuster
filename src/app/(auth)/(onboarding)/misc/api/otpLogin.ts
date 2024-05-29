import { savingsAxios, setAxiosDefaultToken } from '@/lib/axios';
import { useAuth } from '@/contexts/authentication';

import { useMutation } from 'react-query';

import type { AxiosResponse } from 'axios';

import { LoginOtpDto } from '../types';
import { tokenStorage } from '../utils';

import { getAuthenticatedUser } from './index';

interface TokenResponse {
  access: string;
}

const postOtpLogin = (loginOtpDto: LoginOtpDto): Promise<AxiosResponse<TokenResponse>> => savingsAxios.post('/accounts/login_with_otp/', loginOtpDto);

export const usePostOtpLogin = () => {
  const { authDispatch } = useAuth();

  return useMutation('login', postOtpLogin, {
    onSuccess: async ({ data }) => {
      const { access: token } = data;

      tokenStorage.setToken(token);
      setAxiosDefaultToken(token, savingsAxios);

      const user = await getAuthenticatedUser();

      if (authDispatch) {
        authDispatch({ type: 'LOGIN', payload: user });

        authDispatch({ type: 'STOP_LOADING' });
      }
    },
  });
};
