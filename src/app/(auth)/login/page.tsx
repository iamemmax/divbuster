"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DiveBusterBlackLogo from "@/components/icons/DiveBusterBlackLogo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginUserSchema } from "../schema";
import { Button, ErrorModal } from "@/components/core";
import EyeIcon from "@/app/icons/EyeIcon";
import Link from "next/link";
import GoogleIcon from "@/app/icons/broswer/GoogleIcon";
import ReditIcon from "@/app/icons/broswer/ReditIcon";
import MicroSoftIcon from "@/app/icons/broswer/Microsofticon";
import LinkdIcon from "@/app/icons/broswer/Linkdin";
import AppleIcon from "@/app/icons/broswer/AppleIcon";
import { useLogin } from "../api/login";
import { useAuth } from "@/contexts/authentication";
import { useErrorModalState } from "@/hooks";
import { SmallSpinner } from "@/icons/core";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useGoogleAuth } from "../api/googleAuth";
import { useGoogleLogin } from "@react-oauth/google";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useLinkedInAuth } from "../api/linkedinAuth";

export type LoginDetailsValue = z.infer<typeof loginUserSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [origin, setOrigin] = useState("");
  
  // Set origin after component mounts to avoid window not defined error
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [showPassword, setShowPassword] = useState(false);
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<LoginDetailsValue>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      password: "",
      email: "",
    },
    mode: "onChange",
  });

  const { mutate: handleLogin, isLoading } = useLogin();
  const { mutate: handleGoogleAuth, isLoading: isGoogleLoading } = useGoogleAuth();
  const { mutate: handleLinkedInAuth, isLoading: isLinkedInLoading } = useLinkedInAuth();

  // Watch for authentication state changes
  useEffect(() => {
    if (authState.isAuthenticated && !authState.isLoading) {
      router.push("/");
    }
  }, [authState.isAuthenticated, authState.isLoading, router]);

  // Google login handler
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Google login success, token received:", response);
      handleGoogleAuth(
        { 
          token: response.access_token,
          language: "english" 
        },
        {
          onSuccess: () => {
            console.log("Google auth API success, redirecting to home");
            window.location.href = "/";
          },
          onError: (error) => {
            console.error("Google auth API error:", error);
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
          }
        }
      );
    },
    onError: (error) => {
      console.error("Google login error:", error);
      openErrorModalWithMessage("Google login failed. Please try again.");
    },
    flow: "implicit", // Use implicit flow to avoid redirect URI issues
    scope: "email profile", // Request basic profile info
    onNonOAuthError: (error) => {
      console.error("Non-OAuth error:", error);
      openErrorModalWithMessage("Google login failed: " + error.type);
    }
  });

  // Add this useEffect to check if Google OAuth is initialized
  useEffect(() => {
    // Check if window.google is defined
    if (window.google) {
      console.log("Google OAuth is initialized");
    } else {
      console.log("Google OAuth is not initialized");
    }
  }, []);

  // LinkedIn login
  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY || "78wzse3yn4ke8g",
    redirectUri: origin ? `${origin}/linkedin-callback` : "",
    scope: "r_emailaddress r_liteprofile",
    onSuccess: (code) => {
      setLinkedinLoading(true);
      handleLinkedInAuth(
        { token: code, language: "english" },
        {
          onError: (error) => {
            setLinkedinLoading(false);
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
          },
        }
      );
    },
    onError: (error) => {
      console.log(error);
      openErrorModalWithMessage("LinkedIn login failed. Please try again.");
    },
  });

  const onSubmit = (data: LoginDetailsValue) => {
    handleLogin(data, {
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      },
    });
  };


  const loginArray = [
    {
      id: 2,
      name: "Login with Reddit",
      icon: <ReditIcon />,
      href: "#",
      onClick: () => {},
    },
    {
      id: 3,
      name: "Login with Microsoft 365",
      icon: <MicroSoftIcon />,
      href: "#",
      onClick: () => {},
    },
    {
      id: 4,
      name: "Login with LinkedIn",
      icon: <LinkdIcon />,
      href: "#",
      onClick: () => linkedInLogin(),
      isLoading: linkedinLoading || isLinkedInLoading,
    },
    {
      id: 5,
      name: "Login with Apple ID",
      icon: <AppleIcon />,
      href: "#",
      onClick: () => {},
    },
  ];

  return (
    <div className="px-[60px] py-[30px]  xl:px-[9.125rem] xl:py-[7rem]">
      <div className="flex justify-center mb-7 items-center lg:hidden ">
        <DiveBusterBlackLogo />
      </div>
      <div className="flex justify-center items-center flex-col">
        <h2 className="font-archivo text-[1.5rem] 2xl:text-[1.875rem] font-semibold text-[#1E1B39]">
          Log in to your account
        </h2>
        <p className="font-archivo text-[#8D9196] font-medium text-xs 2xl:text-base">
          Welcome back! Please enter your details
        </p>
      </div>
      <div className="mt-[1.3125rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col ">
            <label
              htmlFor="email"
              className="font-archivo text-[#1E293B] text-base font-medium"
            >
              Email Address
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              id="email"
              className={`border ${errors.email ? "border-red-500" : "border-[#E2E8F0]"} outline-none py-[.8125rem] text-sm font-archivo rounded-lg px-[.875rem]`}
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-red-900 text-xs font-archivo">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mt-4 2xl:mt-6">
            <label
              htmlFor="password"
              className="font-archivo text-[#1E293B] text-base font-medium"
            >
              Password
            </label>
            <div
              className={`border ${errors.password ? "border-red-500" : "border-[#E2E8F0]"} flex items-center justify-between gap-5 outline-none py-[.8125rem] text-sm font-archivo rounded-lg px-[.875rem]`}
            >
              <input
                className="border-none outline-none w-full"
                type={showPassword?"text":"password"}
                placeholder="Enter your password"
                id="password"
                {...register("password")}
              />

              <Button className="p-0  bg-transparent" onClick={()=>setShowPassword(!showPassword)}>
                <EyeIcon />
              </Button>
            </div>
            {errors?.password && (
              <p className="text-red-900 text-xs font-archivo">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <div className="flex justify-end items-center mt-[10px]">
            <Link href={"#"} className="text-[#F7931D] text-sm font-archivo font-medium">
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" className="bg-[#F7931D] border flex items-center justify-center gap-x-3 border-[#F7931D] font-archivo font-semibold text-base mt-5 w-full h-[50px]">
            Login {isLoading && <SmallSpinner color="#fff"/>}
          </Button>
        </form>

        <div className="mt-8">
            <div className="relative">
                <div className="h-[0.8px] w-full bg-[#1018280D]/5"/>
                <div className="absolute w-full flex justify-center items-center -top-5">
             <div className=" bg-white px-[15px] py-[10px]">
             <p className="text-[#1E293B] font-archivo text-base font-medium capitalize">Or</p>
             </div>


                </div>
            </div>

            <div className="mt-[.9375rem]">
                <Button 
                  className="text-[#1E293B] text-sm font-archivo border border-[#E2E8F0] bg-transparent font-semibold mt-5 w-full h-[50px]"
                  onClick={() => {
                    console.log("Google login button clicked");
                    console.log("Using client ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 
                               process.env.NEXT_PUBLIC_SOCIAL_AUTH_GOOGLE_OAUTH2_KEY || 
                               "330089517652-9e8jm4e8bus6ckpi0ml934dfq3lkqm76.apps.googleusercontent.com");
                    
                    // Check if Google OAuth is initialized
                    if (window.google) {
                      console.log("Google OAuth is initialized, proceeding with login");
                      googleLogin();
                    } else {
                      console.error("Google OAuth is not initialized");
                      openErrorModalWithMessage("Google authentication is not initialized. Please refresh the page and try again.");
                    }
                  }}
                  disabled={isGoogleLoading}
                >
                <div className="flex items-center justify-center gap-3">
                <GoogleIcon/>
                {isGoogleLoading ? "Connecting..." : "Login with Google"}
                </div>
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mt-[.9375rem]">
              {loginArray.map((item) => (
                <div key={item.id} className="">
                  <Button 
                    className="text-[#1E293B] px-4 text-xs xl:text-sm font-archivo border border-[#E2E8F0] bg-transparent font-semibold w-full h-[50px]"
                    onClick={item.onClick}
                    disabled={item.isLoading}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {item.icon}
                      {item.isLoading ? "Connecting..." : item.name}
                    </div>
                  </Button>
                </div>
              ))}
            </div>

        </div>
      </div>


      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage ||
          "Please check your inputs and try again."
        }
      ></ErrorModal>
    </div>
  );
};

export default LoginPage;
