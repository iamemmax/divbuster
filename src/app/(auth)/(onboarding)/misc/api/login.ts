import { adminAxios, setAxiosDefaultToken } from '@/lib/axios';
import { useAuth } from '@/contexts/authentication';

import { useMutation } from "react-query";

import type { AxiosResponse } from "axios";

import { LoginDto } from "../types";
import { tokenStorage } from "../utils";

import { getAuthenticatedUser } from "./index";

interface TokenResponse {
  access: string;
  refresh: string;
}


const login = (loginDto: LoginDto): Promise<AxiosResponse<TokenResponse>> =>
  adminAxios.post("/user/auth/login/", loginDto);

  
export const useLogin = () => {
  const { authDispatch } = useAuth();

  return useMutation("login", login, {
    onSuccess: async ({ data }) => {
      const { access: token } = data;

      tokenStorage.setToken(token);
      setAxiosDefaultToken(token, adminAxios);

      const user = await getAuthenticatedUser();

      if (authDispatch) {
        authDispatch({ type: "LOGIN", payload: user });

        authDispatch({ type: "STOP_LOADING" });
      }
    },
  });
};
