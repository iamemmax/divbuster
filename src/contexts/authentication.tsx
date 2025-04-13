"use client";

// Auth strategy inspired by: https://theodorusclarence.com/blog/nextjs-redirect-no-flashing.

import React from "react";

import {
  adminAxios, // ngrokAxios,
  deleteAxiosDefaultToken,
  setAxiosDefaultToken,
} from "@/lib/axios";
import { AuthState, AuthAction, AuthDispatch } from "@/app/(auth)/(onboarding)/misc/types";
import { tokenStorage } from "@/app/(auth)/(onboarding)/misc/utils";


const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

const authReducer: React.Reducer<AuthState, AuthAction> = (
  state: AuthState,
  action: AuthAction
) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };

    case "LOGOUT":
      tokenStorage.clearToken();
      return { ...state, isAuthenticated: false, user: null };

    case "STOP_LOADING":
      return { ...state, isLoading: false };

    default:
      throw new Error("Unknown action type");
  }
};

const AuthContext = React.createContext<{
  authState: AuthState;
  authDispatch: AuthDispatch;
}>({ authState: initialAuthState, authDispatch: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, authDispatch] = React.useReducer(
    authReducer,
    initialAuthState
  );

  // React.useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const token = tokenStorage.getToken();

  //       if (token === null || token === undefined) {
  //         return;
  //       }

  //       setAxiosDefaultToken(token, adminAxios);

  //       const user = await {getAuthenticatedUser()};
  //       authDispatch({ type: "LOGIN", payload: user });
  //     } catch (err) {
  //       tokenStorage.clearToken();
  //       deleteAxiosDefaultToken();
  //     } finally {
  //       authDispatch({ type: "STOP_LOADING" });
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
