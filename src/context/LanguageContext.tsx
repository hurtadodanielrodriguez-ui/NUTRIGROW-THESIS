import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppLanguage } from '../types';
import { translations, TranslationsType, getTranslation, SUPPORTED_LANGUAGES, LanguageOption } from '../utils/translations';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: TranslationsType;
  supportedLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: AppLanguage;
  onLanguageChange?: (lang: AppLanguage) => void;
}> = ({ children, initialLanguage, onLanguageChange }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem('nutrigrow_lang');
    if (saved === 'en' || saved === 'fr' || saved === 'es') {
      return saved;
    }
    return initialLanguage || 'es';
  });

  useEffect(() => {
    if (initialLanguage && initialLanguage !== language) {
      setLanguageState(initialLanguage);
    }
  }, [initialLanguage]);

  const setLanguage = (newLang: AppLanguage) => {
    setLanguageState(newLang);
    localStorage.setItem('nutrigrow_lang', newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      language: 'es',
      setLanguage: () => {},
      t: translations.es,
      supportedLanguages: SUPPORTED_LANGUAGES
    };
  }
  return context;
};
