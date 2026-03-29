import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { 
  GraduationCap, 
  BookOpen, 
  LayoutTemplate, 
  Users, 
  CalendarDays, 
  Palmtree, 
  CalendarClock, 
  UserCheck, 
  FileEdit, 
  BookOpenCheck, 
  ClipboardList, 
  Megaphone, 
  UsersRound, 
  Receipt, 
  CalendarOff, 
  Wallet, 
  Image as ImageIcon, 
  IdCard, 
  Globe, 
  MessageSquare, 
  Bus, 
  UserCog
} from 'lucide-react';

const icons = [
  GraduationCap, BookOpen, LayoutTemplate, Users, CalendarDays, Palmtree,
  CalendarClock, UserCheck, FileEdit, BookOpenCheck, ClipboardList, Megaphone,
  UsersRound, Receipt, CalendarOff, Wallet, ImageIcon, IdCard,
  Globe, MessageSquare, Bus, UserCog
];

export default function TopFeatures() {
  const { content, t } = useContent();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const features = content.topFeatures;
  if (!features) return null;

  const visibleItems = isExpanded ? features.items : features.items.slice(0, 9);

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            {t(features.title)}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-teal-600 mx-auto rounded-full relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-teal-600 rounded-full ring-4 ring-white dark:ring-zinc-950" />
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        >
          <AnimatePresence initial={false}>
            {visibleItems.map((item: any, index: number) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  {/* Left accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-600 rounded-l-xl" />
                  
                  <div className="ml-4 mr-4 flex items-center justify-center w-12 h-12 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {t(item)}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Toggle Button */}
        <motion.div 
          layout
          className="flex justify-center"
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            {isExpanded ? t(features.buttonLess) : t(features.buttonMore)}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
