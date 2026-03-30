import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function SectionWrapper({ title, description, children }: SectionWrapperProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-1.5 px-2">
        <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">{title}</h3>
        {description && <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{description}</p>}
      </div>
      
      <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-zinc-200/50 dark:border-white/5 shadow-2xl shadow-zinc-200/50 dark:shadow-none space-y-10">
        {children}
      </div>
    </motion.div>
  );
}
