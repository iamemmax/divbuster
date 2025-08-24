// import AppleIcon from "@/app/icons/broswer/AppleIcon";
// import LinkdIcon from "@/app/icons/broswer/Linkdin";
// import MicroSoftIcon from "@/app/icons/broswer/Microsofticon";
// import ReditIcon from "@/app/icons/broswer/ReditIcon";
// import GoogleIcon from "@/app/icons/broswer/GoogleIcon";
// import { formatAxiosErrorMessage } from "@/utils";
// import { useGoogleLogin } from "@react-oauth/google";
// import { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState, useCallback } from "react";
// import { useLinkedIn } from "react-linkedin-login-oauth2";
// import { useGoogleAuth } from "../api/googleAuth";
// import { useLinkedInAuth } from "../api/linkedinAuth";
// import { useErrorModalState } from "@/hooks";
// import { useLanguage } from "../sign-up/contexts/LanguageContext";
// import { useAuth } from "@/contexts/authentication";
// import { Language, translations } from "../sign-up/translations";
// import { Button, ErrorModal } from "@/components/core";

// interface Prop {
//   language: Language;
//   setLanguage: React.Dispatch<React.SetStateAction<Language>>;
// }

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

//   // Function to check and update language from localStorage
//   const syncLanguageFromStorage = useCallback(() => {
//     if (typeof window !== "undefined") {
//       const storedLanguage = localStorage.getItem("preferredLanguage") as Language | null;
//       console.log('Checking localStorage for language:', storedLanguage);
//       console.log('Current language in component:', language);
      
//       if (storedLanguage && 
//           Object.keys(translations).includes(storedLanguage) && 
//           storedLanguage !== language) {
//         console.log('Updating language from storage:', storedLanguage);
//         setLanguage(storedLanguage);
//       }
//     }
//   }, [language, setLanguage]);

//   // Set origin and check language on mount
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setOrigin(window.location.origin);
//       syncLanguageFromStorage();
//     }
//   }, [syncLanguageFromStorage]);

//   // Listen for localStorage changes (when language is changed in other components)
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === "preferredLanguage" && e.newValue) {
//         console.log('Storage event detected, new language:', e.newValue);
//         if (Object.keys(translations).includes(e.newValue as Language)) {
//           setLanguage(e.newValue as Language);
//         }
//       }
//     };

//     // Listen for storage events (changes from other tabs/components)
//     window.addEventListener('storage', handleStorageChange);

//     // Also check periodically in case the storage event doesn't fire
//     const intervalId = setInterval(syncLanguageFromStorage, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(intervalId);
//     };
//   }, [syncLanguageFromStorage, setLanguage]);

//   // Custom hook to listen for localStorage changes within the same tab
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     // Override localStorage.setItem to dispatch custom event
//     const originalSetItem = localStorage.setItem;
//     localStorage.setItem = function(key, value) {
//       const event = new CustomEvent('localStorageChange', {
//         detail: { key, value }
//       });
//       originalSetItem.call(this, key, value);
//       window.dispatchEvent(event);
//     };

//     const handleCustomStorageChange = (e: CustomEvent) => {
//       if (e.detail.key === "preferredLanguage" && e.detail.value) {
//         console.log('Custom storage event detected, new language:', e.detail.value);
//         if (Object.keys(translations).includes(e.detail.value as Language)) {
//           setLanguage(e.detail.value as Language);
//         }
//       }
//     };

//     window.addEventListener('localStorageChange', handleCustomStorageChange as EventListener);

//     return () => {
//       window.removeEventListener('localStorageChange', handleCustomStorageChange as EventListener);
//       // Restore original setItem
//       localStorage.setItem = originalSetItem;
//     };
//   }, [setLanguage]);

//   const { mutate: handleGoogleAuth, isLoading: isGoogleLoading } = useGoogleAuth();
//   const { mutate: handleLinkedInAuth, isLoading: isLinkedInLoading } = useLinkedInAuth();

//   useEffect(() => {
//     if (authState.isAuthenticated && !authState.isLoading) {
//       router.push("/");
//     }
//   }, [authState.isAuthenticated, authState.isLoading, router]);

//   // Google login handler
//   const googleLogin = useGoogleLogin({
//     onSuccess: (response) => {
//       console.log("Google login success, token received:", response);
//       handleGoogleAuth(
//         {
//           token: response.access_token,
//           language: language,
//         },
//         {
//           onSuccess: () => {
//             console.log("Google auth API success, redirecting to home");
//             router.push("/");
//           },
//           onError: (error) => {
//             console.error("Google auth API error:", error);
//             const errorMessage = formatAxiosErrorMessage(error as AxiosError);
//             openErrorModalWithMessage(String(errorMessage));
//           },
//         }
//       );
//     },
//     onError: (error) => {
//       console.error("Google login error:", error);
//       openErrorModalWithMessage("Google login failed. Please try again.");
//     },
//     flow: "implicit",
//     scope: "email profile",
//     onNonOAuthError: (error) => {
//       console.error("Non-OAuth error:", error);
//       openErrorModalWithMessage("Google login failed: " + error.type);
//     },
//   });

//   // LinkedIn login
//   const { linkedInLogin } = useLinkedIn({
//     clientId: process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY as string,
//     redirectUri: origin ? `${origin}/linkedin-callback` : "",
//     scope: "r_emailaddress r_liteprofile",
//     onSuccess: (code) => {
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
//     onError: (error) => {
//       console.log(error);
//       setLinkedinLoading(false);
//       openErrorModalWithMessage("LinkedIn login failed. Please try again.");
//     },
//   });

//   const handleGoogleClick = () => {
//     // Check if we're in a browser environment
//     if (typeof window === "undefined") {
//       openErrorModalWithMessage("Authentication not available in this environment.");
//       return;
//     }

//     // Check if Google OAuth is initialized
//     if (window.google) {
//       console.log("Google OAuth is initialized, proceeding with login");
//       googleLogin();
//     } else {
//       console.error("Google OAuth is not initialized");
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
//       href: "#",
//       onClick: handleGoogleClick,
//       isLoading: isGoogleLoading,
//     },
//     {
//       id: 2,
//       name: t.socialLogins.reddit,
//       icon: <ReditIcon />,
//       href: "#",
//       onClick: () => {
//         openErrorModalWithMessage("Reddit login is not implemented yet.");
//       },
//     },
//     {
//       id: 3,
//       name: t.socialLogins.microsoft,
//       icon: <MicroSoftIcon />,
//       href: "#",
//       onClick: () => {
//         openErrorModalWithMessage("Microsoft login is not implemented yet.");
//       },
//     },
//     {
//       id: 4,
//       name: t.socialLogins.linkedin,
//       icon: <LinkdIcon />,
//       href: "#",
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

//       {/* Debug info - remove in production */}
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
//         setErrorModalState={() => {
//           setErrorModalState(false);
//         }}
//         subheading={
//           errorModalMessage || "Please check your inputs and try again."
//         }
//       />
//     </div>
//   );
// };

// export default SocialAuth;






import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useLinkedIn } from "react-linkedin-login-oauth2";

import AppleIcon from "@/app/icons/broswer/AppleIcon";
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

// import {
//   getPreferredLanguage,
// } from "@/utils/languageService";


const LANGUAGE_KEY = "preferredLanguage";

export const setPreferredLanguage = (lang: Language) => {
  localStorage.setItem(LANGUAGE_KEY, lang);
  window.dispatchEvent(
    new CustomEvent("preferredLanguageChanged", {
      detail: { language: lang },
    })
  );
};

export const getPreferredLanguage = (): Language | null => {
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
  const [origin, setOrigin] = useState("");
  const router = useRouter();

  const { mutate: handleGoogleAuth, isLoading: isGoogleLoading } = useGoogleAuth();
  const { mutate: handleLinkedInAuth, isLoading: isLinkedInLoading } = useLinkedInAuth();

  // Sync preferred language on mount and listen for changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initial sync
    const storedLanguage = getPreferredLanguage();
    if (storedLanguage && storedLanguage !== language) {
      setLanguage(storedLanguage);
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "preferredLanguage" && e.newValue) {
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

  useEffect(() => {
    if (authState.isAuthenticated && !authState.isLoading) {
      router.push("/");
    }
  }, [authState.isAuthenticated, authState.isLoading, router]);

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      handleGoogleAuth(
        {
          token: response.access_token,
          language: language,
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (error) => {
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModalWithMessage(String(errorMessage));
          },
        }
      );
    },
    onError: () => {
      openErrorModalWithMessage("Google login failed. Please try again.");
    },
    flow: "implicit",
    scope: "email profile",
    onNonOAuthError: (error) => {
      openErrorModalWithMessage("Google login failed: " + error.type);
    },
  });

  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY as string,
    redirectUri: origin ? `${origin}/linkedin-callback` : "",
    scope: "r_emailaddress r_liteprofile",
    onSuccess: (code) => {
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
          },
        }
      );
    },
    onError: () => {
      setLinkedinLoading(false);
      openErrorModalWithMessage("LinkedIn login failed. Please try again.");
    },
  });

  const handleGoogleClick = () => {
    if (typeof window === "undefined") {
      openErrorModalWithMessage("Authentication not available in this environment.");
      return;
    }

    if (window.google) {
      googleLogin();
    } else {
      openErrorModalWithMessage(
        "Google authentication is not initialized. Please refresh the page and try again."
      );
    }
  };

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
      onClick: linkedInLogin,
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

      <div className="text-xs text-gray-500 mt-2">
        Current language: {language}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mt-[1.9375rem]">
        {loginArray.map((item) => (
          <div key={item.id}>
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
        setErrorModalState={() => setErrorModalState(false)}
        subheading={errorModalMessage || "Please check your inputs and try again."}
      />
    </div>
  );
};

export default SocialAuth;
