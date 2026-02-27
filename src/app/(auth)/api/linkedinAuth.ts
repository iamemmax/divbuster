import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";
import { useAuth } from "@/contexts/authentication";
import { tokenStorage } from "../utils";
import { setAxiosDefaultToken } from "@/lib/axios";
import { getAuthenticatedUser } from "./getAuthenticatedUser";



interface LinkedInAuthPayload {
  provider: string;
  access_token: string;
  lang: string;
}

// Function to handle LinkedIn authentication
const linkedinAuth = async (token: string, language: string = "english") => {
  const payload: LinkedInAuthPayload = {
    provider: "linkedin",
    access_token: token,
    lang: language
  };
  
  return adminAxios.post("/social", payload);
};

export const useLinkedInAuth = () => {
  const { authDispatch } = useAuth();

  return useMutation("linkedinAuth", 
    ({ token, language }: { token: string; language?: string }) => 
      linkedinAuth(token, language),
    {
      onSuccess: async ({ data }) => {
      const token = data?.access_token;
      
        

        // Store the token
        tokenStorage.setToken(token);
        
        // Set the token for future requests
        setAxiosDefaultToken(token, adminAxios);

        try {
          // Fetch user data after successful login
          const user = await getAuthenticatedUser();
               
          
          if (authDispatch) {
            // Update auth state with user data
            authDispatch({ type: "LOGIN", payload: user });
          }
        } catch (error) {
          authDispatch?.({ type: "STOP_LOADING" });
        }
      },
      onError: () => {
        authDispatch?.({ type: "STOP_LOADING" });
      }
    }
  );
};

