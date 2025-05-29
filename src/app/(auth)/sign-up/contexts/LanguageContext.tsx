import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '../translations';

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en; // Use English as the default type
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en', // Default language
  setLanguage: () => {}, // Empty function as placeholder
  t: translations.en, // Default to English translations
});

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with default language
  const [language, setLanguage] = useState<Language>('en');
  
  // Get translations based on selected language
  const t = translations[language] || translations.en;
  


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};


