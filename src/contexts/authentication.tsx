"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { tokenStorage } from "@/app/(auth)/utils";
import { adminAxios, deleteAxiosDefaultToken, setAxiosDefaultToken } from "@/lib/axios";
import { UserDataProp } from "./types";
import { certificates } from "@/app/(main)/(dashboard)/api/buddy/fetchBuddyProfile";
import { getAuthenticatedUser, User, userDetails } from "@/app/(auth)/api/getAuthenticatedUser";

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


export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: userDetails }
  | { type: "LOGOUT" }
  | { type: "STOP_LOADING" }
  | { type: "REMOVE_SUGGESTED_DIVER"; payload: number }; 

interface AuthContextType {
  authState: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
  // refetchUser: () => Promise<void>; // 
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
    
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload?.data,
          isLoading: false,
        };
        

      case "LOGOUT":
        
        try {
          // Log tokens before clearing
          const divbusterToken = localStorage.getItem("DIVBUSTERTOKEN");
          
          // Clear token from localStorage
          tokenStorage.clearToken();
          tokenStorage.clearAll();
          
          // Explicitly clear DIVBUSTER tokens
          localStorage.removeItem("DIVBUSTERTOKEN");
          localStorage.removeItem("DIVBUSTERTOKENS");
          localStorage.removeItem("DIVBUSTERSAVED_LOGIN_CREDENTIALS");
          
          // Log tokens after clearing
          const divbusterTokenAfter = localStorage.getItem("DIVBUSTERTOKEN");
          
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
case "REMOVE_SUGGESTED_DIVER":
        if (!state.user) return state;
        
        return {
          ...state,
          user: {
            ...state.user,
            suggested_divers: state.user.suggested_divers.filter(
              diver => diver.id !== action.payload
            )
          }
        };
      case "STOP_LOADING":
        return { ...state, isLoading: false };

      default:
        return state;
    }
  } catch (error) {
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
    const fetchUser = async () => {
      try {
        const token = tokenStorage.getToken();

        if (token === null || token === undefined) {
          return;
        }

        setAxiosDefaultToken(token, adminAxios);

        const user =  await getAuthenticatedUser() 
        authDispatch({ type: "LOGIN", payload: user });
      } catch (err) {
        tokenStorage.clearToken();
        deleteAxiosDefaultToken();
      } finally {
        authDispatch({ type: "STOP_LOADING" });
      }
    };

    fetchUser();
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
