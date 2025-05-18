import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useAuth } from "@/contexts/authentication";
import { adminAxios, setAxiosDefaultToken } from "@/lib/axios";
import { LoginDetailsValue } from "../login/page";
import { tokenStorage } from "../utils";

interface TokenResponse {
  detail: string;
  data: Data;
  access_token: string;
}

interface Data {
  id: number;
  profile_details: Profiledetails;
  diver_profile: Diverprofile;
  current_location: Currentlocation;
  wallet: Wallet;
  archievements: null;
  certificates: null;
  active_subscription: null;
  latest_transactions: Latesttransaction[];
  dashboard_analysis: Dashboardanalysis;
  suggested_divers: Suggesteddiver[];
  suggested_challenges: null;
  suggested_activities: null;
  is_dive_instructor: null;
  last_login: null;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
}

interface Suggesteddiver {
  id: number;
  full_name: string;
  profile_picture: null | string;
  coordinate: Coordinate;
  invite_id: string;
  recent_dive_info: Recentdiveinfo;
}

interface Recentdiveinfo {
  start_date: null;
  end_date: null;
  bottom_time: null;
  depth: null;
  other_divers: null;
  dive_image: null;
}

interface Coordinate {
  lon: string;
  lat: string;
}

interface Dashboardanalysis {
  dives: number;
  dives_last_month: number;
  dive_spots: number;
  dive_spots_last_month: number;
  bottom_time: number;
  bottom_time_last_month: number;
  max_depth: number;
  max_depth_last_month: number;
}

interface Latesttransaction {
  id: number;
  amount: number;
  direction: string;
  transaction_type: string;
  payment_method: string;
  transaction_status: string;
  payment_gateway: null;
  return_url: null;
  narration: string;
  reference: string;
  created_on: string;
  updated_on: string;
  plan: number;
}

interface Wallet {
  balance: number;
  created_on: string;
  updated_on: string;
}

interface Currentlocation {
  id: number;
  lon: number;
  lat: number;
  updated_on: string;
}

interface Diverprofile {
  id: number;
  dive_spots: number;
  dive_image: null;
  certification_level: null;
  dive_count: number;
  public: boolean;
  buddies: null;
  height: string;
  body_size: string;
  measurement_unit: string;
  temp_unit: string;
  shoe_size: string;
  shoe_value: number;
  diver_type: string;
  facebook: null;
  online: boolean;
  created_on: string;
  updated_on: string;
  favourite_sites: any[];
}

interface Profiledetails {
  id: number;
  language: string;
  phone_number: string;
  nickname: string;
  dob: string;
  invite_id: string;
  account_type: string;
  profile_picture: string;
  referral_code: string;
  verified: boolean;
  verification_token: string;
  auth_provider: string;
  token_expiry: string;
  stripe_customer_id: null;
  created_on: string;
  updated_on: string;
  country: number;
  referred_by: null;
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
      
      console.log("Login successful, token received:", token);
      
      // Store the token
      tokenStorage.setToken(token);
      console.log("Token saved to localStorage");
      
      // Set the token for future requests
      setAxiosDefaultToken(token, adminAxios);
      console.log("Token set for axios requests");

      try {
        // Fetch user data after successful login
        console.log("Fetching user data after login");
        const userResponse = await adminAxios.get('/profile');
        const userData = userResponse.data?.data;
        console.log("User data fetched successfully:", userData);
        
        if (authDispatch) {
          // Update auth state with user data
          authDispatch({ type: "LOGIN", payload: userData });
          console.log("Auth state updated with user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        authDispatch?.({ type: "STOP_LOADING" });
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      authDispatch?.({ type: "STOP_LOADING" });
    }
  });
  };
