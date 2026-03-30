import { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { useTheme } from '../../context/ThemeContext';
import { Globe, Settings, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { content, language, setLanguage } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { id: 'home', label: { en: 'Home', ar: 'الرئيسية' } },
    { id: 'features', label: { en: 'Features', ar: 'المميزات' } },
    { id: 'pricing', label: { en: 'Pricing', ar: 'الأسعار' } },
    { id: 'faq', label: { en: 'FAQ', ar: 'الأسئلة الشائعة' } },
    { id: 'contact', label: { en: 'Contact', ar: 'تواصل معنا' } },
  ];

  return (
    <div className="fixed top-0 w-full z-50 flex justify-center px-4 pt-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`pointer-events-auto transition-all duration-500 ease-in-out px-6 flex items-center justify-between gap-8 h-16 rounded-full border shadow-2xl ${
          isScrolled 
            ? 'glass w-full max-w-5xl shadow-blue-500/10' 
            : 'bg-transparent border-transparent w-full max-w-7xl'
        }`}
      >
        <div className="flex items-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              {content.brand?.logoUrl ? (
                <img src={content.brand.logoUrl} alt="Logo" className="h-10 object-contain relative z-10" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center relative z-10 shadow-lg">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
              )}
            </div>
          </button>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-[13px] font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all cursor-pointer relative group"
            >
              {language === 'en' ? link.label.en : link.label.ar}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-zinc-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
          >
            <Globe size={14} />
            {language === 'en' ? 'العربية' : 'English'}
          </button>
          <button
            onClick={() => window.location.href = '/admin'}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer"
          >
            <Settings size={14} />
            <span className="hidden sm:inline">{language === 'en' ? 'Dashboard' : 'الإدارة'}</span>
          </button>
        </div>
      </motion.nav>
    </div>
  );
}
