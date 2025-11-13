


"use client"

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";

import { useLinkedIn } from "react-linkedin-login-oauth2";

import LinkdIcon from "@/app/icons/broswer/Linkdin";
import MicroSoftIcon from "@/app/icons/broswer/Microsofticon";
import ReditIcon from "@/app/icons/broswer/ReditIcon";
import GoogleIcon from "@/app/icons/broswer/GoogleIcon";

import { formatAxiosErrorMessage } from "@/utils";
import { useGoogleAuth } from "../api/googleAuth";
import { useLinkedInAuth } from "../api/linkedinAuth";
import { useErrorModalState } from "@/hooks";
// import { useLanguage } from "../sign-up/contexts/LanguageContext";
import { useAuth } from "@/contexts/authentication";
import { Button, ErrorModal } from "@/components/core";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "../sign-up/translations";

const SocialAuth = () => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const {  language } = useLanguage();
  const t = translations[language] || translations.en
  const { authState } = useAuth();
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutate: handleGoogleAuth, isLoading: isGoogleLoading } = useGoogleAuth();
  const { mutate: handleLinkedInAuth, isLoading: isLinkedInLoading } = useLinkedInAuth();

  // Function to exchange Google auth code for access token
  const exchangeGoogleCode = async (code: string) => {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
          code,
          grant_type: 'authorization_code',
          redirect_uri: window.location.origin + '/login',
        }),
      });
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      throw new Error('Failed to exchange Google code for token');
    }
  };

  // --- handle OAuth callbacks on mount
  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (code && state) {
      // LinkedIn callback
      setLinkedinLoading(true);
      handleLinkedInAuth(
        { token: code, language },
        {
          onSuccess: () => {
            setLinkedinLoading(false);
            router.push("/");
          },
          onError: (error) => {
            setLinkedinLoading(false);
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
            router.replace(window.location.pathname);
          },
        }
      );
    } else if (code && !state) {
      // Google callback - exchange code for access token
      exchangeGoogleCode(code)
        .then((accessToken) => {
          handleGoogleAuth(
            { token: accessToken, language },
            {
              onSuccess: () => {
                router.push("/");
              },
              onError: (error) => {
                const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                openErrorModalWithMessage(String(errorMessage));
                router.replace(window.location.pathname);
              },
            }
          );
        })
        .catch(() => {
          openErrorModalWithMessage("Failed to authenticate with Google. Please try again.");
          router.replace(window.location.pathname);
        });
    } else if (error) {
      openErrorModalWithMessage("OAuth login failed. Please try again.");
      router.replace(window.location.pathname);
    }
  }, [searchParams, handleLinkedInAuth, handleGoogleAuth, language, router, openErrorModalWithMessage]);

  const handleAuthError = useCallback(
    (error: unknown, platform: string) => {
      const errorMessage = formatAxiosErrorMessage(error as AxiosError);
      openErrorModalWithMessage(`${platform} login failed: ${errorMessage}`);
    },
    [openErrorModalWithMessage]
  );

  const handleAuthSuccess = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (authState.isAuthenticated && !authState.isLoading) {
      router.push("/");
    }
  }, [authState.isAuthenticated, authState.isLoading, router]);

  const handleGoogleClick = useCallback(() => {
// http://localhost:3001/login   
 const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/login')}&scope=email%20profile&response_type=code&access_type=offline`;
    window.location.href = googleAuthUrl;
  }, []);

  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY as string,
    redirectUri: process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_REDIRECT_URL as string,
    scope: "profile email openid",
    onSuccess: (code) => {
      setLinkedinLoading(true);
      handleLinkedInAuth(
        { token: code, language },
        {
          onSuccess: () => {
            setLinkedinLoading(false);
            handleAuthSuccess();
          },
          onError: (error) => {
            setLinkedinLoading(false);
            handleAuthError(error, "LinkedIn");
          },
        }
      );
    },
    onError: () => {
      setLinkedinLoading(false);
      openErrorModalWithMessage("LinkedIn login failed. Please try again.");
    },
  });



  const handleLinkedInClick = useCallback(() => {
    try {
      linkedInLogin();
    } catch {
      openErrorModalWithMessage("Failed to initiate LinkedIn login. Please try again.");
    }
  }, [linkedInLogin, openErrorModalWithMessage]);

  const loginArray = [
    {
      id: 1,
      name: t.socialLogins.google,
      icon: <GoogleIcon />,
      onClick: handleGoogleClick,
      isLoading: isGoogleLoading,
    },
    {
      id: 2,
      name: t.socialLogins.reddit,
      icon: <ReditIcon />,
      onClick: () => {
        openErrorModalWithMessage("Reddit login is not implemented yet.");
      },
    },
    {
      id: 3,
      name: t.socialLogins.microsoft,
      icon: <MicroSoftIcon />,
      onClick: () => {
        openErrorModalWithMessage("Microsoft login is not implemented yet.");
      },
    },
    {
      id: 4,
      name: t.socialLogins.linkedin,
      icon: <LinkdIcon />,
      onClick: handleLinkedInClick,
      isLoading: linkedinLoading || isLinkedInLoading,
    },
  ];

  return (
    <div className="mt-8">
      <div className="relative">
        <div className="h-[0.8px] w-full bg-[#1018280D]/5" />
        <div className="absolute w-full flex justify-center items-center -top-5">
          <div className="bg-white dark:bg-gray-900 px-[15px] py-[10px]">
            <p className="text-[#1E293B] dark:text-white font-archivo text-base font-medium capitalize">
              {t.orText}
            </p>
          </div>
        </div>
      </div>

      {(linkedinLoading || isLinkedInLoading) && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Processing LinkedIn authentication...</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mt-[1.9375rem]">
        {loginArray.map((item) => (
          <div key={item.id}>
            <Button
              className="text-[#1E293B] dark:text-white px-4 text-xs xl:text-sm font-archivo border border-[#E2E8F0] dark:border-gray-600 bg-transparent font-semibold w-full h-[50px] hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={item.onClick}
              disabled={item.isLoading}
            >
              <div className="flex items-center justify-center gap-3">
                {item.icon}
                {item.isLoading ? t.socialLogins.connecting : item.name}
              </div>
            </Button>
          </div>
        ))}
      </div>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => setErrorModalState(false)}
        subheading={errorModalMessage || "Please check your inputs and try again."}
      />
    </div>
  );
};

export default SocialAuth;
