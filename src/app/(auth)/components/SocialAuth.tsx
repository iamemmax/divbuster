



// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { AxiosError } from "axios";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useLinkedIn } from "react-linkedin-login-oauth2";

// import LinkdIcon from "@/app/icons/broswer/Linkdin";
// import MicroSoftIcon from "@/app/icons/broswer/Microsofticon";
// import ReditIcon from "@/app/icons/broswer/ReditIcon";
// import GoogleIcon from "@/app/icons/broswer/GoogleIcon";

// import { formatAxiosErrorMessage } from "@/utils";
// import { useGoogleAuth } from "../api/googleAuth";
// import { useLinkedInAuth } from "../api/linkedinAuth";
// import { useErrorModalState } from "@/hooks";
// import { useLanguage } from "../sign-up/contexts/LanguageContext";
// import { useAuth } from "@/contexts/authentication";
// import { Language, translations } from "../sign-up/translations";
// import { Button, ErrorModal } from "@/components/core";

// // import {
// //   getPreferredLanguage,
// // } from "@/utils/languageService";


// const LANGUAGE_KEY = "preferredLanguage";

// export const setPreferredLanguage = (lang: Language) => {
//   localStorage.setItem(LANGUAGE_KEY, lang);
//   window.dispatchEvent(
//     new CustomEvent("preferredLanguageChanged", {
//       detail: { language: lang },
//     })
//   );
// };

// export const getPreferredLanguage = (): Language | null => {
//   const lang = localStorage.getItem(LANGUAGE_KEY);
//   return Object.keys(translations).includes(lang ?? "") ? (lang as Language) : null;
// };
// const SocialAuth = () => {
//   const {
//     isErrorModalOpen,
//     setErrorModalState,
//     openErrorModalWithMessage,
//     errorModalMessage,
//   } = useErrorModalState();

//   const { t, language, setLanguage } = useLanguage();
//   const { authState } = useAuth();
//   const [linkedinLoading, setLinkedinLoading] = useState(false);
//   const [origin, setOrigin] = useState("");
//   const router = useRouter();

//   const { mutate: handleGoogleAuth, isLoading: isGoogleLoading } = useGoogleAuth();
//   const { mutate: handleLinkedInAuth, isLoading: isLinkedInLoading } = useLinkedInAuth();

//   // Sync preferred language on mount and listen for changes
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     // Initial sync
//     const storedLanguage = getPreferredLanguage();
//     if (storedLanguage && storedLanguage !== language) {
//       setLanguage(storedLanguage);
//     }

//     const handleStorage = (e: StorageEvent) => {
//       if (e.key === "preferredLanguage" && e.newValue) {
//         if (Object.keys(translations).includes(e.newValue)) {
//           setLanguage(e.newValue as Language);
//         }
//       }
//     };

//     const handleCustomEvent = (e: Event) => {
//       const customEvent = e as CustomEvent;
//       const newLang = customEvent.detail?.language;
//       if (newLang && Object.keys(translations).includes(newLang)) {
//         setLanguage(newLang as Language);
//       }
//     };

//     window.addEventListener("storage", handleStorage);
//     window.addEventListener("preferredLanguageChanged", handleCustomEvent);

//     return () => {
//       window.removeEventListener("storage", handleStorage);
//       window.removeEventListener("preferredLanguageChanged", handleCustomEvent);
//     };
//   }, [language, setLanguage]);

//   useEffect(() => {
//     if (authState.isAuthenticated && !authState.isLoading) {
//       router.push("/");
//     }
//   }, [authState.isAuthenticated, authState.isLoading, router]);

//   const googleLogin = useGoogleLogin({
//     onSuccess: (response) => {
//       console.log(response,"google");
      
//       handleGoogleAuth(
//         {
//           token: response.access_token,
//           language: language,
//         },
//         {
//           onSuccess: () => {
//             router.push("/");
//           },
//           onError: (error) => {
//             const errorMessage = formatAxiosErrorMessage(error as AxiosError);
//             openErrorModalWithMessage(String(errorMessage));
//           },
//         }
//       );
//     },
//     onError: () => {
//       openErrorModalWithMessage("Google login failed. Please try again.");
//     },
//     flow: "implicit",
//     scope: "email profile",
//     onNonOAuthError: (error) => {
//       openErrorModalWithMessage("Google login failed: " + error.type);
//     },
//   });

//  const { linkedInLogin } = useLinkedIn({
//     clientId: process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY as string,
//     redirectUri: process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_REDIRECT_URL as string,
//     scope: "profile email openid", // Updated scopes
//     onSuccess: (code) => {
//       console.log(code);
      
//       setLinkedinLoading(true);
//       handleLinkedInAuth(
//         { token: code, language: language },
//         {
//           onSuccess: () => {
//             setLinkedinLoading(false);
//             router.push("/");
//           },
//           onError: (error) => {
//             setLinkedinLoading(false);
//             const errorMessage = formatAxiosErrorMessage(error as AxiosError);
//             openErrorModalWithMessage(String(errorMessage));
//           },
//         }
//       );
//     },
//     onError: () => {
//       setLinkedinLoading(false);
//       openErrorModalWithMessage("LinkedIn login failed. Please try again.");
//     },
// });

//   const handleGoogleClick = () => {
//     if (typeof window === "undefined") {
//       openErrorModalWithMessage("Authentication not available in this environment.");
//       return;
//     }

//     if (window.google) {
//       googleLogin();
//     } else {
//       openErrorModalWithMessage(
//         "Google authentication is not initialized. Please refresh the page and try again."
//       );
//     }
//   };

//   const loginArray = [
//     {
//       id: 1,
//       name: t.socialLogins.google,
//       icon: <GoogleIcon />,
//       onClick: handleGoogleClick,
//       isLoading: isGoogleLoading,
//     },
//     {
//       id: 2,
//       name: t.socialLogins.reddit,
//       icon: <ReditIcon />,
//       onClick: () => {
//         openErrorModalWithMessage("Reddit login is not implemented yet.");
//       },
//     },
//     {
//       id: 3,
//       name: t.socialLogins.microsoft,
//       icon: <MicroSoftIcon />,
//       onClick: () => {
//         openErrorModalWithMessage("Microsoft login is not implemented yet.");
//       },
//     },
//     {
//       id: 4,
//       name: t.socialLogins.linkedin,
//       icon: <LinkdIcon />,
//       onClick: linkedInLogin,
//       isLoading: linkedinLoading || isLinkedInLoading,
//     },
//   ];

//   return (
//     <div className="mt-8">
//       <div className="relative">
//         <div className="h-[0.8px] w-full bg-[#1018280D]/5" />
//         <div className="absolute w-full flex justify-center items-center -top-5">
//           <div className="bg-white px-[15px] py-[10px]">
//             <p className="text-[#1E293B] font-archivo text-base font-medium capitalize">
//               {t.orText}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="text-xs text-gray-500 mt-2">
//         Current language: {language}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mt-[1.9375rem]">
//         {loginArray.map((item) => (
//           <div key={item.id}>
//             <Button
//               className="text-[#1E293B] px-4 text-xs xl:text-sm font-archivo border border-[#E2E8F0] bg-transparent font-semibold w-full h-[50px]"
//               onClick={item.onClick}
//               disabled={item.isLoading}
//             >
//               <div className="flex items-center justify-center gap-3">
//                 {item.icon}
//                 {item.isLoading ? t.socialLogins.connecting : item.name}
//               </div>
//             </Button>
//           </div>
//         ))}
//       </div>

//       <ErrorModal
//         isErrorModalOpen={isErrorModalOpen}
//         setErrorModalState={() => setErrorModalState(false)}
//         subheading={errorModalMessage || "Please check your inputs and try again."}
//       />
//     </div>
//   );
// };

// export default SocialAuth;





import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useLinkedIn } from "react-linkedin-login-oauth2";

import LinkdIcon from "@/app/icons/broswer/Linkdin";
import MicroSoftIcon from "@/app/icons/broswer/Microsofticon";
import ReditIcon from "@/app/icons/broswer/ReditIcon";
import GoogleIcon from "@/app/icons/broswer/GoogleIcon";

import { formatAxiosErrorMessage } from "@/utils";
import { useGoogleAuth } from "../api/googleAuth";
import { useLinkedInAuth } from "../api/linkedinAuth";
import { useErrorModalState } from "@/hooks";
import { useLanguage } from "../sign-up/contexts/LanguageContext";
import { useAuth } from "@/contexts/authentication";
import { Language, translations } from "../sign-up/translations";
import { Button, ErrorModal } from "@/components/core";

const LANGUAGE_KEY = "preferredLanguage";

export const setPreferredLanguage = (lang: Language) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LANGUAGE_KEY, lang);
    window.dispatchEvent(
      new CustomEvent("preferredLanguageChanged", {
        detail: { language: lang },
      })
    );
  }
};

export const getPreferredLanguage = (): Language | null => {
  if (typeof window === "undefined") return null;
  const lang = localStorage.getItem(LANGUAGE_KEY);
  return Object.keys(translations).includes(lang ?? "") ? (lang as Language) : null;
};

const SocialAuth = () => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const { t, language, setLanguage } = useLanguage();
  const { authState } = useAuth();
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutate: handleGoogleAuth, isLoading: isGoogleLoading } = useGoogleAuth();
  const { mutate: handleLinkedInAuth, isLoading: isLinkedInLoading } = useLinkedInAuth();

  // Check for LinkedIn callback parameters on component mount
  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle LinkedIn callback if parameters are present
    if (code && state) {
      console.log('LinkedIn callback detected:', { code, state });
      setLinkedinLoading(true);
      
      handleLinkedInAuth(
        { token: code, language: language },
        {
          onSuccess: () => {
            setLinkedinLoading(false);
            router.push("/");
          },
          onError: (error) => {
            setLinkedinLoading(false);
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
            // Clean up URL parameters
            router.replace(window.location.pathname);
          },
        }
      );
    } else if (error) {
      console.error('LinkedIn OAuth error from URL:', error);
      openErrorModalWithMessage("LinkedIn login failed. Please try again.");
      // Clean up URL parameters
      router.replace(window.location.pathname);
    }
  }, [searchParams, handleLinkedInAuth, language, router, openErrorModalWithMessage]);

  // Memoized error handler
  const handleAuthError = useCallback((error: unknown, platform: string) => {
    const errorMessage = formatAxiosErrorMessage(error as AxiosError);
    openErrorModalWithMessage(`${platform} login failed: ${errorMessage}`);
  }, [openErrorModalWithMessage]);

  // Memoized success handler
  const handleAuthSuccess = useCallback(() => {
    router.push("/");
  }, [router]);

  // Sync preferred language on mount and listen for changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedLanguage = getPreferredLanguage();
    if (storedLanguage && storedLanguage !== language) {
      setLanguage(storedLanguage);
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === LANGUAGE_KEY && e.newValue) {
        if (Object.keys(translations).includes(e.newValue)) {
          setLanguage(e.newValue as Language);
        }
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newLang = customEvent.detail?.language;
      if (newLang && Object.keys(translations).includes(newLang)) {
        setLanguage(newLang as Language);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("preferredLanguageChanged", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("preferredLanguageChanged", handleCustomEvent);
    };
  }, [language, setLanguage]);

  // Redirect if authenticated
  useEffect(() => {
    if (authState.isAuthenticated && !authState.isLoading) {
      router.push("/");
    }
  }, [authState.isAuthenticated, authState.isLoading, router]);

  // Google login configuration
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log('Google OAuth Response:', response);
      
      handleGoogleAuth(
        {
          token: response.access_token,
          language: language,
        },
        {
          onSuccess: handleAuthSuccess,
          onError: (error) => handleAuthError(error, 'Google'),
        }
      );
    },
    onError: () => {
      openErrorModalWithMessage("Google login failed. Please try again.");
    },
    flow: "implicit",
    scope: "email profile",
    onNonOAuthError: (error) => {
      openErrorModalWithMessage(`Google login failed: ${error.type}`);
    },
  });

  // LinkedIn login configuration
  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY as string,
    redirectUri: process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_REDIRECT_URL as string,
    scope: "profile email openid",
    onSuccess: (code) => {
      console.log('LinkedIn OAuth Code from hook:', code);
      setLinkedinLoading(true);
      
      handleLinkedInAuth(
        { token: code, language: language },
        {
          onSuccess: () => {
            setLinkedinLoading(false);
            handleAuthSuccess();
          },
          onError: (error) => {
            setLinkedinLoading(false);
            handleAuthError(error, 'LinkedIn');
          },
        }
      );
    },
    onError: (error) => {
      console.error('LinkedIn OAuth Error:', error);
      setLinkedinLoading(false);
      openErrorModalWithMessage("LinkedIn login failed. Please try again.");
    },
  });

  // Google click handler
  const handleGoogleClick = useCallback(() => {
    if (typeof window === "undefined") {
      openErrorModalWithMessage("Authentication not available in this environment.");
      return;
    }

    try {
      if (window.google) {
        googleLogin();
      } else {
        openErrorModalWithMessage(
          "Google authentication is not initialized. Please refresh the page and try again."
        );
      }
    } catch (error) {
      console.error('Google login error:', error);
      openErrorModalWithMessage("Failed to initiate Google login. Please try again.");
    }
  }, [googleLogin, openErrorModalWithMessage]);

  // LinkedIn click handler
  const handleLinkedInClick = useCallback(() => {
    try {
      if (!process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY) {
        openErrorModalWithMessage("LinkedIn authentication is not configured.");
        return;
      }
      linkedInLogin();
    } catch (error) {
      console.error('LinkedIn login error:', error);
      openErrorModalWithMessage("Failed to initiate LinkedIn login. Please try again.");
    }
  }, [linkedInLogin, openErrorModalWithMessage]);

  // Login providers configuration
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
          <div className="bg-white px-[15px] py-[10px]">
            <p className="text-[#1E293B] font-archivo text-base font-medium capitalize">
              {t.orText}
            </p>
          </div>
        </div>
      </div>

      {/* Show processing state if LinkedIn callback is being processed */}
      {(linkedinLoading || isLinkedInLoading) && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Processing LinkedIn authentication...</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mt-[1.9375rem]">
        {loginArray.map((item) => (
          <div key={item.id}>
            <Button
              className="text-[#1E293B] px-4 text-xs xl:text-sm font-archivo border border-[#E2E8F0] bg-transparent font-semibold w-full h-[50px] hover:bg-gray-50"
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