import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar.json';
import en from './locales/en.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('skooture_admin_language') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
