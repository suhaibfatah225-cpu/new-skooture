import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { Sparkles } from 'lucide-react';

export default function WhySection() {
  const { content, t } = useContent();

  return (
    <section className="py-32 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-t border-zinc-200 dark:border-white/5 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/30 via-zinc-50 to-zinc-50 dark:from-blue-900/10 dark:via-zinc-950 dark:to-zinc-950 transition-colors duration-300" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-400 text-sm font-black uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              {t(content.why.title)}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white leading-tight">
              {t(content.why.title)}
            </h2>
            
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              {t(content.why.content)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-3xl opacity-10 animate-pulse" />
            <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-10 overflow-hidden transition-colors duration-300 shadow-card dark:shadow-card-dark">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-white/5 transition-colors duration-300">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center transition-colors duration-300 shadow-inner">
                      <span className="text-zinc-500 font-black text-xs">{content.why.labels?.v1 || 'v1.0'}</span>
                    </div>
                    <div>
                      <h4 className="text-zinc-900 dark:text-zinc-100 font-black tracking-tight transition-colors duration-300 uppercase text-sm">Smart Schools</h4>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">{t(content.why.labels?.legacySystem || 'Legacy System')}</p>
                    </div>
                  </div>
                  <div className="text-zinc-400 dark:text-zinc-600 line-through font-black uppercase tracking-[0.2em] text-[10px]">
                    {t(content.why.labels?.monolithic || 'Monolithic')}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-px h-10 bg-gradient-to-b from-zinc-200 dark:from-zinc-800 to-blue-600/50" />
                </div>

                <div className="flex items-center justify-between p-6 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 border border-blue-500/20">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg tracking-tight uppercase leading-none">Skooture.AI</h4>
                      <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mt-1 opacity-80">{t(content.why.labels?.globalAi || 'Global AI Infrastructure')}</p>
                    </div>
                  </div>
                  <div className="text-blue-600 font-black uppercase tracking-widest text-[10px] bg-white px-4 py-1.5 rounded-full shadow-lg">
                    {t(content.why.labels?.scalable || 'Scalable')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
