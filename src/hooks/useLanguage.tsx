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
  const storedLanguage = (typeof window !== "undefined" && localStorage.getItem("preferredLanguage")) as Language | null;

  const [language, setLanguage] = useState<Language>("en");

  // ✅ Handle initial language load logic safely
  useEffect(() => {
    if (isAuthenticated && selectedLanguage) {
      setLanguage(selectedLanguage);
      localStorage.setItem("preferredLanguage", selectedLanguage);
    } else if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, [isAuthenticated, selectedLanguage, storedLanguage]);

  // ✅ Update localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// (Unrelated, but if you need this type, keep it defined separately)
interface Prop {
  me: string;
  setMe: (a: string) => void;
}
