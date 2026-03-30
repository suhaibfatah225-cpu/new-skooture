import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import DynamicIcon from '../shared/DynamicIcon';

function Counter({ value, label, iconName, delay }: { value: number; label: string; iconName: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2500;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num.toLocaleString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative group h-full"
    >
      <div className="absolute inset-0 bg-blue-600/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="glass-card h-full p-10 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-500 group-hover:-translate-y-3 group-hover:border-blue-500/30">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 border border-blue-100/50 dark:border-blue-500/10 shadow-sm">
          <DynamicIcon name={iconName} className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-3">
          {formatNumber(count)}<span className="text-blue-600">.</span>
        </div>
        <div className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function Traction() {
  const { content, t } = useContent();
  const tractionData = content.traction;
  const traction = Array.isArray(tractionData) ? tractionData : [];

  return (
    <section id="stats" className="py-32 bg-white dark:bg-[#020617] relative overflow-hidden transition-colors duration-500">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            {t({ en: 'Global Impact', ar: 'تأثير عالمي' })}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white text-center leading-tight"
          >
            {t({ en: 'Real Results for Real Schools', ar: 'نتائج حقيقية لمدارس حقيقية' })}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {traction.map((stat: any, index: number) => (
            <Counter 
              key={index}
              value={stat.value} 
              label={t(stat.label)} 
              iconName={stat.icon} 
              delay={index * 0.1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
