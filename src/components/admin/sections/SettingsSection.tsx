import { Languages, Moon, User, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Language } from '../../../types';

interface SettingsSectionProps {
  isRTL: boolean;
  adminLanguage: Language;
  adminTheme: 'light' | 'dark';
  setAdminLanguage: (lang: Language) => void;
  setAdminTheme: (theme: 'light' | 'dark') => void;
}

export default function SettingsSection({
  isRTL,
  adminLanguage,
  adminTheme,
  setAdminLanguage,
  setAdminTheme,
}: SettingsSectionProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      {/* Language Card */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-white/5 flex items-center justify-center text-blue-600 font-bold">
            <Languages size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white">{t('admin.settings.dashboardLanguage')}</h3>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1">EN / AR</p>
          </div>
        </div>
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl gap-2">
          <button 
            onClick={() => setAdminLanguage('ar')}
            className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${adminLanguage === 'ar' ? 'bg-white dark:bg-zinc-700 text-blue-600 shadow-sm' : 'text-zinc-400'}`}
          >
            عربي
          </button>
          <button 
            onClick={() => setAdminLanguage('en')}
            className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${adminLanguage === 'en' ? 'bg-white dark:bg-zinc-700 text-blue-600 shadow-sm' : 'text-zinc-400'}`}
          >
            English
          </button>
        </div>
      </div>

      {/* Theme Card */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-400">
            <Moon size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white">{t('admin.settings.darkMode')}</h3>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1">
              {adminTheme === 'dark' ? t('admin.settings.dark') : t('admin.settings.light')}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setAdminTheme(adminTheme === 'dark' ? 'light' : 'dark')}
          className={`w-16 h-8 rounded-full p-1 transition-all duration-300 relative cursor-pointer ${adminTheme === 'dark' ? 'bg-blue-600' : 'bg-zinc-200'}`}
        >
          <motion.div 
            layout
            animate={{ x: adminTheme === 'dark' ? (isRTL ? -32 : 32) : 0 }}
            className="w-6 h-6 bg-white rounded-full shadow-md"
          />
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-sm border border-zinc-100 dark:border-white/5 space-y-10">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-white/5 flex items-center justify-center text-blue-600">
            <User size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white">{t('admin.settings.profileSettings')}</h3>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1">{t('admin.settings.adminAccount')}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-zinc-400 uppercase tracking-widest ml-1">{t('admin.settings.name')}</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
              <input 
                type="text" 
                defaultValue="Admin" 
                className="w-full pl-12 pr-6 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-white/5 rounded-2xl font-bold text-zinc-900 dark:text-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-zinc-400 uppercase tracking-widest ml-1">{t('admin.settings.emailAddress')}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
              <input 
                type="email" 
                defaultValue="admin@skooture.ai" 
                className="w-full pl-12 pr-6 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-white/5 rounded-2xl font-bold text-zinc-900 dark:text-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all mt-4 cursor-pointer">
            {t('admin.settings.saveProfile')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
