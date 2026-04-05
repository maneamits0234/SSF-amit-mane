import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/translations";
import { products, Product } from "../data/products";

export type Language = "en" | "mr" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  currentProducts: Product[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("preferredLanguage");
    // Default to Marathi as requested
    return (saved as Language) || "mr";
  });

  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: any = translations[language] || translations["mr"]; // Fallback to marathi

    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        return key;
      }
    }

    return typeof current === 'string' ? current : key;
  };

  const currentProducts = (products as any)[language] || products.mr;

  const toggleLanguage = () => {
    setLanguage(language === 'mr' ? 'en' : 'mr');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, currentProducts }}>
      {children}
    </LanguageContext.Provider>
  );
};
