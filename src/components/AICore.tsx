import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import DynamicIcon from './DynamicIcon';

export default function AICore() {
  const { content, t } = useContent();

  return (
    <section id="features" className="py-32 bg-white dark:bg-zinc-950 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-1/4 w-[50%] h-[50%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[50%] h-[50%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            {t({ en: 'AI Powered', ar: 'مدعوم بالذكاء الاصطناعي' })}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white text-center leading-tight mb-6"
          >
            {t(content.aiCore.title)}
          </motion.h2>
          <div className="w-24 h-1.5 bg-blue-600 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {content.aiCore.features.map((feature: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 bg-blue-600/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="glass-card h-full p-10 rounded-[2.5rem] flex flex-col items-start transition-all duration-500 group-hover:-translate-y-3 group-hover:border-blue-500/30">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-10 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-500">
                  <DynamicIcon name={feature.icon} className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-5 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {t(feature.title)}
                </h3>
                
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  {t(feature.description)}
                </p>

                <div className="mt-10 pt-8 border-t border-zinc-100 dark:border-white/5 w-full">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    {t({ en: 'Learn More', ar: 'تعرف على المزيد' })} →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
