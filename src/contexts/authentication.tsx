"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { tokenStorage } from "@/app/(auth)/utils";
import { adminAxios, deleteAxiosDefaultToken, setAxiosDefaultToken } from "@/lib/axios";
import { UserDataProp } from "./types";
import { certificates } from "@/app/(main)/(dashboard)/api/buddy/fetchBuddyProfile";
import { getAuthenticatedUser, User, userDetails } from "@/app/(auth)/api/getAuthenticatedUser";




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

      if (!token) {
        authDispatch({ type: "STOP_LOADING" });
        return;
      }

      setAxiosDefaultToken(token, adminAxios);

      const user = await getAuthenticatedUser();
      authDispatch({ type: "LOGIN", payload: user });
    } catch (err) {
      // If token invalid, clear and logout
      tokenStorage.clearToken();
      deleteAxiosDefaultToken();
      authDispatch({ type: "LOGOUT" });
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
