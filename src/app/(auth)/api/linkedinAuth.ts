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
  console.log(payload);
  
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
      
        
        console.log("LinkedIn auth successful, token received:", token);

        // Store the token
        tokenStorage.setToken(token);
        console.log("Token saved to localStorage");
        
        // Set the token for future requests
        setAxiosDefaultToken(token, adminAxios);
        console.log("Token set for axios requests");

        try {
          // Fetch user data after successful login
          console.log("Fetching user data after LinkedIn login");
          const user = await getAuthenticatedUser();
               
          
          if (authDispatch) {
            // Update auth state with user data
            authDispatch({ type: "LOGIN", payload: user });
            console.log("Auth state updated with user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          authDispatch?.({ type: "STOP_LOADING" });
        }
      },
      onError: (error) => {
        console.error("LinkedIn auth error:", error);
        authDispatch?.({ type: "STOP_LOADING" });
      }
    }
  );
};

