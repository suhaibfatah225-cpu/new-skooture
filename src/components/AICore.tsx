import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Brain, Settings, MessageSquare } from 'lucide-react';

const icons = [Brain, Settings, MessageSquare];

export default function AICore() {
  const { content, t } = useContent();

  return (
    <section className="py-32 bg-zinc-50 dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 transition-colors duration-300"
          >
            {t(content.aiCore.title)}
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.aiCore.features.map((feature, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group relative p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md dark:shadow-none"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 dark:from-blue-500/10 dark:to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                    <Icon className="w-8 h-8 text-blue-500 dark:text-blue-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-500">
                    {t(feature.title)}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors duration-500">
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
