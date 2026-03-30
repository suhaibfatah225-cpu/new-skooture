import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import DynamicIcon from '../shared/DynamicIcon';

export default function BentoFeatures() {
  const { content, t } = useContent();
  const features = content.bentoFeatures?.features || [];

  return (
    <section id="features-grid" className="py-32 bg-zinc-50 dark:bg-zinc-950/20 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-start mb-20 px-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-[0.3em] mb-4"
          >
            {t({ en: 'Ecosystem', ar: 'النظام البيئي' })}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white leading-tight max-w-3xl"
          >
            {t(content.bentoFeatures?.title || { en: 'Features', ar: 'المميزات' })}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[320px]">
          {features.map((feature: any, index: number) => {
            // Sophisticated bento pattern
            const isWide = index === 0 || index === 3;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-[2rem] border border-zinc-200/50 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ${
                  isWide ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Glass Base */}
                <div className="absolute inset-0 bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl" />

                <div className="relative h-full p-8 md:p-10 flex flex-col justify-end">
                  <div className="absolute top-8 left-8 rtl:right-8 rtl:left-auto">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-zinc-100 dark:border-white/10">
                      <DynamicIcon name={feature.icon} className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {t(feature.title)}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {t(feature.description)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
