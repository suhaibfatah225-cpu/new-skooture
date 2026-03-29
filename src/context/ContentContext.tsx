import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import defaultContent from '../content.json';

type Language = 'en' | 'ar';

interface ContentContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: typeof defaultContent;
  setContent: (content: typeof defaultContent) => void;
  t: (obj: { en: string; ar: string } | string) => string;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Helper to get translated string
  const t = (obj: { en: string; ar: string } | string) => {
    if (typeof obj === 'string') return obj;
    return obj[language] || obj['en'];
  };

  return (
    <ContentContext.Provider value={{ language, setLanguage, content, setContent, t }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
