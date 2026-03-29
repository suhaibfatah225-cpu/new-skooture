import { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { useTheme } from '../context/ThemeContext';
import { Globe, Settings, Sun, Moon } from 'lucide-react';

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
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: { en: 'Home', ar: 'الرئيسية' } },
    { id: 'features', label: { en: 'Features', ar: 'المميزات' } },
    { id: 'pricing', label: { en: 'Pricing', ar: 'الأسعار' } },
    { id: 'faq', label: { en: 'FAQ', ar: 'الأسئلة الشائعة' } },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 cursor-pointer">
              {content.brand?.logoUrl ? (
                <img src={content.brand.logoUrl} alt="Skooture.AI" className="h-10 object-contain" referrerPolicy="no-referrer" />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-zinc-900 dark:text-white' : 'text-zinc-900 dark:text-white'}`}>
                    Skooture.AI
                  </span>
                </>
              )}
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer hover:text-blue-500 ${
                  isScrolled 
                    ? 'text-zinc-600 dark:text-zinc-300' 
                    : 'text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {language === 'en' ? link.label.en : link.label.ar}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isScrolled
                  ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  : 'text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                isScrolled
                  ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  : 'text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
            <button
              onClick={() => window.location.href = '/admin'}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                isScrolled
                  ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  : 'text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Admin' : 'الإدارة'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
