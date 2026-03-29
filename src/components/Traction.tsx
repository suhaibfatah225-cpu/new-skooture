import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Building2, GraduationCap, Users, Briefcase, Heart, Globe } from 'lucide-react';

function Counter({ value, label, icon: Icon, delay }: { value: number; label: string; icon: any; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
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
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k+';
    return num + '+';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="relative group p-8 rounded-3xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/50 backdrop-blur-xl overflow-hidden hover:border-blue-500/50 dark:hover:border-yellow-500/50 transition-all duration-500 shadow-xl dark:shadow-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-zinc-800/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner border border-blue-100 dark:border-zinc-700">
          <Icon className="w-8 h-8 text-blue-600 dark:text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
        </div>
        <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-300 mb-3">
          {formatNumber(count)}
        </div>
        <div className="text-sm md:text-base font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function Traction() {
  const { content, t } = useContent();
  const { traction } = content;

  return (
    <section id="stats" className="py-24 bg-zinc-50 dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/10 transition-colors duration-300" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 transition-colors duration-300"
          >
            {t({ en: 'Numbers & Trust', ar: 'أرقام وثقة' })}
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <Counter value={traction.entities?.value || 49} label={t(traction.entities?.label || { en: 'Educational Entities', ar: 'كيان تعليمي' })} icon={Building2} delay={0.1} />
          <Counter value={traction.students?.value || 120000} label={t(traction.students?.label || { en: 'Active Students', ar: 'طالب نشط' })} icon={GraduationCap} delay={0.2} />
          <Counter value={traction.teachers?.value || 10000} label={t(traction.teachers?.label || { en: 'Teachers', ar: 'معلم' })} icon={Users} delay={0.3} />
          <Counter value={traction.staff?.value || 1500} label={t(traction.staff?.label || { en: 'Staff', ar: 'موظف' })} icon={Briefcase} delay={0.4} />
          <Counter value={traction.parents?.value || 240000} label={t(traction.parents?.label || { en: 'Parents', ar: 'ولي أمر' })} icon={Heart} delay={0.5} />
          <Counter value={traction.total?.value || 500000} label={t(traction.total?.label || { en: 'Total Users', ar: 'إجمالي المستخدمين' })} icon={Globe} delay={0.6} />
        </div>
      </div>
    </section>
  );
}
