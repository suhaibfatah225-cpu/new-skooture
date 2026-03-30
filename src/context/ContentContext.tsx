import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import defaultContent from '../content.json';

type Language = 'en' | 'ar';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

interface ContentContextType {
  language: Language;
  adminLanguage: Language;
  setLanguage: (lang: Language) => void;
  setAdminLanguage: (lang: Language) => void;
  content: typeof defaultContent;
  setContent: (content: typeof defaultContent) => void;
  resetToDefault: () => void;
  t: (obj: { en: string; ar: string } | string) => string;
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const CONTENT_STORAGE_KEY = 'skooture_content_v1';
const MESSAGES_STORAGE_KEY = 'skooture_messages';

export function ContentProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('skooture_language');
    return (saved as Language) || 'en';
  });

  const [adminLanguage, setAdminLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('skooture_admin_language');
    return (saved as Language) || 'en';
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(MESSAGES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [content, setContentState] = useState(() => {
    const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!saved) return defaultContent;
    
    try {
      const parsed = JSON.parse(saved);
      if (parsed.traction && !Array.isArray(parsed.traction)) {
        parsed.traction = Object.entries(parsed.traction).map(([key, value]: [string, any]) => ({
          ...value,
          key
        }));
      }
      if (!parsed.topFeatures) {
         parsed.topFeatures = defaultContent.topFeatures;
      }
      return parsed;
    } catch (e) {
      return defaultContent;
    }
  });

  useEffect(() => {
    const isDashboard = window.location.pathname.startsWith('/admin');
    const currentLang = isDashboard ? adminLanguage : language;

    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    localStorage.setItem('skooture_language', language);
    localStorage.setItem('skooture_admin_language', adminLanguage);
  }, [language, adminLanguage]);

  const setContent = (newContent: typeof defaultContent) => {
    setContentState(newContent);
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(newContent));
  };

  const setAdminLanguage = (lang: Language) => {
    setAdminLanguageState(lang);
  };

  const resetToDefault = () => {
    setContentState(defaultContent);
    localStorage.removeItem(CONTENT_STORAGE_KEY);
  };

  const addMessage = (msg: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated));
  };

  const t = (obj: any) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const isDashboard = window.location.pathname.startsWith('/admin');
    const currentLang = isDashboard ? adminLanguage : language;
    return obj[currentLang] || obj['en'] || '';
  };

  return (
    <ContentContext.Provider value={{ 
      language, 
      adminLanguage,
      setLanguage, 
      setAdminLanguage,
      content, 
      setContent, 
      resetToDefault, 
      t,
      messages,
      addMessage
    }}>
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
