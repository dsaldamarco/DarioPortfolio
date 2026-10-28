import React, { createContext, useContext, useEffect, useState } from 'react';
import { TRANSLATIONS, type Language, type Translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'ds-lang';

function initialLanguage(): Language {
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param === 'it' || param === 'en') return param;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'it' || saved === 'en') return saved;
  } catch {
    // storage unavailable: fall through to the browser language
  }
  const preferred = navigator.languages?.[0] ?? navigator.language ?? 'en';
  return preferred.toLowerCase().startsWith('it') ? 'it' : 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // not persisted; the choice still applies to this visit
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: TRANSLATIONS[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
