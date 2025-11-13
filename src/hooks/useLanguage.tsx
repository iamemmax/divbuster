"use client";

import { useAuth } from "@/contexts/authentication";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "es" | "fr" | "nl";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuth();
  const { isAuthenticated, user } = authState;

  const selectedLanguage = user?.profile_details?.language as Language | undefined;
  const [language, setLanguage] = useState<Language>("en");

  // Initialize language on mount
  useEffect(() => {
    const storedLanguage = (typeof window !== "undefined" && localStorage.getItem("preferredLanguage")) as Language | null;
    
    if (isAuthenticated && selectedLanguage) {
      setLanguage(selectedLanguage);
    } else if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, [isAuthenticated, selectedLanguage]);

  // Update localStorage when language changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("preferredLanguage", language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ✅ Custom hook for easy access
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return default values during build time or when provider is not available
    return {
      language: "en" as Language,
      setLanguage: () => {}
    };
  }
  return context;
};

// (Unrelated, but if you need this type, keep it defined separately)
