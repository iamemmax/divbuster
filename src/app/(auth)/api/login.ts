import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useAuth } from "@/contexts/authentication";
import { adminAxios, setAxiosDefaultToken } from "@/lib/axios";
import { LoginDetailsValue } from "../login/page";
import { tokenStorage } from "../utils";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

interface TokenResponse {

  access_token: string;
}



// Extended type for user with game_episode


const login = (loginDto: LoginDetailsValue): Promise<AxiosResponse<TokenResponse>> =>
  adminAxios.post("login", loginDto, {
    headers: {
      // Remove Authorization header for login request
      Authorization: undefined
    }
  });

export const useLogin = () => {
  const { authDispatch } = useAuth();

  return useMutation("login", login, {
    onSuccess: async (response) => {
      const { data } = response;
      const token = data.access_token || data?.access_token;
      
      if (!token) {
        console.error("No token received in login response");
        return;
      }
      
      
      // Store the token
      tokenStorage.setToken(token);
      
      // Set the token for future requests
      setAxiosDefaultToken(token, adminAxios);

    
        // Fetch user data after successful login
        const user = await getAuthenticatedUser();
      
        
        if (authDispatch) {
          // Update auth state with user data
          authDispatch({ type: "LOGIN", payload: user });
          authDispatch?.({ type: "STOP_LOADING" });
        }
      
    },
    onError: (error) => {
      console.error("Login error:", error);
      authDispatch?.({ type: "STOP_LOADING" });
    }
  });
  };
