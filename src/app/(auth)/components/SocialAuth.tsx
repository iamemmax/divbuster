import AppleIcon from "@/app/icons/broswer/AppleIcon";
import LinkdIcon from "@/app/icons/broswer/Linkdin";
import MicroSoftIcon from "@/app/icons/broswer/Microsofticon";
import ReditIcon from "@/app/icons/broswer/ReditIcon";
import { formatAxiosErrorMessage } from "@/utils";
import { useGoogleLogin } from "@react-oauth/google";
import { AxiosError } from "axios";
import  { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useGoogleAuth } from "../api/googleAuth";
import { useLinkedInAuth } from "../api/linkedinAuth";
import { useErrorModalState } from "@/hooks";
import { useLanguage } from "../sign-up/contexts/LanguageContext";
import { useAuth } from "@/contexts/authentication";
import { Language, translations } from "../sign-up/translations";
import GoogleIcon from "@/app/icons/broswer/GoogleIcon";
import { Button, ErrorModal } from "@/components/core";

const SocialAuth = () => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { t } = useLanguage();
  const { authState } = useAuth();
  const [language, setLanguage] = useState<Language>("en");
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  const [origin, setOrigin] = useState("");
  const router= useRouter()
  // Set origin after component mounts to avoid window not defined error
  useEffect(() => {
    setOrigin(window.location.origin);

    // Get preferred language from localStorage
    const storedLanguage = localStorage.getItem(
      "preferredLanguage"
    ) as Language | null;
    if (storedLanguage && Object.keys(translations).includes(storedLanguage)) {
      setLanguage(storedLanguage);
    }
  }, []);

  const { mutate: handleGoogleAuth, isLoading: isGoogleLoading } =
    useGoogleAuth();
  const { mutate: handleLinkedInAuth, isLoading: isLinkedInLoading } =
    useLinkedInAuth();

  const loginArray = [
    {
      id: 2,
      name: t.socialLogins.reddit,
      icon: <ReditIcon />,
      href: "#",
      onClick: () => {},
    },
    {
      id: 3,
      name: t.socialLogins.microsoft,
      icon: <MicroSoftIcon />,
      href: "#",
      onClick: () => {},
    },
    {
      id: 4,
      name: t.socialLogins.linkedin,
      icon: <LinkdIcon />,
      href: "#",
      onClick: () => linkedInLogin(),
      isLoading: linkedinLoading || isLinkedInLoading,
    },
    {
      id: 5,
      name: t.socialLogins.apple,
      icon: <AppleIcon />,
      href: "#",
      onClick: () => {},
    },
  ];

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
          language: language,
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
          },
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
    },
    // Add the correct redirect URI that matches your Google Console configuration
    // redirect_uri: `${window.location.origin}/auth/google/callback`
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
    clientId:
      process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY ||
      "78wzse3yn4ke8g",
    redirectUri: origin ? `${origin}/linkedin-callback` : "",
    scope: "r_emailaddress r_liteprofile",
    onSuccess: (code) => {
      setLinkedinLoading(true);
      handleLinkedInAuth(
        { token: code, language: language },
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

  return (
    <div className="mt-8">
      <div className="relative">
        <div className="h-[0.8px] w-full bg-[#1018280D]/5" />
        <div className="absolute w-full flex justify-center items-center -top-5">
          <div className=" bg-white px-[15px] py-[10px]">
            <p className="text-[#1E293B] font-archivo text-base font-medium capitalize">
              {t.orText}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[.9375rem]">
        <Button
          className="text-[#1E293B] text-sm font-archivo border border-[#E2E8F0] bg-transparent font-semibold mt-5 w-full h-[50px]"
          onClick={() => {
            console.log("Google login button clicked");
            console.log(
              "Using client ID:",
              process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
                process.env.NEXT_PUBLIC_SOCIAL_AUTH_GOOGLE_OAUTH2_KEY ||
                "330089517652-9e8jm4e8bus6ckpi0ml934dfq3lkqm76.apps.googleusercontent.com"
            );

            // Check if Google OAuth is initialized
            if (window.google) {
              console.log("Google OAuth is initialized, proceeding with login");
              googleLogin();
            } else {
              console.error("Google OAuth is not initialized");
              openErrorModalWithMessage(
                "Google authentication is not initialized. Please refresh the page and try again."
              );
            }
          }}
          disabled={isGoogleLoading}
        >
          <div className="flex items-center justify-center gap-3">
            <GoogleIcon />
            {isGoogleLoading ? t.googleConnecting : t.googleLogin}
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
                {item.isLoading ? t.socialLogins.connecting : item.name}
              </div>
            </Button>
          </div>
        ))}
      </div>
     

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      ></ErrorModal>
    </div>
  );
};

export default SocialAuth;
