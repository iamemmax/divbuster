"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { tokenStorage } from "@/app/(auth)/utils";
import { adminAxios, deleteAxiosDefaultToken, setAxiosDefaultToken } from "@/lib/axios";
import { UserDataProp } from "./types";

// // Define types
// export interface User {
//   id: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   [key: string]: any;
// }


// interface RootObject {
//   detail: string;
//   data: Data;
// }

export interface User {
  id: number;
  profile_details: Profiledetails;
  diver_profile: Diverprofile;
  current_location: Currentlocation;
  wallet: Wallet;
  archievements: null;
  certificates: null;
  active_subscription: null;
  latest_transactions: null;
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
  height: null;
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
  favourite_sites: number[];
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
  stripe_customer_id: string;
  created_on: string;
  updated_on: string;
  country: number;
  referred_by: null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "STOP_LOADING" };

interface AuthContextType {
  authState: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  try {
    console.log("Auth Reducer: Action received", action.type);
    
    switch (action.type) {
      case "LOGIN":
        console.log("Auth Reducer: Processing LOGIN action");
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          isLoading: false,
        };

      case "LOGOUT":
        console.log("Auth Reducer: Processing LOGOUT action");
        
        try {
          // Log tokens before clearing
          const divbusterToken = localStorage.getItem("DIVBUSTERTOKEN");
          console.log("DIVBUSTERTOKEN before clearing:", divbusterToken ? "exists" : "not found");
          
          // Clear token from localStorage
          tokenStorage.clearToken();
          tokenStorage.clearAll();
          
          // Explicitly clear DIVBUSTER tokens
          localStorage.removeItem("DIVBUSTERTOKEN");
          localStorage.removeItem("DIVBUSTERTOKENS");
          localStorage.removeItem("DIVBUSTERSAVED_LOGIN_CREDENTIALS");
          
          // Log tokens after clearing
          const divbusterTokenAfter = localStorage.getItem("DIVBUSTERTOKEN");
          console.log("DIVBUSTERTOKEN after clearing:", divbusterTokenAfter ? "still exists" : "successfully removed");
          
          // Remove token from axios headers
          deleteAxiosDefaultToken();
        } catch (error) {
          console.error("Error during logout:", error);
        }
        
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          isLoading: false,
        };

      case "STOP_LOADING":
        console.log("Auth Reducer: Processing STOP_LOADING action");
        return { ...state, isLoading: false };

      default:
        return state;
    }
  } catch (error) {
    console.error("Error in auth reducer:", error);
    // Return a safe state if there's an error
    return {
      ...state,
      isLoading: false,
    };
  }
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  // Check for token on mount
  useEffect(() => {
    try {
      const token = tokenStorage.getToken();
      console.log("Token found:", !!token);
      
      if (token) {
        // Set token for API requests
        setAxiosDefaultToken(token, adminAxios);
        
        // Fetch user data
        adminAxios
          .get("/profile")
          .then((response) => {
            const userData = response.data?.data as User;
            if (userData) {
              authDispatch({ type: "LOGIN", payload: userData });
            } else {
              authDispatch({ type: "STOP_LOADING" });
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            authDispatch({ type: "STOP_LOADING" });
          });
      } else {
        console.log("No token found, stopping loading");
        authDispatch({ type: "STOP_LOADING" });
      }
    } catch (error) {
      console.error("Error in auth initialization:", error);
      authDispatch({ type: "STOP_LOADING" });
    }
  }, []);

  // console.log("Auth state updated:", authState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
