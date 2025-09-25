"use client"
import { useAuth } from "@/contexts/authentication";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es" | "fr" | "nl";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const {authState} = useAuth()
    const {isAuthenticated, user}=authState
    const selectedLanguage:Language =user?.profile_details?.language as Language 
    const getLanguage = localStorage.getItem("preferredLanguage") as Language
  const [language, setLanguage] = useState<Language>(isAuthenticated?selectedLanguage:getLanguage);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ✅ Custom hook for easy usage
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};


interface prop{
    me:string;
    setMe:(a:string)=> void
}
