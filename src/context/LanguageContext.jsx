import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("varistay_lang") || "mr"; // Default to Marathi first as per prompt
  });

  useEffect(() => {
    localStorage.setItem("varistay_lang", lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "mr" : "en"));
  };

  const t = (key) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    // Fallback to English if translation key missing in Marathi
    if (translations["en"] && translations["en"][key]) {
      return translations["en"][key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
