import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Sparkles, TrendingUp, CheckCircle, Users } from 'lucide-react';

const icons = [Sparkles, TrendingUp, CheckCircle, Users];

export default function BentoFeatures() {
  const { content, t } = useContent();
  const features = content.bentoFeatures?.features || [];

  return (
    <section id="features" className="py-32 bg-white dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/10 transition-colors duration-300" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 transition-colors duration-300"
          >
            {t(content.bentoFeatures?.title || { en: 'Features', ar: 'المميزات' })}
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {features.map((feature, index) => {
            const Icon = icons[index % icons.length];
            
            // Make the first and last items span 2 columns on desktop
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group relative p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg dark:shadow-none flex flex-col justify-end ${
                  isLarge ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 dark:from-blue-500/10 dark:to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-8 right-8 rtl:left-8 rtl:right-auto">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {t(feature.title)}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md transition-colors duration-300">
                    {t(feature.description)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
