// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { Language, translations } from '../translations';

// // Define the context type
// interface LanguageContextType {
//   language: Language;
//   setLanguage: (lang: Language) => void;
//   t: typeof translations.en; // Use English as the default type
// }

// // Create context with default values
// const LanguageContext = createContext<LanguageContextType>({
//   language: 'en', // Default language
//   setLanguage: () => {}, // Empty function as placeholder
//   t: translations.en, // Default to English translations
// });

// // Provider component
// export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   // Initialize with default language
//   const [language, setLanguage] = useState<Language>('en');
  
//   // Get translations based on selected language
//   const t = translations[language] || translations.en;
  


//   return (
//     <LanguageContext.Provider value={{ language, setLanguage, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// // Custom hook for using the language context
// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
  
//   if (!context) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
  
//   return context;
// };


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '../translations';

const LANGUAGE_KEY = "preferredLanguage";

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en; // English structure as base type
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Sync state with storage + broadcast change
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_KEY, lang);
      // notify all listeners
      window.dispatchEvent(new CustomEvent("preferredLanguageChanged", { detail: { language: lang } }));
    }
  };

  // Initialize from localStorage and listen for updates
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load from localStorage
    const stored = localStorage.getItem(LANGUAGE_KEY) as Language | null;
    if (stored && Object.keys(translations).includes(stored)) {
      setLanguage(stored);
    }

    // Cross-tab sync
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LANGUAGE_KEY && e.newValue) {
        setLanguage(e.newValue as Language);
      }
    };

    // Custom event sync (same-tab broadcast)
    const handleCustomEvent = (e: Event) => {
      const newLang = (e as CustomEvent).detail?.language;
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
  }, []);

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
