import {
  GraduationCap,
  Users,
  Layout,
  FileEdit,
  Zap,
  Type,
  CreditCard,
  Settings,
  MessageSquare,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Message } from '../../../types';

interface OverviewSectionProps {
  messages: Message[];
  setActiveSection: (id: string) => void;
}

export default function OverviewSection({ messages, setActiveSection }: OverviewSectionProps) {
  const { t } = useTranslation();
  const stats = [
    { label: t('admin.overview.totalStudents'), value: '126,102', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: t('admin.overview.totalTeachers'), value: '23,096', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: t('admin.overview.schools'), value: '30', icon: Layout, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: t('admin.overview.articles'), value: '5', icon: FileEdit, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const quickActions = [
    { id: 'hero', label: t('admin.overview.editHero'), icon: Type },
    { id: 'pricing', label: t('admin.overview.editPlans'), icon: CreditCard },
    { id: 'settings', label: t('admin.overview.portalConfig'), icon: Settings },
  ];

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-10"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 dark:border-white/5 relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl ${stat.bg} dark:bg-white/5 ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">{stat.value}</h3>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Messages */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-sm border border-zinc-100 dark:border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white">{t('admin.overview.recentMessages')}</h3>
              <button onClick={() => setActiveSection('messages')} className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline cursor-pointer">{t('admin.overview.viewAll')}</button>
            </div>
            
            <div className="space-y-4">
              {messages.slice(0, 4).map((msg, i) => (
                <div key={i} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-white/5 transition-all border border-transparent hover:border-zinc-100 dark:hover:border-white/5 cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-blue-600">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-zinc-900 dark:text-white truncate">{msg.name}</h4>
                    <p className="text-zinc-400 text-sm truncate">{msg.message}</p>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 group-hover:text-blue-600 transition-colors">
                    {new Date(msg.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center py-10">
                  <MessageSquare className="mx-auto text-zinc-200 dark:text-zinc-800 mb-4" size={48} />
                  <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">{t('admin.overview.noRecentMessages')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-sm border border-zinc-100 dark:border-white/5">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-8">{t('admin.overview.quickActions')}</h3>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSection(action.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white transition-all font-black text-sm group cursor-pointer"
                >
                  <action.icon size={20} className="group-hover:scale-110 transition-transform" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-[2.5rem] p-8 shadow-xl shadow-blue-600/20 text-white relative overflow-hidden group">
            <Zap className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12 group-hover:scale-110 transition-transform duration-700" />
            <h3 className="text-xl font-black mb-4 relative z-10">{t('admin.overview.needHelp')}</h3>
            <p className="text-blue-100 text-sm font-medium mb-6 relative z-10 opacity-80">{t('admin.overview.helpDescription')}</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest relative z-10 hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-black/10">
              {t('admin.overview.supportHub')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
