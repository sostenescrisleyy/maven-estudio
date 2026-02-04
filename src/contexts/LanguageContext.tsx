import { createContext, useContext, useState, useMemo, useCallback, useEffect, ReactNode } from 'react';
import ptTranslations from '../locales/pt.json';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | any;
  translations: any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Preload all translations for instant switching
const translations: Record<Language, any> = {
  pt: ptTranslations,
  en: enTranslations,
  es: esTranslations,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      return saved && ['pt', 'en', 'es'].includes(saved) ? saved : 'pt';
    }
    return 'pt';
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const setLanguage = useCallback(async (lang: Language) => {
    if (lang === language) return;
    
    setIsLoading(true);
    
    // Small delay for smooth transition animation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    
    // Small delay before hiding loader
    setTimeout(() => setIsLoading(false), 200);
  }, [language]);

  const currentTranslations = useMemo(() => translations[language], [language]);

  const t = useMemo(() => {
    return (key: string): string | any => {
      const keys = key.split('.');
      let value: any = currentTranslations;
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) return key;
      }
      return value;
    };
  }, [currentTranslations]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    translations: currentTranslations,
    isLoading,
  }), [language, setLanguage, t, currentTranslations, isLoading]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
