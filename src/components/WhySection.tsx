import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Sparkles } from 'lucide-react';

export default function WhySection() {
  const { content, t } = useContent();

  return (
    <section className="py-32 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-zinc-50 to-zinc-50 dark:from-blue-900/20 dark:via-zinc-950 dark:to-zinc-950 transition-colors duration-300" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {t(content.why.title)}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight transition-colors duration-300">
              {t(content.why.title)}
            </h2>
            
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
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
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20 animate-pulse" />
            <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 overflow-hidden transition-colors duration-300 shadow-xl dark:shadow-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200/50 dark:border-zinc-800/50 transition-colors duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition-colors duration-300">
                      <span className="text-zinc-500 font-mono text-sm">v1.0</span>
                    </div>
                    <div>
                      <h4 className="text-zinc-800 dark:text-zinc-300 font-medium transition-colors duration-300">Smart Schools</h4>
                      <p className="text-zinc-500 text-sm">Legacy System</p>
                    </div>
                  </div>
                  <div className="text-zinc-400 dark:text-zinc-600 line-through transition-colors duration-300">Monolithic</div>
                </div>

                <div className="flex items-center justify-center py-4">
                  <div className="w-px h-8 bg-gradient-to-b from-zinc-200 dark:from-zinc-800 to-blue-500/50 transition-colors duration-300" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Skooture.AI</h4>
                      <p className="text-blue-400 text-sm">Global AI Infrastructure</p>
                    </div>
                  </div>
                  <div className="text-blue-400 font-medium">Scalable</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
