import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";
import { useAuth } from "@/contexts/authentication";
import { tokenStorage } from "../utils";
import { setAxiosDefaultToken } from "@/lib/axios";

interface GoogleAuthResponse {
  status: string;
  message: string;
  tokens: {
    refresh: string;
    access: string;
  };
  data: [];
}

interface GoogleAuthPayload {
  provider: string;
  access_token: string;
  lang: string;
  is_auth_code?: boolean;
}

// Function to handle Google authentication
const googleAuth = async (token: string, language: string = "english") => {
  console.log("Google auth called with token:", token ? "Token exists" : "No token");
  
  // Determine if this is an access token or authorization code
  const isAuthCode = token.length < 100; // Authorization codes are typically shorter
  
  const payload: GoogleAuthPayload = {
    provider: "google",
    access_token: token,
    lang: language,
    // Add a flag to indicate if this is an authorization code
    is_auth_code: isAuthCode
  };
  
  return adminAxios.post<GoogleAuthResponse>("auth/google", payload);
};

export const useGoogleAuth = () => {
  const { authDispatch } = useAuth();

  return useMutation("googleAuth", 
    ({ token, language }: { token: string; language?: string }) => 
      googleAuth(token, language),
    {
      onSuccess: ({ data }) => {
        const { tokens } = data;
        const { access: token } = tokens;

        // Store the token
        tokenStorage.setToken(token);
        
        // Set the token for future requests
        setAxiosDefaultToken(token, adminAxios);

        if (authDispatch) {
          authDispatch({ type: "STOP_LOADING" });
        }
        
        // Don't use router here - we'll handle navigation in the component
      },
    }
  );
};





